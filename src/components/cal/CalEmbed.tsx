'use client';

import Cal, { getCalApi } from '@calcom/embed-react';
import { useEffect } from 'react';

import { trackEvent } from '@/lib/analytics';
import type { FormAnswers } from '@/types/funnel';
import { RebootMark } from '@/components/shared/Brand';

type CalEmbedProps = {
  answers: FormAnswers;
  calLink?: string;
  namespace?: string;
};

function resolveNamespace(namespace: string | undefined, calLink: string) {
  const cleanNamespace = namespace?.trim();

  if (cleanNamespace) {
    return cleanNamespace;
  }

  const slug = calLink
    .split('/')
    .filter(Boolean)
    .at(-1);

  return slug || 'cal-inline';
}

export function CalEmbed({ answers, calLink, namespace }: CalEmbedProps) {
  const cleanCalLink = calLink?.trim();
  const fullName = `${answers.first_name} ${answers.last_name}`.trim();

  useEffect(() => {
    if (!cleanCalLink) {
      return;
    }

    const resolvedNamespace = resolveNamespace(namespace, cleanCalLink);
    trackEvent({ action: 'cal_embed_view', category: 'orientation_funnel' });

    void (async () => {
      const cal = await getCalApi({ namespace: resolvedNamespace });

      cal('ui', {
        hideEventTypeDetails: false,
        layout: 'month_view'
      });
    })();
  }, [cleanCalLink, namespace]);

  if (cleanCalLink) {
    const resolvedNamespace = resolveNamespace(namespace, cleanCalLink);

    return (
      <div className='h-[880px] overflow-hidden rounded-2xl border border-white/10 bg-white shadow-reboot md:h-[920px]'>
        <Cal
          calLink={cleanCalLink}
          config={{
            layout: 'month_view',
            useSlotsViewOnSmallScreen: 'true',
            ...(fullName ? { name: fullName } : {}),
            ...(answers.email ? { email: answers.email.trim() } : {})
          }}
          namespace={resolvedNamespace}
          style={{ height: '100%', overflow: 'scroll', width: '100%' }}
        />
      </div>
    );
  }

  return <CalPlaceholder />;
}

function CalPlaceholder() {
  const days = [
    { day: 'LUN', date: 9 },
    { day: 'MAR', date: 10 },
    { day: 'MIÉ', date: 11 },
    { day: 'JUE', date: 12 },
    { day: 'VIE', date: 13 }
  ];

  const times = ['10:00', '11:30', '13:00', '16:00', '17:30', '19:00'];

  return (
    <div className='overflow-hidden rounded-2xl border border-white/10 bg-[#0b1917] shadow-reboot'>
      <div className='flex items-center gap-3 border-b border-white/10 px-5 py-4'>
        <RebootMark size={26} />
        <div>
          <p className='text-xl font-bold text-white'>Sesión 1:1 de Orientación Reboot</p>
          <p className='text-sm text-white/55'>La agenda de Cal.com se mostrará aquí cuando se configure la URL final.</p>
        </div>
      </div>
      <div className='space-y-6 px-5 py-5'>
        <div>
          <p className='mb-3 text-xs font-bold uppercase tracking-[0.16em] text-white/45'>Vista previa de agenda</p>
          <div className='grid grid-cols-5 gap-2'>
            {days.map((item, index) => (
              <div
                className={`rounded-xl border px-2 py-3 text-center ${index === 2 ? 'border-primary bg-primary text-black' : 'border-white/10 bg-white/5 text-white'}`}
                key={item.day}
              >
                <p className='text-[11px] font-bold uppercase tracking-[0.12em] opacity-75'>{item.day}</p>
                <p className='text-2xl font-bold leading-none'>{item.date}</p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <p className='mb-3 text-xs font-bold uppercase tracking-[0.16em] text-white/45'>Horarios</p>
          <div className='grid gap-3 sm:grid-cols-2'>
            {times.map((time) => (
              <div key={time} className='rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-center text-lg font-bold text-white/70'>
                {time}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
