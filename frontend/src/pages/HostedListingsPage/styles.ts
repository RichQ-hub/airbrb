import styled from 'styled-components';
import { FlexAlignCentre, FontRajdhani } from '../../styles/common';
import { Link } from 'react-router-dom';

export const HostedListingsHeader = styled.div`
  ${FlexAlignCentre}
  ${FontRajdhani}
  justify-content: space-between;
  margin-top: 20px;
  margin-bottom: 1rem;

  h2 {
    font-size: 1.6rem;
    align-self: flex-start;
  }

  @media (max-width: 500px) {
    flex-direction: column;
    gap: 8px;
  }
`

export const ListingCreateBtn = styled(Link)`
  color: #000;
  font-size: 1.1rem;
  background-color: var(--create-color);
  padding: 0.6rem 2rem;
  border-radius: 0.3rem;

  &:hover {
    opacity: 0.7;
  }

  @media (max-width: 500px) {
    width: 100%;
  }
`

export const GridLayout = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  grid-auto-rows: max-content;
  justify-items: center;
  gap: 30px;
`
