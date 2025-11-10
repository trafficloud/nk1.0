export interface CalculatorSubmission {
  id: string;
  session_id: string | null;
  object_type: string | null;
  area: number | null;
  points: number | null;
  lights: number | null;
  panel: string | null;
  rcd: string | null;
  chase_m: number | null;
  materials_tier: string | null;
  region: string | null;
  urgency: string | null;
  wall_material: string | null;
  height_gt3: string | null;
  opt_warm_floor: boolean;
  opt_weak_current: boolean;
  opt_grounding: boolean;
  opt_meter_move: boolean;
  calculation_result: CalculationResult;
  pdf_url: string | null;
  image_url: string | null;
  user_agent: string | null;
  created_at: string;
}

export interface CalculationResult {
  min: number;
  max: number;
  breakdown: {
    labor: { min: number; max: number };
    materials: { min: number; max: number };
    logistics: { min: number; max: number };
    services: {
      points: { min: number; max: number };
      lights: { min: number; max: number };
      panel: { min: number; max: number };
      chase: { min: number; max: number };
      options: { min: number; max: number };
    };
  };
}

export interface CookieConsent {
  id: string;
  consent_type: 'accepted' | 'declined';
  user_agent: string | null;
  consent_date: string;
  created_at: string;
}

export interface Review {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  rating: number;
  text: string;
  status: 'pending' | 'approved' | 'rejected';
  avatar_url: string | null;
  created_at: string;
}

export type InsertCalculatorSubmission = Omit<CalculatorSubmission, 'id' | 'created_at'>;
export type UpdateCalculatorSubmission = Partial<Omit<CalculatorSubmission, 'id' | 'created_at'>>;
