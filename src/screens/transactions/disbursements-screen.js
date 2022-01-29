import React, { useEffect } from "react";
import { Alert, Spinner, FlatList, Flex, Center, VStack, Text } from "native-base";
import { useDispatch, useSelector } from "react-redux";
import Empty from "../../components/empty";
import { selectUserDisbursements } from "../../redux/user-disbursements/user-disbursement-reducers";
import Disbursement from "../../components/disbursement";
import { DISBURSEMENTS_ACTION_CREATORS } from "../../redux/user-disbursements/user-disbursement-action-creators";
import { selectAuth } from "../../redux/auth/auth-reducer";
import NavigationBar from "react-native-navbar-color";

const DisbursementsScreen = ({ navigation }) => {
  const { userDisbursementLoading, userDisbursementError, userDisbursements } = useSelector(selectUserDisbursements);

  const dispatch = useDispatch();
  const { authToken, userData } = useSelector(selectAuth);

  useEffect(() => {
    dispatch(DISBURSEMENTS_ACTION_CREATORS.getDisbursements(authToken, userData._id));
  }, []);
  
  useEffect(() => {
    NavigationBar.setColor('#155e75');
  }, []);
  
  return (
    <Flex
      position="relative"
      height="100%"
      width="100%"
      backgroundColor="gray.100">
      {userDisbursementLoading &&
      <Center width="100%" height="100%">
        <Spinner
          position="absolute"
          width="50%"
          height="50%"
          size="lg"
          color="secondary.500"
        />
      </Center>}

      {userDisbursementError && (
        <Alert p={3} width="100%" status="error" borderRadius={32} variant="left-accent">
          <VStack alignItems="center" width="100%" space={2}>
            <Alert.Icon size="lg" />
            <Text color="red.600" textAlign="center" fontSize="lg">Error</Text>
            <Text fontSize="md" color="red.600">{userDisbursementError}</Text>
          </VStack>
        </Alert>
      )}

      {userDisbursements && userDisbursements.length === 0 ? (
        <Flex
          backgroundColor="white"
          width="100%"
          height="100%"
          justifyContent="center"
          alignItems="center">
          <Empty
            description="You have not been disbursed"
            title="Disbursements"
            refresh={() => dispatch(DISBURSEMENTS_ACTION_CREATORS.getDisbursements(authToken, userData._id))}
          />
        </Flex>
      ) : (
        <FlatList
          height="100%"
          data={userDisbursements}
          renderItem={(disbursement) => <Disbursement navigation={navigation} disbursement={disbursement.item} />}
          keyExtractor={(disbursement) => disbursement._id}
        />
      )}
    </Flex>
  );
};

export default DisbursementsScreen;
