# Mapeo WCAG 2.2 AA

Este documento mapea criterios cubiertos a implementaciones concretas. Las lineas pueden variar si se editan archivos, pero las referencias apuntan al bloque responsable.

| Criterio | Implementacion |
| --- | --- |
| 1.1.1 Non-text Content | `src/pages/profile/[handle].astro:21` avatar con `alt="Avatar de {handle}"`; `src/components/RatingChart.tsx:21` usa `role="img"` y `aria-label`; `src/components/RatingChart.tsx:29` agrega `figcaption`. |
| 1.3.1 Info and Relationships | `src/layouts/BaseLayout.astro:41` define `main`; `src/pages/contests.astro:16` usa tabla real de datos; `src/pages/contests.astro:17` agrega `caption`. |
| 1.4.3 Contrast Minimum | `src/styles/global.css:10` fija texto secundario en `#595959`; `src/styles/global.css:37` y `src/styles/global.css:48` definen alto contraste. |
| 1.4.4 Resize Text | `src/styles/global.css:5`, `src/styles/global.css:61`, `src/styles/global.css:65` y `src/styles/global.css:72` escalan la fuente; `src/components/PreferencesPanel.tsx:57` expone selector accesible. |
| 1.4.11 Non-text Contrast | `src/styles/global.css:113` define foco visible; `src/styles/global.css:156` define controles con borde; `src/components/DifficultyBadge.astro:11` combina color con texto numerico. |
| 2.1.1 Keyboard | `src/components/SubmitForm.tsx:38` usa `textarea` nativo; `src/components/ProblemFilters.tsx:37`, `src/components/ProblemFilters.tsx:44` y `src/components/ProblemFilters.tsx:51` usan campos nativos con label. |
| 2.4.1 Bypass Blocks | `src/components/SkipLink.astro:1` enlaza a `#main-content`; `src/layouts/BaseLayout.astro:41` define el destino. |
| 2.4.6 Headings and Labels | `src/pages/contests.astro:10` muestra `h1`; `src/components/AuthForm.tsx:29` y `src/components/AuthForm.tsx:48` usan labels visibles; `src/components/ProblemFilters.tsx:37` usa label de busqueda. |
| 2.4.7 Focus Visible | `src/styles/global.css:113` a `src/styles/global.css:119` aplican outline global de foco. |
| 2.5.5 Target Size Enhanced | `src/styles/global.css:156` a `src/styles/global.css:169` fijan `min-height` y `min-width` 44 px para `.btn`; links del header usan `min-h-11` en `src/components/Header.astro`. |
| 3.1.1 Language of Page | `src/layouts/BaseLayout.astro:16` declara `<html lang="es">`. |
| 3.3.1 Error Identification | `src/components/AuthForm.tsx:35` usa `aria-invalid`; `src/components/AuthForm.tsx:41` usa `role="alert"`. |
| 3.3.3 Error Suggestion | `src/components/SubmitForm.tsx:3` a `src/components/SubmitForm.tsx:7` definen errores accionables con que paso, donde y como corregirlo. |
| 4.1.2 Name, Role, Value | `src/components/PreferencesPanel.tsx:32` y `src/components/PreferencesPanel.tsx:44` nombran botones; `src/components/GlossaryTooltip.tsx:14` nombra el trigger; `src/components/SubmitForm.tsx:47` usa `role="status"` y `aria-live`. |

## Implementaciones por problema auditado

1. Objetivos tactiles pequenos: `.btn`, links de navegacion y campos tienen minimo 44 px.
2. Foco perdido: `global.css` aplica foco visible consistente.
3. Navegacion repetitiva: `SkipLink.astro` permite saltar directo al contenido.
4. Texto secundario demasiado claro: `--color-muted` no baja de `#595959` en modo claro.
5. Color como unica senal: dificultades incluyen color y numero; ver `DifficultyBadge.astro` y `ProblemFilters.tsx`.
6. Formularios ambiguos: `AuthForm.tsx` agrega instrucciones, ejemplos y labels persistentes.
7. Errores tecnicos crudos: `SubmitForm.tsx` muestra mensajes accionables y orientados al usuario.
8. Jargon sin ayuda: `GlossaryTooltip.tsx` se usa en `index.astro`, `enter.astro`, `profile/[handle].astro` y `contests.astro`.
9. Preferencias visuales ausentes: `PreferencesPanel.tsx` persiste tema, contraste y escala tipografica.
10. Grafico inaccesible: `RatingChart.tsx` agrega `aria-label` y `figcaption` con resumen.

## Auto-test aplicado

- `bun run build`: exitoso.
- Revision semantica manual: una `h1` por pagina, landmarks presentes, labels visibles.
- Revision de teclado manual por codigo: controles nativos, sin `div onClick`, textarea no intercepta Tab.
- Revision de contraste por tokens: texto normal y controles usan pares AA; alto contraste disponible.
