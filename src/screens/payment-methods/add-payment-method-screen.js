import React, { useEffect, useState } from "react";
import { Box, Button, Center, Flex, Input, ScrollView, Select, Spinner, Text } from "native-base";
import { useDispatch, useSelector } from "react-redux";
import { PAYMENT_METHOD_ACTION_CREATORS } from "../../redux/payment-methods/payment-method-action-creators";
import { selectPaymentMethods } from "../../redux/payment-methods/payment-method-reducers";
import { selectAuth } from "../../redux/auth/auth-reducer";
import NavigationBar from "react-native-navbar-color";
import { navigate } from "../../utils/utils";
import { SCREEN_NAME_CONSTANTS } from "../../constants/constants";

const AddPaymentMethodScreen = ({ navigation }) => {
    
    const { paymentMethodLoading } = useSelector(selectPaymentMethods);
    const { authToken } = useSelector(selectAuth);
    
    const [type, setSourceType] = useState("");
    
    const [error, setError] = useState({});
    
    const [bankName, setBankName] = useState("");
    const [accountHolderType, setAccountHolderType] = useState("");
    const [accountType, setAccountType] = useState("");
    const [accountNumber, setAccountNumber] = useState("");
    const [routingNumber, setRoutingNumber] = useState("");
    const [accountHolderName, setAccountHolderName] = useState("");
    const [bankCurrency, setBankCurrency] = useState("");
    
    const [funding, setFunding] = useState("");
    const [cardHolderName, setCardHolderName] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [cvv, setCVV] = useState("");
    const [expiryDate, setExpiryDate] = useState("");
    const [country, setCountry] = useState("");
    const [state, setState] = useState("");
    const [city, setCity] = useState("");
    const [addressLine1, setAddressLine1] = useState("");
    const [addressLine2, setAddressLine2] = useState("");
    
    const dispatch = useDispatch();
    
    const handleBankAccountAdd = () => {
        if (!bankName) {
            setError({ error, bankName: "Field Required" });
            return;
        } else {
            setError({ error, bankName: null });
        }
        
        if (!accountHolderType) {
            setError({ error, accountHolderType: "Field Required" });
            return;
        } else {
            setError({ error, accountHolderType: null });
        }
        
        if (!accountHolderName) {
            setError({ error, accountHolderName: "Field Required" });
            return;
        } else {
            setError({ error, accountHolderName: null });
        }
        
        if (!accountNumber) {
            setError({ error, accountNumber: "Field Required" });
            return;
        } else {
            setError({ error, accountNumber: null });
        }
        
        if (!accountType) {
            setError({ error, accountType: "Field Required" });
            return;
        } else {
            setError({ error, accountType: null });
        }
        
        if (!bankCurrency) {
            setError({ error, bankCurrency: "Field Required" });
            return;
        } else {
            setError({ error, bankCurrency: null });
        }
        
        if (!routingNumber) {
            setError({ error, routingNumber: "Field Required" });
            return;
        } else {
            setError({ error, routingNumber: null });
        }
        
        dispatch(PAYMENT_METHOD_ACTION_CREATORS.addPaymentMethod({
            ownership: "Individual",
            type,
            name: bankName,
            routingNumber,
            number: accountNumber,
            accountHolderName,
            accountHolderType,
            accountType,
            currency: bankCurrency,
        }, authToken, navigation));
    };
    
    const handleDebitCardAdd = () => {
        if (!funding) {
            setError({ error, funding: "Field Required" });
            return;
        } else {
            setError({ error, funding: null });
        }
        
        if (!cardHolderName) {
            setError({ error, cardHolderName: "Field Required" });
            return;
        } else {
            setError({ error, cardHolderName: null });
        }
        
        if (!cardNumber) {
            setError({ error, cardNumber: "Field Required" });
            return;
        } else {
            setError({ error, cardNumber: null });
        }
        
        if (!cvv) {
            setError({ error, cvv: "Field Required" });
            return;
        } else {
            setError({ error, cvv: null });
        }
        
        if (!expiryDate) {
            setError({ error, expiryDate: "Field Required" });
            return;
        } else {
            setError({ error, expiryDate: null });
        }
        
        
        dispatch(PAYMENT_METHOD_ACTION_CREATORS.addPaymentMethod({
            ownership: "Individual",
            type,
            cardHolderName,
            cardNumber,
            cvv,
            expiryDate,
            funding,
            address: { country, state, city, addressLine1, addressLine2 },
        }, authToken, navigation, SCREEN_NAME_CONSTANTS.PAYMENT_METHODS_SCREEN));
        
    };
    
    useEffect(() => {
        NavigationBar.setColor("#155e75");
    }, []);
    
    return (
        
        <Flex height="100%" width="100%" pt={4} pb={4} flex={1} backgroundColor="white">
            {paymentMethodLoading && (
                <Center position="absolute" flex={1} zIndex={1000} right="50%" top="50%">
                    <Spinner size="lg" color="primary.900" />
                </Center>
            )}
            
            <ScrollView minHeight="100%" flex={1}>
                <Box p={4}>
                    <Text fontSize="xs" color="muted.400" mb={2}>Select Payment Type</Text>
                    <Select
                        borderBottomLeftRadius={0}
                        borderTopRightRadius={0}
                        borderBottomRightRadius={16}
                        borderTopLeftRadius={16}
                        px={2}
                        py={3}
                        mb={3}
                        variant="outline"
                        accessibilityLabel="Select Payment Type"
                        onValueChange={type => setSourceType(type)}
                        _text={{ fontFamily: "body", fontSize: "md" }}
                        _selectedItem={{
                            bg: "primary.200",
                        }}
                        mt={1}
                        placeholder="Select Payment Type"
                        selectedValue={type}>
                        <Select.Item label="Bank Account" value="bank_account" />
                        <Select.Item label="Card" value="card" />
                    </Select>
                    {type === "bank_account" ? (
                        <Box>
                            <Box mb={4}>
                                <Box mb={2}>
                                    <Text fontSize="xs" color="muted.400" mb={1}>Bank Name</Text>
                                    <Input
                                        isFullWidth={true}
                                        isRequired={true}
                                        mb={2}
                                        py={3}
                                        isInvalid={Boolean(error.bankName)}
                                        width="100%"
                                        _focus={{ borderColor: "gray.400" }}
                                        _readOnly={{ backgroundColor: "gray.100", color: "gray.600" }}
                                        value={bankName}
                                        name="bankName"
                                        placeholder="Enter Bank Name"
                                        variant="outline"
                                        size="md"
                                        borderBottomLeftRadius={0}
                                        borderTopRightRadius={0}
                                        borderBottomRightRadius={16}
                                        borderTopLeftRadius={16}
                                        onChangeText={bankName => setBankName(bankName)}
                                    />
                                    {error.bankName && <Text color="red.400" textAlign="center">{error.bankName}</Text>}
                                </Box>
                                
                                <Box mb={2}>
                                    <Text fontSize="xs" color="muted.400" mb={2}>Account Holder Type</Text>
                                    <Select
                                        borderBottomLeftRadius={0}
                                        borderTopRightRadius={0}
                                        borderBottomRightRadius={16}
                                        borderTopLeftRadius={16}
                                        px={2}
                                        py={3}
                                        mb={3}
                                        variant="outline"
                                        accessibilityLabel="Select Account Holder Type"
                                        onValueChange={accountHolderType => setAccountHolderType(accountHolderType)}
                                        _text={{ fontFamily: "body", fontSize: "md" }}
                                        _selectedItem={{
                                            bg: "primary.200",
                                        }}
                                        mt={1}
                                        placeholder="Select Account Holder Type"
                                        selectedValue={accountHolderType}>
                                        <Select.Item label="Individual" value="individual" />
                                        <Select.Item label="Company" value="company" />
                                    </Select>
                                    {error.accountHolderType &&
                                        <Text color="red.400" textAlign="center">{error.accountHolderType}</Text>}
                                </Box>
                                
                                <Box mb={2}>
                                    <Text fontSize="xs" color="muted.400" mb={2}>Account Type</Text>
                                    <Select
                                        borderBottomLeftRadius={0}
                                        borderTopRightRadius={0}
                                        borderBottomRightRadius={16}
                                        borderTopLeftRadius={16}
                                        px={2}
                                        py={3}
                                        mb={3}
                                        variant="outline"
                                        accessibilityLabel="Select Account Type"
                                        onValueChange={accountType => setAccountType(accountType)}
                                        _text={{ fontFamily: "body", fontSize: "md" }}
                                        _selectedItem={{
                                            bg: "primary.200",
                                        }}
                                        mt={1}
                                        placeholder="Select Account Type"
                                        selectedValue={accountType}>
                                        <Select.Item label="Checking" value="checking" />
                                        <Select.Item label="Savings" value="savings" />
                                    </Select>
                                </Box>
                                
                                <Box mb={2}>
                                    <Text fontSize="xs" color="muted.400" mb={2}>Account Holder Name</Text>
                                    <Input
                                        isFullWidth={true}
                                        isRequired={true}
                                        mb={2}
                                        py={3}
                                        _focus={{ borderColor: "gray.400" }}
                                        value={accountHolderName}
                                        onChangeText={accountHolderName => setAccountHolderName(accountHolderName)}
                                        isInvalid={Boolean(error.accountHolderName)}
                                        width="100%"
                                        name="accountName"
                                        placeholder="E.g. Stanley Hayford"
                                        variant="outline"
                                        size="md"
                                        borderBottomLeftRadius={0}
                                        borderTopRightRadius={0}
                                        borderBottomRightRadius={16}
                                        borderTopLeftRadius={16}
                                    />
                                    {error.accountHolderName &&
                                        <Text color="red.400" textAlign="center">{error.accountHolderName}</Text>}
                                </Box>
                                
                                <Box mb={2}>
                                    <Text fontSize="xs" color="muted.400" mb={2}>Account Number</Text>
                                    <Input
                                        isFullWidth={true}
                                        isRequired={true}
                                        py={3}
                                        mb={2}
                                        _focus={{ borderColor: "gray.400" }}
                                        value={accountNumber}
                                        onChangeText={accountNumber => setAccountNumber(accountNumber)}
                                        isInvalid={Boolean(error.accountNumber)}
                                        width="100%"
                                        name="accountNumber"
                                        placeholder="Enter account number"
                                        variant="outline"
                                        size="md"
                                        borderBottomLeftRadius={0}
                                        borderTopRightRadius={0}
                                        borderBottomRightRadius={16}
                                        borderTopLeftRadius={16}
                                    />
                                    {error.accountNumber &&
                                        <Text color="red.400" textAlign="center">{error.accountNumber}</Text>}
                                </Box>
                                
                                <Box mb={2}>
                                    <Text fontSize="xs" color="muted.400" mb={2}>Routing Number</Text>
                                    <Input
                                        isFullWidth={true}
                                        isRequired={true}
                                        mb={2}
                                        py={3}
                                        _focus={{ borderColor: "gray.400" }}
                                        value={routingNumber}
                                        onChangeText={routingNumber => setRoutingNumber(routingNumber)}
                                        isInvalid={Boolean(error.routingNumber)}
                                        width="100%"
                                        name="routingNumber"
                                        placeholder="Enter routing number"
                                        variant="outline"
                                        size="md"
                                        borderBottomLeftRadius={0}
                                        borderTopRightRadius={0}
                                        borderBottomRightRadius={16}
                                        borderTopLeftRadius={16}
                                    />
                                    {error.routingNumber &&
                                        <Text color="red.400" textAlign="center">{error.routingNumber}</Text>}
                                </Box>
                                
                                <Box mb={2}>
                                    <Text fontSize="xs" color="muted.400" mb={2}>Currency</Text>
                                    <Select
                                        name="bankCurrency"
                                        borderBottomLeftRadius={0}
                                        borderTopRightRadius={0}
                                        borderBottomRightRadius={16}
                                        borderTopLeftRadius={16}
                                        accessibilityLabel="Select Account Currency"
                                        onValueChange={bankCurrency => setBankCurrency(bankCurrency)}
                                        _selectedItem={{
                                            bg: "teal.200",
                                        }}
                                        px={4}
                                        py={3}
                                        mt={1}
                                        mb={2}
                                        variant="outline"
                                        placeholder="Select Currency"
                                        selectedValue={bankCurrency}>
                                        <Select.Item label="US Dollars" value="usd" />
                                    </Select>
                                    {error.currency && <Text color="red.400" textAlign="center">{error.currency}</Text>}
                                </Box>
                                
                                <Button
                                    onPress={handleBankAccountAdd}
                                    borderBottomLeftRadius={0}
                                    borderTopRightRadius={0}
                                    borderBottomRightRadius={16}
                                    borderTopLeftRadius={16}
                                    py={3}
                                    backgroundColor="primary.600"
                                    isLoading={paymentMethodLoading}
                                    isDisabled={paymentMethodLoading}
                                    isLoadingText={"Adding Account..."}
                                    _text={{ fontFamily: "body", color: "white" }}>
                                    Add Bank Account
                                </Button>
                            </Box>
                        </Box>
                    ) : type === "card" ? (
                        <Box>
                            <Box mb={2}>
                                <Text fontSize="xs" color="muted.400" mb={2}>Funding</Text>
                                <Select
                                    borderBottomLeftRadius={0}
                                    borderTopRightRadius={0}
                                    borderBottomRightRadius={16}
                                    borderTopLeftRadius={16}
                                    px={2}
                                    py={3}
                                    mb={3}
                                    variant="outline"
                                    accessibilityLabel="Select Funding"
                                    onValueChange={funding => setFunding(funding)}
                                    _text={{ fontFamily: "body", fontSize: "md" }}
                                    _selectedItem={{
                                        bg: "primary.200",
                                    }}
                                    mt={1}
                                    placeholder="Select Funding"
                                    selectedValue={funding}>
                                    <Select.Item label="Credit" value="credit" />
                                    <Select.Item label="Debit" value="debit" />
                                    <Select.Item label="Prepaid" value="prepaid" />
                                    <Select.Item label="Unknown" value="unknown" />
                                </Select>
                            </Box>
                            
                            <Box mb={2}>
                                <Text fontSize="xs" color="muted.400" mb={2}>Card Holder Name</Text>
                                <Input
                                    isFullWidth={true}
                                    isRequired={true}
                                    mb={2}
                                    _focus={{ borderColor: "gray.400" }}
                                    isInvalid={Boolean(error.cardHolderName)}
                                    width="100%"
                                    value={cardHolderName}
                                    onChangeText={cardHolderName => setCardHolderName(cardHolderName)}
                                    name="cardHolderName"
                                    autoComplete="name"
                                    placeholder="Enter card holder name"
                                    variant="outline"
                                    py={3}
                                    size="md"
                                    borderBottomLeftRadius={0}
                                    borderTopRightRadius={0}
                                    borderBottomRightRadius={16}
                                    borderTopLeftRadius={16}
                                />
                                {error.cardHolderName &&
                                    <Text color="red.400" textAlign="center">{error.cardHolderName}</Text>}
                            
                            </Box>
                            
                            <Box mb={2}>
                                <Text fontSize="xs" color="muted.400" mb={2}>Card Number</Text>
                                <Input
                                    isFullWidth={true}
                                    isRequired={true}
                                    mb={2}
                                    _focus={{ borderColor: "gray.400" }}
                                    isInvalid={Boolean(error.cardNumber)}
                                    width="100%"
                                    value={cardNumber}
                                    onChangeText={cardNumber => setCardNumber(cardNumber)}
                                    name="cardNumber"
                                    placeholder="E.g. 1234567812345678"
                                    variant="outline"
                                    keyboardType="number-pad"
                                    autoComplete="cc-number"
                                    py={3}
                                    size="md"
                                    borderBottomLeftRadius={0}
                                    borderTopRightRadius={0}
                                    borderBottomRightRadius={16}
                                    borderTopLeftRadius={16}
                                />
                                {error.cardNumber && <Text color="red.400" textAlign="center">{error.cardNumber}</Text>}
                            
                            </Box>
                            
                            <Box mb={2}>
                                <Text fontSize="xs" color="muted.400" mb={2}>CVV</Text>
                                <Input
                                    isFullWidth={true}
                                    isRequired={true}
                                    mb={2}
                                    _focus={{ borderColor: "gray.400" }}
                                    isInvalid={Boolean(error.cvv)}
                                    width="100%"
                                    value={cvv}
                                    onChangeText={cvv => setCVV(cvv)}
                                    name="cvv"
                                    placeholder="Enter cvv"
                                    variant="outline"
                                    keyboardType="phone-pad"
                                    py={3}
                                    size="md"
                                    maxLength={3}
                                    borderBottomLeftRadius={0}
                                    borderTopRightRadius={0}
                                    borderBottomRightRadius={16}
                                    borderTopLeftRadius={16}
                                />
                                {error.cvv && <Text color="red.400" textAlign="center">{error.cvv}</Text>}
                            
                            </Box>
                            
                            <Box mb={4}>
                                <Text fontSize="xs" color="muted.400" mb={2}>Expiry Date</Text>
                                <Input
                                    isFullWidth={true}
                                    isRequired={true}
                                    mb={2}
                                    isInvalid={Boolean(error.expiryDate)}
                                    width="100%"
                                    keyboardType="phone-pad"
                                    _focus={{ borderColor: "gray.400" }}
                                    value={expiryDate}
                                    onChangeText={expiryDate => setExpiryDate(expiryDate)}
                                    name="expiryDate"
                                    placeholder="E.g. MM/YYYY"
                                    variant="outline"
                                    py={3}
                                    size="md"
                                    borderBottomLeftRadius={0}
                                    borderTopRightRadius={0}
                                    borderBottomRightRadius={16}
                                    borderTopLeftRadius={16}
                                />
                                {error.expiryDate && <Text color="red.400" textAlign="center">{error.expiryDate}</Text>}
                            
                            </Box>
                            <Box mb={2}>
                                <Text fontSize="xs" color="muted.400" mb={2}>Country</Text>
                                <Select
                                    name="country"
                                    borderBottomLeftRadius={0}
                                    borderTopRightRadius={0}
                                    borderBottomRightRadius={16}
                                    borderTopLeftRadius={16}
                                    accessibilityLabel="Select Country"
                                    onValueChange={country => setCountry(country)}
                                    _selectedItem={{
                                        bg: "teal.200",
                                    }}
                                    px={4}
                                    py={3}
                                    mt={1}
                                    mb={2}
                                    variant="outline"
                                    placeholder="Select Country"
                                    selectedValue={country}>
                                    <Select.Item label="USA" value="US" />
                                </Select>
                                {error.country && <Text color="red.400" textAlign="center">{error.country}</Text>}
                            </Box>
                            
                            <Box mb={2}>
                                <Text fontSize="xs" color="muted.400" mb={2}>State</Text>
                                <Input
                                    isFullWidth={true}
                                    isRequired={true}
                                    mb={2}
                                    _focus={{ borderColor: "gray.400" }}
                                    isInvalid={Boolean(error.cvv)}
                                    width="100%"
                                    value={state}
                                    onChangeText={state => setState(state)}
                                    name="state"
                                    placeholder="Enter state"
                                    variant="outline"
                                    py={3}
                                    size="md"
                                    borderBottomLeftRadius={0}
                                    borderTopRightRadius={0}
                                    borderBottomRightRadius={16}
                                    borderTopLeftRadius={16}
                                />
                                {error.state && <Text color="red.400" textAlign="center">{error.state}</Text>}
                            </Box>
                            
                            <Box mb={2}>
                                <Text fontSize="xs" color="muted.400" mb={2}>City</Text>
                                <Input
                                    isFullWidth={true}
                                    isRequired={true}
                                    mb={2}
                                    _focus={{ borderColor: "gray.400" }}
                                    isInvalid={Boolean(error.city)}
                                    width="100%"
                                    value={city}
                                    onChangeText={city => setCity(city)}
                                    name="city"
                                    placeholder="Enter city"
                                    variant="outline"
                                    py={3}
                                    size="md"
                                    borderBottomLeftRadius={0}
                                    borderTopRightRadius={0}
                                    borderBottomRightRadius={16}
                                    borderTopLeftRadius={16}
                                />
                                {error.city && <Text color="red.400" textAlign="center">{error.city}</Text>}
                            </Box>
                            
                            <Box mb={2}>
                                <Text fontSize="xs" color="muted.400" mb={2}>Address Line 1</Text>
                                <Input
                                    isFullWidth={true}
                                    isRequired={true}
                                    mb={2}
                                    _focus={{ borderColor: "gray.400" }}
                                    isInvalid={Boolean(error.addressLine1)}
                                    width="100%"
                                    value={addressLine1}
                                    onChangeText={addressLine1 => setAddressLine1(addressLine1)}
                                    name="addressLine1"
                                    placeholder="Enter Address"
                                    variant="outline"
                                    py={3}
                                    size="md"
                                    borderBottomLeftRadius={0}
                                    borderTopRightRadius={0}
                                    borderBottomRightRadius={16}
                                    borderTopLeftRadius={16}
                                />
                                {error.addressLine1 &&
                                    <Text color="red.400" textAlign="center">{error.addressLine1}</Text>}
                            </Box>
                            
                            <Box mb={2}>
                                <Text fontSize="xs" color="muted.400" mb={2}>Address Line 2</Text>
                                <Input
                                    isFullWidth={true}
                                    isRequired={true}
                                    mb={2}
                                    _focus={{ borderColor: "gray.400" }}
                                    isInvalid={Boolean(error.addressLine2)}
                                    width="100%"
                                    value={addressLine2}
                                    onChangeText={addressLine2 => setAddressLine2(addressLine2)}
                                    name="addressLine2"
                                    placeholder="Enter Address"
                                    variant="outline"
                                    py={3}
                                    size="md"
                                    borderBottomLeftRadius={0}
                                    borderTopRightRadius={0}
                                    borderBottomRightRadius={16}
                                    borderTopLeftRadius={16}
                                />
                                {error.addressLine2 &&
                                    <Text color="red.400" textAlign="center">{error.addressLine2}</Text>}
                            </Box>
                            
                            <Button
                                onPress={handleDebitCardAdd}
                                borderBottomLeftRadius={0}
                                borderTopRightRadius={0}
                                borderBottomRightRadius={16}
                                borderTopLeftRadius={16}
                                py={3}
                                backgroundColor="primary.600"
                                isLoading={paymentMethodLoading}
                                isDisabled={paymentMethodLoading}
                                isLoadingText={"Adding Card..."}
                                _text={{ fontFamily: "body", color: "white", fontSize: "sm" }}>
                                Add Card Details
                            </Button>
                        </Box>
                    ) : null}
                </Box>
            </ScrollView>
        </Flex>
    );
};

export default AddPaymentMethodScreen;
