import React from 'react';
import { DateRange } from '../../schemas/schemas';
import {
  BookingCardItem,
  BookingCardLeftSection,
  BookingCardRightSection,
  BookingDate,
  BookingDeleteBtn,
  BookingStatus,
  BookingStatusTag,
  BookingTotalPrice
} from './styles';
import dayjs from 'dayjs';
import { Tooltip } from 'react-tooltip';
import ConfirmationModal from '../../components/ConfirmationModal';
import useModal from '../../hooks/useModal';

const STATUS_COLORS = {
  accepted: '#5AC051',
  pending: '#5177C0',
  declined: '#F03047',
}

interface BookingDetailCardProps {
  bookingId: number;
  dateRange: DateRange;
  totalPrice: number; // Per night.
  status: 'accepted' | 'pending' | 'declined';
  handleDeleteBooking: (bookingId: number) => void;
}

const BookingDetailCard = (props: BookingDetailCardProps) => {
  const {
    bookingId,
    dateRange,
    totalPrice,
    status,
    handleDeleteBooking
  } = props;

  const deleteBookingConfirmation = useModal();

  return (
    <BookingCardItem>
      <BookingCardLeftSection>
        <BookingDate>
          <em>Start Date:</em> {dayjs(dateRange.start).format('DD/MM/YYYY')}
        </BookingDate>
        <BookingDate>
          <em>End Date:</em> {dayjs(dateRange.end).format('DD/MM/YYYY')}
        </BookingDate>
        <BookingStatus>
          <em>Status:</em>
          <BookingStatusTag status={STATUS_COLORS[status]}>{status}</BookingStatusTag>
        </BookingStatus>
      </BookingCardLeftSection>
      <BookingCardRightSection>
        <BookingTotalPrice>
          <em>Total Price</em>
          <p>{totalPrice}</p>
        </BookingTotalPrice>
        <BookingDeleteBtn
          type='button'
          className='booking-delete-btn'
          onClick={() => deleteBookingConfirmation.handleToggleModal(true)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z"/></svg>
        </BookingDeleteBtn>
      </BookingCardRightSection>
      <Tooltip anchorSelect='.booking-delete-btn' place='bottom'>
        Delete Booking
      </Tooltip>

      {/* Booking Delete Confirmation Modal */}
      {
        deleteBookingConfirmation.open &&
        <ConfirmationModal
          title='Are you sure?'
          message='Are you sure you want to delete this booking?'
          handleToggleModal={deleteBookingConfirmation.handleToggleModal}
          handleConfirm={() => {
            handleDeleteBooking(bookingId);
          }}
        />
      }
    </BookingCardItem>
  )
}

export default BookingDetailCard;
