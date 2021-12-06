import React, { useState } from "react";
import {
  Button,
  Icon,
  Flex,
  Input,
  Text,
  Alert,
  VStack,
} from "native-base";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { SCREEN_NAME_CONSTANTS } from "../../constants/constants";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../../redux/auth/auth-action-creators";
import { selectAuth } from "../../redux/auth/auth-reducer";
import validator from "validator";

const SignInScreen = ({ navigation }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const { authLoading, authError } = useSelector(selectAuth);
  const dispatch = useDispatch();


  const handleSignIn = () => {
    if (!email) {
      setEmailError("Email field required");
      return;
    } else {
      setEmailError(null);
    }

    if (!validator.isEmail(email)) {
      setEmailError("Invalid email");
      return;
    } else {
      setEmailError(null);
    }

    if (!password) {
      setPasswordError("Field required");
      return;
    } else {
      setPasswordError(null);
    }

    dispatch(signIn({ email, password }, navigation));
  };

  return (
    <Flex
      height="100%"
      width="100%"
      flex={1}
      p={4}
      backgroundColor="white"
      alignItems="center"
      justifyContent="center">
      {/*{authLoading &&*/}
      {/*<Center pt={4} width="100%" height="100%">*/}
      {/*  <Spinner*/}
      {/*    position="absolute"*/}
      {/*    width="50%"*/}
      {/*    height="50%"*/}
      {/*    size="lg"*/}
      {/*    color="secondary.500"*/}
      {/*  />*/}
      {/*</Center>}*/}

      {authError && (
        <Alert p={3} width="100%" status="error" borderRadius={32} variant="left-accent">
          <VStack alignItems="center" width="100%" space={2}>
            <Alert.Icon size="lg" />
            <Text color="red.600" textAlign="center" fontSize="lg">Error</Text>
            <Text textAlign="center" fontSize="md" color="red.600">{authError}</Text>
          </VStack>
        </Alert>
      )}

      <Text
        fontSize="4xl"
        mb={4}
        color="gray.600"
        width="100%"
        textAlign="center"
        textTransform="uppercase">
        Susu+
      </Text>

      <Text
        fontSize="2xl"
        mb={8}
        color="gray.500"
        width="100%"
        textAlign="center"
        textTransform="uppercase">
        Welcome Back
      </Text>

      <Input
        mb={1}
        isFullWidth={true}
        size="lg"
        borderRadius={32}
        value={email}
        _focus={{borderColor: 'gray.100'}}
        _invalid={{borderColor: 'red.400'}}
        placeholder="Enter Email"
        variant="filled"
        isInvalid={Boolean(emailError)}
        alignSelf="stretch"
        isRequired={true}
        pt={3}
        pb={3}
        backgroundColor="gray.50"
        type="email"
        name="email"
        onChangeText={email => setEmail(email)}
      />
      {emailError && <Text color="red.400">{emailError}</Text> }

      <Input
        mt={2}
        mb={1}
        isFullWidth={true}
        placeholder="Enter Password"
        size="lg"
        value={password}
        name="password"
        _focus={{borderColor: 'gray.100'}}
        _invalid={{borderColor: 'red.400'}}
        pt={3}
        pb={3}
        backgroundColor="gray.50"
        borderRadius={32}
        onChangeText={password => setPassword(password)}
        InputRightElement={
          <Icon
            color="gray.600"
            as={MaterialIcons}
            mr={4}
            size={25}
            onPress={() => setIsVisible(!isVisible)}
            name={isVisible ? "visibility-off" : "visibility"}
          />
        }
        isRequired={true}
        variant="filled"
        type={isVisible ? "text" : "password"}
      />
      {passwordError && <Text color="red.400">{passwordError}</Text> }

      <Button
        mt={4}
        borderRadius={32}
        onPress={() => navigation.push(SCREEN_NAME_CONSTANTS.FORGOT_PASSWORD_SCREEN)}
        pt={3}
        pb={3}
        alignSelf="stretch"
        size="lg"
        mb={4}
        _text={{ textTransform: "uppercase", color: "gray.500" }}
        variant="link">
        <Text fontSize="lg">
          Forgot Password
        </Text>
      </Button>

      <Button
        onPress={handleSignIn}
        pt={4}
        pb={4}
        mb={4}
        isLoading={authLoading}
        isLoadingText="Signing in..."
        backgroundColor="primary.800"
        borderRadius={32}
        _text={{ textTransform: "uppercase", fontSize: "lg", color: "white" }}
        alignSelf="stretch"
        size="lg"
        variant="solid">
        <Text color="white" fontSize="md">
          Sign In
        </Text>
      </Button>

      <Button
        onPress={() => navigation.push(SCREEN_NAME_CONSTANTS.SIGN_UP_SCREEN)}
        pt={3}
        pb={3}
        borderRadius={0}
        alignSelf="stretch"
        size="lg"
        _text={{ textTransform: "uppercase", color: "gray.500" }}
        variant="link">
        <Text fontSize="lg">
          Don't have an account? Register
        </Text>
      </Button>
    </Flex>
  );
};

export default SignInScreen;
