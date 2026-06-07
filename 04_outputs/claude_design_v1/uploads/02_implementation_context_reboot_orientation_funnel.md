# 02 — Implementation Context: Reboot Orientation & Qualification Funnel

**Destino recomendado:** `00_inbox/02_implementation_context_reboot_orientation_funnel.md`  
**Proyecto:** Reboot Intro Qualification / Cualification Funnel  
**Fecha:** 2026-06-06  
**Estado:** Documento operativo para alimentar `write-spec` tras haber ejecutado `initial-context-building` con el documento estratégico.

---

## 1. Propósito de este documento

Este documento convierte la estrategia ya definida para el funnel de orientación/cualificación de Reboot en un contexto técnico-operativo accionable.

No sustituye al documento estratégico. Lo complementa.

La capa estratégica ya dejó claro que el proyecto no es una landing genérica de venta de cursos, sino un sistema ligero para procesar leads orgánicos que llegan a Reboot por WhatsApp, Instagram, SEO, web antigua, reconocimiento de marca o búsquedas de bootcamps. El objetivo de este documento es concretar cómo debe implementarse una V1 funcional.

La V1 debe permitir que un lead:

1. Llegue a una landing con marca Reboot.
2. Entienda que está iniciando un proceso de orientación/admisión.
3. Complete un cuestionario breve, una pregunta por pantalla.
4. Deje datos personales y comerciales suficientes.
5. Quede registrado en Supabase.
6. Vea inmediatamente un bloque embebido de Cal.com para reservar una sesión 1:1.
7. Permita al equipo consultar la información en Supabase y trasladarla manualmente al CRM existente.

Este documento debe servir para que una skill posterior, previsiblemente `write-spec`, genere una especificación técnica implementable sin tomar decisiones estratégicas nuevas.

---

## 2. Fuentes de contexto y repositorios

### 2.1. Repositorio objetivo de la aplicación/funnel

Repositorio definitivo indicado por el usuario:

```txt
https://github.com/RaulAM7/Reboot-Intro-Cualification-Funnel
```

Notas:

- El nombre del repo contiene `Cualification`. La grafía inglesa correcta sería `Qualification`, pero el usuario ha indicado que no le preocupa y que no debe bloquear el proyecto.
- No se debe perder tiempo en renombrados cosméticos salvo que el usuario lo pida expresamente más adelante.

### 2.2. Fuente de marca y web Reboot

Web pública:

```txt
https://reboot.academy/
https://reboot.academy/cursos
```

Repositorio público de la web actual de Reboot:

```txt
https://github.com/RaulAM7/reboot-web-3.0
```

Ruta local indicada por el usuario:

```txt
/home/reboot/Escritorio/REBOOT_ACADEMY/Reboot-web-3.0
```

Uso esperado:

- Fuente de verdad visual y de marca.
- Fuente de estilos, assets, componentes, colores, tipografías, comportamiento visual y tono Reboot.
- Debe consultarse antes de implementar UI definitiva.
- El usuario quiere que la V1 sea 100% Reboot visualmente o lo más cercana posible.

### 2.3. Contexto visual adicional

El usuario ha mostrado una captura del entorno de desarrollo de `reboot-web-3.0`, donde se aprecia un proyecto frontend con estructura moderna, `src`, `public`, `package.json`, `next.config.js`, `tailwind.config.js` y configuración relacionada. No se debe asumir ciegamente el stack final sin inspeccionar `package.json`, pero la implementación debe intentar alinearse con el stack real de Reboot.

### 2.4. Referencia de interacción tipo formulario

Referencia indicada previamente por el usuario:

```txt
https://curso-junio-2026.vercel.app/#sondeo
```

Uso esperado:

- Inspiración de comportamiento, no fuente visual final.
- La idea importante es que el formulario no se vea entero de golpe.
- Debe funcionar como experiencia tipo Typeform: una pregunta visible cada vez, avance paso a paso, progreso y foco en la pregunta actual.

### 2.5. Catálogo formativo real

Existe un catálogo de cursos/skills de EduKami/Skilland usado como contexto de oferta disponible. La landing no debe convertirse en catálogo público, pero las opciones del cuestionario deben poder mapearse a áreas reales de formación ya existentes: programación, web development, IA, data, BI, bases de datos, CMS, herramientas digitales, etc.

---

## 3. Alcance de la V1

### 3.1. Lo que debe hacer sí o sí

La V1 debe incluir:

1. Landing responsive con marca Reboot.
2. Hero inicial breve.
3. Explicación muy corta del proceso.
4. Botón para iniciar el cuestionario.
5. Formulario tipo Typeform, una pregunta por pantalla.
6. Todas las preguntas obligatorias.
7. Barra de progreso.
8. Botón de volver.
9. Posibilidad de avanzar con Enter cuando tenga sentido.
10. Validación para impedir avanzar si la pregunta actual no está respondida.
11. Captura de datos personales.
12. Captura de situación actual.
13. Captura de objetivo/misión profesional.
14. Captura de área de interés.
15. Captura de nivel técnico.
16. Captura de estudios/formación previa.
17. Captura de disponibilidad semanal.
18. Captura de modalidad preferida.
19. Captura de inversión/disposición a pagar.
20. Captura de interés en pago fraccionado.
21. Captura de urgencia/fecha deseada de inicio.
22. Campo final de texto libre o contexto adicional.
23. Consentimiento legal básico.
24. Guardado de lead en Supabase al final.
25. Generación de etiquetas/scoring simple.
26. Generación de resumen textual del lead.
27. Pantalla final con Cal.com embebido.
28. Deploy en Vercel.
29. Google Analytics, idealmente reutilizando el patrón legal/cookies existente de Reboot.

### 3.2. Lo que no debe hacer la V1

La V1 no debe incluir:

- Panel admin.
- Login.
- Integración CRM directa.
- Automatizaciones complejas.
- Emails automáticos al lead.
- Emails automáticos internos, salvo que sea trivial y no complique.
- WhatsApp API.
- Pagos.
- Checkout.
- Catálogo público de cursos.
- Multiidioma.
- Rama específica para cursos gratuitos.
- Oferta de cursos subvencionados.
- Lógica condicional compleja.
- A/B testing.
- Dashboard de métricas.
- Webhooks de Cal.com como requisito obligatorio.

### 3.3. Criterio de velocidad

El usuario quiere una V1 operativa muy rápido. El horizonte de construcción operativo indicado es aproximadamente dos días.

Esto implica:

- Priorizar funcionalidad real sobre arquitectura perfecta.
- Evitar sobreingeniería.
- No bloquearse por paneles, CRM, emails o automatizaciones.
- Entregar una landing funcional, registrando leads y mostrando Cal.com.
- Dejar las mejoras avanzadas para V2.

