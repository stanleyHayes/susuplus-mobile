import React from "react";
import { Avatar, Box, Icon, Text, Pressable, HStack } from "native-base";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const SusuMemberListItem = ({ index, member, showDelete, removeMember, addMember, showMessage }) => {
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
                <Avatar borderBottomLeftRadius={0}
                        borderTopRightRadius={0}
                        borderBottomRightRadius={16}
                        borderTopLeftRadius={16}  size="sm" backgroundColor="primary.100">
                    <Text color="primary.600" fontSize="md">{index + 1}</Text>
                </Avatar>
            </Box>
            
            <Box flex={1} px={2}>
                <Pressable onPress={() => addMember(member)}>
                    <Text fontSize="sm" color="muted.500">{member.user.name}</Text>
                    {showMessage && (<Text fontSize="2xs" color="muted.400">Click to select member</Text>)}
                </Pressable>
            </Box>
            
            {showDelete && (
                <Pressable onPress={() => removeMember(index)}>
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

export default SusuMemberListItem;
