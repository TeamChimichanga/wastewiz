import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/login-screen";
import MapScreen from "./screens/map-screen";
import ScanScreen from "./screens/scan-screen";
import { useAuth } from "./context/auth-context";

const Stack = createNativeStackNavigator();

const Routes = () => {
  const { loggedIn } = useAuth();

  return (
    <Stack.Navigator>
      {loggedIn ? (
        <>
          <Stack.Screen name='Map' component={MapScreen} />
          <Stack.Screen name='Scan' component={ScanScreen} />
        </>
      ) : (
        <Stack.Screen name='Login' component={LoginScreen} />
      )}
    </Stack.Navigator>
  );
};

export default Routes;