---

## 4. Principios de implementación

### 4.1. Principio de no sobreingeniería

El usuario ha insistido en no complicar con librerías o capas innecesarias.

Aplicación práctica:

- Formulario con estado local simple o con la mínima librería razonable.
- No añadir sistemas de formularios pesados si no hacen falta.
- No añadir estado global complejo.
- No añadir animaciones complejas si comprometen velocidad.
- No añadir lógica condicional sofisticada en V1.
- No añadir CRM ni emails en V1.

### 4.2. Principio mobile-first

La mayoría de leads llegarán desde WhatsApp o Instagram. Por tanto:

- La experiencia debe ser mobile-first.
- Debe funcionar bien en navegadores embebidos de WhatsApp/Instagram.
- Los botones deben ser grandes.
- Las preguntas deben leerse bien en móvil.
- El formulario no debe requerir precisión de escritorio.
- El embed de Cal.com debe ser usable en móvil.

### 4.3. Principio de una sola pregunta visible

El usuario ha sido explícito:

> No quiero que se vea todo el formulario de golpe. Quiero que en el bloque del formulario aparezca solo la pregunta current, la de ahora.

Aplicación práctica:

- El formulario debe renderizar solo el paso actual.
- No debe haber listado largo de preguntas.
- No deben aparecer secciones completas de golpe.
- La UI debe sentirse como un asistente o Typeform.

### 4.4. Principio de cualificación comercial sin vender en frío

La landing no debe intentar cerrar la venta ni mostrar precios finales. La landing debe:

- Recolectar datos.
- Cualificar intención.
- Medir disposición a pagar.
- Preparar la sesión 1:1.
- Ayudar al equipo a llegar a la llamada con contexto.

No debe:

- Publicar catálogo completo.
- Explicar todos los programas.
- Prometer becas, descuentos o subvenciones.
- Hablar de cursos gratuitos.
- Mostrar precio principal de 5.999 € o 2.999 € en la landing.

La pregunta de inversión sí debe existir, pero como cualificación, no como pricing comercial.

---

## 5. Stack técnico recomendado

### 5.1. Decisión base

El usuario no quiere una SPA compleja por defecto, pero acepta alinearse con Reboot porque la web actual está construida con un stack frontend moderno.

La implementación debe seguir este criterio:

1. Inspeccionar el repo `reboot-web-3.0` y su `package.json` antes de decidir detalles finales.
2. Alinear la landing con el stack y convenciones de Reboot cuando sea práctico.
3. No introducir un framework diferente si el repo objetivo ya tiene uno o si se decide copiar la base visual desde Reboot.

### 5.2. Recomendación técnica práctica

Si el repo objetivo está vacío o en scaffolding, la recomendación operativa es:

```txt
Next.js + TypeScript + Tailwind CSS
```

Motivos:

- Se alinea con la apariencia del repo Reboot visto por el usuario.
- Facilita deploy en Vercel.
- Permite API routes/server actions para insertar en Supabase de forma segura.
- Facilita integrar Google Analytics.
- Permite una landing simple sin convertir el proyecto en una SPA pesada.

Si Codex inspecciona el repo objetivo y detecta otra base ya instalada, debe priorizar consistencia con lo existente salvo que haya un motivo técnico fuerte para cambiar.

### 5.3. Librerías

V1 debe evitar dependencias innecesarias.

Permitido si aporta valor claro:

- React/Next según stack.
- TypeScript.
- Tailwind.
- Librería ligera de iconos si ya existe en Reboot.
- Framer Motion solo si ya está instalado o si las transiciones son relevantes y no complican.

No prioritario:

- shadcn/ui.
- Radix salvo que ya esté instalado o haga falta por accesibilidad.
- Zustand.
- React Hook Form, salvo que simplifique validación sin añadir complejidad.
- Librerías de formularios pesadas.

### 5.4. Estado del formulario

Implementación preferida:

- Estado local del componente.
- Array declarativo de pasos/preguntas.
- Validación por paso.
- Respuestas acumuladas en un objeto.
- Al final se construye payload para Supabase.

Ejemplo conceptual:

```ts
const steps = [
  { id: 'first_name', type: 'text', required: true, ... },
  { id: 'objective', type: 'single_choice', required: true, ... },
]
```

No se necesita estado global.

---

## 6. Repositorio y estructura recomendada

### 6.1. Repositorio definitivo

```txt
https://github.com/RaulAM7/Reboot-Intro-Cualification-Funnel
```

### 6.2. Estructura híbrida app + harness

El usuario ya ejecutó `initial-context-building` y se han generado carpetas de contexto/specs. El repo debe conservar esas carpetas. No deben mezclarse con código de aplicación.

Estructura recomendada:

```txt
00_inbox/
01_harness/
02_context/
03_specs/
04_outputs/
05_scratch/
public/
src/
supabase/
.env.example
README.md
package.json
```

Si el framework elegido genera `app/` o `pages/`, usar la convención del framework, por ejemplo:

```txt
src/app/
src/components/
src/lib/
src/data/
src/styles/
```

o:

```txt
src/pages/
src/components/
src/lib/
```

### 6.3. Separación de responsabilidades

Recomendación:

```txt
src/components/landing/
  Hero.tsx
  ProcessSteps.tsx
  OrientationForm.tsx
  FormStep.tsx
  ProgressBar.tsx
  CalEmbed.tsx
  FinalScreen.tsx

src/lib/
  supabase.ts
  leadScoring.ts
  leadSummary.ts
  analytics.ts

src/data/
  formSteps.ts

supabase/migrations/
  0001_create_orientation_leads.sql
```

El nombre exacto de carpetas puede adaptarse al framework, pero la separación debe mantenerse.

### 6.4. README y env

Debe existir:

```txt
README.md
.env.example
```

`README.md` debe explicar:

- Qué es el proyecto.
- Cómo instalar.
- Cómo ejecutar en local.
- Qué variables de entorno necesita.
- Cómo desplegar en Vercel.
- Qué queda pendiente/TBD.

`.env.example` debe incluir, como mínimo:

