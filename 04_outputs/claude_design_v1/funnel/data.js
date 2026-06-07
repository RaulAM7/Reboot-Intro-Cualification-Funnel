/* Reboot Orientation Funnel — form steps + scoring.
   Plain JS, attaches to window. One question per step (Typeform style). */

window.REBOOT_STEPS = [
  // ---------- SOBRE TI ----------
  {
    id: 'first_name', section: 'Sobre ti', type: 'text', field: 'first_name',
    question: 'Antes de empezar, ¿cómo te llamas?',
    help: 'Solo tu nombre, lo usaremos para dirigirnos a ti.',
    placeholder: 'Escribe tu nombre', maxLength: 100, autocomplete: 'given-name'
  },
  {
    id: 'last_name', section: 'Sobre ti', type: 'text', field: 'last_name',
    question: 'Encantados, {first_name}. ¿Y tus apellidos?',
    placeholder: 'Escribe tus apellidos', maxLength: 150, autocomplete: 'family-name'
  },
  {
    id: 'age_range', section: 'Sobre ti', type: 'single', field: 'age_range',
    question: '¿Cuál es tu rango de edad?',
    options: ['Menos de 18', '18 – 24', '25 – 34', '35 – 44', '45 – 54', '55 o más']
  },
  {
    id: 'residence', section: 'Sobre ti', type: 'text', field: 'residence',
    question: '¿Dónde vives actualmente?',
    help: 'Ciudad y país nos basta — atendemos a gente de cualquier sitio.',
    placeholder: 'Ej. Las Palmas, España', maxLength: 150
  },
  {
    id: 'email', section: 'Sobre ti', type: 'email', field: 'email',
    question: '¿Cuál es tu email?',
    help: 'Lo usaremos para coordinar tu sesión.',
    placeholder: 'tu@email.com', maxLength: 254, autocomplete: 'email'
  },
  {
    id: 'phone', section: 'Sobre ti', type: 'tel', field: 'phone',
    question: '¿En qué WhatsApp podemos contactarte?',
    help: 'Incluye el prefijo si estás fuera de España.',
    placeholder: '+34 600 000 000', maxLength: 50, autocomplete: 'tel'
  },
  {
    id: 'current_situation', section: 'Sobre ti', type: 'single', field: 'current_situation',
    question: '¿Cuál describe mejor tu situación actual?',
    options: [
      'Estoy estudiando',
      'Estoy trabajando',
      'Estoy desempleado/a',
      'Soy autónomo/a o tengo un negocio',
      'Quiero cambiar de sector',
      'Otra situación'
    ]
  },

  // ---------- TUS OBJETIVOS ----------
  {
    id: 'desired_outcome', section: 'Tus objetivos', type: 'single', field: 'desired_outcome',
    question: '¿Qué esperas conseguir con una formación tecnológica?',
    options: [
      'Conseguir mi primer empleo en tecnología',
      'Cambiar de carrera o de sector',
      'Mejorar mi perfil profesional actual',
      'Aplicar tecnología, IA o automatización en mi trabajo',
      'Crear mi propio proyecto, app o negocio digital',
      'Aprender por interés personal'
    ]
  },
  {
    id: 'objective', section: 'Tus objetivos', type: 'single', field: 'objective',
    question: 'Si tuvieras que elegir una misión principal, ¿cuál sería?',
    help: 'Elige solo una. La que más te represente ahora mismo.',
    options: [
      'Cambiar de carrera hacia tecnología',
      'Encontrar mi primer empleo en tech',
      'Aprender programación desde cero',
      'Especializarme o subir de nivel profesional',
      'Aprender IA, data o automatización',
      'Crear una web, app o proyecto propio',
      'Todavía no lo tengo claro y necesito orientación'
    ]
  },
  {
    id: 'interest_area', section: 'Tus objetivos', type: 'single', field: 'interest_area',
    question: '¿Qué área te interesa más ahora mismo?',
    options: [
      'Desarrollo Web / Full Stack',
      'Programación desde cero',
      'Inteligencia Artificial aplicada',
      'Data Analysis / Business Intelligence',
      'Automatización y herramientas digitales',
      'E-commerce, WordPress o tiendas online',
      'No lo tengo claro, necesito orientación'
    ]
  },
  {
    id: 'current_level', section: 'Tus objetivos', type: 'single', field: 'current_level',
    question: '¿Cuál dirías que es tu nivel actual?',
    options: [
      'Cero, empiezo desde el principio',
      'He hecho algún curso o tutorial',
      'Sé programar un poco',
      'Ya he creado algún proyecto',
      'Trabajo o he trabajado en tecnología',
      'No estoy seguro/a'
    ]
  },
  {
    id: 'education_background', section: 'Tus objetivos', type: 'single', field: 'education_background',
    question: '¿Cuál es tu formación previa más cercana?',
    help: 'No filtramos por titulación, solo queremos contexto.',
    options: [
      'ESO o equivalente',
      'Bachillerato',
      'Formación Profesional',
      'Universidad',
      'Cursos online / autodidacta',
      'Bootcamp u otra formación tech',
      'Actualmente estoy estudiando',
      'Otro'
    ]
  },

  // ---------- TU DISPONIBILIDAD ----------
  {
    id: 'weekly_availability', section: 'Tu disponibilidad', type: 'single', field: 'weekly_availability',
    question: '¿Cuánto tiempo real podrías dedicar a formarte cada semana?',
    options: [
      'Menos de 5 horas por semana',
      '5 – 10 horas por semana',
      '10 – 20 horas por semana',
      'Más de 20 horas por semana',
      'Depende del horario y la organización'
    ]
  },
  {
    id: 'preferred_modality', section: 'Tu disponibilidad', type: 'single', field: 'preferred_modality',
    question: '¿Qué formato encajaría mejor contigo?',
    options: [
      'Online flexible, avanzando a mi ritmo',
      'Online con mentorías 1:1 y tutor personal',
      'Intensivo tipo bootcamp',
      'No lo sé, quiero que me orientéis'
    ]
  },

  // ---------- TU ENCAJE ----------
  {
    id: 'investment_range', section: 'Tu encaje', type: 'single', field: 'investment_range',
    question: '¿Qué inversión podrías plantearte para una formación personalizada que te ayude a dar este cambio?',
    help: 'Es orientativo. Nos ayuda a proponerte algo realista en la sesión.',
    options: [
      'Menos de 500 €',
      'Entre 500 € y 1.000 €',
      'Entre 1.000 € y 2.000 €',
      'Entre 2.000 € y 3.000 €',
      'Más de 3.000 €'
    ]
  },
  {
    id: 'financing_interest', section: 'Tu encaje', type: 'single', field: 'financing_interest',
    question: '¿Te ayudaría poder fraccionar el pago si el programa encaja contigo?',
    options: [
      'Sí, me interesa valorar pago fraccionado',
      'No, podría hacer el pago completo si encaja',
      'Prefiero hablarlo en la sesión'
    ]
  },
  {
    id: 'start_timing', section: 'Tu encaje', type: 'single', field: 'start_timing',
    question: '¿Cuándo te gustaría empezar si encontramos una opción que encaje?',
    options: [
      'Lo antes posible',
      'Este mes',
      'En 1 – 3 meses',
      'Más adelante',
      'Estoy explorando opciones'
    ]
  },

  // ---------- CASI LISTO ----------
  {
    id: 'free_text', section: 'Casi listo', type: 'textarea', field: 'free_text',
    question: 'Cuéntanos en una frase algo que debamos saber antes de la sesión.',
    placeholder: 'Ej. busco cambiar de carrera, tengo poco tiempo entre semana, vengo de otro país, me interesa la IA, quiero empezar desde cero…',
    maxLength: 1000
  },
  {
    id: 'consent', section: 'Casi listo', type: 'consent', field: 'privacy_accepted',
    question: 'Un último paso para preparar tu sesión.',
    consentText: 'Acepto que Reboot Academy trate mis datos para contactar conmigo y orientarme sobre programas formativos.',
    privacyUrl: 'https://reboot.academy/legal/privacy-policy'
  }
];

