import styled from 'styled-components';
import { FlexAlignCentre } from '../../styles/common';

export const StyledBedInputField = styled.li`
  ${FlexAlignCentre}
  justify-content: stretch;
  gap: 20px;
  margin-bottom: 0.8rem;
  
  h4 {
    flex-shrink: 0;
  }
`

export const StyledBedroomCard = styled.li`
  padding: 1rem;
  border: 2px solid #2294cd9a;
  margin-bottom: 0.6rem;

  h3 {
    text-decoration: underline;
    margin-bottom: 1rem;
  }
`
