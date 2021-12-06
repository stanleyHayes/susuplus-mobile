import React, { useEffect } from "react";
import { Alert, Spinner, FlatList, Flex, Fab, Icon, Center, VStack, Text } from "native-base";
import { useDispatch, useSelector } from "react-redux";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Empty from "../../components/empty";
import { selectPaymentMethods } from "../../redux/payment-methods/payment-method-reducers";
import PaymentMethod from "../../components/payment-method";
import { SCREEN_NAME_CONSTANTS } from "../../constants/constants";
import { PAYMENT_METHOD_ACTION_CREATORS } from "../../redux/payment-methods/payment-method-action-creators";
import { selectAuth } from "../../redux/auth/auth-reducer";

const PaymentMethodsScreen = ({ navigation }) => {
  const { paymentMethodLoading, paymentMethodError, paymentMethods } = useSelector(selectPaymentMethods);

  const dispatch = useDispatch();

  const {authToken} = useSelector(selectAuth);

  useEffect(() => {
    dispatch(PAYMENT_METHOD_ACTION_CREATORS.getPaymentMethods(authToken));
  }, []);

  return (
      <Flex position="relative" height="100%" width="100%" backgroundColor="gray.100">
        {paymentMethodLoading &&
        <Center width="100%" height="100%">
          <Spinner
            position="absolute"
            size="lg"
            color="primary.600"
          />
        </Center>}

        <Fab
          color="white"
          backgroundColor="primary.800"
          onPress={() => navigation.push(SCREEN_NAME_CONSTANTS.ADD_PAYMENT_METHOD_SCREEN)}
          position="absolute"
          size="sm"
          icon={<Icon size="sm" as={MaterialIcons} name="add" /> }
          borderRadius="full"
          right={5}
          bottom={20}
        />

        {paymentMethodError && (
          <Alert p={3} width="100%" status="error" borderRadius={32} variant="left-accent">
            <VStack alignItems="center" width="100%" space={2}>
              <Alert.Icon size="lg" />
              <Text color="red.600" textAlign="center" fontSize="lg">Error</Text>
              <Text fontSize="md" color="red.600">{paymentMethodError}</Text>
            </VStack>
          </Alert>
        )}

      {paymentMethods && paymentMethods.length === 0 ? (
        <Flex backgroundColor="white" width="100%" height="100%" justifyContent="center" alignItems="center">
          <Empty description="You have no payment methods" title="Payment Methods" />
        </Flex>
      ) : (
        <FlatList
          data={paymentMethods}
          renderItem={(paymentMethod) => <PaymentMethod navigation={navigation} paymentMethod={paymentMethod.item} />}
          keyExtractor={(paymentMethod) => paymentMethod._id}
        />
      )}
    </Flex>
  );
};

export default PaymentMethodsScreen;
