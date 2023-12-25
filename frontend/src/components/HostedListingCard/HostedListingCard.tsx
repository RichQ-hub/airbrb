import React from 'react'
import { ListingMetadata, Review } from '../../schemas/schemas';
import {
  DeleteBtn,
  EditBtn,
  HostedCard,
  HostedFeaturesContainer,
  HostedHeader,
  HostedThumbnail,
  LiveBtn,
  NumReviews,
  PriceContainer,
  PropertyTagsContainer,
  PropertyType,
  RatingSection,
  ViewBookingsBtn
} from './styles';
import PropertyTag from '../PropertyTag';
import { calculateNumBeds } from '../../utils/calculateNumBeds';
import { Link } from 'react-router-dom';
import { calculateAvgRating } from '../../utils/calculateAvgRating';
import { Tooltip } from 'react-tooltip';
import useModal from '../../hooks/useModal';
import ConfirmationModal from '../ConfirmationModal';
import RatingSummaryTooltip from '../RatingSummaryTooltip';

interface HostedListingCardProps {
  listingId: number;
  title: string;
  thumbnail: string;
  price: number;
  metadata: ListingMetadata;
  reviews: Review[];
  published: boolean;
  handleUnpublishListing: (listingId: number) => void;
  toggleAvailabilityModal: (listingId: number | null) => void;
  handleDeleteListing: (listingId: number) => void;
}

