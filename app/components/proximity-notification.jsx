import React from "react";
import { Modal, ModalBody, VStack } from "@gluestack-ui/themed";
import { ASSETS } from "./map-markers";
import { ModalBackdrop } from "@gluestack-ui/themed";
import { Image } from "@gluestack-ui/themed";
import { Heading, Text } from "@gluestack-ui/themed";
import { ModalFooter } from "@gluestack-ui/themed";
import { Button } from "@gluestack-ui/themed";
import { ButtonText } from "@gluestack-ui/themed";
import { ModalContent } from "@gluestack-ui/themed";

const getImage = (marker) => {
  const asset = ASSETS[marker];
  return asset ?? require("../assets/error.png");
};

const ProximityNotification = ({ showModal, closeModal, proximityMarkers }) => {
  const ref = React.useRef(null);

  const firstMarker = proximityMarkers[0] ?? "";
  const image = getImage(firstMarker);
  const markerTypes = proximityMarkers.join(", ");

  const _handleCloseModal = () => {
    closeModal(false);
  };

  return (
    <Modal finalFocusRef={ref} isOpen={showModal}>
      <ModalBackdrop />
      <ModalContent>
        <ModalBody>
          <VStack gap='$2' justifyContent='center' alignItems='center' paddingVertical='$8'>
            <Image source={image} alt='img' style={{ width: "100%", height: 100, objectFit: "contain" }}></Image>
            <Heading size='lg' textAlign='center'>
              Hold thy broomstick!
            </Heading>
            <Text textAlign='center'>
              You are in the proximity of a mystical <Text fontWeight='$bold'>{markerTypes}</Text> trash bin.
            </Text>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button size='sm' action='primary' borderWidth='$0' onPress={_handleCloseModal} width='$full'>
            <ButtonText>Return</ButtonText>
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ProximityNotification;
