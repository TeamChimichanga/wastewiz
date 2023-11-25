import React from "react";
import LoginScreen from "./screens/login-screen";
import MapScreen from "./screens/map-screen";
import ScanScreen from "./screens/scan-screen";
import { useAuth } from "./context/auth-context";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

const Routes = () => {
  const { loggedIn } = useAuth();

  return (
    <Stack.Navigator>
      {loggedIn ? (
        <>
          <Stack.Screen name='Map' options={{ title: "WasteWiz 🧙" }} component={MapScreen} />
          <Stack.Screen name='Scan' options={{ title: "WasteWiz 🧙" }} component={ScanScreen} />
        </>
      ) : (
        <Stack.Screen name='Login' component={LoginScreen} />
      )}
    </Stack.Navigator>
  );
};

export default Routes;
