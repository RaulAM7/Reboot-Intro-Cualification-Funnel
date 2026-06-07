import type { FormAnswers, LeadScoringResult, LeadTemperature } from '@/types/funnel';

const investmentScore: Record<string, number> = {
  'Menos de 500 €': 0,
  'Entre 500 € y 1.000 €': 15,
  'Entre 1.000 € y 2.000 €': 25,
  'Entre 2.000 € y 3.000 €': 35,
  'Más de 3.000 €': 40
};

const urgencyScore: Record<string, number> = {
  'Lo antes posible': 25,
  'Este mes': 20,
  'En 1 - 3 meses': 15,
  'Más adelante': 5,
  'Estoy explorando opciones': 0
};

const availabilityScore: Record<string, number> = {
  'Menos de 5 horas por semana': 0,
  '5 - 10 horas por semana': 10,
  '10 - 20 horas por semana': 15,
  'Más de 20 horas por semana': 20,
  'Depende del horario y la organización': 5
};

const modalityScore: Record<string, number> = {
  'Online con mentorías 1:1 y tutor personal': 15,
  'Intensivo tipo bootcamp': 15,
  'Online flexible, avanzando a mi ritmo': 10,
  'No lo sé, quiero que me orientéis': 5
};

const objectiveScore: Record<string, number> = {
  'Cambiar de carrera hacia tecnología': 10,
  'Encontrar mi primer empleo en tech': 10,
  'Aprender programación desde cero': 5,
  'Especializarme o subir de nivel profesional': 10,
  'Aprender IA, data o automatización': 10,
  'Crear una web, app o proyecto propio': 5,
  'Todavía no lo tengo claro y necesito orientación': 0
};

function unique(values: string[]): string[] {
  return Array.from(new Set(values));
}

export function scoreLead(answers: FormAnswers): LeadScoringResult {
  const rawScore =
    (investmentScore[answers.investment_range] ?? 0) +
    (urgencyScore[answers.start_timing] ?? 0) +
    (availabilityScore[answers.weekly_availability] ?? 0) +
    (modalityScore[answers.preferred_modality] ?? 0) +
    (objectiveScore[answers.objective] ?? 0);

  const lead_score = Math.min(rawScore, 100);
  const lowBudget = answers.investment_range === 'Menos de 500 €';

  let lead_temperature: LeadTemperature = 'cold';

  if (lead_score >= 80) {
    lead_temperature = 'hot';
  } else if (lead_score >= 45) {
    lead_temperature = 'warm';
  }

  if (lowBudget && lead_temperature === 'hot') {
    lead_temperature = 'warm';
  }

  const lead_tags = unique([
    `${lead_temperature}_lead`,
    lowBudget ? 'low_budget' : '',
    answers.age_range === 'Menos de 18' ? 'minor' : '',
    answers.objective === 'Todavía no lo tengo claro y necesito orientación' ||
    answers.interest_area === 'No lo tengo claro, necesito orientación'
      ? 'needs_orientation'
      : '',
    answers.preferred_modality === 'Online con mentorías 1:1 y tutor personal' ? 'wants_mentoring' : '',
    answers.preferred_modality === 'Intensivo tipo bootcamp' ? 'bootcamp_fit' : '',
    answers.start_timing === 'Lo antes posible' || answers.start_timing === 'Este mes' ? 'urgent_start' : '',
    answers.desired_outcome === 'Cambiar de carrera o de sector' ||
    answers.objective === 'Cambiar de carrera hacia tecnología'
      ? 'career_change'
      : '',
    answers.desired_outcome === 'Conseguir mi primer empleo en tecnología' ||
    answers.objective === 'Encontrar mi primer empleo en tech'
      ? 'job_focus'
      : ''
  ].filter(Boolean));

  return {
    lead_score,
    lead_temperature,
    lead_tags
  };
}

