/* Reboot Orientation Funnel — Typeform-style one-question flow. */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function interpolate(str, answers) {
  return str.replace(/\{(\w+)\}/g, (m, k) => answers[k] || '').replace(/,\s*\./g, '.');
}

function isStepValid(step, answers) {
  const v = answers[step.field];
  switch (step.type) {
    case 'text': return !!(v && v.trim());
    case 'email': return EMAIL_RE.test((v || '').trim());
    case 'tel': return ((v || '').replace(/[^\d]/g, '').length >= 7);
    case 'single': return !!v;
    case 'textarea': return !!(v && v.trim());
    case 'consent': return v === true;
    default: return true;
  }
}

function FormFlow({ steps, answers, setAnswer, onComplete, onExit, tweaks }) {
  const [index, setIndex] = React.useState(0);
  const [dir, setDir] = React.useState(1);
  const [error, setError] = React.useState('');
  const [anim, setAnim] = React.useState('in');
  const step = steps[index];
  const total = steps.length;
  const progress = index / total;

  const go = React.useCallback((nextIdx, direction) => {
    setDir(direction);
    setAnim('out');
    setError('');
    setTimeout(() => {
      if (nextIdx >= total) { onComplete(); return; }
      setIndex(nextIdx);
      setAnim('in');
    }, 180);
  }, [total, onComplete]);

  const handleNext = React.useCallback(() => {
    if (!isStepValid(step, answers)) {
      setError(step.type === 'email' ? 'Introduce un email válido para continuar.'
        : step.type === 'consent' ? 'Necesitamos tu consentimiento para continuar.'
        : 'Responde esta pregunta para continuar.');
      return;
    }
    go(index + 1, 1);
  }, [step, answers, index, go]);

  const handleBack = React.useCallback(() => {
    if (index === 0) { onExit(); return; }
    go(index - 1, -1);
  }, [index, go, onExit]);

  // keyboard: Enter advances (except textarea uses Ctrl/Cmd+Enter)
  React.useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Enter') {
        if (step.type === 'textarea' && !(e.metaKey || e.ctrlKey)) return;
        if (document.activeElement && document.activeElement.tagName === 'INPUT' && step.type !== 'single') return; // input handles its own Enter
        e.preventDefault();
        handleNext();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [step, handleNext]);

  const selectSingle = (opt) => {
    setAnswer(step.field, opt);
    setError('');
    if (tweaks.autoAdvance) {
      setTimeout(() => go(index + 1, 1), 280);
    }
  };

  const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  const valid = isStepValid(step, answers);

  return (
    <div style={{ minHeight: '100%', background: 'var(--rb-surface)', color: 'var(--rb-text)', display: 'flex', flexDirection: 'column' }}>
      {/* TOP BAR */}
      <ProgressBar value={progress} />
      <header style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '1rem clamp(1.1rem,4vw,2.5rem)', borderBottom: '1px solid var(--rb-line)'
      }}>
        <div style={{ color: 'var(--rb-text)' }}><RebootWordmark height={20} mono /></div>
        <span style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--rb-faint)' }}>
          {index + 1} <span style={{ opacity: 0.55 }}>/ {total}</span>
        </span>
      </header>

      {/* QUESTION AREA */}
      <main style={{ flex: 1, display: 'flex', justifyContent: 'center', padding: 'clamp(1.5rem,5vw,3rem) clamp(1.1rem,4vw,2rem)' }}>
        <div style={{ width: '100%', maxWidth: 620, alignSelf: 'flex-start', marginTop: 'clamp(0.5rem,4vh,3rem)' }}>
          <div key={step.id} style={{
            animation: `${anim === 'in' ? (dir > 0 ? 'rbInUp' : 'rbInDown') : (dir > 0 ? 'rbOutUp' : 'rbOutDown')} .22s ease both`
          }}>
            {/* section + number */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', marginBottom: '1rem' }}>
              {tweaks.showNumbers && (
                <span style={{ color: 'var(--rb-primary-ink)', fontWeight: 800, fontSize: '1rem' }}>
                  {String(index + 1).padStart(2, '0')}&nbsp;&rarr;
                </span>
              )}
              <span style={{
                fontSize: '0.74rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase',
                color: 'var(--rb-faint)'
              }}>{step.section}</span>
            </div>

            {/* question */}
            <h2 style={{
              fontSize: 'clamp(1.7rem, 5.2vw, 2.7rem)', fontWeight: 800, lineHeight: 1.02,
              letterSpacing: '-0.02em', margin: '0 0 0.7rem', textWrap: 'balance'
            }}>{interpolate(step.question, answers)}</h2>
            {step.help && (
              <p style={{ fontSize: '1.08rem', color: 'var(--rb-muted)', margin: '0 0 1.6rem', lineHeight: 1.35, textWrap: 'pretty' }}>{step.help}</p>
            )}
            {!step.help && <div style={{ height: '1.4rem' }} />}

            {/* input by type */}
            {(step.type === 'text' || step.type === 'email' || step.type === 'tel') && (
              <BigInput
                value={answers[step.field] || ''}
                onChange={(v) => { setAnswer(step.field, v); if (error) setError(''); }}
                onEnter={handleNext}
                placeholder={step.placeholder}
                type={step.type}
                maxLength={step.maxLength}
                autocomplete={step.autocomplete}
                invalid={!!error}
              />
            )}

            {step.type === 'textarea' && (
              <BigTextarea
                value={answers[step.field] || ''}
                onChange={(v) => { setAnswer(step.field, v); if (error) setError(''); }}
                placeholder={step.placeholder}
                maxLength={step.maxLength}
              />
            )}

            {step.type === 'single' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {step.options.map((opt, i) => (
                  <ChoiceCard key={opt} letter={letters[i]} label={opt}
                    selected={answers[step.field] === opt}
                    onSelect={() => selectSingle(opt)} />
                ))}
              </div>
            )}

            {step.type === 'consent' && (
              <ConsentBox
                checked={answers[step.field] === true}
                text={step.consentText}
                privacyUrl={step.privacyUrl}
                onToggle={(c) => { setAnswer(step.field, c); if (error) setError(''); }}
              />
            )}

            {/* error */}
            {error && (
              <p style={{ color: 'var(--rb-danger)', fontSize: '1rem', fontWeight: 600, margin: '1rem 0 0' }}>
                {error}
              </p>
            )}

            {/* nav */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '2rem', flexWrap: 'wrap' }}>
              <RBButton onClick={handleNext}>
                {index + 1 === total ? 'Enviar y reservar mi sesión' : 'Continuar'}&nbsp;&rarr;
              </RBButton>
              {(step.type === 'text' || step.type === 'email' || step.type === 'tel') && (
                <span style={{ fontSize: '0.95rem', color: 'var(--rb-faint)' }}>
                  pulsa <strong style={{ color: 'var(--rb-muted)' }}>Enter ↵</strong>
                </span>
              )}
              {step.type === 'textarea' && (
                <span style={{ fontSize: '0.95rem', color: 'var(--rb-faint)' }}>
                  <strong style={{ color: 'var(--rb-muted)' }}>Ctrl + Enter</strong> para continuar
                </span>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* BACK FOOTER */}
      <footer style={{ padding: '0.9rem clamp(1.1rem,4vw,2.5rem)', borderTop: '1px solid var(--rb-line)' }}>
        <button onClick={handleBack} style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.45rem', background: 'none', border: 'none',
          cursor: 'pointer', color: 'var(--rb-faint)', fontFamily: 'inherit', fontSize: '1rem', fontWeight: 600
        }}>
          &larr; {index === 0 ? 'Volver al inicio' : 'Atrás'}
        </button>
      </footer>
    </div>
  );
}

