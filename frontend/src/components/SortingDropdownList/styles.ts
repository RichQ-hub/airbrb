import styled from 'styled-components'
import { FormControl, Select, MenuItem, InputLabel } from '@mui/material';
import { FontRajdhani } from '../../styles/common';

export const DropdownListContainer = styled(FormControl)`
    &.MuiFormControl-root {
        width: 20%;
        margin-left: 10px;
    }
    
`;

export const SortingLabel = styled(InputLabel)`
    &.MuiInputLabel-formControl {
        ${FontRajdhani}
        color: rgb(225, 225, 225);
    };
`;

export const DropdownList = styled(Select)`
    border: 1px solid white;
    svg {
        color: rgb(225, 225, 225);
    }
`;

export const SortingOption = styled(MenuItem)`
    &.Mui-selected {
        
    }
`;
