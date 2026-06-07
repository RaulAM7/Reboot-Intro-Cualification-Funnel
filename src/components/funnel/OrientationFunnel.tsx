'use client';

import { useEffect, useRef, useState } from 'react';

import { CalEmbed } from '@/components/cal/CalEmbed';
import { RebootMark, RebootWordmark } from '@/components/shared/Brand';
import { RebootButton } from '@/components/shared/RebootButton';
import { FORM_STORAGE_KEY, emptyAnswers, formSteps } from '@/data/formSteps';
import { trackEvent } from '@/lib/analytics';
import { getStepError, interpolateQuestion, isStepValid } from '@/lib/formValidation';
import type { FormAnswers, FormStep, LeadSubmissionRequest, PersistedFunnelState } from '@/types/funnel';

type Screen = 'landing' | 'form' | 'complete';
type SubmissionStatus = 'idle' | 'submitting' | 'saved' | 'error';

type OrientationFunnelProps = {
  calLink?: string;
  calNamespace?: string;
};

const optionLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

function createSubmissionId() {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }

  return `reboot-${Date.now()}`;
}

function loadPersistedState(): PersistedFunnelState | null {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const raw = window.localStorage.getItem(FORM_STORAGE_KEY);

    if (!raw) {
      return null;
    }

    return JSON.parse(raw) as PersistedFunnelState;
  } catch {
    return null;
  }
}

function getClientMetadata() {
  if (typeof window === 'undefined') {
    return {};
  }

  return {
    language: window.navigator.language,
    page_url: window.location.href,
    pathname: window.location.pathname,
    referrer: document.referrer || null,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
  };
}

