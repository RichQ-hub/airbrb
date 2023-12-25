import styled from 'styled-components';
import { FlexAlignCentre } from '../../styles/common';

export const ImgCarouselFigure = styled.figure`
  position: relative;
`

export const StyledImgCarousel = styled.img`
  width: 100%;
  height: 400px;
  border: 2px solid #fff;
  border-radius: 8px;
  object-fit: cover;
`

export const ScrollBtnGroup = styled.div`
  ${FlexAlignCentre}
  gap: 20px;
  position: absolute;
  right: 10px;
  bottom: 16px;
`

export const ScrollBtn = styled.button`
  ${FlexAlignCentre}
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #ffffffa1;

  &:hover {
    background-color: #fff;
  }

  svg {
    height: 60%;
  }
`
