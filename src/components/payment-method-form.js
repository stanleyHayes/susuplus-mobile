import React, { useState } from "react";
import { Box, Button, Flex, Input, ScrollView, Select, Text } from "native-base";
import CreditCard from "credit-card";
import { useDispatch, useSelector } from "react-redux";
import { GROUP_ACTION_CREATORS } from "../redux/groups/group-action-creators";
import { selectGroups } from "../redux/groups/group-reducers";

const PaymentMethodForm = () => {
    
    const { createGroupPaymentMethod } = useSelector(selectGroups);
    
    const [type, setSourceType] = useState(createGroupPaymentMethod?.type);
    
    const [error, setError] = useState({});
    
    const [bankName, setBankName] = useState(createGroupPaymentMethod?.bankAccount?.bankName);
    const [accountHolderType, setAccountHolderType] = useState(createGroupPaymentMethod?.bankAccount?.accountHolderType);
    const [accountType, setAccountType] = useState(createGroupPaymentMethod?.bankAccount?.accountType);
    const [accountNumber, setAccountNumber] = useState(createGroupPaymentMethod?.bankAccount?.accountNumber);
    const [routingNumber, setRoutingNumber] = useState(createGroupPaymentMethod?.bankAccount?.routingNumber);
    const [accountHolderName, setAccountHolderName] = useState(createGroupPaymentMethod?.bankAccount?.accountHolderName);
    const [bankCurrency, setBankCurrency] = useState(createGroupPaymentMethod?.bankAccount?.bankCurrency);
    
    const [funding, setFunding] = useState(createGroupPaymentMethod?.card?.funding);
    const [cardHolderName, setCardHolderName] = useState(createGroupPaymentMethod?.card?.cardHolderName);
    const [cardNumber, setCardNumber] = useState(createGroupPaymentMethod?.card?.cardNumber);
    const [cvv, setCVV] = useState(createGroupPaymentMethod?.card?.cvv);
    const [expiryDate, setExpiryDate] = useState(createGroupPaymentMethod?.card?.expiryDate);
    const [country, setCountry] = useState(createGroupPaymentMethod?.card?.country);
    const [state, setState] = useState(createGroupPaymentMethod?.card?.state);
    const [city, setCity] = useState(createGroupPaymentMethod?.card?.city);
    const [addressLine1, setAddressLine1] = useState(createGroupPaymentMethod?.card?.addressLine1);
    const [addressLine2, setAddressLine2] = useState(addressLine2);
    
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
        
        dispatch(GROUP_ACTION_CREATORS.saveGroupPaymentInfo({
            ownership: "Group",
            type,
            bankAccount: {
                type,
                name: bankName,
                routingNumber,
                number: accountNumber,
                accountHolderName,
                accountHolderType,
                accountType,
                currency: bankCurrency,
            },
        }));
        
        dispatch(GROUP_ACTION_CREATORS.groupGoToNextPage());
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
        
        if (!country) {
            setError({ error, country: "Field Required" });
            return;
        } else {
            setError({ error, country: null });
        }
        
        const brand = CreditCard.determineCardType(cardNumber);
        const [expiryMonth, expiryYear] = expiryDate.split("/");
        const validatedCard = CreditCard.validate({
            cardType: brand,
            number: cardNumber,
            expiryMonth,
            expiryYear,
            cvv,
        });
        
        
        if (validatedCard.isExpired) {
            setError({ error, expiryDate: "Card Expired" });
            return;
        } else {
            setError({ error, expiryDate: null });
        }
        
        dispatch(GROUP_ACTION_CREATORS.saveGroupPaymentInfo({
            ownership: "Group",
            type,
            card: {
                funding,
                type,
                cardHolderName,
                cardNumber,
                cvv,
                expiryDate,
                brand,
                address: { country, state, city, addressLine1, addressLine2 },
            },
        }));
        dispatch(GROUP_ACTION_CREATORS.groupGoToNextPage());
    };
    
    
    return (
        <Flex height="100%" width="100%" pt={4} pb={4} flex={1} backgroundColor="white">
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
                                        size="lg"
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
                                        size="lg"
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
                                        size="lg"
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
                                        size="lg"
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
                                    _text={{ fontFamily: "body", color: "white", fontSize: "xs" }}>
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
                                    placeholder="E.g. Stanley Hayford"
                                    variant="outline"
                                    py={3}
                                    size="md"
                                    autoComplete="name"
                                    borderBottomLeftRadius={0}
                                    borderTopRightRadius={0}
                                    borderBottomRightRadius={16}
                                    borderTopLeftRadius={16}
                                />
                            </Box>
                            {error.cardHolderName &&
                                <Text color="red.400" textAlign="center">{error.cardHolderName}</Text>}
                            
                            
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
                                    py={3}
                                    size="md"
                                    keyboardType="number-pad"
                                    autoComplete="cc-number"
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
                                    placeholder="Enter CVV"
                                    variant="outline"
                                    py={3}
                                    autoComplete="cc-csc"
                                    keyboardType="phone-pad"
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
                                    _focus={{ borderColor: "gray.400" }}
                                    value={expiryDate}
                                    onChangeText={expiryDate => setExpiryDate(expiryDate)}
                                    name="expiryDate"
                                    placeholder="E.g. MM/YYYY"
                                    variant="outline"
                                    keyboardType="phone-pad"
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
                                    <Select.Item label="UK" value="GB" />
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
                                    isInvalid={Boolean(error.state)}
                                    width="100%"
                                    value={state}
                                    onChangeText={state => setState(state)}
                                    name="state"
                                    placeholder="Enter State"
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
                                    placeholder="Enter City"
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
                                py={3}
                                px={4}
                                borderBottomLeftRadius={0}
                                borderTopRightRadius={0}
                                borderBottomRightRadius={16}
                                borderTopLeftRadius={16}
                                backgroundColor="primary.600"
                                _text={{ fontFamily: "body", fontSize: "xs" }}>
                                Add Card Details
                            </Button>
                        </Box>
                    ) : null}
                </Box>
                <Box p={2}>
                    <Button
                        backgroundColor="white"
                        borderBottomLeftRadius={0}
                        borderTopRightRadius={0}
                        borderBottomRightRadius={16}
                        borderTopLeftRadius={16}
                        py={3}
                        borderColor="primary.600"
                        borderWidth={1}
                        _text={{ color: "primary.600", fontSize: "xs" }}
                        px={4}
                        onPress={() => dispatch(GROUP_ACTION_CREATORS.groupGoToPreviousPage())}
                        variant="subtle">
                        Previous
                    </Button>
                </Box>
            </ScrollView>
        </Flex>
    );
};

export default PaymentMethodForm;
