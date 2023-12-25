import React, { useState } from 'react';
import { AvgRatingContainer, RatingNumReviews, RatingSummaryContainer, StyledRatingTooltip } from './styles';
import { Review } from '../../schemas/schemas';
import StarRating from '../StarRating';
import RatingDetails from './RatingDetails';
import { calculateAvgRating } from '../../utils/calculateAvgRating';

interface RatingSummaryTooltipProps {
  listingId: number;
  height: string;
  rating: number;
  reviews: Review[];
}

const RatingSummaryTooltip = (props: RatingSummaryTooltipProps) => {
  const { listingId, height, rating, reviews } = props;

  const [hovered, setHovered] = useState<boolean>(false);

  const calculateRatingPercentage = (rating: number) => {
    const filteredReviews = reviews.filter((review) => {
      return review.rating === rating;
    });

    return Math.round(filteredReviews.length / reviews.length * 100);
  }

  const calculateNumReviewsOnRating = (rating: number) => {
    const filteredReviews = reviews.filter((review) => {
      return review.rating === rating;
    });

    return filteredReviews.length;
  }

  return (
    <RatingSummaryContainer
      role='rating-summary'
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <StarRating height={height} rating={rating} />
      {
        hovered &&
        <StyledRatingTooltip>
          <AvgRatingContainer>
            <StarRating height='1rem' rating={calculateAvgRating(reviews)} />
            <p>{calculateAvgRating(reviews)}/5 Avg Rating</p>
          </AvgRatingContainer>
          <RatingNumReviews>{reviews.length} Total Reviews</RatingNumReviews>
          <ul>
            {[...Array(5)].map((_, idx) => {
              const currRating = 5 - idx;
              return (
                <RatingDetails
                  key={idx}
                  listingId={listingId}
                  rating={currRating}
                  percentage={calculateRatingPercentage(currRating)}
                  numReviews={calculateNumReviewsOnRating(currRating)}
                />
              )
            })}
          </ul>
        </StyledRatingTooltip>
      }
    </RatingSummaryContainer>
  )
}

export default RatingSummaryTooltip;
