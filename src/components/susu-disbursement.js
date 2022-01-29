import React from "react";
import { Box, Divider, HStack, Image, Pressable, Text } from "native-base";
import { SCREEN_NAME_CONSTANTS } from "../constants/constants";
import moment from "moment";

const SusuDisbursement = ({ disbursement, navigation }) => {

  const getPaymentMethod = method => {
    switch (method) {
      case "BANK":
        return "Bank Account";
      case "MOMO":
        return "Mobile Money";
      case "CARD":
        return "Debit Card";
      case "PAYPAL":
        return "Paypal";
    }
  };

  return (
    <Box>
      <Pressable
        onPress={() => navigation.push(SCREEN_NAME_CONSTANTS.GROUP_DISBURSEMENT_DETAIL_SCREEN, { disbursementID: disbursement._id })}>
        <Box
            borderBottomLeftRadius={0}
            borderTopRightRadius={0}
            borderBottomRightRadius={16}
            borderTopLeftRadius={16}
          borderWidth={1}
          borderColor="gray.100"
          backgroundColor="white"
          p={4}
          m={2}
          shadow={0}>
          <HStack>
            <Box>
              <Image
                alt={disbursement.recipient.name}
                source={disbursement.recipient.image}
                objectPosition="center"
                resizeMode="cover"
                borderRadius={100}
                size={50} />
            </Box>
            <Box ml={2}>
              <Text
                fontWeight={700}
                fontSize="xl">
                {disbursement.recipient.name}
              </Text>
              <Text>
                {moment(disbursement.createdAt).fromNow()}
              </Text>
            </Box>
          </HStack>
          <Divider
            alignSelf="center"
            width="100%"
            mt={1}
            mb={1}
            backgroundColor="muted.100"
            orientation="horizontal"
            thickness={1} />
          <Box>
            <Text>Disbursement</Text>
            <Divider
              alignSelf="center"
              width="100%"
              mt={1}
              mb={1}
              backgroundColor="muted.200"
              orientation="horizontal"
              thickness={1} />
            <Text mb={2} fontSize="md" bold={true}>
              {`${parseFloat(disbursement.amount.value).toFixed(2)} ${disbursement.amount.currency}`}
            </Text>

            <Text>Payment Method</Text>
            <Divider
              alignSelf="center"
              width="100%"
              mt={1}
              mb={1}
              backgroundColor="muted.100"
              orientation="horizontal"
              thickness={1} />
            <Text fontSize="md" bold={true}>
              {getPaymentMethod(disbursement.payment.method)}
            </Text>
          </Box>
        </Box>
      </Pressable>
    </Box>
  );
};
export default SusuDisbursement;
