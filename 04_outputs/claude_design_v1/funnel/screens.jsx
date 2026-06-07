/* Reboot Orientation Funnel — Landing + Final screens. */

// ============================== LANDING ==============================
// Reboot "antechamber": full-bleed hero with edge fades (as on reboot.academy),
// then a gradient-vert band that frames this as orientation — not a course catalog.
function Landing({ onStart, t }) {
  const points = [
    { k: 'Orientación, no catálogo', v: 'No vendemos un curso suelto: entendemos tu punto de partida y trazamos una ruta.' },
    { k: 'Acompañamiento real', v: 'Mentorías 1:1 y un itinerario personalizado según tu objetivo y tu tiempo.' },
    { k: 'Termina en una sesión 1:1', v: 'Hablas con el equipo de Reboot para validar tu encaje, sin compromiso.' }
  ];
  return (
    <div style={{ minHeight: '100%', background: 'var(--rb-black)', color: '#fff' }}>
      {/* NAVBAR — Reboot: wordmark left, hairline bottom border, teal narrow CTA right */}
      <header style={{
        position: 'relative', zIndex: 3, maxWidth: 1900, margin: '0 auto', display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', minHeight: 92, padding: '0 clamp(1.25rem, 4vw, 4rem)',
        borderBottom: '0.5px solid rgba(255,255,255,0.4)'
      }}>
        <RebootWordmark height={26} />
        <RBButton onClick={onStart} style={{ height: 44, minWidth: 0, padding: '0 1.15rem', fontSize: '1.05rem' }}>
          Empezar
        </RBButton>
      </header>

      {/* HERO — full-bleed photo with Reboot's left/right black edge fades */}
      <section style={{ position: 'relative', overflow: 'hidden', background: 'var(--rb-black)' }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: "url('funnel/headerHome.jpg')",
          backgroundSize: 'cover', backgroundPosition: 'center'
        }} />
        {/* horizontal edge fade — darker on the left for legibility, hard edges like reboot.academy */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to right, rgba(5,15,14,0.97) 0%, rgba(5,15,14,0.82) 30%, rgba(5,15,14,0.32) 62%, rgba(5,15,14,0.2) 84%, rgba(5,15,14,0.95) 100%)'
        }} />
        {/* vertical seat into the page */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(5,15,14,0.25) 0%, transparent 30%, transparent 70%, rgba(5,15,14,0.9) 100%)'
        }} />
        {/* subtle teal glow */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(110% 80% at 82% 14%, rgba(54,224,214,0.18), transparent 55%)'
        }} />
        <div style={{
          position: 'relative', maxWidth: 1280, margin: '0 auto',
          minHeight: 'clamp(440px, 64vh, 620px)', display: 'flex', alignItems: 'center',
          padding: 'clamp(3rem, 7vw, 5rem) clamp(1.25rem, 4vw, 4rem)'
        }}>
          <div style={{ maxWidth: 720 }}>
            <p style={{
              fontSize: 'clamp(0.82rem,2.2vw,1rem)', fontWeight: 700, color: 'var(--rb-primary)',
              letterSpacing: '0.14em', textTransform: 'uppercase', margin: '0 0 1.1rem'
            }}>Orientación · Admisión</p>
            <h1 style={{
              fontSize: 'clamp(2.9rem, 7.4vw, 5.5rem)', fontWeight: 800, lineHeight: 1.0,
              letterSpacing: '-0.02em', margin: 0, textWrap: 'balance'
            }}>
              Cuéntanos tu situación y vemos cómo empezar tu{' '}
              <span style={{ color: 'var(--rb-primary)' }}>reboot profesional</span>.
            </h1>
            <p style={{
              fontSize: 'clamp(1.15rem, 2.4vw, 1.5rem)', fontWeight: 400, lineHeight: 1.4,
              color: 'rgba(255,255,255,0.82)', margin: '1.6rem 0 0', maxWidth: 600, textWrap: 'pretty'
            }}>
              Unas preguntas rápidas sobre dónde estás, qué quieres conseguir y de cuánto tiempo dispones.
              Con eso preparamos una sesión 1:1 para proponerte una ruta realista.
            </p>
            <div style={{ marginTop: '2.2rem', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '1.2rem' }}>
              <RBButton onClick={onStart}>Empezar&nbsp;&rarr;</RBButton>
              <span style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.62)', fontWeight: 500 }}>
                Tarda unos 2 minutos
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ORIENTATION BAND — gradient-vert (dark teal → teal-green), like Reboot form headers */}
      <section style={{ background: 'linear-gradient(180deg, hsl(174 56% 4%) 0%, rgba(10,66,62,1) 100%)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: 'clamp(2.75rem,6vw,4.75rem) clamp(1.25rem,4vw,4rem)' }}>
          <h2 style={{
            fontSize: 'clamp(1.9rem,4.6vw,3rem)', fontWeight: 800, letterSpacing: '-0.015em',
            lineHeight: 1.02, margin: '0 0 0.8rem', maxWidth: 720, textWrap: 'balance'
          }}>
            No es un formulario más. Es tu primer paso dentro de Reboot.
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: 'clamp(1.1rem,2.2vw,1.3rem)', lineHeight: 1.4, margin: '0 0 2.4rem', maxWidth: 640, textWrap: 'pretty' }}>
            Tus respuestas nos sirven para entender tu caso antes de hablar. Así la sesión no es genérica:
            vamos directos a tu objetivo y a las opciones que de verdad encajan contigo.
          </p>
          <div style={{ display: 'grid', gap: '1.4rem clamp(1.5rem,4vw,3rem)', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))' }}>
            {points.map((p) => (
              <div key={p.k} style={{ borderTop: '2px solid var(--rb-primary)', paddingTop: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.45rem' }}>
                  <RebootMark size={22} />
                  <h3 style={{ fontSize: 'clamp(1.2rem,2.4vw,1.45rem)', fontWeight: 800, margin: 0, lineHeight: 1.05 }}>{p.k}</h3>
                </div>
                <p style={{ color: 'rgba(255,255,255,0.68)', fontSize: '1.05rem', lineHeight: 1.4, margin: 0, textWrap: 'pretty' }}>{p.v}</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: '2.6rem' }}>
            <RBButton onClick={onStart}>Empezar el cuestionario&nbsp;&rarr;</RBButton>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{
        background: 'var(--rb-black)', borderTop: '0.5px solid rgba(255,255,255,0.12)',
        padding: '1.6rem clamp(1.25rem,4vw,4rem)'
      }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', justifyContent: 'space-between' }}>
          <RebootWordmark height={18} mono />
          <span style={{ fontSize: '0.92rem', color: 'rgba(255,255,255,0.45)' }}>
            © Reboot Academy · <a href="https://reboot.academy/legal/privacy-policy" target="_blank" rel="noreferrer" style={{ color: 'var(--rb-secondary)', textDecoration: 'underline' }}>Política de privacidad</a>
          </span>
        </div>
      </footer>
    </div>
  );
}

// ============================== FINAL ==============================
function FinalScreen({ answers, lead, calUrl, onRestart }) {
  const tempLabel = { hot: 'Prioridad alta', warm: 'Buen encaje', cold: 'En valoración' }[lead.temperature] || '';
  return (
    <div style={{ minHeight: '100%', background: 'var(--rb-surface)', color: 'var(--rb-text)' }}>
      <header style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '1.25rem clamp(1.25rem,4vw,3rem)', borderBottom: '1px solid var(--rb-line)',
        position: 'sticky', top: 0, background: 'var(--rb-surface)', zIndex: 5
      }}>
        <div style={{ color: 'var(--rb-text)' }}><RebootWordmark height={22} mono /></div>
        <span style={{
          fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase',
          color: 'var(--rb-primary-ink)'
        }}>Paso final</span>
      </header>

      <div style={{ maxWidth: 760, margin: '0 auto', padding: 'clamp(2.5rem,6vw,4rem) clamp(1.25rem,4vw,2rem) 4rem' }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.4rem',
          color: 'var(--rb-primary-ink)', fontWeight: 700, fontSize: '1.05rem'
        }}>
          <RebootMark size={30} /> ¡Gracias, {answers.first_name || 'todo listo'}!
        </div>
        <h1 style={{ fontSize: 'clamp(2.2rem,6vw,3.4rem)', fontWeight: 800, lineHeight: 1.02, letterSpacing: '-0.02em', margin: '0 0 1.1rem', textWrap: 'balance' }}>
          Reserva tu Sesión 1:1 de Orientación Reboot
        </h1>
        <p style={{ fontSize: '1.2rem', lineHeight: 1.45, color: 'var(--rb-muted)', margin: '0 0 0.9rem', textWrap: 'pretty' }}>
          Con tus respuestas ya podemos revisar tu caso y orientarte mejor. En la sesión repasaremos tu
          objetivo, tu disponibilidad, tu punto de partida y las opciones de bootcamp o itinerario que
          podrían encajar contigo.
        </p>
        <p style={{ fontSize: '1.05rem', lineHeight: 1.4, color: 'var(--rb-faint)', margin: '0 0 2rem', textWrap: 'pretty' }}>
          Te recomendamos reservar un momento en el que puedas hablar con calma.
        </p>

        {/* Cal.com embed slot */}
        <CalEmbed calUrl={calUrl} answers={answers} />

        {/* internal-ish reassurance note */}
        <p style={{ fontSize: '0.95rem', color: 'var(--rb-faint)', marginTop: '1.4rem', textAlign: 'center' }}>
          ¿Prefieres hacerlo más tarde? Te hemos guardado. Puedes cerrar esta página y reservar desde el enlace que te enviaremos.
        </p>

        <div style={{ marginTop: '2.2rem', textAlign: 'center' }}>
          <button onClick={onRestart} style={{
            background: 'none', border: 'none', cursor: 'pointer', color: 'var(--rb-faint)',
            fontFamily: 'inherit', fontSize: '0.95rem', textDecoration: 'underline'
          }}>Volver al inicio</button>
        </div>
      </div>
    </div>
  );
}

