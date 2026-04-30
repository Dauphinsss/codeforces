export interface Contest {
  id: string;
  name: string;
  phase: 'proximo' | 'pasado';
  startTime: string;
  duration: string;
  participants: number;
  format: 'Div. 1' | 'Div. 2' | 'Educational' | 'Global' | 'Gym';
}

export const contests: Contest[] = [
  { id: '1901', name: 'Codeforces Round 1901', phase: 'proximo', startTime: '2026-05-03 12:35 UTC', duration: '2 h', participants: 0, format: 'Div. 2' },
  { id: '1902', name: 'Educational Codeforces Round 181', phase: 'proximo', startTime: '2026-05-07 14:35 UTC', duration: '2 h 15 min', participants: 0, format: 'Educational' },
  { id: '1903', name: 'Codeforces Global Round 34', phase: 'proximo', startTime: '2026-05-12 13:05 UTC', duration: '2 h 30 min', participants: 0, format: 'Global' },
  { id: '1890', name: 'Codeforces Round 1890', phase: 'pasado', startTime: '2026-04-22 14:35 UTC', duration: '2 h', participants: 18420, format: 'Div. 1' },
  { id: '1889', name: 'Codeforces Round 1889', phase: 'pasado', startTime: '2026-04-18 12:35 UTC', duration: '2 h', participants: 23114, format: 'Div. 2' },
  { id: '1888', name: 'ICPC Practice Gym 2026-04', phase: 'pasado', startTime: '2026-04-10 10:00 UTC', duration: '5 h', participants: 840, format: 'Gym' },
  { id: '1887', name: 'Educational Codeforces Round 180', phase: 'pasado', startTime: '2026-04-04 14:35 UTC', duration: '2 h', participants: 19810, format: 'Educational' },
  { id: '1886', name: 'Codeforces Round 1886', phase: 'pasado', startTime: '2026-03-29 12:35 UTC', duration: '2 h', participants: 22041, format: 'Div. 2' },
  { id: '1885', name: 'Codeforces Global Round 33', phase: 'pasado', startTime: '2026-03-21 13:05 UTC', duration: '2 h 30 min', participants: 26210, format: 'Global' },
  { id: '1884', name: 'Codeforces Round 1884', phase: 'pasado', startTime: '2026-03-16 14:35 UTC', duration: '2 h', participants: 17190, format: 'Div. 1' },
  { id: '1883', name: 'Codeforces Round 1883', phase: 'pasado', startTime: '2026-03-09 12:35 UTC', duration: '2 h', participants: 24388, format: 'Div. 2' },
];
