import { useRef, useState } from 'react';
import { CheckCircle2, AlertTriangle, Loader2, Send, X } from 'lucide-react';

type Outcome = { kind: 'judging' | 'success' | 'error'; message: string };

const friendlyErrors = [
  'Falta un punto y coma en la linea 5. Revisa la sentencia anterior a la llave de cierre y agrega ; al final.',
  'La solucion excedio el tiempo en el caso 8. Revisa los bucles anidados y busca una estrategia O(n log n).',
  'La respuesta del caso 3 no coincide. Verifica el manejo de bordes cuando n es igual a 1 y vuelve a probar el ejemplo minimo.',
];

const successMessage = 'Aceptado. Tu solucion paso todos los casos de prueba en menos del tiempo limite.';

export default function SubmitForm({ problemId = '100A' }: { problemId?: string }) {
  const [code, setCode] = useState('#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n  return 0;\n}\n');
  const [outcome, setOutcome] = useState<Outcome | null>(null);
  const timerRef = useRef<number | null>(null);
  const isJudging = outcome?.kind === 'judging';

  const Icon = outcome?.kind === 'success' ? CheckCircle2 : outcome?.kind === 'error' ? AlertTriangle : Loader2;
  const statusClass = outcome?.kind === 'success' ? 'status-success' : outcome?.kind === 'error' ? 'status-error' : 'status-message';

  return (
    <form
      className="panel-elevated grid gap-4 p-6"
      onSubmit={(event) => {
        event.preventDefault();
        if (isJudging) return;
        setOutcome({ kind: 'judging', message: 'Juzgando tu envio...' });
        timerRef.current = window.setTimeout(() => {
          const pickSuccess = code.length % 4 === 0;
          if (pickSuccess) {
            setOutcome({ kind: 'success', message: successMessage });
          } else {
            setOutcome({ kind: 'error', message: friendlyErrors[code.length % friendlyErrors.length] });
          }
        }, 600);
      }}
    >
      <div className="grid gap-3 md:grid-cols-2">
        <div className="grid gap-1.5">
          <label htmlFor="submit-problem" className="text-sm font-bold">Problema</label>
          <input id="submit-problem" className="input-base font-mono" defaultValue={problemId} />
        </div>
        <div className="grid gap-1.5">
          <label htmlFor="submit-language" className="text-sm font-bold">Lenguaje</label>
          <select id="submit-language" className="input-base">
            <option>C++20</option>
            <option>Python 3</option>
            <option>Rust</option>
            <option>Java 21</option>
          </select>
        </div>
      </div>

      <div className="grid gap-1.5">
        <label htmlFor="submit-code" className="text-sm font-bold">Codigo fuente</label>
        <p id="editor-help" className="text-muted text-xs">
          Pega o escribe tu solucion. Tab te lleva al siguiente campo.
        </p>
        <textarea
          id="submit-code"
          className="code-editor min-h-80 w-full rounded-md border p-3 font-mono text-sm leading-relaxed"
          value={code}
          onChange={(event) => setCode(event.target.value)}
          spellCheck={false}
          aria-describedby="editor-help"
        />
        <p className="text-muted text-right text-xs font-mono">
          {code.split('\n').length} lineas · {code.length} caracteres
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        <button className="btn btn-primary" type="submit" disabled={isJudging} aria-disabled={isJudging}>
          {isJudging ? <Loader2 aria-hidden="true" size={16} className="animate-spin" /> : <Send aria-hidden="true" size={16} />}
          <span>{isJudging ? 'Juzgando...' : 'Enviar solucion'}</span>
        </button>
        {isJudging && (
          <button
            className="btn"
            type="button"
            onClick={() => {
              if (timerRef.current !== null) window.clearTimeout(timerRef.current);
              timerRef.current = null;
              setOutcome({ kind: 'error', message: 'Envio cancelado. Puedes editar el codigo y volver a enviarlo cuando estes listo.' });
            }}
          >
            <X aria-hidden="true" size={16} />
            <span>Cancelar envio</span>
          </button>
        )}
      </div>

      {outcome && (
        <p
          role="status"
          aria-live="polite"
          className={`${statusClass} flex items-start gap-2 rounded-md border p-3 text-sm font-semibold`}
        >
          <Icon aria-hidden="true" size={18} className={outcome.kind === 'judging' ? 'mt-0.5 shrink-0 animate-spin' : 'mt-0.5 shrink-0'} />
          <span>{outcome.message}</span>
        </p>
      )}
    </form>
  );
}
