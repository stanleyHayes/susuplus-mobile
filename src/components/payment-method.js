import React from "react";
import { Box, Divider, HStack, Icon,Text } from "native-base";
import Fontisto from "react-native-vector-icons/Fontisto";

const PaymentMethod = ({ paymentMethod }) => {
    const getBrandLogo = brand => {
        switch (brand){
            case 'American Express':
                return 'american-express';
            case 'Visa':
                return 'visa';
            case 'MasterCard':
                return 'mastercard';
            case 'Diners Club':
                return 'dinners-club';
            case 'Discover':
                return 'discover';
            case 'JCB':
                return 'jcb';
            default:
                return 'credit-card';
        }
    }
    
    const renderCardNumber = (number) => {
        const last4 = number.slice(number.length - 4);
        let format = [];
        for (let i = 0; i < number.length - 4; i++) {
            format.push("*");
            if (i > 0 && i % 4 === 0)
                format.push(" ");
        }
        return `${[...format, " ", ...last4].join("")}`;
    };
    console.log(paymentMethod.cardDetails)
    return (
        <Box
            borderBottomLeftRadius={0}
            borderTopRightRadius={0}
            borderBottomRightRadius={16}
            borderTopLeftRadius={16}
            backgroundColor="white"
            p={4}
            mx={2}
            mt={2}
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
                    <Icon mb={2} size="md" as={<Fontisto to name={getBrandLogo(paymentMethod.cardDetails.brand)} />} />
                    <Text mb={2} color="muted.500" fontSize="sm" fontFamily="body">{paymentMethod.cardDetails.brand}</Text>
                    <Text mb={2} color="muted.500" fontSize="sm" fontFamily="body">{paymentMethod.cardDetails.name}</Text>
                    <Text mb={2} color="muted.500" fontSize="sm" fontFamily="body">{renderCardNumber(paymentMethod.cardDetails.number)}</Text>
                    <HStack justifyContent="space-between">
                        <Text mb={2} color="muted.500" fontSize="sm" fontFamily="body">{paymentMethod.cardDetails.cvv}</Text>
                        <Text mb={2} color="muted.500" fontSize="sm" fontFamily="body">
                            {`${paymentMethod.cardDetails.expiryMonth}/${paymentMethod.cardDetails.expiryYear}`}
                        </Text>
                    </HStack>
                </Box>
            ) : null}
        </Box>
    );
};

export default PaymentMethod;