export function OrientationFunnel({ calLink, calNamespace }: OrientationFunnelProps) {
  const [answers, setAnswers] = useState<FormAnswers>(emptyAnswers);
  const [screen, setScreen] = useState<Screen>('landing');
  const [stepIndex, setStepIndex] = useState(0);
  const [error, setError] = useState('');
  const [submissionId, setSubmissionId] = useState('');
  const [submissionStatus, setSubmissionStatus] = useState<SubmissionStatus>('idle');
  const [submissionMessage, setSubmissionMessage] = useState('');

  const currentStep = formSteps[stepIndex];

  useEffect(() => {
    const saved = loadPersistedState();

    if (saved) {
      setAnswers(saved.answers);
      setScreen(saved.screen);
      setStepIndex(saved.stepIndex);
      setSubmissionId(saved.submissionId);
      return;
    }

    setSubmissionId(createSubmissionId());
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined' || !submissionId) {
      return;
    }

    const persistedState: PersistedFunnelState = {
      answers,
      screen,
      stepIndex,
      submissionId
    };

    window.localStorage.setItem(FORM_STORAGE_KEY, JSON.stringify(persistedState));
  }, [answers, screen, stepIndex, submissionId]);

  function updateAnswer<T extends keyof FormAnswers>(field: T, value: FormAnswers[T]) {
    setAnswers((currentAnswers) => ({
      ...currentAnswers,
      [field]: value
    }));

    if (error) {
      setError('');
    }
  }

  function resetFunnel() {
    const nextSubmissionId = createSubmissionId();

    setAnswers(emptyAnswers);
    setScreen('landing');
    setStepIndex(0);
    setError('');
    setSubmissionId(nextSubmissionId);
    setSubmissionStatus('idle');
    setSubmissionMessage('');

    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(FORM_STORAGE_KEY);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  function startFunnel() {
    trackEvent({ action: 'form_start', category: 'orientation_funnel' });
    setScreen('form');
    setStepIndex(0);
    setError('');
    setSubmissionStatus('idle');
    setSubmissionMessage('');

    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  function goBack() {
    if (stepIndex === 0) {
      setScreen('landing');
      setError('');
      return;
    }

    setStepIndex((currentIndex) => currentIndex - 1);
    setError('');
  }

  function goNext() {
    if (!currentStep || !isStepValid(currentStep, answers)) {
      setError(currentStep ? getStepError(currentStep, answers) : 'Responde esta pregunta para continuar.');
      return;
    }

    if (stepIndex === formSteps.length - 1) {
      void submitLead();
      return;
    }

    setStepIndex((currentIndex) => currentIndex + 1);
    setError('');
  }

  async function submitLead() {
    const payload: LeadSubmissionRequest = {
      submissionId: submissionId || createSubmissionId(),
      answers,
      metadata: getClientMetadata()
    };

    if (!submissionId) {
      setSubmissionId(payload.submissionId);
    }

    setScreen('complete');
    setSubmissionStatus('submitting');
    setSubmissionMessage('Guardando tus respuestas mientras accedes a la agenda...');

    try {
      const response = await fetch('/api/orientation-leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error('save_failed');
      }

      trackEvent({ action: 'form_submit', category: 'orientation_funnel' });
      setSubmissionStatus('saved');
      setSubmissionMessage('Tus respuestas ya están guardadas. Ahora solo falta elegir horario.');
    } catch {
      setSubmissionStatus('error');
      setSubmissionMessage('No hemos podido guardar tus respuestas todavía. Puedes reintentarlo desde aquí y seguir igualmente con la reserva.');
    }
  }

  return (
    <div className='min-h-screen bg-[var(--rb-black)] text-white'>
      {screen === 'landing' && <LandingScreen onStart={startFunnel} />}
      {screen === 'form' && currentStep && (
        <FormScreen
          answers={answers}
          currentStep={currentStep}
          error={error}
          onBack={goBack}
          onChoiceSelect={(option) => {
            updateAnswer(currentStep.field, option as never);

            window.setTimeout(() => {
              if (stepIndex < formSteps.length - 1) {
                setStepIndex((currentIndex) => currentIndex + 1);
              }
            }, 220);
          }}
          onContinue={goNext}
          onInputChange={updateAnswer}
          stepIndex={stepIndex}
        />
      )}
      {screen === 'complete' && (
        <CompletionScreen
          answers={answers}
          calLink={calLink}
          calNamespace={calNamespace}
          onReset={resetFunnel}
          onRetrySave={() => void submitLead()}
          submissionMessage={submissionMessage}
          submissionStatus={submissionStatus}
        />
      )}
    </div>
  );
}

function LandingScreen({ onStart }: { onStart: () => void }) {
  const points = [
    {
      title: 'Orientación, no catálogo',
      body: 'No vendemos un curso suelto: entendemos tu punto de partida y trazamos una ruta.'
    },
    {
      title: 'Acompañamiento real',
      body: 'Mentorías 1:1 y un itinerario personalizado según tu objetivo y tu tiempo.'
    },
    {
      title: 'Termina en una sesión 1:1',
      body: 'Hablas con el equipo de Reboot para validar tu encaje, sin compromiso.'
    }
  ];

  return (
    <div className='min-h-screen bg-black text-white'>
      <header className='relative z-10 mx-auto flex min-h-[92px] w-full max-w-[1900px] items-center justify-between border-b border-white/40 px-5 md:px-12 lg:px-16'>
        <RebootWordmark className='h-6 w-auto' />
        <RebootButton className='min-h-11 px-5 text-base md:text-lg' onClick={onStart}>
          Empezar
        </RebootButton>
      </header>

      <section className='relative overflow-hidden bg-black'>
        <div
          className='absolute inset-0 bg-cover bg-center'
          style={{ backgroundImage: "url('/brand/header-home.jpg')" }}
        />
        <div className='absolute inset-0 bg-[linear-gradient(to_right,rgba(5,15,14,0.97)_0%,rgba(5,15,14,0.82)_30%,rgba(5,15,14,0.32)_62%,rgba(5,15,14,0.2)_84%,rgba(5,15,14,0.95)_100%)]' />
        <div className='absolute inset-0 bg-[linear-gradient(to_bottom,rgba(5,15,14,0.25)_0%,transparent_30%,transparent_70%,rgba(5,15,14,0.9)_100%)]' />
        <div className='absolute inset-0 bg-[radial-gradient(110%_80%_at_82%_14%,rgba(54,224,214,0.18),transparent_55%)]' />

        <div className='relative mx-auto flex min-h-[500px] max-w-[1900px] items-center px-5 py-14 md:min-h-[660px] md:px-12 lg:px-16'>
          <div className='w-full max-w-[1500px]'>
            <p className='mb-4 text-sm font-bold uppercase tracking-[0.14em] text-primary md:text-base'>Orientación · Admisión</p>
            <h1 className='text-[2.9rem] font-extrabold leading-[0.9] tracking-[-0.02em] md:text-[4.2rem] lg:text-[5.5rem] xl:text-[6rem]'>
              Cuéntanos tu situación y vemos cómo empezar tu <span className='text-primary'>reboot profesional</span>.
            </h1>
            <p className='mt-6 max-w-[640px] text-xl leading-[1.4] text-white/82 md:text-2xl'>
              Unas preguntas rápidas sobre dónde estás, qué quieres conseguir y de cuánto tiempo dispones. Con eso preparamos una
              sesión 1:1 para proponerte una ruta realista.
            </p>
            <div className='mt-9 flex flex-wrap items-center gap-5'>
              <RebootButton onClick={onStart}>Empezar →</RebootButton>
              <span className='text-lg font-medium text-white/62 md:text-xl'>Tarda unos 2 minutos</span>
            </div>
          </div>
        </div>
      </section>

      <section className='bg-[linear-gradient(180deg,hsl(174_56%_4%)_0%,rgba(10,66,62,1)_100%)]'>
        <div className='mx-auto max-w-[1900px] px-5 py-12 md:px-12 md:py-16 lg:px-16'>
          <h2 className='max-w-[760px] text-4xl font-extrabold leading-[0.95] tracking-[-0.015em] md:text-5xl'>
            No es un formulario más. Es tu primer paso dentro de Reboot.
          </h2>
          <p className='mt-4 max-w-[660px] text-xl leading-[1.4] text-white/72 md:text-2xl'>
            Tus respuestas nos sirven para entender tu caso antes de hablar. Así la sesión no es genérica: vamos directos a tu objetivo y a
            las opciones que de verdad encajan contigo.
          </p>
          <div className='mt-10 grid gap-6 md:grid-cols-3'>
            {points.map((point) => (
              <div className='border-t-2 border-primary pt-4' key={point.title}>
                <div className='mb-2 flex items-center gap-3'>
                  <RebootMark size={22} />
                  <h3 className='text-[1.6rem] font-extrabold leading-none'>{point.title}</h3>
                </div>
                <p className='text-lg leading-[1.4] text-white/68 md:text-xl'>{point.body}</p>
              </div>
            ))}
          </div>
          <div className='mt-10'>
            <RebootButton onClick={onStart}>Empezar el cuestionario →</RebootButton>
          </div>
        </div>
      </section>

      <footer className='border-t border-white/10 bg-black px-5 py-6 md:px-12 lg:px-16'>
        <div className='mx-auto flex max-w-[1900px] flex-wrap items-center justify-between gap-4'>
          <RebootWordmark className='h-[18px] w-auto text-white' mono />
          <p className='text-sm text-white/45'>
            © Reboot Academy ·{' '}
            <a className='text-secondary underline' href='https://reboot.academy/legal/privacy-policy' rel='noreferrer' target='_blank'>
              Política de privacidad
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}

type FormScreenProps = {
  answers: FormAnswers;
  currentStep: FormStep;
  error: string;
  onBack: () => void;
  onChoiceSelect: (option: string) => void;
  onContinue: () => void;
  onInputChange: <T extends keyof FormAnswers>(field: T, value: FormAnswers[T]) => void;
  stepIndex: number;
};

function FormScreen({ answers, currentStep, error, onBack, onChoiceSelect, onContinue, onInputChange, stepIndex }: FormScreenProps) {
  const progress = ((stepIndex + 1) / formSteps.length) * 100;

  return (
    <div className='flex min-h-screen flex-col bg-[var(--rb-black)]'>
      <div className='h-1 w-full bg-white/12'>
        <div className='h-full bg-primary transition-[width] duration-300' style={{ width: `${progress}%` }} />
      </div>

      <header className='flex items-center justify-between border-b border-white/12 px-5 py-4 md:px-10'>
        <RebootWordmark className='h-5 w-auto text-white' mono />
        <p className='text-base font-bold text-white/55'>
          {stepIndex + 1} <span className='text-white/35'>/ {formSteps.length}</span>
        </p>
      </header>

      <main className='flex flex-1 justify-center px-5 py-8 md:px-8 md:py-12'>
        <div className='w-full max-w-[620px]'>
          <div className='mb-4 flex items-center gap-3'>
            <span className='font-bold uppercase tracking-[0.14em] text-primary'>{String(stepIndex + 1).padStart(2, '0')} →</span>
            <span className='text-xs font-bold uppercase tracking-[0.16em] text-white/45'>{currentStep.section}</span>
          </div>

          <h2 className='text-[2rem] font-extrabold leading-[0.98] tracking-[-0.02em] md:text-[2.8rem]'>
            {interpolateQuestion(currentStep.question, answers)}
          </h2>

          {currentStep.help ? <p className='mt-4 text-xl leading-[1.35] text-white/72'>{currentStep.help}</p> : <div className='h-8' />}

          <div className='mt-6'>
            {(currentStep.type === 'text' || currentStep.type === 'email' || currentStep.type === 'tel') && (
              <QuestionInput
                invalid={Boolean(error)}
                onChange={(value) => onInputChange(currentStep.field, value as never)}
                onEnter={onContinue}
                placeholder={currentStep.placeholder}
                type={currentStep.type}
                value={String(answers[currentStep.field] || '')}
              />
            )}

            {currentStep.type === 'textarea' && (
              <QuestionTextarea
                onChange={(value) => onInputChange(currentStep.field, value as never)}
                onSubmit={onContinue}
                placeholder={currentStep.placeholder}
                value={String(answers[currentStep.field] || '')}
              />
            )}

            {currentStep.type === 'single' && (
              <div className='flex flex-col gap-3'>
                {currentStep.options.map((option, index) => (
                  <ChoiceCard
                    key={option}
                    label={option}
                    letter={optionLetters[index] || `${index + 1}`}
                    onClick={() => onChoiceSelect(option)}
                    selected={answers[currentStep.field] === option}
                  />
                ))}
              </div>
            )}

            {currentStep.type === 'consent' && (
              <ConsentCard
                checked={Boolean(answers[currentStep.field])}
                onChange={(checked) => onInputChange(currentStep.field, checked as never)}
                privacyUrl={currentStep.privacyUrl}
                text={currentStep.consentText}
              />
            )}
          </div>

          {error ? <p className='mt-4 text-lg font-bold text-[#ff8a8a]'>{error}</p> : null}

          <div className='mt-8 flex flex-wrap items-center gap-4'>
            <RebootButton onClick={onContinue}>{stepIndex === formSteps.length - 1 ? 'Enviar y reservar mi sesión' : 'Continuar →'}</RebootButton>
            {(currentStep.type === 'text' || currentStep.type === 'email' || currentStep.type === 'tel') && (
              <span className='text-base text-white/45'>pulsa <strong className='text-white/75'>Enter ↵</strong></span>
            )}
            {currentStep.type === 'textarea' && <span className='text-base text-white/45'><strong className='text-white/75'>Ctrl + Enter</strong> para continuar</span>}
          </div>
        </div>
      </main>

      <footer className='border-t border-white/12 px-5 py-4 md:px-10'>
        <button className='text-base font-bold text-white/45 transition-colors hover:text-white' onClick={onBack} type='button'>
          ← {stepIndex === 0 ? 'Volver al inicio' : 'Atrás'}
        </button>
      </footer>
    </div>
  );
}

function ChoiceCard({ letter, label, onClick, selected }: { letter: string; label: string; onClick: () => void; selected: boolean }) {
  return (
    <button
      className={`flex w-full items-center gap-4 rounded-lg border px-4 py-4 text-left transition-colors ${selected ? 'border-primary bg-primary text-black' : 'border-white/12 bg-white/5 text-white hover:bg-[rgba(54,224,214,0.1)] hover:text-white'}`}
      onClick={onClick}
      type='button'
    >
      <span className={`grid h-8 w-8 place-items-center rounded-[4px] border text-base font-extrabold ${selected ? 'border-black text-black' : 'border-white/25 text-white/55'}`}>
        {letter}
      </span>
      <span className='text-xl font-semibold leading-[1.15] md:text-[1.35rem]'>{label}</span>
      {selected ? <span className='ml-auto text-xl font-extrabold'>✓</span> : null}
    </button>
  );
}

function QuestionInput({ invalid, onChange, onEnter, placeholder, type, value }: { invalid: boolean; onChange: (value: string) => void; onEnter: () => void; placeholder?: string; type: 'text' | 'email' | 'tel'; value: string }) {
  const ref = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    ref.current?.focus();
  }, []);

  return (
    <input
      autoComplete={type === 'tel' ? 'tel' : type === 'email' ? 'email' : 'on'}
      className={`w-full border-0 border-b-2 bg-transparent px-0 py-2 text-[2rem] font-semibold text-white outline-none placeholder:text-white/20 focus:ring-0 md:text-[2.5rem] ${invalid ? 'border-[#ff8a8a]' : 'border-white/40 focus:border-primary'}`}
      inputMode={type === 'tel' ? 'tel' : type === 'email' ? 'email' : 'text'}
      onChange={(event) => onChange(event.target.value)}
      onKeyDown={(event) => {
        if (event.key === 'Enter') {
          event.preventDefault();
          onEnter();
        }
      }}
      placeholder={placeholder}
      ref={ref}
      type={type}
      value={value}
    />
  );
}

