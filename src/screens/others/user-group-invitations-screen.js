import React, { useEffect } from "react";
import { Alert, Spinner, FlatList, Flex, Center, VStack, Text } from "native-base";
import { useDispatch, useSelector } from "react-redux";
import Empty from "../../components/empty";
import { selectInvites } from "../../redux/invites/group-invites-reducers";
import GroupInvite from "../../components/group-invite";
import { INVITATION_ACTION_CREATORS } from "../../redux/invites/group-invites-action-creators";
import { selectAuth } from "../../redux/auth/auth-reducer";

const UserGroupInvitationsScreen = ({navigation}) => {
  const { inviteLoading, inviteError, invites } = useSelector(selectInvites);
  const {authToken, userData} = useSelector(selectAuth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(INVITATION_ACTION_CREATORS.getInvitations(authToken, `invitee=${userData._id}`));
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
          <Empty description="You have no group invites" title="Group Invites" />
        </Flex>
      ) : (
        <FlatList
          data={invites}
          renderItem={(groupInvite) => <GroupInvite showButtons={true} navigation={navigation} groupInvite={groupInvite.item} />}
          keyExtractor={(groupInvite) => groupInvite._id}
        />
      )}
    </Flex>
  );
};

export default UserGroupInvitationsScreen;