function ConsentBox({ checked, text, privacyUrl, onToggle }) {
  return (
    <label style={{
      display: 'flex', gap: '0.9rem', alignItems: 'flex-start', cursor: 'pointer',
      border: `1.5px solid ${checked ? 'var(--rb-primary)' : 'var(--rb-line)'}`, borderRadius: 8,
      padding: '1.1rem 1.2rem', background: checked ? 'var(--rb-primary-tint)' : 'var(--rb-choice-bg)',
      transition: 'all .15s ease'
    }}>
      <span style={{
        flex: '0 0 auto', width: 26, height: 26, borderRadius: 5, marginTop: 2,
        border: `1.5px solid ${checked ? 'var(--rb-primary)' : 'var(--rb-line-strong)'}`,
        background: checked ? 'var(--rb-primary)' : 'transparent', color: '#04201d',
        display: 'grid', placeItems: 'center', fontWeight: 800, fontSize: '1rem'
      }}>{checked ? '✓' : ''}</span>
      <input type="checkbox" checked={checked} onChange={(e) => onToggle(e.target.checked)} style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }} />
      <span style={{ fontSize: '1.08rem', lineHeight: 1.4, color: 'var(--rb-text)' }}>
        {text}{' '}
        <a href={privacyUrl} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}
          style={{ color: 'var(--rb-secondary-ink)', textDecoration: 'underline', fontWeight: 600 }}>
          Ver política de privacidad
        </a>.
      </span>
    </label>
  );
}

Object.assign(window, { FormFlow });
