import React, { useState } from "react";
import { Box, Button, Center, Flex, Icon, Image, Input, Text } from "native-base";
import { useDispatch, useSelector } from "react-redux";
import { AUTH_ACTION_CREATORS } from "../../redux/auth/auth-action-creators";
import susuplusIcon from "../../assets/images/plus.png";
import { selectAuth } from "../../redux/auth/auth-reducer";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const VerifyOTPScreen = ({ navigation }) => {
    
    const [otp, setOTP] = useState("");
    const [error, setError] = useState({});
    
    const {signUpToken} = useSelector(selectAuth);
    
    const dispatch = useDispatch();
    
    const handleResetPassword = () => {
        if (!otp) {
            setError({ error, otp: "Field required" });
            return;
        } else {
            setError({ error, otp: null });
        }
        
        dispatch(AUTH_ACTION_CREATORS.verifyAccount({ otp }, signUpToken, navigation));
    };
    return (
        <Flex
            width="100%"
            flex={1}
            backgroundColor="primary.800"
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
                    color="white"
                    width="100%"
                    textAlign="center"
                    textTransform="capitalize">
                    Susu Plus
                </Text>
                
                <Text
                    mb={2}
                    fontSize="2xl"
                    color="white"
                    width="100%"
                    textAlign="center"
                    textTransform="capitalize">
                    Verify Account
                </Text>
            </Center>
            <Box
                backgroundColor="white"
                shadow={0}
                p={5}
                borderTopLeftRadius={32}
                borderTopRightRadius={32}>
    
                <Text textAlign="center" color="darkText" mb={3}>
                    Enter OTP sent to the email you provided
                </Text>
    
                
                <Input
                    mb={1}
                    borderRadius={32}
                    isFullWidth={true}
                    placeholder="Enter OTP"
                    size="lg"
                    value={otp}
                    name="otp"
                    p={4}
                    onChangeText={otp => setOTP(otp)}
                    isRequired={true}
                    variant="filled"
                    autoComplete="sms-otp"
                    placeholderTextColor="primary.600"
                    borderColor="primary.100"
                    backgroundColor="white"
                    borderWidth={1}
                    InputLeftElement={
                        <Icon
                            color="primary.400"
                            as={<MaterialIcons name="lock-outline" />}
                            ml={2}
                            size={25}
                        />
                    }
                />
                
                <Button
                    onPress={handleResetPassword}
                    backgroundColor="primary.700"
                    pt={4}
                    mt={4}
                    pb={4}
                    borderRadius={32}
                    mb={4}
                    alignSelf="stretch"
                    size="lg"
                    variant="solid">
                    <Text color="white" fontSize="md">Verify Account</Text>
                </Button>
            </Box>
        </Flex>
    );
};

export default VerifyOTPScreen;
