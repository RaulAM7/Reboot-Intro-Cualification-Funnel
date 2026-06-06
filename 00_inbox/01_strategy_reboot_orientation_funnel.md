# 01 · Estrategia inicial — Reboot Orientation Funnel

> **Documento para `00_inbox/`**  
> Proyecto: **Reboot Orientation Funnel**  
> Tipo de documento: **estrategia, contexto inicial y framing de negocio**  
> Estado: **v0.1 — basado en decisiones iniciales del project owner**  
> Uso previsto: servir como input para una fase de **Initial Context Building** antes de cualquier diseño visual, UX detallada o implementación técnica.

---

## 0. Nota de alcance epistemológico

Este documento **no es un documento de implementación**.

No define todavía:

- stack técnico definitivo,
- estructura de base de datos,
- schema Supabase,
- componentes React/Vue/Next,
- diseño visual final,
- copy definitivo de pantalla,
- lógica condicional exacta,
- prompt para Google Stitch,
- prompt para Codex o Claude Code para construir la app,
- integración concreta con Cal.com,
- automatizaciones posteriores,
- CRM o pipeline operativo completo.

Este documento define el **porqué**, el **para qué**, el **tipo de negocio**, el **tipo de lead**, la **lógica comercial**, la **oferta que se quiere cualificar**, los **principios estratégicos**, los **límites** y las **decisiones ya tomadas**.

La implementación deberá abordarse en un documento posterior, por ejemplo:

```txt
00_inbox/02_implementation_context_reboot_orientation_funnel.md
```

Hasta que exista ese documento de implementación, ningún agente debe asumir detalles técnicos, visuales o de arquitectura como cerrados.

---

## 1. Resumen ejecutivo

Reboot Academy sigue recibiendo demanda orgánica cualificada a través de sus activos históricos de marca, SEO, reputación, web, Instagram, WhatsApp y reconocimiento en el mercado de bootcamps.

Estos leads no son equivalentes a un contacto outbound frío. En muchos casos son personas que ya han hecho una búsqueda activa, han comparado academias, tienen una inquietud profesional real y están explorando una transición vital o laboral hacia tecnología.

El problema actual es que estos contactos llegan de forma dispersa, principalmente por WhatsApp e Instagram, y el equipo termina respondiendo de manera manual, improvisada y repetitiva:

- preguntas sobre cursos,
- preguntas sobre acceso a la academia,
- dudas sobre edad mínima,
- dudas sobre idioma,
- dudas sobre visado,
- dudas sobre horarios,
- dudas sobre modalidad,
- preguntas sobre desarrollo móvil,
- interés por Python, IA, data, marketing, fintech o automatización,
- búsqueda de cursos subvencionados,
- solicitudes genéricas de información.

La solución estratégica no es crear simplemente una landing de venta. La solución es crear un **funnel de orientación, admisión ligera y cualificación comercial**.

El funnel debe permitir transformar un lead entrante de WhatsApp/Instagram/web en un lead estructurado, con información suficiente para:

1. entender su situación,
2. detectar si Reboot puede ayudarle,
3. estimar su encaje comercial,
4. conocer su disposición a pagar,
5. conducirle a una sesión one-to-one,
6. evitar conversaciones manuales repetitivas antes de la llamada,
7. permitir que el equipo llegue a la llamada con contexto.

El producto final visible para el lead no debe sentirse como “rellena este formulario comercial”. Debe sentirse como:

> “Queremos conocerte para saber si podemos ayudarte a diseñar tu ruta tecnológica y acompañarte en tu reboot profesional.”

---

## 2. Decisión madre del proyecto

La decisión madre queda fijada así:

> El funnel será un sistema de cualificación y orientación para procesar leads orgánicos interesados en Reboot Academy, entender su situación personal/profesional/formativa, evaluar su encaje con la academia y derivarlos hacia una sesión one-to-one donde se les pueda proponer un bootcamp o itinerario tecnológico privado, flexible y personalizado.

Este proyecto se sitúa entre dos enfoques:

### 2.1. Enfoque 3: cualificación manual asistida

El funnel debe servir para **cualificar leads** y luego permitir decidir manualmente qué ofrecerles.

No se quiere que la landing venda de forma cerrada un producto único.

No se quiere que el formulario fuerce a todos los usuarios hacia el mismo curso.

No se quiere que el sistema decida por sí mismo qué debe comprar cada persona.

El valor principal es capturar información de calidad antes de la conversación comercial y pedagógica.

### 2.2. Enfoque 4: rescate de demanda orgánica de Reboot

El funnel también debe servir para canalizar la demanda que todavía llega por la marca Reboot, por antiguos bootcamps, por SEO y por reconocimiento de mercado.

Reboot conserva una atracción natural por su posicionamiento histórico en formación tecnológica, bootcamps y cambio profesional. Esa demanda debe convertirse en una entrada ordenada hacia la nueva oferta más flexible, personalizada y basada en plataforma + mentoría.

### 2.3. Síntesis estratégica

La síntesis queda así:

> “No estamos creando una landing de cursos. Estamos creando una puerta de entrada cualificada a la academia.”

O, dicho de otra forma:

> “El lead llega pidiendo información. Reboot le responde: antes de darte una respuesta genérica, queremos conocerte, valorar si podemos ayudarte y ofrecerte una sesión one-to-one para diseñar tu ruta.”

---

## 3. Problema actual

### 3.1. Problema operativo

Los leads llegan por canales conversacionales y se gestionan manualmente.

Esto genera varios problemas:

