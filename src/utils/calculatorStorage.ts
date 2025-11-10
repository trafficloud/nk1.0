import { supabase } from '../lib/supabase';
import type { InsertCalculatorSubmission, CalculationResult } from '../types/database';

interface FormValues {
  objectType: string;
  area: string;
  points: string;
  lights: string;
  panel?: string;
  rcd?: string;
  chaseM?: string;
  materials: string;
  region: string;
  urgency: string;
  wallMaterial: string;
  heightGt3: string;
  warmFloor: boolean;
  weakCurrent: boolean;
  grounding: boolean;
  meterMove: boolean;
}

export async function saveCalculation(
  formValues: FormValues,
  calculationResult: CalculationResult,
  sessionId: string,
  pdfUrl?: string,
  imageUrl?: string
): Promise<{ success: boolean; id?: string; error?: string }> {
  try {
    const userAgent = navigator.userAgent;

    const submission: InsertCalculatorSubmission = {
      session_id: sessionId,
      object_type: formValues.objectType,
      area: parseFloat(formValues.area) || null,
      points: parseInt(formValues.points) || null,
      lights: parseInt(formValues.lights) || null,
      panel: formValues.panel || null,
      rcd: formValues.rcd || null,
      chase_m: formValues.chaseM ? parseFloat(formValues.chaseM) : null,
      materials_tier: formValues.materials,
      region: formValues.region,
      urgency: formValues.urgency,
      wall_material: formValues.wallMaterial,
      height_gt3: formValues.heightGt3,
      opt_warm_floor: formValues.warmFloor,
      opt_weak_current: formValues.weakCurrent,
      opt_grounding: formValues.grounding,
      opt_meter_move: formValues.meterMove,
      calculation_result: calculationResult,
      pdf_url: pdfUrl || null,
      image_url: imageUrl || null,
      user_agent: userAgent
    };

    const { data, error } = await supabase
      .from('calculator_submissions')
      .insert([submission])
      .select('id')
      .single();

    if (error) {
      console.error('Error saving calculation to Supabase:', error);
      return { success: false, error: error.message };
    }

    console.log('Calculation saved successfully to Supabase:', data.id);
    return { success: true, id: data.id };
  } catch (error) {
    console.error('Unexpected error saving calculation:', error);
    return { success: false, error: 'Неизвестная ошибка' };
  }
}

export async function updateCalculationUrls(
  submissionId: string,
  pdfUrl?: string,
  imageUrl?: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const updateData: { pdf_url?: string; image_url?: string } = {};

    if (pdfUrl) {
      updateData.pdf_url = pdfUrl;
    }

    if (imageUrl) {
      updateData.image_url = imageUrl;
    }

    const { error } = await supabase
      .from('calculator_submissions')
      .update(updateData)
      .eq('id', submissionId);

    if (error) {
      console.error('Error updating calculation URLs in Supabase:', error);
      return { success: false, error: error.message };
    }

    console.log('Calculation URLs updated successfully in Supabase');
    return { success: true };
  } catch (error) {
    console.error('Unexpected error updating calculation URLs:', error);
    return { success: false, error: 'Неизвестная ошибка' };
  }
}
