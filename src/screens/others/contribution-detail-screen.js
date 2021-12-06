import React from "react";
import { Alert, Box, Center, Divider, HStack, Image, ScrollView, Spinner, Text, VStack } from "native-base";
import { useSelector } from "react-redux";
import moment from "moment";
import { selectContributions } from "../../redux/user-contributions/user-contribution-reducers";

const ContributionDetailScreen = () => {

  const { contributionDetail, contributionLoading, contributionError } = useSelector(selectContributions);

  return (
    <ScrollView>
      <Box position="relative" height="100%" width="100%" backgroundColor="gray.100">
        {contributionLoading &&
        <Center width="100%" height="100%">
          <Spinner
            position="absolute"
            width="50%"
            height="50%"
            size="lg"
            color="secondary.500"
          />
        </Center>}

        {contributionError && (
          <Alert p={3} width="100%" status="error" borderRadius={32} variant="left-accent">
            <VStack alignItems="center" width="100%" space={2}>
              <Alert.Icon size="lg" />
              <Text color="red.600" textAlign="center" fontSize="lg">Error</Text>
              <Text fontSize="md" color="red.600">{contributionError}</Text>
            </VStack>
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
          <Text>Group</Text>
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
                alt={contributionDetail.group.name}
                source={contributionDetail.group.image}
                objectPosition="center"
                resizeMode="cover"
                borderRadius={100}
                size={50} />
            </Box>
            <Box ml={2}>
              <Text
                mb={1}
                fontSize="xl">{contributionDetail.group.name}</Text>
              <Text>{contributionDetail.group.description}</Text>
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
              {`${parseFloat(contributionDetail.amount.value).toFixed(2)} ${contributionDetail.amount.currency}`}
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
              {contributionDetail.status}
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
              {moment(contributionDetail.createdAt).fromNow()}
            </Text>
          </Box>
        </Box>

        <Box
          borderRadius={32}
          borderWidth={1}
          borderColor="gray.100"
          backgroundColor="white"
          p={4}
          m={2}
          shadow={1}>
          {contributionDetail.payment.method === "BANK" ? (
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
              <Text fontSize="lg" fontFamily="body">{contributionDetail.payment.method}</Text>
              <Text>Bank Name</Text>
              <Divider
                alignSelf="center"
                width="100%"
                mt={1}
                mb={1}
                backgroundColor="muted.200"
                orientation="horizontal"
                thickness={1} />
              <Text fontSize="lg" fontFamily="body">{contributionDetail.payment.bankAccount.bankName}</Text>
              <Text>Account Branch</Text>
              <Divider
                alignSelf="center"
                width="100%"
                mt={1}
                mb={1}
                backgroundColor="muted.200"
                orientation="horizontal"
                thickness={1} />
              <Text fontSize="lg" fontFamily="body">{contributionDetail.payment.bankAccount.accountBranch}</Text>
              <Text>Account Name</Text>
              <Divider
                alignSelf="center"
                width="100%"
                mt={1}
                mb={1}
                backgroundColor="muted.200"
                orientation="horizontal"
                thickness={1} />
              <Text fontSize="lg" fontFamily="body">{contributionDetail.payment.bankAccount.accountName}</Text>
              <Text>Account Number</Text>
              <Divider
                alignSelf="center"
                width="100%"
                mt={1}
                mb={1}
                backgroundColor="muted.200"
                orientation="horizontal"
                thickness={1} />
              <Text fontSize="lg" fontFamily="body">{contributionDetail.payment.bankAccount.accountNumber}</Text>
              <Text>Mobile Number</Text>
              <Divider
                alignSelf="center"
                width="100%"
                mt={1}
                mb={1}
                backgroundColor="muted.200"
                orientation="horizontal"
                thickness={1} />
              <Text fontSize="lg" fontFamily="body">{contributionDetail.payment.bankAccount.mobileNumber}</Text>
            </Box>
          ) : contributionDetail.payment.method === "CARD" ? (
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
              <Text fontSize="lg" fontFamily="body">{contributionDetail.payment.method}</Text>
              <Text>Issuing Network</Text>
              <Divider
                alignSelf="center"
                width="100%"
                mt={1}
                mb={1}
                backgroundColor="muted.200"
                orientation="horizontal"
                thickness={1} />
              <Text fontSize="lg" fontFamily="body">{contributionDetail.payment.cardDetail.issuingNetwork}</Text>
              <Text>Card Name</Text>
              <Divider
                alignSelf="center"
                width="100%"
                mt={1}
                mb={1}
                backgroundColor="muted.200"
                orientation="horizontal"
                thickness={1} />
              <Text fontSize="lg" fontFamily="body">{contributionDetail.payment.cardDetail.cardHolderName}</Text>
              <Text>Card Number</Text>
              <Divider
                alignSelf="center"
                width="100%"
                mt={1}
                mb={1}
                backgroundColor="muted.200"
                orientation="horizontal"
                thickness={1} />
              <Text fontSize="lg" fontFamily="body">{contributionDetail.payment.cardDetail.cardNumber}</Text>
              <Text>Expiry Date</Text>
              <Divider
                alignSelf="center"
                width="100%"
                mt={1}
                mb={1}
                backgroundColor="muted.200"
                orientation="horizontal"
                thickness={1} />
              <Text fontSize="lg" fontFamily="body">{contributionDetail.payment.cardDetail.expiryDate}</Text>
            </Box>
          ) : contributionDetail.payment.method === "MOMO" ? (
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
              <Text fontSize="lg" fontFamily="body">{contributionDetail.payment.method}</Text>
              <Text>Provider</Text>
              <Divider
                alignSelf="center"
                width="100%"
                mt={1}
                mb={1}
                backgroundColor="muted.200"
                orientation="horizontal"
                thickness={1} />
              <Text fontSize="lg" fontFamily="body">{contributionDetail.payment.mobileMoneyAccount.provider}</Text>
              <Text>Mobile Money Number</Text>
              <Divider
                alignSelf="center"
                width="100%"
                mt={1}
                mb={1}
                backgroundColor="muted.200"
                orientation="horizontal"
                thickness={1} />
              <Text fontSize="lg" fontFamily="body">{contributionDetail.payment.mobileMoneyAccount.number}</Text>
            </Box>
          ) : null}
        </Box>
      </Box>

    </ScrollView>
  );
};

export default ContributionDetailScreen;
