import {
  getPaginationRange,
  getVisiblePageNumbers,
} from './pagination.utils';

describe('pagination.utils', () => {
  describe('getPaginationRange', () => {
    it('returns zero range when there are no items', () => {
      expect(getPaginationRange(1, 6, 0)).toEqual({ start: 0, end: 0, total: 0 });
    });

    it('returns the correct range for the first page', () => {
      expect(getPaginationRange(1, 6, 12)).toEqual({ start: 1, end: 6, total: 12 });
    });

    it('returns the correct range for the last partial page', () => {
      expect(getPaginationRange(2, 6, 8)).toEqual({ start: 7, end: 8, total: 8 });
    });
  });

  describe('getVisiblePageNumbers', () => {
    it('returns all pages when the total is small', () => {
      expect(getVisiblePageNumbers(1, 4)).toEqual([1, 2, 3, 4]);
    });

    it('includes ellipsis markers for large page counts', () => {
      expect(getVisiblePageNumbers(5, 10)).toEqual([
        1,
        'ellipsis-start',
        4,
        5,
        6,
        'ellipsis-end',
        10,
      ]);
    });
  });
});
