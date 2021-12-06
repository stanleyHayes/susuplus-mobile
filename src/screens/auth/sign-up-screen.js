import React, { useState } from "react";
import {
  Alert,
  Button,
  Center,
  Flex,
  Icon,
  Input,
  ScrollView,
  Spinner,
  Text,
  VStack,
} from "native-base";
import { useDispatch, useSelector } from "react-redux";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { signUp } from "../../redux/auth/auth-action-creators";
import { SCREEN_NAME_CONSTANTS } from "../../constants/constants";
import { selectAuth } from "../../redux/auth/auth-reducer";
import validator from "validator";

const SignUpScreen = ({ navigation }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const [error, setError] = useState({});

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");
  const { authLoading, authError } = useSelector(selectAuth);

  const dispatch = useDispatch();

  const handleSignUp = () => {
    if (!name) {
      setError({ error, name: "Field required" });
      return;
    } else {
      setError({ error, name: null });
    }

    if (!email) {
      setError({ error, email: "Field required" });
      return;
    } else {
      setError({ error, email: null });
    }

    if (!validator.isEmail(email)) {
      setError({ error, email: "Invalid email" });
      return;
    } else {
      setError({ error, email: null });
    }

    if (!password) {
      setError({ error, password: "Field required" });
      return;
    } else {
      setError({ error, password: null });
    }

    if (!confirmPassword) {
      setError({ error, confirmPassword: "Field required" });
      return;
    } else {
      setError({ error, confirmPassword: null });
    }

    if (password !== confirmPassword) {
      setError({ error, password: "Passwords don't match", confirmPassword: "Passwords don't match" });
      return;
    } else {
      setError({ error, confirmPassword: null, password: null });
    }
    dispatch(signUp({ email, name, password, phone, role: "USER" }, navigation));
  };

  return (
    <Flex
      backgroundColor="white"
      height="100%"
      width="100%"
      flex={1}
      p={5}
      alignItems="center"
      justifyContent="center">
      <ScrollView width="100%">
        {authLoading &&
        <Center pt={4} width="100%" height="100%">
          <Spinner
            position="absolute"
            width="50%"
            height="50%"
            size="lg"
            color="secondary.500"
          />
        </Center>}

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
          fontSize="xl"
          mb={8}
          color="gray.700"
          width="100%"
          textAlign="center"
          textTransform="capitalize">
          Sign Up
        </Text>

        <Input
          mb={2}
          mt={2}
          isFullWidth={true}
          size="lg"
          value={name}
          isInvalid={Boolean(error.name)}
          placeholder="Enter Name"
          _focus={{borderColor: 'gray.100'}}
          variant="filled"
          alignSelf="stretch"
          isRequired={true}
          pt={3}
          pb={3}
          borderRadius={32}
          type="name"
          name="name"
          onChangeText={text => setName(text)}
          color="gray.800"
          backgroundColor="gray.50"
        />
        {error.name && <Text color="red.400">{error.name}</Text>}

        <Input
          mb={2}
          mt={2}
          isFullWidth={true}
          size="lg"
          isInvalid={Boolean(error.email)}
          value={email}
          placeholder="Enter Email"
          variant="filled"
          alignSelf="stretch"
          isRequired={true}
          pt={3}
          pb={3}
          borderRadius={32}
          _focus={{borderColor: 'gray.100'}}
          type="email"
          name="email"
          backgroundColor="gray.50"
          onChangeText={email => setEmail(email)}
          color="gray.800"
        />
        {error.email && <Text color="red.400">{error.email}</Text>}

        <Input
          mb={2}
          mt={2}
          isFullWidth={true}
          size="lg"
          value={phone}
          isInvalid={Boolean(error.phone)}
          placeholder="Enter phone"
          variant="filled"
          alignSelf="stretch"
          isRequired={true}
          pt={3}
          _focus={{borderColor: 'gray.100'}}
          pb={3}
          borderRadius={32}
          type="tel"
          name="phone"
          backgroundColor="gray.50"
          onChangeText={phone => setPhone(phone)}
          color="gray.800"
        />
        {error.phone && <Text color="red.400">{error.phone}</Text>}

        <Input
          mb={2}
          mt={2}
          isFullWidth={true}
          placeholder="Enter Password"
          size="lg"
          value={password}
          _focus={{borderColor: 'gray.100'}}
          isInvalid={Boolean(error.password)}
          name="password"
          pt={3}
          pb={3}
          onChangeText={password => setPassword(password)}
          InputRightElement={
            <Icon
              color="gray.700"
              as={MaterialIcons}
              mr={4}
              size={25}
              onPress={() => setIsPasswordVisible(!isPasswordVisible)}
              name={isPasswordVisible ? "visibility-off" : "visibility"}
            />
          }
          color="gray.800"
          borderRadius={32}
          isRequired={true}
          variant="filled"
          backgroundColor="gray.50"
          type={isPasswordVisible ? "text" : "password"}
        />
        {error.password && <Text color="red.400">{error.password}</Text>}

        <Input
          mb={2}
          mt={2}
          isFullWidth={true}
          placeholder="Confirm Password"
          size="lg"
          _focus={{borderColor: 'gray.100'}}
          isInvalid={Boolean(error.confirmPassword)}
          value={confirmPassword}
          name="confirmPassword"
          pt={3}
          pb={3}
          borderRadius={32}
          onChangeText={confirmPassword => setConfirmPassword(confirmPassword)}
          InputRightElement={
            <Icon
              color="gray.800"
              as={MaterialIcons}
              mr={4}
              size={25}
              onPress={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}
              name={isConfirmPasswordVisible ? "visibility-off" : "visibility"}
            />
          }
          color="gray.800"
          isRequired={true}
          variant="filled"
          backgroundColor="gray.50"
          type={isConfirmPasswordVisible ? "text" : "password"}
        />
        {error.confirmPassword && <Text color="red.400">{error.confirmPassword}</Text>}

        <Button
          mt={2}
          onPress={handleSignUp}
          pt={3}
          isLoading={authLoading}
          isLoadingText="Signing up..."
          backgroundColor="primary.800"
          pb={3}
          _text={{ textTransform: "uppercase", fontSize: "lg", color: "white" }}
          mb={4}
          borderRadius={32}
          alignSelf="stretch"
          variant="solid">
          <Text color="white" textColor="white" fontSize="md">
            Sign Up
          </Text>
        </Button>

        <Button
          onPress={() => navigation.push(SCREEN_NAME_CONSTANTS.SIGN_IN_SCREEN)}
          pt={3}
          pb={3}
          _text={{ color: "gray.500", textTransform: "uppercase" }}
          alignSelf="stretch"
          size="md"
          variant="link">
          <Text fontSize="lg">
            Already have an account? Sign In
          </Text>
        </Button>
      </ScrollView>
    </Flex>
  );
};

export default SignUpScreen;