// Cal.com embed — uses real iframe if calUrl provided, else an on-brand booking placeholder.
function CalEmbed({ calUrl, answers }) {
  if (calUrl) {
    let src = calUrl;
    try {
      const u = new URL(calUrl);
      if (answers.first_name) u.searchParams.set('name', `${answers.first_name} ${answers.last_name || ''}`.trim());
      if (answers.email) u.searchParams.set('email', answers.email);
      src = u.toString();
    } catch (e) { /* keep as-is */ }
    return (
      <div style={{ border: '1px solid var(--rb-line)', borderRadius: 12, overflow: 'hidden', background: '#fff' }}>
        <iframe title="Reservar sesión" src={src} style={{ width: '100%', height: 640, border: 'none' }} />
      </div>
    );
  }
  return <CalPlaceholder answers={answers} />;
}

function CalPlaceholder({ answers }) {
  const days = [
    { d: 'LUN', n: 9 }, { d: 'MAR', n: 10 }, { d: 'MIÉ', n: 11 }, { d: 'JUE', n: 12 }, { d: 'VIE', n: 13 }
  ];
  const times = ['10:00', '11:30', '13:00', '16:00', '17:30', '19:00'];
  const [day, setDay] = React.useState(2);
  const [time, setTime] = React.useState(null);
  const [booked, setBooked] = React.useState(false);

  if (booked) {
    return (
      <div style={{
        border: '1.5px solid var(--rb-primary)', borderRadius: 12, padding: '2.2rem 1.6rem', textAlign: 'center',
        background: 'var(--rb-primary-tint)'
      }}>
        <RebootMark size={40} />
        <h3 style={{ fontSize: '1.6rem', fontWeight: 800, margin: '0.8rem 0 0.4rem', color: 'var(--rb-text)' }}>Sesión reservada</h3>
        <p style={{ color: 'var(--rb-muted)', fontSize: '1.1rem', margin: 0 }}>
          {days[day].d} {days[day].n} · {time} · 30 min con el equipo de Reboot
        </p>
        <p style={{ color: 'var(--rb-faint)', fontSize: '0.92rem', marginTop: '0.8rem' }}>
          Te llegará la confirmación a {answers.email || 'tu email'}.
        </p>
        <div style={{ marginTop: '1.4rem' }}>
          <button onClick={() => { setBooked(false); setTime(null); }} style={{
            background: 'none', border: 'none', cursor: 'pointer', color: 'var(--rb-primary-ink)',
            fontFamily: 'inherit', fontSize: '0.95rem', textDecoration: 'underline', fontWeight: 600
          }}>Cambiar horario</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ border: '1px solid var(--rb-line)', borderRadius: 12, overflow: 'hidden', background: 'var(--rb-card)' }}>
      <div style={{ padding: '1.1rem 1.3rem', borderBottom: '1px solid var(--rb-line)', display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
        <RebootMark size={26} />
        <div>
          <div style={{ fontWeight: 800, fontSize: '1.15rem', color: 'var(--rb-text)' }}>Sesión 1:1 de Orientación Reboot</div>
          <div style={{ fontSize: '0.92rem', color: 'var(--rb-faint)' }}>30 min · videollamada · gratuita</div>
        </div>
        <span style={{
          marginLeft: 'auto', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase',
          color: 'var(--rb-faint)', border: '1px dashed var(--rb-line-strong)', borderRadius: 5, padding: '0.3rem 0.5rem'
        }}>Cal.com</span>
      </div>
      <div style={{ padding: '1.3rem' }}>
        <div style={{ fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--rb-faint)', marginBottom: '0.7rem' }}>Junio 2026 · elige un día</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '0.5rem', marginBottom: '1.3rem' }}>
          {days.map((dd, i) => (
            <button key={dd.d} onClick={() => { setDay(i); setTime(null); }} style={{
              border: `1.5px solid ${i === day ? 'var(--rb-primary)' : 'var(--rb-line)'}`,
              background: i === day ? 'var(--rb-primary)' : 'transparent',
              color: i === day ? '#04201d' : 'var(--rb-text)', borderRadius: 8, padding: '0.6rem 0',
              cursor: 'pointer', fontFamily: 'inherit', transition: 'all .12s ease'
            }}>
              <div style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.06em', opacity: 0.7 }}>{dd.d}</div>
              <div style={{ fontSize: '1.3rem', fontWeight: 800, lineHeight: 1.1 }}>{dd.n}</div>
            </button>
          ))}
        </div>
        <div style={{ fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--rb-faint)', marginBottom: '0.7rem' }}>Hora (CET)</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(92px,1fr))', gap: '0.5rem' }}>
          {times.map((tm) => (
            <button key={tm} onClick={() => setTime(tm)} style={{
              border: `1.5px solid ${time === tm ? 'var(--rb-primary)' : 'var(--rb-line)'}`,
              background: time === tm ? 'var(--rb-primary)' : 'transparent',
              color: time === tm ? '#04201d' : 'var(--rb-text)', borderRadius: 8, padding: '0.65rem 0',
              cursor: 'pointer', fontFamily: 'inherit', fontWeight: 700, fontSize: '1.05rem', transition: 'all .12s ease'
            }}>{tm}</button>
          ))}
        </div>
        <div style={{ marginTop: '1.4rem' }}>
          <RBButton full disabled={!time} onClick={() => setTime(time && setBooked(true))}>
            {time ? `Confirmar ${days[day].d} ${days[day].n} · ${time}` : 'Elige un horario'}
          </RBButton>
        </div>
        <p style={{ fontSize: '0.82rem', color: 'var(--rb-faint)', textAlign: 'center', margin: '0.9rem 0 0' }}>
          Calendario de muestra · se sustituye por el embed real de Cal.com
        </p>
      </div>
    </div>
  );
}

Object.assign(window, { Landing, FinalScreen });