```env
NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_GA_MEASUREMENT_ID=
NEXT_PUBLIC_CALCOM_URL=
SUPABASE_URL=
SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

Si se usa Vite en lugar de Next, ajustar prefijos a `VITE_`.

---

## 7. Branding y diseño visual

### 7.1. Decisión de marca

La experiencia debe ser 100% Reboot o lo más cercana posible desde la V1.

Fuente de verdad:

- Web pública Reboot.
- Repo `reboot-web-3.0`.
- Assets del repo Reboot.
- Estilos reales de Reboot.
- Mockups que se generen posteriormente en Google Stitch.

### 7.2. Flujo visual previsto

El usuario quiere primero utilizar Google Stitch para obtener mockups o base visual. Luego esos mockups servirán para construir un documento de diseño o directamente trasladar la UI al repo.

Para la V1 técnica, si todavía no existen mockups de Stitch, se debe:

- Reutilizar estilos, colores, tipografías y componentes del repo Reboot.
- Aproximar el diseño al look actual de Reboot.
- Evitar inventar una identidad nueva.
- No usar estética Skilland/EduKami.
- No usar estética genérica de SaaS si contradice Reboot.

### 7.3. Assets obligatorios

Usar, siempre que estén disponibles en el repo Reboot:

- Logo Reboot.
- Favicon.
- Tipografías.
- Colores.
- Fondos/gradientes.
- Botones.
- Estilo de cards/secciones.
- Estilo responsive.

Si algún asset no está localizado, no bloquear la V1: dejarlo documentado como pendiente.

### 7.4. No rediseñar marca

No se debe:

- Crear una marca nueva.
- Usar colores ajenos a Reboot.
- Meter logos de Skilland como protagonista.
- Convertirlo en landing de EduKami.
- Hacer una estética demasiado académica si se aleja de Reboot.

---

## 8. Estructura funcional de la landing

### 8.1. Estructura general

La landing debe tener:

1. Header simple con logo Reboot.
2. Hero breve.
3. Explicación corta del proceso.
4. Botón para iniciar.
5. Bloque de formulario paso a paso.
6. Pantalla final con Cal.com.
7. Footer/legal mínimo.

No debe ser una página larga de venta.

### 8.2. Hero

El hero debe transmitir:

- Que el usuario está empezando su proceso de orientación/admisión.
- Que Reboot quiere conocer su situación antes de recomendar nada.
- Que el objetivo es ver cómo puede ayudarle y si encaja con la academia.
- Que el siguiente paso será una sesión 1:1.

Claim pendiente de copy final, pero dirección aprobada:

```txt
Cuéntanos tu situación y vemos cómo podemos ayudarte a empezar tu reboot profesional.
```

Alternativas aceptables para trabajar copy:

```txt
Empieza tu reboot profesional con una sesión 1:1.
```

```txt
Cuéntanos dónde estás y vemos juntos si Reboot puede ayudarte a dar el salto a tech.
```

```txt
Antes de recomendarte un bootcamp, queremos conocerte.
```

El usuario no quiere que el claim diga simplemente “diseñamos tu ruta” porque puede sonar a que se entrega un diseño de itinerario sin compromiso formativo. Debe orientar hacia formación con Reboot.

### 8.3. Subclaim

Dirección aprobada:

```txt
Responde unas preguntas rápidas sobre tu situación, tus objetivos y tu disponibilidad. Con esa información, nuestro equipo podrá orientarte, valorar tu encaje con la academia y proponerte el siguiente paso más adecuado.
```

Debe mencionar:

- Preguntas rápidas.
- Situación personal/profesional.
- Objetivos.
- Disponibilidad.
- Orientación por el equipo.
- Encaje con la academia.
- Bootcamp / ruta formativa / Reboot profesional.

### 8.4. Explicación del proceso

Tres pasos recomendados:

1. Cuéntanos tu situación.
2. Valoramos tu objetivo y disponibilidad.
3. Reserva una sesión 1:1 con el equipo de Reboot.

Texto posible:

```txt
El cuestionario te llevará unos minutos. Nos ayuda a entender tu punto de partida antes de la sesión, para no darte información genérica y poder hablar de una ruta realista para ti.
```

### 8.5. Lenguaje orientación/admisión

Usar mezcla de:

- Orientación.
- Admisión.
- Encaje con la academia.
- Sesión 1:1.
- Reboot profesional/vital.

Evitar que suene frío o burocrático.

Dirección:

```txt
Proceso inicial de orientación y admisión
```

Puede aparecer en microcopy, no necesariamente como headline principal.

---

## 9. Naming de la sesión

El naming no está 100% cerrado, pero la dirección es clara:

- Debe sonar a ayuda, orientación y acompañamiento.
- También puede transmitir que Reboot evalúa si el lead encaja.
- Debe conectar con “reboot profesional/vital”.

### 9.1. Nombre recomendado provisional

```txt
Sesión 1:1 de Orientación Reboot
```

### 9.2. Alternativas aceptables

```txt
Sesión de Orientación y Admisión Reboot
```

```txt
Diagnóstico Reboot Profesional
```

```txt
Sesión Reboot 1:1
```

```txt
Sesión de Orientación para tu Reboot Profesional
```

### 9.3. Uso en Cal.com

El nombre del evento en Cal.com deberá alinearse con el naming final. En V1 puede dejarse como variable/configuración:

```env
NEXT_PUBLIC_CALCOM_EVENT_NAME="Sesión 1:1 de Orientación Reboot"
NEXT_PUBLIC_CALCOM_URL=""
```

El usuario proporcionará el embed/URL final de Cal.com.

---

## 10. Cuestionario V1: orden y lógica

### 10.1. Orden general aprobado

El usuario corrigió el orden. Primero deben ir los datos personales y situación actual. Después objetivos y cualificación.

Orden recomendado:

1. Nombre.
2. Apellidos.
3. Edad/rango de edad.
4. Residencia.
5. Email.
6. WhatsApp/teléfono.
7. Situación actual.
8. Qué espera conseguir con la formación.
9. Objetivo principal/misión.
10. Área de interés.
11. Nivel técnico actual.
12. Estudios/formación previa.
13. Disponibilidad semanal.
14. Modalidad preferida.
15. Inversión posible.
16. Interés en pago fraccionado.
17. Urgencia/inicio deseado.
18. Contexto adicional.
19. Consentimiento legal.
20. Pantalla final con Cal.com.

Si se considera demasiado largo en UX, se pueden fusionar algunos pasos sin mostrar todo de golpe. Pero el usuario ha dicho que acepta las pantallas necesarias si son rápidas.

### 10.2. Reglas del formulario

- Una pregunta visible cada vez.
- Todas las preguntas obligatorias.
- No se puede avanzar sin responder.
- Debe haber botón atrás.
- Debe haber barra de progreso.
- Enter debe avanzar cuando sea posible.
- En preguntas de texto, Enter puede avanzar salvo en textarea/contexto adicional, donde debe respetar salto de línea o usar `Ctrl+Enter`/botón.
- Validación clara y suave.
- No mostrar todo el formulario completo nunca.

### 10.3. Tipo de selección

Salvo que se indique lo contrario:

- Objetivo principal: selección única.
- Área de interés: selección única.
- Nivel: selección única.
- Situación actual: selección única.
- Inversión: selección única.
- Pago fraccionado: selección única sí/no/tal vez.
- Urgencia: selección única.

El usuario ha indicado que para el objetivo principal tiene sentido forzar una sola opción.

---

## 11. Preguntas y opciones propuestas

Esta sección convierte las decisiones en una estructura concreta. La redacción exacta podrá pulirse en copy, pero la lógica debe mantenerse.

### 11.1. Nombre

**Pregunta:**

```txt
Antes de empezar, ¿cómo te llamas?
```

**Campo:** texto corto  
**Obligatoria:** sí  
**Campo BD:** `first_name`

### 11.2. Apellidos

**Pregunta:**

```txt
¿Y tus apellidos?
```

**Campo:** texto corto  
**Obligatoria:** sí  
**Campo BD:** `last_name`

### 11.3. Edad / rango de edad

El usuario acepta menores. Por tanto no se debe bloquear a menores, pero conviene detectarlos.

**Pregunta:**

```txt
¿Cuál es tu rango de edad?
```

**Opciones:**

```txt
Menos de 18
18-24
25-34
35-44
45-54
55+
```

**Obligatoria:** sí  
**Campo BD:** `age_range`  
**Campo derivado:** `is_minor`

Regla:

```txt
is_minor = true si age_range = "Menos de 18"
```

No bloquear si es menor. Puede etiquetarse internamente.

### 11.4. Residencia

El usuario prefiere residencia, no nacionalidad.

**Pregunta:**

```txt
¿Dónde vives actualmente?
```

**Campo:** texto corto, idealmente ciudad/país  
**Obligatoria:** sí  
**Campo BD:** `residence`

No preguntar nacionalidad en V1.

### 11.5. Email

**Pregunta:**

```txt
¿Cuál es tu email?
```

**Campo:** email  
**Obligatoria:** sí  
**Campo BD:** `email`

Validación básica de email.

### 11.6. WhatsApp / teléfono

**Pregunta:**

```txt
¿En qué número de WhatsApp podemos contactarte?
```

**Campo:** teléfono/texto  
**Obligatoria:** sí  
**Campo BD:** `phone`

Validación básica, no demasiado estricta por leads internacionales.

### 11.7. Situación actual

**Pregunta:**

```txt
¿Cuál describe mejor tu situación actual?
```

**Opciones:**

```txt
Estoy estudiando
Estoy trabajando
Estoy desempleado/a
Soy autónomo/a o tengo un negocio
Quiero cambiar de sector
Otra situación
```

**Obligatoria:** sí  
**Campo BD:** `current_situation`

### 11.8. Qué espera conseguir

El usuario confirmó que quiere saber qué espera conseguir con la formación.

**Pregunta:**

```txt
¿Qué esperas conseguir con una formación tecnológica?
```

**Opciones:**

```txt
Conseguir mi primer empleo en tecnología
Cambiar de carrera o de sector
Mejorar mi perfil profesional actual
Aplicar tecnología, IA o automatización en mi trabajo
Crear mi propio proyecto, app o negocio digital
Aprender por interés personal
```

**Obligatoria:** sí  
**Campo BD:** `desired_outcome`

### 11.9. Objetivo principal / misión

El usuario quiere que se formule como una elección de misión principal.

**Pregunta:**

```txt
Si tuvieras que elegir una misión principal para este proceso, ¿cuál sería?
```

**Opciones:**

```txt
Cambiar de carrera hacia tecnología
Encontrar mi primer empleo en tech
Aprender programación desde cero
Especializarme o subir de nivel profesional
Aprender IA, data o automatización
Crear una web, app o proyecto propio
Todavía no lo tengo claro y necesito orientación
```

**Obligatoria:** sí  
**Selección:** única  
**Campo BD:** `objective`

### 11.10. Área de interés

Mobile apps no debe aparecer como opción visible en V1.

**Pregunta:**

```txt
¿Qué área te interesa más ahora mismo?
```

**Opciones recomendadas:**

```txt
Desarrollo Web / Full Stack
Programación desde cero
Inteligencia Artificial aplicada
Data Analysis / Business Intelligence
Automatización y herramientas digitales
E-commerce, WordPress o tiendas online
No lo tengo claro, necesito orientación
```

**Obligatoria:** sí  
**Selección:** única  
**Campo BD:** `interest_area`

Notas:

- No incluir “Desarrollo de aplicaciones móviles” en V1.
- Si el lead venía preguntando por móvil desde WhatsApp, el equipo podrá tratarlo manualmente, pero el funnel no debe generar expectativa explícita de un programa mobile.

### 11.11. Nivel técnico actual

**Pregunta:**

```txt
¿Cuál dirías que es tu nivel actual?
```

**Opciones:**

```txt
Cero, empiezo desde el principio
He hecho algún curso o tutorial
Sé programar un poco
Ya he creado algún proyecto
Trabajo o he trabajado en tecnología
No estoy seguro/a
```

**Obligatoria:** sí  
**Campo BD:** `current_level`

### 11.12. Estudios / formación previa

El usuario quiere preguntar por estudios previos.

**Pregunta:**

```txt
¿Cuál es tu formación previa o situación académica más cercana?
```

**Opciones:**

```txt
ESO o equivalente
Bachillerato
Formación Profesional
Universidad
Cursos online / formación autodidacta
Bootcamp u otra formación tecnológica previa
Actualmente estoy estudiando
Otro
```

**Obligatoria:** sí  
**Campo BD:** `education_background`

No se busca filtrar por titulación, sino conocer contexto.

### 11.13. Disponibilidad semanal

**Pregunta:**

```txt
¿Cuánto tiempo real podrías dedicar a formarte cada semana?
```

**Opciones:**

```txt
Menos de 5 horas por semana
5-10 horas por semana
10-20 horas por semana
Más de 20 horas por semana
Depende del horario y la organización
```

**Obligatoria:** sí  
**Campo BD:** `weekly_availability`

No preguntar horario preferido en V1.

### 11.14. Modalidad preferida

No mencionar presencial/híbrido en V1.

**Pregunta:**

```txt
¿Qué formato encajaría mejor contigo?
```

**Opciones:**

```txt
Online flexible, avanzando a mi ritmo
Online con mentorías 1:1 y tutor personal
Intensivo tipo bootcamp
No lo sé, quiero que me orientéis
```

**Obligatoria:** sí  
**Campo BD:** `preferred_modality`

No incluir presencial.

### 11.15. Inversión / disposición a pagar

Esta es una de las preguntas más importantes del funnel.

El usuario quiere cualificar disposición a pagar de forma directa, sin opción explícita de gratuito.

**Pregunta recomendada:**

```txt
¿Qué inversión podrías plantearte para una formación personalizada que te ayude a dar este cambio profesional?
```

**Opciones:**

```txt
Menos de 500 €
Entre 500 € y 1.000 €
Entre 1.000 € y 2.000 €
Entre 2.000 € y 3.000 €
Más de 3.000 €
```

**Obligatoria:** sí  
**Campo BD:** `investment_range`

Notas importantes:

- No incluir “solo busco formación gratuita”.
- No hablar de cursos subvencionados.
- No mostrar precio final del producto.
- No hablar de beca/descuento en la landing.
- Esta pregunta se usa para cualificación y empaquetado posterior.

### 11.16. Pago fraccionado

El usuario confirmó que debe incluirse.

**Pregunta:**

```txt
¿Te ayudaría poder fraccionar el pago si el programa encaja contigo?
```

**Opciones:**

```txt
Sí, me interesa valorar pago fraccionado
No, podría hacer el pago completo si encaja
Prefiero hablarlo en la sesión
```

**Obligatoria:** sí  
**Campo BD:** `financing_interest`

### 11.17. Urgencia / cuándo quiere empezar

**Pregunta:**

```txt
¿Cuándo te gustaría empezar si encontramos una opción que encaje contigo?
```

**Opciones:**

```txt
Lo antes posible
Este mes
En 1-3 meses
Más adelante
Estoy explorando opciones
```

**Obligatoria:** sí  
**Campo BD:** `start_timing`

Debe impactar en scoring.

### 11.18. Contexto adicional

Aunque todas las preguntas sean obligatorias, este campo debe formularse de manera fácil para que no frene.

**Pregunta:**

```txt
Cuéntanos en una frase cualquier cosa que debamos saber antes de la sesión.
```

**Placeholder:**

```txt
Ejemplo: busco cambiar de carrera, tengo poco tiempo entre semana, vengo de otro país, me interesa IA, quiero empezar desde cero...
```

**Campo:** textarea corto  
**Obligatoria:** sí  
**Campo BD:** `free_text`

### 11.19. Consentimiento legal

**Pregunta/checkbox:**

```txt
Acepto que Reboot Academy trate mis datos para contactar conmigo y orientarme sobre programas formativos.
```

**Obligatoria:** sí  
**Campo BD:** `privacy_accepted` y/o `contact_accepted`

Debe enlazar a la política de privacidad de Reboot.

---

## 12. Lógica condicional

### 12.1. Decisión V1

La V1 debe ser lineal.

No implementar ramas complejas.

El usuario no quiere que la implementación se lie con casos especiales. Los casos se resuelven por scoring/etiquetas y en la llamada.

### 12.2. Casos especiales

#### Menores de edad

- No bloquear.
- Etiquetar internamente como `minor` si `age_range = Menos de 18`.
- El equipo tratará autorización familiar manualmente.

#### Disponibilidad baja

- No bloquear.
- Etiquetar si procede como `low_availability`.
- La llamada valorará modalidad flexible.

#### No sabe qué estudiar

- No bloquear.
- Es precisamente parte del objetivo del funnel.
- Etiquetar como `needs_orientation` si elige “No lo tengo claro”.

#### Busca formación gratuita

- No existe opción explícita en V1.
- Si lo escribe en texto libre, no bloquear.
- Puede ser etiquetado manualmente o detectado después en CRM.

---

## 13. Scoring y etiquetas

### 13.1. Nivel de complejidad

El usuario quiere scoring, pero no quiere demasiadas etiquetas ni complejidad.

Implementar scoring simple y 3-4 etiquetas útiles.

### 13.2. Campos recomendados

```txt
lead_score
lead_temperature
lead_tags
lead_summary
```

Donde:

- `lead_score`: número simple 0-100.
- `lead_temperature`: `hot`, `warm`, `cold`.
- `lead_tags`: array/JSON con pocas etiquetas.
- `lead_summary`: texto legible para que el equipo pueda copiar al CRM.

### 13.3. Etiquetas recomendadas

Máximo recomendado para V1:

```txt
hot_lead
warm_lead
low_budget
needs_orientation
minor
```

Si se quiere reducir aún más:

```txt
hot_lead
warm_lead
low_budget
needs_orientation
```

`minor` es útil por la casuística real detectada.

No meter larga lista de tags en V1.

### 13.4. Regla de lead caliente

Un lead caliente debería cumplir, como mínimo:

- Quiere empezar pronto.
- Declara inversión igual o superior a 1.000 €.
- Tiene objetivo razonablemente claro o interés fuerte.
- Puede dedicar al menos 5-10 h/semana.
- Completa el formulario.
- Idealmente agenda sesión.

Como la V1 puede no tener webhook de Cal.com, “agenda sesión” puede no incorporarse al scoring automático inicial. En ese caso, scoring se calcula antes de saber si ha agendado.

### 13.5. Propuesta simple de puntuación

Puntuación base: 0.

#### Inversión

```txt
Menos de 500 € => +0
500-1.000 € => +15
1.000-2.000 € => +25
2.000-3.000 € => +35
Más de 3.000 € => +40
```

#### Urgencia

```txt
Lo antes posible => +25
Este mes => +20
En 1-3 meses => +15
Más adelante => +5
Estoy explorando opciones => +0
```

#### Disponibilidad

```txt
Menos de 5 h/semana => +0
5-10 h/semana => +10
10-20 h/semana => +15
Más de 20 h/semana => +20
Depende del horario => +5
```

#### Modalidad

```txt
Online con mentorías 1:1 y tutor personal => +15
Intensivo tipo bootcamp => +15
Online flexible => +10
No lo sé, quiero orientación => +5
```

#### Objetivo

```txt
Cambiar de carrera hacia tecnología => +10
Encontrar mi primer empleo en tech => +10
Aprender programación desde cero => +5
Especializarme o subir de nivel profesional => +10
Aprender IA, data o automatización => +10
Crear una web, app o proyecto propio => +5
Todavía no lo tengo claro => +0
```

La suma puede superar 100 si se amplía. Normalizar a máximo 100:

```ts
lead_score = Math.min(rawScore, 100)
```

### 13.6. Temperatura

```txt
80-100 => hot
45-79 => warm
0-44 => cold
```

Ajuste recomendado:

- Si inversión es “Menos de 500 €”, forzar `low_budget` y no marcar `hot` aunque la urgencia sea alta.
- Si objetivo o área = “No lo tengo claro”, añadir `needs_orientation`, pero no penalizar demasiado: es un lead válido para orientación.

### 13.7. Resumen automático

Debe generarse un texto simple, sin IA, a partir de respuestas.

Ejemplo:

```txt
Lead interesado en Desarrollo Web / Full Stack. Vive en Las Palmas, rango 25-34. Situación actual: desempleado/a. Objetivo: cambiar de carrera hacia tecnología. Nivel: cero, empieza desde el principio. Puede dedicar 10-20 horas/semana. Modalidad preferida: online con mentorías 1:1. Inversión declarada: entre 2.000 € y 3.000 €, con interés en pago fraccionado. Quiere empezar este mes. Temperatura: hot.
```

Uso:

- Facilitar que una persona del equipo copie/traslade el lead al CRM.
- Ahorrar lectura de todas las respuestas.
- Preparar la llamada.

---

## 14. Supabase

### 14.1. Estado inicial

El usuario ha indicado que todavía no hay proyecto Supabase creado.

Codex/Claude deberá:

- Preparar la estructura necesaria.
- Crear migraciones SQL.
- Usar Supabase CLI si está disponible.
- Documentar comandos.
- No depender de intervención manual innecesaria del usuario.

Si la creación de proyecto cloud requiere login/permisos que no están disponibles desde el entorno, el agente debe dejar migraciones y pasos claros, sin bloquear la implementación local.

### 14.2. Tabla recomendada

Para V1, usar una sola tabla.

Nombre recomendado:

```txt
orientation_leads
```

Motivo:

- Simplicidad.
- El usuario no quiere panel admin ni normalización compleja.
- Supabase dashboard será suficiente para revisar leads.
- El CRM se actualizará manualmente por agentes/personas del equipo.

### 14.3. Campos recomendados

```sql
id uuid primary key default gen_random_uuid(),
created_at timestamptz not null default now(),
updated_at timestamptz not null default now(),

