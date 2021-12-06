import React, { useState } from "react";
import { Box, Button, Center, Divider, Flex, Input, ScrollView, Spinner, Text } from "native-base";
import validator from "validator";
import { useDispatch, useSelector } from "react-redux";
import SingleInvitationListItem from "../../components/single-invitation-item";
import Empty from "../../components/empty";
import { INVITATION_ACTION_CREATORS } from "../../redux/invites/group-invites-action-creators";
import { selectAuth } from "../../redux/auth/auth-reducer";
import { selectInvites } from "../../redux/invites/group-invites-reducers";

const InviteGroupUsersScreen = ({ navigation, route }) => {
    
    const { authToken } = useSelector(selectAuth);
    const { inviteLoading } = useSelector(selectInvites);
    const { groupID } = route.params;
    
    const [email, setEmail] = useState("");
    const [error, setError] = useState({});
    
    const [invitations, setInvitations] = useState([]);
    
    const addInvitation = () => {
        if (!email) {
            setError({ error, email: "Field required" });
            return;
        } else {
            setError({ error, email: null });
        }
        
        if (!validator.isEmail(email)) {
            setError({ error, email: "Invalid email" });
            return;
        } else {
            setError({ error, email: null });
        }
        
        if (invitations.findIndex(invitation => invitation.toLowerCase() === email.toLowerCase()) !== -1) {
            setError({ error, email: "Email already added" });
            return;
        }
        setInvitations([...invitations, email.toLowerCase()]);
        setEmail("");
    };
    
    const removeInvitation = i => {
        setInvitations(invitations.filter((invitation, index) => i !== index));
    };
    
    const dispatch = useDispatch();
    
    const handleGroupInvitationsSubmit = () => {
        if (invitations.length <= 0) {
            setError({ error, invitations: "Invite at least one user" });
            return;
        } else {
            setError({ error, invitations: null });
        }
        dispatch(INVITATION_ACTION_CREATORS.createInvitation(
            { group: groupID, invitations },
            authToken), navigation);
    };
    
    return (
        <ScrollView backgroundColor="gray.100">
            <Flex flex={1} position="relative" minHeight="100%">
                <Box position="absolute" flex={1} width="100%" >
                    <Spinner position="absolute" zIndex={10000} size={50} />
                </Box>
                <Box borderRadius={32} p={5} shadow={0} backgroundColor="white" m={2}>
                    <Text textAlign="center" fontSize="lg">Group Invitations</Text>
                    
                    <Divider width="100%" my={2} />
                    
                    <Box mb={2}>
                        <Input
                            placeholder="Type email"
                            variant="filled"
                            borderRadius={32}
                            py={4}
                            px={4}
                            isInvalid={Boolean(error.email)}
                            _focus={{ borderColor: "gray.50" }}
                            _invalid={{ borderColor: "red.400", borderWidth: 1, borderStyle: "solid" }}
                            isFullWidth={true}
                            backgroundColor="gray.50"
                            mb={1}
                            value={email}
                            name="email"
                            keyboardType="email-address"
                            textContentType="emailAddress"
                            onChangeText={email => setEmail(email)}
                            isRequired={true}
                        />
                        {error.email && <Text color="error.400">{error.email}</Text>}
                        
                        <Button
                            mt={2}
                            backgroundColor="primary.600"
                            py={2} borderRadius={32}
                            onPress={addInvitation}
                            variant="subtle">
                            <Text color="white" fontSize="md">Add</Text>
                        </Button>
                    </Box>
                </Box>
                
                <Box borderRadius={32} p={4} shadow={0} backgroundColor="white" m={2}>
                    <Text textAlign="center" fontSize="lg">Group Invitations ({invitations.length})</Text>
                    
                    <Divider width="100%" my={2} />
                    
                    <Box>
                        {invitations.length === 0 ? (
                            <Box>
                                <Empty title="Invitations" description="Invite at least one user" />
                            </Box>
                        ) : (
                            invitations.map((email, index) => {
                                return (
                                    <SingleInvitationListItem
                                        key={index}
                                        email={email}
                                        index={index}
                                        showDelete={true}
                                        removeInvitation={removeInvitation}
                                    />
                                );
                            })
                        )}
                    </Box>
                    
                    
                    {invitations.length > 0 && (
                        <Button
                            mt={2}
                            backgroundColor="primary.600"
                            py={2}
                            borderRadius={32}
                            onPress={handleGroupInvitationsSubmit}
                            variant="subtle">
                            <Text color="white" fontSize="md">Invite Users</Text>
                        </Button>
                    )}
                
                
                </Box>
            </Flex>
        </ScrollView>
    );
};

export default InviteGroupUsersScreen;
