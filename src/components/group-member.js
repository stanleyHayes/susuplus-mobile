import React from "react";
import { Avatar, Box, HStack, Image, Text } from "native-base";
import { UTILS } from "../utils/utils";
import moment from "moment";

const GroupMember = ({ member }) => {
    
    return (
        <Box
            borderBottomLeftRadius={0}
            borderTopRightRadius={0}
            borderBottomRightRadius={16}
            borderTopLeftRadius={16}
            backgroundColor="white"
            p={4}
            mx={2}
            my={1}
            shadow={0}>
            <HStack alignItems="center">
                <Box>
                    {member.user.image ? (
                        <Image
                            alt={member.user.name}
                            source={member.user.image}
                            objectPosition="center"
                            resizeMode="cover"
                            borderBottomLeftRadius={0}
                            borderTopRightRadius={0}
                            borderBottomRightRadius={16}
                            borderTopLeftRadius={16}
                            size={50} />
                    ) : (
                        <Avatar
                            borderBottomLeftRadius={0}
                            borderTopRightRadius={0}
                            borderBottomRightRadius={16}
                            borderTopLeftRadius={16} backgroundColor="primary.100">
                            <Text fontSize="xl" color="primary.600"
                                  bold={true}>{UTILS.getInitials(member.user.name)}</Text>
                        </Avatar>
                    )}
                
                </Box>
                <Box ml={4}>
                    <Text fontSize="sm">{member.user.name}</Text>
                    <Text fontSize="xs" color="muted.400">{member.role.toLowerCase()}</Text>
                    <Text fontSize="xs" color="muted.400">Joined {moment(member.createdAt).fromNow()}</Text>
                </Box>
            </HStack>
        </Box>
    );
};

export default GroupMember;
