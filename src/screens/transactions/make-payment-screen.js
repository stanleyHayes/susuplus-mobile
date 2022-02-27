import React, { useEffect, useState } from "react";
import { Box, Button, Divider, Flex, ScrollView, Select, Text } from "native-base";
import { useDispatch, useSelector } from "react-redux";
import { CONTRIBUTIONS_ACTION_CREATORS } from "../../redux/user-contributions/user-contribution-action-creators";
import { selectAuth } from "../../redux/auth/auth-reducer";
import { selectGroupPaymentMethods } from "../../redux/group-payment-methods/group-payment-method-reducers";
import { selectPaymentMethods } from "../../redux/payment-methods/payment-method-reducers";
import { PAYMENT_METHOD_ACTION_CREATORS } from "../../redux/payment-methods/payment-method-action-creators";
import {
    GROUP_PAYMENT_METHOD_ACTION_CREATORS,
} from "../../redux/group-payment-methods/group-payment-method-action-creators";
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
        NavigationBar.setColor("#155e75");
    }, []);
    
    return (
        <Flex flex={1} width="100%" minHeight="100%" backgroundColor="gray.100">
            <ScrollView m={2}>
                
                <Box shadow={0} p={4} m={2} backgroundColor="white" borderBottomLeftRadius={0}
                     borderTopRightRadius={0}
                     borderBottomRightRadius={16}
                     borderTopLeftRadius={16}>
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
                        borderBottomLeftRadius={0}
                        borderTopRightRadius={0}
                        borderBottomRightRadius={16}
                        borderTopLeftRadius={16}
                        placeholder="Select Destination Payment Account"
                        variant="outline"
                        _selectedItem={{
                            backgroundColor: "primary.200",
                        }}
                        selectedValue={selectedDestinationAccount._id}
                        onValueChange={selectedAccount => handleDestinationAccountSelectionChange(selectedAccount)}>
                        {groupPaymentMethods && groupPaymentMethods.map(paymentMethod => {
                            return (
                                paymentMethod.type === "bank_account" ? (
                                    <Select.Item
                                        key={paymentMethod._id}
                                        label={`${paymentMethod.bankAccountDetails.bankName}: ${paymentMethod.bankAccountDetails.accountHolderType}`}
                                        value={paymentMethod._id}
                                    />
                                ) : paymentMethod.type === "card" ?
                                    <Select.Item
                                        key={paymentMethod._id}
                                        label={`${paymentMethod.cardDetails.brand}: ${paymentMethod.cardDetails.number}`}
                                        value={paymentMethod._id}
                                    /> : null);
                        })}
                    </Select>
                </Box>
    
                <Box shadow={0} p={4} m={2} backgroundColor="white"
                      borderBottomLeftRadius={0}
                      borderTopRightRadius={0}
                      borderBottomRightRadius={16}
                      borderTopLeftRadius={16}>
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
                        borderBottomLeftRadius={0}
                        borderTopRightRadius={0}
                        borderBottomRightRadius={16}
                        borderTopLeftRadius={16}
                        placeholder="Select Personal Payment Account"
                        variant="outline"
                        _selectedItem={{
                            backgroundColor: "primary.200",
                        }}
                        selectedValue={selectedSourceAccount._id}
                        onValueChange={selectedAccount => handleSourceAccountSelectionChange(selectedAccount)}>
                        {paymentMethods && paymentMethods.map(paymentMethod => {
                            return (
                                paymentMethod.type === "bank_account" ? (
                                    <Select.Item
                                        key={paymentMethod._id}
                                        label={`${paymentMethod.bankAccountDetails.bankName}: ${paymentMethod.bankAccountDetails.accountNumber}`}
                                        value={paymentMethod._id}
                                    />
                                ) : paymentMethod.type === "card" ?
                                    <Select.Item
                                        key={paymentMethod._id}
                                        label={`${paymentMethod.cardDetails.brand}: ${paymentMethod.cardDetails.number}`}
                                        value={paymentMethod._id}
                                    /> : null);
                        })}
                    </Select>
                </Box>
                
                {/*{sourceAccount && destinationAccount && (*/}
                {/*    <Box>*/}
                {/*        <Box m={2} p={4} shadow={0}*/}
                {/*             borderBottomLeftRadius={0}*/}
                {/*             borderTopRightRadius={0}*/}
                {/*             borderBottomRightRadius={16}*/}
                {/*             borderTopLeftRadius={16} backgroundColor="white">*/}
                {/*            <Text fontSize="lg">Contribution Summary</Text>*/}
                {/*            <Divider*/}
                {/*                alignSelf="center"*/}
                {/*                width="100%"*/}
                {/*                mt={1}*/}
                {/*                mb={1}*/}
                {/*                backgroundColor="muted.200"*/}
                {/*                orientation="horizontal"*/}
                {/*                thickness={1} />*/}
                {/*            */}
                {/*            <Text mb={2} fontSize="md">*/}
                {/*                Contribution*/}
                {/*                of {susuDetail.contributionPlan.currency} {susuDetail.contributionPlan.amount} is being*/}
                {/*                made towards*/}
                {/*                the susu group {susuDetail.group.name} using the {sourceAccount.method} with the*/}
                {/*                following details*/}
                {/*            </Text>*/}
                {/*            */}
                {/*            {sourceAccount.type === "bank_account" ? (*/}
                {/*                <Box>*/}
                {/*                    <Text mb={2} fontSize="lg" fontFamily="body">Source Account</Text>*/}
                {/*                    <Divider*/}
                {/*                        alignSelf="center"*/}
                {/*                        width="100%"*/}
                {/*                        mt={1}*/}
                {/*                        mb={1}*/}
                {/*                        backgroundColor="muted.200"*/}
                {/*                        orientation="horizontal"*/}
                {/*                        thickness={1} />*/}
                {/*                    <Text fontSize="xs" color="muted.400">Payment Method</Text>*/}
                {/*                    <Text mb={2} fontSize="sm" color="muted.500"*/}
                {/*                          fontFamily="body">{sourceAccount.type}</Text>*/}
                {/*                    <Text fontSize="xs" color="muted.400">Bank Name</Text>*/}
                {/*                    <Text mb={2} fontSize="sm" color="muted.500"*/}
                {/*                          fontFamily="body">{sourceAccount.bankAccountDetails.bankName}</Text>*/}
                {/*                    <Text fontSize="xs" color="muted.400">Account Type</Text>*/}
                {/*                    <Text mb={2} fontSize="sm" color="muted.400"*/}
                {/*                          fontFamily="body">{sourceAccount.bankAccountDetails.accountHolderType}</Text>*/}
                {/*                    <Text fontSize="xs" color="muted.400">Account Name</Text>*/}
                {/*                    <Text mb={2} fontSize="sm" color="muted.500"*/}
                {/*                          fontFamily="body">{sourceAccount.bankAccountDetails.accountHolderName}</Text>*/}
                {/*                    <Text fontSize="xs" color="muted.400">Account Number</Text>*/}
                {/*                    <Text mb={2} fontSize="sm" color="muted.500"*/}
                {/*                          fontFamily="body">{sourceAccount.bankAccountDetails.accountNumber}</Text>*/}
                {/*                </Box>*/}
                {/*            ) : sourceAccount.type === "card" ? (*/}
                {/*                <Box>*/}
                {/*                    <Text mb={2} fontSize="xs" color="muted.400" fontFamily="body">Destination*/}
                {/*                        Account</Text>*/}
                {/*                    <Divider*/}
                {/*                        alignSelf="center"*/}
                {/*                        width="100%"*/}
                {/*                        mt={1}*/}
                {/*                        mb={1}*/}
                {/*                        backgroundColor="muted.200"*/}
                {/*                        orientation="horizontal"*/}
                {/*                        thickness={1} />*/}
                {/*                    <Text fontSize="xs" color="muted.400">Payment Method</Text>*/}
                {/*                    <Text mb={2} fontSize="sm" color="muted.500"*/}
                {/*                          fontFamily="body">{sourceAccount.type}</Text>*/}
                {/*                    <Text fontSize="xs" color="muted.400">CVV</Text>*/}
                {/*                    <Text mb={2} fontSize="sm" color="muted.500"*/}
                {/*                          fontFamily="body">{sourceAccount.cardDetails.cvv}</Text>*/}
                {/*                    <Text fontSize="xs" color="muted.400">Card Brand</Text>*/}
                {/*                    <Text mb={2} fontSize="sm" color="muted.500"*/}
                {/*                          fontFamily="body">{sourceAccount.cardDetails.brand}</Text>*/}
                {/*                    <Text fontSize="xs" color="muted.400">Card Name</Text>*/}
                {/*                    <Text mb={2} fontSize="sm" color="muted.500"*/}
                {/*                          fontFamily="body">{sourceAccount.cardDetails.name}</Text>*/}
                {/*                    <Text fontSize="xs" color="muted.400">Card Number</Text>*/}
                {/*                    <Text mb={2} fontSize="sm" color="muted.500"*/}
                {/*                          fontFamily="body">{sourceAccount.cardDetails.number}</Text>*/}
                {/*                    <Text fontSize="xs" color="muted.400">Expiry Date</Text>*/}
                {/*                    <Text*/}
                {/*                        mb={2}*/}
                {/*                        fontSize="sm"*/}
                {/*                        color="muted.500"*/}
                {/*                        fontFamily="body">*/}
                {/*                        {`${destinationAccount.cardDetail.expiryMonth}/${destinationAccount.cardDetail.expiryMonth}`}*/}
                {/*                    </Text>*/}
                {/*                </Box>*/}
                {/*            ) : null}*/}
                {/*            */}
                {/*            {destinationAccount.type === "bank_account" ? (*/}
                {/*                <Box>*/}
                {/*                    <Text mb={2} fontSize="lg" fontFamily="body">Destination Account</Text>*/}
                {/*                    <Divider*/}
                {/*                        alignSelf="center"*/}
                {/*                        width="100%"*/}
                {/*                        mt={1}*/}
                {/*                        mb={1}*/}
                {/*                        backgroundColor="muted.200"*/}
                {/*                        orientation="horizontal"*/}
                {/*                        thickness={1} />*/}
                {/*                    <Text fontSize="xs" color="muted.400">Payment Method</Text>*/}
                {/*                    <Text mb={2} fontSize="lg" fontFamily="body">{destinationAccount.type}</Text>*/}
                {/*                    <Text fontSize="xs" color="muted.400">Bank Name</Text>*/}
                {/*                    <Text mb={2} fontSize="lg"*/}
                {/*                          fontFamily="body">{destinationAccount.bankAccount.bankName}</Text>*/}
                {/*                    <Text fontSize="xs" color="muted.400">Account Type</Text>*/}
                {/*                    <Text mb={2} fontSize="lg"*/}
                {/*                          fontFamily="body">{destinationAccount.bankAccount.accountHolderType}</Text>*/}
                {/*                    <Text fontSize="xs" color="muted.400">Account Name</Text>*/}
                {/*                    <Text mb={2} fontSize="lg"*/}
                {/*                          fontFamily="body">{destinationAccount.bankAccount.accountHolderName}</Text>*/}
                {/*                    <Text fontSize="xs" color="muted.400">Account Number</Text>*/}
                {/*                    <Text mb={2} fontSize="lg"*/}
                {/*                          fontFamily="body">{destinationAccount.bankAccount.accountNumber}</Text>*/}
                {/*                </Box>*/}
                {/*            ) : destinationAccount.type === "card" ? (*/}
                {/*                <Box>*/}
                {/*                    <Text mb={2} fontSize="lg" fontFamily="body">Destination Account</Text>*/}
                {/*                    <Divider*/}
                {/*                        alignSelf="center"*/}
                {/*                        width="100%"*/}
                {/*                        mt={1}*/}
                {/*                        mb={1}*/}
                {/*                        backgroundColor="muted.200"*/}
                {/*                        orientation="horizontal"*/}
                {/*                        thickness={1} />*/}
                {/*                    <Text fontSize="xs" color="muted.400">Payment Method</Text>*/}
                {/*                    <Text mb={2} fontSize="sm" color="muted.500"*/}
                {/*                          fontFamily="body">{destinationAccount.type}</Text>*/}
                {/*                    <Text fontSize="xs" color="muted.400">CVV</Text>*/}
                {/*                    <Text mb={2} fontSize="lg"*/}
                {/*                          fontFamily="body">{destinationAccount.cardDetails.cvv}</Text>*/}
                {/*                    <Text fontSize="xs" color="muted.400">Card Brand</Text>*/}
                {/*                    <Text mb={2} fontSize="sm" color="muted.500"*/}
                {/*                          fontFamily="body">{destinationAccount.cardDetails.brand}</Text>*/}
                {/*                    <Text fontSize="xs" color="muted.400">Card Name</Text>*/}
                {/*                    <Text mb={2} fontSize="sm" color="muted.500"*/}
                {/*                          fontFamily="body">{destinationAccount.cardDetails.name}</Text>*/}
                {/*                    <Text fontSize="xs" color="muted.400">Card Number</Text>*/}
                {/*                    <Text mb={2} fontSize="sm" color="muted.500"*/}
                {/*                          fontFamily="body">{destinationAccount.cardDetails.number}</Text>*/}
                {/*                    <Text fontSize="xs" color="muted.400">Expiry Date</Text>*/}
                {/*                    <Text mb={2} fontSize="sm" color="muted.500"*/}
                {/*                          fontFamily="body">*/}
                {/*                        {`${destinationAccount.cardDetail.expiryMonth}/${destinationAccount.cardDetail.expiryMonth}`}*/}
                {/*                    </Text>*/}
                {/*                </Box>*/}
                {/*            ) : null}*/}
                {/*        </Box>*/}
                {/*    </Box>*/}
                {/*)}*/}
                
                
                {sourceAccount && destinationAccount && (
                    <Button
                        m={2}
                        onPress={makeContribution}
                        variant="solid"
                        py={4}
                        backgroundColor="primary.600"
                        borderBottomLeftRadius={0}
                        borderTopRightRadius={0}
                        borderBottomRightRadius={16}
                        borderTopLeftRadius={16}>
                        <Text fontSize="md" color="white">Make Contribution</Text>
                    </Button>
                )}
            </ScrollView>
        </Flex>
    );
};

export default MakePaymentScreen;
