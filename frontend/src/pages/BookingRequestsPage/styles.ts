import styled from 'styled-components';
import { FlexAlignCentre, FontRajdhani } from '../../styles/common';
import { Button } from '@mui/material';

export const Subheading = styled.div`
    ${FontRajdhani}
    display: flex;
    flex-direction: row;
    color: rgb(129, 210, 237);
    margin: 20px;
    font-size: 1.5em;
    justify-content: space-between;

    @media(max-width: 650px) {
      flex-direction: column;
      align-items: center
    }
`;

export const BookingRequestHistoryContainer = styled.div`
  display: flex;
  flex-direction: row;

  @media(max-width: 1000px) {
    flex-direction: column;
  }
`;

export const BookingRequestsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  width: 100%;
  background-color: rgb(12, 33, 65, 0.5);
  border-radius: 5px;
  padding: 20px;
  margin-bottom: 30px;
  padding-top: 0;

  @media(max-width: 1000px) {
    margin-left: 0;
  }
`;

export const RefreshButton = styled(Button)`
  &.MuiButton-root {
    ${FontRajdhani}
    background-color: rgb(25, 118, 210);
    color: white;
    font-size: 1.1rem;
    &:hover {
      opacity: 0.7;
      background-color: rgb(25, 118, 210);
    };
    svg {
      margin-right: 5px;
    }

    @media(max-width: 650px) {
      width: 100%
    }
  }
`;

export const BookingHistoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
`;

export const BookingHistoryInfo = styled.div`
  ${FontRajdhani}
  ${FlexAlignCentre}
  flex-direction: column;
  border-radius: 5px;
  border: 1px solid white;
  font-size: 1.5em;
  padding: 10px;
  line-height: 1.5em;
  margin-bottom: 20px;
  svg {
    margin-right: 10px;
  }
`;
