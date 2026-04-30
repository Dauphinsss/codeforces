import { useDeferredValue, useMemo, useState } from 'react';
import { Search, Filter, X } from 'lucide-react';
import clsx from 'clsx';
import type { Problem } from '@/data/problems';

interface Props {
  problems: Problem[];
  tags: string[];
}

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
  const [maxDifficulty, setMaxDifficulty] = useState('todos');
  const deferredQuery = useDeferredValue(query);

  const filtered = useMemo(() => problems.filter((problem) => {
    const matchesQuery = `${problem.id} ${problem.title}`.toLowerCase().includes(deferredQuery.toLowerCase());
    const matchesTag = tag === 'todos' || problem.tags.includes(tag);
    const matchesDifficulty = maxDifficulty === 'todos' || problem.difficulty <= Number(maxDifficulty);
    return matchesQuery && matchesTag && matchesDifficulty;
  }), [deferredQuery, maxDifficulty, problems, tag]);

  const hasFilters = query !== '' || tag !== 'todos' || maxDifficulty !== 'todos';

  const clearFilters = () => {
    setQuery('');
    setTag('todos');
    setMaxDifficulty('todos');
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
        <div className="mt-4 grid gap-3 md:grid-cols-[1.6fr_1fr_1fr]">
          <label className="grid gap-1 text-sm font-bold">
            Buscar por titulo o id
            <span className="relative">
              <Search aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2" size={18} style={{ color: 'var(--color-muted)' }} />
              <input
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
          <label className="grid gap-1 text-sm font-bold">
            Dificultad maxima
            <select className="input-base" value={maxDifficulty} onChange={(event) => setMaxDifficulty(event.target.value)}>
              <option value="todos">Todas</option>
              <option value="1200">Hasta 1200 (facil)</option>
              <option value="1600">Hasta 1600 (medio)</option>
              <option value="2000">Hasta 2000 (avanzado)</option>
              <option value="2400">Hasta 2400 (dificil)</option>
            </select>
          </label>
        </div>
      </div>

      <p role="status" aria-live="polite" className="text-sm font-semibold" style={{ color: 'var(--color-muted-strong)' }}>
        {filtered.length} problemas encontrados
        {hasFilters && <span> · filtros activos</span>}
      </p>

      <ul className="grid gap-3">
        {filtered.map((problem) => (
          <li key={problem.id}>
            <a
              href={`/problemset/problem/${problem.id}`}
              className="panel panel-hover grid gap-3 p-4 no-underline md:grid-cols-[1fr_auto] md:items-center"
              style={{ color: 'var(--color-text)' }}
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--color-muted)' }}>
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
                <span className="text-sm font-semibold" style={{ color: 'var(--color-primary)' }}>
                  Resolver →
                </span>
              </div>
            </a>
          </li>
        ))}
        {filtered.length === 0 && (
          <li className="panel p-8 text-center" style={{ color: 'var(--color-muted)' }}>
            Ningun problema coincide con los filtros. Probaelos de nuevo o limpiá los filtros.
          </li>
        )}
      </ul>
    </section>
  );
}
