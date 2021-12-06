import React from "react";
import { Center, Flex, Spinner, Text } from "native-base";

const SplashScreen = () => {
  return (
    <Flex
      backgroundColor="white"
      width="100%"
      height="100%"
      alignItems="center"
      justifyContent="center">
      <Center flex={1}>
        <Text
          fontSize="4xl"
          mb={16}
          color="gray.800"
          width="100%"
          fontFamily="body"
          textAlign="center"
          textTransform="capitalize">
          Susu+
        </Text>
        <Spinner mb={16} size="lg" verticalAlign="center" />
        <Text
          fontSize="sm"
          color="gray.800"
          textAlign="center">
          Please wait...
        </Text>
      </Center>
    </Flex>
  );
};

export default SplashScreen;
