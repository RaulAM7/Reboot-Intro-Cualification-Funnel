import type { FormAnswers, FormStep } from '@/types/funnel';

export const FORM_STORAGE_KEY = 'reboot_orientation_funnel_v1';

export const emptyAnswers: FormAnswers = {
  first_name: '',
  last_name: '',
  age_range: '',
  residence: '',
  email: '',
  whatsapp: '',
  current_situation: '',
  desired_outcome: '',
  objective: '',
  interest_area: '',
  current_level: '',
  education_background: '',
  weekly_availability: '',
  preferred_modality: '',
  investment_range: '',
  financing_interest: '',
  start_timing: '',
  additional_context: '',
  privacy_accepted: false
};

export const formSteps: FormStep[] = [
  {
    id: 'first_name',
    section: 'Sobre ti',
    type: 'text',
    field: 'first_name',
    question: 'Antes de empezar, ¿cómo te llamas?',
    help: 'Solo tu nombre, lo usaremos para dirigirnos a ti.',
    placeholder: 'Escribe tu nombre',
    maxLength: 100,
    autocomplete: 'given-name',
    required: true
  },
  {
    id: 'last_name',
    section: 'Sobre ti',
    type: 'text',
    field: 'last_name',
    question: 'Encantados, {first_name}. ¿Y tus apellidos?',
    placeholder: 'Escribe tus apellidos',
    maxLength: 150,
    autocomplete: 'family-name',
    required: true
  },
  {
    id: 'age_range',
    section: 'Sobre ti',
    type: 'single',
    field: 'age_range',
    question: '¿Cuál es tu rango de edad?',
    options: ['Menos de 18', '18 - 24', '25 - 34', '35 - 44', '45 - 54', '55 o más'],
    required: true
  },
  {
    id: 'residence',
    section: 'Sobre ti',
    type: 'text',
    field: 'residence',
    question: '¿Dónde vives actualmente?',
    help: 'Ciudad y país nos basta. Atendemos a gente de cualquier sitio.',
    placeholder: 'Ej. Las Palmas, España',
    maxLength: 150,
    required: true
  },
  {
    id: 'email',
    section: 'Sobre ti',
    type: 'email',
    field: 'email',
    question: '¿Cuál es tu email?',
    help: 'Lo usaremos para coordinar tu sesión.',
    placeholder: 'tu@email.com',
    maxLength: 254,
    autocomplete: 'email',
    required: true
  },
  {
    id: 'whatsapp',
    section: 'Sobre ti',
    type: 'tel',
    field: 'whatsapp',
    question: '¿En qué WhatsApp podemos contactarte?',
    help: 'Incluye el prefijo si estás fuera de España.',
    placeholder: '+34 600 000 000',
    maxLength: 50,
    autocomplete: 'tel',
    required: true
  },
  {
    id: 'current_situation',
    section: 'Sobre ti',
    type: 'single',
    field: 'current_situation',
    question: '¿Cuál describe mejor tu situación actual?',
    options: [
      'Estoy estudiando',
      'Estoy trabajando',
      'Estoy desempleado/a',
      'Soy autónomo/a o tengo un negocio',
      'Quiero cambiar de sector',
      'Otra situación'
    ],
    required: true
  },
  {
    id: 'desired_outcome',
    section: 'Tus objetivos',
    type: 'single',
    field: 'desired_outcome',
    question: '¿Qué esperas conseguir con una formación tecnológica?',
    options: [
      'Conseguir mi primer empleo en tecnología',
      'Cambiar de carrera o de sector',
      'Mejorar mi perfil profesional actual',
      'Aplicar tecnología, IA o automatización en mi trabajo',
      'Crear mi propio proyecto, app o negocio digital',
      'Aprender por interés personal'
    ],
    required: true
  },
  {
    id: 'objective',
    section: 'Tus objetivos',
    type: 'single',
    field: 'objective',
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
    ],
    required: true
  },
  {
    id: 'interest_area',
    section: 'Tus objetivos',
    type: 'single',
    field: 'interest_area',
    question: '¿Qué área te interesa más ahora mismo?',
    options: [
      'Desarrollo Web / Full Stack',
      'Programación desde cero',
      'Inteligencia Artificial aplicada',
      'Data Analysis / Business Intelligence',
      'Automatización y herramientas digitales',
      'E-commerce, WordPress o tiendas online',
      'No lo tengo claro, necesito orientación'
    ],
    required: true
  },
  {
    id: 'current_level',
    section: 'Tus objetivos',
    type: 'single',
    field: 'current_level',
    question: '¿Cuál dirías que es tu nivel actual?',
    options: [
      'Cero, empiezo desde el principio',
      'He hecho algún curso o tutorial',
      'Sé programar un poco',
      'Ya he creado algún proyecto',
      'Trabajo o he trabajado en tecnología',
      'No estoy seguro/a'
    ],
    required: true
  },
  {
    id: 'education_background',
    section: 'Tus objetivos',
    type: 'single',
    field: 'education_background',
    question: '¿Cuál es tu formación previa más cercana?',
    help: 'No filtramos por titulación. Solo queremos contexto.',
    options: [
      'ESO o equivalente',
      'Bachillerato',
      'Formación Profesional',
      'Universidad',
      'Cursos online / autodidacta',
      'Bootcamp u otra formación tech',
      'Actualmente estoy estudiando',
      'Otro'
    ],
    required: true
  },
  {
    id: 'weekly_availability',
    section: 'Tu disponibilidad',
    type: 'single',
    field: 'weekly_availability',
    question: '¿Cuánto tiempo real podrías dedicar a formarte cada semana?',
    options: [
      'Menos de 5 horas por semana',
      '5 - 10 horas por semana',
      '10 - 20 horas por semana',
      'Más de 20 horas por semana',
      'Depende del horario y la organización'
    ],
    required: true
  },
  {
    id: 'preferred_modality',
    section: 'Tu disponibilidad',
    type: 'single',
    field: 'preferred_modality',
    question: '¿Qué formato encajaría mejor contigo?',
    options: [
      'Online flexible, avanzando a mi ritmo',
      'Online con mentorías 1:1 y tutor personal',
      'Intensivo tipo bootcamp',
      'No lo sé, quiero que me orientéis'
    ],
    required: true
  },
  {
    id: 'investment_range',
    section: 'Tu encaje',
    type: 'single',
    field: 'investment_range',
    question: '¿Qué inversión podrías plantearte para una formación personalizada que te ayude a dar este cambio?',
    help: 'Es orientativo. Nos ayuda a proponerte algo realista en la sesión.',
    options: [
      'Menos de 500 €',
      'Entre 500 € y 1.000 €',
      'Entre 1.000 € y 2.000 €',
      'Entre 2.000 € y 3.000 €',
      'Más de 3.000 €'
    ],
    required: true
  },
  {
    id: 'financing_interest',
    section: 'Tu encaje',
    type: 'single',
    field: 'financing_interest',
    question: '¿Te ayudaría poder fraccionar el pago si el programa encaja contigo?',
    options: [
      'Sí, me interesa valorar pago fraccionado',
      'No, podría hacer el pago completo si encaja',
      'Prefiero hablarlo en la sesión'
    ],
    required: true
  },
  {
    id: 'start_timing',
    section: 'Tu encaje',
    type: 'single',
    field: 'start_timing',
    question: '¿Cuándo te gustaría empezar si encontramos una opción que encaje?',
    options: [
      'Lo antes posible',
      'Este mes',
      'En 1 - 3 meses',
      'Más adelante',
      'Estoy explorando opciones'
    ],
    required: true
  },
  {
    id: 'additional_context',
    section: 'Casi listo',
    type: 'textarea',
    field: 'additional_context',
    question: 'Cuéntanos en una frase algo que debamos saber antes de la sesión.',
    placeholder: 'Ej. busco cambiar de carrera, tengo poco tiempo entre semana, vengo de otro país, me interesa la IA, quiero empezar desde cero...',
    maxLength: 1000,
    required: true
  },
  {
    id: 'privacy_accepted',
    section: 'Casi listo',
    type: 'consent',
    field: 'privacy_accepted',
    question: 'Un último paso para preparar tu sesión.',
    consentText: 'Acepto que Reboot Academy trate mis datos para contactar conmigo y orientarme sobre programas formativos.',
    privacyUrl: 'https://reboot.academy/legal/privacy-policy',
    required: true
  }
];

export const totalStepCount = formSteps.length;

