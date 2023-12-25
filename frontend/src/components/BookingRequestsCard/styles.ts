import styled from 'styled-components';
import { Button } from '@mui/material'
import { FontRajdhani } from '../../styles/common';

export const BookingRequestCard = styled.div`
  display: flex;
  flex-direction: column;
  background-color: rgb(5, 14, 27, 0.9);
  border-radius: 5px;
  padding: 20px;
  margin-bottom: 20px;
  line-height: 1.7em;
  box-shadow: -4px 6px 4px 0px rgba(0, 0, 0, 0.56);
  &:hover {
    outline: 1px solid #fff;
  }

  @media (max-width: 500px) {
    flex-direction: column;
}
`;

export const BookingId = styled.h2`
  ${FontRajdhani}
  color: rgb(254, 118, 41);
`;

export const BookingInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 30px;
`;

export const InfoContainer = styled.div`
  display: flex;
  align-items: center;

  svg {
    margin-right: 5px;
    height: 100%;
  }
`;

export const BookingStatusContainer = styled.div`
  display: flex;
`;

export const BookingButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-left: auto;
`;

export const RespondButton = styled(Button)`
  &.MuiButton-root {
    margin-left: 20px;
  }
`;
