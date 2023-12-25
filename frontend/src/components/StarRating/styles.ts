import styled from 'styled-components';
import { FlexAlignCentre } from '../../styles/common';

export const StarRatingContainer = styled.ul<{ height: string }>`
  ${FlexAlignCentre}
  gap: 8px;

  svg {
    fill: var(--star-rating-color);
    height: ${props => props.height};
  }
`
