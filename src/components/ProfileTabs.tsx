import * as Tabs from '@radix-ui/react-tabs';
import { BarChart3, CheckCircle2, ClipboardList, Gauge } from 'lucide-react';
import RatingChart from '@/components/RatingChart';
import type { Submission } from '@/data/submissions';
import type { UserProfile } from '@/data/users';
import { verdictClass, verdictLabel } from '@/utils/accessibility';

interface Props {
  user: UserProfile;
  submissions: Submission[];
  chartLabel: string;
}

export default function ProfileTabs({ user, submissions, chartLabel }: Props) {
  const accepted = submissions.filter((submission) => submission.verdict === 'AC');

  return (
    <Tabs.Root defaultValue="resumen" className="grid gap-4">
      <Tabs.List className="panel flex flex-wrap gap-2 p-2" aria-label="Secciones del perfil">
        {[
          { value: 'resumen', label: 'Resumen', icon: Gauge },
          { value: 'envios', label: 'Envios', icon: ClipboardList },
          { value: 'rating', label: 'Rating', icon: BarChart3 },
          { value: 'resueltos', label: 'Problemas resueltos', icon: CheckCircle2 },
        ].map(({ value, label, icon: Icon }) => (
          <Tabs.Trigger key={value} value={value} className="btn btn-ghost tab-trigger">
            <Icon aria-hidden="true" size={17} />
            {label}
          </Tabs.Trigger>
        ))}
      </Tabs.List>

      <Tabs.Content value="resumen" className="grid gap-4">
        <dl className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div className="stat-card"><dt>Rating actual</dt><dd>{user.rating}</dd></div>
          <div className="stat-card"><dt>Max rating</dt><dd>{user.maxRating}</dd></div>
          <div className="stat-card"><dt>Resueltos</dt><dd>{user.solved.toLocaleString('es')}</dd></div>
          <div className="stat-card"><dt>Contribucion</dt><dd>{user.contribution > 0 ? `+${user.contribution}` : user.contribution}</dd></div>
        </dl>
      </Tabs.Content>

      <Tabs.Content value="envios">
        <section className="panel-elevated p-6" aria-labelledby="profile-submissions-title">
          <div className="flex items-center justify-between">
            <h2 id="profile-submissions-title" className="text-2xl">Envios recientes</h2>
            <span className="chip chip-soft">{submissions.length} envios</span>
          </div>
          {submissions.length === 0 ? (
            <p className="text-muted mt-4 text-sm">Sin envios registrados todavia para {user.handle}.</p>
          ) : (
            <ul className="mt-4 grid gap-3">
              {submissions.map((submission) => (
                <li key={submission.id} className="panel grid gap-3 p-4 md:grid-cols-[1fr_auto] md:items-center">
                  <div>
                    <h3 className="font-mono text-sm">#{submission.id}</h3>
                    <p className="mt-1">
                      <a className="font-semibold" href={`/problemset/problem/${submission.problemId}`}>{submission.problemId}</a>
                      <span className="mx-2" aria-hidden="true">/</span>
                      <span>{submission.language}</span>
                    </p>
                  </div>
                  <span className={`chip ${verdictClass(submission.verdict)}`}>{verdictLabel(submission.verdict)}</span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </Tabs.Content>

      <Tabs.Content value="rating">
        <RatingChart history={user.ratingHistory} label={chartLabel} />
      </Tabs.Content>

      <Tabs.Content value="resueltos">
        <section className="panel-elevated p-6" aria-labelledby="solved-title">
          <h2 id="solved-title" className="text-2xl">Problemas resueltos</h2>
          {accepted.length === 0 ? (
            <p className="text-muted mt-4 text-sm">Aun no hay aceptados recientes en el historial visible.</p>
          ) : (
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {accepted.map((submission) => (
                <li key={submission.id} className="panel p-4">
                  <a className="font-bold" href={`/problemset/problem/${submission.problemId}`}>{submission.problemId}</a>
                  <p className="text-muted mt-1 text-sm">{submission.language} · {submission.time}</p>
                </li>
              ))}
            </ul>
          )}
        </section>
      </Tabs.Content>
    </Tabs.Root>
  );
}
