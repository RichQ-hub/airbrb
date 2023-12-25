import styled, { css, keyframes } from 'styled-components';
import bg from '../assets/images/main-bg.png';
import { DatePicker } from '@mui/x-date-pickers';

export const FlexAlignCentre = css`
  display: flex;
  align-items: center;
`

export const FontRajdhani = css`
  font-family: Rajdhani, sans-serif;
  font-weight: 700;
`

export const Bg = styled.div`
  padding-top: 80px;
  min-height: 100vh;
  background-image: url(${bg});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
`

export const MainContent = styled.main`
  margin: 0 auto;
  max-width: 1200px;
`

export const TitleMain = styled.h1`
  ${FontRajdhani}
  font-size: 2.6rem;
  color: var(--primary-orange);
`

export const ListingInput = styled.input`
  width: 100%;
  padding: 0.6rem 1rem;
  background-color: rgba(59, 111, 160, 0.35);
  border: none;
  color: #ffffff;
  font-size: 1rem;

  &:hover {
    outline: 1px solid #fff;
  }

  &:active {
    outline: 2px solid #fff;
  }

  &::placeholder {
    color: #ffffff9f;
  }
`

export const ListingAddressInputWrapper = styled.div`
  ${FlexAlignCentre}
  flex-direction: column;
  gap: 10px;
`

export const AddBedBtn = styled.button`
  padding: 0.2rem 1rem;
  font-weight: 700;
`

// Loading Spinner.

const SpinnerKeyframes = keyframes`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`

// ===========================================
// Loading Spinner.
// ===========================================

export const LoadingSpinner = styled.div<{height: number}>`
  margin: auto;
  width: ${(props) => `${props.height}px`};
  height: ${(props) => `${props.height}px`};
  border-radius: 50%;
  border: 4px solid #ffffff;
  border-color: transparent #fff transparent #fff;
  animation: ${SpinnerKeyframes} 1.2s linear infinite;
`

// ===========================================
// Modals.
// ===========================================

export const ModalContainer = styled.div`
  padding: 1.6rem;
  max-width: 900px;
  border-radius: 0.375rem;
  border: 3px solid rgba(198, 228, 255, 0.36);
  background-color: #0A1420;
  box-shadow: -4px 10px 4px 2px rgba(0, 0, 0, 0.70);
`

export const ModalHeader = styled.div`
  ${FlexAlignCentre}
  justify-content: space-between;
  margin-bottom: 0.4rem;
`

export const ModalTitle = styled.h2`
  ${FontRajdhani}
  color: var(--primary-orange);
  font-size: 1.6rem;
`

export const ModalCloseBtn = styled.button`
  height: 30px;
  width: 30px;
  margin-left: 1rem;
  align-self: flex-start;
  background: none;
  border-radius: 50%;
  font-size: 1rem;
  color: #ffffff;

  &:hover {
    background-color: #ffffff5e;
  }
`

export const DatePickersContainer = styled.div`
  ${FlexAlignCentre}
  justify-content: space-between;
  gap: 20px;
  margin: 1.2rem 0;
`

export const StyledDatePicker = styled(DatePicker)`
  .MuiFormLabel-root {
    color: #fff;
  }

  .MuiInputBase-input {
    color: #fff;
  }

  .MuiSvgIcon-root {
    fill: #fff;
  }

  .MuiOutlinedInput-notchedOutline {
    border: 2px solid #fff;
  }

  .Mui-focused .MuiOutlinedInput-notchedOutline {
    border: 2px solid #fff000;
  }
`

export const Scrollable = css`
  &::-webkit-scrollbar {
    width: 0.4rem;
  }

  &::-webkit-scrollbar-thumb {
    background-color: darkgrey;
    outline: 1px solid slategrey;
    border-radius: 100px;
  }
`
