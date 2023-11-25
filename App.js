import { config } from "@gluestack-ui/config";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { NavigationContainer } from "@react-navigation/native";
import Routes from "./app/routes";
import AuthContextProvider from "./app/context/auth-context";

export default function App() {
  return (
    <GluestackUIProvider config={config}>
      <AuthContextProvider>
        <NavigationContainer>
          <Routes />
        </NavigationContainer>
      </AuthContextProvider>
    </GluestackUIProvider>
  );
}
