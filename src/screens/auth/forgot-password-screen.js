import React, { useState } from "react";
import { Alert, Button, Flex, Icon, Input, Text, VStack } from "native-base";
import { useDispatch, useSelector } from "react-redux";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { SCREEN_NAME_CONSTANTS } from "../../constants/constants";
import validator from "validator";
import { selectAuth } from "../../redux/auth/auth-reducer";
import { AUTH_ACTION_CREATORS } from "../../redux/auth/auth-action-creators";

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState({});

  const { authLoading, authError } = useSelector(selectAuth);

  const dispatch = useDispatch();

  const handleClick = () => {
    if (!email) {
      setError({ error, email: "Field required" });
      return;
    } else {
      setError({ email: null });
    }

    if (!validator.isEmail(email)) {
      setError({ error, email: "Invalid Email" });
      return;
    } else {
      setError({ email: null });
    }
    dispatch(AUTH_ACTION_CREATORS.forgotPassword(email, navigation));
  };

  return (
    <Flex
      backgroundColor="white"
      height="100%"
      width="100%"
      alignItems="center"
      p={4}
      justifyContent="center">
      <Button
        onPress={() => navigation.push(SCREEN_NAME_CONSTANTS.SIGN_IN_SCREEN)}
        pt={3}
        mb={4}
        pb={3}
        borderRadius={32}
        alignSelf="flex-start"
        size="lg"
        startIcon={<Icon as={MaterialIcons} size="md" name="chevron-left" />}
        _text={{ textTransform: "uppercase", color: "gray.700" }}
        variant="link">
        <Text fontSize="lg">
          Back
        </Text>
      </Button>

      <Text
        mb={8}
        width="100%"
        fontSize="2xl"
        textTransform="uppercase"
        color="gray.700"
        textAlign="center">
        Forgot Password
      </Text>

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
        mb={8}
        width="100%"
        color="gray.700"
        fontSize="md"
        fontFamily="body"
        textAlign="center">
        Please enter the email associated with your account to receive a reset link
      </Text>

      <Input
        mb={1}
        isFullWidth={true}
        size="lg"
        borderRadius={32}
        value={email}
        placeholder="Enter Email"
        variant="filled"
        alignSelf="stretch"
        isRequired={true}
        pt={3}
        pb={3}
        type="email"
        name="email"
        backgroundColor="gray.50"
        onChangeText={email => setEmail(email)}
      />
      {error.email && <Text color="red.400">{error.email}</Text>}

      <Button
        onPress={handleClick}
        pt={4}
        borderRadius={32}
        pb={4}
        mt={8}
        _loading={{ backgroundColor: "primary.200" }}
        isLoading={authLoading}
        isLoadingText="Sending Reset Link"
        backgroundColor="primary.800"
        _text={{ textTransform: "uppercase" }}
        mb={4}
        alignSelf="stretch"
        size="lg"
        variant="solid">
        <Text color="white" fontSize="md">
          Get Reset Link
        </Text>
      </Button>
    </Flex>
  );
};

export default ForgotPasswordScreen;
