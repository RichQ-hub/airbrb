export enum Amenity {
  Kitchen = 'Kitchen',
  Fireplace = 'Fireplace',
  Parking = 'Free Street Parking',
  Wifi = 'Wi-Fi',
  Aircon = 'Air Conditioning',
}

export interface Address { // Done
  street: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
}

export interface Review { // Done
  author: string;
  rating: number;
  comment: string;
}

export interface DateRange { // Done
  start: string;
  end: string;
}

export interface Bed {
  type: string;
  count: number;
}

export interface Bedroom {
  name: string,
  beds: Bed[];
}

export interface ListingMetadata {
  propertyType: string;
  numBathrooms: number;
  amenities: Amenity[];
  bedrooms: Bedroom[];
  propertyImages: string[];
}

export interface Listing { // Done
  id: number;
  title: string;
  owner: string;
  address: Address;
  thumbnail: string;
  price: number;
  reviews: Review[];
}

export interface ListingDetail { // Done
  title: string;
  owner: string;
  address: Address;
  price: number;
  thumbnail: string; // Stores the path to file for now
  published: boolean;
  postedOn: string;
  reviews: Review[];
  availability: DateRange[];
  metadata: ListingMetadata;
}

export interface ListingDetailAndStatus extends Listing {
  status: string,
  avgRating: number
}

export interface Booking { // Done
  id: number;
  owner: string;
  dateRange: DateRange;
  totalPrice: number;
  listingId: string;
  status: 'accepted' | 'pending' | 'declined';
}

export interface HostedListing extends ListingDetail {
  listingId: number;
}

export interface FilterValues {
  price: {
    min: number
    max: number
  };
  date: DateRange;
  bedrooms: {
    min: number,
    max: number
  }
}

// ==================================================
// Payload Requests
// ==================================================

export interface ListingFormRequest {
  title: string;
  address: Address;
  thumbnail: string;
  price: number;
  metadata: ListingMetadata;
}

export interface PublishListingRequest {
  availability: DateRange[];
}

export interface BookingRequest {
  dateRange: DateRange;
  totalPrice: number;
}

export interface ReviewRequest {
  review: Review;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
}
