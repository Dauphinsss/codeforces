export function difficultyClass(difficulty: number): string {
  if (difficulty < 1200) return 'difficulty-green';
  if (difficulty < 1600) return 'difficulty-blue';
  if (difficulty < 1900) return 'difficulty-purple';
  if (difficulty < 2200) return 'difficulty-orange';
  return 'difficulty-red';
}

export function difficultyLabel(difficulty: number): string {
  if (difficulty < 1200) return 'Facil';
  if (difficulty < 1600) return 'Medio';
  if (difficulty < 1900) return 'Avanzado';
  if (difficulty < 2200) return 'Dificil';
  return 'Muy dificil';
}

export function verdictLabel(verdict: string): string {
  const labels: Record<string, string> = {
    AC: 'Aceptado',
    WA: 'Respuesta incorrecta',
    TLE: 'Tiempo limite excedido',
    RE: 'Error de ejecucion',
    CE: 'Error de compilacion',
  };
  return labels[verdict] ?? verdict;
}

export function verdictClass(verdict: string): string {
  switch (verdict) {
    case 'AC': return 'chip-success';
    case 'WA': return 'chip-danger';
    case 'TLE':
    case 'RE':
    case 'CE': return 'chip-warning';
    default: return '';
  }
}

export function rankClass(rank: string): string {
  const r = rank.toLowerCase();
  if (r.includes('legendary')) return 'rank-legendary';
  if (r.includes('international')) return 'rank-international';
  if (r.includes('master')) return 'rank-master';
  if (r.includes('candidate')) return 'rank-candidate';
  if (r.includes('expert')) return 'rank-expert';
  if (r.includes('pupil')) return 'rank-pupil';
  return 'rank-newbie';
}
