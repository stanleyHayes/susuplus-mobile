import React from "react";
import { Center, Flex, Image, Spinner, Text } from "native-base";
import susuplusIcon from "../../assets/images/plus.png";

const SplashScreen = () => {
  return (
    <Flex
      backgroundColor="primary.800"
      width="100%"
      height="100%"
      alignItems="center"
      justifyContent="center">
      <Center flex={1}>
        <Center width="100%">
          <Image
              borderRadius={100}
              height={100}
              width={100}
              objectFit="cover"
              objectPosition="center"
              alt="susu plus icon"
              source={susuplusIcon} />
        </Center>
        <Text
          fontSize="5xl"
          mb={2}
          color="white"
          width="100%"
          fontFamily="body"
          textAlign="center"
          textTransform="capitalize">
          Susu+
        </Text>
        <Spinner mb={2} size={50} color="white"  />
        <Text
          fontSize="md"
          color="white"
          textAlign="center">
          Please wait...
        </Text>
      </Center>
    </Flex>
  );
};

export default SplashScreen;
