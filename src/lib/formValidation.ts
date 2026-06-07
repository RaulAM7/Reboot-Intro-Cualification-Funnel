import type { FormAnswers, FormStep } from '@/types/funnel';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function interpolateQuestion(question: string, answers: FormAnswers): string {
  return question.replace(/\{(\w+)\}/g, (_, key: keyof FormAnswers) => {
    const value = answers[key];
    return typeof value === 'string' ? value : '';
  }).replace(/,\s*\./g, '.');
}

export function isStepValid(step: FormStep, answers: FormAnswers): boolean {
  const value = answers[step.field];

  switch (step.type) {
    case 'text':
    case 'textarea':
      return typeof value === 'string' && value.trim().length > 0;
    case 'email':
      return typeof value === 'string' && emailPattern.test(value.trim());
    case 'tel':
      return typeof value === 'string' && value.replace(/\D/g, '').length >= 7;
    case 'single':
      return typeof value === 'string' && value.length > 0;
    case 'consent':
      return value === true;
    default:
      return false;
  }
}

export function getStepError(step: FormStep, answers: FormAnswers): string {
  if (isStepValid(step, answers)) {
    return '';
  }

  switch (step.type) {
    case 'email':
      return 'Introduce un email válido para continuar.';
    case 'tel':
      return 'Introduce un WhatsApp válido para continuar.';
    case 'consent':
      return 'Necesitamos tu consentimiento para continuar.';
    default:
      return 'Responde esta pregunta para continuar.';
  }
}

