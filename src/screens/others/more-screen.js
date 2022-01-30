import React, { useEffect } from "react";
import {
    Avatar,
    Box,
    Divider, Flex,
    HStack,
    Icon, Pressable,
    ScrollView,
    Text,
    VStack,
} from "native-base";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { SCREEN_NAME_CONSTANTS } from "../../constants/constants";
import SusuButton from "../../components/susu-button";
import { useDispatch, useSelector } from "react-redux";
import { disableAccount, logout } from "../../redux/auth/auth-action-creators";
import { selectAuth } from "../../redux/auth/auth-reducer";
import defaultUserImage from "./../../assets/images/user.png";
import Share from "react-native-share";
import NavigationBar from "react-native-navbar-color";

const MoreScreen = ({ navigation }) => {
    
    const dispatch = useDispatch();
    
    const { authToken, userData } = useSelector(selectAuth);
    
    const onShare = async () => {
        const shareOptions = {
            message: 'Download Susu+',
            title: 'Invite Friends',
            type: 'text',
            subject: 'Join Susu+',
            url: 'https://hayfordstanley.vercel.app',
            failOnCancel: true,
        };
        try {
            await Share.open(shareOptions);
        }catch (e) {
            console.log(e);
        }
    }
    
    
    useEffect(() => {
        NavigationBar.setColor('#155e75');
    }, []);
    
    return (
        <ScrollView>
            <Box backgroundColor="white" width="100%">
                <HStack
                    onPress={() => navigation.push(SCREEN_NAME_CONSTANTS.PROFILE_SCREEN)}
                    pr={4}
                    pl={4}
                    pt={4}>
                    <Box>
                        <Avatar
                            size="xl"
                            source={userData.image ? userData.image: defaultUserImage}
                        />
                    </Box>
                    <Box>
                        <Text
                            color="muted.500"
                            mt={1}
                            ml={4}
                            width="100%"
                            fontSize="xl">
                            {userData.name}
                        </Text>
                        <Text color="muted.500" mt={1} ml={4} width="100%" fontSize="sm">{userData.email}</Text>
                        <Text color="muted.500" mt={1} ml={4} width="100%" fontSize="sm">{userData.phone}</Text>
                    </Box>
                </HStack>
                
                <Divider
                    alignSelf="center"
                    width="100%"
                    backgroundColor="muted.200"
                    orientation="horizontal"
                    thickness={2} mt={2} mb={2} />
                
                
                <VStack width="100%" verticalAlign="top" alignItems="stretch">
                    <SusuButton
                        iconName="edit"
                        as={MaterialIcons}
                        destination={SCREEN_NAME_CONSTANTS.EDIT_PROFILE_SCREEN}
                        label="Edit Profile"
                        navigation={navigation}
                    />
                    <Divider
                        alignSelf="center"
                        width="100%"
                        backgroundColor="muted.200"
                        orientation="horizontal"
                        thickness={1} />
                    
                    <Pressable onPress={onShare}>
                        <Flex
                            direction="row"
                            px={5}
                            py={2}
                            alignItems="center"
                            justifyContent="space-between"
                            backgroundColor="white">
                            <HStack flex={1} space="md" alignItems="center">
                                <Box
                                    backgroundColor="primary.100"
                                    p={2}
                                    borderBottomLeftRadius={0}
                                    borderTopRightRadius={0}
                                    borderBottomRightRadius={16}
                                    borderTopLeftRadius={16}>
                                    <Icon
                                        color="primary.600"
                                        size="sm"
                                        as={MaterialIcons}
                                        name="share"
                                    />
                                </Box>
                                <Text
                                    fontSize="md"
                                    fontFamily="body"
                                    textTransform="capitalize"
                                    color="muted.500">
                                    Invite Friends
                                </Text>
                            </HStack>
                            <Icon size="sm" as={MaterialIcons} name="chevron-right" />
                        </Flex>
                    </Pressable>
                    
                    <Divider
                        alignSelf="center"
                        width="100%"
                        backgroundColor="muted.200"
                        orientation="horizontal"
                        thickness={1} />
                    
                    <SusuButton
                        as={MaterialIcons}
                        iconName="share"
                        destination={SCREEN_NAME_CONSTANTS.PAYMENT_METHODS_SCREEN}
                        label="Payment Methods"
                        navigation={navigation}
                    />
                    
                    <Divider
                        alignSelf="center"
                        width="100%"
                        backgroundColor="muted.200"
                        orientation="horizontal"
                        thickness={1} />
                    
                    <SusuButton
                        iconName="zodiac-virgo"
                        destination={SCREEN_NAME_CONSTANTS.CONTRIBUTION_STACK_NAVIGATOR}
                        label="Contributions"
                        navigation={navigation}
                        as={MaterialCommunityIcons}
                    />
                    
                    <Divider
                        alignSelf="center"
                        width="100%"
                        backgroundColor="muted.200"
                        orientation="horizontal"
                        thickness={1} />
                    
                    <SusuButton
                        as={MaterialCommunityIcons}
                        iconName="zodiac-virgo"
                        destination={SCREEN_NAME_CONSTANTS.DISBURSEMENT_STACK_NAVIGATOR}
                        label="Disbursements"
                        navigation={navigation}
                    />
                    
                    <Divider
                        alignSelf="center"
                        width="100%"
                        backgroundColor="muted.200"
                        orientation="horizontal"
                        thickness={1} />
                    
                    <SusuButton
                        as={MaterialIcons}
                        iconName="settings"
                        destination={SCREEN_NAME_CONSTANTS.SETTINGS_SCREEN}
                        label="Settings"
                        navigation={navigation}
                    />
                    
                    <Divider
                        alignSelf="center"
                        width="100%"
                        backgroundColor="muted.200"
                        orientation="horizontal"
                        thickness={1} />
                    
                    <SusuButton
                        as={MaterialIcons}
                        iconName="insert-drive-file"
                        destination={SCREEN_NAME_CONSTANTS.ABOUT_APP_SCREEN}
                        label="About Susu+"
                        navigation={navigation}
                    />
                    
                    <Divider
                        alignSelf="center"
                        width="100%"
                        backgroundColor="muted.200"
                        orientation="horizontal"
                        thickness={1} />
                    
                    <SusuButton
                        as={MaterialIcons}
                        iconName="privacy-tip"
                        destination={SCREEN_NAME_CONSTANTS.PRIVACY_POLICY_SCREEN}
                        label="Privacy Policy"
                        navigation={navigation}
                    />
                    
                    <Divider
                        alignSelf="center"
                        width="100%"
                        backgroundColor="muted.200"
                        orientation="horizontal"
                        thickness={1} />
                    
                    <SusuButton
                        as={MaterialIcons}
                        iconName="share"
                        destination={SCREEN_NAME_CONSTANTS.TERMS_AND_CONDITIONS_SCREEN}
                        label="Terms & Conditions"
                        navigation={navigation}
                    />
                    
                    <Divider
                        alignSelf="center"
                        width="100%"
                        backgroundColor="muted.200"
                        orientation="horizontal"
                        thickness={1} />
                    
                    <SusuButton
                        as={MaterialIcons}
                        iconName="lock"
                        destination={SCREEN_NAME_CONSTANTS.CHANGE_PASSWORD_SCREEN}
                        label="Change Password"
                        navigation={navigation}
                    />
                    
                    <Divider
                        alignSelf="center"
                        width="100%"
                        backgroundColor="muted.200"
                        orientation="horizontal"
                        thickness={1} />
                    
                    
                    <Pressable onPress={() => dispatch(logout())}>
                        <Flex
                            direction="row"
                            px={5}
                            py={2}
                            alignItems="center"
                            justifyContent="space-between"
                            backgroundColor="white">
                            <HStack flex={1} space="md" alignItems="center">
                                <Box
                                    backgroundColor="primary.100"
                                    p={2}
                                    borderBottomLeftRadius={0}
                                    borderTopRightRadius={0}
                                    borderBottomRightRadius={16}
                                    borderTopLeftRadius={16}>
                                    <Icon
                                        color="primary.600"
                                        size="sm"
                                        as={MaterialIcons}
                                        name="exit-to-app"
                                    />
                                </Box>
                                <Text
                                    fontSize="md"
                                    fontFamily="body"
                                    textTransform="capitalize"
                                    color="gray.500">
                                    Logout
                                </Text>
                            </HStack>
                            <Icon size="sm" as={MaterialIcons} name="chevron-right" />
                        </Flex>
                    </Pressable>
                    
                    
                    <Divider
                        alignSelf="center"
                        width="100%"
                        backgroundColor="muted.200"
                        orientation="horizontal"
                        thickness={1} />
                    
                    
                    <Pressable onPress={() => dispatch(disableAccount(authToken, navigation))}>
                        <Flex
                            direction="row"
                            px={5}
                            py={2}
                            alignItems="center"
                            justifyContent="space-between"
                            backgroundColor="white">
                            <HStack flex={1} space="md" alignItems="center">
                                <Box
                                    backgroundColor="red.100"
                                    p={2}
                                    borderBottomLeftRadius={0}
                                    borderTopRightRadius={0}
                                    borderBottomRightRadius={16}
                                    borderTopLeftRadius={16}>
                                    <Icon
                                        color="red.500"
                                        size="sm"
                                        as={MaterialIcons}
                                        name="delete"
                                    />
                                </Box>
                                <Text
                                    fontSize="md"
                                    fontFamily="body"
                                    textTransform="capitalize"
                                    color="red.500">
                                    Disable Account
                                </Text>
                            </HStack>
                            <Icon size="sm" color="red.500" as={MaterialIcons} name="chevron-right" />
                        </Flex>
                    </Pressable>
                
                </VStack>
            </Box>
        </ScrollView>
    );
};

export default MoreScreen;
