import type { Config, Service } from '../types/calculator';

export function pickBasePrice(s: Service): number {
  if (s.min_price === s.max_price) return s.min_price;
  switch (s.pricing_mode) {
    case "min": return s.min_price;
    case "max": return s.max_price;
    case "avg": return (s.min_price + s.max_price) / 2;
    case "by_param": return (s.min_price + s.max_price) / 2; // базу берём среднюю, множим коэффициенты
    default: return s.min_price;
  }
}

export function coefFor(schemaId: string | undefined, chosen: Record<string,string>, cfg: Config): number {
  if (!schemaId) return 1;
  const rows = cfg.params.filter(p => p.schema_id === schemaId);
  if (rows.length === 0) return 1;
  let k = 1;
  for (const [paramName, variant] of Object.entries(chosen)) {
    const hit = rows.find(r => r.param === paramName && r.variant === variant);
    if (hit) k *= hit.coef;
  }
  return k;
}

export function roundTo(value: number, step = 0.1): number {
  const m = Math.round(value / step) * step;
  return Math.round(m * 100) / 100;
}

export function calcLineTotal(
  s: Service,
  qty: number,
  chosenParams: Record<string,string>,
  cfg: Config
): number {
  const base = pickBasePrice(s);
  const k = coefFor(s.param_schema, chosenParams, cfg);
  return qty * base * k;
}

export function applyGlobalRules(sum: number, cfg: Config): number {
  const minOrder = Number(cfg.pricing_rules.find(r => r.key === "min_order")?.value || "0");
  const rounding = Number(cfg.pricing_rules.find(r => r.key === "rounding")?.value || "0.1");
  const res = Math.max(sum, minOrder);
  return roundTo(res, rounding);
}