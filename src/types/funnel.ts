export type StepType = 'text' | 'email' | 'tel' | 'single' | 'textarea' | 'consent';

export type LeadTemperature = 'cold' | 'warm' | 'hot';

export interface FormAnswers {
  first_name: string;
  last_name: string;
  age_range: string;
  residence: string;
  email: string;
  whatsapp: string;
  current_situation: string;
  desired_outcome: string;
  objective: string;
  interest_area: string;
  current_level: string;
  education_background: string;
  weekly_availability: string;
  preferred_modality: string;
  investment_range: string;
  financing_interest: string;
  start_timing: string;
  additional_context: string;
  privacy_accepted: boolean;
}

export type FormAnswerField = keyof FormAnswers;

interface BaseStep<TField extends FormAnswerField, TType extends StepType> {
  id: string;
  section: string;
  type: TType;
  field: TField;
  question: string;
  help?: string;
  required: true;
}

export interface TextStep<TField extends FormAnswerField = FormAnswerField>
  extends BaseStep<TField, 'text' | 'email' | 'tel'> {
  placeholder?: string;
  maxLength?: number;
  autocomplete?: string;
}

export interface SingleChoiceStep<TField extends FormAnswerField = FormAnswerField>
  extends BaseStep<TField, 'single'> {
  options: string[];
}

export interface TextareaStep<TField extends FormAnswerField = FormAnswerField>
  extends BaseStep<TField, 'textarea'> {
  placeholder?: string;
  maxLength?: number;
}

export interface ConsentStep<TField extends FormAnswerField = FormAnswerField>
  extends BaseStep<TField, 'consent'> {
  consentText: string;
  privacyUrl: string;
}

export type FormStep =
  | TextStep
  | SingleChoiceStep
  | TextareaStep
  | ConsentStep;

export interface LeadScoringResult {
  lead_score: number;
  lead_temperature: LeadTemperature;
  lead_tags: string[];
}

export interface LeadSubmissionRequest {
  submissionId: string;
  answers: FormAnswers;
  metadata?: Record<string, unknown>;
}

export interface OrientationLeadInsert extends FormAnswers, LeadScoringResult {
  submission_id: string;
  lead_summary: string;
  raw_answers: FormAnswers;
  metadata: Record<string, unknown>;
}

export interface PersistedFunnelState {
  answers: FormAnswers;
  screen: 'landing' | 'form' | 'complete';
  stepIndex: number;
  submissionId: string;
}

