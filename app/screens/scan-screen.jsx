import { View, Text } from "react-native";
import React from "react";
import { Button, ButtonText } from "@gluestack-ui/themed";

const ScanScreen = ({ navigation }) => {
  return (
    <View>
      <Text>ScanScreen</Text>
      <Button onPress={() => navigation.navigate("Login")}>
        <ButtonText>Go to Login</ButtonText>
      </Button>
      <Button onPress={() => navigation.navigate("Map")}>
        <ButtonText>Go to Map</ButtonText>
      </Button>
    </View>
  );
};

export default ScanScreen;