first_name text not null,
last_name text not null,
email text not null,
phone text not null,
residence text not null,
age_range text not null,
is_minor boolean not null default false,

current_situation text not null,
desired_outcome text not null,
objective text not null,
interest_area text not null,
current_level text not null,
education_background text not null,
weekly_availability text not null,
preferred_modality text not null,
investment_range text not null,
financing_interest text not null,
start_timing text not null,
free_text text not null,

privacy_accepted boolean not null default false,
contact_accepted boolean not null default false,

lead_score integer not null default 0,
lead_temperature text not null default 'cold',
lead_tags jsonb not null default '[]'::jsonb,
lead_summary text not null,

source text,
utm_source text,
utm_medium text,
utm_campaign text,
utm_content text,
utm_term text,
referrer text,

cal_booking_status text not null default 'unknown',

raw_answers jsonb not null default '{}'::jsonb,
metadata jsonb not null default '{}'::jsonb
```

### 14.4. Campos JSON

Incluir campos JSON por flexibilidad:

```txt
raw_answers jsonb
metadata jsonb
lead_tags jsonb
```

Motivo:

- Permite guardar el payload original del formulario.
- Permite evolucionar preguntas sin migrar cada vez.
- Permite depurar.
- Permite agregar metadatos técnicos/UTMs.

### 14.5. Duplicados

V1 permite duplicados.

No bloquear por email ni teléfono.

Motivo:

- Puede haber leads que rellenen varias veces.
- Evitar fricción.
- La depuración puede hacerse manualmente en CRM/Supabase.

Opcional futuro:

- Marcar posible duplicado por email/phone.
- Fusionar leads en CRM.

### 14.6. Momento de guardado

Guardar al final del formulario, cuando el usuario envía el último paso.

No hace falta guardado parcial en V1.

### 14.7. Si falla Supabase

Comportamiento requerido:

- No dejar al usuario atrapado.
- Mostrar final con Cal.com igualmente o permitir que llegue a Cal.com.
- Mostrar un aviso suave de que hubo un problema guardando y que puede reintentar.
- Mantener respuestas en estado local para reintento.

Propuesta UX:

```txt
Estamos guardando tus respuestas...
```

Si falla:

```txt
No hemos podido guardar tus respuestas a la primera. Puedes reintentarlo sin perder lo que has escrito. Mientras tanto, puedes reservar tu sesión.
```

Botón:

```txt
Reintentar guardado
```

El objetivo comercial es no perder la reserva en Cal.com por un problema técnico.

### 14.8. Seguridad de inserción

Opción preferida si se usa Next.js:

- Crear endpoint server-side o server action.
- Insertar en Supabase desde servidor.
- Usar service role solo en servidor.
- No exponer service role al cliente.

Opción si se usa Vite/static:

- Usar anon key.
- Activar RLS.
- Política insert-only para la tabla.
- No permitir select/update/delete desde cliente.

No dejar la tabla públicamente legible.

---

## 15. Cal.com

### 15.1. Decisión base

Cal.com debe aparecer embebido al final del formulario.

El usuario proporcionará el componente/embed/URL final.

### 15.2. Comportamiento final

Al pulsar el botón final:

1. Validar último paso.
2. Construir payload.
3. Intentar guardar en Supabase.
4. Pasar a pantalla final con Cal.com embebido.
5. No depender de que Supabase haya confirmado para que el usuario pueda ver Cal.com, aunque se debe intentar guardar y permitir reintento si falla.

### 15.3. Embed vs redirección

Preferido:

```txt
Cal.com embebido en la pantalla final
```

No redirección por defecto.

### 15.4. Prefill

El usuario ha dicho que le da igual, pero se puede intentar si es fácil.

Prioridad:

1. Embed funcional.
2. Si es trivial, prellenar nombre/email.
3. No bloquear V1 por prefill.

### 15.5. Webhook Cal.com

No es requisito V1.

Puede quedar para V2:

- Marcar `cal_booking_status = booked`.
- Actualizar lead por email.
- Notificar al equipo.
- Sincronizar CRM.

---

## 16. Notificaciones y emails

### 16.1. Aviso interno

No implementar en V1 salvo que sea trivial y no retrase.

El usuario ha indicado que estaría bien, pero ha decidido no liarlo.

### 16.2. Email automático al lead

No implementar en V1.

Motivo:

- Cal.com ya enviará confirmación cuando agende.
- No añadir Postmark/Resend/Gmail SMTP en V1.

### 16.3. Email de backup

No necesario en V1.

### 16.4. Backlog V2

- Email interno al equipo con resumen del lead.
- Email al lead si completó formulario pero no agenda.
- Recordatorio WhatsApp/manual.
- Integración con Postmark/Resend.

---

## 17. WhatsApp / Instagram operativo

### 17.1. Uso operativo del funnel

El flujo comercial inicial será manual:

1. Lead escribe por WhatsApp o Instagram.
2. Equipo responde con mensaje plantilla.
3. Se envía link al funnel.
4. Lead completa cuestionario.
5. Lead agenda sesión.
6. Equipo revisa Supabase.
7. Equipo actualiza CRM existente manualmente o vía agentes.

### 17.2. Mensaje plantilla principal

Propuesta aprobada por el usuario:

```txt
¡Genial! Para poder orientarte bien y valorar si podemos ayudarte desde Reboot, necesitamos conocerte un poco mejor.

