import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spinner,
} from '@chakra-ui/react';
import React from 'react';

interface SendTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SendTransactionModal: React.FC<SendTransactionModalProps> = ({
  isOpen,
  onClose,
}) => {
  return (
    <Modal isOpen={isOpen} isCentered onClose={onClose} size={'md'}>
      <ModalOverlay
        bg="blackAlpha.300"
        backdropFilter="blur(10px) hue-rotate(90deg)"
      />
      <ModalContent>
        <ModalBody textAlign="center">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Signing the transaction...</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Spinner size="xl" />
            </ModalBody>
          </ModalContent>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default SendTransactionModal;
