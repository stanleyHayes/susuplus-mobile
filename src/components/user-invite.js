import React from "react";
import { Box, Divider, HStack, Image, Text, Badge, Avatar } from "native-base";
import moment from "moment/moment";
import { UTILS } from "../utils/utils";

const UserInvitation = ({ userInvite }) => {
    
    const renderStatus = status => {
        switch (status) {
            case "PENDING":
                return <Badge
                    alignSelf="flex-start" variant="subtle" colorScheme="default" borderBottomLeftRadius={0}
                    borderTopRightRadius={0}
                    borderBottomRightRadius={16}
                    borderTopLeftRadius={16}><Text
                    textTransform="capitalize" color="teal.600" fontSize="sm"
                    mb={1}>{userInvite.status}</Text></Badge>;
            case "ACCEPTED":
                return <Badge alignSelf="flex-start" variant="subtle" colorScheme="success" borderBottomLeftRadius={0}
                              borderTopRightRadius={0}
                              borderBottomRightRadius={16}
                              borderTopLeftRadius={16}><Text
                    textTransform="capitalize" color="teal.600" fontSize="sm"
                    mb={1}>{userInvite.status}</Text></Badge>;
            case "REVOKED":
                return <Badge alignSelf="flex-start" variant="subtle" colorScheme="danger" borderBottomLeftRadius={0}
                              borderTopRightRadius={0}
                              borderBottomRightRadius={16}
                              borderTopLeftRadius={16}><Text
                    textTransform="capitalize" color="red.600" fontSize="sm" mb={1}>{userInvite.status}</Text></Badge>;
            case "EXPIRED":
                return <Badge alignSelf="flex-start" variant="subtle" colorScheme="info"
                              borderBottomLeftRadius={0}
                              borderTopRightRadius={0}
                              borderBottomRightRadius={16}
                              borderTopLeftRadius={16}><Text
                    textTransform="capitalize" color="blue.600" fontSize="sm"
                    mb={1}>{userInvite.status}</Text></Badge>;
            case "REJECTED":
                return <Badge alignSelf="flex-start" variant="subtle" colorScheme="danger" borderBottomLeftRadius={0}
                              borderTopRightRadius={0}
                              borderBottomRightRadius={16}
                              borderTopLeftRadius={16}><Text
                    textTransform="capitalize" color="red.600" fontSize="sm" mb={1}>{userInvite.status}</Text></Badge>;
        }
    };
    
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
            <HStack mb={1} alignItems="center">
                <Box
                    backgroundColor="primary.100"
                    borderBottomLeftRadius={0}
                    borderTopRightRadius={0}
                    borderBottomRightRadius={16}
                    borderTopLeftRadius={16}
                    size={55}>
                    {userInvite.invitee.image ? (
                        <Image
                            alt={userInvite.invitee.name}
                            source={userInvite.invitee.image}
                            objectPosition="center"
                            resizeMode="cover"
                            borderBottomLeftRadius={0}
                            borderTopRightRadius={0}
                            borderBottomRightRadius={16}
                            borderTopLeftRadius={16}
                            size={55}
                        />
                    ) : (
                        <Avatar
                            size={55}
                                borderBottomLeftRadius={0}
                                borderTopRightRadius={0}
                                borderBottomRightRadius={16}
                                borderTopLeftRadius={16} backgroundColor="primary.200">
                            <Text color="primary.800" fontSize="xl">
                                {UTILS.getInitials(userInvite.invitee.name)}
                            </Text>
                        </Avatar>
                    )}
                
                </Box>
                <Box ml={2}>
                    <Text
                        fontFamily="body"
                        fontSize="sm" color="muted.500">
                        {userInvite.invitee.name}
                    </Text>
                    <Text color="muted.400" fontSize="xs">
                        {moment(userInvite.createdAt).fromNow()}
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
            <Text color="muted.500" fontSize="xs" mb={1}>Invitation Status</Text>
            
            {renderStatus(userInvite.status)}
        
        </Box>
    );
};

export default UserInvitation;
