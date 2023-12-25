import styled from 'styled-components';
import { TableContainer, Table, TableCell } from '@mui/material';
import { FontRajdhani } from '../../styles/common';

export const BookingTableContainer = styled(TableContainer)`
  &.MuiTableContainer-root {
    background-color: rgb(19, 50, 94);
    min-height: 60vh;
    max-height: 60vh;
    border-radius: 10px;
    padding: 10px;
    @media(max-width: 500px) {
        max-width: 100vw;
    }
`;

export const BookingTable = styled(Table)`
  &.MuiTable-root {
  }
`;

export const BookingTableCell = styled(TableCell)`
  &.MuiTableCell-head {
    ${FontRajdhani}
    color: rgb(129, 210, 224);
    background-color: rgb(19, 50, 94);
    font-size: 1.1em;
    text-align: center
  };

  &.MuiTableCell-body {
    color: rgb(225, 225, 225);
    text-align: center
  }
`;
