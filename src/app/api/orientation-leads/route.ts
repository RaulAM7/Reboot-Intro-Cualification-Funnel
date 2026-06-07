import { NextResponse, type NextRequest } from 'next/server';

import { formSteps } from '@/data/formSteps';
import { isStepValid } from '@/lib/formValidation';
import { buildOrientationLeadInsert } from '@/lib/leadPayload';
import { getSupabaseAdmin } from '@/lib/supabaseAdmin';
import type { FormAnswers, LeadSubmissionRequest } from '@/types/funnel';

export const runtime = 'nodejs';

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function parseRequestBody(body: unknown): LeadSubmissionRequest | null {
  if (!isRecord(body) || typeof body.submissionId !== 'string' || !body.submissionId.trim() || !isRecord(body.answers)) {
    return null;
  }

  const answersSource = body.answers;

  const answers: FormAnswers = {
    first_name: typeof answersSource.first_name === 'string' ? answersSource.first_name : '',
    last_name: typeof answersSource.last_name === 'string' ? answersSource.last_name : '',
    age_range: typeof answersSource.age_range === 'string' ? answersSource.age_range : '',
    residence: typeof answersSource.residence === 'string' ? answersSource.residence : '',
    email: typeof answersSource.email === 'string' ? answersSource.email : '',
    whatsapp: typeof answersSource.whatsapp === 'string' ? answersSource.whatsapp : '',
    current_situation: typeof answersSource.current_situation === 'string' ? answersSource.current_situation : '',
    desired_outcome: typeof answersSource.desired_outcome === 'string' ? answersSource.desired_outcome : '',
    objective: typeof answersSource.objective === 'string' ? answersSource.objective : '',
    interest_area: typeof answersSource.interest_area === 'string' ? answersSource.interest_area : '',
    current_level: typeof answersSource.current_level === 'string' ? answersSource.current_level : '',
    education_background: typeof answersSource.education_background === 'string' ? answersSource.education_background : '',
    weekly_availability: typeof answersSource.weekly_availability === 'string' ? answersSource.weekly_availability : '',
    preferred_modality: typeof answersSource.preferred_modality === 'string' ? answersSource.preferred_modality : '',
    investment_range: typeof answersSource.investment_range === 'string' ? answersSource.investment_range : '',
    financing_interest: typeof answersSource.financing_interest === 'string' ? answersSource.financing_interest : '',
    start_timing: typeof answersSource.start_timing === 'string' ? answersSource.start_timing : '',
    additional_context: typeof answersSource.additional_context === 'string' ? answersSource.additional_context : '',
    privacy_accepted: answersSource.privacy_accepted === true
  };

  return {
    submissionId: body.submissionId.trim(),
    answers,
    metadata: isRecord(body.metadata) ? body.metadata : {}
  };
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const parsed = parseRequestBody(body);

  if (!parsed) {
    return NextResponse.json({ ok: false, error: 'invalid_payload' }, { status: 400 });
  }

  const invalidStep = formSteps.find((step) => !isStepValid(step, parsed.answers));

  if (invalidStep) {
    return NextResponse.json({ ok: false, error: 'invalid_answers', field: invalidStep.field }, { status: 400 });
  }

  const supabase = getSupabaseAdmin();

  if (!supabase) {
    return NextResponse.json({ ok: false, error: 'supabase_not_configured' }, { status: 503 });
  }

  const metadata = {
    ...parsed.metadata,
    accept_language: request.headers.get('accept-language'),
    host: request.headers.get('host'),
    source: 'reboot_orientation_funnel_v1',
    submitted_at: new Date().toISOString(),
    user_agent: request.headers.get('user-agent')
  };

  const insertPayload = buildOrientationLeadInsert({
    answers: parsed.answers,
    submissionId: parsed.submissionId,
    metadata
  });

  const { data, error } = await supabase
    .from('orientation_leads')
    .upsert(insertPayload, { onConflict: 'submission_id' })
    .select('id, submission_id')
    .single();

  if (error) {
    return NextResponse.json({ ok: false, error: 'supabase_insert_failed' }, { status: 500 });
  }

  return NextResponse.json({ ok: true, id: data.id, submissionId: data.submission_id });
}

