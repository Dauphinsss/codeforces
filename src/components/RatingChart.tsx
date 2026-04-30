import { useId } from 'react';
import type { RatingPoint } from '@/data/users';

interface Props {
  history: RatingPoint[];
  label: string;
}

export default function RatingChart({ history, label }: Props) {
  const gradientId = useId();
  const ratings = history.map((p) => p.rating);
  const min = Math.min(...ratings) - 80;
  const max = Math.max(...ratings) + 80;
  const width = 640;
  const height = 240;
  const padX = 40;
  const padY = 24;
  const innerW = width - padX * 2;
  const innerH = height - padY * 2;

  const xy = history.map((point, index) => {
    const x = padX + (history.length === 1 ? innerW / 2 : (index / (history.length - 1)) * innerW);
    const y = padY + innerH - ((point.rating - min) / (max - min)) * innerH;
    return { x, y, point };
  });

  const linePoints = xy.map((p) => `${p.x},${p.y}`).join(' ');
  const areaPath = xy.length > 0
    ? `M ${xy[0].x},${padY + innerH} L ${xy.map((p) => `${p.x},${p.y}`).join(' L ')} L ${xy[xy.length - 1].x},${padY + innerH} Z`
    : '';

  const gridSteps = 4;
  const gridLines = Array.from({ length: gridSteps + 1 }, (_, i) => {
    const value = min + ((max - min) * (gridSteps - i)) / gridSteps;
    return { y: padY + (innerH * i) / gridSteps, value: Math.round(value) };
  });

  return (
    <figure className="panel-elevated p-5">
      <figcaption className="mb-3 flex items-baseline justify-between gap-3">
        <span className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--color-muted)' }}>
          Historial de rating
        </span>
        <span className="text-sm" style={{ color: 'var(--color-muted-strong)' }}>{label}</span>
      </figcaption>
      <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label={label} className="h-auto w-full">
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.35" />
            <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0" />
          </linearGradient>
        </defs>

        {gridLines.map((line) => (
          <g key={line.y}>
            <line
              x1={padX}
              x2={width - padX}
              y1={line.y}
              y2={line.y}
              stroke="var(--color-border)"
              strokeDasharray="3 4"
              strokeWidth="1"
            />
            <text
              x={padX - 8}
              y={line.y + 4}
              textAnchor="end"
              fontSize="11"
              fill="var(--color-muted)"
            >
              {line.value}
            </text>
          </g>
        ))}

        {areaPath && <path d={areaPath} fill={`url(#${gradientId})`} />}
        <polyline
          points={linePoints}
          fill="none"
          stroke="var(--color-primary)"
          strokeWidth="2.5"
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {xy.map(({ x, y, point }) => (
          <g key={point.date}>
            <circle cx={x} cy={y} r="5" fill="var(--color-surface)" stroke="var(--color-primary)" strokeWidth="2.5" />
            <text x={x} y={height - 4} textAnchor="middle" fontSize="10" fill="var(--color-muted)">
              {point.date}
            </text>
          </g>
        ))}
      </svg>
    </figure>
  );
}
