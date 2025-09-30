export type Unit = "m" | "pcs" | "job";
export type PricingMode = "min" | "avg" | "max" | "by_param";

export interface Service {
  id: string;
  category: "core" | "extra";
  name: string;
  unit: Unit;
  min_price: number;
  max_price: number;
  pricing_mode: PricingMode;
  param_schema?: string;
}

export interface ParamRow {
  schema_id: string;
  param: string;
  variant: string;
  coef: number;
}

export interface Config {
  config_version: string;
  currency: string;
  last_updated: string;
  services: Service[];
  params: ParamRow[];
  pricing_rules: { key: string; value: string }[];
  heuristics: any;
  materials_norms: {
    per_point_min: number; per_point_max: number;
    per_meter_chase_min: number; per_meter_chase_max: number;
    per_spot_min: number; per_spot_max: number;
    panel_min: number; panel_max: number;
  };
}

export async function loadConfig(): Promise<Config> {
  const u = `/config/electro_calculator_config.json?v=${Date.now()}`;
  const r = await fetch(u, { cache: "no-store" });
  if (!r.ok) throw new Error("config load error");
  return r.json();
}

// helpers
export const getRule = (cfg: Config, key: string, def = "1") =>
  Number(cfg.pricing_rules.find(r => r.key === key)?.value ?? def);

export const roundTo = (val: number, step: number) =>
  Math.round((Math.round(val / step) * step) * 100) / 100;