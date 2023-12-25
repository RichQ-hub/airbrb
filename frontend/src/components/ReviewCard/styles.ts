import styled from 'styled-components';
import { FlexAlignCentre, FontRajdhani } from '../../styles/common';

export const ReviewCardContainer = styled.li`
  padding: 1rem 1.4rem;
  margin-bottom: 1.4rem;
  border: 2px solid #12273A;
  background-color: #080F17;
  box-shadow: -8px 8px 3px 0px rgba(0, 0, 0, 0.60);
`

export const ReviewHeader = styled.div`
  ${FlexAlignCentre}
  margin-bottom: 0.8rem;
`

export const ReviewRating = styled.div`
  ${FlexAlignCentre}
  gap: 10px;

  h3 {
    ${FontRajdhani}
    font-size: 1.4rem;
  }

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
  }
`

export const ReviewAuthor = styled.p`
  margin-left: auto;
  color: #3FE7F1;
`

export const ReviewComment = styled.p`
  white-space: pre-wrap;
`
