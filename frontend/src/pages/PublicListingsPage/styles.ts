import styled from 'styled-components';
import { FlexAlignCentre, FontRajdhani } from '../../styles/common';

export const PublicListingHeader = styled.div`
  ${FlexAlignCentre}
  ${FontRajdhani}
  justify-content: space-between;
  margin-top: 20px;
  margin-bottom: 1rem;

  @media (max-width: 500px) {
    flex-direction: column;
    gap: 8px;
  }
`;

export const SearchAndSortDiv = styled.div`
  display: flex;
`;
export const PublicListingsBody = styled.div`
  display: flex;
  margin-top: 10px;
  @media (max-width: 600px) {
    display: block;
  }
`;

export const ListingsLayout = styled.div`
    display: flex;
    height: 100%;
    flex-direction: column;
`;

export const ClearFilters = styled.button`
  ${FontRajdhani}
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
`;
