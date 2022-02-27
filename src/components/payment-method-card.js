import React from "react";
import { Box, Divider, HStack, Icon, Text } from "native-base";
import Fontisto from "react-native-vector-icons/Fontisto";

const PaymentMethodCard = ({ paymentMethod }) => {
    const getBrandLogo = brand => {
        switch (brand){
            case 'AMERICANEXPRESS':
                return 'american-express';
                case 'VISA':
                return 'visa';
                case 'MASTERCARD':
                return 'mastercard';
                case 'DINERSCLUB':
                return 'dinners-club';
                case 'DISCOVER':
                return 'discover';
                case 'JCB':
                return 'jcb';
            default:
                return 'credit-card';
        }
    }
    return (
        <Box
            borderBottomLeftRadius={0}
            borderTopRightRadius={0}
            borderBottomRightRadius={16}
            borderTopLeftRadius={16}
            backgroundColor="white"
            p={4}
            mx={2}
            mb={1}
            shadow={0}>
            {paymentMethod.type === "bank_account" ? (
                <Box>
                    <Text mb={2} fontSize="sm" color="muted.500" fontFamily="body">{paymentMethod.type}</Text>
                    <Divider  mb={2} width="100%" />
                    <Icon size="sm" as={<Fontisto name="bank-account" />} />
                    <Text mb={2} fontSize="sm" color="muted.500"
                          fontFamily="body">{paymentMethod.bankAccount.bankName} ({paymentMethod.bankAccount.accountType})</Text>
                    <Text mb={2} fontSize="sm" color="muted.500" fontFamily="body">{paymentMethod.bankAccount.accountHolderName}</Text>
                    <Text mb={2} fontSize="sm" color="muted.500" fontFamily="body">{paymentMethod.bankAccount.accountNumber}</Text>
                    <HStack justifyContent="flex-end">
                        <Text mb={2} fontSize="sm" color="muted.500" fontFamily="body">
                            {paymentMethod.bankAccount.routingNumber}
                        </Text>
                    </HStack>
                </Box>
            ) : paymentMethod.type === "card" ? (
                <Box>
                    <Text mb={2} color="muted.500" fontSize="md" fontFamily="body">{paymentMethod.type}</Text>
                    <Divider  mb={2} width="100%" />
                    <Icon mb={2} size="md" as={<Fontis
                        to name={getBrandLogo(paymentMethod.card.brand)} />} />
                    <Text mb={2} color="muted.500" fontSize="sm" fontFamily="body">{paymentMethod.card.brand}</Text>
                    <Text mb={2} color="muted.500" fontSize="sm" fontFamily="body">{paymentMethod.card.cardHolderName}</Text>
                    <Text mb={2} color="muted.500" fontSize="sm" fontFamily="body">{paymentMethod.card.cardNumber}</Text>
                    <HStack justifyContent="space-between">
                        <Text mb={2} color="muted.500" fontSize="sm" fontFamily="body">{paymentMethod.card.cvv}</Text>
                        <Text mb={2} color="muted.500" fontSize="sm" fontFamily="body">
                            {paymentMethod.card.expiryDate}
                        </Text>
                    </HStack>
                </Box>
            ) : null}
        </Box>
    );
};

export default PaymentMethodCard;
