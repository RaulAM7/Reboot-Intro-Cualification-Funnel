# Reboot Orientation Funnel V1

## Entregado

- Portado de `claude_design_v1` a Next.js + TypeScript + Tailwind.
- Funnel de una pregunta por paso con progreso, validación y navegación.
- Scoring y resumen de lead desacoplados en librerías.
- Endpoint seguro para guardar en Supabase.
- Migración SQL para `orientation_leads`.
- Pantalla final con Cal.com inline embed oficial y fallback visual.

## QA ejecutada

- `npm install`
- `npm run build`
- `npm run lint`

## Pendiente externo al repo

- Configurar variables de entorno reales.
- Ejecutar migración en el proyecto Supabase real.
- Ajustar `calLink`/namespace si cambia la agenda final.
- Hacer deploy en Vercel con nombre de proyecto deseado.
