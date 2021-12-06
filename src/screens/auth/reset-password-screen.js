import React, { useState } from "react";
import { Button, Center, Flex, Icon, Input, Text } from "native-base";
import { useDispatch, useSelector } from "react-redux";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { AUTH_ACTION_CREATORS } from "../../redux/auth/auth-action-creators";
import { SCREEN_NAME_CONSTANTS } from "../../constants/constants";
import { selectAuth } from "../../redux/auth/auth-reducer";

const ResetPasswordScreen = ({ navigation }) => {

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState({});

  const { authLoading, authToken, authError } = useSelector(selectAuth);

  const dispatch = useDispatch();

  const handleResetPassword = () => {
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

    if (confirmPassword !== password) {
      setError({ error, confirmPassword: "Passwords do not match", password: "Passwords do not match" });
      return;
    } else {
      setError({ error, confirmPassword: null, password: null });
    }

    dispatch(AUTH_ACTION_CREATORS.resetPassword({ password }, authToken, navigation));
  };
  return (
    <Flex
      backgroundColor="white"
      height="100%"
      width="100%"
      alignItems="center"
      justifyContent="center">
      <Center width="100%">

        <Text fontSize="2xl" mb={2}>Reset Password</Text>
        <Text mb={4}>
          Create a secure password to protect your account information
        </Text>
        <Input
          mb={1}
          borderRadius={32}
          isFullWidth={true}
          placeholder="Enter Password"
          size="lg"
          value={password}
          name="password"
          pt={3}
          pb={3}
          onChangeText={password => setPassword(password)}
          InputRightElement={
            <Icon
              as={MaterialIcons}
              mr={4}
              size={25}
              onPress={() => setIsPasswordVisible(!isPasswordVisible)}
              name={isPasswordVisible ? "visibility-off" : "visibility"}
            />
          }
          isRequired={true}
          variant="outline"
          type={isPasswordVisible ? "text" : "password"}
        />
        {error.password && <Text textAlign="center" color="red.400">{error.password}</Text>}

        <Input
          mt={2}
          mb={1}
          borderRadius={32}
          isFullWidth={true}
          placeholder="Confirm Password"
          size="lg"
          value={confirmPassword}
          name="confirmPassword"
          pt={3}
          pb={3}
          onChangeText={confirmPassword => setConfirmPassword(confirmPassword)}
          InputRightElement={
            <Icon
              as={MaterialIcons}
              mr={4}
              size={25}
              onPress={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}
              name={isConfirmPasswordVisible ? "visibility-off" : "visibility"}
            />
          }
          isRequired={true}
          variant="outline"
          type={isConfirmPasswordVisible ? "text" : "password"}
        />
        {error.confirmPassword && <Text textAlign="center" color="red.400">{error.confirmPassword}</Text>}

        <Button
          mt={4}
          isLoading={authLoading}
          isLoadingText="Resetting Password..."
          onPress={handleResetPassword}
          backgroundColor="primary.600"
          _loading={{
            backgroundColor: "primary.200",
            color: "white",
          }}
          pt={4}
          pb={4}
          borderRadius={32}
          _text={{ textTransform: "uppercase" }}
          mb={4}
          alignSelf="stretch"
          size="lg"
          variant="solid">
          <Text color={authLoading ? "gray.600" : "white"} fontSize="md">Reset Password</Text>
        </Button>

        <Button
          onPress={() => navigation.push(SCREEN_NAME_CONSTANTS.SIGN_IN_SCREEN)}
          pt={3}
          pb={3}
          borderRadius={32}
          textColor="gray.400"
          alignSelf="stretch"
          size="lg"
          variant="link">Already have an account? Sign In</Button>
      </Center>
    </Flex>
  );
};

export default ResetPasswordScreen;
