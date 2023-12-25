import styled from 'styled-components';
import { FlexAlignCentre, FontRajdhani } from '../../styles/common';

export const FileInputContainer = styled.div`
  input {
    display: none;
  }
`

export const FileUploadBtn = styled.label`
  cursor: pointer;
  ${FlexAlignCentre}
  justify-content: center;
  gap: 1rem;
  padding: 0.6rem;
  background-color: var(--file-upload-btn);
  color: #000;
  border-radius: 0.2rem;
  font-weight: 700;

  &:hover {
    opacity: 0.7;
  }
`

export const FileUploadCard = styled.div`
  margin-top: 1rem;
  padding: 0.6rem 1.2rem;
  ${FlexAlignCentre}
  justify-content: space-between;
  background-color: var(--file-upload-card);
  color: #000;
  border-radius: 0.2rem;

  button {
    ${FlexAlignCentre}
    justify-content: center;
    height: 30px;
    width: 30px;
    background: none;
    border-radius: 50%;
    padding: 0.2rem;

    svg {
      height: 70%;
      margin: auto;
    }

    &:hover {
      background-color: #fff;
    }
  }
`

export const FileRemoveBtn = styled.button`
  margin-top: 1rem;
  padding: 0.6rem 1rem;
  ${FontRajdhani}
  font-size: 1rem;
  background: none;
  border: 1px solid #d73636;
  color: #d73636;

  &:hover {
    background-color: #d7363658;
  }
`
