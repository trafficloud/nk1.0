import type { Config, Service } from "../types/calculator";
import { getRule, roundTo } from "../types/calculator";

export interface FormValues {
  objectType: string;
  area: number;
  points: number;
  lights: number;
  panel: string;
  rcd: string;
  chaseM: number;
  materialsTier: string;
  region: string;
  urgency: string;
  warmFloor: boolean;
  weakCurrent: boolean;
  grounding: boolean;
  meterMove: boolean;
  wallMaterial: string;
  heightGT3: string;
}

export function getProcessedFormValues(formValues: FormValues) {
  // Map form values to expected format
  let objectType = formValues.objectType;
  if (objectType === "Дом до 150 м²") objectType = "Дом";
  if (objectType === "Другое") objectType = "Студия";
  if (objectType === "1-к") objectType = "1-комнатная";
  if (objectType === "2-к") objectType = "2-комнатная";
  if (objectType === "3-к") objectType = "3-комнатная";

  return {
    objectType,
    area: formValues.area,
    points: formValues.points,
    lights: formValues.lights,
    panel: formValues.panel,
    rcd: formValues.rcd === "Да",
    chaseM: formValues.chaseM,
    materialsTier: formValues.materialsTier,
    region: formValues.region,
    urgency: formValues.urgency,
    warmFloor: formValues.warmFloor,
    weakCurrent: formValues.weakCurrent,
    grounding: formValues.grounding,
    meterMove: formValues.meterMove,
    wallMaterial: formValues.wallMaterial,
    heightGT3: formValues.heightGT3 === "Да"
  };
}

export function estimateIfMissing(form: ReturnType<typeof getProcessedFormValues>, cfg: Config) {
  const h = cfg.heuristics.by_object_type[form.objectType] || cfg.heuristics.by_object_type["Студия"];
  const area = Math.max(0, form.area || 0);

  let pointsMin = form.points || Math.ceil(area * h.points_per_m2_min);
  let pointsMax = form.points || Math.ceil(area * h.points_per_m2_max);

  let spotsMin  = form.lights || Math.ceil(area * h.spot_per_m2_min);
  let spotsMax  = form.lights || Math.ceil(area * h.spot_per_m2_max);

  let chaseMin  = form.chaseM || Math.ceil(pointsMin * h.chase_m_per_point_min);
  let chaseMax  = form.chaseM || Math.ceil(pointsMax * h.chase_m_per_point_max);

  const panelVariant = form.panel === "Новый щит" ? (h.panel_modules_guess || "18–24M") : "≤12M";

  return { pointsMin, pointsMax, spotsMin, spotsMax, chaseMin, chaseMax, panelVariant };
}

function pickBase(s: Service, take: "min" | "max") {
  if (s.min_price === s.max_price) return s.min_price;
  if (s.pricing_mode === "min") return s.min_price;
  if (s.pricing_mode === "max") return s.max_price;
  // avg или by_param → берём среднее как базу, параметры ниже скорректируют (для щита)
  if (take === "min") return (s.min_price + s.max_price) / 2;
  return (s.min_price + s.max_price) / 2;
}

export function calcWorks(form: ReturnType<typeof getProcessedFormValues>, cfg: Config) {
  const est = estimateIfMissing(form, cfg);

  const mapQty = (id: string, take: "min" | "max") => {
    switch (id) {
      case "chase_generic":   return take === "min" ? est.chaseMin  : est.chaseMax;
      case "points_install":  return take === "min" ? est.pointsMin : est.pointsMax;
      case "spotlights":      return take === "min" ? est.spotsMin  : est.spotsMax;
      case "chandelier":      return 0; // люстры считаем только если клиент введёт отдельно; при желании — приравнять к 1–2
      case "panel_install":   return form.panel === "Новый щит" || form.panel === "Замена/сборка" ? 1 : 0;
      case "rcd_diff":        return form.rcd ? Math.max(1, Math.ceil((est.pointsMax || est.pointsMin || 6) / 6)) : 0; // по группе на 6 точек
      case "led_strip":       return 0;
      case "weak_current":    return form.weakCurrent ? Math.max(1, Math.ceil((est.pointsMax || 10) * 0.2)) : 0; // ориентир 20% от точек
      case "ground_loop":     return form.grounding ? 1 : 0;
      case "meter_move":      return form.meterMove ? 1 : 0;
      case "min_visit":       return 0;
      default: return 0;
    }
  };

  const panelCoef = (take: "min" | "max") => {
    const rows = cfg.params.filter(p => p.schema_id === "panel_params_v1" && p.param === "modules");
    const hit  = rows.find(r => r.variant === est.panelVariant);
    return hit ? hit.coef : 1;
  };

  const currency = cfg.currency;

  const linesMin = cfg.services.map(s => {
    let qty = mapQty(s.id, "min");
    if (s.id === "panel_install" && qty > 0) qty = qty * panelCoef("min");
    return { id: s.id, name: s.name, qty, price: pickBase(s, "min"), sum: qty * pickBase(s, "min"), currency };
  }).filter(l => l.qty > 0);

  const linesMax = cfg.services.map(s => {
    let qty = mapQty(s.id, "max");
    if (s.id === "panel_install" && qty > 0) qty = qty * panelCoef("max");
    return { id: s.id, name: s.name, qty, price: pickBase(s, "max"), sum: qty * pickBase(s, "max"), currency };
  }).filter(l => l.qty > 0);

  const min = linesMin.reduce((a, b) => a + b.sum, 0);
  const max = linesMax.reduce((a, b) => a + b.sum, 0);

  return { linesMin, linesMax, min, max, est };
}