- pérdida de tiempo en conversaciones repetitivas,
- dificultad para priorizar leads,
- falta de contexto antes de la llamada,
- falta de registro ordenado,
- dificultad para saber quién realmente tiene capacidad de pago,
- dificultad para separar curiosidad de intención real,
- dificultad para detectar leads que solo quieren cursos gratuitos,
- riesgo de no responder a tiempo,
- riesgo de que el lead se enfríe,
- dificultad para escalar si aumenta el volumen.

### 3.2. Problema comercial

El equipo no quiere vender un catálogo cerrado de cursos estándar. Quiere vender itinerarios formativos personalizados, con diferentes intensidades, precios y niveles de acompañamiento.

Eso exige saber antes de la llamada:

- qué quiere conseguir la persona,
- qué nivel tiene,
- qué área le interesa,
- cuánto tiempo puede dedicar,
- si busca empleo, reconversión, mejora profesional o aprendizaje,
- si busca formación gratuita o privada,
- cuánto estaría dispuesta a invertir,
- si necesita mentoría,
- si tiene urgencia,
- si tiene restricciones de idioma, edad, país o disponibilidad.

Sin esa información, el equipo entra en cada conversación casi desde cero.

### 3.3. Problema de posicionamiento

Muchos leads vienen preguntando por “cursos”, “bootcamps”, “academia”, “desarrollo móvil”, “Python”, “IA”, “programación”, etc.

Pero la nueva oferta no debe presentarse simplemente como un catálogo de cursos.

La propuesta de valor real es más amplia:

- orientación,
- diagnóstico,
- diseño de ruta,
- acompañamiento,
- contenidos online,
- mentorías one-to-one,
- flexibilidad,
- posibilidad de adaptar intensidad, precio y alcance.

Por tanto, la landing debe traducir una demanda inicial genérica en una conversación de orientación personalizada.

---

## 4. Solución estratégica

La solución es un **funnel de orientación y cualificación**.

El flujo estratégico deseado es:

```txt
Lead entra por WhatsApp / Instagram / web / SEO
        ↓
Respuesta estándar con enlace al funnel
        ↓
Landing de orientación Reboot
        ↓
Cuestionario breve, progresivo y cualificador
        ↓
Registro estructurado de respuestas
        ↓
Sesión one-to-one con el equipo docente/comercial
        ↓
Propuesta personalizada según encaje, presupuesto y objetivos
```

La landing debe actuar como una **antesala de admisión/orientación**, no como un escaparate de cursos.

El formulario debe tener una función parecida a una entrevista inicial:

- no interrogar en exceso,
- no parecer frío,
- no pedir datos sin sentido,
- no mostrar todo de golpe,
- no abrumar,
- sí obtener la información crítica para vender mejor.

---

## 5. Qué se quiere vender realmente

### 5.1. Producto base

El producto principal no es un curso suelto.

El producto principal es:

> **Un bootcamp o itinerario tecnológico personalizado, basado en contenidos online ya creados, acceso a plataforma y acompañamiento mediante mentorías premium one-to-one.**

La formulación comercial aproximada es:

> “Diseñamos tu ruta tecnológica según tu punto de partida, tus objetivos, tu disponibilidad y el nivel de acompañamiento que necesitas.”

### 5.2. Componentes del producto

La oferta puede combinar:

- cursos online ya creados,
- acceso flexible a plataforma,
- itinerario personalizado,
- mentorías one-to-one,
- acompañamiento pedagógico,
- orientación profesional/vital/laboral,
- seguimiento del avance,
- posible adaptación del paquete al presupuesto,
- posible reducción de mentorías si el presupuesto es menor,
- posible bootcamp más reducido si el presupuesto es muy bajo.

### 5.3. Oferta no necesariamente paquetizada

No existe por ahora la necesidad de enseñar un catálogo cerrado desde el primer contacto.

La oferta puede paquetizarse manualmente según el lead.

Si un lead necesita ver un catálogo, se le puede mostrar después.

Pero la landing no debe convertirse en una página de catálogo.

La landing debe cualificar y conducir a la sesión.

### 5.4. Duración

La duración no está fijada universalmente.

Dependerá del itinerario, del número de cursos, del nivel de acompañamiento, del objetivo del alumno y de su disponibilidad.

Por tanto, la landing no debe prometer una duración estándar cerrada salvo que se decida en una fase posterior.

---

## 6. Lógica económica y de pricing

### 6.1. Realidad de costes

La estructura de costes es favorable:

- muchos cursos ya están creados,
- el coste marginal de dar acceso a contenidos es muy bajo,
- el coste variable principal está en el acompañamiento humano,
- las mentorías pueden modularse,
- el equipo puede adaptar el paquete sin rehacer desde cero la formación.

Esto permite una lógica comercial flexible.

### 6.2. Valor ancla

El valor de referencia de la formación completa puede situarse en torno a:

```txt
Valor completo: 5.999 €
```

Este valor funciona como ancla de percepción de valor.

### 6.3. Precio frecuente con descuento/beca

La oferta habitual puede reducirse mediante descuento, beca comercial o ajuste promocional hasta aproximadamente:

```txt
Precio habitual ajustado: 2.999 €
```

Este precio parece ser el rango natural de venta para un paquete completo con acompañamiento relevante.

### 6.4. Modularidad por disposición a pagar

La propuesta puede adaptarse según presupuesto:

```txt
< 500 €
    → paquete muy reducido, bootcamp muy pelado, pocos cursos, poco o ningún acompañamiento.

500 € - 1.000 €
    → formación online más limitada, posiblemente sin mentorías o con acompañamiento mínimo.

1.000 € - 2.999 €
    → itinerario más completo, posibilidad de añadir mentorías según rango.

≈ 2.999 €
    → paquete completo habitual con plataforma + mentorías.

> 2.999 €
    → posibilidad de paquete premium, mayor acompañamiento, más personalización o extensión.
```

Esta segmentación no necesariamente debe mostrarse al usuario en la landing, pero sí debe informar la estrategia de cualificación.

### 6.5. Pregunta clave de disposición a pagar

Una de las preguntas estratégicas más importantes del funnel debe medir la disposición a invertir.

No debe formularse de forma cutre ni agresiva.

Debe presentarse como una pregunta sobre compromiso, inversión en uno mismo y nivel de acompañamiento deseado.

Ejemplos conceptuales de framing:

- “¿Qué inversión tienes prevista para este cambio profesional?”
- “¿Qué rango de inversión te planteas para apostar por tu desarrollo tecnológico?”
- “Para poder orientarte bien, necesitamos saber qué nivel de inversión estás contemplando.”
- “Según tu presupuesto, podemos proponerte una ruta más completa o una versión más ligera.”

La formulación exacta se decidirá en el documento de diseño del formulario.

### 6.6. Financiación y pago fraccionado

Existe posibilidad de fraccionar pagos.

Rangos mencionados:

- 4 pagos,
- 6 pagos,
- 12 pagos,
- otras fórmulas según caso.

Esto no significa que la landing deba vender financiación de forma prominente. Pero sí permite no perder leads que tienen disposición a pagar pero necesitan estructura de pagos.

### 6.7. Objetivo económico

El objetivo económico es maximizar captación de valor según disposición a pagar, sin perder leads que puedan convertirse mediante paquetes reducidos.

Dicho en términos de estrategia comercial:

> El funnel debe ayudar a discriminar cuánto valor puede capturarse de cada lead sin presentar un precio fijo prematuro que destruya conversión o deje dinero sobre la mesa.

---

## 7. Formación subvencionada: decisión estratégica

La decisión es clara:

> **No se deben mencionar cursos subvencionados en la landing como oferta activa.**

Los leads que solo buscan cursos gratuitos son el principal perfil no deseado.

No se quiere alimentar esa expectativa.

No se quiere que la landing parezca una puerta de entrada a formación gratuita.

No se quiere atraer tráfico de baja conversión basado en “gratis”.

Si una persona llega preguntando por cursos subvencionados, el flujo debe reconducirla hacia orientación y detectar si está abierta a una formación privada.

La estrategia es:

- no usar “subvencionado” como gancho,
- no vender “plazas gratis”,
- no prometer ayudas públicas,
- sí permitir detectar si la persona solo busca formación gratuita,
- cualificarla como lead de bajo encaje si no tiene disposición a pagar.

---

## 8. Público objetivo

### 8.1. Lead ideal primario

Los perfiles prioritarios son:

#### A. Personas que quieren cambiar de carrera

Personas que desean hacer un giro profesional hacia tecnología.

Pueden venir desde sectores no tecnológicos, empleos precarios, estudios incompletos o carreras que ya no les motivan.

Tienen alta afinidad con la narrativa de “reboot profesional”.

#### B. Profesionales senior que quieren reconvertirse

Personas con experiencia profesional que quieren actualizarse, pivotar o incorporar competencias tecnológicas.

Pueden tener más capacidad de pago y más claridad sobre el valor de una formación personalizada.

#### C. Personas desempleadas que buscan salida laboral

Personas que ven la tecnología como una vía de empleabilidad.

Pueden tener alta motivación, pero sensibilidad al precio.

Debe cualificarse su disposición a invertir y su expectativa realista.

#### D. Estudiantes jóvenes

Personas que todavía están en una etapa formativa y quieren aprender tecnología, programar o explorar salidas profesionales.

Pueden ser menores o mayores de edad.

En el caso de menores, se requiere considerar autorización familiar.

### 8.2. Leads secundarios

Pueden aceptarse otros perfiles, pero no son el foco principal:

- autónomos,
- empresarios,
- curiosos de tecnología,
- personas que quieren hacer un proyecto propio,
- personas interesadas en herramientas digitales,
- personas que ya trabajan en tecnología y quieren especializarse.

Estos perfiles pueden ser válidos si tienen disposición a pagar.

### 8.3. Menores de edad

Se acepta trabajar con menores de edad.

La estrategia debe contemplar que, si un lead es menor, puede necesitar:

- autorización de madre/padre/tutor,
- participación del tutor en la conversación,
- tratamiento comercial más cuidadoso,
- expectativas claras sobre modalidad, dedicación y responsabilidad.

La edad no debe ser un criterio automático de exclusión.

### 8.4. Idioma

La falta de español no es un criterio automático de exclusión.

Las formaciones pueden existir o adaptarse en inglés.

Por tanto:

- un lead con español básico puede seguir siendo válido,
- un lead internacional puede seguir siendo válido,
- el idioma debe recogerse como información de cualificación,
- no debe filtrarse por defecto a quien no sea español nativo.

### 8.5. Internacionales

La procedencia del lead no es una barrera estratégica.

Pueden llegar personas de:

- España,
- Europa,
- LATAM,
- África,
- Marruecos,
- Mauritania,
- Italia,
- otros países.

La ubicación puede ser útil para contexto, horario, idioma, moneda o situación de residencia, pero no debe ser un criterio de exclusión salvo que afecte a la operación o al pago.

### 8.6. Lead no deseado

El principal lead no deseado es:

> Persona que solo quiere cursos gratuitos y no tiene capacidad o disposición a pagar.