function QuestionTextarea({ onChange, onSubmit, placeholder, value }: { onChange: (value: string) => void; onSubmit: () => void; placeholder?: string; value: string }) {
  const ref = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    ref.current?.focus();
  }, []);

  return (
    <textarea
      className='min-h-40 w-full rounded-xl border border-white/12 bg-white/5 p-4 text-xl font-medium text-white outline-none placeholder:text-white/30 focus:border-primary focus:ring-0'
      onChange={(event) => onChange(event.target.value)}
      onKeyDown={(event) => {
        if (event.key === 'Enter' && (event.metaKey || event.ctrlKey)) {
          event.preventDefault();
          onSubmit();
        }
      }}
      placeholder={placeholder}
      ref={ref}
      rows={4}
      value={value}
    />
  );
}

function ConsentCard({ checked, onChange, privacyUrl, text }: { checked: boolean; onChange: (checked: boolean) => void; privacyUrl: string; text: string }) {
  return (
    <label className={`flex cursor-pointer gap-4 rounded-lg border px-5 py-4 transition-colors ${checked ? 'border-primary bg-[rgba(54,224,214,0.12)]' : 'border-white/12 bg-white/5'}`}>
      <span className={`mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-[5px] border text-sm font-extrabold ${checked ? 'border-primary bg-primary text-black' : 'border-white/25 text-transparent'}`}>
        ✓
      </span>
      <input checked={checked} className='sr-only' onChange={(event) => onChange(event.target.checked)} type='checkbox' />
      <span className='text-lg leading-[1.4] text-white/85'>
        {text}{' '}
        <a className='font-bold text-secondary underline' href={privacyUrl} rel='noreferrer' target='_blank'>
          Ver política de privacidad
        </a>
        .
      </span>
    </label>
  );
}

