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
  notes?: string;
}

export interface ParamRow {
  schema_id: string;     // например "chase_params_v1"
  param: string;         // "wall_material" | "width" ...
  variant: string;       // "бетон" | "20–30мм" ...
  coef: number;          // 1.15 и т.п.
}

export interface PricingRule { 
  key: string; 
  value: string; 
  description?: string; 
}

export interface Config {
  services: Service[];
  params: ParamRow[];
  pricing_rules: PricingRule[];
}