import React, { useContext, useEffect, useState } from 'react'
import { DatePickersContainer, MainContent, StyledDatePicker, TitleMain } from '../../styles/common';
import { useParams } from 'react-router';
import { Address, Booking, ListingDetail, Review } from '../../schemas/schemas';
import ListingsService from '../../api/ListingsService';
import {
  BookingSection,
  ContentSection,
  ListingSubheader,
  ListingSection,
  PropertyTagsContainer,
  PropertyAttribute,
  AmenitiesGrid,
  AmenityItem,
  BedroomsListContainer,
  BookingForm,
  PricingContainer,
  ReserveBtn,
  ReservationTitle,
  BookingsList,
  ReviewList,
  ReviewListHeader,
  CreateReviewButton,
  AvgRatingSection,
  AvailabilityDatesList
} from './styles';
import ImgCarousel from '../../components/ImgCarousel';
import PropertyTag from '../../components/PropertyTag';
import { calculateNumBeds } from '../../utils/calculateNumBeds';
import BedroomDetailCard from './BedroomDetailCard';
import dayjs, { Dayjs } from 'dayjs';
import { UserContext } from '../../context/UserContextProvider';
import BookingService from '../../api/BookingService';
import BookingDetailCard from './BookingDetailCard';
import { calculateTotalPrice } from '../../utils/calculateTotalPrice';
import ReviewCard from '../../components/ReviewCard';
import { calculateAvgRating } from '../../utils/calculateAvgRating';
import ReviewModal from '../../components/ReviewModal';
import isBetween from 'dayjs/plugin/isBetween';
import RatingSummaryTooltip from '../../components/RatingSummaryTooltip';
import AvailabilityRangeCard from '../../components/AvailabilityRangeCard';
import { useSearchParams } from 'react-router-dom';

dayjs.extend(isBetween);

