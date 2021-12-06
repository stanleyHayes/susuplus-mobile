import React from "react";
import { Alert, Box, Divider, HStack, Image, ScrollView, Spinner, Text } from "native-base";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useSelector } from "react-redux";
import moment from "moment";
import { selectSusuContributions } from "../../redux/susu-contributions/susu-contribution-reducers";

const SusuContributionDetailScreen = () => {

  const {
    susuContributionDetail,
    susuContributionLoading,
    susuContributionError,
  } = useSelector(selectSusuContributions);

  return (
    <ScrollView backgroundColor="gray.100">
      <Box>
        {susuContributionLoading && <Spinner size="xl" />}
        {susuContributionError && (
          <Alert status="error" borderRadius={32} variant="left-accent">
            <Alert.Icon as={MaterialIcons} name="error" />
            <Alert.Title>Error</Alert.Title>
            <Alert.Description>{susuContributionError}</Alert.Description>
          </Alert>
        )}

        <Box
          borderRadius={32}
          borderWidth={1}
          borderColor="gray.100"
          backgroundColor="white"
          p={4}
          m={2}
          shadow={1}>
          <Text>Contributor</Text>
          <Divider
            alignSelf="center"
            width="100%"
            mt={1}
            mb={1}
            backgroundColor="muted.200"
            orientation="horizontal"
            thickness={1} />
          <HStack>
            <Box>
              <Image
                alt={susuContributionDetail.contributor.name}
                source={susuContributionDetail.contributor.image}
                objectPosition="center"
                resizeMode="cover"
                borderRadius={100}
                size={50} />
            </Box>
            <Box ml={2}>
              <Text
                mb={1}
                fontSize="xl">{susuContributionDetail.contributor.name}</Text>
              <Text>{susuContributionDetail.contributor.role}</Text>
            </Box>
          </HStack>
        </Box>

        <Box
          borderRadius={32}
          borderWidth={1}
          borderColor="gray.100"
          backgroundColor="white"
          p={4}
          m={2}
          shadow={1}>
          <Box ml={2}>
            <Text>Payment Details</Text>
            <Divider
              alignSelf="center"
              width="100%"
              mt={1}
              mb={1}
              backgroundColor="muted.200"
              orientation="horizontal"
              thickness={1} />
            <Text mb={1} fontSize="xl">
              {`${parseFloat(susuContributionDetail.amount.value).toFixed(2)} ${susuContributionDetail.amount.currency}`}
            </Text>
          </Box>
          <Box ml={2}>
            <Text>Payment Status</Text>
            <Divider
              alignSelf="center"
              width="100%"
              mt={1}
              mb={1}
              backgroundColor="muted.200"
              orientation="horizontal"
              thickness={1} />
            <Text mb={1} fontSize="xl">
              {susuContributionDetail.status}
            </Text>
          </Box>

          <Box ml={2}>
            <Text>Payment Date</Text>
            <Divider
              alignSelf="center"
              width="100%"
              mt={1}
              mb={1}
              backgroundColor="muted.200"
              orientation="horizontal"
              thickness={1} />
            <Text mb={1} fontSize="xl">
              {moment(susuContributionDetail.createdAt).fromNow()}
            </Text>
          </Box>
        </Box>

        <Box
          borderRadius={32}
          borderWidth={1}
          borderColor="gray.100"
          backgroundColor="white"
          p={5}
          m={2}
          shadow={1}>
          {susuContributionDetail.payment.method === "BANK" ? (
            <Box>
              <Text>Payment Method Type</Text>
              <Divider
                alignSelf="center"
                width="100%"
                mt={1}
                mb={1}
                backgroundColor="muted.200"
                orientation="horizontal"
                thickness={1} />
              <Text mb={2} fontSize="lg" fontFamily="body">{susuContributionDetail.payment.method}</Text>
              <Text>Bank Name</Text>
              <Divider
                alignSelf="center"
                width="100%"
                mt={1}
                mb={1}
                backgroundColor="muted.200"
                orientation="horizontal"
                thickness={1} />
              <Text mb={2} fontSize="lg" fontFamily="body">{susuContributionDetail.payment.bankAccount.bankName}</Text>
              <Text>Account Branch</Text>
              <Divider
                alignSelf="center"
                width="100%"
                mt={1}
                mb={1}
                backgroundColor="muted.200"
                orientation="horizontal"
                thickness={1} />
              <Text mb={2} fontSize="lg"
                    fontFamily="body">{susuContributionDetail.payment.bankAccount.accountBranch}</Text>
              <Text>Account Name</Text>
              <Divider
                alignSelf="center"
                width="100%"
                mt={1}
                mb={1}
                backgroundColor="muted.200"
                orientation="horizontal"
                thickness={1} />
              <Text mb={2} fontSize="lg"
                    fontFamily="body">{susuContributionDetail.payment.bankAccount.accountName}</Text>
              <Text>Account Number</Text>
              <Divider
                alignSelf="center"
                width="100%"
                mt={1}
                mb={1}
                backgroundColor="muted.200"
                orientation="horizontal"
                thickness={1} />
              <Text mb={2} fontSize="lg"
                    fontFamily="body">{susuContributionDetail.payment.bankAccount.accountNumber}</Text>
              <Text>Mobile Number</Text>
              <Divider
                alignSelf="center"
                width="100%"
                mt={1}
                mb={1}
                backgroundColor="muted.200"
                orientation="horizontal"
                thickness={1} />
              <Text mb={2} fontSize="lg"
                    fontFamily="body">{susuContributionDetail.payment.bankAccount.mobileNumber}</Text>
            </Box>
          ) : susuContributionDetail.payment.method === "CARD" ? (
            <Box>
              <Text>Payment Method Type</Text>
              <Divider
                alignSelf="center"
                width="100%"
                mt={1}
                mb={1}
                backgroundColor="muted.200"
                orientation="horizontal"
                thickness={1} />
              <Text mb={2} fontSize="lg" fontFamily="body">{susuContributionDetail.payment.method}</Text>
              <Text>CVV</Text>
              <Divider
                alignSelf="center"
                width="100%"
                mt={1}
                mb={1}
                backgroundColor="muted.200"
                orientation="horizontal"
                thickness={1} />
              <Text mb={2} fontSize="lg" fontFamily="body">{susuContributionDetail.payment.cardDetail.cvv}</Text>
              <Text>Card Name</Text>
              <Divider
                alignSelf="center"
                width="100%"
                mt={1}
                mb={1}
                backgroundColor="muted.200"
                orientation="horizontal"
                thickness={1} />
              <Text mb={2} fontSize="lg"
                    fontFamily="body">{susuContributionDetail.payment.cardDetail.cardHolderName}</Text>
              <Text>Card Number</Text>
              <Divider
                alignSelf="center"
                width="100%"
                mt={1}
                mb={1}
                backgroundColor="muted.200"
                orientation="horizontal"
                thickness={1} />
              <Text mb={2} fontSize="lg"
                    fontFamily="body">{susuContributionDetail.payment.cardDetail.cardNumber}</Text>
              <Text>Expiry Date</Text>
              <Divider
                alignSelf="center"
                width="100%"
                mt={1}
                mb={1}
                backgroundColor="muted.200"
                orientation="horizontal"
                thickness={1} />
              <Text mb={2} fontSize="lg"
                    fontFamily="body">{susuContributionDetail.payment.cardDetail.expiryDate}</Text>
            </Box>
          ) : susuContributionDetail.payment.method === "MOMO" ? (
            <Box>
              <Text>Payment Method Type</Text>
              <Divider
                alignSelf="center"
                width="100%"
                mt={1}
                mb={1}
                backgroundColor="muted.200"
                orientation="horizontal"
                thickness={1} />
              <Text mb={2} fontSize="lg" fontFamily="body">{susuContributionDetail.payment.method}</Text>
              <Text>Provider</Text>
              <Divider
                alignSelf="center"
                width="100%"
                mt={1}
                mb={1}
                backgroundColor="muted.200"
                orientation="horizontal"
                thickness={1} />
              <Text mb={2} fontSize="lg"
                    fontFamily="body">{susuContributionDetail.payment.mobileMoneyAccount.provider}</Text>
              <Text>Mobile Money Number</Text>
              <Divider
                alignSelf="center"
                width="100%"
                mt={1}
                mb={1}
                backgroundColor="muted.200"
                orientation="horizontal"
                thickness={1} />
              <Text fontSize="lg" fontFamily="body">{susuContributionDetail.payment.mobileMoneyAccount.number}</Text>
            </Box>
          ) : null}
        </Box>
      </Box>
    </ScrollView>
  );
};

export default SusuContributionDetailScreen;
