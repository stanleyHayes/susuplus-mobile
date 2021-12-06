import React, { useEffect } from "react";
import { Alert, Spinner, FlatList, Flex, Center, VStack, Text } from "native-base";
import { useDispatch, useSelector } from "react-redux";
import Empty from "../../components/empty";
import { selectSusuGroupMembers } from "../../redux/susu-members/susu-members-reducers";
import SusuMember from "../../components/susu-member";
import { SUSU_MEMBERS_ACTION_CREATORS } from "../../redux/susu-members/susu-members-action-creators";
import { selectAuth } from "../../redux/auth/auth-reducer";

const SusuMembersScreen = ({navigation, route}) => {
  const { susuMemberLoading, susuMemberError, susuMembers } = useSelector(selectSusuGroupMembers);
  const {authToken} = useSelector(selectAuth);

  const {susuID} = route.params;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(SUSU_MEMBERS_ACTION_CREATORS.getSusuGroupMembers(authToken, susuID));
  }, []);
  return (
    <Flex position="relative" height="100%" width="100%" backgroundColor="gray.100">
      {susuMemberLoading &&
      <Center width="100%" height="100%">
        <Spinner
          position="absolute"
          width="50%"
          height="50%"
          size="lg"
          color="secondary.500"
        />
      </Center>}

      {susuMemberError && (
        <Alert p={3} width="100%" status="error" borderRadius={32} variant="left-accent">
          <VStack alignItems="center" width="100%" space={2}>
            <Alert.Icon size="lg" />
            <Text color="red.600" textAlign="center" fontSize="lg">Error</Text>
            <Text fontSize="md" textAlign="center" color="red.600">{susuMemberError}</Text>
          </VStack>
        </Alert>
      )}

      {susuMembers && susuMembers.length === 0 ? (
        <Flex backgroundColor="white" width="100%" height="100%" justifyContent="center" alignItems="center">
          <Empty description="There are no susu members" title="Susu Members" />
        </Flex>
      ) : (
        <FlatList
          height="100%"
          data={susuMembers}
          renderItem={(member) => <SusuMember navigation={navigation} susuMember={member.item} />}
          keyExtractor={(member) => member._id}
        />
      )}
    </Flex>
  );
};

export default SusuMembersScreen;
