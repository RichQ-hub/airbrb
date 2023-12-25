import React from 'react';
import { ReviewAuthor, ReviewCardContainer, ReviewComment, ReviewHeader, ReviewRating } from './styles';
import StarRating from '../StarRating';

interface ReviewCardProps {
  author: string;
  rating: number;
  comment: string;
}

const ReviewCard = (props: ReviewCardProps) => {
  const { author, rating, comment } = props;
  return (
    <ReviewCardContainer>
      <ReviewHeader>
        <ReviewRating>
          <h3>Rating:</h3>
          <StarRating height='1rem' rating={rating} />
        </ReviewRating>
        <ReviewAuthor>{author}</ReviewAuthor>
      </ReviewHeader>
      <ReviewComment>{comment}</ReviewComment>
    </ReviewCardContainer>
  )
}

export default ReviewCard;