Hemos preparado un cuestionario corto de 2 minutos. Al terminar podrás reservar una sesión 1:1 con nuestro equipo para revisar tu caso, resolver dudas y ver qué bootcamp o itinerario puede encajar contigo.

Te dejo aquí el enlace:
[LINK]
```

### 17.3. Variante con admisión

Puede usarse si se quiere aumentar percepción de proceso selectivo:

```txt
¡Genial! Para valorar tu solicitud de entrada en la academia y orientarte bien, necesitamos que completes este cuestionario inicial.

Nos ayuda a entender tu situación, tu objetivo y tu disponibilidad antes de la sesión 1:1 con nuestro equipo.

Aquí tienes el enlace:
[LINK]
```

### 17.4. No crear múltiples plantillas en V1

No se necesitan plantillas específicas por precio, horario, mobile, menores, internacional, etc. en este documento de implementación.

---

## 18. Legal, privacidad y analytics

### 18.1. Política de privacidad

El usuario indica que los textos legales están resueltos en la web de Reboot.

Implementación:

- Reutilizar enlace a política de privacidad existente.
- Incluir checkbox obligatorio.
- No redactar política nueva si ya existe.

### 18.2. Checkbox de tratamiento/contacto

Campo obligatorio:

```txt
Acepto que Reboot Academy trate mis datos para contactar conmigo y orientarme sobre programas formativos.
```

Debe enlazar a la política de privacidad.

### 18.3. Google Analytics

El usuario quiere Google Analytics en V1.

Implementación:

- Incluir variable de entorno para Measurement ID.
- Reutilizar patrón existente de cookies/analytics de Reboot si existe.
- Si Reboot ya tiene banner o consentimiento, replicar el enfoque.
- Si no existe, documentar claramente el punto pendiente o implementar un consentimiento mínimo.

Variable recomendada:

```env
NEXT_PUBLIC_GA_MEASUREMENT_ID=
```

Eventos mínimos si se implementan:

```txt
form_start
form_step_completed
form_submit
cal_embed_view
```

Si esto retrasa, basta con pageview + form submission en Supabase.

### 18.4. Cookies

Si se activa GA, revisar que el consentimiento esté alineado con la web Reboot.

No crear un sistema complejo de cookies en V1 si existe uno reutilizable.

---

## 19. KPIs y horizonte

### 19.1. Horizonte de construcción

Objetivo operativo indicado:

```txt
V1 funcional en aproximadamente 2 días.
```

### 19.2. Horizonte de validación

No se ha fijado un objetivo cuantitativo por el usuario.

Se recomienda usar un horizonte de observación inicial de:

```txt
2-4 semanas tras lanzamiento
```

Esto no es un compromiso comercial; es una recomendación de medición.

### 19.3. KPIs mínimos a registrar

Aunque el usuario no quiere obsesionarse con KPIs, conviene dejar una base mínima:

- Visitas a la landing.
- Inicio del formulario.
- Formulario completado.
- Ratio visita → formulario completado.
- Visualización/click/embed de Cal.com.
- Sesiones agendadas en Cal.com.
- Ratio formulario completado → sesión agendada.
- Inversión declarada media/moda.
- Distribución por área de interés.
- Distribución por urgencia.
- Distribución por lead temperature.

### 19.4. Sin targets numéricos cerrados

No hay targets numéricos fijados todavía.

No inventar objetivos como “X ventas” o “X leads” en la implementación.

---

## 20. Estados comerciales

### 20.1. Sin pipeline interno en V1

No hay panel admin ni CRM integrado en V1.

Los estados se pueden guardar de manera simple para futuro, pero no deben complicar UI.

### 20.2. Estado inicial recomendado

Campo:

```txt
lead_status
```

Valores posibles V1:

```txt
new_submission
pending_booking
low_budget
```

Como no habrá webhook Cal.com en V1, no asumir `booked` salvo que se implemente integración.

Regla recomendada:

- Si inversión `<500 €`: `low_budget`.
- Si inversión >= `500 €`: `pending_booking`.
- Si no se puede calcular: `new_submission`.

### 20.3. Estados V2 posibles

```txt
booked
contacted
qualified
proposal_sent
won
lost
nurture
```

No implementar flujo de actualización en V1.

---

## 21. Deployment

### 21.1. Plataforma

Deploy en Vercel.

### 21.2. Dominio

Dominio final pendiente.

Opciones futuras posibles:

```txt
orientacion.reboot.academy
admisiones.reboot.academy
reboot.academy/orientacion
```

Para V1, puede desplegarse primero en URL temporal de Vercel.

### 21.3. Variables de entorno

Debe dejarse `.env.example` y documentación en README.

Variables previsibles:

```env
NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_GA_MEASUREMENT_ID=
NEXT_PUBLIC_CALCOM_URL=
SUPABASE_URL=
SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

