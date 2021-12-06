import React from "react";
import { Alert, Spinner, FlatList, Flex, Center, VStack, Text } from "native-base";
import { useSelector } from "react-redux";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Empty from "../../components/empty";
import { selectGroupContributions } from "../../redux/group-contributions/group-contribution-reducers";
import GroupContribution from "../../components/group-contribution";

const GroupContributionsScreen = ({navigation}) => {
  const { contributionLoading, contributionError, groupContributions } = useSelector(selectGroupContributions);

  return (
    <Flex position="relative" height="100%" width="100%" backgroundColor="gray.100">
      {contributionLoading &&
      <Center width="100%" height="100%">
        <Spinner
          position="absolute"
          width="50%"
          height="50%"
          size="lg"
          color="secondary.500"
        />
      </Center>}

      {contributionError && (
        <Alert p={3} width="100%" status="error" borderRadius={32} variant="left-accent">
          <VStack alignItems="center" width="100%" space={2}>
            <Alert.Icon size="lg" />
            <Text color="red.600" textAlign="center" fontSize="lg">Error</Text>
            <Text fontSize="md" color="red.600">{contributionError}</Text>
          </VStack>
        </Alert>
      )}

      {groupContributions && groupContributions.length === 0 ? (
        <Flex backgroundColor="primary.100" width="100%" height="100%" justifyContent="center" alignItems="center">
          <Empty description="Group has no contributions" title="Contributions" />
        </Flex>
      ) : (
        <FlatList
          data={groupContributions}
          renderItem={(contribution) => <GroupContribution navigation={navigation} contribution={contribution.item} />}
          keyExtractor={(contribution) => contribution._id}
        />
      )}
    </Flex>
  );
};

export default GroupContributionsScreen;
