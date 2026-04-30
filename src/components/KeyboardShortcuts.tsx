import { useEffect } from 'react';

export default function KeyboardShortcuts() {
  useEffect(() => {
    let pendingG = false;
    let timer: number | undefined;

    const isTyping = (target: EventTarget | null) => {
      const element = target as HTMLElement | null;
      return element?.matches('input, textarea, select, [contenteditable="true"]') ?? false;
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey || isTyping(event.target)) return;

      if (event.key === '/') {
        const search = document.getElementById('problem-search') as HTMLInputElement | null;
        if (search) {
          event.preventDefault();
          search.focus();
        }
        return;
      }

      if (event.key.toLowerCase() === 'g') {
        pendingG = true;
        window.clearTimeout(timer);
        timer = window.setTimeout(() => {
          pendingG = false;
        }, 900);
        return;
      }

      if (pendingG && event.key.toLowerCase() === 'p') {
        event.preventDefault();
        window.location.href = '/problemset';
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  return null;
}
