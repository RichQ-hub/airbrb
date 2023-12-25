import dayjs from 'dayjs';
import { DateRange } from '../schemas/schemas';

/**
 * Calculates the total price for booking during a period of time.
 * @param {DateRange} dateRange Duration of stay.
 * @param {number} price Price per night.
 */
export const calculateTotalPrice = (dateRange: DateRange, price: number) => {
  const startDate = dayjs(dateRange.start);
  const endDate = dayjs(dateRange.end);
  const diff = endDate.diff(startDate, 'day');
  return Math.round(price * diff * 1e2) / 1e2
}