const HostedListingCard = (props: HostedListingCardProps) => {
  const {
    listingId,
    title,
    thumbnail,
    price,
    metadata,
    reviews,
    published,
    handleUnpublishListing,
    toggleAvailabilityModal,
    handleDeleteListing
  } = props;

  const deleteListingConfirmation = useModal();

  return (
    <HostedCard>
      <HostedThumbnail src={thumbnail} alt='listing-thumbnail'/>
      {/* Header Section. */}
      <HostedHeader>
        <h2>{title}</h2>
        <HostedFeaturesContainer>
          <EditBtn className='hosted-listing-card__edit-btn' as={Link} to={`${listingId}/edit`}>
            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z"/></svg>
          </EditBtn>
          <DeleteBtn className='hosted-listing-card__delete-btn' onClick={() => deleteListingConfirmation.handleToggleModal(true)}>
            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z"/></svg>
          </DeleteBtn>
        </HostedFeaturesContainer>
      </HostedHeader>
      <Tooltip anchorSelect='.hosted-listing-card__edit-btn' place='top'>
        Edit Listing
      </Tooltip>
      <Tooltip anchorSelect='.hosted-listing-card__delete-btn' place='top'>
        Delete Listing
      </Tooltip>

      {/* Rating Section. */}
      <RatingSection>
        <RatingSummaryTooltip
          listingId={listingId}
          height='1rem'
          rating={calculateAvgRating(reviews)}
          reviews={reviews}
        />
        <NumReviews>{reviews.length} Reviews</NumReviews>
      </RatingSection>

      {/* Property Type Section */}
      <PropertyType>Property Type: <span>{metadata.propertyType}</span></PropertyType>

      {/* Property Tags Section. */}
      <PropertyTagsContainer>
        <PropertyTag>
          <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 640 512"><path d="M32 32c17.7 0 32 14.3 32 32V320H288V160c0-17.7 14.3-32 32-32H544c53 0 96 43 96 96V448c0 17.7-14.3 32-32 32s-32-14.3-32-32V416H352 320 64v32c0 17.7-14.3 32-32 32s-32-14.3-32-32V64C0 46.3 14.3 32 32 32zm144 96a80 80 0 1 1 0 160 80 80 0 1 1 0-160z"/></svg>
          {calculateNumBeds(metadata.bedrooms)} Beds
        </PropertyTag>
        <PropertyTag>
          <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M96 77.3c0-7.3 5.9-13.3 13.3-13.3c3.5 0 6.9 1.4 9.4 3.9l14.9 14.9C130 91.8 128 101.7 128 112c0 19.9 7.2 38 19.2 52c-5.3 9.2-4 21.1 3.8 29c9.4 9.4 24.6 9.4 33.9 0L289 89c9.4-9.4 9.4-24.6 0-33.9c-7.9-7.9-19.8-9.1-29-3.8C246 39.2 227.9 32 208 32c-10.3 0-20.2 2-29.2 5.5L163.9 22.6C149.4 8.1 129.7 0 109.3 0C66.6 0 32 34.6 32 77.3V256c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H96V77.3zM32 352v16c0 28.4 12.4 54 32 71.6V480c0 17.7 14.3 32 32 32s32-14.3 32-32V464H384v16c0 17.7 14.3 32 32 32s32-14.3 32-32V439.6c19.6-17.6 32-43.1 32-71.6V352H32z"/></svg>
          {metadata.numBathrooms} Bathrooms
        </PropertyTag>
      </PropertyTagsContainer>

      {/* Pricing Section. */}
      <PriceContainer>
        $ {price}/night
      </PriceContainer>

      {/* Booking Buttons */}
      <ViewBookingsBtn as={Link} live={true} to={`${listingId}/bookings`}>
        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M96 0C43 0 0 43 0 96V416c0 53 43 96 96 96H384h32c17.7 0 32-14.3 32-32s-14.3-32-32-32V384c17.7 0 32-14.3 32-32V32c0-17.7-14.3-32-32-32H384 96zm0 384H352v64H96c-17.7 0-32-14.3-32-32s14.3-32 32-32zm32-240c0-8.8 7.2-16 16-16H336c8.8 0 16 7.2 16 16s-7.2 16-16 16H144c-8.8 0-16-7.2-16-16zm16 48H336c8.8 0 16 7.2 16 16s-7.2 16-16 16H144c-8.8 0-16-7.2-16-16s7.2-16 16-16z"/></svg>
        View Bookings
      </ViewBookingsBtn>
      <LiveBtn live={published} onClick={async () => {
        if (published) {
          handleUnpublishListing(listingId);
        } else {
          toggleAvailabilityModal(listingId);
        }
      }}>
        {published
          ? <>
              <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M367.2 412.5L99.5 144.8C77.1 176.1 64 214.5 64 256c0 106 86 192 192 192c41.5 0 79.9-13.1 111.2-35.5zm45.3-45.3C434.9 335.9 448 297.5 448 256c0-106-86-192-192-192c-41.5 0-79.9 13.1-111.2 35.5L412.5 367.2zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z"/></svg>
              End Live Session
            </>
          : <>
              <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M192 32c0-17.7 14.3-32 32-32C383.1 0 512 128.9 512 288c0 17.7-14.3 32-32 32s-32-14.3-32-32C448 164.3 347.7 64 224 64c-17.7 0-32-14.3-32-32zM60.6 220.6L164.7 324.7l28.4-28.4c-.7-2.6-1.1-5.4-1.1-8.3c0-17.7 14.3-32 32-32s32 14.3 32 32s-14.3 32-32 32c-2.9 0-5.6-.4-8.3-1.1l-28.4 28.4L291.4 451.4c14.5 14.5 11.8 38.8-7.3 46.3C260.5 506.9 234.9 512 208 512C93.1 512 0 418.9 0 304c0-26.9 5.1-52.5 14.4-76.1c7.5-19 31.8-21.8 46.3-7.3zM224 96c106 0 192 86 192 192c0 17.7-14.3 32-32 32s-32-14.3-32-32c0-70.7-57.3-128-128-128c-17.7 0-32-14.3-32-32s14.3-32 32-32z"/></svg>
              Go Live
            </>
        }
      </LiveBtn>

      {/* Delete Listing Confirmation Modal */}
      {
        deleteListingConfirmation.open &&
        <ConfirmationModal
          title='Are you sure?'
          message='Are you sure you want to delete this listing?'
          handleToggleModal={deleteListingConfirmation.handleToggleModal}
          handleConfirm={() => handleDeleteListing(listingId)}
        />
      }
    </HostedCard>
  )
}

export default HostedListingCard;
