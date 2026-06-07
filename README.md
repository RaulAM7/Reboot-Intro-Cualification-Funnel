# Reboot Orientation Funnel V1

Landing y funnel de orientación/admisión de Reboot Academy, portado desde `04_outputs/claude_design_v1/` a una app limpia con Next.js, TypeScript, Tailwind y persistencia en Supabase.

## Qué incluye

- Landing mobile-first con estética Reboot y CTA de entrada.
- Cuestionario tipo Typeform con una sola pregunta por pantalla.
- Barra de progreso, botón atrás, validación obligatoria y avance con `Enter` cuando aplica.
- Scoring simple de lead: `lead_score`, `lead_temperature`, `lead_tags`, `lead_summary`.
- Guardado final en Supabase vía endpoint servidor.
- Pantalla final con embed de Cal.com o placeholder on-brand si falta URL.
- Google Analytics opcional por variable de entorno.

## Stack

- Next.js 15 App Router
- React 19
- TypeScript
- Tailwind CSS
- Supabase JS

## Instalación

```bash
npm install
```

## Ejecución local

```bash
npm run dev
```

La app queda disponible en `http://localhost:3000`.

## Validación

```bash
npm run lint
npm run build
```

## Variables de entorno

Duplicar `.env.example` a `.env.local` y completar lo que corresponda:

```bash
NEXT_PUBLIC_CAL_COM_LINK=raul-artiles-mendoza-n5juut/orientacion-reboot
NEXT_PUBLIC_CAL_COM_NAMESPACE=orientacion-reboot
NEXT_PUBLIC_GA_MEASUREMENT_ID=
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
```

### Qué hace cada variable

- `NEXT_PUBLIC_CAL_COM_LINK`: `calLink` del embed inline de Cal.com. Si no existe, se muestra un placeholder visual.
- `NEXT_PUBLIC_CAL_COM_NAMESPACE`: namespace del embed de Cal.com. Si no se define, se deriva del slug final del `calLink`.
- `NEXT_PUBLIC_GA_MEASUREMENT_ID`: Measurement ID de Google Analytics. Si falta, no se carga tracking.
- `SUPABASE_URL`: URL del proyecto Supabase.
- `SUPABASE_SERVICE_ROLE_KEY`: clave server-side para insertar leads desde el endpoint. No debe exponerse al cliente.

## Supabase

La migración está en [supabase/migrations/20260607_create_orientation_leads.sql](/home/reboot/Escritorio/REBOOT_ACADEMY/Reboot-Intro-Cualification-Funnel/supabase/migrations/20260607_create_orientation_leads.sql).

### Tabla principal

- `orientation_leads`

Incluye:

- Campos estructurados por respuesta.
- `lead_score`, `lead_temperature`, `lead_tags`, `lead_summary`.
- `raw_answers` para snapshot completo.
- `metadata` para contexto técnico de la captura.

### Seguridad

- RLS activado.
- Sin lectura pública para `anon` ni `authenticated`.
- La inserción se hace en servidor con `SUPABASE_SERVICE_ROLE_KEY`.

### Comportamiento ante fallo

Si Supabase no responde o no está configurado:

- el usuario igualmente llega a la pantalla final;
- puede abrir la agenda de Cal.com;
- se muestra estado de error con botón de reintento.

## Deploy en Vercel

1. Importa el repo en Vercel.
2. Configura las cuatro variables de entorno.
3. Ejecuta la migración SQL en Supabase antes de producción.
4. Haz deploy.

Nombre recomendado de proyecto en Vercel: `sesion.evaluacion.reboot.academy`

Si ese subdominio `vercel.app` ya estuviera ocupado, usa una variante mínima y añade después un dominio personalizado si quieres mantener exactamente ese formato.

## Estructura relevante

- [src/components/funnel/OrientationFunnel.tsx](/home/reboot/Escritorio/REBOOT_ACADEMY/Reboot-Intro-Cualification-Funnel/src/components/funnel/OrientationFunnel.tsx): landing, flujo y pantalla final.
- [src/data/formSteps.ts](/home/reboot/Escritorio/REBOOT_ACADEMY/Reboot-Intro-Cualification-Funnel/src/data/formSteps.ts): definición de preguntas.
- [src/lib/leadScoring.ts](/home/reboot/Escritorio/REBOOT_ACADEMY/Reboot-Intro-Cualification-Funnel/src/lib/leadScoring.ts): scoring del lead.
- [src/lib/leadSummary.ts](/home/reboot/Escritorio/REBOOT_ACADEMY/Reboot-Intro-Cualification-Funnel/src/lib/leadSummary.ts): resumen interno.
- [src/app/api/orientation-leads/route.ts](/home/reboot/Escritorio/REBOOT_ACADEMY/Reboot-Intro-Cualification-Funnel/src/app/api/orientation-leads/route.ts): inserción segura en Supabase.

## Pendientes para V2

- Eventos analíticos más finos por paso y abandono.
- Integración con CRM o handoff operativo automático.
- Notificaciones internas y emails transaccionales.
- Panel interno de revisión de leads.
- Experimentación/A-B de copy y branching.

## Estado actual

- V1 funcional y compilando.
- Lista para deploy en Vercel.
- Supabase pendiente de conexión real vía variables de entorno y ejecución de migración.
- Cal.com ya integrado con el embed inline oficial; puede ajustarse por variables de entorno.
