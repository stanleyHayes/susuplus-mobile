import React from "react";
import { Box, HStack, Icon, Image, Text } from "native-base";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import bankIcon from "../assets/images/bank.png";
import cardIcon from "../assets/images/credit-card.png";

const PaymentMethod = ({ paymentMethod }) => {
    
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
    
    const renderCardNumber = (number, last4) => {
        let format = [];
        for (let i = 0; i < number.length - 4; i++) {
            format.push("*");
            if (i > 0 && i % 4 === 0)
                format.push(" ");
        }
        return `${[...format, " ", ...last4].join("")}`;
    };
    
    
    return (
        <Box
            borderBottomLeftRadius={0}
            borderTopRightRadius={0}
            borderBottomRightRadius={16}
            borderTopLeftRadius={16}
            backgroundColor="white"
            p={4}
            m={2}
            shadow={0}>
            {paymentMethod.method === "Bank Account" ? (
                <Box>
                    <Box mb={1}>{<Image source={bankIcon} alt="Bank Icon" />}</Box>
                    <Text
                        mb={1}
                        fontSize="md" textTransform= 'uppercase'>
                        {paymentMethod.bankAccount.bankName}({paymentMethod.bankAccount.accountBranch})
                    </Text>
                    <Text
                        mb={1}
                        fontSize="md" textTransform= 'uppercase'>
                        {renderCardNumber(paymentMethod.bankAccount.accountNumber, paymentMethod.bankAccount.last4)}
                    </Text>
                    <Text
                        mb={1}
                        fontSize="md" textTransform= 'uppercase'>
                        {paymentMethod.bankAccount.accountName}
                    </Text>
        
        
                    <HStack alignItems="center" direction="row" justifyContent="space-between">
                        <Text fontSize="md" variant="body2">
                            {paymentMethod.bankAccount.bankCode}
                        </Text>
                        <Text fontSize="md">
                            {paymentMethod.bankAccount.mobileNumber}
                        </Text>
                    </HStack>
                </Box>
            ) : paymentMethod.method === "Card" ? (
                <Box>
                    <Box mb={1}>{<Image source={cardIcon} alt="Card Icon" />}</Box>
                    <Text mb={1} fontSize="md" textTransform="uppercase">
                        {paymentMethod.cardDetail.bankIssuer}
                    </Text>
                    <Text
                        mb={1}
                        fontSize="md" textTransform="uppercase">
                        {renderCardNumber(paymentMethod.cardDetail.number, paymentMethod.cardDetail.last4)}
                    </Text>
                    <Text mb={1} fontSize="md" textTransform="uppercase">
                        {paymentMethod.cardDetail.cardHolderName}
                    </Text>
                    <HStack alignItems="center" direction="row" justifyContent="space-between">
                        <Text fontSize="md">
                            {paymentMethod.cardDetail.expiryDate}
                        </Text>
                        <Text fontSize="md" textTransform="uppercase">
                            {paymentMethod.cardDetail.network}
                        </Text>
                    </HStack>
                </Box>
            ) : paymentMethod.method === "Mobile Money" ? (
                <Box>
                    <Text mb={1} fontSize="md" fontFamily="body">{paymentMethod.method}</Text>
                    <Icon size="sm" as={<MaterialIcons name="credit-card" size={10} />} />
                    <Text mb={1} fontSize="md" fontFamily="body">{paymentMethod.mobileMoneyAccount.name}</Text>
                    <Text mb={1} fontSize="md"
                          fontFamily="body">{paymentMethod.mobileMoneyAccount.number}</Text>
                    <HStack justifyContent="space-between">
                        <Text fontSize="md"
                              fontFamily="body">{renderProviderName(paymentMethod.mobileMoneyAccount.provider)}</Text>
                        <Text fontSize="md" fontFamily="body">
                            {renderProviderAccountName(paymentMethod.mobileMoneyAccount.provider)}
                        </Text>
                    </HStack>
                </Box>
            ) : null}
        </Box>
    );
};

export default PaymentMethod;
