import React from "react";
import { Alert, Box, Center, Divider, HStack, Image, ScrollView, Spinner, Text, VStack } from "native-base";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useSelector } from "react-redux";
import moment from "moment";
import { selectGroupContributions } from "../../redux/group-contributions/group-contribution-reducers";

const GroupContributionDetailScreen = () => {

  const {
    groupContributionDetail,
    groupContributionLoading,
    groupContributionError,
  } = useSelector(selectGroupContributions);

  return (
    <ScrollView backgroundColor="gray.100">
      <Box position="relative" height="100%" width="100%" backgroundColor="gray.100">
        {groupContributionLoading &&
        <Center width="100%" height="100%">
          <Spinner
            position="absolute"
            width="50%"
            height="50%"
            size="lg"
            color="secondary.500"
          />
        </Center>}

        {groupContributionError && (
          <Alert p={3} width="100%" status="error" borderRadius={32} variant="left-accent">
            <VStack alignItems="center" width="100%" space={2}>
              <Alert.Icon size="lg" />
              <Text color="red.600" textAlign="center" fontSize="lg">Error</Text>
              <Text fontSize="md" color="red.600">{groupContributionError}</Text>
            </VStack>
          </Alert>
        )}

        <Box
          borderRadius={32}
          backgroundColor="white"
          p={4}
          m={2}
          shadow={0}>
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
                alt={groupContributionDetail.contributor.name}
                source={groupContributionDetail.contributor.image}
                objectPosition="center"
                resizeMode="cover"
                borderRadius={100}
                size={50} />
            </Box>
            <Box ml={2}>
              <Text
                fontSize="xl">{groupContributionDetail.contributor.name}</Text>
              <Text>{groupContributionDetail.contributor.role}</Text>
            </Box>
          </HStack>
        </Box>

        <Box
          borderRadius={32}
          backgroundColor="white"
          p={4}
          m={2}
          shadow={0}>
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
              {`${parseFloat(groupContributionDetail.amount.value).toFixed(2)} ${groupContributionDetail.amount.currency}`}
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
              {groupContributionDetail.status}
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
              {moment(groupContributionDetail.createdAt).fromNow()}
            </Text>
          </Box>
        </Box>

        <Box
          borderRadius={32}
          backgroundColor="white"
          p={5}
          m={2}
          shadow={0}>
          {groupContributionDetail.payment.method === "BANK" ? (
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
              <Text mb={2} fontSize="lg" fontFamily="body">{groupContributionDetail.payment.method}</Text>
              <Text>Bank Name</Text>
              <Divider
                alignSelf="center"
                width="100%"
                mt={1}
                mb={1}
                backgroundColor="muted.200"
                orientation="horizontal"
                thickness={1} />
              <Text mb={2} fontSize="lg" fontFamily="body">{groupContributionDetail.payment.bankAccount.bankName}</Text>
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
                    fontFamily="body">{groupContributionDetail.payment.bankAccount.accountBranch}</Text>
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
                    fontFamily="body">{groupContributionDetail.payment.bankAccount.accountName}</Text>
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
                    fontFamily="body">{groupContributionDetail.payment.bankAccount.accountNumber}</Text>
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
                    fontFamily="body">{groupContributionDetail.payment.bankAccount.mobileNumber}</Text>
            </Box>
          ) : groupContributionDetail.payment.method === "CARD" ? (
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
              <Text mb={2} fontSize="lg" fontFamily="body">{groupContributionDetail.payment.method}</Text>
              <Text>CVV</Text>
              <Divider
                alignSelf="center"
                width="100%"
                mt={1}
                mb={1}
                backgroundColor="muted.200"
                orientation="horizontal"
                thickness={1} />
              <Text mb={2} fontSize="lg" fontFamily="body">{groupContributionDetail.payment.cardDetail.cvv}</Text>
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
                    fontFamily="body">{groupContributionDetail.payment.cardDetail.cardHolderName}</Text>
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
                    fontFamily="body">{groupContributionDetail.payment.cardDetail.cardNumber}</Text>
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
                    fontFamily="body">{groupContributionDetail.payment.cardDetail.expiryDate}</Text>
            </Box>
          ) : groupContributionDetail.payment.method === "MOMO" ? (
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
              <Text mb={2} fontSize="lg" fontFamily="body">{groupContributionDetail.payment.method}</Text>
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
                    fontFamily="body">{groupContributionDetail.payment.mobileMoneyAccount.provider}</Text>
              <Text>Mobile Money Number</Text>
              <Divider
                alignSelf="center"
                width="100%"
                mt={1}
                mb={1}
                backgroundColor="muted.200"
                orientation="horizontal"
                thickness={1} />
              <Text fontSize="lg" fontFamily="body">{groupContributionDetail.payment.mobileMoneyAccount.number}</Text>
            </Box>
          ) : null}
        </Box>
      </Box>
    </ScrollView>
  );
};

export default GroupContributionDetailScreen;
