import styled from 'styled-components';
import { FlexAlignCentre, FontRajdhani, Scrollable } from '../../styles/common';

export const AvgRatingSection = styled.section`
  ${FlexAlignCentre}
  gap: 20px;

  & span {
    font-size: 1.4rem;
  }
`

export const ContentSection = styled.section`
  margin-top: 1.6rem;
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(400px, 38%);

  @media (max-width: 820px) {
    grid-template-columns: minmax(0, 1fr);
  }
`

export const BookingSection = styled.section`
  position: relative;

  @media (max-width: 820px) {
    order: -1;
    margin-bottom: 2rem;
  }
`

export const ListingSection = styled.section`
  padding: 0 0.8rem;
  padding-bottom: 1.6rem;
  border-bottom: 2px solid #ffffff69;
`

export const ListingSubheader = styled.h2`
  ${FontRajdhani}
  color: #81D2F4;
  font-size: 1.6rem;
  margin: 0.8rem 0;
`

export const PropertyTagsContainer = styled.div`
  ${FlexAlignCentre}
  gap: 10px;
  margin-left: 10px;
  font-size: 1.1rem;

  @media (max-width: 820px) {
    flex-direction: column;
    align-items: flex-start;
  }
`

export const PropertyAttribute = styled.p`
  margin-top: 1.4rem;
  line-height: 1.6rem;
  em {
    ${FontRajdhani}
    margin-right: 0.4rem;
    padding: 0.2rem 0.6rem;
    border: 1px solid #FFF;
    background: #0A1420;
    font-style: normal;
  }
`

// ===========================================
// Amenities Section.
// ===========================================

export const AmenitiesGrid = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr;
`

export const AmenityItem = styled.li`
  ${FlexAlignCentre}
  padding: 0.8rem 0;

  svg {
    height: 2rem;
    width: 2rem;
    fill: #fff;
    margin-right: 1rem;
  }
`

// ===========================================
// Bedroom Section.
// ===========================================

export const BedroomsListContainer = styled.ul`
  display: flex;
  align-items: stretch;
  overflow-x: auto;
  gap: 20px;
  ${Scrollable}
`

export const StyledBedroomDetailCard = styled.li`
  flex-shrink: 0;
  padding: 1rem 1.4rem;
  border-radius: 0.5rem;
  border: 1px solid #FAFEFF;
  background-color: #0A1420;

  h3 {
    margin-bottom: 0.6rem;
  }
`

export const BedListItem = styled.li`
  list-style-type: circle;
  list-style-position: inside;
`

// ===========================================
// Booking Form.
// ===========================================

export const BookingForm = styled.form`
  width: 84%;
  margin-left: auto;
  padding: 1rem 1.4rem;
  position: sticky;
  top: 80px;
  border-radius: 0.9375rem;
  background-color: rgba(19, 44, 81, 0.90);
  box-shadow: 0px 7px 13px 7px rgba(0, 0, 0, 0.71);

  h2 {
    ${FontRajdhani}
    text-align: center;
    color: var(--primary-brand-color);
  }

  @media (max-width: 820px) {
    width: 100%;
  }
`

export const PricingContainer = styled.div`
  ${FlexAlignCentre}
  justify-content: space-between;
  margin-bottom: 1rem;

  h3 {
    ${FontRajdhani}
    font-size: 1.2rem;
  }

  p {
    font-size: 1.2rem;
    font-weight: 700;
    text-decoration: underline;
  }
`

export const ReserveBtn = styled.button`
  width: 100%;
  padding: 1rem;
  margin-bottom: 1rem;
  background-color: var(--primary-brand-color);
  border-radius: 0.375rem;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.60);
  font-family: Roboto, sans-serif;
  font-size: 1rem;
  font-weight: 700;

  &:hover {
    opacity: 0.8;
  }
`

export const ReservationTitle = styled.h3`
  ${FontRajdhani}
  padding: 1rem 0;
  border-top: 1px solid white;
  text-align: center;
`

export const BookingsList = styled.ul`
  border-radius: 8px;
  border: 1px solid #5794CC;
  background-color: #011531;
  max-height: 300px;
  overflow-y: auto;
  ${Scrollable}
`

export const BookingCardItem = styled.li`
  padding: 1rem;
  display: grid;
  grid-template-columns: 65% 1fr;
  border: 1px solid #5794CC;
`

export const BookingCardLeftSection = styled.div`
  height: 100%;
  padding-right: 0.8rem;
  border-right: 1px solid #fff;
`

export const BookingCardRightSection = styled.div`
  padding-left: 0.8rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

export const BookingDate = styled.p`
  ${FlexAlignCentre}
  justify-content: space-between;
  margin-bottom: 0.4rem;

  em {
    color: #81D2F4;
    font-style: normal;
    font-weight: 500;
  }
`

export const BookingStatus = styled.div`
  ${FlexAlignCentre}
  justify-content: space-between;

  em {
    font-style: normal;
    font-weight: 500;
  }
`

export const BookingStatusTag = styled.div<{status: string}>`
  padding: 0.2rem 0.4rem;
  background-color: ${props => props.status};
  color: #000;
  text-transform: capitalize;
  font-weight: 700;
  border-radius: 4px;
`

export const BookingTotalPrice = styled.div`
  em {
    font-style: normal;
    font-weight: 700;
    color: var(--primary-brand-color);
  }

  p {
    text-decoration: underline;
    font-weight: 500;
  }
`

export const BookingDeleteBtn = styled.button`
  ${FlexAlignCentre}
  justify-content: center;
  height: 30px;
  width: 30px;
  margin-left: auto;
  background: none;
  border-radius: 50%;
  border: 1px solid #FA3030;
  
  svg {
    fill: #FA3030;
  }

  &:hover {
    background-color: #fa30304b;
  }
`

// ===========================================
// Availability Dates Section.
// ===========================================

export const AvailabilityDatesList = styled.ul`
  background-color: #000916;
  max-height: 300px;
  overflow-y: auto;
  border: 1px solid #5794CC;
`

// ===========================================
// Review Section.
// ===========================================

export const ReviewListHeader = styled.div`
  ${FlexAlignCentre}
  justify-content: space-between;
  margin-bottom: 0.6rem;
`

export const ReviewList = styled.ul`
  padding-bottom: 0.6rem;
`

export const CreateReviewButton = styled.button`
  ${FontRajdhani}
  color: #000;
  font-size: 1.1rem;
  background-color: var(--create-color);
  padding: 0.6rem 1rem;
  border-radius: 0.3rem;

  &:hover {
    opacity: 0.8;
  }
`
