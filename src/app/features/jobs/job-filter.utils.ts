import type { JobSearchTarget } from '../../core/models/job.model';

const LOCATION_ALIASES: Record<string, string[]> = {
  bangalore: ['bangalore', 'banglore', 'bengaluru', 'blr'],
  hyderabad: ['hyderabad', 'hyd', 'secunderabad'],
  mumbai: ['mumbai', 'bombay'],
  delhi: ['delhi', 'new delhi', 'ncr'],
  pune: ['pune'],
  chennai: ['chennai', 'madras'],
  remote: ['remote', 'wfh', 'work from home'],
};

export function normalizeSearchText(value: string): string {
  return value.trim().toLowerCase().replace(/\s+/g, ' ');
}

export function extractCity(location: string): string {
  const normalized = normalizeSearchText(location);
  if (normalized === 'remote') {
    return 'remote';
  }
  return normalized.split(',')[0]?.trim() ?? normalized;
}

export function levenshteinDistance(a: string, b: string): number {
  if (a === b) {
    return 0;
  }

  if (a.length === 0) {
    return b.length;
  }

  if (b.length === 0) {
    return a.length;
  }

  const matrix = Array.from({ length: a.length + 1 }, () =>
    Array.from({ length: b.length + 1 }, () => 0),
  );

  for (let i = 0; i <= a.length; i++) {
    matrix[i][0] = i;
  }

  for (let j = 0; j <= b.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + cost,
      );
    }
  }

  return matrix[a.length][b.length];
}

function fuzzyIncludes(query: string, target: string, maxDistance = 2): boolean {
  if (!query || !target) {
    return false;
  }

  if (target.includes(query) || query.includes(target)) {
    return true;
  }

  if (query.length >= 3 && target.length >= 3) {
    return levenshteinDistance(query, target) <= maxDistance;
  }

  return false;
}

export function matchesLocationQuery(jobLocation: string, query: string): boolean {
  const normalizedQuery = normalizeSearchText(query);
  if (!normalizedQuery) {
    return true;
  }

  const normalizedLocation = normalizeSearchText(jobLocation);
  const city = extractCity(jobLocation);

  if (
    normalizedLocation.includes(normalizedQuery) ||
    city.includes(normalizedQuery) ||
    normalizedQuery.includes(city)
  ) {
    return true;
  }

  for (const [canonical, aliases] of Object.entries(LOCATION_ALIASES)) {
    const queryMatchesAlias = aliases.some(
      (alias) =>
        alias === normalizedQuery ||
        normalizedQuery.includes(alias) ||
        alias.includes(normalizedQuery),
    );

    if (!queryMatchesAlias) {
      continue;
    }

    if (
      city.includes(canonical) ||
      canonical.includes(city) ||
      fuzzyIncludes(normalizedQuery, city) ||
      fuzzyIncludes(normalizedQuery, canonical)
    ) {
      return true;
    }
  }

  return fuzzyIncludes(normalizedQuery, city);
}

export function matchesKeywordQuery(job: JobSearchTarget, keyword: string): boolean {
  const normalizedKeyword = normalizeSearchText(keyword);
  if (!normalizedKeyword) {
    return true;
  }

  const searchableText = normalizeSearchText(
    [job.title, job.company, ...job.skills].join(' '),
  );
  const words = searchableText.split(/\s+/);

  if (searchableText.includes(normalizedKeyword)) {
    return true;
  }

  const tokens = normalizedKeyword.split(' ').filter(Boolean);
  return tokens.every((token) => {
    if (searchableText.includes(token)) {
      return true;
    }

    return words.some(
      (word) =>
        word.startsWith(token) ||
        token.startsWith(word) ||
        fuzzyIncludes(token, word, 1),
    );
  });
}

export function parseSalaryLabelLakhs(label: string): { min: number; max: number } | null {
  const values = [...label.matchAll(/(\d+(?:\.\d+)?)\s*L/gi)].map((match) =>
    Number.parseFloat(match[1]),
  );

  if (values.length >= 2) {
    return {
      min: Math.min(values[0], values[1]),
      max: Math.max(values[0], values[1]),
    };
  }

  if (values.length === 1) {
    return { min: values[0], max: values[0] };
  }

  return null;
}

function getFilterSalaryBounds(range: string): { min: number; max: number } | null {
  switch (range) {
    case '0-10':
      return { min: 0, max: 10 };
    case '10-20':
      return { min: 10, max: 20 };
    case '20-30':
      return { min: 20, max: 30 };
    case '30+':
      return { min: 30, max: Number.POSITIVE_INFINITY };
    default:
      return null;
  }
}

function salaryRangesOverlap(jobMin: number, jobMax: number, filterMin: number, filterMax: number): boolean {
  return jobMin <= filterMax && jobMax >= filterMin;
}

export function matchesSalaryRangeQuery(job: JobSearchTarget, range: string): boolean {
  const filterBounds = getFilterSalaryBounds(range);
  if (!filterBounds) {
    return true;
  }

  const parsed = parseSalaryLabelLakhs(job.salaryLabel);
  const fallbackLakhs = job.salary / 100000;
  const minLakhs = parsed?.min ?? fallbackLakhs;
  const maxLakhs = parsed?.max ?? fallbackLakhs;

  return salaryRangesOverlap(
    minLakhs,
    maxLakhs,
    filterBounds.min,
    filterBounds.max,
  );
}

export function matchesEmploymentTypeQuery(
  job: JobSearchTarget & { type: string },
  employmentType: string,
): boolean {
  if (!employmentType) {
    return true;
  }

  if (job.type === employmentType) {
    return true;
  }

  if (employmentType === 'Remote') {
    return normalizeSearchText(job.location) === 'remote' || job.type === 'Remote';
  }

  return false;
}
