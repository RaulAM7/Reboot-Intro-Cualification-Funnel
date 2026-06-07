import type { FormAnswers, LeadScoringResult } from '@/types/funnel';

export function summarizeLead(answers: FormAnswers, scoring: LeadScoringResult): string {
  const parts: string[] = [];

  if (answers.interest_area) {
    parts.push(`Interesado en ${answers.interest_area}.`);
  }

  if (answers.residence || answers.age_range) {
    parts.push(`Vive en ${answers.residence || 'sin indicar'} y su rango de edad es ${answers.age_range || 'sin indicar'}.`);
  }

  if (answers.current_situation) {
    parts.push(`Situación actual: ${answers.current_situation.toLowerCase()}.`);
  }

  if (answers.objective) {
    parts.push(`Objetivo principal: ${answers.objective.toLowerCase()}.`);
  }

  if (answers.current_level) {
    parts.push(`Nivel técnico declarado: ${answers.current_level.toLowerCase()}.`);
  }

  if (answers.weekly_availability) {
    parts.push(`Disponibilidad semanal: ${answers.weekly_availability.toLowerCase()}.`);
  }

  if (answers.preferred_modality) {
    parts.push(`Modalidad preferida: ${answers.preferred_modality.toLowerCase()}.`);
  }

  if (answers.investment_range) {
    parts.push(`Inversión estimada: ${answers.investment_range}.`);
  }

  if (answers.start_timing) {
    parts.push(`Quiere empezar ${answers.start_timing.toLowerCase()}.`);
  }

  if (answers.additional_context) {
    parts.push(`Contexto adicional: ${answers.additional_context.trim()}`);
  }

  parts.push(`Temperatura comercial: ${scoring.lead_temperature}.`);

  return parts.join(' ');
}

