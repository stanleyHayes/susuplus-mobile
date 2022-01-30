import React from "react";
import { Button, Center, Flex, Image, StatusBar, Text } from "native-base";
import { SCREEN_NAME_CONSTANTS } from "../../constants/constants";
import susuplusIcon from "../../assets/images/plus.png";

const ForgotPasswordSuccessScreen = ({ navigation }) => {
  
  return (
    <Flex p={5} flex={1} backgroundColor="white">
      <StatusBar backgroundColor="#155e75" />
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
            color="darkText"
            width="100%"
            fontFamily="body"
            textAlign="center"
            textTransform="capitalize">
          Susu Plus
        </Text>
        
        <Text mb={6} fontSize="sm" textAlign="center" color="muted.500">
          A resent link has been sent to the email you provided together with an OTP
        </Text>
        <Button
            width="100%"
            backgroundColor="primary.600"
            py={2}
            borderBottomLeftRadius={0}
            borderTopRightRadius={0}
            borderBottomRightRadius={16}
            borderTopLeftRadius={16}
            _text={{color: 'white', fontSize: 'xs'}}
            onPress={() => navigation.navigate(SCREEN_NAME_CONSTANTS.RESET_PASSWORD_SCREEN)}>
          Go to Password Reset
        </Button>
      </Center>
    </Flex>
  );
};

export default ForgotPasswordSuccessScreen;
