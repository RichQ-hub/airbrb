import { Listing, ListingDetail, ListingFormRequest, PublishListingRequest, ReviewRequest } from '../schemas/schemas';
import BACKEND_URL from './BackendUrl';

const BASE_URL = `${BACKEND_URL}/listings`;

const parseJSON = async (url: string, options: any) => {
  const response = await fetch(url, options);
  const data = await response.json();

  if (data.error) {
    throw new Error(data.error);
  }

  return data;
}

class ListingsService {
  getAllListings = async () => {
    const options = {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
      }
    }

    const response = await parseJSON(`${BASE_URL}`, options);
    return response.listings as Listing[];
  }

  getListingsDetails = async (listingId: number) => {
    const options = {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
      }
    }
    const response = await parseJSON(`${BASE_URL}/${listingId}`, options);
    return response.listing as ListingDetail;
  }

  createListing = async (token: string, payload: ListingFormRequest) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    }

    const response = await parseJSON(`${BASE_URL}/new`, options);
    return response.listingId;
  }

  updateListing = async (token: string, listingId: number, payload: ListingFormRequest) => {
    const options = {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload)
    }

    await parseJSON(`${BASE_URL}/${listingId}`, options);
  }

  deleteListing = async (token: string, listingId: number) => {
    const options = {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }

    return await parseJSON(`${BASE_URL}/${listingId}`, options);
  }

  publishListing = async (token: string, listingId: number, payload: PublishListingRequest) => {
    const options = {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    }

    await parseJSON(`${BASE_URL}/publish/${listingId}`, options);
  }

  unpublishListing = async (token: string, listingId: number) => {
    const options = {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }

    await parseJSON(`${BASE_URL}/unpublish/${listingId}`, options);
  }

  createReview = async (token: string, listingId: number, bookingId: number, payload: ReviewRequest) => {
    const options = {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    }

    await parseJSON(`${BASE_URL}/${listingId}/review/${bookingId}`, options);
  }
}

export default new ListingsService();
