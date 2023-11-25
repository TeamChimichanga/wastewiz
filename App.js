import { config } from "@gluestack-ui/config";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { NavigationContainer } from "@react-navigation/native";
import Routes from "./app/routes";
import AuthContextProvider from "./app/context/auth-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-gesture-handler";

export default function App() {
  const screenOptions = {
    headerShown: true,
    safeAreaInsets: { top: 0 },
  };

  return (
    <GluestackUIProvider config={config}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <AuthContextProvider>
          <NavigationContainer screenOptions={screenOptions}>
            <Routes />
          </NavigationContainer>
        </AuthContextProvider>
      </GestureHandlerRootView>
    </GluestackUIProvider>
  );
}
