import { act, fireEvent, render, screen } from '@testing-library/react';
import BookingRequestsCard from '../../components/BookingRequestsCard';
import React from 'react';

const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(today.getDate() + 1);

const booking = {
  token: 'token',
  bookingId: 123,
  dateRange: {
    start: today.toISOString(),
    end: tomorrow.toISOString()
  },
  totalPrice: 200,
  status: 'pending'
}

const noop = () => {
  // empty function
}

jest.mock('../../api/BookingService', () => ({
  ...jest.requireActual('../../api/BookingService'),
  acceptBooking: jest.fn(),
  declineBooking: jest.fn(),
}));

describe('Booking Request Card', () => {
  it('renders booking request card heading', () => {
    render(<BookingRequestsCard
              token={booking.token}
              bookingId={booking.bookingId}
              dateRange={booking.dateRange}
              totalPrice={booking.totalPrice}
              status={booking.status}
              handleBookingRequestsRespond={noop}
    />)
    expect(screen.getByRole('heading', { name: /booking: 123/i })).toBeInTheDocument();
  });

  it('renders respond buttons accept and deny', () => {
    render(<BookingRequestsCard
        token={booking.token}
        bookingId={booking.bookingId}
        dateRange={booking.dateRange}
        totalPrice={booking.totalPrice}
        status={booking.status}
        handleBookingRequestsRespond={noop}
    />)
    expect(screen.getByRole('button', { name: /accept/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /deny/i })).toBeInTheDocument()
  });

  it('renders booking request information from props', () => {
    render(<BookingRequestsCard
        token={booking.token}
        bookingId={booking.bookingId}
        dateRange={booking.dateRange}
        totalPrice={booking.totalPrice}
        status={booking.status}
        handleBookingRequestsRespond={noop}
    />)
    expect(screen.getByText(`Date: ${booking.dateRange.start.substring(0, 10)} - ${booking.dateRange.end.substring(0, 10)}`)).toBeInTheDocument();
    expect(screen.getByText(/price: \$200/i)).toBeInTheDocument();
    expect(screen.getByText(/pending/i)).toBeInTheDocument();
  });

  it('displays the booking duration which is calculated by the difference between the start and end date from props', () => {
    render(<BookingRequestsCard
        token={booking.token}
        bookingId={booking.bookingId}
        dateRange={booking.dateRange}
        totalPrice={booking.totalPrice}
        status={booking.status}
        handleBookingRequestsRespond={noop}
    />)
    // the duration should be one day when the start date is today and the end date is the next day
    expect(screen.getByText(/duration: 1 day/i)).toBeInTheDocument();
  });

  it('triggers respondToRequest event handler when the accept button is clicked', async () => {
    const respondToRequst = jest.fn(() => Promise.resolve());
    render(<BookingRequestsCard
        token={booking.token}
        bookingId={booking.bookingId}
        dateRange={booking.dateRange}
        totalPrice={booking.totalPrice}
        status={booking.status}
        handleBookingRequestsRespond={respondToRequst}
    />)
    const acceptBtn = screen.getByRole('button', { name: /accept/i });
    await act(async () => {
      fireEvent.click(acceptBtn);
    })
    expect(respondToRequst).toHaveBeenCalledTimes(1);
  })

  it('triggers respondToRequest event handler when the deny button is clicked', async () => {
    const respondToRequst = jest.fn(() => Promise.resolve());
    render(<BookingRequestsCard
        token={booking.token}
        bookingId={booking.bookingId}
        dateRange={booking.dateRange}
        totalPrice={booking.totalPrice}
        status={booking.status}
        handleBookingRequestsRespond={respondToRequst}
    />)
    const denyBtn = screen.getByRole('button', { name: /deny/i });
    await act(async () => {
      fireEvent.click(denyBtn);
    })
    expect(respondToRequst).toHaveBeenCalledTimes(1);
  })
})
