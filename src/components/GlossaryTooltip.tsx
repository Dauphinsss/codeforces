import { useId } from 'react';
import * as Tooltip from '@radix-ui/react-tooltip';
import { HelpCircle } from 'lucide-react';

interface Props {
  term: string;
  description: string;
}

export default function GlossaryTooltip({ term, description }: Props) {
  const descId = useId();
  return (
    <Tooltip.Provider delayDuration={100}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <button
            className="btn align-middle"
            type="button"
            aria-describedby={descId}
          >
            <span>{term}</span>
            <HelpCircle aria-hidden="true" size={16} />
            <span className="sr-only"> (ver definicion)</span>
          </button>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            id={descId}
            className="max-w-xs rounded border p-3 text-sm shadow-lg"
            style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
            sideOffset={6}
          >
            {description}
            <Tooltip.Arrow style={{ fill: 'var(--color-surface)' }} />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}
