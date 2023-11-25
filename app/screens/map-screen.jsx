import { View, Text } from "react-native";
import React from "react";
import { Button, ButtonText } from "@gluestack-ui/themed";
import { useAuth } from "../context/auth-context";

const MapScreen = ({ navigation }) => {
  const { user } = useAuth();
  return (
    <View>
      <Text>MapScreen</Text>
      <Text>{JSON.stringify(user)}</Text>
      <Button onPress={() => navigation.navigate("Login")}>
        <ButtonText>Go to Login</ButtonText>
      </Button>
      <Button onPress={() => navigation.navigate("Scan")}>
        <ButtonText>Go to Scan</ButtonText>
      </Button>
    </View>
  );
};

export default MapScreen;
