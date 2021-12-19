import React, { useState } from "react";
import { Box, Button, Input, ScrollView, Select, Text } from "native-base";
import { useDispatch, useSelector } from "react-redux";
import { GROUP_ACTION_CREATORS } from "../redux/groups/group-action-creators";
import { selectGroups } from "../redux/groups/group-reducers";
import { AutocompleteDropdown } from "react-native-autocomplete-dropdown";
import { banks } from "../redux/payment-methods/payment-methods-data";

const PaymentMethodForm = () => {
    
    const { createGroupPaymentMethod } = useSelector(selectGroups);
    
    const [method, setMethod] = useState(createGroupPaymentMethod.method);
    
    const [error, setError] = useState({});
    
    const [provider, setProvider] = useState(createGroupPaymentMethod.mobileMoneyAccount.provider);
    const [mobileMoneyNumber, setMobileMoneyNumber] = useState(createGroupPaymentMethod.mobileMoneyAccount.mobileMoneyNumber);
    const [name, setName] = useState(createGroupPaymentMethod.mobileMoneyAccount.name);
    
    const [bankName, setBankName] = useState(createGroupPaymentMethod.bankAccount.bankName);
    const [bankCode, setBankCode] = useState(createGroupPaymentMethod.bankAccount.bankCode);
    const [accountBranch, setBankBranch] = useState(createGroupPaymentMethod.bankAccount.accountBranch);
    const [accountNumber, setAccountNumber] = useState(createGroupPaymentMethod.bankAccount.accountNumber);
    const [mobileNumber, setMobileNumber] = useState(createGroupPaymentMethod.bankAccount.mobileNumber);
    const [accountName, setAccountName] = useState(createGroupPaymentMethod.bankAccount.accountName);
    const [bankCurrency, setBankCurrency] = useState(createGroupPaymentMethod.bankAccount.currency);
    
    const [bankIssuer, setBankIssuer] = useState(createGroupPaymentMethod.card.bankIssuer);
    const [cardHolderName, setCardHolderName] = useState(createGroupPaymentMethod.card.cardHolderName);
    const [cardNumber, setCardNumber] = useState(createGroupPaymentMethod.card.cardNumber);
    const [cvv, setCVV] = useState(createGroupPaymentMethod.card.cvv);
    const [expiryDate, setExpiryDate] = useState(createGroupPaymentMethod.card.expiryDate);
    const [cardCurrency, setCardCurrency] = useState(createGroupPaymentMethod.card.cardCurrency);
    
    
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
        
        dispatch(GROUP_ACTION_CREATORS.saveGroupPaymentInfo({
            ownership: "Group",
            method,
            bankAccount: {
                bankName,
                accountBranch,
                accountNumber,
                accountName,
                mobileNumber,
                bankCode,
                currency: bankCurrency,
            },
        }));
        
        dispatch(GROUP_ACTION_CREATORS.groupGoToNextPage());
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
        
        dispatch(GROUP_ACTION_CREATORS.saveGroupPaymentInfo({
            ownership: "Group",
            method,
            card: {
                bankIssuer,
                cardHolderName,
                cardNumber,
                cvv,
                expiryDate,
                currency: cardCurrency,
            },
        }));
        dispatch(GROUP_ACTION_CREATORS.groupGoToNextPage());
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
        
        dispatch(GROUP_ACTION_CREATORS.saveGroupPaymentInfo({
            ownership: "Group",
            method,
            mobileMoneyAccount: {
                provider,
                mobileMoneyNumber,
                name,
            },
        }));
        dispatch(GROUP_ACTION_CREATORS.groupGoToNextPage());
    };
    
    return (
        <ScrollView minHeight="100%" flex={1}>
            <Box borderRadius={32} p={4} shadow={0} backgroundColor="white" m={2}>
                <Select
                    borderRadius={32}
                    px={4}
                    py={4}
                    mb={3}
                    backgroundColor="white"
                    variant="rounded"
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
                            }}
                            px={4}
                            py={4}
                            mt={1}
                            mb={2}
                            variant="rounded"
                            backgroundColor="white"
                            placeholder="Select Provider"
                            selectedValue={provider}>
                            <Select.Item label="Select Provider" value="" />
                            <Select.Item label="MTN Mobile Money" value="mtn" />
                            <Select.Item label="Vodafone Cash" value="vod" />
                            <Select.Item label="Airtel Tigo Cash" value="tgo" />
                        </Select>
                        
                        <Box mb={1}>
                            <Text fontSize="sm" mb={2}>Mobile Money Name</Text>
                            <Input
                                isFullWidth={true}
                                isRequired={true}
                                mb={1}
                                py={4}
                                _focus={{ borderColor: "gray.50" }}
                                isInvalid={Boolean(error.name)}
                                width="100%"
                                value={name}
                                type="name"
                                name="name"
                                textContentType="name"
                                spellCheck={true}
                                selectTextOnFocus={true}
                                placeholder="E.g. Stanley Hayford"
                                variant="filled"
                                size="lg"
                                borderRadius={32}
                                onChangeText={name => setName(name)}
                                backgroundColor="gray.50" />
                        </Box>
                        {error.name && <Text color="red.400" textAlign="center">{error.name}</Text>}
                        
                        <Box mt={4}>
                            <Text mb={2} fontSize="sm">Mobile Money Number</Text>
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
                                placeholder="E.g. +233270048319"
                                variant="filled"
                                size="lg"
                                type="tel"
                                dataDetectorTypes="phoneNumber"
                                keyboardType="number-pad"
                                autoCapitalize="words"
                                borderRadius={32}
                                onChangeText={mobileMoneyNumber => setMobileMoneyNumber(mobileMoneyNumber)}
                                backgroundColor="gray.50" />
                        </Box>
                        {error.mobileMoneyNumber &&
                        <Text color="red.400" textAlign="center">{error.mobileMoneyNumber}</Text>}
                        
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
                                    clearOnFocus={false}
                                    closeOnBlur={true}
                                    closeOnSubmit={true}
                                    onSelectItem={handleBankSelected}
                                    dataSet={banks}
                                    style={{borderRadius: 32}}
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
                                    _readOnly={{backgroundColor: 'gray.100', color: 'gray.200'}}
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
                                    mb={1}
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
                                {error.accountBranch &&
                                <Text color="red.400" textAlign="center">{error.accountBranch}</Text>}
                            </Box>
                            
                            <Box mb={2}>
                                <Text mb={2}>Account Name</Text>
                                <Input
                                    isFullWidth={true}
                                    isRequired={true}
                                    mb={1}
                                    py={4}
                                    _focus={{ borderColor: "gray.50" }}
                                    value={accountName}
                                    onChangeText={accountName => setAccountName(accountName)}
                                    isInvalid={Boolean(error.accountName)}
                                    width="100%"
                                    name="accountName"
                                    placeholder="E.g. Stanley Hayford"
                                    variant="filled"
                                    autoCapitalize="words"
                                    size="lg"
                                    borderRadius={32}
                                    backgroundColor="gray.50" />
                                {error.accountName &&
                                <Text color="red.400" textAlign="center">{error.accountName}</Text>}
                            
                            </Box>
                            
                            <Box mb={2}>
                                <Text mb={2}>Account Number</Text>
                                <Input
                                    isFullWidth={true}
                                    isRequired={true}
                                    py={4}
                                    mb={1}
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
                                {error.accountNumber &&
                                <Text color="red.400" textAlign="center">{error.accountNumber}</Text>}
                            </Box>
                            
                            <Box mb={2}>
                                <Text mb={2}>Mobile Number</Text>
                                <Input
                                    isFullWidth={true}
                                    isRequired={true}
                                    mb={1}
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
                                {error.mobileNumber &&
                                <Text color="red.400" textAlign="center">{error.mobileNumber}</Text>}
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
                            {error.bankIssuer && <Text color="red.400" textAlign="center">{error.bankIssuer}</Text>}
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
                            {error.cardHolderName &&
                            <Text color="red.400" textAlign="center">{error.cardHolderName}</Text>}
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
                            {error.cardNumber && <Text color="red.400" textAlign="center">{error.cardNumber}</Text>}
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
                            {error.cvv &&
                            <Text color="red.400" textAlign="center">{error.cvv}</Text>}
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
                            {error.expiryDate &&
                            <Text color="red.400" textAlign="center">{error.expiryDate}</Text>}
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
                
                <Button
                    mt={2}
                    backgroundColor="primary.600"
                    py={2}
                    borderRadius={32}
                    onPress={() => dispatch(GROUP_ACTION_CREATORS.groupGoToPreviousPage())}
                    variant="subtle">
                    <Text color="white" fontSize="md">Previous</Text>
                </Button>
            </Box>
        </ScrollView>
    );
};

export default PaymentMethodForm;
