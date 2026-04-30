export type Verdict = 'AC' | 'WA' | 'TLE' | 'RE' | 'CE';

export interface Submission {
  id: number;
  problemId: string;
  handle: string;
  language: string;
  verdict: Verdict;
  submittedAt: string;
  time: string;
  memory: string;
}

export const submissions: Submission[] = [
  { id: 932001, problemId: '100A', handle: 'accessiblecoder', language: 'C++20', verdict: 'AC', submittedAt: '2026-04-29 18:10', time: '46 ms', memory: '120 KB' },
  { id: 932002, problemId: '107B', handle: 'accessiblecoder', language: 'Python 3', verdict: 'WA', submittedAt: '2026-04-29 18:24', time: '92 ms', memory: '3.4 MB' },
  { id: 932003, problemId: '110E', handle: 'newbie42', language: 'C++20', verdict: 'CE', submittedAt: '2026-04-29 19:01', time: '-', memory: '-' },
  { id: 932004, problemId: '122E', handle: 'jiangly', language: 'C++20', verdict: 'AC', submittedAt: '2026-04-29 19:30', time: '124 ms', memory: '512 KB' },
  { id: 932005, problemId: '129F', handle: 'tourist', language: 'C++20', verdict: 'TLE', submittedAt: '2026-04-30 08:42', time: '5000 ms', memory: '32 MB' },
  { id: 932006, problemId: '115D', handle: 'ecnerwala', language: 'Rust', verdict: 'RE', submittedAt: '2026-04-30 09:13', time: '62 ms', memory: '1.2 MB' },
];