La exclusión no se basa principalmente en edad, país, idioma, nivel o situación profesional.

La exclusión se basa en la ausencia de disposición a invertir.

---

## 9. Canales de entrada

### 9.1. Canales principales

Los canales principales iniciales son:

- WhatsApp,
- Instagram.

El uso principal será manual o semimanual: el equipo recibe una consulta y responde con un mensaje estándar que deriva al funnel.

### 9.2. Canales secundarios

También pueden llegar leads desde:

- web actual de Reboot,
- página de cursos,
- SEO histórico,
- enlaces antiguos,
- recomendaciones,
- campañas futuras,
- otros canales sociales.

### 9.3. Función del enlace

El enlace no debe presentarse como “formulario de contacto”.

Debe presentarse como paso necesario para:

- valorar el encaje,
- entender la situación del lead,
- decidir si se le puede ayudar,
- preparar una sesión one-to-one útil.

### 9.4. Script conceptual de derivación

El mensaje de derivación por WhatsApp/Instagram debe transmitir algo como:

> “Genial, para poder orientarte bien y valorar si podemos ayudarte desde la academia, necesitamos que completes este cuestionario breve. Nos ayuda a entender tu punto de partida, tus objetivos y qué tipo de ruta tendría sentido para ti. Al final podrás reservar una sesión one-to-one con nuestro equipo para hablarlo en detalle.”

El copy exacto se definirá en un documento posterior, pero la intención queda fijada.

---

## 10. Una única landing universal

La decisión estratégica es:

> **Crear una única landing universal de cualificación.**

No se crearán landings separadas por curso en esta fase.

El motivo:

- los leads llegan con intenciones diversas,
- la oferta es personalizada,
- no se quiere vender un catálogo,
- el objetivo es cualificar, no segmentar en páginas separadas,
- una landing única simplifica operación,
- permite enviar siempre el mismo enlace desde WhatsApp/Instagram.

La landing debe poder absorber leads interesados en:

- full stack,
- programación desde cero,
- desarrollo móvil,
- IA,
- Python,
- data,
- automatización,
- e-commerce,
- cursos genéricos,
- acceso a academia,
- cambio profesional.

La segmentación ocurrirá dentro del cuestionario y en la llamada, no antes.

---

## 11. Posicionamiento comercial

### 11.1. Posicionamiento base

El posicionamiento debe girar alrededor de:

- orientación,
- cambio profesional,
- diseño de ruta,
- acompañamiento,
- personalización,
- academia,
- selección/encaje,
- Reboot como transformación vital y profesional.

No debe girar alrededor de:

- catálogo de cursos,
- descuentos agresivos,
- cursos gratis,
- promesas fáciles,
- empleo garantizado,
- venta directa de un curso único.

### 11.2. Concepto emocional

El concepto más potente es:

> **Empieza tu reboot profesional.**

O una variante más vital:

> **Empieza tu reboot profesional y vital.**

La palabra “reboot” permite conectar:

- marca,
- cambio de carrera,
- reinicio personal,
- tecnología,
- transformación,
- nueva etapa.

### 11.3. Tipo de sesión final

El nombre final no está cerrado.

Dirección preferida:

- vocacional,
- transformacional,
- one-to-one,
- orientación profesional,
- diagnóstico formativo,
- ruta personalizada.

Candidatos conceptuales:

- Sesión one-to-one de orientación Reboot.
- Diagnóstico formativo one-to-one.
- Sesión de orientación profesional Reboot.
- Sesión de diseño de ruta tecnológica.
- Sesión de Reboot Profesional.
- Conexión one-to-one para tu reboot profesional.

Decisión pendiente para documento posterior: naming final de la sesión.

### 11.4. Claim estratégico

El claim final no está cerrado, pero la dirección estratégica sí:

> Hacer un reboot de tu vida/carrera mediante una ruta tecnológica personalizada.

Candidatos a explorar:

- “Haz un reboot a tu carrera.”
- “Empieza tu reboot profesional.”
- “Diseña tu reboot profesional con Reboot Academy.”
- “Cuéntanos dónde estás y diseñamos contigo tu ruta tecnológica.”
- “Tu nueva etapa tecnológica empieza con una sesión one-to-one.”

---

## 12. Marca

### 12.1. Decisión de marca

La landing debe ser:

> **100% Reboot Academy.**

No debe parecer una landing de Skilland.

No debe parecer una landing de EduKami.

No debe parecer un experimento externo.

Debe sentirse como una extensión natural de Reboot Academy.

### 12.2. Fuente visual

El proyecto visual debe tomar como referencia la web actual de Reboot Academy.

En una fase posterior se podrán extraer:

- logo,
- colores,
- tipografías,
- tono visual,
- patrones de layout,
- componentes,
- iconografía,
- estilo de botones,
- estilo de secciones.

### 12.3. Relación con Google Stitch

La intención futura es usar Google Stitch para la propuesta visual.

Pero este documento no define el prompt ni el diseño.

La fase de diseño visual deberá documentarse aparte.

---

## 13. Oferta formativa disponible como base

### 13.1. La oferta existe, no parte de cero

Reboot/Skilland/EduKami ya cuenta con un inventario relevante de cursos y capacidades formativas.

Esto permite empaquetar itinerarios personalizados sin necesidad de crear cada formación desde cero.

### 13.2. Áreas disponibles

Entre las áreas visibles del catálogo aparecen:

- desarrollo web,
- programación,
- bases de datos,
- inteligencia artificial,
- machine learning,
- business intelligence,
- CMS/e-commerce,
- herramientas digitales,
- metodologías,
- comunicación,
- productividad,
- data analysis.

