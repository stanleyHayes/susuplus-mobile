import React, { useEffect } from "react";
import { Center, Flex, Image,  StatusBar, Text } from "native-base";
import susuplusIcon from "../../assets/images/plus.png";
import NavigationBar from "react-native-navbar-color";

const SplashScreen = () => {
    
    useEffect(() => {
        NavigationBar.setColor("#155e75");
    }, []);
    
  return (
    <Flex
      backgroundColor="primary.800"
      width="100%"
      height="100%"
      alignItems="center"
      justifyContent="center">
      <StatusBar backgroundColor="#164e63" />
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
          fontSize="4xl"
          color="white"
          width="100%"
          fontFamily="body"
          textAlign="center"
          textTransform="uppercase">
          Susu+
        </Text>
      </Center>
    </Flex>
  );
};

export default SplashScreen;
