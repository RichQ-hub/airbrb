import styled from 'styled-components';
import { FontRajdhani } from '../../styles/common';
import { DateField } from '@mui/x-date-pickers/DateField';
import { TextField, Button } from '@mui/material';

export const FilterTableContainer = styled.div`
    ${FontRajdhani}
    display: flex;
    flex-direction: column;
    width: 35%;
    background-color: rgba(123, 123, 123, 0.3);
    padding: 10px;
    margin-right: 10px;

    @media (max-width: 600px) {
        width: 100%;
        margin-bottom: 10px;
    }
`;

export const FilterTableHeading = styled.h2`
    color: rgba(254, 118, 41, 1);
    border-bottom: 0.5px solid white;
    margin-bottom: 10px
`;

export const FilterRangeDiv = styled.div`
    display: block;
    width: 100%;
    font-weight: lighter;
    margin-bottom: 30px;
`;

export const DateInput = styled(DateField)`
  width: 100%;
  background-color: rgb(217, 217, 217);
  border-radius: 5px
`;

export const InputField = styled(TextField)`
  &.MuiTextField-root {
    background-color: rgb(217, 217, 217);
    border-radius: 5px;
    width: 100%;
  }
`;

export const FilterButton = styled(Button)`
  &.MuiButton-root {
    ${FontRajdhani}
    background-color: rgba(9, 67, 110, 1);
    color: rgb(225, 225, 225, 1);
    border-radius: 5px;
    align-self: flex-end;

    &:hover {
        background-color: rgba(9, 67, 110, 0.7);
    }
  }
`;
