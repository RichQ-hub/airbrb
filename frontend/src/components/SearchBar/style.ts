import styled from 'styled-components';
import { TextField } from '@mui/material'

export const SearchBarContainer = styled.div`
    display: flex;
    width: 100%;
    align-self: center;
    align-items: center;
    justify-content: center
`;

export const SearchBarInput = styled(TextField)`
  &.MuiTextField-root {
    width: 95%;
    height: 100%;
    background-color: rgb(225, 225, 225, 0.7);
    border-radius: 5px;
  }
`;

export const SearchButton = styled.button`
    height: 53px;
    margin-left: 10px;
    cursor: pointer;
    background-color: rgba(241, 100, 54, 1);
    padding: 10px;
    
    svg {
        width: 100%;
        height: 100%;
        color: white;
    }

    &:hover {
        svg {
            transform: scale(1.1);
        }
    }
`;
