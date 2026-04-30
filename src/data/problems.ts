export interface ProblemExample {
  input: string;
  output: string;
}

export interface Problem {
  id: string;
  title: string;
  tags: string[];
  difficulty: number;
  solvedCount: number;
  timeLimit: string;
  memoryLimit: string;
  statement: string[];
  examples: ProblemExample[];
}

const baseStatement = [
  'Dado un conjunto de datos de entrada, calcula la respuesta solicitada respetando los limites de tiempo y memoria.',
  'La primera linea contiene los parametros principales. Las siguientes lineas contienen los valores necesarios para resolver cada caso.',
  'Imprime una respuesta por caso de prueba. Si existen varias respuestas validas, puedes imprimir cualquiera.',
];

export const problems: Problem[] = [
  { id: '100A', title: 'Team Queue', tags: ['implementation', 'queues'], difficulty: 800, solvedCount: 28431, timeLimit: '1 s', memoryLimit: '256 MB', statement: baseStatement, examples: [{ input: '3\n1 2 3', output: '6' }] },
  { id: '101B', title: 'Contest Warmup', tags: ['math', 'greedy'], difficulty: 900, solvedCount: 19402, timeLimit: '1 s', memoryLimit: '256 MB', statement: baseStatement, examples: [{ input: '4\n1 3 5 7', output: '4' }] },
  { id: '102C', title: 'Balanced Prefixes', tags: ['strings', 'prefix sums'], difficulty: 1100, solvedCount: 15120, timeLimit: '2 s', memoryLimit: '256 MB', statement: baseStatement, examples: [{ input: '(()())', output: '3' }] },
  { id: '103D', title: 'Metro Signs', tags: ['graphs', 'bfs'], difficulty: 1200, solvedCount: 10013, timeLimit: '2 s', memoryLimit: '256 MB', statement: baseStatement, examples: [{ input: '4 3\n1 2\n2 3\n3 4', output: '3' }] },
  { id: '104E', title: 'Array Festival', tags: ['sortings', 'two pointers'], difficulty: 1300, solvedCount: 16873, timeLimit: '2 s', memoryLimit: '512 MB', statement: baseStatement, examples: [{ input: '5\n5 1 4 2 3', output: '1 2 3 4 5' }] },
  { id: '105F', title: 'Notebook Recovery', tags: ['hashing', 'strings'], difficulty: 1400, solvedCount: 8344, timeLimit: '2 s', memoryLimit: '256 MB', statement: baseStatement, examples: [{ input: 'abc\nbca', output: 'YES' }] },
  { id: '106A', title: 'Road Repair', tags: ['dsu', 'graphs'], difficulty: 1500, solvedCount: 7229, timeLimit: '2 s', memoryLimit: '256 MB', statement: baseStatement, examples: [{ input: '3 2\n1 2\n2 3', output: '0' }] },
  { id: '107B', title: 'Festival Seats', tags: ['binary search', 'greedy'], difficulty: 1600, solvedCount: 6210, timeLimit: '3 s', memoryLimit: '256 MB', statement: baseStatement, examples: [{ input: '4 10\n2 3 4 5', output: '2' }] },
  { id: '108C', title: 'Colorful Grid', tags: ['dp', 'combinatorics'], difficulty: 1700, solvedCount: 5301, timeLimit: '2 s', memoryLimit: '512 MB', statement: baseStatement, examples: [{ input: '2 3', output: '8' }] },
  { id: '109D', title: 'Archive Search', tags: ['data structures', 'sets'], difficulty: 1800, solvedCount: 4820, timeLimit: '2 s', memoryLimit: '256 MB', statement: baseStatement, examples: [{ input: '3\nadd 7\nfind 7\nfind 2', output: 'YES\nNO' }] },
  { id: '110E', title: 'Late Submission', tags: ['dp', 'probabilities'], difficulty: 1900, solvedCount: 3744, timeLimit: '3 s', memoryLimit: '512 MB', statement: baseStatement, examples: [{ input: '3 2', output: '0.750000' }] },
  { id: '111F', title: 'Rating Split', tags: ['constructive algorithms'], difficulty: 2000, solvedCount: 3311, timeLimit: '2 s', memoryLimit: '256 MB', statement: baseStatement, examples: [{ input: '5', output: '2 3' }] },
  { id: '112A', title: 'Graph Garden', tags: ['trees', 'dfs'], difficulty: 2100, solvedCount: 2920, timeLimit: '4 s', memoryLimit: '512 MB', statement: baseStatement, examples: [{ input: '4\n1 2\n1 3\n3 4', output: '3' }] },
  { id: '113B', title: 'Hidden Permutation', tags: ['math', 'interactive'], difficulty: 2200, solvedCount: 2108, timeLimit: '2 s', memoryLimit: '256 MB', statement: baseStatement, examples: [{ input: '4\n2 1 4 3', output: '2' }] },
  { id: '114C', title: 'Segment Painter', tags: ['lazy propagation', 'segment tree'], difficulty: 2300, solvedCount: 1876, timeLimit: '4 s', memoryLimit: '512 MB', statement: baseStatement, examples: [{ input: '5 2\n1 3\n2 5', output: '4' }] },
  { id: '115D', title: 'Cipher Walk', tags: ['graphs', 'shortest paths'], difficulty: 2400, solvedCount: 1522, timeLimit: '3 s', memoryLimit: '512 MB', statement: baseStatement, examples: [{ input: '3 3\n1 2 5\n2 3 4\n1 3 10', output: '9' }] },
  { id: '116E', title: 'Library Compression', tags: ['suffix array', 'strings'], difficulty: 2500, solvedCount: 1002, timeLimit: '5 s', memoryLimit: '512 MB', statement: baseStatement, examples: [{ input: 'banana', output: '3' }] },
  { id: '117F', title: 'Training Matrix', tags: ['matrices', 'dp'], difficulty: 2600, solvedCount: 811, timeLimit: '3 s', memoryLimit: '512 MB', statement: baseStatement, examples: [{ input: '2\n1 2\n3 4', output: '10' }] },
  { id: '118A', title: 'Code Review', tags: ['implementation'], difficulty: 800, solvedCount: 24789, timeLimit: '1 s', memoryLimit: '256 MB', statement: baseStatement, examples: [{ input: 'codeforces', output: 'c.d.f.r.c.s' }] },
  { id: '119B', title: 'Lunch Break', tags: ['greedy'], difficulty: 1000, solvedCount: 18921, timeLimit: '1 s', memoryLimit: '256 MB', statement: baseStatement, examples: [{ input: '3\n10 20 30', output: '20' }] },
  { id: '120C', title: 'Keyboard Paths', tags: ['strings', 'graphs'], difficulty: 1200, solvedCount: 13000, timeLimit: '2 s', memoryLimit: '256 MB', statement: baseStatement, examples: [{ input: 'qwe', output: '2' }] },
  { id: '121D', title: 'Pairing Points', tags: ['geometry', 'sortings'], difficulty: 1400, solvedCount: 9100, timeLimit: '2 s', memoryLimit: '256 MB', statement: baseStatement, examples: [{ input: '2\n0 0\n1 1', output: '1.414' }] },
  { id: '122E', title: 'Bitmask Lessons', tags: ['bitmasks', 'dp'], difficulty: 1600, solvedCount: 6452, timeLimit: '2 s', memoryLimit: '256 MB', statement: baseStatement, examples: [{ input: '3\n1 2 3', output: '7' }] },
  { id: '123F', title: 'Queue Reconstruction', tags: ['data structures'], difficulty: 1800, solvedCount: 5002, timeLimit: '3 s', memoryLimit: '512 MB', statement: baseStatement, examples: [{ input: '3\n0 1 1', output: '1 2 3' }] },
  { id: '124A', title: 'Clock Drift', tags: ['math'], difficulty: 900, solvedCount: 17201, timeLimit: '1 s', memoryLimit: '256 MB', statement: baseStatement, examples: [{ input: '12 45', output: '57' }] },
  { id: '125B', title: 'Packet Router', tags: ['graphs', 'dijkstra'], difficulty: 1900, solvedCount: 4020, timeLimit: '3 s', memoryLimit: '512 MB', statement: baseStatement, examples: [{ input: '3 2\n1 2 8\n2 3 1', output: '9' }] },
  { id: '126C', title: 'Modulo Market', tags: ['number theory'], difficulty: 1500, solvedCount: 7802, timeLimit: '2 s', memoryLimit: '256 MB', statement: baseStatement, examples: [{ input: '10 3', output: '1' }] },
  { id: '127D', title: 'Round Calendar', tags: ['brute force', 'dates'], difficulty: 1100, solvedCount: 11119, timeLimit: '1 s', memoryLimit: '256 MB', statement: baseStatement, examples: [{ input: '2026', output: '365' }] },
  { id: '128E', title: 'Tournament Tree', tags: ['trees', 'dp'], difficulty: 2100, solvedCount: 2655, timeLimit: '4 s', memoryLimit: '512 MB', statement: baseStatement, examples: [{ input: '7', output: '3' }] },
  { id: '129F', title: 'Final Boss', tags: ['flows', 'graphs'], difficulty: 2700, solvedCount: 420, timeLimit: '5 s', memoryLimit: '1024 MB', statement: baseStatement, examples: [{ input: '2 1\n1 2 5', output: '5' }] },
  { id: '130A', title: 'Starter Pack', tags: ['implementation', 'math'], difficulty: 800, solvedCount: 32111, timeLimit: '1 s', memoryLimit: '256 MB', statement: baseStatement, examples: [{ input: '2 2', output: '4' }] },
];

export const tags = Array.from(new Set(problems.flatMap((problem) => problem.tags))).sort();
