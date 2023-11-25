import React from "react";
import {
  AlertCircleIcon,
  Box,
  Button,
  ButtonText,
  Center,
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  FormControlHelper,
  FormControlHelperText,
  Heading,
  Input,
  InputField,
  Text,
} from "@gluestack-ui/themed";
import { useAuth } from "../context/auth-context";

const LoginScreen = ({ navigation }) => {
  const { login } = useAuth();

  const [username, setUsername] = React.useState("");
  const [invalidUsername, setInvalidUsername] = React.useState(false);

  const _handleLogin = async () => {
    if (!username || username.length <= 6) {
      setInvalidUsername(true);
      return;
    }
    await login(username);
    navigation.navigate("Map");
  };

  return (
    <Box height='$full' backgroundColor='$blue400'>
      <Center height='50%' margin='$10' padding='$5' backgroundColor='$white' gap='$5' rounded='$lg'>
        <Heading size='3xl' textAlign='center'>
          WasteWiz 🧙
        </Heading>
        <Text textAlign='center' paddingBottom='$5'>
          Welcome to WasteWiz! Please enter your wizard name to continue.
        </Text>
        <FormControl
          width='$full'
          size='md'
          isDisabled={false}
          isInvalid={invalidUsername}
          isReadOnly={false}
          isRequired={true}>
          <Input>
            <InputField type='text' placeholder='Wizard name' onChangeText={(t) => setUsername(t)} />
          </Input>
          <FormControlHelper>
            <FormControlHelperText>Must be at least 6 characters.</FormControlHelperText>
          </FormControlHelper>
          <FormControlError>
            <FormControlErrorIcon as={AlertCircleIcon} />
            <FormControlErrorText>At least 6 characters are required.</FormControlErrorText>
          </FormControlError>
        </FormControl>
        <Button size='lg' width='$full' onPress={_handleLogin}>
          <ButtonText>Continue</ButtonText>
        </Button>
      </Center>
    </Box>
  );
};

export default LoginScreen;