/* ---------------- Scoring (per implementation spec §13) ---------------- */
window.scoreLead = function scoreLead(a) {
  let raw = 0;
  const inv = {
    'Menos de 500 €': 0, 'Entre 500 € y 1.000 €': 15, 'Entre 1.000 € y 2.000 €': 25,
    'Entre 2.000 € y 3.000 €': 35, 'Más de 3.000 €': 40
  };
  const urg = {
    'Lo antes posible': 25, 'Este mes': 20, 'En 1 – 3 meses': 15,
    'Más adelante': 5, 'Estoy explorando opciones': 0
  };
  const avail = {
    'Menos de 5 horas por semana': 0, '5 – 10 horas por semana': 10,
    '10 – 20 horas por semana': 15, 'Más de 20 horas por semana': 20,
    'Depende del horario y la organización': 5
  };
  const modal = {
    'Online con mentorías 1:1 y tutor personal': 15, 'Intensivo tipo bootcamp': 15,
    'Online flexible, avanzando a mi ritmo': 10, 'No lo sé, quiero que me orientéis': 5
  };
  const obj = {
    'Cambiar de carrera hacia tecnología': 10, 'Encontrar mi primer empleo en tech': 10,
    'Aprender programación desde cero': 5, 'Especializarme o subir de nivel profesional': 10,
    'Aprender IA, data o automatización': 10, 'Crear una web, app o proyecto propio': 5,
    'Todavía no lo tengo claro y necesito orientación': 0
  };
  raw += inv[a.investment_range] || 0;
  raw += urg[a.start_timing] || 0;
  raw += avail[a.weekly_availability] || 0;
  raw += modal[a.preferred_modality] || 0;
  raw += obj[a.objective] || 0;

  const score = Math.min(raw, 100);
  const lowBudget = a.investment_range === 'Menos de 500 €';
  let temperature = score >= 80 ? 'hot' : score >= 45 ? 'warm' : 'cold';
  if (lowBudget && temperature === 'hot') temperature = 'warm';

  const tags = [];
  if (temperature === 'hot') tags.push('hot_lead');
  else if (temperature === 'warm') tags.push('warm_lead');
  if (lowBudget) tags.push('low_budget');
  if (a.objective === 'Todavía no lo tengo claro y necesito orientación' ||
      a.interest_area === 'No lo tengo claro, necesito orientación') tags.push('needs_orientation');
  if (a.age_range === 'Menos de 18') tags.push('minor');

  return { score, temperature, tags, isMinor: a.age_range === 'Menos de 18' };
};

window.summarizeLead = function summarizeLead(a, s) {
  const parts = [];
  if (a.interest_area) parts.push(`Interesado en ${a.interest_area}.`);
  if (a.residence || a.age_range) parts.push(`Vive en ${a.residence || '—'}, rango ${a.age_range || '—'}.`);
  if (a.current_situation) parts.push(`Situación: ${a.current_situation.toLowerCase()}.`);
  if (a.objective) parts.push(`Objetivo: ${a.objective.toLowerCase()}.`);
  if (a.current_level) parts.push(`Nivel: ${a.current_level.toLowerCase()}.`);
  if (a.weekly_availability) parts.push(`Disponibilidad: ${a.weekly_availability.toLowerCase()}.`);
  if (a.preferred_modality) parts.push(`Modalidad: ${a.preferred_modality.toLowerCase()}.`);
  if (a.investment_range) parts.push(`Inversión declarada: ${a.investment_range}.`);
  if (a.start_timing) parts.push(`Quiere empezar: ${a.start_timing.toLowerCase()}.`);
  if (s) parts.push(`Temperatura: ${s.temperature}.`);
  return parts.join(' ');
};
