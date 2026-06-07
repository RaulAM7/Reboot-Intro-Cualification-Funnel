import { scoreLead } from '@/lib/leadScoring';
import { summarizeLead } from '@/lib/leadSummary';
import type { FormAnswers, OrientationLeadInsert } from '@/types/funnel';

export function buildOrientationLeadInsert({
  answers,
  submissionId,
  metadata = {}
}: {
  answers: FormAnswers;
  submissionId: string;
  metadata?: Record<string, unknown>;
}): OrientationLeadInsert {
  const scoring = scoreLead(answers);

  return {
    submission_id: submissionId,
    ...answers,
    ...scoring,
    lead_summary: summarizeLead(answers, scoring),
    raw_answers: answers,
    metadata
  };
}

