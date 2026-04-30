import { useDeferredValue, useMemo, useState } from 'react';
import { Search, Filter, X } from 'lucide-react';
import clsx from 'clsx';
import type { Problem } from '@/data/problems';

interface Props {
  problems: Problem[];
  tags: string[];
}

const difficultyRanges = [
  { id: 'todos', label: 'Todas', min: 0, max: Infinity },
  { id: '800-1199', label: '800-1199', min: 800, max: 1199 },
  { id: '1200-1599', label: '1200-1599', min: 1200, max: 1599 },
  { id: '1600-1899', label: '1600-1899', min: 1600, max: 1899 },
  { id: '1900-2199', label: '1900-2199', min: 1900, max: 2199 },
  { id: '2200+', label: '2200+', min: 2200, max: Infinity },
];

function difficultyClass(difficulty: number) {
  if (difficulty < 1200) return 'difficulty-green';
  if (difficulty < 1600) return 'difficulty-blue';
  if (difficulty < 1900) return 'difficulty-purple';
  if (difficulty < 2200) return 'difficulty-orange';
  return 'difficulty-red';
}

export default function ProblemFilters({ problems, tags }: Props) {
  const [query, setQuery] = useState('');
  const [tag, setTag] = useState('todos');
  const [range, setRange] = useState('todos');
  const deferredQuery = useDeferredValue(query);

  const filtered = useMemo(() => problems.filter((problem) => {
    const selectedRange = difficultyRanges.find((item) => item.id === range) ?? difficultyRanges[0];
    const matchesQuery = `${problem.id} ${problem.title}`.toLowerCase().includes(deferredQuery.toLowerCase());
    const matchesTag = tag === 'todos' || problem.tags.includes(tag);
    const matchesDifficulty = problem.difficulty >= selectedRange.min && problem.difficulty <= selectedRange.max;
    return matchesQuery && matchesTag && matchesDifficulty;
  }), [deferredQuery, problems, range, tag]);

  const hasFilters = query !== '' || tag !== 'todos' || range !== 'todos';

  const clearFilters = () => {
    setQuery('');
    setTag('todos');
    setRange('todos');
  };

  return (
    <section aria-labelledby="problem-filter-title" className="space-y-5">
      <div className="panel-elevated p-5">
        <div className="flex items-center justify-between gap-3">
          <h2 id="problem-filter-title" className="flex items-center gap-2 text-lg font-bold">
            <Filter aria-hidden="true" size={18} />
            Filtrar problemas
          </h2>
          {hasFilters && (
            <button type="button" className="btn btn-ghost" onClick={clearFilters}>
              <X aria-hidden="true" size={16} />
              <span>Limpiar filtros</span>
            </button>
          )}
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-[1.6fr_1fr]">
          <label className="grid gap-1 text-sm font-bold">
            Buscar por titulo o id
            <span className="relative">
              <Search aria-hidden="true" className="text-muted pointer-events-none absolute left-3 top-1/2 -translate-y-1/2" size={18} />
              <input
                id="problem-search"
                className="input-base pl-10"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Ej: 100A o Team Queue"
              />
            </span>
          </label>
          <label className="grid gap-1 text-sm font-bold">
            Tag
            <select className="input-base" value={tag} onChange={(event) => setTag(event.target.value)}>
              <option value="todos">Todos los tags</option>
              {tags.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
          </label>
        </div>
        <fieldset className="mt-4 grid gap-2">
          <legend className="text-sm font-bold">Rango de dificultad</legend>
          <div className="flex flex-wrap gap-2">
            {difficultyRanges.map((item) => (
              <button
                key={item.id}
                type="button"
                className={clsx('btn btn-ghost !min-h-10', range === item.id && 'btn-primary')}
                onClick={() => setRange(item.id)}
                aria-pressed={range === item.id}
              >
                {item.label}
              </button>
            ))}
          </div>
        </fieldset>
        <p className="text-muted mt-3 text-xs">
          Atajos opcionales: presiona / para buscar, o g y luego p para volver a Problemset.
        </p>
      </div>

      <p role="status" aria-live="polite" className="text-muted-strong text-sm font-semibold">
        {filtered.length} problemas encontrados
        {hasFilters && <span> · filtros activos</span>}
      </p>

      <ul className="grid gap-3">
        {filtered.map((problem) => (
          <li key={problem.id}>
            <a
              href={`/problemset/problem/${problem.id}`}
              className="text-app panel panel-hover grid gap-3 p-4 no-underline md:grid-cols-[1fr_auto] md:items-center"
            >
              <div className="min-w-0">
                <div className="text-muted flex items-center gap-2 text-xs">
                  <span className="font-mono font-bold">#{problem.id}</span>
                  <span aria-hidden="true">·</span>
                  <span>{problem.solvedCount.toLocaleString('es')} resueltos</span>
                </div>
                <h3 className="mt-1 text-lg font-bold leading-tight">{problem.title}</h3>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {problem.tags.map((item) => <span key={item} className="chip">{item}</span>)}
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-3 md:flex-col md:items-end">
                <span className={clsx('chip', difficultyClass(problem.difficulty))} aria-label={`Dificultad ${problem.difficulty}`}>
                  <span aria-hidden="true" className="opacity-80">●</span>
                  {problem.difficulty}
                </span>
                <span className="text-primary text-sm font-semibold">
                  Resolver →
                </span>
              </div>
            </a>
          </li>
        ))}
        {filtered.length === 0 && (
          <li className="text-muted panel grid justify-items-center gap-3 p-8 text-center">
            <p>Ningun problema coincide con los filtros. Proba con otro tag, otro rango de dificultad o limpia los filtros.</p>
            <button type="button" className="btn btn-primary" onClick={clearFilters}>
              <X aria-hidden="true" size={16} />
              <span>Limpiar filtros</span>
            </button>
          </li>
        )}
      </ul>
    </section>
  );
}
