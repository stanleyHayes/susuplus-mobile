import React, { useState } from "react";
import { Box, Button, Center, Flex, Icon, Image, Input, ScrollView, StatusBar, Text } from "native-base";
import { useDispatch, useSelector } from "react-redux";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { signUp } from "../../redux/auth/auth-action-creators";
import { SCREEN_NAME_CONSTANTS } from "../../constants/constants";
import validator from "validator";

import susuplusIcon from "./../../assets/images/plus.png";
import { selectAuth } from "../../redux/auth/auth-reducer";

const SignUpScreen = ({ navigation }) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(true);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(true);
    const [error, setError] = useState({});
    
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [password, setPassword] = useState("");
    
    const { authLoading } = useSelector(selectAuth);
    
    const dispatch = useDispatch();
    
    const handleSignUp = () => {
        if (!name) {
            setError({ error, name: "Field required" });
            return;
        } else {
            setError({ error, name: null });
        }
        
        if (!email) {
            setError({ error, email: "Field required" });
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
        
        if (!confirmPassword) {
            setError({ error, confirmPassword: "Field required" });
            return;
        } else {
            setError({ error, confirmPassword: null });
        }
        
        if (password !== confirmPassword) {
            setError({ error, password: "Passwords don't match", confirmPassword: "Passwords don't match" });
            return;
        } else {
            setError({ error, confirmPassword: null, password: null });
        }
        dispatch(signUp({ email, name, password, phone, role: "USER" }, navigation));
    };
    
    return (
        <Box
            height="100%"
            width="100%"
            flex={1}
            backgroundColor="primary.800"
            justifyContent="space-between">
            <StatusBar backgroundColor="#155e75" />
            <Flex flex={1}>
                <Center>
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
                        mb={4}
                        color="white"
                        width="100%"
                        textAlign="center">
                        Susu Plus
                    </Text>
                    
                    <Text
                        fontSize="lg"
                        mb={8}
                        color="white"
                        width="100%"
                        textAlign="center">
                        Create your Account
                    </Text>
                </Center>
            </Flex>
            
            <Box
                backgroundColor="white"
                shadow={0}
                p={5}
                borderTopLeftRadius={32}
                borderTopRightRadius={32}>
                <ScrollView>
                    <Flex flex={1} justifyContent="flex-end">
                        <Input
                            mb={1}
                            borderWidth={1}
                            borderRadius={32}
                            isFullWidth={true}
                            size="lg"
                            value={name}
                            InputLeftElement={
                                <Icon
                                    size={6}
                                    ml={2}
                                    color="primary.400"
                                    as={<MaterialIcons name="person-outline" />}
                                />
                            }
                            isInvalid={Boolean(error.name)}
                            placeholder="Enter full name e.g. Inigo Lopez"
                            variant="rounded"
                            width="100%"
                            isRequired={true}
                            autoComplete="name"
                            textContentType="name"
                            returnKeyType="next"
                            name="name"
                            placeholderTextColor="primary.600"
                            onChangeText={name => setName(name)}
                            color="darkText"
                            _focus={{ borderColor: "primary.100" }}
                            borderColor="primary.100"
                            px={4}
                            py={2}
                        />
                        {error.name && <Text color="red.600">{error.name}</Text>}
                        
                        <Input
                            mt={2}
                            mb={1}
                            borderWidth={1}
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
                            _focus={{ borderColor: "primary.100" }}
                            borderColor="primary.100"
                            px={4}
                            py={2}
                        />
                        {error.email && <Text color="red.600">{error.email}</Text>}
                        
                        <Input
                            mt={2}
                            mb={1}
                            borderWidth={1}
                            borderRadius={32}
                            isFullWidth={true}
                            size="lg"
                            value={phone}
                            InputLeftElement={
                                <Icon
                                    size={6}
                                    ml={2}
                                    color="primary.400"
                                    as={<MaterialIcons name="call" />}
                                />
                            }
                            isInvalid={Boolean(error.phone)}
                            placeholder="e.g. +233270000000"
                            variant="rounded"
                            width="100%"
                            isRequired={true}
                            returnKeyType="next"
                            autoComplete="tel"
                            placeholderTextColor="primary.600"
                            textContentType="telephoneNumber"
                            name="phone"
                            keyboardType="phone-pad"
                            onChangeText={phone => setPhone(phone)}
                            color="gray.800"
                            _focus={{ borderColor: "primary.100" }}
                            borderColor="primary.100"
                            px={4}
                            py={2}
                        />
                        {error.phone && <Text color="red.600">{error.phone}</Text>}
                        
                        
                        <Input
                            mt={2}
                            mb={1}
                            borderWidth={1}
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
                                    as={<MaterialIcons
                                        name={isPasswordVisible ? "visibility" : "visibility-off"} />}
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
                            placeholderTextColor="primary.600"
                            isRequired={true}
                            autoComplete="password"
                            secureTextEntry={isPasswordVisible}
                            textContentType="newPassword"
                            name="password"
                            returnKeyType="next"
                            onChangeText={password => setPassword(password)}
                            color="gray.800"
                            _focus={{ borderColor: "primary.100" }}
                            borderColor="primary.100"
                            px={4}
                            py={2}
                        />
                        {error.password && <Text color="red.600">{error.password}</Text>}
                        
                        
                        <Input
                            mt={2}
                            mb={1}
                            borderWidth={1}
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
                                    as={<MaterialIcons
                                        name={isConfirmPasswordVisible ? "visibility" : "visibility-off"} />}
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
                            _focus={{ borderColor: "primary.100" }}
                            borderColor="primary.100"
                            px={4}
                            py={2}
                        />
                        {error.confirmPassword && <Text color="red.400">{error.confirmPassword}</Text>}
                        
                        <Button
                            mt={6}
                            onPress={handleSignUp}
                            pt={2}
                            isLoading={authLoading}
                            isDisabled={authLoading}
                            backgroundColor={authLoading ? "primary.400" : "primary.800"}
                            pb={2}
                            mb={2}
                            borderRadius={32}
                            width="100%"
                            variant="solid">
                            <Text color="white" textColor="white" fontSize="md">
                                {authLoading ? "Creating Account..." : "Create Account"}
                            
                            </Text>
                        </Button>
                        
                        <Button
                            onPress={() => navigation.push(SCREEN_NAME_CONSTANTS.SIGN_IN_SCREEN)}
                            width="100%"
                            variant="link">
                            <Text fontSize="sm">
                                Already have an account? Sign In
                            </Text>
                        </Button>
                    </Flex>
                </ScrollView>
            </Box>
        </Box>
    );
};

export default SignUpScreen;
