export type PageNumber = number | 'ellipsis-start' | 'ellipsis-end';

export interface PaginationRange {
  start: number;
  end: number;
  total: number;
}

export function getPaginationRange(
  page: number,
  pageSize: number,
  totalItems: number,
): PaginationRange {
  if (totalItems === 0) {
    return { start: 0, end: 0, total: 0 };
  }

  const safePage = Math.min(Math.max(1, page), Math.max(1, Math.ceil(totalItems / pageSize)));
  const start = (safePage - 1) * pageSize + 1;
  const end = Math.min(safePage * pageSize, totalItems);

  return { start, end, total: totalItems };
}

export function getVisiblePageNumbers(
  currentPage: number,
  totalPages: number,
  maxVisible = 5,
): PageNumber[] {
  if (totalPages <= 1) {
    return [1];
  }

  if (totalPages <= maxVisible + 2) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const pages: PageNumber[] = [1];
  const halfWindow = Math.floor((maxVisible - 2) / 2);
  let rangeStart = Math.max(2, currentPage - halfWindow);
  let rangeEnd = Math.min(totalPages - 1, currentPage + halfWindow);

  if (currentPage <= halfWindow + 1) {
    rangeEnd = maxVisible - 1;
  }

  if (currentPage >= totalPages - halfWindow) {
    rangeStart = totalPages - (maxVisible - 2);
  }

  if (rangeStart > 2) {
    pages.push('ellipsis-start');
  }

  for (let page = rangeStart; page <= rangeEnd; page += 1) {
    pages.push(page);
  }

  if (rangeEnd < totalPages - 1) {
    pages.push('ellipsis-end');
  }

  pages.push(totalPages);
  return pages;
}
