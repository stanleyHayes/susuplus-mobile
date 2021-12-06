import React from "react";
import { FlatList, Flex } from "native-base";
import Empty from "../../components/empty";
import PaymentOrder from "../../components/payment-order";

const SusuPaymentOrderScreen = ({ navigation, route }) => {

  const { paymentOrder } = route.params;

  return (
    <Flex position="relative" height="100%" width="100%" backgroundColor="gray.100">
      {paymentOrder && paymentOrder.length === 0 ? (
        <Flex backgroundColor="white" width="100%" height="100%" justifyContent="center" alignItems="center">
          <Empty description="There are no susu members" title="Payment Order" />
        </Flex>
      ) : paymentOrder && (
        <FlatList
          height="100%"
          data={paymentOrder}
          renderItem={(order) => <PaymentOrder navigation={navigation} order={order.item} />}
          keyExtractor={(order) => order._id}
        />
      )}
    </Flex>
  );
};

export default SusuPaymentOrderScreen;
