import React, { useState } from "react";
import { Box, Button, Center, Flex, Icon, Image, Input, StatusBar, Text } from "native-base";
import { useDispatch, useSelector } from "react-redux";
import { AUTH_ACTION_CREATORS } from "../../redux/auth/auth-action-creators";
import susuplusIcon from "../../assets/images/plus.png";
import { selectAuth } from "../../redux/auth/auth-reducer";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const VerifyOTPScreen = ({ navigation }) => {
    
    const [otp, setOTP] = useState("");
    const [error, setError] = useState({});
    
    const {signUpToken, authLoading} = useSelector(selectAuth);
    
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
    
                <Text textAlign="center" fontSize="xs" color="muted.500" mb={3}>
                    Enter OTP sent to the email you provided
                </Text>
    
                
                <Input
                    mb={1}
                    borderBottomLeftRadius={0}
                    borderTopRightRadius={0}
                    borderBottomRightRadius={16}
                    borderTopLeftRadius={16}
                    isFullWidth={true}
                    placeholder="Enter OTP"
                    size="md"
                    value={otp}
                    name="otp"
                    onChangeText={otp => setOTP(otp)}
                    isRequired={true}
                    variant="outline"
                    keyboardType="numeric"
                    placeholderTextColor="primary.600"
                    borderColor="primary.100"
                    _focus={{borderColor: 'primary.200'}}
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
                    backgroundColor='primary.600'
                    mt={4}
                    borderBottomLeftRadius={0}
                    borderTopRightRadius={0}
                    borderBottomRightRadius={16}
                    borderTopLeftRadius={16}
                    mb={4}
                    py={3}
                    isLoadingText="Verifying Account..."
                    isLoading={authLoading}
                    isDisabled={authLoading}
                    alignSelf="stretch"
                    _text={{fontSize: 'xs', color: 'white'}}
                    variant="solid">
                    Verify Account
                </Button>
            </Box>
        </Flex>
    );
};

export default VerifyOTPScreen;
