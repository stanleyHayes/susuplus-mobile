import React from "react";
import { Avatar, Box, Icon, Text, Pressable, HStack } from "native-base";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const SingleInvitationListItem = ({ index, email, showDelete, removeInvitation }) => {
    return (
        <HStack
            justifyContent="space-between"
            borderBottomLeftRadius={0}
            borderTopRightRadius={0}
            borderBottomRightRadius={16}
            borderTopLeftRadius={16}
            backgroundColor="primary.50"
            mx={2}
            my={0.5}
            p={1}
            flex={1}
            flexDirection="row"
            alignItems="center">
            <Box>
                <Avatar size="sm" backgroundColor="primary.100">
                    <Text color="primary.600" fontSize="md">{index + 1}</Text>
                </Avatar>
            </Box>
            <Box flexGrow={1} flex={1} px={2}>
                <Text fontSize="sm">{email.toLowerCase()}</Text>
            </Box>
            {showDelete && (
                <Pressable onPress={() => removeInvitation(index)}>
                    <Icon
                        size="sm"
                        color="red.400"
                        as={<MaterialIcons name="delete" size={10} />}
                    />
                </Pressable>
            )}
        </HStack>
    );
};

export default SingleInvitationListItem;