### 13.3. Cursos y skills que pueden alimentar itinerarios

Ejemplos relevantes del inventario:

- HTML,
- CSS,
- JavaScript,
- JavaScript Advanced,
- React,
- Node.js,
- Express.js,
- Symfony 6,
- Tailwind CSS,
- MySQL,
- MySQL 8.0 for Developers,
- MongoDB,
- Python,
- Advanced Python,
- Python for Data Analysis,
- Excel,
- Excel for Data Analysis,
- Google Sheets,
- Google Sheets for Data Analysis,
- Google Looker Studio,
- Foundations of Generative AI,
- Generative AI for Business Applications,
- Machine Learning,
- Deep Learning,
- WordPress,
- WooCommerce,
- PrestaShop,
- PrestaShop Advanced,
- Magento,
- n8n,
- Fast API,
- Kubernetes DevOps,
- Basic Development Tools.

Esta amplitud permite construir rutas como:

- Full Stack Web,
- Python + Data + IA,
- IA aplicada a negocio,
- automatización con herramientas digitales,
- web + e-commerce,
- frontend intensivo,
- backend básico,
- iniciación tecnológica desde cero,
- itinerarios para reconversión profesional.

### 13.4. Implicación estratégica

La landing no debe enseñar todo este catálogo.

Pero el equipo sí debe saber que el catálogo permite responder con flexibilidad a muchas intenciones del lead.

La landing debe recoger suficiente información para saber qué combinación podría tener sentido.

---

## 14. Desarrollo móvil

En los leads reales aparece interés por desarrollo de aplicaciones móviles.

Estrategia actual:

- no excluir automáticamente al lead,
- no prometer un bootcamp cerrado de mobile si no está definido,
- tratarlo como una intención que puede derivar en ruta personalizada,
- valorar si se puede construir una ruta con bases de programación, web, backend, APIs, interfaces y contenidos relacionados,
- decidir manualmente en llamada qué ofrecer.

La landing puede incluir “desarrollo de aplicaciones” como interés, pero el documento de implementación deberá decidir si se formula como:

- “desarrollo de aplicaciones”,
- “desarrollo móvil”,
- “apps y producto digital”,
- “no lo sé, necesito orientación”.

No se debe vender de forma cerrada algo que todavía no esté operativamente preparado.

---

## 15. Función comercial de la orientación

### 15.1. La orientación es producto de entrada

El primer producto que se vende psicológicamente no es el bootcamp.

El primer producto es:

> Una conversación útil para ordenar la situación del lead y ayudarle a entender qué ruta tiene sentido.

Esto reduce fricción.

Mucha gente no sabe exactamente qué quiere:

- quiere programar,
- quiere “entrar en tecnología”,
- quiere IA,
- quiere cambiar de vida,
- quiere ganar más,
- quiere estudiar algo con futuro,
- quiere una salida laboral,
- quiere saber si puede hacerlo.

La sesión one-to-one debe ser presentada como el espacio donde esa incertidumbre se convierte en plan.

### 15.2. Orientación con intencionalidad comercial

La orientación no es altruista ni neutra.

Tiene una función comercial clara:

- detectar necesidad,
- construir valor,
- adaptar propuesta,
- cualificar presupuesto,
- conducir a una oferta personalizada,
- cerrar venta si hay encaje.

Pero no debe sentirse como una llamada agresiva de ventas.

Debe sentirse como una entrevista de orientación/admisión.

### 15.3. Cualificación como admisión

El framing de “para saber si podemos ayudarte” es importante.

Convierte el formulario en algo más valioso:

- no es “dame tus datos”,
- es “vamos a valorar tu encaje”,
- no todo el mundo tiene por qué entrar,
- la academia cuida el fit,
- la sesión será más útil porque ya hay contexto.

---

## 16. Información estratégica que debe capturarse

Este documento no define todavía el formulario exacto, pero sí las dimensiones que debe capturar.

### 16.1. Identidad básica

Se necesitará saber quién es la persona:

- nombre,
- apellidos,
- email,
- teléfono/WhatsApp,
- país o lugar de residencia,
- posiblemente edad o rango de edad.

### 16.2. Motivación

Se debe entender por qué llega:

- cambio de carrera,
- aprender desde cero,
- mejorar perfil,
- encontrar empleo,
- reconvertirse,
- aplicar tecnología en su trabajo,
- crear un proyecto,
- explorar opciones.

### 16.3. Área de interés

Debe capturarse qué le atrae:

- programación,
- full stack,
- desarrollo web,
- desarrollo móvil/apps,
- IA,
- data,
- automatización,
- e-commerce,
- no lo sabe.

### 16.4. Nivel actual

Debe capturarse su punto de partida:

- cero absoluto,
- tutoriales/cursos sueltos,
- conocimientos básicos,
- experiencia previa,
- perfil técnico que quiere especializarse.

### 16.5. Disponibilidad

Debe capturarse cuánto puede dedicar:

- pocas horas,
- dedicación parcial,
- dedicación intensiva,
- disponibilidad variable.

### 16.6. Modalidad y acompañamiento

Debe entenderse si busca:

- online flexible,
- acompañamiento one-to-one,
- bootcamp más intensivo,
- itinerario autónomo,
- mentoría premium,
- formación presencial/híbrida si aplica.

### 16.7. Presupuesto / disposición a invertir

Debe capturarse de forma prioritaria.

Esta es una dimensión estratégica central.

Se quiere saber cuánto está dispuesta a invertir la persona en su cambio profesional/formativo.

