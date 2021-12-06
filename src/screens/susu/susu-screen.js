import React, { useEffect } from "react";
import { Alert, Spinner, FlatList, Flex, Center, Text, VStack } from "native-base";
import { useDispatch, useSelector } from "react-redux";
import Empty from "../../components/empty";
import Susu from "../../components/susu";
import { selectSusuGroupMembers } from "../../redux/susu-members/susu-members-reducers";
import { SUSU_MEMBERS_ACTION_CREATORS } from "../../redux/susu-members/susu-members-action-creators";
import { selectAuth } from "../../redux/auth/auth-reducer";

const SusuScreen = ({ navigation }) => {
  const { susuMemberLoading, susuMemberError, susuGroupsOfUser } = useSelector(selectSusuGroupMembers);
  const {authToken, userData} = useSelector(selectAuth);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(SUSU_MEMBERS_ACTION_CREATORS.getGroupsOfUser(authToken, userData._id));
  }, []);

  return (
    <Flex position="relative" height="100%" width="100%" backgroundColor="gray.100">
      {susuMemberLoading &&
      <Center position="absolute" right="50%" top="50%">
        <Spinner
          position="absolute"
          size="lg"
          color="primary.800"
        />
      </Center>}

      {susuMemberError && (
        <Alert p={3} width="100%" status="error" borderRadius={32} variant="left-accent">
          <VStack alignItems="center" width="100%" space={2}>
            <Alert.Icon size="lg" />
            <Text color="red.600" textAlign="center" fontSize="lg">Error</Text>
            <Text fontSize="md" color="red.600">{susuMemberError}</Text>
          </VStack>
        </Alert>
      )}

      {susuGroupsOfUser && susuGroupsOfUser.length === 0 ? (
        <Flex
          backgroundColor="white"
          width="100%" height="100%"
          justifyContent="center"
          alignItems="center">
          <Empty description="You belong to no susu groups" title="Susu Groups" />
        </Flex>
      ) : (
        <FlatList
          data={susuGroupsOfUser}
          renderItem={(susu) => <Susu navigation={navigation} susu={susu.item.susu} group={susu.item.group} />}
          keyExtractor={(susu) => susu._id}
        />
      )}
    </Flex>
  );
};

export default SusuScreen;
