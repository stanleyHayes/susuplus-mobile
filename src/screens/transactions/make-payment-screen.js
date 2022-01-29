import React, { useEffect, useState } from "react";
import { Box, Button, Divider, Flex, ScrollView, Select, Text } from "native-base";
import { useDispatch, useSelector } from "react-redux";
import { CONTRIBUTIONS_ACTION_CREATORS } from "../../redux/user-contributions/user-contribution-action-creators";
import { selectAuth } from "../../redux/auth/auth-reducer";
import { selectGroupPaymentMethods } from "../../redux/group-payment-methods/group-payment-method-reducers";
import { selectPaymentMethods } from "../../redux/payment-methods/payment-method-reducers";
import { PAYMENT_METHOD_ACTION_CREATORS } from "../../redux/payment-methods/payment-method-action-creators";
import { GROUP_PAYMENT_METHOD_ACTION_CREATORS } from "../../redux/group-payment-methods/group-payment-method-action-creators";
import NavigationBar from "react-native-navbar-color";

const MakePaymentScreen = ({ navigation, route }) => {
  const [selectedSourceAccount, setSelectedSourceAccount] = useState("");
  const [selectedDestinationAccount, setSelectedDestinationAccount] = useState("");
  const [sourceAccount, setSourceAccount] = useState(null);
  const [destinationAccount, setDestinationAccount] = useState(null);

  const { groupPaymentMethods } = useSelector(selectGroupPaymentMethods);
  const { paymentMethods } = useSelector(selectPaymentMethods);

  const { authToken } = useSelector(selectAuth);

  const { susuDetail } = route.params;

  useEffect(() => {
    dispatch(PAYMENT_METHOD_ACTION_CREATORS.getPaymentMethods(authToken));
  }, []);

  useEffect(() => {
    dispatch(GROUP_PAYMENT_METHOD_ACTION_CREATORS.getGroupPaymentMethods(authToken, susuDetail.group._id));
  }, []);

  const handleSourceAccountSelectionChange = id => {
    setSelectedSourceAccount(id);
    setSourceAccount(paymentMethods.find(paymentMethod => paymentMethod._id));
  };

  const handleDestinationAccountSelectionChange = id => {
    setSelectedDestinationAccount(id);
    setDestinationAccount(groupPaymentMethods.find(paymentMethod => paymentMethod._id));
  };

  const dispatch = useDispatch();

  const makeContribution = () => {
    dispatch(CONTRIBUTIONS_ACTION_CREATORS.makeContributions({
      sourceAccount: selectedSourceAccount,
      destinationAccount: selectedDestinationAccount,
      susu: susuDetail._id,
      group: susuDetail.group,
    }, authToken, navigation));
  };
  
  useEffect(() => {
    NavigationBar.setColor('#155e75');
  }, []);
  
  return (
    <Flex flex={1} width="100%" minHeight="100%" backgroundColor="gray.200">
      <ScrollView m={2}>

        <Box shadow={0} p={4} m={2} backgroundColor="white" borderRadius={32}>
          <Text fontSize="lg">Group Payment Account</Text>
          <Divider
            alignSelf="center"
            width="100%"
            mt={1}
            mb={1}
            backgroundColor="muted.200"
            orientation="horizontal"
            thickness={1} />

          <Text mb={2}>Select Group Account</Text>
          <Select
            mb={2}
            borderRadius={32}
            placeholder="Select Destination Payment Account"
            variant="outline"
            _selectedItem={{
              backgroundColor: "primary.200",
            }}
            selectedValue={selectedDestinationAccount._id}
            onValueChange={selectedAccount => handleDestinationAccountSelectionChange(selectedAccount)}>
            {groupPaymentMethods && groupPaymentMethods.map(paymentMethod => {
              return (
                paymentMethod.method === "Mobile Money" ? (
                  <Select.Item
                    key={paymentMethod._id}
                    label={`${paymentMethod.mobileMoneyAccount.provider}: ${paymentMethod.mobileMoneyAccount.number}`}
                    value={paymentMethod._id}
                  />
                ) : paymentMethod.method === "Bank Account" ? (
                  <Select.Item
                    key={paymentMethod._id}
                    label={`${paymentMethod.bankAccount.bankName}: ${paymentMethod.bankAccount.accountNumber}`}
                    value={paymentMethod._id}
                  />
                ) : paymentMethod.method === "Card" ?
                  <Select.Item
                    key={paymentMethod._id}
                    label={`${paymentMethod.cardDetail.network}: ${paymentMethod.cardDetail.bankIssuer}: ${paymentMethod.cardDetail.number}`}
                    value={paymentMethod._id}
                  /> : null);
            })}
          </Select>
        </Box>

        <Box shadow={0} p={4} m={2} backgroundColor="white" borderRadius={32}>
          <Text fontSize="lg">Personal Payment Account</Text>
          <Divider
            alignSelf="center"
            width="100%"
            mt={1}
            mb={1}
            backgroundColor="muted.200"
            orientation="horizontal"
            thickness={1} />

          <Text mb={2}>Select Personal Account</Text>
          <Select
            mb={2}
            borderRadius={32}
            placeholder="Select Personal Payment Account"
            variant="outline"
            _selectedItem={{
              backgroundColor: "primary.200",
            }}
            selectedValue={selectedSourceAccount._id}
            onValueChange={selectedAccount => handleSourceAccountSelectionChange(selectedAccount)}>
            {paymentMethods && paymentMethods.map(paymentMethod => {
              return (
                paymentMethod.method === "Mobile Money" ? (
                  <Select.Item
                    key={paymentMethod._id}
                    label={`${paymentMethod.mobileMoneyAccount.provider}: ${paymentMethod.mobileMoneyAccount.number}`}
                    value={paymentMethod._id}
                  />
                ) : paymentMethod.method === "Bank Account" ? (
                  <Select.Item
                    key={paymentMethod._id}
                    label={`${paymentMethod.bankAccount.bankName}: ${paymentMethod.bankAccount.accountNumber}`}
                    value={paymentMethod._id}
                  />
                ) : paymentMethod.method === "Card" ?
                  <Select.Item
                    key={paymentMethod._id}
                    label={`${paymentMethod.cardDetail.network}: ${paymentMethod.cardDetail.bankIssuer}: ${paymentMethod.cardDetail.number}`}
                    value={paymentMethod._id}
                  /> : null);
            })}
          </Select>
        </Box>

        {sourceAccount && destinationAccount && (
          <Box>
            <Box m={2} p={4} shadow={0} borderRadius={32} backgroundColor="white">
              <Text fontSize="lg">Contribution Summary</Text>
              <Divider
                alignSelf="center"
                width="100%"
                mt={1}
                mb={1}
                backgroundColor="muted.200"
                orientation="horizontal"
                thickness={1} />

              <Text mb={2} fontSize="md">
                Contribution of {susuDetail.contributionPlan.currency} {susuDetail.contributionPlan.amount} is being
                made towards
                the susu group {susuDetail.group.name} using the {sourceAccount.method} with the following details
              </Text>

              {sourceAccount.method === "Bank Account" ? (
                <Box>
                  <Text mb={2} fontSize="lg" fontFamily="body">Source Account</Text>
                  <Divider
                    alignSelf="center"
                    width="100%"
                    mt={1}
                    mb={1}
                    backgroundColor="muted.200"
                    orientation="horizontal"
                    thickness={1} />
                  <Text>Payment Method</Text>
                  <Text mb={2} fontSize="lg" fontFamily="body">{sourceAccount.method}</Text>
                  <Text>Bank Name</Text>
                  <Text mb={2} fontSize="lg" fontFamily="body">{sourceAccount.bankAccount.bankName}</Text>
                  <Text>Account Branch</Text>
                  <Text mb={2} fontSize="lg" fontFamily="body">{sourceAccount.bankAccount.accountBranch}</Text>
                  <Text>Account Name</Text>
                  <Text mb={2} fontSize="lg" fontFamily="body">{sourceAccount.bankAccount.accountName}</Text>
                  <Text>Account Number</Text>
                  <Text mb={2} fontSize="lg" fontFamily="body">{sourceAccount.bankAccount.accountNumber}</Text>
                  <Text>Mobile Number</Text>
                  <Text mb={2} fontSize="lg" fontFamily="body">{sourceAccount.bankAccount.mobileNumber}</Text>
                </Box>
              ) : sourceAccount.method === "Card" ? (
                <Box>
                  <Text mb={2} fontSize="lg" fontFamily="body">Destination Account</Text>
                  <Divider
                    alignSelf="center"
                    width="100%"
                    mt={1}
                    mb={1}
                    backgroundColor="muted.200"
                    orientation="horizontal"
                    thickness={1} />
                  <Text>Payment Method</Text>
                  <Text mb={2} fontSize="lg" fontFamily="body">{sourceAccount.method}</Text>
                  <Text>CVV</Text>
                  <Text mb={2} fontSize="lg" fontFamily="body">{sourceAccount.cardDetail.cvv}</Text>
                  <Text>Bank Issuer</Text>
                  <Text mb={2} fontSize="lg" fontFamily="body">{sourceAccount.cardDetail.bankIssuer}</Text>
                  <Text>Card Network</Text>
                  <Text mb={2} fontSize="lg" fontFamily="body">{sourceAccount.cardDetail.network}</Text>
                  <Text>Card Name</Text>
                  <Text mb={2} fontSize="lg" fontFamily="body">{sourceAccount.cardDetail.cardHoldingName}</Text>
                  <Text>Card Number</Text>
                  <Text mb={2} fontSize="lg" fontFamily="body">{sourceAccount.cardDetail.cardNumber}</Text>
                  <Text>Expiry Date</Text>
                  <Text mb={2} fontSize="lg" fontFamily="body">{sourceAccount.cardDetail.expiryDate}</Text>
                </Box>
              ) : sourceAccount.method === "Mobile Money" ? (
                <Box>
                  <Text mb={2} fontSize="lg" fontFamily="body">Destination Account</Text>
                  <Divider
                    alignSelf="center"
                    width="100%"
                    mt={1}
                    mb={1}
                    backgroundColor="muted.200"
                    orientation="horizontal"
                    thickness={1} />
                  <Text>Payment Method</Text>
                  <Text mb={2} fontSize="md" fontFamily="body">{sourceAccount.method}</Text>
                  <Text>Provider</Text>
                  <Text mb={2} fontSize="lg" fontFamily="body">{sourceAccount.mobileMoneyAccount.provider}</Text>
                  <Text>Mobile Money Number</Text>
                  <Text mb={2} fontSize="lg" fontFamily="body">{sourceAccount.mobileMoneyAccount.number}</Text>
                </Box>
              ) : null}

              {destinationAccount.method === "Bank Account" ? (
                <Box>
                  <Text mb={2} fontSize="lg" fontFamily="body">Destination Account</Text>
                  <Divider
                    alignSelf="center"
                    width="100%"
                    mt={1}
                    mb={1}
                    backgroundColor="muted.200"
                    orientation="horizontal"
                    thickness={1} />
                  <Text>Payment Method</Text>
                  <Text mb={2} fontSize="lg" fontFamily="body">{destinationAccount.method}</Text>
                  <Text>Bank Name</Text>
                  <Text mb={2} fontSize="lg" fontFamily="body">{destinationAccount.bankAccount.bankName}</Text>
                  <Text>Account Branch</Text>
                  <Text mb={2} fontSize="lg" fontFamily="body">{destinationAccount.bankAccount.accountBranch}</Text>
                  <Text>Account Name</Text>
                  <Text mb={2} fontSize="lg" fontFamily="body">{destinationAccount.bankAccount.accountName}</Text>
                  <Text>Account Number</Text>
                  <Text mb={2} fontSize="lg" fontFamily="body">{destinationAccount.bankAccount.accountNumber}</Text>
                  <Text>Mobile Number</Text>
                  <Text mb={2} fontSize="lg" fontFamily="body">{destinationAccount.bankAccount.mobileNumber}</Text>
                </Box>
              ) : destinationAccount.method === "Card" ? (
                <Box>
                  <Text mb={2} fontSize="lg" fontFamily="body">Destination Account</Text>
                  <Divider
                    alignSelf="center"
                    width="100%"
                    mt={1}
                    mb={1}
                    backgroundColor="muted.200"
                    orientation="horizontal"
                    thickness={1} />
                  <Text>Payment Method</Text>
                  <Text mb={2} fontSize="lg" fontFamily="body">{destinationAccount.method}</Text>
                  <Text>CVV</Text>
                  <Text mb={2} fontSize="lg" fontFamily="body">{destinationAccount.cardDetail.cvv}</Text>
                  <Text>Bank Issuer</Text>
                  <Text mb={2} fontSize="lg" fontFamily="body">{destinationAccount.cardDetail.bankIssuer}</Text>
                  <Text>Card Network</Text>
                  <Text mb={2} fontSize="lg" fontFamily="body">{destinationAccount.cardDetail.network}</Text>
                  <Text>Card Name</Text>
                  <Text mb={2} fontSize="lg" fontFamily="body">{destinationAccount.cardDetail.cardHolderName}</Text>
                  <Text>Card Number</Text>
                  <Text mb={2} fontSize="lg" fontFamily="body">{destinationAccount.cardDetail.number}</Text>
                  <Text>Expiry Date</Text>
                  <Text mb={2} fontSize="lg" fontFamily="body">{destinationAccount.cardDetail.expiryDate}</Text>
                </Box>
              ) : destinationAccount.method === "Mobile Money" ? (
                <Box>
                  <Text mb={2} fontSize="lg" fontFamily="body">Destination Account</Text>
                  <Divider
                    alignSelf="center"
                    width="100%"
                    mt={1}
                    mb={1}
                    backgroundColor="muted.200"
                    orientation="horizontal"
                    thickness={1} />
                  <Text>Payment Method</Text>
                  <Text mb={2} fontSize="md" fontFamily="body">{destinationAccount.method}</Text>
                  <Text>Provider</Text>
                  <Text mb={2} fontSize="md" fontFamily="body">{destinationAccount.mobileMoneyAccount.provider}</Text>
                  <Text>Mobile Money Number</Text>
                  <Text mb={2} fontSize="md" fontFamily="body">{destinationAccount.mobileMoneyAccount.number}</Text>
                </Box>
              ) : null}
            </Box>
          </Box>
        )}


        {sourceAccount && destinationAccount && (
          <Button
            m={2}
            onPress={makeContribution}
            variant="solid"
            py={4}
            backgroundColor="primary.700"
            borderRadius={32}>
            <Text fontSize="md" color="white">Make Contribution</Text>
          </Button>
        )}
      </ScrollView>
    </Flex>
  );
};

export default MakePaymentScreen;