Debe permitir separar:

- solo gratis,
- bajo presupuesto,
- presupuesto medio,
- presupuesto suficiente para paquete completo,
- presupuesto premium.

### 16.8. Urgencia

Debe capturarse cuándo quiere empezar:

- cuanto antes,
- este mes,
- próximos meses,
- más adelante,
- explorando.

### 16.9. Situaciones especiales

Debe capturarse si hay factores que afectan a la conversación:

- menor de edad,
- autorización familiar,
- idioma,
- ubicación internacional,
- disponibilidad horaria,
- necesidad de financiación,
- objetivo laboral urgente.

---

## 17. Leads gratuitos y baja cualificación

### 17.1. Principio rector

El lead que solo quiere cursos gratuitos no es prioritario.

No se debe invertir mucho tiempo manual en leads que no tienen ninguna disposición a pagar.

### 17.2. Tratamiento estratégico

El funnel debe detectar este perfil de forma clara y temprana, pero sin romper innecesariamente la experiencia.

Posibles tratamientos posteriores:

- clasificar como “free-only”,
- derivar a lista de espera si algún día hay formación subvencionada,
- no priorizar llamada,
- permitir llamada si estratégicamente interesa,
- responder manualmente con un mensaje estándar.

La decisión operativa exacta queda pendiente para el documento de implementación.

### 17.3. No contaminar el posicionamiento

La landing no debe dar la sensación de que existen plazas gratuitas si no existen.

Tampoco debe usar “beca” de manera que atraiga a perfiles que solo quieren gratis, salvo que se defina una estrategia comercial explícita.

---

## 18. Relación con ventas y cierre

### 18.1. La landing no cierra la venta

La venta se cerrará después, normalmente en una conversación one-to-one y con una propuesta personalizada.

La landing debe:

- preparar la conversación,
- aumentar la percepción de valor,
- filtrar ruido,
- obtener datos,
- provocar compromiso,
- facilitar agenda.

### 18.2. La llamada es el punto de conversión real

La sesión one-to-one debe ser el momento en el que se:

- valida motivación,
- profundiza en contexto,
- explica la metodología,
- recomienda una ruta,
- se presenta inversión,
- se manejan objeciones,
- se propone una estructura de pago,
- se decide siguiente paso.

### 18.3. El funnel debe ahorrar tiempo antes de la llamada

La llamada no debe empezar con:

> “Cuéntame, ¿qué estás buscando?”

Debe empezar con:

> “He visto que quieres cambiar de carrera, que te interesa IA/Data, que partes de cero, que puedes dedicar 10 horas a la semana y que contemplas invertir en tu formación si ves claro el plan. Vamos a ordenar la ruta.”

Ese es el valor operativo del funnel.

---

## 19. Narrativa para el lead

### 19.1. Estado emocional del lead

El lead puede llegar con:

- ilusión,
- ansiedad,
- incertidumbre,
- urgencia,
- confusión,
- miedo a no poder,
- sensación de estar tarde,
- ganas de cambiar de vida,
- presión económica,
- deseo de futuro.

La landing debe hablarle desde ahí.

### 19.2. Promesa emocional

La promesa emocional no es:

> “Compra un curso.”

La promesa emocional es:

> “No tienes que tenerlo todo claro. Cuéntanos dónde estás y te ayudamos a diseñar una ruta tecnológica realista para tu próximo paso.”

### 19.3. Promesa racional

La promesa racional es:

- orientación personalizada,
- rutas adaptadas,
- contenidos ya estructurados,
- acompañamiento humano,
- flexibilidad,
- posibilidad de ajustar el alcance al presupuesto,
- foco en objetivos reales.

### 19.4. Evitar humo

No se debe prometer:

- empleo garantizado,
- resultados inmediatos,
- que cualquiera será developer senior en tres meses,
- financiación pública inexistente,
- gratuidad,
- certificaciones no confirmadas,
- modalidades no disponibles.

---

## 20. Mensaje de derivación desde WhatsApp/Instagram

El documento posterior deberá producir copies exactos.

Pero estratégicamente el mensaje debe cumplir estas funciones:

1. agradecer el interés,
2. no entrar en una conversación larga todavía,
3. explicar que Reboot trabaja con orientación personalizada,
4. pedir que complete el cuestionario,
5. enmarcarlo como paso de admisión/orientación,
6. indicar que al final podrá reservar sesión,
7. reforzar que así la llamada será útil y adaptada.

### 20.1. Mensaje conceptual

```txt
¡Genial, gracias por escribirnos! 😊

Para poder orientarte bien y valorar si podemos ayudarte desde Reboot, trabajamos con un pequeño cuestionario inicial. Nos sirve para entender tu punto de partida, tus objetivos, tu disponibilidad y qué tipo de ruta tecnológica podría encajar contigo.

Complétalo aquí y al final podrás reservar una sesión one-to-one con nuestro equipo para hablarlo en detalle:

[LINK]
```

Este texto no es necesariamente el copy definitivo. Es una guía estratégica.

---

## 21. Principios estratégicos de la landing

Aunque el diseño se decidirá después, estos principios deben mantenerse.

### 21.1. No parecer un formulario burocrático

Debe sentirse como una conversación guiada.

### 21.2. No mostrar todos los campos de golpe

La experiencia debe evitar la sensación de formulario largo.

### 21.3. No vender catálogo

El usuario no debe llegar a una página de “elige curso”.

### 21.4. No hablar de subvenciones

No atraer leads gratuitos.

### 21.5. Sí hablar de orientación

