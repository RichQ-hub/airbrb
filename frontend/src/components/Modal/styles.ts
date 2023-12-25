import styled from 'styled-components';
import { FlexAlignCentre } from '../../styles/common';

export const ModalBg = styled.div`
  position: fixed;
  height: 100vh;
  width: 100%;
  top: 0;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.12);
  backdrop-filter: blur(4.5px);
  ${FlexAlignCentre}
  justify-content: center;
`