Ajustar nombres según framework.

---

## 22. Seguridad y validación

### 22.1. Antispam

Ser operativo. No sobrecomplicar.

Recomendación V1:

- Honeypot invisible.
- Validación básica.
- No reCAPTCHA salvo abuso real.
- No Turnstile salvo que sea muy fácil y no afecte UX.

### 22.2. Validación de campos

- Email: validación básica.
- Teléfono: no demasiado estricta.
- Texto: trim y longitud máxima razonable.
- Selects: validar contra opciones permitidas.
- Consentimiento: obligatorio.

### 22.3. Longitudes máximas recomendadas

```txt
first_name: 100
last_name: 150
email: 254
phone: 50
residence: 150
free_text: 1000
lead_summary: 2000
```

### 22.4. Protección de Supabase

No exponer credenciales sensibles.

Si se usa Next/API route:

- Service role solo en servidor.
- Cliente envía payload al endpoint interno.
- Endpoint valida y guarda.

Si se usa cliente directo:

- RLS obligatoria.
- Solo insert.
- Sin select público.

---

## 23. UX y comportamiento del formulario

### 23.1. Reglas visuales

- Card o bloque central con pregunta actual.
- No mostrar todas las preguntas.
- Progreso visible.
- Botón principal claro.
- Botón atrás secundario.
- Microcopy breve.
- Animaciones suaves si no complican.
- Responsive mobile-first.

