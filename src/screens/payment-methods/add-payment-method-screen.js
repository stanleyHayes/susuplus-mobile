import React, { useRef, useState } from "react";
import { Box, Button, Center, Flex, Input, ScrollView, Select, Spinner, Text } from "native-base";
import { useDispatch, useSelector } from "react-redux";
import { PAYMENT_METHOD_ACTION_CREATORS } from "../../redux/payment-methods/payment-method-action-creators";
import { selectPaymentMethods } from "../../redux/payment-methods/payment-method-reducers";
import { selectAuth } from "../../redux/auth/auth-reducer";
import { AutocompleteDropdown } from "react-native-autocomplete-dropdown";
import { transformedBanks } from "../../redux/payment-methods/payment-methods-data";

const AddPaymentMethodScreen = ({ navigation }) => {
    
    const { paymentMethodLoading } = useSelector(selectPaymentMethods);
    const { authToken } = useSelector(selectAuth);
    
    const [method, setMethod] = useState("");
    
    const [error, setError] = useState({});
    const searchRef = useRef(null);
    const dropDownController = useRef(null);
    
    const [suggestedBanks, setSuggestedBanks] = useState([...transformedBanks]);
    
    const [textSearch, setSearchText] = useState(null);
    const [provider, setProvider] = useState("");
    const [mobileMoneyNumber, setMobileMoneyNumber] = useState("");
    const [name, setName] = useState("");
    
    const [bankName, setBankName] = useState("");
    const [bankCode, setBankCode] = useState("");
    const [accountBranch, setBankBranch] = useState("");
    const [accountNumber, setAccountNumber] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");
    const [accountName, setAccountName] = useState("");
    const [bankCurrency, setBankCurrency] = useState("");
    
    const [bankIssuer, setBankIssuer] = useState("");
    const [cardHolderName, setCardHolderName] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [cvv, setCVV] = useState("");
    const [expiryDate, setExpiryDate] = useState("");
    const [cardCurrency, setCardCurrency] = useState("");
    
    
    const dispatch = useDispatch();
    
    const handleBankAccountAdd = () => {
        if (!bankName) {
            setError({ error, bankName: "Field Required" });
            return;
        } else {
            setError({ error, bankName: null });
        }
        
        if (!accountBranch) {
            setError({ error, accountBranch: "Field Required" });
            return;
        } else {
            setError({ error, accountBranch: null });
        }
        
        if (!accountName) {
            setError({ error, accountName: "Field Required" });
            return;
        } else {
            setError({ error, accountName: null });
        }
        
        if (!accountNumber) {
            setError({ error, accountNumber: "Field Required" });
            return;
        } else {
            setError({ error, accountNumber: null });
        }
        
        if (!mobileNumber) {
            setError({ error, mobileNumber: "Field Required" });
            return;
        } else {
            setError({ error, mobileNumber: null });
        }
        
        if (!bankCurrency) {
            setError({ error, bankCurrency: "Field Required" });
            return;
        } else {
            setError({ error, bankCurrency: null });
        }
        
        dispatch(PAYMENT_METHOD_ACTION_CREATORS.addPaymentMethod({
            ownership: "Individual",
            method,
            bankName,
            accountBranch,
            accountNumber,
            accountName,
            mobileNumber,
            bankCode,
            currency: bankCurrency,
        }, authToken, navigation));
    };
    
    const handleDebitCardAdd = () => {
        if (!bankIssuer) {
            setError({ error, bankIssuer: "Field Required" });
            return;
        } else {
            setError({ error, bankIssuer: null });
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
        
        if (!cardCurrency) {
            setError({ error, cardCurrency: "Field Required" });
            return;
        } else {
            setError({ error, cardCurrency: null });
        }
        
        dispatch(PAYMENT_METHOD_ACTION_CREATORS.addPaymentMethod({
            ownership: "Individual",
            method,
            bankIssuer,
            cardHolderName,
            cardNumber,
            cvv,
            expiryDate,
            currency: cardCurrency,
        }, authToken, navigation));
        
    };
    
    const handleMobileMoneyAccountAdd = () => {
        if (!provider) {
            setError({ error, provider: "Field Required" });
            return;
        } else {
            setError({ error, provider: null });
        }
        
        if (!mobileMoneyNumber) {
            setError({ error, mobileMoneyNumber: "Field Required" });
            return;
        } else {
            setError({ error, mobileMoneyNumber: null });
        }
        
        if (!name) {
            setError({ error, name: "Field Required" });
            return;
        } else {
            setError({ error, name: null });
        }
        
        dispatch(PAYMENT_METHOD_ACTION_CREATORS.addPaymentMethod({
            ownership: "Individual",
            method,
            provider,
            mobileMoneyNumber,
            name,
        }, authToken, navigation));
    };
    
    const handleBankSelected = id => {
        console.log('id', id)
        if (id) {
            const bank = transformedBanks.find(bank => bank.id.toString() === id);
            console.log(bank, 'bank')
            if (bank) {
                setBankCode(bank.code);
                setBankName(bank.name);
                setBankCurrency(bank.currency);
                setSuggestedBanks(transformedBanks);
                setSearchText(null);
            }
        }
    };
    
    const handleBankSearch = text => {
        setSearchText(text);
        setSuggestedBanks(transformedBanks.filter(bank => bank.name.toLowerCase().includes(text.toLowerCase())));
    };
    
    return (
        
        <Flex height="100%" width="100%" pt={4} pb={4} flex={1} backgroundColor="white">
            {paymentMethodLoading && (
                <Center position="absolute" flex={1} zIndex={1000} right="50%" top="50%">
                    <Spinner size="lg" color="primary.900" />
                </Center>
            )}
            
            <ScrollView minHeight="100%" flex={1}>
                <Box p={4}>
                    <Select
                        borderRadius={32}
                        px={2}
                        py={4}
                        mb={3}
                        variant="outline"
                        accessibilityLabel="Select Payment Method"
                        onValueChange={method => setMethod(method)}
                        _text={{ fontFamily: "body", fontSize: "md" }}
                        _selectedItem={{
                            bg: "primary.200",
                        }}
                        mt={1}
                        placeholder="Select Payment Method"
                        selectedValue={method}>
                        <Select.Item label="Select Payment Method" value="" />
                        <Select.Item label="Mobile Money" value="Mobile Money" />
                        <Select.Item label="Bank Account" value="Bank Account" />
                        <Select.Item label="Card" value="Card" />
                    </Select>
                    {method === "Mobile Money" ? (
                        <Box mb={4}>
                            <Select
                                name="provider"
                                borderRadius={32}
                                accessibilityLabel="Select Provider"
                                onValueChange={provider => setProvider(provider)}
                                _selectedItem={{
                                    bg: "teal.200",
                                    fontFamily: "body",
                                }}
                                px={4}
                                py={4}
                                mt={1}
                                mb={2}
                                variant="outline"
                                placeholder="Select Provider"
                                selectedValue={provider}>
                                <Select.Item label="Select Provider" value="" />
                                <Select.Item label="MTN Mobile Money" value="mtn" />
                                <Select.Item label="Vodafone Cash" value="vod" />
                                <Select.Item label="Airtel Tigo Cash" value="tgo" />
                            </Select>
                            
                            <Box mb={1}>
                                <Text mb={2}>Mobile Money Name</Text>
                                <Input
                                    isFullWidth={true}
                                    isRequired={true}
                                    mb={1}
                                    py={4}
                                    _focus={{ borderColor: "gray.50" }}
                                    isInvalid={Boolean(error.name)}
                                    width="100%"
                                    value={name}
                                    autoComplete="name"
                                    name="name"
                                    placeholder="E.g. Stanley Hayford"
                                    variant="filled"
                                    size="lg"
                                    borderRadius={32}
                                    onChangeText={name => setName(name)}
                                    backgroundColor="gray.50" />
                            </Box>
                            {error.name && <Text color="red.600" textAlign="center">{error.name}</Text>}
                            
                            <Box mt={4}>
                                <Text mb={2}>Mobile Money Number</Text>
                                <Input
                                    isFullWidth={true}
                                    isRequired={true}
                                    mb={1}
                                    _focus={{ borderColor: "gray.50" }}
                                    isInvalid={Boolean(error.mobileMoneyNumber)}
                                    width="100%"
                                    py={4}
                                    value={mobileMoneyNumber}
                                    onChange={event => setMobileMoneyNumber(event.target.value)}
                                    name="mobileMoneyNumber"
                                    placeholder="E.g. 0270048319"
                                    variant="filled"
                                    keyboardType="phone-pad"
                                    textContentType="telephoneNumber"
                                    size="lg"
                                    type="tel"
                                    borderRadius={32}
                                    onChangeText={mobileMoneyNumber => setMobileMoneyNumber(mobileMoneyNumber)}
                                    backgroundColor="gray.50" />
                            </Box>
                            {error.mobileMoneyNumber &&
                            <Text color="red.600" textAlign="center">{error.mobileMoneyNumber}</Text>}
                            
                            <Button
                                mt={8}
                                onPress={handleMobileMoneyAccountAdd}
                                borderRadius={32}
                                py={4}
                                backgroundColor="primary.800"
                                _text={{ fontFamily: "body" }}>
                                <Text fontSize="md" color="white">
                                    Add Mobile Money Account
                                </Text>
                            </Button>
                        </Box>
                    ) : method === "Bank Account" ? (
                        <Box>
                            <Box mb={4}>
                                <Box mb={2}>
                                    <Text mb={2}>Bank Name</Text>
                                    <AutocompleteDropdown
                                        ref={searchRef}
                                        controller={controller => dropDownController.current = controller}
                                        clearOnFocus={false}
                                        closeOnBlur={true}
                                        closeOnSubmit={true}
                                        onClear={() => setSearchText("")}
                                        onSelectItem={item => item && handleBankSelected(item.id)}
                                        dataSet={suggestedBanks}
                                        useFilter={false}
                                        textInputProps={{
                                            placeholder: "e.g. Barclays",
                                            style: {
                                                backgroundColor: "transparent",
                                                color: "black",
                                                placeholderTextColor: "#111111",
                                            },
                                        }}
                                        rightButtonsContainerStyle={{
                                            paddingTop: 12,
                                            backgroundColor: "transparent",
                                        }}
                                        inputContainerStyle={{
                                            borderWidth: 1,
                                            borderColor: "#dddddd",
                                            width: "100%",
                                            borderRadius: 32,
                                            paddingTop: 8,
                                            paddingBottom: 8,
                                        }}
                                        containerStyle={{
                                            borderRadius: 32,
                                        }}
                                        suggestionsListContainerStyle={{
                                            borderRadius: 30,
                                            padding: 8,
                                        }}
                                        renderItem={(item) => {
                                            return <Text p={1.5}>{item.title}</Text>;
                                        }}
                                        onChangeText={handleBankSearch}
                                        emptyResultText="No Bank Found"
                                    />
                                </Box>
                                
                                <Box mb={2}>
                                    <Text mb={2}>Bank Code</Text>
                                    <Input
                                        isFullWidth={true}
                                        isRequired={true}
                                        mb={2}
                                        py={4}
                                        isReadOnly={true}
                                        isInvalid={Boolean(error.bankCode)}
                                        width="100%"
                                        _focus={{ borderColor: "gray.50" }}
                                        _readOnly={{ backgroundColor: "gray.50", color: "gray.600" }}
                                        value={bankCode}
                                        name="bankCode"
                                        placeholder="Enter Bank Code"
                                        variant="filled"
                                        size="lg"
                                        borderRadius={32}
                                        backgroundColor="gray.50" />
                                    {error.bankCode && <Text color="red.400" textAlign="center">{error.bankCode}</Text>}
                                </Box>
                                
                                <Box mb={2}>
                                    <Text mb={2}>Account Branch</Text>
                                    <Input
                                        isFullWidth={true}
                                        isRequired={true}
                                        mb={2}
                                        py={4}
                                        _focus={{ borderColor: "gray.50" }}
                                        value={accountBranch}
                                        onChangeText={accountBranch => setBankBranch(accountBranch)}
                                        isInvalid={Boolean(error.accountBranch)}
                                        width="100%"
                                        name="accountBranch"
                                        placeholder="E.g. Madina"
                                        variant="filled"
                                        size="lg"
                                        borderRadius={32}
                                        backgroundColor="gray.50" />
                                </Box>
                                
                                <Box mb={2}>
                                    <Text mb={2}>Account Name</Text>
                                    <Input
                                        isFullWidth={true}
                                        isRequired={true}
                                        mb={2}
                                        py={4}
                                        _focus={{ borderColor: "gray.50" }}
                                        value={accountName}
                                        onChangeText={accountName => setAccountName(accountName)}
                                        isInvalid={Boolean(error.accountName)}
                                        width="100%"
                                        name="accountName"
                                        placeholder="E.g. Stanley Hayford"
                                        variant="filled"
                                        size="lg"
                                        borderRadius={32}
                                        backgroundColor="gray.50" />
                                </Box>
                                
                                <Box mb={2}>
                                    <Text mb={2}>Account Number</Text>
                                    <Input
                                        isFullWidth={true}
                                        isRequired={true}
                                        py={4}
                                        mb={2}
                                        _focus={{ borderColor: "gray.50" }}
                                        value={accountNumber}
                                        onChangeText={accountNumber => setAccountNumber(accountNumber)}
                                        isInvalid={Boolean(error.accountNumber)}
                                        width="100%"
                                        name="accountNumber"
                                        placeholder="E.g. 1234567812345678"
                                        variant="filled"
                                        size="lg"
                                        borderRadius={32}
                                        backgroundColor="gray.50" />
                                </Box>
                                
                                <Box mb={2}>
                                    <Text mb={2}>Mobile Number</Text>
                                    <Input
                                        isFullWidth={true}
                                        isRequired={true}
                                        mb={2}
                                        py={4}
                                        _focus={{ borderColor: "gray.50" }}
                                        value={mobileNumber}
                                        onChangeText={mobileNumber => setMobileNumber(mobileNumber)}
                                        isInvalid={Boolean(error.mobileNumber)}
                                        width="100%"
                                        name="mobileNumber"
                                        placeholder="E.g. +233270048319"
                                        variant="filled"
                                        size="lg"
                                        borderRadius={32}
                                        backgroundColor="gray.50" />
                                </Box>
                                
                                <Box mb={2}>
                                    <Text mb={2}>Account Currency</Text>
                                    <Select
                                        name="bankCurrency"
                                        borderRadius={32}
                                        accessibilityLabel="Select Account Currency"
                                        onValueChange={bankCurrency => setBankCurrency(bankCurrency)}
                                        _selectedItem={{
                                            bg: "teal.200",
                                        }}
                                        px={4}
                                        py={4}
                                        mt={1}
                                        mb={2}
                                        variant="rounded"
                                        backgroundColor="white"
                                        placeholder="Select Currency"
                                        selectedValue={provider}>
                                        <Select.Item label="Select Currency" value="" />
                                        <Select.Item label="Ghana Cedis" value="GHS" />
                                        <Select.Item label="US Dollars" value="USD" />
                                    </Select>
                                    {error.bankCurrency &&
                                    <Text color="red.400" textAlign="center">{error.bankCurrency}</Text>}
                                </Box>
                                
                                <Button
                                    onPress={handleBankAccountAdd}
                                    borderRadius={32}
                                    py={4}
                                    backgroundColor="primary.800"
                                    _text={{ fontFamily: "body" }}>
                                    <Text fontSize="md" color="white">
                                        Add Bank Account
                                    </Text>
                                </Button>
                            </Box>
                        </Box>
                    ) : method === "Card" ? (
                        <Box>
                            <Box mb={2}>
                                <Text mb={2}>Issuing Bank</Text>
                                <Input
                                    isFullWidth={true}
                                    isRequired={true}
                                    mb={2}
                                    isInvalid={Boolean(error.bankIssuer)}
                                    width="100%"
                                    value={bankIssuer}
                                    _focus={{ borderColor: "gray.50" }}
                                    onChangeText={bankIssuer => setBankIssuer(bankIssuer)}
                                    name="issuingNetwork"
                                    placeholder="E.g. Barclays Bank"
                                    variant="rounded"
                                    py={4}
                                    borderWidth={0}
                                    size="lg"
                                    borderRadius={32}
                                    backgroundColor="gray.50" />
                            </Box>
                            
                            <Box mb={2}>
                                <Text mb={2}>Card Holder Name</Text>
                                <Input
                                    isFullWidth={true}
                                    isRequired={true}
                                    mb={2}
                                    _focus={{ borderColor: "gray.50" }}
                                    isInvalid={Boolean(error.cardHolderName)}
                                    width="100%"
                                    value={cardHolderName}
                                    onChangeText={cardHolderName => setCardHolderName(cardHolderName)}
                                    name="cardHolderName"
                                    placeholder="E.g. Stanley Hayford"
                                    variant="rounded"
                                    py={4}
                                    borderWidth={0}
                                    size="lg"
                                    borderRadius={32}
                                    backgroundColor="gray.50" />
                            </Box>
                            
                            <Box mb={2}>
                                <Text mb={2}>Card Number</Text>
                                <Input
                                    isFullWidth={true}
                                    isRequired={true}
                                    mb={2}
                                    _focus={{ borderColor: "gray.50" }}
                                    isInvalid={Boolean(error.cardNumber)}
                                    width="100%"
                                    value={cardNumber}
                                    onChangeText={cardNumber => setCardNumber(cardNumber)}
                                    name="cardNumber"
                                    placeholder="E.g. 1234567812345678"
                                    variant="rounded"
                                    py={4}
                                    borderWidth={0}
                                    size="lg"
                                    borderRadius={32}
                                    backgroundColor="gray.50" />
                            </Box>
                            
                            <Box mb={2}>
                                <Text mb={2}>CVV</Text>
                                <Input
                                    isFullWidth={true}
                                    isRequired={true}
                                    mb={2}
                                    _focus={{ borderColor: "gray.50" }}
                                    isInvalid={Boolean(error.cvv)}
                                    width="100%"
                                    value={cvv}
                                    onChangeText={cvv => setCVV(cvv)}
                                    name="cvv"
                                    placeholder="E.g. 123"
                                    variant="rounded"
                                    py={4}
                                    borderWidth={0}
                                    size="lg"
                                    borderRadius={32}
                                    backgroundColor="gray.50" />
                            </Box>
                            
                            <Box mb={4}>
                                <Text mb={2}>Expiry Date</Text>
                                <Input
                                    isFullWidth={true}
                                    isRequired={true}
                                    mb={2}
                                    isInvalid={Boolean(error.expiryDate)}
                                    width="100%"
                                    _focus={{ borderColor: "gray.50" }}
                                    value={expiryDate}
                                    onChangeText={expiryDate => setExpiryDate(expiryDate)}
                                    name="expiryDate"
                                    placeholder="E.g. MM/YYYY"
                                    variant="rounded"
                                    py={4}
                                    borderWidth={0}
                                    size="lg"
                                    borderRadius={32}
                                    backgroundColor="gray.50" />
                            </Box>
                            <Box mb={2}>
                                <Text mb={2}>Account Currency</Text>
                                <Select
                                    name="cardCurrency"
                                    borderRadius={32}
                                    accessibilityLabel="Select Account Currency"
                                    onValueChange={cardCurrency => setCardCurrency(cardCurrency)}
                                    _selectedItem={{
                                        bg: "teal.200",
                                    }}
                                    px={4}
                                    py={4}
                                    mt={1}
                                    mb={2}
                                    variant="rounded"
                                    backgroundColor="white"
                                    placeholder="Select Card Currency"
                                    selectedValue={cardCurrency}>
                                    <Select.Item label="Select Currency" value="" />
                                    <Select.Item label="Ghana Cedis" value="GHS" />
                                    <Select.Item label="US Dollars" value="USD" />
                                </Select>
                                {error.cardCurrency &&
                                <Text color="red.400" textAlign="center">{error.cardCurrency}</Text>}
                            </Box>
                            
                            <Button
                                onPress={handleDebitCardAdd}
                                borderRadius={32}
                                py={4}
                                backgroundColor="primary.800"
                                _text={{ fontFamily: "body" }}>
                                <Text fontSize="md" color="white">
                                    Add Card Details
                                </Text>
                            </Button>
                        </Box>
                    ) : null}
                </Box>
            </ScrollView>
        </Flex>
    );
};

export default AddPaymentMethodScreen;
