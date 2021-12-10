import React from "react";
import { Box, HStack, Image, Text } from "native-base";
import moment from "moment";
import defaultUserImage from "./../assets/images/user.png";

const PaymentOrder = ({ order }) => {

  return (
    <Box
      borderRadius={32}
      backgroundColor="white"
      p={2}
      mx={2}
      my={0.5}
      shadow={0}>
      <HStack>
        <Box>
          <Image
            alt={order.member.user.name}
            source={order.member.user.image ? order.member.user.image: defaultUserImage}
            objectPosition="center"
            resizeMode="cover"
            borderRadius={100}
            size={50} />
        </Box>
        <Box ml={2}>
          <Text fontSize="xl">{order.member.user.name}</Text>
          <Text>{order.member.role}</Text>
          <Text>Payment Position: {order.position}</Text>

          {order.isPaid ? (
            <Text fontSize="md" fontFamily="body">
              Paid {moment(order.disbursementDate).fromNow()}
            </Text>
          ) : (
            <Text fontSize="md" fontFamily="body">
              Member not paid
            </Text>
          )}
        </Box>
      </HStack>
    </Box>
  );
};

export default PaymentOrder;
