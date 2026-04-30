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
    │   ├── PreferencesPanel.tsx
    │   ├── ProblemFilters.tsx
    │   ├── RatingChart.tsx
    │   ├── SkipLink.astro
    │   └── SubmitForm.tsx
    ├── data/
    │   ├── contests.ts
    │   ├── problems.ts
    │   ├── submissions.ts
    │   └── users.ts
    ├── layouts/BaseLayout.astro
    ├── pages/
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
```

## Archivos modificados del template

- `C:\Users\markv\OneDrive\Escritorio\ihc\codeforces\astro.config.mjs`
- `C:\Users\markv\OneDrive\Escritorio\ihc\codeforces\tsconfig.json`
- `C:\Users\markv\OneDrive\Escritorio\ihc\codeforces\src\pages\index.astro`
- `C:\Users\markv\OneDrive\Escritorio\ihc\codeforces\src\styles\global.css`
- `C:\Users\markv\OneDrive\Escritorio\ihc\codeforces\README.md`

## Archivos creados

- `C:\Users\markv\OneDrive\Escritorio\ihc\codeforces\tailwind.config.mjs`
- `C:\Users\markv\OneDrive\Escritorio\ihc\codeforces\ACCESSIBILITY.md`
- `C:\Users\markv\OneDrive\Escritorio\ihc\codeforces\src\layouts\BaseLayout.astro`
- `C:\Users\markv\OneDrive\Escritorio\ihc\codeforces\src\components\*.astro`
- `C:\Users\markv\OneDrive\Escritorio\ihc\codeforces\src\components\*.tsx`
- `C:\Users\markv\OneDrive\Escritorio\ihc\codeforces\src\data\*.ts`
- `C:\Users\markv\OneDrive\Escritorio\ihc\codeforces\src\pages\enter.astro`
- `C:\Users\markv\OneDrive\Escritorio\ihc\codeforces\src\pages\register.astro`
- `C:\Users\markv\OneDrive\Escritorio\ihc\codeforces\src\pages\contests.astro`
- `C:\Users\markv\OneDrive\Escritorio\ihc\codeforces\src\pages\submit.astro`
- `C:\Users\markv\OneDrive\Escritorio\ihc\codeforces\src\pages\problemset\index.astro`
- `C:\Users\markv\OneDrive\Escritorio\ihc\codeforces\src\pages\problemset\problem\[id].astro`
- `C:\Users\markv\OneDrive\Escritorio\ihc\codeforces\src\pages\profile\[handle].astro`

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

## Checklist WCAG cubierto

- WCAG 1.1.1: textos alternativos en avatares y descripcion textual del grafico.
- WCAG 1.3.1: landmarks semanticos, headings ordenados y tablas solo para datos.
- WCAG 1.4.3 / 1.4.11: tokens de contraste AA y modo alto contraste.
- WCAG 1.4.4: escala por variable CSS y layout responsivo a zoom.
- WCAG 2.1.1: controles navegables por teclado, editor como `textarea`.
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

Resultado local: build exitoso, 42 paginas estaticas generadas.
