import React from "react";
import { Alert, Spinner, FlatList, Flex, Center, VStack, Text } from "native-base";
import { useSelector } from "react-redux";
import Empty from "../../components/empty";
import { selectGroupDisbursements } from "../../redux/group-disbursements/group-disbursement-reducers";
import GroupDisbursement from "../../components/group-disbursement";

const GroupDisbursementsScreen = ({navigation}) => {
  const { groupDisbursementLoading, groupDisbursementError, groupDisbursements } = useSelector(selectGroupDisbursements);

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
          <Empty description="Group has no disbursements" title="Disbursements" />
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
