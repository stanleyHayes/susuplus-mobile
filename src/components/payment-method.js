import React from "react";
import { Box, Text } from "native-base";

const PaymentMethod = ({ paymentMethod }) => {

  return (
    <Box
      borderRadius={32}
      backgroundColor="white"
      p={4}
      m={2}
      shadow={0}>
      {paymentMethod.method === "Bank Account" ? (
        <Box>
          <Text>Payment Method Type</Text>
          <Text mb={2} fontSize="lg" fontFamily="body">{paymentMethod.method}</Text>
          <Text>Bank Name</Text>
          <Text mb={2} fontSize="lg" fontFamily="body">{paymentMethod.bankAccount.bankName}</Text>
          <Text>Account Branch</Text>
          <Text mb={2} fontSize="lg" fontFamily="body">{paymentMethod.bankAccount.accountBranch}</Text>
          <Text>Account Name</Text>
          <Text mb={2} fontSize="lg" fontFamily="body">{paymentMethod.bankAccount.accountName}</Text>
          <Text>Account Number</Text>
          <Text mb={2} fontSize="lg" fontFamily="body">{paymentMethod.bankAccount.accountNumber}</Text>
          <Text>Mobile Number</Text>
          <Text mb={2} fontSize="lg" fontFamily="body">{paymentMethod.bankAccount.mobileNumber}</Text>
        </Box>
      ) : paymentMethod.method === "Card" ? (
        <Box>
          <Text>Payment Method Type</Text>
          <Text mb={2} fontSize="lg" fontFamily="body">{paymentMethod.method}</Text>
          <Text>CVV</Text>
          <Text mb={2} fontSize="lg" fontFamily="body">{paymentMethod.cardDetail.cvv}</Text>
          <Text>Bank Issuer</Text>
          <Text mb={2} fontSize="lg" fontFamily="body">{paymentMethod.cardDetail.bankIssuer}</Text>
          <Text>Card Network</Text>
          <Text mb={2} fontSize="lg" fontFamily="body">{paymentMethod.cardDetail.network}</Text>
          <Text>Card Name</Text>
          <Text mb={2} fontSize="lg" fontFamily="body">{paymentMethod.cardDetail.cardHolderName}</Text>
          <Text>Card Number</Text>
          <Text mb={2} fontSize="lg" fontFamily="body">{paymentMethod.cardDetail.number}</Text>
          <Text>Expiry Date</Text>
          <Text mb={2} fontSize="lg" fontFamily="body">{paymentMethod.cardDetail.expiryDate}</Text>
        </Box>
      ) : paymentMethod.method === "Mobile Money" ? (
        <Box>
          <Text>Payment Method Type</Text>
          <Text mb={2} fontSize="lg" fontFamily="body">{paymentMethod.method}</Text>
          <Text>Provider</Text>
          <Text mb={2} fontSize="lg" fontFamily="body">{paymentMethod.mobileMoneyAccount.provider}</Text>
          <Text>Mobile Money Number</Text>
          <Text mb={2} fontSize="lg" fontFamily="body">{paymentMethod.mobileMoneyAccount.number}</Text>
        </Box>
      ) : null}
    </Box>
  );
};

export default PaymentMethod;
