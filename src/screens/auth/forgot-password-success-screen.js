import React from "react";
import { Button, Center, Flex, Text } from "native-base";
import { SCREEN_NAME_CONSTANTS } from "../../constants/constants";

const ForgotPasswordSuccessScreen = ({ navigation }) => {

  console.log('forgot password success screen')
  return (
    <Flex flex={1} backgroundColor="white" alignItems="center" justifyItems="center">
      <Center>
        <Text mb={3} fontSize="md" textAlign="center" color="gray.700">
          A resent link has been sent to the email you provided together with an OTP
        </Text>
        <Button onPress={() => navigation.navigate(SCREEN_NAME_CONSTANTS.RESET_PASSWORD_SCREEN)}>
          <Text textColor="white" fontSize="md">Go to Password Reset</Text>
        </Button>
      </Center>
    </Flex>
  );
};

export default ForgotPasswordSuccessScreen;
