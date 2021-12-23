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
              height={120}
              width={120}
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
      </Center>
    </Flex>
  );
};

export default SplashScreen;
