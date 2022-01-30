import React, { useState } from "react";
import { Button, Center, Flex, Icon, Image, Input, Text, Box, StatusBar } from "native-base";
import { useDispatch, useSelector } from "react-redux";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import validator from "validator";
import { AUTH_ACTION_CREATORS } from "../../redux/auth/auth-action-creators";
import susuplusIcon from "../../assets/images/plus.png";
import { selectAuth } from "../../redux/auth/auth-reducer";

const ForgotPasswordScreen = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState({});
    
    const dispatch = useDispatch();
    
    const {authLoading} = useSelector(selectAuth);
    
    const handleClick = () => {
        if (!email) {
            setError({ error, email: "Field required" });
            return;
        } else {
            setError({ email: null });
        }
        
        if (!validator.isEmail(email)) {
            setError({ error, email: "Invalid Email" });
            return;
        } else {
            setError({ email: null });
        }
        dispatch(AUTH_ACTION_CREATORS.forgotPassword(email, navigation));
    };
    
    return (
        <Flex
            width="100%"
            flex={1}
            backgroundColor="primary.800"
            justifyContent="center">
            <StatusBar backgroundColor="#155e75" />
            <Center
                m={10}
                p={5}
                justifySelf="flex-start"
                alignSelf="flex-start"
                borderRadius={100} size={10}
                backgroundColor="primary.600">
                <Icon
                    onPress={() => navigation.goBack()}
                    color="white"
                    as={<MaterialIcons name="arrow-back" />} size="sm"
                />
            </Center>
            
            <Center px={5} flex={1}>
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
                    Forgot Password
                </Text>
            </Center>
            
            <Box
                backgroundColor="white"
                shadow={0}
                p={5}
                borderTopLeftRadius={32}
                borderTopRightRadius={32}>
                <Text
                    mb={8}
                    width="100%"
                    color="muted.500"
                    fontSize="sm"
                    fontFamily="body"
                    textAlign="center">
                    Please enter the email associated with your account to receive a reset link
                </Text>
    
                <Text
                    mb={1}
                    width="100%"
                    color="muted.400"
                    fontSize="xs"
                    fontFamily="body">
                    Email
                </Text>
                <Input
                    mb={1}
                    borderWidth={1}
                    borderColor="primary.100"
                    px={4}
                    py={2}
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
    
    
                <Button
                    onPress={handleClick}
                    pt={3}
                    pb={3}
                    mt={8}
                    borderBottomLeftRadius={0}
                    borderTopRightRadius={0}
                    borderBottomRightRadius={16}
                    borderTopLeftRadius={16}
                    isLoading={authLoading}
                    isDisabled={authLoading}
                    isLoadingText="Sending Link..."
                    mb={4}
                    backgroundColor="primary.600"
                    alignSelf="stretch"
                    _text={{fontSize: 'xs', color: 'white'}}
                    variant="solid">
                   Get Reset Link
                </Button>
            </Box>
        </Flex>
    );
};

export default ForgotPasswordScreen;
