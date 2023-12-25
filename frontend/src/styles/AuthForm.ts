import { styled } from 'styled-components'
import { FlexAlignCentre, FontRajdhani } from './common';
import { TextField, Button, Link, Typography, Alert } from '@mui/material'

export const FormDiv = styled.div`
  ${FontRajdhani}
  ${FlexAlignCentre}
  width: 60%;
  height: 85vh;
  flex-direction: column;
  justify-content: center;
  margin: auto;
  background-color: rgb(10, 50, 94);
  padding: 10px 0;
  border-radius: 5px;
  @media (max-width: 600px) {
    width: 100vw;
    height: 100vh;
    justify-content: normal;
  }
`;

export const AuthForm = styled.form`
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center
`;

export const Heading = styled(Typography)`
  &.MuiTypography-root {
    ${FontRajdhani}
    text-align: center;
    font-size: 35px;
    margin-bottom: 30px;
  }
`;

export const InputField = styled(TextField)`
  &.MuiTextField-root {
    ${FontRajdhani}
    border-radius: 5px;
    margin-bottom: 30px;
    background-color: rgb(217, 217, 217);
  };

  p {
    color: rgb(205,92,92)
  }
`;

export const SubmitButton = styled(Button)`
  &.MuiButton-root {
    ${FontRajdhani}
    margin-bottom: 30px;
    height: 50px;
    background-color: rgb(241, 100, 54);

    &:hover {
      background: rgb(241, 100, 54, 0.7);
    }
  }
`;

export const FormLink = styled(Link)`
  &.MuiLink-root {
    color: #fff;
    font-weight: bold
  }
`;
