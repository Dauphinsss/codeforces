import { Accessibility } from 'lucide-react';
import Shepherd, { type StepOptions } from 'shepherd.js';

type TourStep = {
  targets: string[];
  title: string;
  description: string;
};

const tourSteps: TourStep[] = [
  {
    targets: ['[data-tour="contrast-controls"]', '[data-tour="preferences-trigger"]', '[data-tour="site-header"]'],
    title: 'Bajo contraste',
    description: 'La interfaz usa tokens de color AA, modo oscuro y alto contraste para mejorar legibilidad. WCAG 1.4.3.',
  },
  {
    targets: ['[data-tour="primary-action"]', '[data-tour="tour-button"]'],
    title: 'Botones pequenos',
    description: 'Los controles interactivos mantienen un area minima de 44 x 44 px para reducir errores tactiles. WCAG 2.5.5.',
  },
  {
    targets: ['[data-tour="main-nav"]', '[data-tour="mobile-menu-button"]', '[data-tour="site-header"]'],
    title: 'Navegacion con teclado',
    description: 'La navegacion, menus, formularios y acciones usan elementos nativos operables con Tab, Enter y Space. WCAG 2.1.1.',
  },
  {
    targets: ['[data-tour="mobile-menu-button"]', '[data-tour="preferences-trigger"]', '[data-tour="brand"]'],
    title: 'Etiquetas accesibles',
    description: 'Los controles de icono y enlaces principales tienen nombre accesible con texto visible o aria-label. WCAG 4.1.2.',
  },
  {
    targets: ['[data-tour="brand"]'],
    title: 'Imagenes con alternativa',
    description: 'Los logos decorativos se ocultan a lectores de pantalla y el enlace conserva un nombre accesible claro. WCAG 1.1.1.',
  },
  {
    targets: ['[data-tour="form-errors"]', '[data-tour="submit-result"]', '[data-tour="auth-form"]'],
    title: 'Errores comprensibles',
    description: 'Los formularios y envios muestran mensajes accionables: que paso, donde paso y como corregirlo. WCAG 3.3.1.',
  },
  {
    targets: ['[data-tour="problem-card"]', '[data-tour="profile-tabs"]', '[data-tour="content-card"]'],
    title: 'Menos sobrecarga visual',
    description: 'La informacion se agrupa en tarjetas, tabs, badges y secciones escaneables para reducir carga cognitiva. WCAG 2.4.6.',
  },
  {
    targets: ['[data-tour="responsive-layout"]', '[data-tour="problem-filters"]', '[data-tour="main-content"]'],
    title: 'Layout estable',
    description: 'Los layouts usan contenedores fluidos, grid responsive y tablas con scroll controlado para soportar zoom. WCAG 1.4.4.',
  },
  {
    targets: ['[data-tour="focus-demo"]', '[data-tour="tour-button"]'],
    title: 'Foco visible',
    description: 'Todo elemento enfocable recibe un indicador de foco visible de alto contraste. WCAG 2.4.7.',
  },
  {
    targets: ['[data-tour="main-content"]'],
    title: 'Idioma definido',
    description: 'El documento declara lang="es" para que lectores de pantalla interpreten correctamente el contenido. WCAG 3.1.1.',
  },
];

function isVisible(element: Element) {
  const htmlElement = element as HTMLElement;
  const styles = window.getComputedStyle(htmlElement);
  return styles.display !== 'none' && styles.visibility !== 'hidden' && htmlElement.getClientRects().length > 0;
}

function resolveSteps(): StepOptions[] {
  const resolvedSteps = tourSteps
    .map((step) => {
      const selector = step.targets.find((target) => {
        const element = document.querySelector(target);
        return element ? isVisible(element) : false;
      });

      return selector ? { ...step, selector } : null;
    })
    .filter((step): step is TourStep & { selector: string } => step !== null);

  return resolvedSteps.map((step, index) => {
    const isFirst = index === 0;
    const isLast = index === resolvedSteps.length - 1;

    return {
      id: `accessibility-step-${index + 1}`,
      title: step.title,
      text: `<p>${step.description}</p><p class="accessibility-tour-progress">Paso ${index + 1} de ${resolvedSteps.length}</p>`,
      attachTo: { element: step.selector, on: 'bottom' },
      scrollTo: { behavior: 'smooth', block: 'center' },
      canClickTarget: false,
      modalOverlayOpeningPadding: 8,
      modalOverlayOpeningRadius: 10,
      classes: 'accessibility-shepherd-step',
      cancelIcon: {
        enabled: true,
        label: 'Cerrar tour de accesibilidad',
      },
      buttons: [
        {
          text: 'Atras',
          label: 'Ver mejora anterior',
          secondary: true,
          disabled: isFirst,
          action() {
            this.back();
          },
        },
        {
          text: isLast ? 'Finalizar' : 'Siguiente',
          label: isLast ? 'Finalizar tour de accesibilidad' : 'Ver siguiente mejora',
          action() {
            if (isLast) {
              this.complete();
              return;
            }

            this.next();
          },
        },
      ],
    };
  });
}

export default function AccessibilityTour() {
  const startTour = () => {
    const steps = resolveSteps();
    if (steps.length === 0) return;

    const tour = new Shepherd.Tour({
      tourName: 'mejoras-accesibilidad',
      useModalOverlay: true,
      keyboardNavigation: true,
      exitOnEsc: true,
      defaultStepOptions: {
        arrow: true,
        floatingUIOptions: {
          placement: 'bottom',
          middleware: [],
        },
      },
      steps,
    });

    void tour.start();
  };

  return (
    <button
      type="button"
      className="accessibility-tour-button"
      data-tour="tour-button"
      aria-label="Abrir tour de mejoras de accesibilidad"
      onClick={startTour}
    >
      <Accessibility aria-hidden="true" size={22} />
    </button>
  );
}
