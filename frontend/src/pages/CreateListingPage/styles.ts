import styled from 'styled-components';
import { FlexAlignCentre } from '../../styles/common';

export const ListingForm = styled.form`
  padding: 2rem 0;
`

export const CreateListingBtn = styled.button`
  width: 100%;
  padding: 0.6rem 1rem;
  text-align: center;
  background-color: var(--create-color);
  font-family: Rajdhani, sans-serif;
  font-weight: 700;
  font-size: 1.1rem;
  
  &:hover {
    opacity: 0.8;
  }
`

export const CheckboxGrid = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr;
`

export const CheckboxGridItem = styled.li`
  ${FlexAlignCentre}
  padding: 0.8rem;
  border-radius: 8px;

  input {
    cursor: pointer;
    margin-right: 1rem;
    width: 1.2rem;
    height: 1.2rem;
  }
`