### 23.2. Validación en paso

Si el usuario intenta avanzar sin responder:

- No avanzar.
- Mostrar mensaje suave.

Ejemplo:

```txt
Responde esta pregunta para continuar.
```

### 23.3. Botones

Primer paso:

```txt
Empezar
```

Pasos intermedios:

```txt
Continuar
```

Último paso:

```txt
Enviar y reservar mi sesión
```

Pantalla final:

```txt
Reserva tu sesión 1:1
```

### 23.4. Pantalla final estándar

Texto recomendado:

```txt
Gracias. Con tus respuestas ya podemos revisar tu caso y orientarte mejor.

El siguiente paso es reservar tu sesión 1:1 con el equipo de Reboot. En la sesión revisaremos tu objetivo, tu disponibilidad, tu punto de partida y las opciones de bootcamp o itinerario que podrían encajar contigo.
```

Debajo: embed de Cal.com.

### 23.5. Aviso de preparación de llamada

Debe incluirse un mensaje breve:

```txt
Te recomendamos reservar un momento en el que puedas hablar con calma. La sesión nos servirá para entender tu situación y valorar contigo el siguiente paso.
```

---

## 24. Backlog V2

Dejar expresamente fuera de V1:

1. Integración con Twenty CRM.
2. Sincronización con Google Sheets.
3. Email automático interno.
4. Email automático al lead.
5. Webhook de Cal.com.
6. Panel admin.
7. Dashboard de métricas.
8. Multiidioma.
9. Lógica condicional avanzada.
10. WhatsApp API.
11. Scoring avanzado.
12. Detección automática de duplicados.
13. Variantes de landing por campaña/curso.
14. A/B testing.
15. Automatizaciones de seguimiento si rellena pero no agenda.
16. Lead enrichment.
17. Integración directa con pagos.

