import React, { useState } from 'react';
import {
  FilterButton,
  FilterRangeDiv,
  FilterTableContainer,
  FilterTableHeading,
  InputField,
  DateInput
} from './styles';
import { FilterValues, ListingDetail, ListingDetailAndStatus } from '../../schemas/schemas';
import ListingsService from '../../api/ListingsService';
import dayjs, { Dayjs } from 'dayjs';

interface FilterTableProps {
  listings: ListingDetailAndStatus[];
  onFilter: (filteredResults: ListingDetailAndStatus[], filters: FilterValues) => void;
}

const today = dayjs();
const tomorrow = today.add(1, 'day');

const initialFilterValue = {
  price: {
    min: 0,
    max: 0
  },
  date: {
    start: today.format('MM-DD-YY'),
    end: tomorrow.format('MM-DD-YY')
  },
  bedrooms: {
    min: 0,
    max: 0
  }
}

const FilterTable = (props: FilterTableProps) => {
  const [filters, setFilters] = useState<FilterValues>(initialFilterValue);

  const handleFilterInput = (
    filterType: keyof FilterValues,
    field: string,
    value: number | string | Dayjs | null
  ) => {
    setFilters((prevFilters) => {
      if ((field === 'start' || field === 'end') && value instanceof dayjs) {
        // set time to 00:00:00
        const date = value.startOf('day');
        return {
          ...prevFilters,
          [filterType]: {
            ...prevFilters[filterType],
            [field]: date.format(),
          },
        };
      } else {
        return {
          ...prevFilters,
          [filterType]: {
            ...prevFilters[filterType],
            [field]: value,
          },
        };
      }
    });
  };

  /**
   * Checks if the price of a given listing is within the price range
   * @param listing
   * @param filters
   * @returns boolean
   */
  const priceFilter = (listing: ListingDetailAndStatus, filters: FilterValues) => {
    return listing.price >= filters.price.min && listing.price <= filters.price.max;
  }

  /**
   * Checks if the number of bedrooms of a given listing is within the range
   * @param listingDetail
   * @param filters
   * @returns boolean
   */
  const bedroomsFilter = (listingDetail: ListingDetail, filters: FilterValues) => {
    return listingDetail.metadata.bedrooms.length >= filters.bedrooms.min &&
    listingDetail.metadata.bedrooms.length <= filters.bedrooms.max;
  }
  /**
   * Checks if a given listing's availability is within the given date range
   * @param listingDetail
   * @param filters
   * @returns boolean
   */
  const dateFilter = (listingDetail: ListingDetail, filters: FilterValues) => {
    const startDate = new Date(filters.date.start);
    const endDate = new Date(filters.date.end);

    const availableListings = listingDetail.availability.filter((listingAvailability) => {
      const listingAvailableStartDate = new Date(listingAvailability.start);
      // offset time zone difference
      listingAvailableStartDate.setUTCHours(0, 0, 0, 0);
      // set time to zero
      listingAvailableStartDate.setHours(0, 0, 0, 0)

      const listingAvailableEndDate = new Date(listingAvailability.end);
      listingAvailableEndDate.setUTCHours(0, 0, 0, 0);
      listingAvailableEndDate.setHours(0, 0, 0, 0)

      return startDate >= listingAvailableStartDate && endDate <= listingAvailableEndDate;
    })

    return availableListings.length > 0
  }

  /**
   * Filters the listings according to the price, date and bedrooms range
   */
  const applyFilters = async () => {
    console.log(filters);
    const promises = props.listings.map(async (listing) => {
      const listingDetail = await ListingsService.getListingsDetails(listing.id);
      return ((!filters.price.min && !filters.price.max) || priceFilter(listing, filters)) &&
      ((!filters.bedrooms.min && !filters.bedrooms.max) || bedroomsFilter(listingDetail, filters)) &&
      ((!filters.date.start && !filters.date.end) || dateFilter(listingDetail, filters));
    })

    const filteredResults = await Promise.all(promises);
    console.log(filteredResults)
    // filter the listings based on the result from promises
    const filteredListings = props.listings.filter((_, index) => filteredResults[index]);

    props.onFilter(filteredListings, filters);
    clearFilterFields();
  }

  /**
   * Reset the filter values to initial state
   */
  const clearFilterFields = () => {
    setFilters(initialFilterValue);
  }

  return (
    <FilterTableContainer>
        <FilterTableHeading>Filters</FilterTableHeading>
        <h3>Price Range</h3>
          <FilterRangeDiv>
            <label>Min Price:</label>
            <InputField
              value={filters.price.min}
              onChange={(e) => handleFilterInput('price', 'min', e.target.value)}
            />
            <label>Max Price:</label>
            <InputField
              value={filters.price.max}
              onChange={(e) => handleFilterInput('price', 'max', e.target.value)}
            />
          </FilterRangeDiv>
        <h3>Date Range</h3>
          <FilterRangeDiv>
            <label>From:</label>
            <DateInput
              defaultValue={dayjs(filters.date.start)}
              format="MM/DD/YYYY"
              onChange={(date: Dayjs | null) => handleFilterInput('date', 'start', date)}
            />
            <label>To:</label>
            <DateInput
                defaultValue={dayjs(filters.date.end)}
                format="MM/DD/YYYY"
                onChange={(date: Dayjs | null) => handleFilterInput('date', 'end', date)}
            />
          </FilterRangeDiv>
        <h3>Number of Bedrooms</h3>
          <FilterRangeDiv>
            <label>Min Value:</label>
            <InputField
              value={filters.bedrooms.min}
              onChange={(e) => handleFilterInput('bedrooms', 'min', e.target.value)}
            />
            <label>Max Value:</label>
            <InputField
              value={filters.bedrooms.max}
              onChange={(e) => handleFilterInput('bedrooms', 'max', e.target.value)}
            />
          </FilterRangeDiv>
        <FilterButton type='button' onClick={applyFilters}>Apply Filters</FilterButton>
    </FilterTableContainer>
  )
}

export default FilterTable;
