export interface RatingPoint {
  date: string;
  rating: number;
}

export interface UserProfile {
  handle: string;
  rank: string;
  rating: number;
  maxRating: number;
  contribution: number;
  friends: number;
  solved: number;
  avatar: string;
  ratingHistory: RatingPoint[];
}

export const users: UserProfile[] = [
  { handle: 'tourist', rank: 'legendary grandmaster', rating: 3821, maxRating: 3979, contribution: 189, friends: 54120, solved: 6420, avatar: '/favicon.svg', ratingHistory: [{ date: '2025-01', rating: 3600 }, { date: '2025-03', rating: 3710 }, { date: '2025-08', rating: 3860 }, { date: '2026-01', rating: 3795 }, { date: '2026-04', rating: 3821 }] },
  { handle: 'jiangly', rank: 'legendary grandmaster', rating: 3612, maxRating: 3750, contribution: 121, friends: 28200, solved: 5912, avatar: '/favicon.svg', ratingHistory: [{ date: '2025-01', rating: 3400 }, { date: '2025-04', rating: 3508 }, { date: '2025-09', rating: 3660 }, { date: '2026-02', rating: 3590 }, { date: '2026-04', rating: 3612 }] },
  { handle: 'ecnerwala', rank: 'international grandmaster', rating: 3090, maxRating: 3302, contribution: 87, friends: 14890, solved: 5101, avatar: '/favicon.svg', ratingHistory: [{ date: '2025-01', rating: 2950 }, { date: '2025-05', rating: 3050 }, { date: '2025-10', rating: 3200 }, { date: '2026-03', rating: 3090 }] },
  { handle: 'accessiblecoder', rank: 'candidate master', rating: 1842, maxRating: 1956, contribution: 34, friends: 420, solved: 934, avatar: '/favicon.svg', ratingHistory: [{ date: '2025-01', rating: 1430 }, { date: '2025-03', rating: 1560 }, { date: '2025-07', rating: 1714 }, { date: '2026-03', rating: 1956 }, { date: '2026-04', rating: 1842 }] },
  { handle: 'newbie42', rank: 'pupil', rating: 1210, maxRating: 1288, contribution: 8, friends: 61, solved: 188, avatar: '/favicon.svg', ratingHistory: [{ date: '2025-11', rating: 900 }, { date: '2026-01', rating: 1030 }, { date: '2026-02', rating: 1160 }, { date: '2026-04', rating: 1210 }] },
];
