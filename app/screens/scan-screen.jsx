import { Dimensions, View } from "react-native";
import React from "react";
import {
  Box,
  Button,
  ButtonText,
  Center,
  Fab,
  FabIcon,
  FabLabel,
  Image,
  SearchIcon,
  Spinner,
  VStack,
} from "@gluestack-ui/themed";
import * as ImagePicker from "expo-image-picker";
import ScanAreaSVG from "../components/scan-area";
import { Camera } from "expo-camera";
import { CameraIcon } from "lucide-react-native";
import { Text } from "@gluestack-ui/themed";
import ResultNotification from "../components/result-notification";
import predictApi from "../data/predict-api";
import Loading from "../components/loading";

const base64ToImageURI = (base64String) => {
  const prefix = Platform.OS === "android" ? "data:image/jpeg;base64," : "data:image/jpeg;base64,";
  return `${prefix}${base64String}`;
};

const predictionMatchesProximity = (predictionClasses, proximityMarkers) => {
  const proximityMarkersTypes = proximityMarkers.map((marker) => marker.toLowerCase());
  const predictionTypes = predictionClasses.map((marker) => marker.toLowerCase());
  return predictionTypes.some((type) => proximityMarkersTypes.includes(type));
};

const ScanScreen = ({ navigation, route }) => {
  const { proximityMarkers } = route.params || { proximityMarkers: [] };
  const [image, setImage] = React.useState(null);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [showModal, setShowModal] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [result, setResult] = React.useState(null);
  const [predictions, setPredictions] = React.useState(null);

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

    if (result.canceled) {
      return;
    }

    setLoading(true);
    const response = await predictApi.predict(result.assets[0].uri);
    setLoading(false);
    setImage(base64ToImageURI(response.result_image_base64));
    // Checks if any of the predicted classes match the proximity markers
    const predictionMatches = predictionMatchesProximity(response.unique_classes, proximityMarkers);
    setPredictions(response.unique_classes);
    setResult(predictionMatches);
    setShowModal(true);
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

  if (loading) {
    return (
        <Loading />
    );
  }

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
        <VStack position='relative'>
          <Text position='absolute' top={10} right={0}>
            In proximity: {proximityMarkers.map((marker) => marker.toLowerCase()).join(", ")}
          </Text>
          <Image
            source={{ uri: image }}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            alt='scanned image'
            position='relative'
          />
        </VStack>
      )}
      <ResultNotification showModal={showModal} closeModal={_closeModal} result={result} predictions={predictions} />
    </Box>
  );
};

export default ScanScreen;
