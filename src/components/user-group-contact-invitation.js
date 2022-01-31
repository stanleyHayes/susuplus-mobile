import React from "react";
import { Avatar, Box, Button, Text } from "native-base";
import { UTILS } from "../utils/utils";
import { useSelector } from "react-redux";
import { selectAuth } from "../redux/auth/auth-reducer";

const UserGroupContactInvitation = ({ contact, addContact, isAdded, removeContact, showDelete }) => {
    
    const handleContactSelected = contact => {
        addContact(contact);
    }
    
    const handleContactRemove = contact => {
        removeContact(contact);
    }
    
    const {userData} = useSelector(selectAuth);
    const isSelf = () => {
        return contact.email === userData.email;
    }
    
    return (
        <Box
            mb={1}
            p={2}
            borderBottomLeftRadius={0}
            borderTopRightRadius={0}
            borderBottomRightRadius={16}
            borderTopLeftRadius={16}
            flexDirection="row"
            backgroundColor="white"
            alignItems="center"
            shadow={0}>
            <Box flexGrow={1} flexDirection="row" alignItems="center">
                <Box mr={2}>
                    <Avatar
                        borderBottomLeftRadius={0}
                            borderTopRightRadius={0}
                            borderBottomRightRadius={16}
                            borderTopLeftRadius={16}
                            backgroundColor="primary.50">
                        <Text fontSize="xl" color="primary.600" bold={true}>{UTILS.getInitials(contact.name)}</Text>
                    </Avatar>
                </Box>
                <Box>
                    <Text fontSize="xs" color="muted.500">{contact.name}</Text>
                    {contact.isContact && <Text color="muted.400" fontSize="xs">In your contacts</Text>}
                </Box>
            </Box>
            {!isSelf() && (
                showDelete && (
                    <Box>
                        {isAdded ? (
                            <Button
                                _text={{fontSize: 'xs'}}
                                onPress={() => handleContactRemove(contact)}
                                borderBottomLeftRadius={0}
                                borderTopRightRadius={0}
                                borderBottomRightRadius={16}
                                borderTopLeftRadius={16}
                                backgroundColor="red.600">
                                Remove
                            </Button>
                        ): (
                            <Button
                                _text={{fontSize: 'xs'}}
                                onPress={() => handleContactSelected(contact)}
                                borderBottomLeftRadius={0}
                                borderTopRightRadius={0}
                                borderBottomRightRadius={16}
                                borderTopLeftRadius={16}
                                backgroundColor="primary.600">
                                Add
                            </Button>
                        )}
                    </Box>
                )
            )}
        </Box>
    );
};

export default UserGroupContactInvitation;
