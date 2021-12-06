import React from "react";
import { Avatar, Box, HStack, Image, Text } from "native-base";
import { UTILS } from "../utils/utils";
import moment from "moment";

const GroupMember = ({member}) => {
  
  return (
    <Box
      borderRadius={32}
      backgroundColor="white"
      p={4}
      mx={2}
      my={1}
      shadow={0}>
      <HStack>
        <Box>
          {member.user.image ? (
              <Image
                  alt={member.user.name}
                  source={member.user.image}
                  objectPosition="center"
                  resizeMode="cover"
                  borderRadius={100}
                  size={50} />
          ): (
              <Avatar backgroundColor="primary.100">
                <Text fontSize="xl" color="primary.600" bold={true}>{UTILS.getInitials(member.user.name)}</Text>
              </Avatar>
          )}
         
        </Box>
        <Box ml={4}>
          <Text fontSize="lg">{member.user.name}</Text>
          <Text fontSize="xs">{member.role.toLowerCase()}</Text>
          <Text fontSize="xs">Joined {moment(member.createdAt).fromNow()}</Text>
        </Box>
      </HStack>
    </Box>
  )
}

export default GroupMember;
