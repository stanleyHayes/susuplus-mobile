import React, { useEffect } from "react";
import { Alert, Spinner, FlatList, Flex, Center, VStack, Text, Fab, Icon } from "native-base";
import { useDispatch, useSelector } from "react-redux";
import Empty from "../../components/empty";
import Group from "../../components/group";
import { selectGroupMembers } from "../../redux/group-members/group-members-reducers";
import { GROUP_MEMBERS_ACTION_CREATORS } from "../../redux/group-members/group-members-action-creators";
import { selectAuth } from "../../redux/auth/auth-reducer";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { SCREEN_NAME_CONSTANTS } from "../../constants/constants";

const GroupsScreen = ({navigation}) => {
  const { groupMemberLoading, groupMembersError, groupsOfUser } = useSelector(selectGroupMembers);

  const dispatch = useDispatch();

  const {userData, authToken} = useSelector(selectAuth);

  useEffect(() => {
    dispatch(GROUP_MEMBERS_ACTION_CREATORS.getGroupsOfUser(authToken, userData._id));
  }, []);

  return (
    <Flex position="relative" height="100%" width="100%" backgroundColor="gray.100">
      {groupMemberLoading &&
      <Center width="100%" height="100%">
        <Spinner
          position="absolute"
          size="lg"
          color="secondary.500"
        />
      </Center>}

      {groupMembersError && (
        <Alert p={3} width="100%" status="error" borderRadius={32} variant="left-accent">
          <VStack alignItems="center" width="100%" space={2}>
            <Alert.Icon size="lg" />
            <Text color="red.600" textAlign="center" fontSize="lg">Error</Text>
            <Text fontSize="md" color="red.600">{groupMembersError}</Text>
          </VStack>
        </Alert>
      )}

      <Fab
          borderRadius="full"
          backgroundColor="primary.800"
          placement="bottom-right"
          position="absolute"
          onPress={() => {navigation.push(SCREEN_NAME_CONSTANTS.CREATE_GROUP_SCREEN)}}
          right={5}
          bottom={20}
          icon={<Icon as={<MaterialIcons size={10} name="add" />} />}
      />

      {groupsOfUser && groupsOfUser.length === 0 ? (
        <Flex
          backgroundColor="white"
          width="100%"
          height="100%"
          justifyContent="center"
          alignItems="center">
          <Empty description="You belong to no groups" title="User Groups" />
        </Flex>
      ) : (
        <FlatList
          data={groupsOfUser}
          renderItem={(group) => <Group navigation={navigation} group={group.item.group} />}
          keyExtractor={(group) => group._id}
        />
      )}
    </Flex>
  )
};

export default GroupsScreen;
