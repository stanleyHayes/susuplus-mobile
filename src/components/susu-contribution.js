import React from "react";
import { Box, Divider, HStack, Image, Pressable, Text } from "native-base";
import { SCREEN_NAME_CONSTANTS } from "../constants/constants";
import moment from "moment";

const SusuContribution = ({ contribution, navigation }) => {

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
        onPress={() => navigation.push(SCREEN_NAME_CONSTANTS.SUSU_CONTRIBUTION_DETAIL_SCREEN, { contributionID: contribution._id })}>
        <Box
          borderRadius={32}
          borderWidth={1}
          borderColor="gray.100"
          backgroundColor="white"
          p={4}
          m={2}
          shadow={0}>
          <HStack>
            <Box>
              <Image
                alt={contribution.contributor.name}
                source={contribution.contributor.image}
                objectPosition="center"
                resizeMode="cover"
                borderRadius={100}
                size={50} />
            </Box>
            <Box ml={2}>
              <Text
                fontSize="xl">
                {contribution.contributor.name}
              </Text>
              <Text>{moment(contribution.createdAt).fromNow()}</Text>
            </Box>
          </HStack>
          <Divider
            alignSelf="center"
            width="100%"
            mt={1}
            mb={1}
            backgroundColor="muted.200"
            orientation="horizontal"
            thickness={1} />
          <Box>
            <Text>Contribution</Text>
            <Text mb={2} fontSize="lg" fontFamily="body">
              {`${parseFloat(contribution.amount.value).toFixed(2)} ${contribution.amount.currency}`}
            </Text>

            <Text>Payment Method</Text>
            <Text fontSize="lg" fontFamily="body">{getPaymentMethod(contribution.payment.method)}</Text>
          </Box>
        </Box>
      </Pressable>
    </Box>
  );
};
export default SusuContribution;
