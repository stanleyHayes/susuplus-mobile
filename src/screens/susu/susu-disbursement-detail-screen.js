import React from "react";
import { Alert, Box, Center, Divider, HStack, Image, ScrollView, Spinner, Text, VStack } from "native-base";
import { useSelector } from "react-redux";
import moment from "moment";
import { selectSusuDisbursements } from "../../redux/susu-disbursements/susu-disbursement-reducers";

const SusuDisbursementDetailScreen = () => {
    
    const {
        susuDisbursementDetail,
        susuDisbursementLoading,
        susuDisbursementError,
    } = useSelector(selectSusuDisbursements);
    
    return (
        <ScrollView backgroundColor="gray.100">
            <Box position="relative" height="100%" width="100%" backgroundColor="gray.100">
                {susuDisbursementLoading &&
                <Center width="100%" height="100%">
                    <Spinner
                        position="absolute"
                        width="50%"
                        height="50%"
                        size="lg"
                        color="secondary.500"
                    />
                </Center>}
                
                {susuDisbursementError && (
                    <Alert p={3} width="100%" status="error" borderRadius={32} variant="left-accent">
                        <VStack alignItems="center" width="100%" space={2}>
                            <Alert.Icon size="lg" />
                            <Text color="red.600" textAlign="center" fontSize="lg">Error</Text>
                            <Text fontSize="md" color="red.600">{susuDisbursementError}</Text>
                        </VStack>
                    </Alert>
                )}
                
                <Box
                    borderRadius={32}
                    backgroundColor="white"
                    p={2}
                    m={2}
                    shadow={0}>
                    <Text>Recipient</Text>
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
                                alt={susuDisbursementDetail.recipient.name}
                                source={susuDisbursementDetail.recipient.image}
                                objectPosition="center"
                                resizeMode="cover"
                                borderRadius={100}
                                size={50} />
                        </Box>
                        <Box ml={2}>
                            <Text
                                mb={1}
                                fontSize="xl">{susuDisbursementDetail.recipient.name}</Text>
                            <Text>{susuDisbursementDetail.recipient.role}</Text>
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
                            {`${parseFloat(susuDisbursementDetail.amount.value).toFixed(2)} ${susuDisbursementDetail.amount.currentRecipient}`}
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
                            {susuDisbursementDetail.status}
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
                            {moment(susuDisbursementDetail.createdAt).fromNow()}
                        </Text>
                    </Box>
                </Box>
                
                <Box
                    borderRadius={32}
                    backgroundColor="white"
                    p={4}
                    m={2}
                    shadow={0}>
                    {susuDisbursementDetail.payment.method === "BANK" ? (
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
                            <Text fontSize="lg" fontFamily="body">{susuDisbursementDetail.payment.method}</Text>
                            <Text>Bank Name</Text>
                            <Divider
                                alignSelf="center"
                                width="100%"
                                mt={1}
                                mb={1}
                                backgroundColor="muted.200"
                                orientation="horizontal"
                                thickness={1} />
                            <Text fontSize="lg"
                                  fontFamily="body">{susuDisbursementDetail.payment.bankAccount.bankName}</Text>
                            <Text>Account Branch</Text>
                            <Divider
                                alignSelf="center"
                                width="100%"
                                mt={1}
                                mb={1}
                                backgroundColor="muted.200"
                                orientation="horizontal"
                                thickness={1} />
                            <Text fontSize="lg"
                                  fontFamily="body">{susuDisbursementDetail.payment.bankAccount.accountBranch}</Text>
                            <Text>Account Name</Text>
                            <Divider
                                alignSelf="center"
                                width="100%"
                                mt={1}
                                mb={1}
                                backgroundColor="muted.200"
                                orientation="horizontal"
                                thickness={1} />
                            <Text fontSize="lg"
                                  fontFamily="body">{susuDisbursementDetail.payment.bankAccount.accountName}</Text>
                            <Text>Account Number</Text>
                            <Divider
                                alignSelf="center"
                                width="100%"
                                mt={1}
                                mb={1}
                                backgroundColor="muted.200"
                                orientation="horizontal"
                                thickness={1} />
                            <Text fontSize="lg"
                                  fontFamily="body">{susuDisbursementDetail.payment.bankAccount.accountNumber}</Text>
                            <Text>Mobile Number</Text>
                            <Divider
                                alignSelf="center"
                                width="100%"
                                mt={1}
                                mb={1}
                                backgroundColor="muted.200"
                                orientation="horizontal"
                                thickness={1} />
                            <Text fontSize="lg"
                                  fontFamily="body">{susuDisbursementDetail.payment.bankAccount.mobileNumber}</Text>
                        </Box>
                    ) : susuDisbursementDetail.payment.method === "CARD" ? (
                        <Box>
                            <Divider
                                alignSelf="center"
                                width="100%"
                                mt={1}
                                mb={1}
                                backgroundColor="muted.200"
                                orientation="horizontal"
                                thickness={1} />
                            <Text>Payment Method Type</Text>
                            <Text fontSize="lg" fontFamily="body">{susuDisbursementDetail.payment.method}</Text>
                            <Text>CVV</Text>
                            <Divider
                                alignSelf="center"
                                width="100%"
                                mt={1}
                                mb={1}
                                backgroundColor="muted.200"
                                orientation="horizontal"
                                thickness={1} />
                            <Text fontSize="lg" fontFamily="body">{susuDisbursementDetail.payment.cardDetail.cvv}</Text>
                            <Text>Card Name</Text>
                            <Divider
                                alignSelf="center"
                                width="100%"
                                mt={1}
                                mb={1}
                                backgroundColor="muted.200"
                                orientation="horizontal"
                                thickness={1} />
                            <Text fontSize="lg"
                                  fontFamily="body">{susuDisbursementDetail.payment.cardDetail.cardHolderName}</Text>
                            <Text>Card Number</Text>
                            <Divider
                                alignSelf="center"
                                width="100%"
                                mt={1}
                                mb={1}
                                backgroundColor="muted.200"
                                orientation="horizontal"
                                thickness={1} />
                            <Text fontSize="lg"
                                  fontFamily="body">{susuDisbursementDetail.payment.cardDetail.cardNumber}</Text>
                            <Text>Expiry Date</Text>
                            <Divider
                                alignSelf="center"
                                width="100%"
                                mt={1}
                                mb={1}
                                backgroundColor="muted.200"
                                orientation="horizontal"
                                thickness={1} />
                            <Text fontSize="lg"
                                  fontFamily="body">{susuDisbursementDetail.payment.cardDetail.expiryDate}</Text>
                        </Box>
                    ) : susuDisbursementDetail.payment.method === "MOMO" ? (
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
                            <Text fontSize="lg" fontFamily="body">{susuDisbursementDetail.payment.method}</Text>
                            <Text>Provider</Text>
                            <Divider
                                alignSelf="center"
                                width="100%"
                                mt={1}
                                mb={1}
                                backgroundColor="muted.200"
                                orientation="horizontal"
                                thickness={1} />
                            <Text fontSize="lg"
                                  fontFamily="body">{susuDisbursementDetail.payment.mobileMoneyAccount.provider}</Text>
                            <Text>Mobile Money Number</Text>
                            <Divider
                                alignSelf="center"
                                width="100%"
                                mt={1}
                                mb={1}
                                backgroundColor="muted.200"
                                orientation="horizontal"
                                thickness={1} />
                            <Text fontSize="lg"
                                  fontFamily="body">{susuDisbursementDetail.payment.mobileMoneyAccount.number}</Text>
                        </Box>
                    ) : null}
                </Box>
            </Box>
        
        </ScrollView>
    );
};

export default SusuDisbursementDetailScreen;