---

## 25. Decisiones cerradas

- El funnel es de cualificación/orientación/admisión, no de venta directa.
- V1 debe guardar leads en Supabase.
- V1 debe mostrar Cal.com embebido al final.
- V1 no tiene panel admin.
- V1 no integra CRM.
- V1 no envía emails automáticos al lead.
- V1 no incluye pagos.
- V1 no muestra catálogo público de cursos.
- V1 no menciona cursos subvencionados.
- V1 no ofrece opción explícita “solo busco gratis”.
- V1 debe preguntar inversión con rangos económicos.
- V1 debe incluir pago fraccionado como pregunta.
- V1 debe preguntar situación actual, objetivo, nivel, estudios, disponibilidad, modalidad, inversión y urgencia.
- V1 debe ser mobile-first.
- V1 debe funcionar como Typeform: una pregunta por pantalla.
- V1 debe usar marca Reboot.
- Fuente de marca: repo `reboot-web-3.0` y web pública.
- Deploy: Vercel.
- Google Analytics: sí, reutilizando patrón legal/cookies si existe.

---

## 26. Incógnitas/TBD que no deben bloquear la V1

### 26.1. Cal.com

Pendiente:

- URL/embed final.
- Nombre final del evento.
- Duración exacta.
- Horarios.

Cómo resolver en V1:

- Dejar variable `NEXT_PUBLIC_CALCOM_URL`.
- Usar placeholder de componente si aún no se ha proporcionado.
- Integrar embed real cuando el usuario lo facilite.

### 26.2. Dominio final

Pendiente:

- Subdominio/ruta final.

Cómo resolver:

- Deploy temporal en Vercel.
- Documentar dominio pendiente.

### 26.3. Google Analytics Measurement ID

Pendiente:

- ID concreto.

Cómo resolver:

- Dejar variable de entorno.
- Implementación preparada.

### 26.4. Mockup Google Stitch

Pendiente:

- Diseño final generado por Stitch.

Cómo resolver:

- Usar repo Reboot como fuente visual inicial.
- Permitir refactor visual posterior.

### 26.5. Supabase Cloud Project

Pendiente:

- Proyecto cloud si no existe.
- URL y keys.

Cómo resolver:

- Crear migración SQL.
- Preparar README con comandos.
- Usar Supabase CLI si hay acceso.

---

## 27. Criterios de aceptación para V1

La V1 se considera aceptable si:

1. La landing carga correctamente en local.
2. La landing tiene apariencia coherente con Reboot.
3. La página es responsive y usable en móvil.
4. El formulario muestra solo una pregunta por pantalla.
5. Todas las preguntas obligatorias bloquean avance si no se responden.
6. Hay barra de progreso.
7. Hay botón atrás.
8. Enter permite avanzar cuando corresponde.
9. Se capturan nombre, apellidos, email, teléfono y residencia.
10. Se capturan edad/rango e `is_minor` derivado.
11. Se capturan situación, objetivo, área, nivel, estudios, disponibilidad, modalidad, inversión, financiación, urgencia y texto libre.
12. No existe opción visible de formación gratuita.
13. No aparece desarrollo móvil como opción visible.
14. No aparece presencial como opción visible.
15. Se genera `lead_score`.
16. Se genera `lead_temperature`.
17. Se generan pocas etiquetas útiles.
18. Se genera `lead_summary` legible.
19. El lead se puede guardar en Supabase.
20. Si falla Supabase, el usuario no queda bloqueado y puede reintentar.
21. Tras el envío, se muestra pantalla final con Cal.com embebido o placeholder configurable.
22. Existe `.env.example`.
23. Existe README funcional.
24. Existe migración/SQL o setup Supabase documentado.
25. El proyecto está preparado para deploy en Vercel.
26. No hay panel admin.
27. No hay CRM integrado.
28. No hay emails automáticos al lead.
29. No hay pagos.
30. No hay catálogo público.

---

## 28. Resumen ejecutivo para `write-spec`

Construir una V1 del funnel de orientación/admisión Reboot en el repo `Reboot-Intro-Cualification-Funnel`.

La aplicación debe ser una landing mobile-first con marca Reboot, tomando como fuente visual la web/repo `reboot-web-3.0`. Debe tener hero breve, explicación de proceso y un formulario tipo Typeform con una sola pregunta visible cada vez. El formulario debe recoger datos personales, situación actual, objetivo, área de interés, nivel, estudios, disponibilidad, modalidad, inversión, financiación, urgencia, contexto adicional y consentimiento legal. Todas las preguntas son obligatorias.

Al final debe guardar el lead en Supabase, calcular scoring simple, temperatura, etiquetas mínimas y resumen textual del lead. Después debe mostrar un embed de Cal.com para reservar una sesión 1:1 de orientación Reboot. La pantalla final no debe depender de forma rígida de que Supabase haya respondido correctamente; si falla el guardado, debe permitir reintentar sin perder respuestas y seguir facilitando la reserva.

No implementar panel admin, login, CRM, emails automáticos, pagos, catálogo público, multiidioma, WhatsApp API ni automatizaciones complejas en V1. Deploy previsto en Vercel. Google Analytics debe quedar preparado con variable de entorno y, si existe, reutilizar el patrón de consentimiento/cookies de Reboot.

