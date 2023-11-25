import React from "react";
import {
  Button,
  ButtonText,
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalContent,
  ModalFooter,
  Heading,
  Text,
  Image,
  VStack,
} from "@gluestack-ui/themed";
import useWizardQuotes from "../hooks/use-wizard-quotes";
import { useAuth } from "../context/auth-context";

const getImage = (result) => {
  if (result) {
    return require("../assets/success.png");
  } else {
    return require("../assets/error.png");
  }
};

const ResultNotification = ({ showModal, closeModal, result, predictions }) => {
  const ref = React.useRef(null);
  const { updateUserPoints } = useAuth();
  const { getQuote, getTitle } = useWizardQuotes();
  const success = !!result;
  const text = getQuote(success);
  const title = getTitle(success);
  const image = getImage(success);
  const predictionResult = !predictions ? "" : predictions.join(", ");

  const _handleCloseModal = () => {
    if (result) {
      updateUserPoints(100);
    }

    closeModal(false);
  };

  return (
    <Modal
      isOpen={showModal}
      onClose={() => {
        closeModal(false);
      }}
      finalFocusRef={ref}>
      <ModalBackdrop />
      <ModalContent>
        <ModalBody>
          <VStack gap='$2' justifyContent='center' alignItems='center' paddingVertical='$8'>
            <Image source={image}></Image>
            <Heading size='lg' textAlign='center'>
              {title}
            </Heading>
            <Text textAlign='center'>{text}</Text>
            {success && (
              <Text textAlign='center'>
                You will receive <Text fontWeight='$bold'>100</Text> points as succesfull recycle.
              </Text>
            )}

            <Text textAlign='center'>
              Detected object is composed of <Text fontWeight='$bold'>{predictionResult}</Text>.
            </Text>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button size='sm' action='primary' borderWidth='$0' onPress={_handleCloseModal} width='$full'>
            <ButtonText>Confirm</ButtonText>
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ResultNotification;
