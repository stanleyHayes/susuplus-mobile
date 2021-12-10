import React, { useState } from "react";
import { Box, Button, Center, Flex, Icon, Image, Input, Text } from "native-base";
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
                    p={4}
                    borderRadius={32}
                    isFullWidth={true}
                    size="lg"
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
                            as={<MaterialIcons name={isPasswordVisible ? "visibility" : "visibility-off"} />}
                            mr={4}
                            size={25}
                            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                            name={isPasswordVisible ? "visibility" : "visibility-off"}
                        />
                    }
        
                    isInvalid={Boolean(error.password)}
                    placeholder="Enter password"
                    variant="rounded"
                    width="100%"
                    isRequired={true}
                    autoComplete="password"
                    secureTextEntry={isPasswordVisible}
                    textContentType="newPassword"
                    name="password"
                    returnKeyType="next"
                    onChangeText={password => setPassword(password)}
                    color="gray.800"
                    placeholderTextColor="primary.600"
                    borderColor="primary.100"
                    backgroundColor="white"
                    borderWidth={1}
                />
                {error.password && <Text color="red.600">{error.password}</Text>}
    
    
                <Input
                    mt={2}
                    mb={1}
                    borderWidth={1}
                    p={4}
                    borderRadius={32}
                    isFullWidth={true}
                    size="lg"
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
                            as={<MaterialIcons name={isConfirmPasswordVisible ? "visibility" : "visibility-off"} />}
                            mr={4}
                            size={6}
                            onPress={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}
                        />
                    }
                    isInvalid={Boolean(error.confirmPassword)}
                    placeholder="Confirm Password"
                    placeholderTextColor="primary.600"
                    variant="rounded"
                    width="100%"
                    isRequired={true}
                    autoComplete="password"
                    secureTextEntry={isConfirmPasswordVisible}
                    textContentType="newPassword"
                    name="confirmPassword"
                    returnKeyType="next"
                    onChangeText={confirmPassword => setConfirmPassword(confirmPassword)}
                    color="gray.800"
                    borderColor="primary.100"
                    backgroundColor="white"
                />
                {error.confirmPassword && <Text color="red.400">{error.confirmPassword}</Text>}
    
                <Button
                    mt={4}
                    isLoading={authLoading}
                    isLoadingText="Resetting Password..."
                    onPress={handleResetPassword}
                    backgroundColor="primary.700"
                    pt={4}
                    pb={4}
                    borderRadius={32}
                    mb={4}
                    width="100%"
                    size="lg"
                    variant="solid">
                    <Text color="white" fontSize="md">Reset Password</Text>
                </Button>
                
                <Button
                    onPress={() => navigation.push(SCREEN_NAME_CONSTANTS.SIGN_IN_SCREEN)}
                    pt={3}
                    pb={3}
                    borderRadius={32}
                    textColor="gray.400"
                    alignSelf="stretch"
                    size="lg"
                    variant="link">
                    <Text fontSize="sm">
                        Go to Sign In
                    </Text>
                </Button>
            </Box>
        </Flex>
    );
};

export default ResetPasswordScreen;
