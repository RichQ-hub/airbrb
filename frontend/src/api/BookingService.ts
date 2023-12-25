import { Booking, BookingRequest } from '../schemas/schemas';
import BACKEND_URL from './BackendUrl';

const BASE_URL = `${BACKEND_URL}/bookings`;

const parseJSON = async (url: string, options: any) => {
  const response = await fetch(url, options);
  const data = await response.json();

  if (data.error) {
    throw new Error(data.error);
  }

  return data;
}

class BookingService {
  getAllBookings = async (token: string) => {
    const options = {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      }
    }
    const response = await parseJSON(`${BASE_URL}`, options);
    return response.bookings as Booking[];
  }

  createBooking = async (token: string, listingId: string, payload: BookingRequest) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    }

    const response = await parseJSON(`${BASE_URL}/new/${listingId}`, options);
    return response.bookingId;
  }

  acceptBooking = async (token: string, bookingId: number) => {
    const options = {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      }
    }

    const response = await parseJSON(`${BASE_URL}/accept/${bookingId}`, options);
    return response;
  }

  declineBooking = async (token: string, bookingId: number) => {
    const options = {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      }
    }

    const response = await parseJSON(`${BASE_URL}/decline/${bookingId}`, options);
    return response;
  }

  deleteBooking = async (token: string, bookingId: number) => {
    const options = {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      }
    }

    const response = await parseJSON(`${BASE_URL}/${bookingId}`, options);
    return response;
  }
}

export default new BookingService();
