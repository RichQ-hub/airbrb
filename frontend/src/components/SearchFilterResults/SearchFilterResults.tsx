import React from 'react';
import PublishedListingCard from '../PublishedListingCard';
import { FilterValues, ListingDetailAndStatus } from '../../schemas/schemas';

interface SearchFilterResultsProps {
  listings: ListingDetailAndStatus[];
  filters: FilterValues;
}

const SearchFilterResults = (props: SearchFilterResultsProps) => {
  const filteredListings = props.listings.map((listing, idx) => {
    const { id, title, thumbnail, price, address, reviews, avgRating, status } = listing;
    return (
      <PublishedListingCard
        key={idx}
        id={id}
        title={title}
        thumbnail={thumbnail}
        price={price}
        address={address}
        reviews={reviews}
        status={status}
        avgRatings={avgRating}
        filters={props.filters}
        />
    )
  });
  return (
    <div>
      { filteredListings }
    </div>
  )
}

export default SearchFilterResults;
