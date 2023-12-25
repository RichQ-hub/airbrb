import styled from 'styled-components';
import { FlexAlignCentre, FontRajdhani } from '../../styles/common';

export const HostedCard = styled.li`
  max-width: 370px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  padding: 1.4rem;
  background: var(--listing-card-bg);
  border-radius: 0.625rem;
  box-shadow: -4px 6px 4px 0px rgba(0, 0, 0, 0.56);

  &:hover {
    outline: 1px solid #fff;
  }
`

export const HostedThumbnail = styled.img`
  width: 100%;
  height: 160px;
  margin-bottom: 0.2rem;
  object-fit: cover;
  border-radius: 0.375rem;
`

export const HostedHeader = styled.section`
  ${FlexAlignCentre}
  justify-content: space-between;
  gap: 20px;

  h2 {
    font-family: Rajdhani, sans-serif;
    color: var(--primary-orange);
    font-size: 1.5rem;
    line-height: 2rem;

    ${HostedCard}:hover & {
      text-decoration: underline;
    }
  }
`

export const HostedFeaturesContainer = styled.div`
  ${FlexAlignCentre}
  align-self: flex-start;
  gap: 16px;
`

export const HostedFeatureBtn = styled.button`
  cursor: pointer;
  ${FlexAlignCentre}
  justify-content: center;
  height: 36px;
  width: 36px;
  border-radius: 0.25rem;
  box-shadow: 0px 4px 2px 0px #000;

  svg {
    height: 60%;
  }

  &:hover {
    opacity: 0.7;
  }
`

export const EditBtn = styled(HostedFeatureBtn)`
  background-color: #40F8ED;
`

export const DeleteBtn = styled(HostedFeatureBtn)`
  background-color: #F84040;
`

// ===========================================
// Rating Section.
// ===========================================

export const RatingSection = styled.section`
  ${FlexAlignCentre}
  gap: 10px;
`

export const NumReviews = styled.p`
  font-weight: 300;
  font-style: italic;
`

// ===========================================
// Property type.
// ===========================================

export const PropertyType = styled.p`
  font-weight: 700;

  span {
    font-weight: 300;
  }
`

// ===========================================
// Property Tags.
// ===========================================

export const PropertyTagsContainer = styled.section`
  ${FlexAlignCentre}
  gap: 10px;
`

// ===========================================
// Price.
// ===========================================

export const PriceContainer = styled.p`
  ${FlexAlignCentre}
  font-size: 1.2rem;
  font-weight: 700;
  text-decoration: underline;
  color: #77C6FF;
`

// ===========================================
// Live Buttons.
// ===========================================

export const LiveBtn = styled.button<{live: boolean}>`
  cursor: pointer;
  ${FlexAlignCentre}
  ${FontRajdhani}
  justify-content: center;
  background: none;
  padding: 0.4rem;
  border-radius: 0.2rem;
  font-size: 1.1rem;
  color: ${props => props.live ? '#FF8181' : '#AEDDFF'};
  border: 1px solid ${props => props.live ? '#FF8181' : '#AEDDFF'};

  svg {
    margin-right: 1rem;
    fill: ${props => props.live ? '#FF8181' : '#AEDDFF'};
  }

  &:hover {
    background-color: ${props => props.live ? '#FF8181' : '#AEDDFF'};
    color: #000;

    svg {
      fill: #000;
    }
  }
`

export const ViewBookingsBtn = styled(LiveBtn)`
  margin-top: auto;
  color: #FA3671;
  border: 1px solid #FA3671;

  svg {
    fill: #FA3671;
  }
`
