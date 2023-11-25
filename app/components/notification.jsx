import React from "react";
import {
  Button,
  ButtonText,
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Heading,
  Text,
  Icon,
} from "@gluestack-ui/themed";
import { CloseIcon } from "@gluestack-ui/themed";

const Notification = ({ showModal, closeModal }) => {
  const ref = React.useRef(null);
  return (
    <Modal
      isOpen={showModal}
      onClose={() => {
        closeModal(false);
      }}
      finalFocusRef={ref}>
      <ModalBackdrop />
      <ModalContent>
        <ModalHeader>
          <Heading size='lg'>Engage with Modals</Heading>
          <ModalCloseButton>
            <Icon as={CloseIcon} />
          </ModalCloseButton>
        </ModalHeader>
        <ModalBody>
          <Text>
            Elevate user interactions with our versatile modals. Seamlessly integrate notifications, forms, and media
            displays. Make an impact effortlessly.
          </Text>
        </ModalBody>
        <ModalFooter>
          <Button size='sm' action='positive' borderWidth='$0' onPress={() => closeModal(false)}>
            <ButtonText>Confirm</ButtonText>
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default Notification;
