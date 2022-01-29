import React from "react";
import { Box, Button, Text } from "native-base";

const UserGroupContactInvitation = ({ contact, addContact, isAdded, removeContact, showDelete }) => {
    
    const handleContactSelected = contact => {
        addContact(contact);
    }
    
    const handleContactRemove = contact => {
        removeContact(contact);
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
            <Box flexGrow={1}>
                <Text mb={1} fontSize="lg" color="muted.500">{contact.name}</Text>
                {contact.isContact && <Text color="muted.400" fontSize="xs">In your contacts</Text>}
            </Box>
            {showDelete && (
                <Box>
                    {isAdded ? (
                        <Button
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
            )}
        </Box>
    );
};

export default UserGroupContactInvitation;
