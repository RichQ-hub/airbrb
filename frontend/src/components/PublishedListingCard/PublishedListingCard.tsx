import React, { useContext } from 'react';
import { ListingInfoDiv, ListingThumbnail, ListingTitle, ListingReviews, PubishedListingCard, StatusDiv, TotalReviews, ListingPrice, ListingAddress } from './styles';
import BookingStatus from '../BookingStatus';
import { Address, FilterValues, Review } from '../../schemas/schemas';
import { UserContext } from '../../context/UserContextProvider';
import { useNavigate, useSearchParams, createSearchParams } from 'react-router-dom'
import RatingSummaryTooltip from '../RatingSummaryTooltip';

interface PublishedListingCardProps {
  id: number;
  title: string;
  thumbnail: string;
  price: number;
  address: Address;
  reviews: Review[];
  status: string;
  avgRatings: number;
  filters: FilterValues;
}

const PublishedListingCard = (props: PublishedListingCardProps) => {
  const { token } = useContext(UserContext);
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate();
  const navigateToListingPage = (id: number, filters: FilterValues) => {
    const params = createSearchParams({ startDate: filters.date.start, endDate: filters.date.end });
    setSearchParams(params);
    navigate(`${id}?${params}`);
  }
  const {
    id,
    title,
    thumbnail,
    price,
    address,
    reviews,
    status,
    avgRatings,
    filters
  } = props

  return (
    <PubishedListingCard className='published-listing-card' onClick={() => navigateToListingPage(id, filters)}>
        <ListingThumbnail src={thumbnail} alt={title}/>
        <ListingInfoDiv>
            <ListingTitle>{title}</ListingTitle>
            <ListingAddress>{address.street} {address.city}, {address.state}, {address.postcode}, {address.country}</ListingAddress>
            <ListingPrice>${price}</ListingPrice>
            <ListingReviews>
              <RatingSummaryTooltip
                listingId={id}
                height='1rem'
                rating={avgRatings}
                reviews={reviews}
              />
              <TotalReviews>{reviews.length} Reviews</TotalReviews>
            </ListingReviews>
            {token && status !== ''
              ? (
              <StatusDiv>
                Booking Status:
                <BookingStatus status={status}/>
              </StatusDiv>
                )
              : null}
        </ListingInfoDiv>
    </PubishedListingCard>
  )
}

export default PublishedListingCard;
