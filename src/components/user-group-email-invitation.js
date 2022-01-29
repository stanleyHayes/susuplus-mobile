import React from "react";
import { Box, Button, Text } from "native-base";

const UserGroupEmailInvitation = ({ user, addUser, isAdded, removeUser }) => {
    
    const handleUserSelected = user => {
        addUser(user);
    }
    
    const handleUserRemove = user => {
        removeUser(user);
    }
    
    const inContacts = (number, user) => {
        const phone = number.replace(' ', '').substr(3);
        const userPhone = user.phone.substr(3);
        return phone === userPhone;
    }
    
    return (
        <Box
            borderBottomLeftRadius={0}
            borderTopRightRadius={0}
            borderBottomRightRadius={16}
            borderTopLeftRadius={16}
            backgroundColor="primary.50"
            my={2}
            p={2}
            shadow={0}>
            <Text mb={1} fontSize="xs">{`${user.firstName} ${user.lastName}`}</Text>
            {<Text fontSize="sm"> {user.email}</Text>}
            {inContacts() &&<Text>In your contacts</Text>}
            {isAdded ? (
                <Button
                    onPress={() => handleUserRemove(user)}
                    mt={2}
                    borderBottomLeftRadius={0}
                    borderTopRightRadius={0}
                    borderBottomRightRadius={16}
                    borderTopLeftRadius={16}
                    backgroundColor="red.600">
                    Remove
                </Button>
            ): (
                <Button
                    onPress={() => handleUserSelected(user)}
                    mt={2}
                    borderBottomLeftRadius={0}
                    borderTopRightRadius={0}
                    borderBottomRightRadius={16}
                    borderTopLeftRadius={16}
                    backgroundColor="primary.600">
                    Add
                </Button>
            )}
        </Box>
    );
};

export default UserGroupEmailInvitation;
