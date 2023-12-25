import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FlexAlignCentre } from '../../styles/common';

export const RatingSummaryContainer = styled.div`
  position: relative;
`

export const StyledRatingTooltip = styled.dialog`
  display: block;
  position: absolute;
  top: 100%;
  padding: 1rem;
  z-index: 1000;
  left: 50%; 
  transform: translateX(-50%);
  background-color: #1b1b1d;
  border: 1px solid #ffffffa7;
  color: #fff;
`

// ==========================================
// Avg Rating Section.
// ==========================================

export const AvgRatingContainer = styled.div`
  ${FlexAlignCentre}
  gap: 10px;
  margin-bottom: 0.6rem;
`

export const RatingNumReviews = styled.p`
  color: #ffffffb5;
  margin-bottom: 0.6rem;
`

// ==========================================
// Rating Summary Column
// ==========================================

export const RatingSummaryLink = styled(Link)`
  ${FlexAlignCentre}
  margin-bottom: 0.4rem;
  gap: 10px;
  padding: 0.2rem 0;
  color: #fff;
  font-weight: 500;
  font-family: Roboto, sans-serif;
`

export const RatingSummaryLabel = styled.p`
  width: max-content;

  ${RatingSummaryLink}:hover & {
    color: var(--primary-orange);
    text-decoration: underline;
  }
`

export const ProgressBar = styled.div`
  height: 26px;
  width: 180px;
  background-color: #fff;
  border-radius: 4px;

  ${RatingSummaryLink}:hover & {
   border: 1px solid #fff;
  }
`

export const ProgressBarFill = styled.div<{ width: number }>`
  width: ${props => `${props.width}%`};
  height: 100%;
  background-color: var(--primary-orange);
  border-radius: 4px;
`

export const RatingSummaryPercentage = styled.p`
  width: max-content;

  ${RatingSummaryLink}:hover & {
    text-decoration: underline;
  }

  span {
    font-style: italic;
    font-size: 1rem;
    font-weight: 300;
  }
`
