import React, { useEffect } from "react";
import { Alert, Spinner, FlatList, Flex, Center, VStack, Text } from "native-base";
import { useDispatch, useSelector } from "react-redux";
import Empty from "../../components/empty";
import { selectInvites } from "../../redux/invites/group-invites-reducers";
import { INVITATION_ACTION_CREATORS } from "../../redux/invites/group-invites-action-creators";
import { selectAuth } from "../../redux/auth/auth-reducer";
import UserInvitation from "../../components/user-invite";

const GroupInvitationsScreen = ({ route }) => {
    const { inviteLoading, inviteError, invites } = useSelector(selectInvites);
    const { authToken } = useSelector(selectAuth);
    
    const { groupID } = route.params;
    
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(INVITATION_ACTION_CREATORS.getInvitations(authToken, `group=${groupID}`));
    }, []);
    
    return (
        <Flex position="relative" height="100%" width="100%" backgroundColor="gray.100">
            {inviteLoading &&
            <Center width="100%" height="100%">
                <Spinner
                    position="absolute"
                    size="lg"
                    color="secondary.500"
                />
            </Center>}
            
            {inviteError && (
                <Alert p={3} width="100%" status="error" borderRadius={32} variant="left-accent">
                    <VStack alignItems="center" width="100%" space={2}>
                        <Alert.Icon size="lg" />
                        <Text color="red.600" textAlign="center" fontSize="lg">Error</Text>
                        <Text fontSize="md" color="red.600">{inviteError}</Text>
                    </VStack>
                </Alert>
            )}
            
            {invites && invites.length === 0 ? (
                <Flex backgroundColor="white" width="100%" height="100%" justifyContent="center" alignItems="center">
                    <Empty
                        description="You have no pending invites"
                        title="Group Invites"
                        refresh={() => dispatch(INVITATION_ACTION_CREATORS.getInvitations(authToken, `group=${groupID}`))}
                    />
                </Flex>
            ) : (
                <FlatList
                    refreshing={inviteLoading}
                    onRefresh={() => dispatch(INVITATION_ACTION_CREATORS.getInvitations(authToken, `group=${groupID}`))}
                    data={invites}
                    renderItem={(userInvite) => <UserInvitation userInvite={userInvite.item} />}
                    keyExtractor={(userInvite) => userInvite._id}
                />
            )}
        </Flex>
    );
};

export default GroupInvitationsScreen;