const AMENITY_ICONS = {
  Kitchen: <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M416 0C400 0 288 32 288 176V288c0 35.3 28.7 64 64 64h32V480c0 17.7 14.3 32 32 32s32-14.3 32-32V352 240 32c0-17.7-14.3-32-32-32zM64 16C64 7.8 57.9 1 49.7 .1S34.2 4.6 32.4 12.5L2.1 148.8C.7 155.1 0 161.5 0 167.9c0 45.9 35.1 83.6 80 87.7V480c0 17.7 14.3 32 32 32s32-14.3 32-32V255.6c44.9-4.1 80-41.8 80-87.7c0-6.4-.7-12.8-2.1-19.1L191.6 12.5c-1.8-8-9.3-13.3-17.4-12.4S160 7.8 160 16V150.2c0 5.4-4.4 9.8-9.8 9.8c-5.1 0-9.3-3.9-9.8-9L127.9 14.6C127.2 6.3 120.3 0 112 0s-15.2 6.3-15.9 14.6L83.7 151c-.5 5.1-4.7 9-9.8 9c-5.4 0-9.8-4.4-9.8-9.8V16zm48.3 152l-.3 0-.3 0 .3-.7 .3 .7z"/></svg>,
  Fireplace: <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 640 512"><path d="M293.5 3.8c19.7 17.8 38.2 37 55.5 57.7c7.9-9.9 16.8-20.7 26.5-29.5c5.6-5.1 14.4-5.1 20 0c24.7 22.7 45.6 52.7 60.4 81.1c14.5 28 24.2 58.8 24.2 79C480 280 408.7 352 320 352c-89.7 0-160-72.1-160-159.8c0-26.4 12.7-60.7 32.4-92.6c20-32.4 48.1-66.1 81.4-95.8c2.8-2.5 6.4-3.8 10-3.7c3.5 0 7 1.3 9.8 3.8zM370 273c30-21 38-63 20-96c-2-4-4-8-7-12l-36 42s-58-74-62-79c-30 37-45 58-45 82c0 49 36 78 81 78c18 0 34-5 49-15zM32 288c0-17.7 14.3-32 32-32H96c17.7 0 32 14.3 32 32s-14.3 32-32 32v64H544V320c-17.7 0-32-14.3-32-32s14.3-32 32-32h32c17.7 0 32 14.3 32 32v96c17.7 0 32 14.3 32 32v64c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32V416c0-17.7 14.3-32 32-32V288zM320 480a32 32 0 1 0 0-64 32 32 0 1 0 0 64zm160-32a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zM192 480a32 32 0 1 0 0-64 32 32 0 1 0 0 64z"/></svg>,
  'Free Street Parking': <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M135.2 117.4L109.1 192H402.9l-26.1-74.6C372.3 104.6 360.2 96 346.6 96H165.4c-13.6 0-25.7 8.6-30.2 21.4zM39.6 196.8L74.8 96.3C88.3 57.8 124.6 32 165.4 32H346.6c40.8 0 77.1 25.8 90.6 64.3l35.2 100.5c23.2 9.6 39.6 32.5 39.6 59.2V400v48c0 17.7-14.3 32-32 32H448c-17.7 0-32-14.3-32-32V400H96v48c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32V400 256c0-26.7 16.4-49.6 39.6-59.2zM128 288a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm288 32a32 32 0 1 0 0-64 32 32 0 1 0 0 64z"/></svg>,
  'Wi-Fi': <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 640 512"><path d="M54.2 202.9C123.2 136.7 216.8 96 320 96s196.8 40.7 265.8 106.9c12.8 12.2 33 11.8 45.2-.9s11.8-33-.9-45.2C549.7 79.5 440.4 32 320 32S90.3 79.5 9.8 156.7C-2.9 169-3.3 189.2 8.9 202s32.5 13.2 45.2 .9zM320 256c56.8 0 108.6 21.1 148.2 56c13.3 11.7 33.5 10.4 45.2-2.8s10.4-33.5-2.8-45.2C459.8 219.2 393 192 320 192s-139.8 27.2-190.5 72c-13.3 11.7-14.5 31.9-2.8 45.2s31.9 14.5 45.2 2.8c39.5-34.9 91.3-56 148.2-56zm64 160a64 64 0 1 0 -128 0 64 64 0 1 0 128 0z"/></svg>,
  'Air Conditioning': <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M224 0c13.3 0 24 10.7 24 24V70.1l23-23c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-57 57v76.5l66.2-38.2 20.9-77.8c3.4-12.8 16.6-20.4 29.4-17s20.4 16.6 17 29.4L373 142.2l37.1-21.4c11.5-6.6 26.2-2.7 32.8 8.8s2.7 26.2-8.8 32.8L397 183.8l31.5 8.4c12.8 3.4 20.4 16.6 17 29.4s-16.6 20.4-29.4 17l-77.8-20.9L272 256l66.2 38.2 77.8-20.9c12.8-3.4 26 4.2 29.4 17s-4.2 26-17 29.4L397 328.2l37.1 21.4c11.5 6.6 15.4 21.3 8.8 32.8s-21.3 15.4-32.8 8.8L373 369.8l8.4 31.5c3.4 12.8-4.2 26-17 29.4s-26-4.2-29.4-17l-20.9-77.8L248 297.6v76.5l57 57c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-23-23V488c0 13.3-10.7 24-24 24s-24-10.7-24-24V441.9l-23 23c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l57-57V297.6l-66.2 38.2-20.9 77.8c-3.4 12.8-16.6 20.4-29.4 17s-20.4-16.6-17-29.4L75 369.8 37.9 391.2c-11.5 6.6-26.2 2.7-32.8-8.8s-2.7-26.2 8.8-32.8L51 328.2l-31.5-8.4c-12.8-3.4-20.4-16.6-17-29.4s16.6-20.4 29.4-17l77.8 20.9L176 256l-66.2-38.2L31.9 238.6c-12.8 3.4-26-4.2-29.4-17s4.2-26 17-29.4L51 183.8 13.9 162.4c-11.5-6.6-15.4-21.3-8.8-32.8s21.3-15.4 32.8-8.8L75 142.2l-8.4-31.5c-3.4-12.8 4.2-26 17-29.4s26 4.2 29.4 17l20.9 77.8L200 214.4V137.9L143 81c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l23 23V24c0-13.3 10.7-24 24-24z"/></svg>,
}

