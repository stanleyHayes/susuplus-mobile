import React, { useState } from "react";
import { Alert, Box, Button, Flex, Input, Text, VStack } from "native-base";
import { useDispatch, useSelector } from "react-redux";
import { AUTH_ACTION_CREATORS } from "../../redux/auth/auth-action-creators";
import { selectAuth } from "../../redux/auth/auth-reducer";

const VerifyOTPScreen = ({ navigation }) => {

  const [otp, setOTP] = useState("");
  const [error, setError] = useState({});
  const { authToken, authLoading, authError } = useSelector(selectAuth);

  const dispatch = useDispatch();

  const handleResetPassword = () => {
    if (!otp) {
      setError({ error, otp: "Field required" });
      return;
    } else {
      setError({ error, otp: null });
    }

    dispatch(AUTH_ACTION_CREATORS.verifyAccount({ otp }, authToken, navigation));
  };
  return (
    <Flex
      backgroundColor="white"
      height="100%"
      width="100%"
      alignItems="center"
      justifyContent="center">
      <Box p={4} width="100%">
        <Text mb={2} fontSize="2xl">Verify Account</Text>
        <Text mb={4}>
          Enter OTP sent to the email you provided
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
        <Input
          mb={1}
          borderRadius={32}
          isFullWidth={true}
          placeholder="Enter OTP"
          size="lg"
          value={otp}
          name="otp"
          pt={3}
          pb={3}
          onChangeText={otp => setOTP(otp)}
          isRequired={true}
          variant="filled"
          backgroundColor="gray.50"
          type="text"
        />
        {error.otp && <Text color="red.400">{error.otp}</Text>}

        <Button
          onPress={handleResetPassword}
          backgroundColor={authLoading ? "primary.200" : "primary.600"}
          _loading={{
            backgroundColor: "primary.200",
          }}
          pt={4}
          mt={4}
          pb={4}
          borderRadius={32}
          _text={{ textTransform: "uppercase" }}
          mb={4}
          alignSelf="stretch"
          size="lg"
          variant="solid">
          <Text textColor={authLoading ? "gray.700" : "white"} fontSize="md">Verify Account</Text>
        </Button>
      </Box>
    </Flex>
  );
};

export default VerifyOTPScreen;
