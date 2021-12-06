import React, { useState } from "react";
import { Alert, Button, Flex, Input, ScrollView, Text, VStack } from "native-base";
import { useDispatch, useSelector } from "react-redux";
import { selectAuth } from "../../redux/auth/auth-reducer";

import { AUTH_ACTION_CREATORS } from "../../redux/auth/auth-action-creators";

const ChangePasswordScreen = ({ navigation }) => {


  const { authToken, authLoading, authError } = useSelector(selectAuth);
  const [password, setPassword] = useState("");
  const [error, setError] = useState({});
  const [confirmPassword, setConfirmPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");

  const dispatch = useDispatch();

  const handlePasswordChange = () => {
    if (!currentPassword) {
      setError({error, currentPassword:"Field required"});
      return;
    } else {
      setError({error, currentPassword:""});
    }

    if (!password) {
      setError({error, password:"Field required"});
      return;
    } else {
      setError({error, password:"Field required"});
    }

    if (!confirmPassword) {
      setError({error, confirmPassword:"Field required"});
      return;
    } else {
      setError({error, confirmPassword:"Field required"});
    }

    if (confirmPassword !== password) {
      setError({error, password:"Passwords don't match", confirmPassword: "Passwords don't match"});
      return;
    } else {
      setError({error, password:null, confirmPassword: null});
    }

    dispatch(AUTH_ACTION_CREATORS.changePassword({ currentPassword, password }, authToken, navigation));
  };
  return (
    <Flex
      backgroundColor="white"
      flex={1}
      height="100%"
      width="100%"
      alignItems="center"
      justifyContent="center">
      <ScrollView width="100%" height="100%" p={4}>

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
          isFullWidth={true}
          size="lg"
          width="100%"
          value={currentPassword}
          placeholder="Enter current password"
          variant="filled"
          alignSelf="stretch"
          isRequired={true}
          backgroundColor="gray.50"
          pt={3}
          pb={3}
          type="password"
          borderRadius={32}
          name="currentPassword"
          onChangeText={currentPassword => setCurrentPassword(currentPassword)}
        />
        {error.currentPassword && <Text color="red.400">{error.currentPassword}</Text>}

        <Input
          mb={1}
          mt={2}
          isFullWidth={true}
          size="lg"
          width="100%"
          borderRadius={32}
          value={password}
          placeholder="Enter new password"
          variant="filled"
          backgroundColor="gray.50"
          alignSelf="stretch"
          isRequired={true}
          pt={3}
          pb={3}
          type="password"
          name="password"
          onChangeText={password => setPassword(password)}
        />
        {error.password && <Text color="red.400">{error.password}</Text>}

        <Input
          mb={1}
          isFullWidth={true}
          size="lg"
          width="100%"
          value={confirmPassword}
          placeholder="Confirm password"
          variant="filled"
          alignSelf="stretch"
          backgroundColor="gray.50"
          isRequired={true}
          pt={3}
          mt={2}
          pb={3}
          borderRadius={32}
          type="password"
          name="confirmPassword"
          onChangeText={confirmPassword => setConfirmPassword(confirmPassword)}
        />
        {error.confirmPassword && <Text color="red.400">{error.confirmPassword}</Text>}

        <Button
          onPress={handlePasswordChange}
          pt={3}
          isLoading={authLoading}
          isLoadingText="Updating Password..."
          _loading={{
            backgroundColor: "primary.200",
          }}
          pb={3}
          mt={8}
          width="100%"
          backgroundColor="primary.800"
          borderRadius={32}
          _text={{ fontFamily: "body", textTransform: "uppercase", fontSize: "lg", color: "white" }}
          alignSelf="stretch"
          size="lg"
          variant="solid">
          <Text fontSize="md" color="white">
            Update Profile
          </Text>
        </Button>
      </ScrollView>
    </Flex>
  );
};

export default ChangePasswordScreen;