export function calcMaterials(est: ReturnType<typeof estimateIfMissing>, cfg: Config) {
  const n = cfg.materials_norms;
  const min = est.pointsMin * n.per_point_min
            + est.spotsMin  * n.per_spot_min
            + n.panel_min;
  const max = est.pointsMax * n.per_point_max
            + est.spotsMax  * n.per_spot_max
            + n.panel_max;
  return { min, max };
}

export function applyModifiersMax(max: number, form: ReturnType<typeof getProcessedFormValues>, cfg: Config) {
  let factors: string[] = [];
  const r = (k: string, d="1") => Number(cfg.pricing_rules.find(x => x.key === k)?.value ?? d);

  // материал стен
  let wallCoef = 1;
  switch (form.wallMaterial) {
    case "Бетон":       wallCoef = r("wall_material_max_coef_concrete","1.15"); factors.push("Тип стены: бетон (до +15%)"); break;
    case "Кирпич":      wallCoef = r("wall_material_max_coef_brick","1.00");    factors.push("Тип стены: кирпич (без надбавки)"); break;
    case "Г-с блок":    wallCoef = r("wall_material_max_coef_gs","0.95");       factors.push("Тип стены: газосиликат (возможна экономия)"); break;
    default:            wallCoef = r("wall_material_max_coef_unknown","1.10");  factors.push("Тип стены не указан (закладываем до +10%)");
  }
  max *= wallCoef;

  // высота >3м
  if (form.heightGT3) { max *= r("height_gt3m_max_coef","1.10"); factors.push("Высота потолков >3 м (до +10%)"); }

  // срочность
  if (form.urgency && form.urgency.toLowerCase().includes("сроч")) { max *= r("rush_max_coef","1.15"); factors.push("Срочность (до +15%)"); }

  // регион
  if (form.region && form.region.toLowerCase() !== "брест") { max *= r("region_max_coef_outside","1.05"); factors.push("Выезд за город (до +5%)"); }

  // общий буфер
  max *= r("hidden_risk_max_coef","1.05"); factors.push("Непредвиденные работы (до +5%)");

  return { maxWithMods: max, factors };
}

export function calculateTotal(form: ReturnType<typeof getProcessedFormValues>, cfg: Config) {
  const rounding  = Number(cfg.pricing_rules.find(r => r.key === "rounding")?.value || "0.10");
  const minOrder  = Number(cfg.pricing_rules.find(r => r.key === "min_order")?.value || "30");

  const works = calcWorks(form, cfg);
  const mats  = calcMaterials(works.est, cfg);

  // Если выбраны "Материалы клиента", исключаем их из расчета
  if (form.materialsTier === "Материалы клиента") {
    mats.min = 0;
    mats.max = 0;
  }

  // материалы и «уровень материалов» слегка влияют на работы
  const tierWorkMin = form.materialsTier === "Премиум-бренды"
    ? Number(cfg.pricing_rules.find(r => r.key === "materials_tier_work_min_coef_premium")?.value || "1.05")
    : Number(cfg.pricing_rules.find(r => r.key === "materials_tier_work_min_coef")?.value || "1.00");

  const tierWorkMax = form.materialsTier === "Премиум-бренды"
    ? Number(cfg.pricing_rules.find(r => r.key === "materials_tier_work_max_coef_premium")?.value || "1.10")
    : Number(cfg.pricing_rules.find(r => r.key === "materials_tier_work_max_coef")?.value || "1.03");

  let min = works.min * tierWorkMin + mats.min;
  let max = works.max * tierWorkMax + mats.max;

  // модификаторы и плашки для MAX
  const m = applyModifiersMax(max, form, cfg);
  max = m.maxWithMods;

  // минимальный заказ + округление
  min = roundTo(Math.max(min, minOrder), rounding);
  max = roundTo(Math.max(max, minOrder), rounding);

  // «строчки» для правой колонки (как на твоем скрине)
  const breakdown = {
    works: roundTo(works.max * tierWorkMax, rounding),        // показываем оценку «Работы» ближе к MAX
    materials: form.materialsTier === "Материалы клиента" ? 0 : roundTo(mats.max, rounding),
    logistics: form.region.toLowerCase() !== "брест" ? roundTo((max - min) * 0.05, rounding) : 0, // формальная строка, если надо
    rush: (form.urgency && form.urgency.toLowerCase().includes("сроч")) ? roundTo((max - min) * 0.12, rounding) : 0
  };

  const orangeNote = "Для формирования итоговой цены закажите бесплатный выезд специалиста для просчета.";

  return { min, max, currency: cfg.currency, breakdown, factors: m.factors, orangeNote };
}