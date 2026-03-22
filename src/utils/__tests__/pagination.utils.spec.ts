import { describe, it, expect } from 'vitest';
import { getPaginator } from '../pagination.utils';

describe('getPaginator', () => {
  it('should calculate pagination for first page', () => {
    const result = getPaginator(10, 1, 100);
    
    expect(result.skip).toBe(0);
    expect(result.limit).toBe(10);
    expect(result.currentPage).toBe(1);
    expect(result.pages).toBe(10);
    expect(result.hasNextPage).toBe(true);
    expect(result.totalRecords).toBe(100);
    expect(result.pageSize).toBe(10);
  });

  it('should calculate pagination for middle page', () => {
    const result = getPaginator(10, 5, 100);
    
    expect(result.skip).toBe(40);
    expect(result.currentPage).toBe(5);
    expect(result.hasNextPage).toBe(true);
  });

  it('should calculate pagination for last page', () => {
    const result = getPaginator(10, 10, 100);
    
    expect(result.skip).toBe(90);
    expect(result.currentPage).toBe(10);
    expect(result.hasNextPage).toBe(false);
  });

  it('should handle default limit when not provided', () => {
    const result = getPaginator(0, 1, 50);
    
    expect(result.limit).toBe(10);
    expect(result.pageSize).toBe(10);
  });

  it('should handle invalid page number', () => {
    const result = getPaginator(10, 0, 100);
    
    expect(result.currentPage).toBe(1);
    expect(result.skip).toBe(0);
  });

  it('should handle empty results', () => {
    const result = getPaginator(10, 1, 0);
    
    expect(result.pages).toBe(0);
    expect(result.hasNextPage).toBe(false);
  });
});
