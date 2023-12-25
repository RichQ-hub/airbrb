import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/UserContextProvider';
import SearchBar from '../../components/SearchBar';
import FilterTable from '../../components/FilterTable';
import SearchFilterResults from '../../components/SearchFilterResults';
import { Booking, FilterValues, ListingDetailAndStatus } from '../../schemas/schemas';
import BookingService from '../../api/BookingService';
import ListingsService from '../../api/ListingsService';

import { ClearFilters, ListingsLayout, PublicListingHeader, PublicListingsBody, SearchAndSortDiv } from './styles';
import { MainContent, TitleMain } from '../../styles/common';
import SortingDropdownList from '../../components/SortingDropdownList';

const PublicListingsPage = () => {
  const [listings, setListings] = useState<ListingDetailAndStatus[]>([]);
  const [searchFilterResults, setSearchFilterResults] = useState<ListingDetailAndStatus[]>([]);
  const [filterValues, setFilterValues] = useState<FilterValues>({
    price: {
      min: 0,
      max: 0
    },
    date: {
      start: '',
      end: ''
    },
    bedrooms: {
      min: 0,
      max: 0
    }
  });
  const [searchApplied, setSearchApplied] = useState(false);
  const [filterApplied, setFilterApplied] = useState(false);
  const { email, token } = useContext(UserContext);

  /**
   * Sorts listings in alphabetical order
   * @param a
   * @param b
   */
  const alphabeticalSort = (a: ListingDetailAndStatus, b: ListingDetailAndStatus): number => {
    return a.title.localeCompare(b.title);
  };

  /**
   * Sorts listings by bookig status
   * @param a
   * @param b
   */
  const statusSort = (a: ListingDetailAndStatus, b: ListingDetailAndStatus) => {
    if (a.status === 'accepted' || a.status === 'pending') {
      return b.status === 'accepted' || b.status === 'pending' ? 0 : -1;
    } else {
      return b.status === 'accepted' || b.status === 'pending' ? 1 : 0;
    }
  };

  /**
   * Sorts listings by average rating
   * @param option
   * @param a
   * @param b
   */
  const ratingSort = (option: string, a: ListingDetailAndStatus, b: ListingDetailAndStatus) => {
    if (option === 'Highest to Lowest') {
      return b.avgRating - a.avgRating;
    } else if (option === 'Lowest to Highest') {
      return a.avgRating - b.avgRating;
    }
    return 0;
  }

  const getBookingStatus = async (listing: ListingDetailAndStatus) => {
    const bookings = await BookingService.getAllBookings(token);
    const userBookings = bookings.filter((booking: Booking) => booking.owner === email && booking.listingId === listing.id.toString());
    if (userBookings.length > 0) {
      // sort userBookings based on the end date in descending order (latest first)
      userBookings.sort((a, b) => new Date(b.dateRange.end).getTime() - new Date(a.dateRange.end).getTime());

      // return the status of the latest booking
      return userBookings[0]?.status || '';
    } else {
      return '';
    }
  }

  const searchHandler = (query: string) => {
    const results = listings.filter(
      (listing) =>
        listing.title.toLowerCase().includes(query) ||
        listing.address.country.toLowerCase().includes(query) ||
        listing.address.state.toLowerCase().includes(query) ||
        listing.address.street.toLowerCase().includes(query) ||
        listing.address.postcode.toLowerCase().includes(query)
    );
    console.log(results)
    setSearchFilterResults(results);
    setSearchApplied(true);
  }

  const filterHandler = (filteredResults: ListingDetailAndStatus[], filters: FilterValues) => {
    setSearchFilterResults(filteredResults);
    setFilterValues(filters);
    setFilterApplied(true);
  }

  const clearSearchFilter = () => {
    setSearchFilterResults([]);
    setSearchApplied(false);
    setFilterApplied(false);
  }

  const sortHandler = (option: string) => {
    const currentListings = (searchApplied || filterApplied) ? [...searchFilterResults] : [...listings];
    const sortedListings = currentListings.sort((a, b) => ratingSort(option, a, b))
    // update state based on the applied sorting
    if (searchApplied || filterApplied) {
      setSearchFilterResults(sortedListings);
    } else {
      setListings(sortedListings);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const data = await ListingsService.getAllListings();
      const publishedListings = Promise.all(
        data.map(async (listing) => {
          const listingDetail = await ListingsService.getListingsDetails(listing.id);
          const listingRatings = listing.reviews.map(review => review.rating);
          const averageRating = listingRatings.length > 0 ? (listingRatings.reduce((sum, rating) => sum + rating, 0) / listingRatings.length) : 0;
          return listingDetail.published ? { ...listing, status: '', avgRating: averageRating } : null;
        })
      )

      const filteredListings = (await publishedListings).filter((listing) => listing !== null) as ListingDetailAndStatus[];
      const sortedListings = filteredListings.sort(alphabeticalSort);

      // sort listings by booking status
      if (token !== '') {
        const updatedListings = await Promise.all(
          sortedListings.map(async (listing) => {
            listing.status = await getBookingStatus(listing);
            return listing;
          })
        );
        const finalSortedListings = updatedListings.sort(statusSort);
        setListings(finalSortedListings);
      }

      setListings(sortedListings);
    }

    fetchData();
  }, [token]);

  return (
    <MainContent>

      <PublicListingHeader>
        <TitleMain>Public Listings</TitleMain>
        <ClearFilters onClick={clearSearchFilter}>Clear All Filters</ClearFilters>
      </PublicListingHeader>

      <SearchAndSortDiv>
        <SearchBar onSearch={searchHandler}/>
        <SortingDropdownList sortListings={sortHandler}/>
      </SearchAndSortDiv>

      <PublicListingsBody>
        <FilterTable listings={searchApplied ? searchFilterResults : listings} onFilter={filterHandler}/>

        <ListingsLayout>
        {searchApplied || filterApplied
          ? (searchFilterResults.length > 0)
              ? (<SearchFilterResults listings={searchFilterResults} filters={filterValues}/>)
              : (<h3>No Listings Found</h3>)
          : (listings.length > 0)
              ? (<SearchFilterResults listings={(listings)} filters={filterValues}/>)
              : (<h3>No Listings Found</h3>)
        }
        </ListingsLayout>
      </PublicListingsBody>

    </MainContent>
  )
}

export default PublicListingsPage;
