import React, { useEffect, useState } from "react";
import { Box, Button, Divider, FlatList, Flex, Input, Text } from "native-base";
import { selectGroups } from "../redux/groups/group-reducers";
import { useDispatch, useSelector } from "react-redux";
import { GROUP_ACTION_CREATORS } from "../redux/groups/group-action-creators";
import UserGroupContactInvitation from "./user-group-contact-invitation";
import { selectUsers } from "../redux/users/user-reducers";

const GroupInvitesForm = () => {
    
    const { createGroupInvitations } = useSelector(selectGroups);
    const { users, userLoading } = useSelector(selectUsers);
    
    const [error, setError] = useState({});
    const [searchUserQuery, setSearchUserQuery] = useState("");
    const [selectedUsers, setSelectedUsers] = useState([...createGroupInvitations]);
    const [suggestedUsers, setSuggestedUsers] = useState([]);
    
    const addUser = user => {
        setSelectedUsers([...selectedUsers, user]);
    };
    
    const removeUser = user => {
        setSelectedUsers(selectedUsers.filter(c => c.email !== user.email));
    };
    
    const dispatch = useDispatch();
    
    const handleGroupInvitationsSubmit = () => {
        if (selectedUsers.length <= 0) {
            setError({ error, invitations: "Invite at least one user" });
            return;
        } else {
            setError({ error, invitations: null });
        }
        dispatch(GROUP_ACTION_CREATORS.saveGroupInvites(selectedUsers));
        dispatch(GROUP_ACTION_CREATORS.groupGoToNextPage());
    };
    
    const handleUserSearch = text => {
        setSearchUserQuery(text);
        setSuggestedUsers(users.filter(user => user.name.includes(text.toLowerCase())));
    };
    
    useEffect(() => {
        if (users) {
            setSuggestedUsers(users);
        }
    }, []);
    
    return (
        <Flex flex={1} px={2} py={4}>
            <Text textAlign="center" fontSize="lg">Group Invitations ({selectedUsers.length})</Text>
            
            <Divider width="100%" my={2} />
            
            <Box>
                <Input
                    isFullWidth={true}
                    isRequired={true}
                    mb={2}
                    width="100%"
                    _focus={{ borderColor: "gray.200" }}
                    value={searchUserQuery}
                    onChangeText={searchQuery => handleUserSearch(searchQuery)}
                    placeholder="Search name"
                    variant="outline"
                    borderWidth={1}
                    size="md"
                    px={3}
                    py={3}
                    mt={2}
                    borderBottomLeftRadius={0}
                    borderTopRightRadius={0}
                    borderBottomRightRadius={16}
                    borderTopLeftRadius={16}
                />
            </Box>
            
            <Box flex={1}>
                <FlatList
                    refreshing={userLoading}
                    keyExtractor={(item) => item._id}
                    data={suggestedUsers}
                    renderItem={({ item }) => (
                        <UserGroupContactInvitation
                            showDelete={true}
                            isAdded={selectedUsers.findIndex(user => user._id === item._id) !== -1}
                            addContact={addUser}
                            removeContact={removeUser}
                            selectedContacts={suggestedUsers}
                            contact={item}
                        />)}
                />
            </Box>
            
            
            <Box width="100%" justifyContent="center" flexDirection="row">
                <Button
                    flexGrow={1}
                    px={3}
                    py={3}
                    mt={2}
                    mr={2}
                    borderBottomLeftRadius={0}
                    borderTopRightRadius={0}
                    borderBottomRightRadius={16}
                    borderTopLeftRadius={16}
                    backgroundColor="primary.600"
                    _text={{ fontFamily: "body", color: "white" }}
                    onPress={() => dispatch(GROUP_ACTION_CREATORS.groupGoToPreviousPage())}
                    variant="subtle">
                    Previous
                </Button>
                {selectedUsers.length > 0 && (
                    <Button
                        flexGrow={1}
                        px={3}
                        py={3}
                        mt={2}
                        borderBottomLeftRadius={0}
                        borderTopRightRadius={0}
                        borderBottomRightRadius={16}
                        borderTopLeftRadius={16}
                        backgroundColor="primary.600"
                        _text={{ fontFamily: "body", color: "white" }}
                        onPress={handleGroupInvitationsSubmit}>
                        Next
                    </Button>
                )}
            </Box>
        </Flex>
    );
};

export default GroupInvitesForm;
