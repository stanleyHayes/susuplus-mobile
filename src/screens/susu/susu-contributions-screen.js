import React, { useEffect } from "react";
import { Alert, Spinner, FlatList, Flex, Center, VStack, Text } from "native-base";
import { useSelector } from "react-redux";
import Empty from "../../components/empty";
import { selectSusuContributions } from "../../redux/susu-contributions/susu-contribution-reducers";
import SusuContribution from "../../components/susu-contribution";
import NavigationBar from "react-native-navbar-color";

const SusuContributionsScreen = ({navigation}) => {
  const { susuContributionLoading, susuContributionError, susuContributions } = useSelector(selectSusuContributions);
  
  useEffect(() => {
    NavigationBar.setColor('#155e75');
  }, []);
  
  return (
      <Flex position="relative" height="100%" width="100%" backgroundColor="gray.100">
        {susuContributionLoading &&
        <Center width="100%" height="100%">
          <Spinner
            position="absolute"
            width="50%"
            height="50%"
            size="lg"
            color="secondary.500"
          />
        </Center>}

        {susuContributionError && (
          <Alert p={3} width="100%" status="error" borderRadius={32} variant="left-accent">
            <VStack alignItems="center" width="100%" space={2}>
              <Alert.Icon size="lg" />
              <Text color="red.600" textAlign="center" fontSize="lg">Error</Text>
              <Text fontSize="md" color="red.600">{susuContributionError}</Text>
            </VStack>
          </Alert>
        )}

      {susuContributions && susuContributions.length === 0 ? (
        <Flex backgroundColor="primary.100" width="100%" height="100%" justifyContent="center" alignItems="center">
          <Empty description="You have made no contributions" title="Contributions" />
        </Flex>
      ) : (
        <FlatList
          data={susuContributions}
          renderItem={(contribution) => <SusuContribution navigation={navigation} contribution={contribution.item} />}
          keyExtractor={(contribution) => contribution._id}
        />
      )}
    </Flex>
  );
};

export default SusuContributionsScreen;
