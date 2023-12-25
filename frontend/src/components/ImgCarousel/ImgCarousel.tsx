import React, { useState } from 'react';
import { ImgCarouselFigure, ScrollBtn, ScrollBtnGroup, StyledImgCarousel } from './styles';

interface ImgCarouselProps {
  propertyImgs: string[]; // For now
}

/**
 * Given a list of images in base64 format, enables scrolling through
 * images with buttons.
 */
const ImgCarousel = (props: ImgCarouselProps) => {
  const { propertyImgs } = props;
  const [currPropertyIdx, setCurrPropertyIdx] = useState<number>(0)

  /**
   * Scrolls to the left image.
   */
  const handleScrollLeft = () => {
    if (currPropertyIdx === 0) {
      return;
    }

    setCurrPropertyIdx(oldIdx => oldIdx - 1);
  }

  /**
   * Scrolls to the right image.
   */
  const handleScrollRight = () => {
    if (currPropertyIdx === propertyImgs.length - 1) {
      return;
    }

    setCurrPropertyIdx(oldIdx => oldIdx + 1);
  }

  return (
    <ImgCarouselFigure>
      <StyledImgCarousel src={propertyImgs[currPropertyIdx]} alt='Property Images' />
      <ScrollBtnGroup>
        {/* Scroll Left Button */}
        <ScrollBtn onClick={handleScrollLeft}>
          <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 256 512"><path d="M9.4 278.6c-12.5-12.5-12.5-32.8 0-45.3l128-128c9.2-9.2 22.9-11.9 34.9-6.9s19.8 16.6 19.8 29.6l0 256c0 12.9-7.8 24.6-19.8 29.6s-25.7 2.2-34.9-6.9l-128-128z"/></svg>
        </ScrollBtn>

        {/* Scroll Right Button */}
        <ScrollBtn onClick={handleScrollRight}>
        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 256 512"><path d="M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z"/></svg>
        </ScrollBtn>
      </ScrollBtnGroup>
    </ImgCarouselFigure>
  )
}

export default ImgCarousel;
