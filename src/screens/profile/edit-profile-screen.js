import React, { useEffect, useState } from "react";
import { Box, Button, Center, Flex, Input, ScrollView, Spinner, Text } from "native-base";
import { useDispatch, useSelector } from "react-redux";
import { selectAuth } from "../../redux/auth/auth-reducer";

import { AUTH_ACTION_CREATORS } from "../../redux/auth/auth-action-creators";
import validator from "validator";
import NavigationBar from "react-native-navbar-color";

const EditProfileScreen = ({ navigation }) => {
    
    const { userData, authToken, authLoading } = useSelector(selectAuth);
    
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    
    useEffect(() => {
        if (userData) {
            setEmail(userData.email);
            setPhone(userData.phone);
            setName(userData.name);
        }
    }, []);
    
    const [error, setError] = useState({});
    
    const dispatch = useDispatch();
    
    const handleUpdateProfile = () => {
        
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
        
        if (!name) {
            setError({ error, name: "Field required" });
            return;
        } else {
            setError({ error, name: null });
        }
        
        if (!phone) {
            setError({ error, phone: "Field required" });
            return;
        } else {
            setError({ error, phone: null });
        }
        
        if (!validator.isMobilePhone(phone)) {
            setError({ error, phone: "Invalid phone" });
            return;
        } else {
            setError({ error, phone: null });
        }
        dispatch(AUTH_ACTION_CREATORS.updateProfile({ email, phone, name }, authToken, navigation));
    };
    
    useEffect(() => {
        NavigationBar.setColor('#155e75');
    }, []);
    
    return (
        <Box>
            <ScrollView width="100%" height="100%" backgroundColor="white">
                <Flex
                    height="100%"
                    width="100%"
                    justifyContent="center">
                    
                    {authLoading && (
                        <Center>
                            <Spinner color="primary.800" size={50} />
                        </Center>
                    )}
                    
                    <Box px={2} flex={1} pt={4} pb={4}>
                        
                        <Input
                            isInvalid={Boolean(error.email)}
                            _invalid={{
                                borderColor: "red.400",
                            }}
                            mb={1}
                            mt={2}
                            isFullWidth={true}
                            size="lg"
                            _focus={{ borderColor: "gray.400" }}
                            borderBottomLeftRadius={0}
                            borderTopRightRadius={0}
                            borderBottomRightRadius={16}
                            borderTopLeftRadius={16}
                            value={email}
                            placeholder="Enter email"
                            variant="outline"
                            alignSelf="stretch"
                            isRequired={true}
                            p={3}
                            keyboardType="email-address"
                            textContentType="emailAddress"
                            returnKeyType="next"
                            name="email"
                            onChangeText={email => setEmail(email)}
                        />
                        {error.email && <Text textColor="red.400" textAlign="center">{error.email}</Text>}
                        
                        
                        <Input
                            isInvalid={Boolean(error.name)}
                            _invalid={{
                                borderColor: "red.400",
                            }}
                            mb={1}
                            mt={2}
                            isFullWidth={true}
                            size="md"
                            _focus={{ borderColor: "gray.400" }}
                            borderBottomLeftRadius={0}
                            borderTopRightRadius={0}
                            borderBottomRightRadius={16}
                            borderTopLeftRadius={16}
                            value={name}
                            placeholder="Enter name"
                            variant="outline"
                            alignSelf="stretch"
                            isRequired={true}
                            p={3}
                            returnKeyType="next"
                            keyboardType="default"
                            textContentType="name"
                            name="name"
                            onChangeText={name => setName(name)}
                        />
                        {error.name && <Text textColor="red.400" textAlign="center">{error.name}</Text>}
                        
                        <Input
                            isInvalid={Boolean(error.phone)}
                            _invalid={{
                                borderColor: "red.400",
                            }}
                            mb={1}
                            mt={2}
                            isFullWidth={true}
                            size="md"
                            _focus={{ borderColor: "gray.400" }}
                            borderBottomLeftRadius={0}
                            borderTopRightRadius={0}
                            borderBottomRightRadius={16}
                            borderTopLeftRadius={16}
                            value={phone}
                            placeholder="Enter phone"
                            variant="outline"
                            alignSelf="stretch"
                            isRequired={true}
                            p={3}
                            keyboardType="phone-pad"
                            dataDetectorType="phoneNumber"
                            returnKeyType="send"
                            textContentType="telephoneNumber"
                            name="phone"
                            onChangeText={phone => setPhone(phone)}
                        />
                        {error.phone && <Text textColor="red.400" textAlign="center">{error.phone}</Text>}
                        
                        <Button
                            isDisabled={authLoading}
                            isLoading={authLoading}
                            isLoadingText="Updating Profile..."
                            onPress={handleUpdateProfile}
                            pt={3}
                            pb={3}
                            mt={8}
                            shadow={1}
                            borderBottomLeftRadius={0}
                            borderTopRightRadius={0}
                            borderBottomRightRadius={16}
                            borderTopLeftRadius={16}
                            backgroundColor="primary.600"
                            _text={{ fontSize: "xs", color: "white" }}
                            alignSelf="stretch"
                            variant="solid">
                                Update Profile
                        </Button>
                    </Box>
                </Flex>
            </ScrollView>
        </Box>
    );
};

export default EditProfileScreen;
