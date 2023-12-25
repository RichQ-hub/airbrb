import styled from 'styled-components';
import { FlexAlignCentre, FontRajdhani, ModalContainer, Scrollable } from '../../styles/common';

export const ReviewModalContainer = styled(ModalContainer)`
  max-width: 600px;
  width: 100%;
`

export const ReviewModalForm = styled.form`
  width: 100%;
`

export const ReviewInputContainer = styled.div`
  ${FlexAlignCentre}
  flex-direction: column;
  margin-bottom: 1.2rem;
  gap: 1rem;

  label {
    ${FontRajdhani}
    font-size: 1.4rem;
  }
`

export const CommentTextarea = styled.textarea`
  background-color: rgba(59, 111, 160, 0.35);
  width: 100%;
  border: none;
  overflow-y: auto;
  ${Scrollable}
  min-height: 200px;
  resize: none;
  padding: 0.6rem 1rem;
  color: #ffffff;
  font-size: 1rem;
  font-family: Roboto;

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

export const StarRatingInputContainer = styled.div`
  ${FlexAlignCentre}
`

export const StarRatingInputBtn = styled.button<{ hovered: boolean }>`
  background: none;
  border: none;
  padding: 0 0.2rem;

  svg {
    height: 22px;
    fill: ${props => props.hovered ? 'var(--star-rating-color)' : '#ffffff5b'};
  }
`

export const ReviewModalSubmitBtn = styled.button`
  width: 100%;
  padding: 0.8rem;
  ${FontRajdhani}
  color: #000;
  background-color: var(--create-color);
  font-size: 1.2rem;

  &:hover {
    opacity: 0.8;
  }
`
