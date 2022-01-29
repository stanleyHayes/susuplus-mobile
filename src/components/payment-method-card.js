import React from "react";
import { Box, Divider, HStack, Icon, Text } from "native-base";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const PaymentMethodCard = ({ paymentMethod }) => {

    const renderProviderName = code => {
        switch (code) {
            case "mtn":
                return "MTN";
            case "vod":
                return "Vodafone";
            case "tgo":
                return "Airtel Tigo";

            default:
                return "Unknown Provider";
        }
    };

    const renderProviderAccountName = code => {
        switch (code) {
            case "mtn":
                return "MOMO";
            case "vod":
                return "Vodafone Cash";
            case "tgo":
                return "Airtel Tigo Money";

            default:
                return "Unknown Provider";
        }
    };

    return (
        <Box
            borderBottomLeftRadius={0}
            borderTopRightRadius={0}
            borderBottomRightRadius={16}
            borderTopLeftRadius={16}
            backgroundColor="white"
            p={4}
            shadow={0}>
            {paymentMethod.method === "Bank Account" ? (
                <Box>
                    <Text mb={2} fontSize="md" fontFamily="body">{paymentMethod.method}</Text>
                    <Divider  mb={2} width="100%" />
                    <Icon size="sm" as={<MaterialIcons name="bank-account" size={10} />} />
                    <Text mb={2} fontSize="md"
                          fontFamily="body">{paymentMethod.bankAccount.bankName} ({paymentMethod.bankAccount.accountBranch})</Text>
                    <Text mb={2} fontSize="md" fontFamily="body">{paymentMethod.bankAccount.accountName}</Text>
                    <Text mb={2} fontSize="md" fontFamily="body">{paymentMethod.bankAccount.accountNumber}</Text>
                    <HStack justifyContent="flex-end">
                        <Text mb={2} fontSize="md" fontFamily="body">
                            {paymentMethod.bankAccount.mobileNumber}
                        </Text>
                    </HStack>
                </Box>
            ) : paymentMethod.method === "Card" ? (
                <Box>
                    <Text mb={2} fontSize="md" fontFamily="body">{paymentMethod.method}</Text>
                    <Divider  mb={2} width="100%" />
                    <Icon size="sm" as={<MaterialIcons name="bank-account" size={10} />} />
                    <Text mb={2} fontSize="md" fontFamily="body">{paymentMethod.card.bankIssuer}</Text>
                    <Text mb={2} fontSize="md" fontFamily="body">{paymentMethod.card.cardHolderName}</Text>
                    <Text mb={2} fontSize="md" fontFamily="body">{paymentMethod.card.number}</Text>
                    <HStack justifyContent="flex-end">
                        <Text mb={2} fontSize="md" fontFamily="body">
                            {paymentMethod.card.expiryDate}
                        </Text>
                    </HStack>
                </Box>
            ) : paymentMethod.method === "Mobile Money" ? (
                <Box>
                    <Text mb={2} fontSize="md" fontFamily="body">{paymentMethod.method}</Text>
                    <Divider mb={2} width="100%" />
                    <Icon size="sm" as={<MaterialIcons name="credit-card" size={10} />} />
                    <Text mb={2} fontSize="md"
                          fontFamily="body">{renderProviderName(paymentMethod.mobileMoneyAccount.provider)}</Text>
                    <Text mb={2} fontSize="md" fontFamily="body">{paymentMethod.mobileMoneyAccount.name}</Text>
                    <Text mb={2} fontSize="md"
                          fontFamily="body">{paymentMethod.mobileMoneyAccount.mobileMoneyNumber}</Text>
                    <HStack justifyContent="flex-end">
                        <Text mb={2} fontSize="md" fontFamily="body">
                            {renderProviderAccountName(paymentMethod.mobileMoneyAccount.provider)}
                        </Text>
                    </HStack>
                </Box>
            ) : null}
        </Box>
    );
};

export default PaymentMethodCard;
