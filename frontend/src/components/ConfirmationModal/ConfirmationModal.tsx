import React from 'react';
import Modal from '../Modal';
import { CancelBtn, ConfirmBtn, ConfirmBtnContainer } from './styles';
import { ModalCloseBtn, ModalContainer, ModalHeader, ModalTitle } from '../../styles/common';

interface ConfirmationModalProps {
  title: string;
  message: string;
  handleToggleModal: (open: boolean) => void;
  handleConfirm: () => void;
}

/**
 * Reusable confirmation modal to prevent dangerous actions.
 */
const ConfirmationModal = (props: ConfirmationModalProps) => {
  const { title, message, handleToggleModal, handleConfirm } = props;
  return (
    <Modal>
      <ModalContainer>
        <ModalHeader>
          <ModalTitle>{title}</ModalTitle>
          <ModalCloseBtn type='button' onClick={() => handleToggleModal(false)}>X</ModalCloseBtn>
        </ModalHeader>
        <p>{message}</p>
        <ConfirmBtnContainer>
          <CancelBtn onClick={() => handleToggleModal(false)}>Cancel</CancelBtn>
          <ConfirmBtn
            onClick={() => {
              handleConfirm();
              handleToggleModal(false);
            }}
          >Confirm</ConfirmBtn>
        </ConfirmBtnContainer>
      </ModalContainer>
    </Modal>
  )
}

export default ConfirmationModal;
