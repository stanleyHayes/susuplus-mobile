import React, { useEffect } from "react";
import { Alert, Spinner, FlatList, Flex, Center, VStack, Text } from "native-base";
import { useDispatch, useSelector } from "react-redux";
import Empty from "../../components/empty";
import { selectUserContributions } from "../../redux/user-contributions/user-contribution-reducers";
import Contribution from "../../components/contribution";
import { CONTRIBUTIONS_ACTION_CREATORS } from "../../redux/user-contributions/user-contribution-action-creators";
import { selectAuth } from "../../redux/auth/auth-reducer";
import NavigationBar from "react-native-navbar-color";

const ContributionsScreen = ({navigation}) => {
  const { userContributionLoading, userContributionError, userContributions } = useSelector(selectUserContributions);
  const {authToken} = useSelector(selectAuth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(CONTRIBUTIONS_ACTION_CREATORS.getContributions(authToken));
  }, []);
  
  useEffect(() => {
    NavigationBar.setColor('#155e75');
  }, []);
  
  return (
    <Flex position="relative" height="100%" width="100%" backgroundColor="gray.100">
      {userContributionLoading &&
      <Center width="100%" height="100%" backgroundColor="transparent">
        <Spinner
          position="absolute"
          width="50%"
          height="50%"
          size="lg"
          color="secondary.500"
        />
      </Center>}

      {userContributionError && (
        <Alert p={3} width="100%" status="error" borderRadius={32} variant="left-accent">
          <VStack alignItems="center" width="100%" space={2}>
            <Alert.Icon size="lg" />
            <Text color="red.600" textAlign="center" fontSize="lg">Error</Text>
            <Text fontSize="md" color="red.600">{userContributionError}</Text>
          </VStack>
        </Alert>
      )}

      {userContributions && userContributions.length === 0 ? (
        <Flex
          backgroundColor="white"
          width="100%"
          height="100%"
          justifyContent="center"
          alignItems="center">
          <Empty
              description="You have made no contributions"
              title="Contributions"
              refresh={() => dispatch(CONTRIBUTIONS_ACTION_CREATORS.getContributions(authToken))}
          />
        </Flex>
      ) : (
        <FlatList
          data={userContributions}
          renderItem={(contribution) => <Contribution navigation={navigation} contribution={contribution.item} />}
          keyExtractor={(contribution) => contribution._id}
        />
      )}
    </Flex>
  );
};

export default ContributionsScreen;
