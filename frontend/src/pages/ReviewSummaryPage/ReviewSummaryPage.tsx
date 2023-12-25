import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ListingsService from '../../api/ListingsService';
import { Review } from '../../schemas/schemas';
import { MainContent, TitleMain } from '../../styles/common';
import { SummaryHeader } from './styles';
import ReviewCard from '../../components/ReviewCard';

const ReviewSummaryPage = () => {
  const { listingId, rating } = useParams();

  const [listingName, setListingName] = useState<string>('');
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const details = await ListingsService.getListingsDetails(parseInt(listingId!, 10));
      const reviewsByRating = details.reviews.filter((review) => {
        return review.rating === parseInt(rating!, 10);
      });
      setListingName(details.title);
      setReviews(reviewsByRating);
    }
    fetchData();
  }, []);

  return (
    <MainContent>
      <TitleMain>Review Summary for {listingName}</TitleMain>
      <SummaryHeader>
        <p>{rating} Star Reviews</p>
        <p>{reviews.length} Reviews Found</p>
      </SummaryHeader>
      <ul>
        {reviews.map((review, idx) => {
          return (
            <ReviewCard
              key={idx}
              author={review.author}
              rating={review.rating}
              comment={review.comment}
            />
          )
        })}
      </ul>
    </MainContent>
  )
}

export default ReviewSummaryPage;
