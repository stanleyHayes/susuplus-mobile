import React from "react";
import { Box, Button, Divider, Flex, HStack, Image, Text, Badge } from "native-base";
import moment from "moment/moment";
import defaultImage from "./../assets/images/group-colored.png";
import { useDispatch, useSelector } from "react-redux";
import { INVITATION_ACTION_CREATORS } from "../redux/invites/group-invites-action-creators";
import { selectAuth } from "../redux/auth/auth-reducer";

const GroupInvite = ({ groupInvite, showButtons }) => {
    
    const renderStatus = status => {
        switch (status) {
            case "PENDING":
                return <Badge alignSelf="flex-start" variant="subtle" colorScheme="default"
                              borderBottomLeftRadius={0}
                              borderTopRightRadius={0}
                              borderBottomRightRadius={16}
                              borderTopLeftRadius={16}><Text
                    textTransform="capitalize" color="teal.600" fontSize="xs"
                    mb={1}>{groupInvite.status}</Text></Badge>;
            case "ACCEPTED":
                return <Badge alignSelf="flex-start" variant="subtle" colorScheme="success"
                              borderBottomLeftRadius={0}
                              borderTopRightRadius={0}
                              borderBottomRightRadius={16}
                              borderTopLeftRadius={16}><Text
                    textTransform="capitalize" color="teal.600" fontSize="xs"
                    mb={1}>{groupInvite.status}</Text></Badge>;
            case "REVOKED":
                return <Badge alignSelf="flex-start" variant="subtle" colorScheme="danger" borderRadius={32}><Text
                    textTransform="capitalize" color="red.600" fontSize="xs" mb={1}>{groupInvite.status}</Text></Badge>;
            case "EXPIRED":
                return <Badge alignSelf="flex-start" variant="subtle" colorScheme="info"
                              borderBottomLeftRadius={0}
                              borderTopRightRadius={0}
                              borderBottomRightRadius={16}
                              borderTopLeftRadius={16}><Text
                    textTransform="capitalize" color="blue.600" fontSize="xs"
                    mb={1}>{groupInvite.status}</Text></Badge>;
            case "REJECTED":
                return <Badge alignSelf="flex-start" variant="subtle" colorScheme="danger"
                              borderBottomLeftRadius={0}
                              borderTopRightRadius={0}
                              borderBottomRightRadius={16}
                              borderTopLeftRadius={16}><Text
                    textTransform="capitalize" color="red.600" fontSize="xs" mb={1}>{groupInvite.status}</Text></Badge>;
        }
    };
    
    const dispatch = useDispatch();
    const {authToken} = useSelector(selectAuth);
    
    const handleAcceptInvitation = () => {
        dispatch(INVITATION_ACTION_CREATORS.acceptInvitation(authToken, groupInvite._id));
    }
    
    const handleDeclineInvitation = () => {
        dispatch(INVITATION_ACTION_CREATORS.declineInvitation(authToken, groupInvite._id));
    }
    
    return (
        <Box
            maxWidth="100%"
            borderBottomLeftRadius={0}
            borderTopRightRadius={0}
            borderBottomRightRadius={16}
            borderTopLeftRadius={16}
            backgroundColor="white"
            p={4}
            m={2}
            shadow={0}>
            <HStack mb={1}>
                <Box
                    backgroundColor="primary.100"
                    borderBottomLeftRadius={0}
                    borderTopRightRadius={0}
                    borderBottomRightRadius={16}
                    borderTopLeftRadius={16}
                    size={55}>
                    <Image
                        alt={groupInvite.group.name}
                        source={groupInvite.group.image ? groupInvite.group.image : defaultImage}
                        objectPosition="center"
                        resizeMode="cover"
                        borderRadius={100}
                        size={55}
                    />
                </Box>
                <Box ml={2} justifyContent="center">
                    <Text
                        fontFamily="body"
                        fontSize="md">
                        {groupInvite.group.name}
                    </Text>
                    <Text color="muted.500" fontSize="xs">
                        {moment(groupInvite.createdAt).fromNow()}
                    </Text>
                </Box>
            </HStack>
            <Divider
                alignSelf="center"
                width="100%"
                mt={1}
                mb={1}
                backgroundColor="muted.200"
                orientation="horizontal"
                thickness={1} />
            <Text mb={1} color="muted.500" fontSize="xs">{groupInvite.group.description}</Text>
            
            <Divider
                alignSelf="center"
                width="100%"
                mt={1}
                mb={1}
                backgroundColor="muted.200"
                orientation="horizontal"
                thickness={1} />
            <Text mb={1}>Invitation Status</Text>
            
            {renderStatus(groupInvite.status)}
            
            {groupInvite.status === "PENDING" && (
                showButtons && (
                    <Box>
                        <Divider
                            alignSelf="center"
                            width="100%"
                            mt={2}
                            mb={2}
                            backgroundColor="muted.200"
                            orientation="horizontal"
                            thickness={1} />
                        
                        <Flex flex={1} width="100%" justifyContent="space-between" direction="row" maxWidth="100%">
                            <Button
                                onPress={handleDeclineInvitation}
                                borderBottomLeftRadius={0}
                                borderTopRightRadius={0}
                                borderBottomRightRadius={16}
                                borderTopLeftRadius={16}
                                mr={1}
                                flexGrow={1}
                                variant="outlined"
                                borderWidth={2}
                                backgroundColor="red.600"
                                _text={{ color: "red.400" }}
                                borderColor="red.500">
                                <Text color="white" fontSize="md">
                                    Decline
                                </Text>
                            </Button>
                            
                            <Button
                                ml={1}
                                onPress={handleAcceptInvitation}
                                flexGrow={1}
                                backgroundColor="primary.600"
                                variant="solid"
                                borderWidth={2}
                                borderColor="primary.100"
                                borderBottomLeftRadius={0}
                                borderTopRightRadius={0}
                                borderBottomRightRadius={16}
                                borderTopLeftRadius={16}>
                                <Text color="white" fontSize="md">
                                    Accept
                                </Text>
                            </Button>
                        </Flex>
                    </Box>
                )
            )}
        </Box>
    );
};

export default GroupInvite;