/**
 * Displays all relevant details for a specific listing, as well as allows a
 * user to make bookings and leave reviews.
 */
const ListingPage = () => {
  const user = useContext(UserContext);
  const { listingId } = useParams();
  const [searchParams] = useSearchParams();

  const [listingDetails, setListingDetails] = useState<ListingDetail>({} as ListingDetail);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [address, setAddress] = useState<Address>({} as Address);
  const [isOpenReviewModal, setIsOpenReviewModal] = useState<boolean>(false);

  const [startDate, setStartDate] = useState<Dayjs | null>(searchParams.get('startDate') ? dayjs(searchParams.get('startDate')) : dayjs().startOf('day'));
  const [endDate, setEndDate] = useState<Dayjs | null>(searchParams.get('endDate') ? dayjs(searchParams.get('endDate')) : dayjs().add(1, 'day'));

  /**
   * Fetches all the listing details from the server.
   */
  useEffect(() => {
    const fetchData = async () => {
      const details = await ListingsService.getListingsDetails(parseInt(listingId!, 10));
      setListingDetails(details);
      setReviews(details.reviews);
      setAddress(details.address);
    }
    fetchData();
  }, []);

  /**
   * Fetches all the bookings that the logged in user has made for this listing.
   */
  useEffect(() => {
    const fetchUserBookings = async () => {
      const allBookings = await BookingService.getAllBookings(user.token);
      const userBookings = allBookings.filter((book) => {
        return book.listingId === listingId && user.email === book.owner;
      })
      setBookings(userBookings);
    }
    fetchUserBookings();
  }, []);

  /**
   * Submits a new booking.
   */
  const handleSubmitBooking = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!startDate?.isValid() || !endDate?.isValid()) {
      alert('Please set valid dates.')
      return
    }

    const isValidBooking = listingDetails.availability.some((availabilityRange) => {
      return (
        (startDate.isBetween(dayjs(availabilityRange.start), dayjs(availabilityRange.end)) &&
        endDate.isBetween(dayjs(availabilityRange.start), dayjs(availabilityRange.end))) ||
        startDate.isSame(availabilityRange.start) ||
        endDate.isSame(availabilityRange.end)
      )
    });

    if (!isValidBooking) {
      alert('Booking is not within the availability date ranges for this listing.')
      return;
    }

    const dateRange = {
      start: startDate.toISOString(),
      end: endDate.toISOString(),
    }
    const totalPrice = calculateTotalPrice(dateRange, listingDetails.price);

    try {
      const newBookingId = await BookingService.createBooking(user.token, listingId!, {
        dateRange,
        totalPrice,
      });

      const newBookings = bookings.slice();
      newBookings.push({
        id: newBookingId,
        owner: user.email,
        dateRange,
        totalPrice,
        listingId: listingId!,
        status: 'pending'
      });
      setBookings(newBookings);
    } catch (e) {
      if (e instanceof Error) {
        alert(e.message);
      }
    }
  }

  /**
   * Deletes an existing booking.
   */
  const handleDeleteBooking = async (bookingId: number) => {
    await BookingService.deleteBooking(user.token, bookingId);

    const oldBookings = bookings.slice();
    const newBookings = oldBookings.filter((booking) => {
      return booking.id !== bookingId;
    });
    setBookings(newBookings);
  }

  /**
   * Adds a new review to the state.
   */
  const handleAddReview = (newReview: Review) => {
    const newReviews = reviews.slice();
    newReviews.push(newReview);
    setReviews(newReviews);
  }

  return (
    <MainContent>
      <TitleMain>{listingDetails.title}</TitleMain>
      <AvgRatingSection>
        <RatingSummaryTooltip
          listingId={parseInt(listingId!, 10)}
          height='1.2rem'
          rating={calculateAvgRating(reviews)}
          reviews={reviews}
        />
        <p><span>{calculateAvgRating(reviews)}</span>/5 Avg Rating</p>
      </AvgRatingSection>
      <ContentSection>
        {/* Listing Details Section */}
        <section>
          <ImgCarousel propertyImgs={[listingDetails.thumbnail, ...listingDetails.metadata?.propertyImages || []]} />
          {/* Overview Section */}
          <ListingSection>
            <ListingSubheader>Overview</ListingSubheader>
            <PropertyTagsContainer>
              <PropertyTag>
                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 640 512"><path d="M32 32c17.7 0 32 14.3 32 32V320H288V160c0-17.7 14.3-32 32-32H544c53 0 96 43 96 96V448c0 17.7-14.3 32-32 32s-32-14.3-32-32V416H352 320 64v32c0 17.7-14.3 32-32 32s-32-14.3-32-32V64C0 46.3 14.3 32 32 32zm144 96a80 80 0 1 1 0 160 80 80 0 1 1 0-160z"/></svg>
                {listingDetails.metadata?.bedrooms.length} Bedrooms
              </PropertyTag>
              <PropertyTag>
                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 640 512"><path d="M32 32c17.7 0 32 14.3 32 32V320H288V160c0-17.7 14.3-32 32-32H544c53 0 96 43 96 96V448c0 17.7-14.3 32-32 32s-32-14.3-32-32V416H352 320 64v32c0 17.7-14.3 32-32 32s-32-14.3-32-32V64C0 46.3 14.3 32 32 32zm144 96a80 80 0 1 1 0 160 80 80 0 1 1 0-160z"/></svg>
                {calculateNumBeds(listingDetails.metadata ? listingDetails.metadata.bedrooms : [])} Beds
              </PropertyTag>
              <PropertyTag>
                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M96 77.3c0-7.3 5.9-13.3 13.3-13.3c3.5 0 6.9 1.4 9.4 3.9l14.9 14.9C130 91.8 128 101.7 128 112c0 19.9 7.2 38 19.2 52c-5.3 9.2-4 21.1 3.8 29c9.4 9.4 24.6 9.4 33.9 0L289 89c9.4-9.4 9.4-24.6 0-33.9c-7.9-7.9-19.8-9.1-29-3.8C246 39.2 227.9 32 208 32c-10.3 0-20.2 2-29.2 5.5L163.9 22.6C149.4 8.1 129.7 0 109.3 0C66.6 0 32 34.6 32 77.3V256c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H96V77.3zM32 352v16c0 28.4 12.4 54 32 71.6V480c0 17.7 14.3 32 32 32s32-14.3 32-32V464H384v16c0 17.7 14.3 32 32 32s32-14.3 32-32V439.6c19.6-17.6 32-43.1 32-71.6V352H32z"/></svg>
                {listingDetails.metadata?.numBathrooms} Bathrooms
              </PropertyTag>
            </PropertyTagsContainer>
            <PropertyAttribute><em>Owner:</em>{listingDetails.owner}</PropertyAttribute>
            <PropertyAttribute>
              <em>Location:</em>
              {address.street}, {address.city}, {address.state}, {address.postcode}, {address.country}.
            </PropertyAttribute>
            <PropertyAttribute><em>Property Type:</em>{listingDetails.metadata?.propertyType}</PropertyAttribute>
          </ListingSection>

          {/* Amenities Section */}
          <ListingSection>
            <ListingSubheader>Amenities</ListingSubheader>
            <AmenitiesGrid>
              {listingDetails.metadata?.amenities.map((amenity, idx) => {
                return (
                  <AmenityItem key={idx}>
                    {AMENITY_ICONS[amenity]}
                    {amenity}
                  </AmenityItem>
                )
              })}
            </AmenitiesGrid>
          </ListingSection>

          {/* Bedroom Section */}
          <ListingSection>
            <ListingSubheader>Bedrooms</ListingSubheader>
            <BedroomsListContainer>
              {listingDetails.metadata?.bedrooms.map((bedroom, idx) => {
                return (
                  <BedroomDetailCard
                    key={idx}
                    bedroom={bedroom}
                    number={idx}
                  />
                )
              })}
            </BedroomsListContainer>
          </ListingSection>

          {/* Availability Dates Section */}
          <ListingSection>
            <ListingSubheader>Availability Dates</ListingSubheader>
            <AvailabilityDatesList>
              {listingDetails.availability?.map((dateRange, idx) => {
                return (
                  <AvailabilityRangeCard
                    key={idx}
                    dateRange={dateRange}
                  />
                )
              })}
            </AvailabilityDatesList>
          </ListingSection>

          {/* Reviews Section */}
          <ListingSection>
            <ListingSubheader>Reviews</ListingSubheader>
            <ReviewListHeader>
              <h3>{reviews.length} Reviews Found</h3>
              <CreateReviewButton
                type='button'
                disabled={user.email === listingDetails.owner}
                onClick={() => setIsOpenReviewModal(true)}
              >
                {user.email === listingDetails.owner ? 'You cannot leave a review on your own listing' : '+ Leave a Review'}
              </CreateReviewButton>
            </ReviewListHeader>
            <ReviewList>
              {reviews.map((review, idx) => {
                const { author, rating, comment } = review;
                return (
                  <ReviewCard
                    key={idx}
                    author={author}
                    rating={rating}
                    comment={comment}
                  />
                )
              })}
            </ReviewList>
          </ListingSection>
        </section>

        {/* Booking Section */}
        <BookingSection>
          <BookingForm onSubmit={handleSubmitBooking}>
            <h2>Booking Form</h2>
            <DatePickersContainer>
              <StyledDatePicker
                label='Check-In'
                format='DD/MM/YYYY'
                disablePast
                value={startDate}
                onChange={(newValue: Dayjs | null) => setStartDate(newValue)}
              />
              <StyledDatePicker
                label='Checkout'
                format='DD/MM/YYYY'
                value={endDate}
                minDate={startDate!.add(1, 'day')}
                onChange={(newValue: Dayjs | null) => setEndDate(newValue)}
              />
            </DatePickersContainer>
            <PricingContainer>
              <h3>Pricing</h3>
              {
                searchParams.get('startDate') && searchParams.get('endDate')
                  ? <p>$ {calculateTotalPrice({ start: searchParams.get('startDate')!, end: searchParams.get('endDate')! }, listingDetails.price)} / per stay</p>
                  : <p>$ {listingDetails.price} / night</p>
              }
            </PricingContainer>
            <PricingContainer>
              <h3>Duration</h3>
              <p>{endDate?.diff(startDate, 'day')} Days</p>
            </PricingContainer>
            <PricingContainer>
              <h3>Total</h3>
              <p>$ {calculateTotalPrice({ start: startDate!.toISOString(), end: endDate!.toISOString() }, listingDetails.price)}</p>
            </PricingContainer>
            <ReserveBtn type='submit' disabled={!user.token || user.email === listingDetails.owner}>Reserve</ReserveBtn>

            {/* User Reservations List */}
            <ReservationTitle>{user.email === listingDetails.owner ? 'You cannot make reservations on your own listing' : user.token ? 'Your Reservations' : 'Please login to make reservations' }</ReservationTitle>
            <BookingsList>
              {bookings.map((booking, idx) => {
                return (
                  <BookingDetailCard
                    key={idx}
                    bookingId={booking.id}
                    dateRange={booking.dateRange}
                    totalPrice={booking.totalPrice}
                    status={booking.status}
                    handleDeleteBooking={handleDeleteBooking}
                  />
                )
              })}
            </BookingsList>
          </BookingForm>
        </BookingSection>
      </ContentSection>

      {/* Create New Review Modal */}
      {
        isOpenReviewModal &&
        <ReviewModal
          listingId={listingId!}
          userBookings={bookings}
          handleAddReview={handleAddReview}
          handleCloseModal={() => setIsOpenReviewModal(false)}
        />
      }
    </MainContent>
  )
}

export default ListingPage;