La orientación es el puente entre el interés inicial y la venta.

### 21.6. Sí reforzar Reboot como marca de transformación

Reboot debe sentirse como una academia que acompaña cambios profesionales reales.

### 21.7. Sí capturar disposición a pagar

La cualificación económica es central.

### 21.8. Sí terminar en agenda

El objetivo final de conversión no es solo enviar el formulario: es agendar sesión.

---

## 22. Diferencia entre lead cualificado y no cualificado

### 22.1. Lead cualificado alto

Ejemplo:

- quiere cambiar de carrera,
- tiene motivación clara,
- está abierto a formación privada,
- puede invertir en su desarrollo,
- acepta pago fraccionado si hace falta,
- tiene disponibilidad suficiente,
- quiere empezar pronto,
- encaja con áreas disponibles.

### 22.2. Lead cualificado medio

Ejemplo:

- tiene interés real,
- no tiene claro el área,
- necesita orientación,
- tiene presupuesto limitado pero no cero,
- puede requerir paquete reducido,
- puede necesitar maduración.

### 22.3. Lead bajo

Ejemplo:

- solo busca cursos gratuitos,
- no tiene ninguna capacidad de pago,
- no quiere invertir,
- no tiene disponibilidad,
- solo está curioseando,
- no quiere hablar ni agendar.

### 22.4. Lead especial, no necesariamente bajo

Estos casos requieren tratamiento, pero no exclusión:

- menor de edad,
- internacional,
- español bajo,
- interés en mobile,
- nivel cero,
- desempleado,
- estudiante joven.

---

## 23. Riesgos estratégicos

### 23.1. Riesgo: parecer academia barata

Si el copy se centra en cursos, descuentos o gratuidad, la percepción baja.

Mitigación:

- hablar de ruta,
- hablar de acompañamiento,
- hablar de one-to-one,
- hablar de encaje,
- hablar de transformación.

### 23.2. Riesgo: atraer solo leads gratuitos

Si se menciona subvención o beca sin control, llegarán perfiles no rentables.

Mitigación:

- no mencionar cursos subvencionados,
- preguntar disposición a invertir,
- no prometer gratuidad.

### 23.3. Riesgo: fricción excesiva

Si el cuestionario es demasiado largo, bajará la conversión.

Mitigación:

- experiencia progresiva,
- preguntas esenciales,
- tono conversacional,
- explicar por qué se pregunta.

### 23.4. Riesgo: prometer oferta no cerrada

Si se prometen áreas que no están operativamente preparadas, puede haber problemas en llamada.

Mitigación:

- formular áreas como intereses,
- hablar de rutas personalizadas,
- no prometer bootcamps cerrados por cada área.

### 23.5. Riesgo: mezclar estrategia con implementación

Si se empieza a diseñar o programar antes de cerrar la lógica comercial, los agentes pueden construir algo bonito pero mal orientado.

Mitigación:

- este documento es estratégico,
- habrá documento posterior de implementación,
- los agentes no deben inferir detalles técnicos desde aquí.

### 23.6. Riesgo: perder el tono Reboot

Si la landing parece Skilland/EduKami o SaaS genérico, se rompe la continuidad de marca.

Mitigación:

- 100% Reboot visual,
- usar activos de Reboot,
- mantener narrativa de transformación.

---

## 24. No objetivos

Este proyecto, en su fase estratégica inicial, no pretende:

- crear una web nueva de Reboot,
- sustituir la web principal,
- montar un CRM completo,
- construir un catálogo público de cursos,
- vender cursos subvencionados,
- automatizar todo el proceso comercial,
- eliminar la llamada humana,
- crear un sistema de admisión complejo,
- crear múltiples landings por curso,
- cerrar pagos online directamente,
- crear un área privada de alumnos,
- resolver la estrategia completa de bootcamps de Reboot.

El objetivo es mucho más concreto:

> Ordenar y cualificar la entrada de leads orgánicos para convertir conversaciones dispersas en sesiones one-to-one con contexto y mayor probabilidad de venta.

---

## 25. Decisiones fijadas hasta ahora

### 25.1. Sobre el objetivo

- El funnel será de cualificación y orientación, no de venta directa.
- Debe procesar leads que ya están llegando por Reboot.
- Debe orientar hacia bootcamps/itinerarios privados personalizados.
- Debe servir para entender la situación vital, laboral y pedagógica del lead.

### 25.2. Sobre la oferta

- Producto principal: bootcamp/itinerario personalizado.
- Componentes: plataforma + cursos online + mentorías premium one-to-one.
- Duración: variable según itinerario.
- Catálogo cerrado: no necesario en landing.
- Precio ancla: 5.999 €.
- Precio habitual ajustado: 2.999 €.
- Posibles paquetes inferiores según presupuesto.
- Financiación/fraccionamiento: posible.

### 25.3. Sobre subvenciones

- No mencionar cursos subvencionados como oferta.
- Filtrar o clasificar a quienes solo buscan gratis.

### 25.4. Sobre público objetivo

- Personas que quieren cambiar de carrera.
- Profesionales senior que quieren reconvertirse.
- Personas desempleadas que buscan salida laboral.
- Estudiantes jóvenes.
- Menores aceptables con autorización/tutoría adecuada.
- Internacionales aceptables.
- Personas con poco español aceptables si pueden formarse en inglés.

### 25.5. Sobre canal

- Canal principal: WhatsApp e Instagram.
- Uso inicial: enviar link manualmente con mensaje estándar.
- Landing única universal.

### 25.6. Sobre marca