type CompletionScreenProps = {
  answers: FormAnswers;
  calLink?: string;
  calNamespace?: string;
  onReset: () => void;
  onRetrySave: () => void;
  submissionMessage: string;
  submissionStatus: SubmissionStatus;
};

function CompletionScreen({ answers, calLink, calNamespace, onReset, onRetrySave, submissionMessage, submissionStatus }: CompletionScreenProps) {
  return (
    <div className='min-h-screen bg-[var(--rb-black)] text-white'>
      <header className='sticky top-0 z-20 flex items-center justify-between border-b border-white/12 bg-[var(--rb-black)] px-5 py-4 md:px-10'>
        <RebootWordmark className='h-[22px] w-auto text-white' mono />
        <span className='text-xs font-bold uppercase tracking-[0.16em] text-primary'>Paso final</span>
      </header>

      <div className='mx-auto max-w-[820px] px-5 py-10 md:px-8 md:py-14'>
        <div className='mb-5 inline-flex items-center gap-3 text-lg font-bold text-primary'>
          <RebootMark size={30} />
          ¡Gracias, {answers.first_name || 'todo listo'}!
        </div>
        <h1 className='text-[2.4rem] font-extrabold leading-[0.95] tracking-[-0.02em] md:text-[3.5rem]'>
          Reserva tu Sesión 1:1 de Orientación Reboot
        </h1>
        <p className='mt-5 text-xl leading-[1.45] text-white/72 md:text-2xl'>
          Con tus respuestas ya podemos revisar tu caso y orientarte mejor. En la sesión repasaremos tu objetivo, tu disponibilidad, tu
          punto de partida y las opciones de bootcamp o itinerario que podrían encajar contigo.
        </p>
        <p className='mt-3 text-lg leading-[1.4] text-white/45'>Te recomendamos reservar un momento en el que puedas hablar con calma.</p>

        <SubmissionBanner message={submissionMessage} onRetrySave={onRetrySave} status={submissionStatus} />

        <div className='mt-8'>
          <CalEmbed answers={answers} calLink={calLink} namespace={calNamespace} />
        </div>

        <p className='mt-5 text-center text-sm text-white/45'>¿Prefieres hacerlo más tarde? Puedes cerrar esta página y reservar cuando tengamos la agenda definitiva activa.</p>

        <div className='mt-8 text-center'>
          <button className='text-sm font-semibold text-white/55 underline transition-colors hover:text-white' onClick={onReset} type='button'>
            Volver al inicio
          </button>
        </div>
      </div>
    </div>
  );
}

function SubmissionBanner({ message, onRetrySave, status }: { message: string; onRetrySave: () => void; status: SubmissionStatus }) {
  if (!message) {
    return null;
  }

  const styles = {
    idle: 'border-white/12 bg-white/5 text-white/75',
    submitting: 'border-primary/40 bg-[rgba(54,224,214,0.08)] text-white',
    saved: 'border-primary bg-[rgba(54,224,214,0.12)] text-white',
    error: 'border-[#ff8a8a]/70 bg-[rgba(255,138,138,0.08)] text-white'
  };

  return (
    <div className={`mt-8 rounded-2xl border p-4 ${styles[status]}`}>
      <p className='text-base font-semibold leading-[1.45]'>{message}</p>
      {status === 'error' ? (
        <div className='mt-4'>
          <RebootButton className='min-h-11 px-5 text-base md:text-lg' onClick={onRetrySave} variant='ghost'>
            Reintentar guardado
          </RebootButton>
        </div>
      ) : null}
    </div>
  );
}
