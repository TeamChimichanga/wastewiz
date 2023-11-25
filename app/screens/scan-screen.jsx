import { Dimensions, View } from "react-native";
import React from "react";
import { Box, Button, ButtonText, Fab, FabIcon, FabLabel, Image, SearchIcon } from "@gluestack-ui/themed";
import * as ImagePicker from "expo-image-picker";
import ScanAreaSVG from "../components/scan-area";
import { Camera } from "expo-camera";
import { CameraIcon } from "lucide-react-native";
import { Text } from "@gluestack-ui/themed";
import Notification from "../components/notification";

const ScanScreen = ({ navigation }) => {
  const [image, setImage] = React.useState(null);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [showModal, setShowModal] = React.useState(false);

  let camera = null;

  const _pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setShowModal(true);
    }
  };

  const _takePicture = async () => {
    if (!camera) return;
    const photo = await camera.takePictureAsync({
      base64: true,
      quality: 1,
      exif: true,
    });
    setImage(photo.uri);
    setShowModal(true);
  };

  const _reset = () => {
    setImage(null);
  };

  const _closeModal = (result) => {
    setShowModal(false);
    if (result) {
      navigation.navigate("Map");
    }
  };

  return (
    <Box flex={1} backgroundColor='$white'>
      {!image && permission?.granted && (
        <Camera
          ref={(ref) => (camera = ref)}
          style={{
            height: Dimensions.get("screen").height,
            width: Dimensions.get("screen").width,
          }}>
          <View
            style={{
              width: "100%",
              height: "55%",
              justifyContent: "flex-end",
              alignItems: "center",
            }}>
            <ScanAreaSVG />
          </View>
        </Camera>
      )}

      {!permission?.granted && (
        <>
          <Text>Please enable permissions in order to use the camera feature!</Text>
          <Button onPress={requestPermission}>
            <ButtonText>Request permission</ButtonText>
          </Button>
        </>
      )}

      {!image ? (
        <>
          <Fab
            size='lg'
            placement='bottom right'
            isHovered={false}
            isDisabled={false}
            isPressed={false}
            bottom={35}
            backgroundColor='$blue400'
            onPress={_pickImage}>
            <FabIcon as={SearchIcon} mr='$2' />
            <FabLabel>Pick image</FabLabel>
          </Fab>
          <Fab
            size='lg'
            placement='bottom center'
            isHovered={false}
            isDisabled={false}
            isPressed={false}
            bottom={35}
            backgroundColor='$blue500'
            onPress={_takePicture}>
            <FabIcon as={CameraIcon}></FabIcon>
          </Fab>
        </>
      ) : (
        <Fab
          size='lg'
          placement='bottom center'
          isHovered={false}
          isDisabled={false}
          isPressed={false}
          bottom={35}
          backgroundColor='$blue500'
          onPress={_reset}>
          <FabLabel>Reset</FabLabel>
        </Fab>
      )}

      {image && (
        <Image
          source={{ uri: image }}
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
          alt='scanned image'
        />
      )}
      <Notification showModal={showModal} closeModal={_closeModal} />
    </Box>
  );
};

export default ScanScreen;
