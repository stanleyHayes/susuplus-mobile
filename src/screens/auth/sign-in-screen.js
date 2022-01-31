import React, { useEffect, useState } from "react";
import {
    Button,
    Icon,
    Flex,
    Input,
    Text,
    Center,
    Image,
    Box,
    StatusBar,
} from "native-base";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { SCREEN_NAME_CONSTANTS } from "../../constants/constants";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../../redux/auth/auth-action-creators";
import validator from "validator";
import susuplusIcon from "../../assets/images/plus.png";
import { selectAuth } from "../../redux/auth/auth-reducer";
import NavigationBar from "react-native-navbar-color";

const SignInScreen = ({ navigation }) => {
    const [isVisible, setIsVisible] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState({});
    const dispatch = useDispatch();
    
    const {authLoading} = useSelector(selectAuth);
    
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
    
    useEffect(() => {
        NavigationBar.setColor("#155e75");
    }, []);
    
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
                    _focus={{borderColor: "muted.400"}}
                    py={3}
                    px={4}
                    borderBottomLeftRadius={0}
                    borderTopRightRadius={0}
                    borderBottomRightRadius={16}
                    borderTopLeftRadius={16}
                    isFullWidth={true}
                    size="md"
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
                    variant="outline"
                    width="100%"
                    isRequired={true}
                    returnKeyType="next"
                    autoComplete="email"
                    textContentType="emailAddress"
                    name="email"
                    keyboardType="email-address"
                    onChangeText={email => setEmail(email)}
                />
                {error.email && <Text color="red.600">{error.email}</Text>}
                
                <Input
                    mt={2}
                    mb={1}
                    px={4}
                    py={3}
                    borderBottomLeftRadius={0}
                    borderTopRightRadius={0}
                    borderBottomRightRadius={16}
                    borderTopLeftRadius={16}
                    isFullWidth={true}
                    size="md"
                    _focus={{borderColor: "muted.400"}}
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
                    variant="outline"
                    width="100%"
                    isRequired={true}
                    autoComplete="password"
                    secureTextEntry={isVisible}
                    textContentType="newPassword"
                    name="password"
                    returnKeyType="next"
                    onChangeText={password => setPassword(password)}
                />
                {error.password && <Text color="red.600">{error.password}</Text>}
                
                <Button
                    mt={4}
                    onPress={() => navigation.push(SCREEN_NAME_CONSTANTS.FORGOT_PASSWORD_SCREEN)}
                    pt={3}
                    pb={3}
                    width="100%"
                    _text={{color: 'muted.500', fontSize: 'sm'}}
                    mb={4}
                    variant="link">
                        Forgot Password
                </Button>
                
                <Button
                    onPress={handleSignIn}
                    pt={3}
                    pb={3}
                    mb={4}
                    isLoading={authLoading}
                    isDisabled={authLoading}
                    isLoadingText='Signing In...'
                    borderBottomLeftRadius={0}
                    borderTopRightRadius={0}
                    borderBottomRightRadius={16}
                    borderTopLeftRadius={16}
                    width="100%"
                    backgroundColor="primary.600"
                    _text={{color: 'white', fontSize: 'sm'}}
                    variant="solid">
                    Sign In
                </Button>
                
                <Button
                    onPress={() => navigation.push(SCREEN_NAME_CONSTANTS.SIGN_UP_SCREEN)}
                    pt={3}
                    pb={3}
                    alignSelf="stretch"
                    _text={{color: 'muted.500'}}
                    variant="link">
                        Don't have an account? Register
                </Button>
            </Box>
        </Flex>
    );
};

export default SignInScreen;
