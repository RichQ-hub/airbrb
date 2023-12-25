import styled from 'styled-components';
import { FlexAlignCentre } from '../../styles/common';

export const ConfirmBtnContainer = styled.div`
  ${FlexAlignCentre}
  margin-top: 1.6rem;
  justify-content: flex-end;
  gap: 20px;
`

export const ConfirmBtn = styled.button`
  height: 100%;
  padding: 0.6rem 0.8rem;
  border-radius: 4px;
  background-color: #F84040;
  color: #000;
  font-size: 1rem;

  &:hover {
    opacity: 0.7;
  }
`

export const CancelBtn = styled(ConfirmBtn)`
  background: none;
  border: 1px solid #6DB5F7;
  color: #6DB5F7;
`
