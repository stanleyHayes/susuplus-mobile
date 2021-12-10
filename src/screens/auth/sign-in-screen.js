import React, { useState } from "react";
import {
    Button,
    Icon,
    Flex,
    Input,
    Text,
     Center, Image, Box,
} from "native-base";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { SCREEN_NAME_CONSTANTS } from "../../constants/constants";
import { useDispatch } from "react-redux";
import { signIn } from "../../redux/auth/auth-action-creators";
import validator from "validator";
import susuplusIcon from "../../assets/images/plus.png";

const SignInScreen = ({ navigation }) => {
    const [isVisible, setIsVisible] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState({});
    const dispatch = useDispatch();
    
    const handleSignIn = () => {
        if (!email) {
            setError({ error, email: "Email field required" });
            return;
        } else {
            setError({ error, email: null });
        }
        
        if (!validator.isEmail(email)) {
            setError({ error, email: "Invalid email" });
            return;
        } else {
            setError({ error, email: null });
        }
        
        if (!password) {
            setError({ error, password: "Field required" });
            return;
        } else {
            setError({ error, password: null });
        }
        
        dispatch(signIn({ email, password }, navigation));
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
                    textAlign="center"
                    textTransform="capitalize">
                    Welcome Back
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
                    borderWidth={1}
                    borderColor="primary.100"
                    backgroundColor="white"
                    p={4}
                    borderRadius={32}
                    isFullWidth={true}
                    size="lg"
                    value={email}
                    InputLeftElement={
                        <Icon
                            size={6}
                            ml={2}
                            color="primary.400"
                            as={<MaterialIcons name="mail-outline" />}
                        />
                    }
                    isInvalid={Boolean(error.email)}
                    placeholder="e.g. user@server.com"
                    variant="rounded"
                    width="100%"
                    isRequired={true}
                    returnKeyType="next"
                    autoComplete="email"
                    textContentType="emailAddress"
                    name="email"
                    placeholderTextColor="primary.600"
                    keyboardType="email-address"
                    onChangeText={email => setEmail(email)}
                    color="gray.800"
                />
                {error.email && <Text color="red.600">{error.email}</Text>}
                
                <Input
                    mt={2}
                    mb={1}
                    borderWidth={1}
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
                            as={<MaterialIcons name={isVisible ? "visibility" : "visibility-off"} />}
                            mr={4}
                            size={25}
                            onPress={() => setIsVisible(!isVisible)}
                            name={isVisible ? "visibility" : "visibility-off"}
                        />
                    }
                    
                    isInvalid={Boolean(error.password)}
                    placeholder="Enter password"
                    variant="rounded"
                    width="100%"
                    isRequired={true}
                    autoComplete="password"
                    secureTextEntry={isVisible}
                    textContentType="newPassword"
                    name="password"
                    returnKeyType="next"
                    placeholderTextColor="primary.600"
                    onChangeText={password => setPassword(password)}
                    color="gray.800"
                    borderColor="primary.100"
                    backgroundColor="white"
                />
                {error.password && <Text color="red.600">{error.password}</Text>}
                
                <Button
                    mt={4}
                    borderRadius={32}
                    onPress={() => navigation.push(SCREEN_NAME_CONSTANTS.FORGOT_PASSWORD_SCREEN)}
                    pt={3}
                    pb={3}
                    width="100%"
                    size="lg"
                    mb={4}
                    variant="link">
                    <Text color="darkText" fontSize="sm">
                        Forgot Password
                    </Text>
                </Button>
                
                <Button
                    onPress={handleSignIn}
                    pt={4}
                    pb={4}
                    mb={4}
                    backgroundColor="primary.800"
                    borderRadius={32}
                    width="100%"
                    size="lg"
                    variant="solid">
                    <Text color="white" fontSize="md">
                        Sign In
                    </Text>
                </Button>
                
                <Button
                    onPress={() => navigation.push(SCREEN_NAME_CONSTANTS.SIGN_UP_SCREEN)}
                    pt={3}
                    pb={3}
                    borderRadius={0}
                    alignSelf="stretch"
                    size="lg"
                    variant="link">
                    <Text color="darkText" fontSize="sm">
                        Don't have an account? Register
                    </Text>
                </Button>
            </Box>
        </Flex>
    );
};

export default SignInScreen;
