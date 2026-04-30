# Accessibleforces

Clon visual y funcional de Codeforces construido con Astro, React islands y Tailwind CSS, con correcciones explicitas de accesibilidad y ergonomia basadas en WCAG 2.2 AA.

## Setup inicial

```sh
bun astro add react tailwind --yes
bun add lucide-react clsx @radix-ui/react-tooltip @radix-ui/react-dialog @radix-ui/react-tabs @radix-ui/react-dropdown-menu
```

## Comandos

```sh
bun install
bun dev
bun run build
bun run preview
```

## Arbol relevante

```text
/
├── ACCESSIBILITY.md
├── README.md
├── astro.config.mjs
├── package.json
├── tailwind.config.mjs
├── tsconfig.json
└── src/
    ├── components/
    │   ├── AuthForm.tsx
    │   ├── DifficultyBadge.astro
    │   ├── Footer.astro
    │   ├── GlossaryTooltip.tsx
    │   ├── Header.astro
    │   ├── KeyboardShortcuts.tsx
    │   ├── PreferencesPanel.tsx
    │   ├── ProfileTabs.tsx
    │   ├── ProblemFilters.tsx
    │   ├── RatingChart.tsx
    │   ├── RecentSubmissions.astro
    │   ├── SkipLink.astro
    │   └── SubmitForm.tsx
    ├── data/
    │   ├── contests.ts
    │   ├── problems.ts
    │   ├── submissions.ts
    │   └── users.ts
    ├── layouts/BaseLayout.astro
    ├── pages/
    │   ├── 404.astro
    │   ├── contests.astro
    │   ├── enter.astro
    │   ├── index.astro
    │   ├── register.astro
    │   ├── submit.astro
    │   ├── problemset/index.astro
    │   ├── problemset/problem/[id].astro
    │   └── profile/[handle].astro
    ├── styles/global.css
    └── utils/accessibility.ts
└── public/
    ├── logo-claro.png
    └── logo-oscuro.png
```

## Decisiones de accesibilidad clave

1. Hit areas pequenos: todos los controles usan `min-height` y `min-width` de 44 px mediante `.btn`, links amplios y campos de formulario.
2. Foco invisible: `global.css` define `:focus-visible` con outline azul de alto contraste y offset.
3. Sin skip link: `SkipLink.astro` es el primer focusable y apunta a `#main-content`.
4. Idioma incorrecto: `BaseLayout.astro` declara `<html lang="es">`.
5. Contraste bajo: los tokens evitan grises claros; texto secundario usa `#595959` como minimo sobre blanco.
6. Zoom 200% fragil: layouts usan grid/flex responsivos, contenedores fluidos y tablas con scroll solo para datos tabulares.
7. Formularios con placeholders: `AuthForm.tsx` usa labels visibles, ayuda previa, `aria-describedby` y `aria-invalid`.
8. Errores tecnicos: `SubmitForm.tsx` traduce resultados mock a mensajes con que paso, donde y como corregirlo.
9. Jerga sin explicacion: `GlossaryTooltip.tsx` documenta `rating`, `handle` y `gym` con Radix Tooltip accesible.
10. Preferencias inexistentes: `PreferencesPanel.tsx` agrega modo oscuro, alto contraste y tamano de fuente persistidos en `localStorage`.

## Accesibilidad implementada

La interfaz se diseno para conservar el flujo familiar de Codeforces, pero corrigiendo barreras de IHC y WCAG 2.2 AA. El detalle completo esta en `ACCESSIBILITY.md`; este README resume lo aplicado.

- Navegacion por teclado: skip link, foco visible global, controles nativos y menu movil operable sin mouse.
- Objetivos tactiles: botones, links principales, tabs y controles mantienen un area minima de 44 x 44 px.
- Contraste y percepcion: tokens AA, modo oscuro real, modo alto contraste y logos separados para claro/oscuro.
- Memoria cognitiva: textos visibles junto a iconos, tabs en perfil, filtros por rangos claros y estados vacios con accion directa.
- Formularios: labels visibles, ayuda antes del campo, ejemplos, `aria-invalid`, `aria-describedby` y mensajes accionables.
- Problemset: filtros con chips de dificultad, boton real para limpiar filtros, conteo con `aria-live` y atajos opcionales visibles.
- Submit: editor como `textarea` accesible, estado de juzgado con `role="status"` y panel de envios recientes.
- Perfil: tabs `Resumen`, `Envios`, `Rating` y `Problemas resueltos` para reducir densidad visual.
- Header responsive: navbar a ancho completo, menu movil fullscreen y cambio visual de hamburguesa a X.
- Robustez semantica: landmarks HTML, una `h1` por pagina, tablas solo para datos y 404 personalizada con rutas de recuperacion.

## Checklist WCAG cubierto

- WCAG 1.1.1: textos alternativos en avatares y descripcion textual del grafico.
- WCAG 1.3.1: landmarks semanticos, headings ordenados y tablas solo para datos.
- WCAG 1.4.3 / 1.4.11: tokens de contraste AA y modo alto contraste.
- WCAG 1.4.4: escala por variable CSS y layout responsivo a zoom.
- WCAG 2.1.1: controles navegables por teclado, editor como `textarea`.
- WCAG 2.1.4: atajos de teclado opcionales documentados en pantalla y no obligatorios.
- WCAG 2.4.1: skip link.
- WCAG 2.4.6: labels y headings descriptivos.
- WCAG 2.4.7: foco visible global.
- WCAG 2.5.5: area tactil minima de 44 x 44 px.
- WCAG 3.1.1: documento en espanol.
- WCAG 3.3.1 / 3.3.3: errores inline accionables.
- WCAG 4.1.2: botones icon-only con `aria-label`, estados dinamicos con `aria-live`.

## Verificacion

```sh
bun run build
```

Resultado local: build exitoso, 43 paginas estaticas generadas.
