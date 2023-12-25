import { Review } from '../schemas/schemas';

/**
 * Calculates the avg rating (out of 5), accurate to 2 decimal places.
 * @param {Review[]} reviews
 */
export const calculateAvgRating = (reviews: Review[]) => {
  const totalRatings = reviews.reduce((accumulator, review) => {
    return accumulator + review.rating;
  }, 0);

  const avgRating = totalRatings / reviews.length;
  const avgRatingRounded = avgRating ? Math.round(avgRating * 1e2) / 1e2 : 0;

  return avgRatingRounded;
}
