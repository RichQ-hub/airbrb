import React from 'react';

/**
 * Calculates the duration between two dates
 * @param startDate
 * @param endDate
 * @returns no. of days
 */
export const calcDuration = (startDate: string, endDate: string) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const days = (end.getTime() - start.getTime()) / (1000 * 3600 * 24);
  return Math.floor(days);
}
