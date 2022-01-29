import React from "react";
import { Alert, Spinner, FlatList, Flex, Center, VStack, Text } from "native-base";
import { useDispatch, useSelector } from "react-redux";
import Empty from "../../components/empty";
import { selectGroupDisbursements } from "../../redux/group-disbursements/group-disbursement-reducers";
import GroupDisbursement from "../../components/group-disbursement";
import {
  GROUP_DISBURSEMENTS_ACTION_CREATORS
} from "../../redux/group-disbursements/group-disbursement-action-creators";
import { selectAuth } from "../../redux/auth/auth-reducer";

const GroupDisbursementsScreen = ({navigation, route}) => {
  const { groupDisbursementLoading, groupDisbursementError, groupDisbursements } = useSelector(selectGroupDisbursements);

  const {authToken} = useSelector(selectAuth);
  const dispatch = useDispatch();
  
  const {disbursementID} = route.params;
  
  
  return (
    <Flex position="relative" height="100%" width="100%" backgroundColor="gray.100">
      {groupDisbursementLoading &&
      <Center width="100%" height="100%">
        <Spinner
          position="absolute"
          width="50%"
          height="50%"
          size="lg"
          color="secondary.500"
        />
      </Center>}

      {groupDisbursementError && (
        <Alert p={3} width="100%" status="error" borderRadius={32} variant="left-accent">
          <VStack alignItems="center" width="100%" space={2}>
            <Alert.Icon size="lg" />
            <Text color="red.600" textAlign="center" fontSize="lg">Error</Text>
            <Text fontSize="md" color="red.600">{groupDisbursementError}</Text>
          </VStack>
        </Alert>
      )}

      {groupDisbursements && groupDisbursements.length === 0 ? (
        <Flex backgroundColor="primary.100" width="100%" height="100%" justifyContent="center" alignItems="center">
          <Empty
              description="Group has no disbursements"
              title="Disbursements"
              refresh={() => dispatch(GROUP_DISBURSEMENTS_ACTION_CREATORS.getGroupDisbursements(authToken, disbursementID))}
          />
          
        </Flex>
      ) : (
        <FlatList
          height="100%"
          data={groupDisbursements}
          renderItem={(disbursement) => <GroupDisbursement navigation={navigation} disbursement={disbursement.item} />}
          keyExtractor={(disbursement) => disbursement._id}
        />
      )}
    </Flex>
  );
};

export default GroupDisbursementsScreen;
