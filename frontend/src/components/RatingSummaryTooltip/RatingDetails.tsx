import React from 'react';
import { ProgressBar, ProgressBarFill, RatingSummaryLabel, RatingSummaryLink, RatingSummaryPercentage } from './styles';

interface RatingDetailsProps {
  listingId: number;
  rating: number;
  percentage: number;
  numReviews: number;
}

const RatingDetails = (props: RatingDetailsProps) => {
  const { listingId, rating, percentage, numReviews } = props;
  return (
    <li>
      <RatingSummaryLink
        role={`rating-link-${rating}`}
        to={`/listings/public/${listingId}/review-summary/${rating}`}
        onClick={(e) => e.stopPropagation()}
      >
        <RatingSummaryLabel>{rating} Star</RatingSummaryLabel>
        <ProgressBar>
          <ProgressBarFill width={percentage}></ProgressBarFill>
        </ProgressBar>
        <RatingSummaryPercentage>{percentage}% <span>({numReviews} Reviews)</span></RatingSummaryPercentage>
      </RatingSummaryLink>
    </li>
  )
}

export default RatingDetails;
