import React, { ReactNode } from 'react';
import ReactDOM from 'react-dom';
import { ModalBg } from './styles';

interface ModalProps {
  children: ReactNode;
}

const Modal = (props: ModalProps) => {
  const { children } = props;
  return ReactDOM.createPortal(
    <ModalBg>
      {children}
    </ModalBg>, document.getElementById('portal')!
  );
}

export default Modal;
