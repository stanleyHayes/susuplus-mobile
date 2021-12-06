import React, { useState } from "react";
import { ScrollView, Flex, Text, Divider, Box, Input, Button, FlatList } from "native-base";
import { selectGroups } from "../redux/groups/group-reducers";
import { useDispatch, useSelector } from "react-redux";
import { GROUP_ACTION_CREATORS } from "../redux/groups/group-action-creators";
import SingleInvitationListItem from "./single-invitation-item";
import validator from "validator";
import Empty from "./empty";

const GroupInvitesForm = () => {

    const { createGroupInvitations } = useSelector(selectGroups);

    const [email, setEmail] = useState("");
    const [error, setError] = useState({});

    const [invitations, setInvitations] = useState([...createGroupInvitations]);

    const addInvitation = () => {
        if (!email) {
            setError({error, email: 'Field required'});
            return;
        } else {
            setError({error, email: null});
        }

        if (!validator.isEmail(email)) {
            setError({error, email: 'Invalid email'});
            return;
        } else {
            setError({error, email: null});
        }

        if (invitations.findIndex(invitation => invitation.toLowerCase() === email.toLowerCase()) !== -1) {
            setError({error, email: 'Email already added'});
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
        dispatch(GROUP_ACTION_CREATORS.saveGroupInvites(invitations));
        dispatch(GROUP_ACTION_CREATORS.groupGoToNextPage());
    };

    return (
        <ScrollView flex={1} minHeight="100%">
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
                    ): (
                        invitations.map((email, index) => {
                            return (
                                <SingleInvitationListItem
                                    key={index}
                                    email={email}
                                    index={index}
                                    showDelete={true}
                                    removeInvitation={removeInvitation}
                                />
                            )
                        })
                    )}
                </Box>

                <Button
                    mt={2}
                    backgroundColor="primary.600"
                    py={2}
                    borderRadius={32}
                    onPress={() => dispatch(GROUP_ACTION_CREATORS.groupGoToPreviousPage())}
                    variant="subtle">
                    <Text color="white" fontSize="md">Previous</Text>
                </Button>

                {invitations.length > 0 && (
                    <Button
                        mt={2}
                        backgroundColor="primary.600"
                        py={2}
                        borderRadius={32}
                        onPress={handleGroupInvitationsSubmit}
                        variant="subtle">
                        <Text color="white" fontSize="md">Save Invitees</Text>
                    </Button>
                )}


            </Box>
        </ScrollView>
    );
};

export default GroupInvitesForm;
