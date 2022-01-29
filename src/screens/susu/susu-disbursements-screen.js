import React, { useEffect } from "react";
import { Alert, Spinner, FlatList, Flex, Center, VStack, Text } from "native-base";
import { useSelector } from "react-redux";
import Empty from "../../components/empty";
import SusuDisbursement from "../../components/susu-disbursement";
import { selectSusuDisbursements } from "../../redux/susu-disbursements/susu-disbursement-reducers";
import NavigationBar from "react-native-navbar-color";

const SusuDisbursementsScreen = ({navigation}) => {
  const { susuDisbursementLoading, susuDisbursementError, susuDisbursements } = useSelector(selectSusuDisbursements);
  
  useEffect(() => {
    NavigationBar.setColor('#155e75');
  }, []);
  
  return (
    <Flex position="relative" height="100%" width="100%" backgroundColor="gray.100">
      {susuDisbursementLoading &&
      <Center width="100%" height="100%">
        <Spinner
          position="absolute"
          width="50%"
          height="50%"
          size="lg"
          color="secondary.500"
        />
      </Center>}

      {susuDisbursementError && (
        <Alert p={3} width="100%" status="error" borderRadius={32} variant="left-accent">
          <VStack alignItems="center" width="100%" space={2}>
            <Alert.Icon size="lg" />
            <Text color="red.600" textAlign="center" fontSize="lg">Error</Text>
            <Text fontSize="md" color="red.600">{susuDisbursementError}</Text>
          </VStack>
        </Alert>
      )}

      {susuDisbursements && susuDisbursements.length === 0 ? (
        <Flex backgroundColor="primary.100" width="100%" height="100%" justifyContent="center" alignItems="center">
          <Empty description="You have not been disbursed" title="Disbursements" />
        </Flex>
      ) : (
        <FlatList
          height="100%"
          data={susuDisbursements}
          renderItem={(disbursement) => <SusuDisbursement navigation={navigation} disbursement={disbursement.item} />}
          keyExtractor={(disbursement) => disbursement._id}
        />
      )}
    </Flex>
  );
};

export default SusuDisbursementsScreen;