- 100% Reboot Academy.
- No mezclar visualmente con Skilland/EduKami.
- Referencia visual futura: web actual de Reboot.

### 25.7. Sobre posicionamiento

- Dirección preferida: “reboot profesional/vital”.
- Sesión final: orientación one-to-one / diagnóstico formativo / ruta tecnológica.
- Claim final pendiente.

---

## 26. Decisiones estratégicas pendientes

Estas decisiones siguen abiertas, pero pertenecen a estrategia, no a implementación técnica.

### 26.1. Naming exacto de la sesión

Pendiente decidir entre opciones como:

- Sesión de orientación Reboot.
- Sesión one-to-one de orientación.
- Diagnóstico formativo one-to-one.
- Sesión de diseño de ruta tecnológica.
- Sesión de Reboot Profesional.

### 26.2. Claim principal

Pendiente decidir claim final.

Dirección aprobada:

- reboot profesional,
- cambio de carrera,
- ruta tecnológica personalizada.

### 26.3. Nivel de exclusividad/admisión

Pendiente decidir cuánto se enfatiza que Reboot “acepta” o “valora” perfiles antes de admitirlos.

Opciones estratégicas:

- orientación abierta,
- admisión ligera,
- entrevista de encaje,
- diagnóstico sin sensación de filtro duro.

### 26.4. Tratamiento de leads “solo gratis”

Pendiente decidir si:

- se les deja agendar igualmente,
- se les deriva a lista de espera,
- se les responde con mensaje específico,
- se les bloquea la agenda,
- se les clasifica y se decide manualmente.

### 26.5. Rango de precios visible o invisible

Pendiente decidir si en la landing se menciona algo sobre inversión, financiación o rangos.

La estrategia actual favorece no mostrar precios fijos antes de la llamada, pero sí preguntar disposición a invertir.

### 26.6. Uso de la palabra “beca”

Pendiente decidir si se usa internamente, comercialmente o nunca en la landing.

Riesgo: puede atraer lead gratuito.

Beneficio: puede suavizar precio.

---

## 27. Preguntas estratégicas para la siguiente ronda

Antes del documento de implementación, todavía sería útil cerrar estas preguntas de estrategia fina:

1. ¿Quieres que el funnel suene más a “orientación” o más a “proceso de admisión”?
2. ¿Quieres que el lead perciba que puede ser rechazado si no hay encaje?
3. ¿Quieres usar la palabra “beca” o prefieres “descuento”, “plan ajustado” o no mencionar nada?
4. ¿Quieres que la disposición a pagar se pregunte de forma directa o más emocional?
5. ¿Quieres que los leads de bajo presupuesto también puedan agendar, o prefieres proteger la agenda?
6. ¿Quieres que el mensaje de WhatsApp diga “para saber si podemos aceptarte en la academia” o prefieres una versión menos selectiva?
7. ¿La sesión one-to-one será con “equipo docente”, “equipo de orientación”, “admisiones” o “equipo Reboot”?
8. ¿Qué palabra quieres evitar sí o sí: venta, comercial, admisión, entrevista, diagnóstico, beca, academia, bootcamp?
9. ¿Qué quieres que sienta el lead: ilusión, seriedad, exclusividad, cercanía, urgencia, confianza?
10. ¿Cuál es el principal peligro: perder leads por fricción o llenar agenda de leads sin dinero?

---

## 28. Guía para agentes de contexto

Este documento debe ser leído por cualquier agente antes de construir briefs, specs o prompts posteriores.

### 28.1. Lo que un agente sí puede extraer de este documento

- El problema de negocio.
- El objetivo estratégico.
- La naturaleza del funnel.
- El tipo de oferta.
- El perfil de lead ideal.
- La lógica comercial.
- Los riesgos.
- Las decisiones ya fijadas.
- Las decisiones pendientes.
- El tono estratégico deseado.

### 28.2. Lo que un agente no debe inferir todavía

- El stack técnico.
- La estructura exacta del formulario.
- El diseño visual.
- El schema de base de datos.
- El copy final.
- La lógica condicional final.
- La configuración de Cal.com.
- La integración con CRM.
- La estrategia de analytics.
- La arquitectura del repo.

### 28.3. Próximo documento recomendado

Después de este documento, crear:

```txt
02_product_and_implementation_context.md
```

Ese documento debería cerrar:

- preguntas exactas del formulario,
- estructura de la landing,
- experiencia UX,
- capturas de datos,
- tratamiento de leads no cualificados,
- Cal.com,
- Supabase,
- Vercel,
- repo,
- agentes,
- assets,
- prompt para Google Stitch,
- prompt para Codex/Claude Code.

---

## 29. Definición estratégica final

La definición final del proyecto en esta fase es:

> **Reboot Orientation Funnel es una puerta de entrada cualificada para leads orgánicos de Reboot Academy. Su función es convertir conversaciones dispersas de WhatsApp, Instagram y web en procesos ordenados de orientación one-to-one, capturando información clave sobre objetivos, nivel, disponibilidad, área de interés y disposición a invertir, para poder diseñar y vender itinerarios tecnológicos privados y personalizados basados en plataforma, contenidos online y mentorías.**

Frase resumida:

> **No vendemos un curso en la landing. Creamos el contexto para vender la ruta adecuada en la llamada.**

---

## 30. Mantra del proyecto

```txt
Lead caliente entra disperso.
Reboot no improvisa por WhatsApp.
Reboot lo orienta, lo cualifica y lo lleva a una sesión one-to-one.
La llamada no empieza desde cero.
La propuesta se adapta al objetivo, al nivel y a la disposición a pagar.
```

