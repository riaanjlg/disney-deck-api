// utils/loose-match.ts
export function normalize(input: string): string {
  return input
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // strip accents (é -> e)
    .replace(/[^a-z0-9\s]/g, '') // strip punctuation
    .replace(/\b(the|a|an|of)\b/g, '') // drop filler words
    .replace(/\s+/g, ' ')
    .trim();
}

function levenshtein(a: string, b: string): number {
  const dp = Array.from({ length: a.length + 1 }, (_, i) => [i]);
  for (let j = 1; j <= b.length; j++) dp[0][j] = j;
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1),
      );
    }
  }
  return dp[a.length][b.length];
}

function similarity(a: string, b: string): number {
  const maxLen = Math.max(a.length, b.length);
  return maxLen === 0 ? 1 : 1 - levenshtein(a, b) / maxLen;
}

export function isLooseMatch(
  guess: string,
  actual: string,
  threshold = 0.8,
): boolean {
  const g = normalize(guess);
  const a = normalize(actual);
  if (!g || !a) return false;
  if (g === a) return true;

  // Whole-word match: "mickey" matches "mickey mouse"
  const actualWords = a.split(' ');
  const guessWords = g.split(' ');
  if (g.length >= 3 && guessWords.every((w) => actualWords.includes(w)))
    return true;

  // Typo tolerance on the full name, and on each word for single-word guesses
  if (similarity(g, a) >= threshold) return true;
  if (guessWords.length === 1 && g.length >= 4) {
    return actualWords.some((w) => similarity(g, w) >= threshold);
  }
  return false;
}
