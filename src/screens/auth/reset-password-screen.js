import React, { useState } from "react";
import { Box, Button, Center, Flex, Icon, Image, Input, StatusBar, Text } from "native-base";
import { useDispatch, useSelector } from "react-redux";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { AUTH_ACTION_CREATORS } from "../../redux/auth/auth-action-creators";
import { SCREEN_NAME_CONSTANTS } from "../../constants/constants";
import { selectAuth } from "../../redux/auth/auth-reducer";
import susuplusIcon from "../../assets/images/plus.png";

const ResetPasswordScreen = ({ navigation }) => {
    
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState({});
    
    const { authLoading, resetPasswordToken } = useSelector(selectAuth);
    
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
        
        dispatch(AUTH_ACTION_CREATORS.resetPassword({ password }, resetPasswordToken, navigation));
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
                    fontSize="2xl"
                    color="white"
                    width="100%"
                    mb={2}
                    textAlign="center"
                    textTransform="capitalize">
                    Reset Password
                </Text>
    
                <Text
                    fontSize="sm"
                    color="white"
                    width="100%"
                    textAlign="center"
                    textTransform="capitalize">
                    Create a secured password to protect your data
                </Text>
            </Center>
            
            <Box
                backgroundColor="white"
                shadow={0}
                p={5}
                borderTopLeftRadius={32}
                borderTopRightRadius={32}>
    
    
                <Input
                    mt={2}
                    mb={1}
                    px={4}
                    borderBottomLeftRadius={0}
                    borderTopRightRadius={0}
                    borderBottomRightRadius={16}
                    borderTopLeftRadius={16}
                    isFullWidth={true}
                    size="md"
                    value={password}
                    InputLeftElement={
                        <Icon
                            size={6}
                            ml={2}
                            color="primary.400"
                            as={<MaterialIcons name="lock-outline" />}
                        />
                    }
        
                    InputRightElement={
                        <Icon
                            color="primary.400"
                            as={<MaterialIcons name={isPasswordVisible ? "visibility-off" : "visibility"} />}
                            mr={4}
                            size={25}
                            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                            name={isPasswordVisible ? "visibility-off" : "visibility"}
                        />
                    }
        
                    isInvalid={Boolean(error.password)}
                    placeholder="Enter password"
                    variant="outline"
                    width="100%"
                    isRequired={true}
                    autoComplete="password"
                    secureTextEntry={!isPasswordVisible}
                    textContentType="newPassword"
                    name="password"
                    returnKeyType="next"
                    onChangeText={password => setPassword(password)}
                    color="gray.800"
                    placeholderTextColor="primary.600"
                    borderColor="primary.100"
                    borderWidth={1}
                />
                {error.password && <Text color="red.600">{error.password}</Text>}
    
    
                <Input
                    mt={2}
                    mb={1}
                    borderWidth={1}
                    px={4}
                    borderBottomLeftRadius={0}
                    borderTopRightRadius={0}
                    borderBottomRightRadius={16}
                    borderTopLeftRadius={16}
                    isFullWidth={true}
                    size="md"
                    value={confirmPassword}
                    InputLeftElement={
                        <Icon
                            size={6}
                            ml={2}
                            color="primary.400"
                            as={<MaterialIcons name="lock-outline" />}
                        />
                    }
        
                    InputRightElement={
                        <Icon
                            color="primary.400"
                            as={<MaterialIcons name={isConfirmPasswordVisible ? "visibility-off" : "visibility"} />}
                            mr={4}
                            size={6}
                            onPress={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}
                        />
                    }
                    isInvalid={Boolean(error.confirmPassword)}
                    placeholder="Confirm Password"
                    placeholderTextColor="primary.600"
                    variant="outline"
                    width="100%"
                    isRequired={true}
                    autoComplete="password"
                    secureTextEntry={!isConfirmPasswordVisible}
                    textContentType="newPassword"
                    name="confirmPassword"
                    returnKeyType="next"
                    onChangeText={confirmPassword => setConfirmPassword(confirmPassword)}
                    color="gray.800"
                    borderColor="primary.100"
                />
                {error.confirmPassword && <Text color="red.400">{error.confirmPassword}</Text>}
    
                <Button
                    mt={4}
                    onPress={handleResetPassword}
                    backgroundColor={authLoading ? 'primary.400': 'primary.800'}
                    pt={2}
                    pb={2}
                    borderBottomLeftRadius={0}
                    borderTopRightRadius={0}
                    borderBottomRightRadius={16}
                    borderTopLeftRadius={16}
                    isLoadingText="Resetting Password..."
                    isLoading={authLoading}
                    isDisabled={authLoading}
                    mb={4}
                    width="100%"
                    _text={{color: 'white', fontSize: 'xs'}}
                    variant="solid">
                    Reset Password
                </Button>
                
                <Button
                    onPress={() => navigation.push(SCREEN_NAME_CONSTANTS.SIGN_IN_SCREEN)}
                    pt={3}
                    pb={3}
                    borderBottomLeftRadius={0}
                    borderTopRightRadius={0}
                    borderBottomRightRadius={16}
                    borderTopLeftRadius={16}
                    textColor="gray.400"
                    alignSelf="stretch"
                    _text={{fontSize: 'sm', color: 'muted.500'}}
                    variant="link">
                        Go to Sign In
                </Button>
            </Box>
        </Flex>
    );
};

export default ResetPasswordScreen;
