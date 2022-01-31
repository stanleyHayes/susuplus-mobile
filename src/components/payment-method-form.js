import React, { useState } from "react";
import { Box, Button, Flex, Input, Modal, ScrollView, Select, Text } from "native-base";
import { useDispatch, useSelector } from "react-redux";
import { GROUP_ACTION_CREATORS } from "../redux/groups/group-action-creators";
import { selectGroups } from "../redux/groups/group-reducers";
import { transformedBanks } from "../redux/payment-methods/payment-methods-data";

const PaymentMethodForm = () => {
    
    const { createGroupPaymentMethod } = useSelector(selectGroups);
    
    const [method, setMethod] = useState(createGroupPaymentMethod.method);
    
    const [error, setError] = useState({});
    
    const [provider, setProvider] = useState(createGroupPaymentMethod?.mobileMoneyAccount?.provider);
    const [mobileMoneyNumber, setMobileMoneyNumber] = useState(createGroupPaymentMethod?.mobileMoneyAccount?.mobileMoneyNumber);
    const [name, setName] = useState(createGroupPaymentMethod?.mobileMoneyAccount?.name);
    
    const [bankName, setBankName] = useState(createGroupPaymentMethod?.bankAccount?.bankName);
    const [bankCode, setBankCode] = useState(createGroupPaymentMethod?.bankAccount?.bankCode);
    const [accountBranch, setBankBranch] = useState(createGroupPaymentMethod?.bankAccount?.accountBranch);
    const [accountNumber, setAccountNumber] = useState(createGroupPaymentMethod?.bankAccount?.accountNumber);
    const [mobileNumber, setMobileNumber] = useState(createGroupPaymentMethod?.bankAccount?.mobileNumber);
    const [accountName, setAccountName] = useState(createGroupPaymentMethod?.bankAccount?.accountName);
    const [bankCurrency, setBankCurrency] = useState(createGroupPaymentMethod?.bankAccount?.currency);
    
    const [bankIssuer, setBankIssuer] = useState(createGroupPaymentMethod?.card?.bankIssuer);
    const [cardHolderName, setCardHolderName] = useState(createGroupPaymentMethod?.card?.cardHolderName);
    const [cardNumber, setCardNumber] = useState(createGroupPaymentMethod?.card?.cardNumber);
    const [cvv, setCVV] = useState(createGroupPaymentMethod?.card?.cvv);
    const [expiryDate, setExpiryDate] = useState(createGroupPaymentMethod?.card?.expiryDate);
    const [cardCurrency, setCardCurrency] = useState(createGroupPaymentMethod?.card?.cardCurrency);
    
    const [suggestedBanks, setSuggestedBanks] = useState([...transformedBanks]);
    const [searchQuery, setSearchQuery] = useState("");
    const [dialogOpen, setDialogOpen] = useState(false);
    
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
                cardCurrency,
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
    
    const handleBankSelected = bank => {
        if (bank) {
            setBankCode(bank.code);
            setBankName(bank.name);
            setBankCurrency(bank.currency);
            setSuggestedBanks(transformedBanks);
            setDialogOpen(false);
            setSearchQuery("");
        }
    };
    
    const handleBankSearch = text => {
        setSearchQuery(text);
        setSuggestedBanks(transformedBanks.filter(bank => bank.name.toLowerCase().includes(text.toLowerCase())));
    };
    
    return (
        <Flex height="100%" width="100%" pt={4} pb={4} flex={1} backgroundColor="white">
            <ScrollView minHeight="100%" flex={1}>
                <Box
                    borderBottomLeftRadius={0}
                    borderTopRightRadius={0}
                    borderBottomRightRadius={16}
                    borderTopLeftRadius={16}
                    p={4}
                    shadow={0}
                    backgroundColor="white"
                    m={2}>
                    <Select
                        mb={3}
                        py={2}
                        px={4}
                        borderBottomLeftRadius={0}
                        borderTopRightRadius={0}
                        borderBottomRightRadius={16}
                        borderTopLeftRadius={16}
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
                                px={3}
                                py={2}
                                mt={1}
                                mb={2}
                                borderBottomLeftRadius={0}
                                borderTopRightRadius={0}
                                borderBottomRightRadius={16}
                                borderTopLeftRadius={16}
                                variant="rounded"
                                placeholder="Select Provider"
                                selectedValue={provider}>
                                <Select.Item label="MTN Mobile Money" value="mtn" />
                                <Select.Item label="Vodafone Cash" value="vod" />
                                <Select.Item label="Airtel Tigo Cash" value="tgo" />
                            </Select>
                            
                            <Box mt={2}>
                                <Text mb={1} fontSize="xs">Mobile Money Name</Text>
                                <Input
                                    isFullWidth={true}
                                    isRequired={true}
                                    mb={1}
                                    px={3}
                                    py={3}
                                    mt={1}
                                    borderBottomLeftRadius={0}
                                    borderTopRightRadius={0}
                                    borderBottomRightRadius={16}
                                    borderTopLeftRadius={16}
                                    _focus={{ borderColor: "gray.400" }}
                                    isInvalid={Boolean(error.name)}
                                    width="100%"
                                    value={name}
                                    autoComplete="name"
                                    name="name"
                                    textContentType="name"
                                    spellCheck={true}
                                    selectTextOnFocus={true}
                                    placeholder="E.g. Stanley Hayford"
                                    variant="outline"
                                    size="md"
                                    onChangeText={name => setName(name)}
                                />
                            </Box>
                            {error.name && <Text color="red.400" textAlign="center">{error.name}</Text>}
                            
                            <Box mt={2}>
                                    <Text mb={1} fontSize="xs">Mobile Money Number</Text>
                                <Input
                                    isFullWidth={true}
                                    isRequired={true}
                                    mb={1}
                                    _focus={{ borderColor: "gray.400" }}
                                    isInvalid={Boolean(error.mobileMoneyNumber)}
                                    width="100%"
                                    px={3}
                                    py={3}
                                    mt={1}
                                    borderBottomLeftRadius={0}
                                    borderTopRightRadius={0}
                                    borderBottomRightRadius={16}
                                    borderTopLeftRadius={16}
                                    value={mobileMoneyNumber}
                                    onChange={event => setMobileMoneyNumber(event.target.value)}
                                    name="mobileMoneyNumber"
                                    placeholder="E.g. 0270048319"
                                    variant="outline"
                                    size="md"
                                    dataDetectorTypes="phoneNumber"
                                    keyboardType="number-pad"
                                    onChangeText={mobileMoneyNumber => setMobileMoneyNumber(mobileMoneyNumber)}
                                />
                            </Box>
                            {error.mobileMoneyNumber &&
                                <Text color="red.400" textAlign="center">{error.mobileMoneyNumber}</Text>}
                            
                            <Button
                                mt={4}
                                onPress={handleMobileMoneyAccountAdd}
                                px={3}
                                py={3}
                                mb={2}
                                borderBottomLeftRadius={0}
                                borderTopRightRadius={0}
                                borderBottomRightRadius={16}
                                borderTopLeftRadius={16}
                                backgroundColor="primary.600"
                                _text={{ fontSize: "xs", color: "white" }}>
                                Add Mobile Money Account
                            </Button>
                        </Box>
                    ) : method === "Bank Account" ? (
                        <Box>
                            <Box mb={4}>
                                <Box mb={2}>
                                    <Text mb={1}>Bank Name</Text>
                                    <Input
                                        isFullWidth={true}
                                        isRequired={true}
                                        mb={2}
                                        py={4}
                                        isReadOnly={true}
                                        isInvalid={Boolean(error.bankName)}
                                        width="100%"
                                        _focus={{ borderColor: "gray.50" }}
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
                                    />
                                    {error.bankName && <Text color="red.400" textAlign="center">{error.bankName}</Text>}
                                    <Button
                                        borderColor="primary.600"
                                        borderRadius={32}
                                        borderWidth={1}
                                        variant="outlined"
                                        backgroundColor="white"
                                        onPress={() => setDialogOpen(true)}>
                                        <Text color="primary.600">Select Bank</Text>
                                    </Button>
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
                                        _readOnly={{ backgroundColor: "gray.100", color: "gray.600" }}
                                        value={bankCode}
                                        name="bankCode"
                                        placeholder="Enter Bank Code"
                                        variant="outline"
                                        size="md"
                                        borderBottomLeftRadius={0}
                                        borderTopRightRadius={0}
                                        borderBottomRightRadius={16}
                                        borderTopLeftRadius={16}
                                    />
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
                                        variant="outline"
                                        size="lg"
                                        borderBottomLeftRadius={0}
                                        borderTopRightRadius={0}
                                        borderBottomRightRadius={16}
                                        borderTopLeftRadius={16} />
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
                                        variant="outline"
                                        size="md"
                                        borderBottomLeftRadius={0}
                                        borderTopRightRadius={0}
                                        borderBottomRightRadius={16}
                                        borderTopLeftRadius={16} />
                                </Box>
                                
                                <Box mb={2}>
                                    <Text mb={2}>Account Number</Text>
                                    <Input
                                        isFullWidth={true}
                                        isRequired={true}
                                        py={4}
                                        mb={2}
                                        _focus={{ borderColor: "gray.400" }}
                                        value={accountNumber}
                                        onChangeText={accountNumber => setAccountNumber(accountNumber)}
                                        isInvalid={Boolean(error.accountNumber)}
                                        width="100%"
                                        name="accountNumber"
                                        placeholder="E.g. 1234567812345678"
                                        variant="outline"
                                        size="md"
                                        borderBottomLeftRadius={0}
                                        borderTopRightRadius={0}
                                        borderBottomRightRadius={16}
                                        borderTopLeftRadius={16}/>
                                </Box>
                                
                                <Box mb={2}>
                                    <Text mb={2}>Mobile Number</Text>
                                    <Input
                                        isFullWidth={true}
                                        isRequired={true}
                                        mb={2}
                                        py={4}
                                        _focus={{ borderColor: "gray.400" }}
                                        value={mobileNumber}
                                        onChangeText={mobileNumber => setMobileNumber(mobileNumber)}
                                        isInvalid={Boolean(error.mobileNumber)}
                                        width="100%"
                                        name="mobileNumber"
                                        placeholder="E.g. 0270048319"
                                        variant="outline"
                                        size="md"
                                        borderBottomLeftRadius={0}
                                        borderTopRightRadius={0}
                                        borderBottomRightRadius={16}
                                        borderTopLeftRadius={16} />
                                </Box>
                                
                                <Box mb={2}>
                                    <Text mb={2}>Account Currency</Text>
                                    <Select
                                        name="bankCurrency"
                                        borderBottomLeftRadius={0}
                                        borderTopRightRadius={0}
                                        borderBottomRightRadius={16}
                                        borderTopLeftRadius={16}
                                        isDisabled={true}
                                        accessibilityLabel="Select Account Currency"
                                        onValueChange={bankCurrency => setBankCurrency(bankCurrency)}
                                        _selectedItem={{
                                            bg: "teal.200",
                                        }}
                                        px={4}
                                        py={3}
                                        mt={1}
                                        mb={2}
                                        variant="rounded"
                                        backgroundColor="white"
                                        placeholder="Select Currency"
                                        selectedValue={bankCurrency}>
                                        <Select.Item label="Ghana Cedis" value="GHS" />
                                        <Select.Item label="US Dollars" value="USD" />
                                    </Select>
                                    {error.bankCurrency &&
                                        <Text color="red.400" textAlign="center">{error.bankCurrency}</Text>}
                                </Box>
                                
                                <Button
                                    onPress={handleBankAccountAdd}
                                    borderBottomLeftRadius={0}
                                    borderTopRightRadius={0}
                                    borderBottomRightRadius={16}
                                    borderTopLeftRadius={16}
                                    py={3}
                                    backgroundColor="primary.600"
                                    _text={{ fontFamily: "body", color: "white", fontSize: 'xs' }}>
                                    Add Bank Account
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
                                    variant="outline"
                                    py={3}
                                    borderBottomLeftRadius={0}
                                    borderTopRightRadius={0}
                                    borderBottomRightRadius={16}
                                    borderTopLeftRadius={16}
                                    size="md"
                                />
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
                                <Text mb={2}>Card Number</Text>
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
                                    borderBottomLeftRadius={0}
                                    borderTopRightRadius={0}
                                    borderBottomRightRadius={16}
                                    borderTopLeftRadius={16}
                                />
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
                                    variant="outline"
                                    py={3}
                                    size="md"
                                    borderBottomLeftRadius={0}
                                    borderTopRightRadius={0}
                                    borderBottomRightRadius={16}
                                    borderTopLeftRadius={16}
                                />
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
                                    borderTopLeftRadius={16} />
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
                                    py={3}
                                    mt={1}
                                    mb={2}
                                    variant="outline"
                                    backgroundColor="white"
                                    placeholder="Select Card Currency"
                                    selectedValue={cardCurrency}>
                                    <Select.Item label="Ghana Cedis" value="GHS" />
                                    <Select.Item label="US Dollars" value="USD" />
                                </Select>
                                {error.cardCurrency &&
                                    <Text color="red.400" textAlign="center">{error.cardCurrency}</Text>}
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
                                _text={{ fontFamily: "body", fontSize: 'xs' }}>
                                Add Card Details
                            </Button>
                        </Box>
                    ) : null}
                </Box>
                
                <Box p={5}>
                    <Button
                        mt={2}
                        backgroundColor="primary.600"
                        py={3}
                        px={4}
                        _text={{ color: "white", fontSize: "xs" }}
                        borderBottomLeftRadius={0}
                        borderTopRightRadius={0}
                        borderBottomRightRadius={16}
                        borderTopLeftRadius={16}
                        onPress={() => dispatch(GROUP_ACTION_CREATORS.groupGoToPreviousPage())}
                        variant="subtle">
                        Previous
                    </Button>
                </Box>
            </ScrollView>
            <Modal
                size="full"
                isOpen={dialogOpen}
                onClose={() => setDialogOpen(false)}>
                <Modal.Content>
                    <Modal.Header><Text>Select Bank</Text></Modal.Header>
                    <Modal.Body>
                        <Input
                            isFullWidth={true}
                            isRequired={true}
                            mb={2}
                            width="100%"
                            _focus={{ borderColor: "gray.50" }}
                            value={searchQuery}
                            onChangeText={searchQuery => handleBankSearch(searchQuery)}
                            placeholder="Search bank"
                            variant="outline"
                            py={2}
                            borderWidth={1}
                            size="md"
                            borderRadius={32}
                            backgroundColor="gray.50"
                        />
                        {suggestedBanks && suggestedBanks.map((bank, index) => {
                            return (
                                <Button variant="ghost" key={index} onPress={() => handleBankSelected(bank)}>
                                    <Text textAlign="center" fontSize="md" p={1.5}>{bank.name}</Text>
                                </Button>
                            );
                        })}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            width="100%"
                            px={3}
                            py={3}
                            mt={2}
                            borderBottomLeftRadius={0}
                            borderTopRightRadius={0}
                            borderBottomRightRadius={16}
                            borderTopLeftRadius={16}
                            backgroundColor="primary.600"
                            _text={{ color: "white", fontSize: 'xs' }}
                            onPress={() => setDialogOpen(false)}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal.Content>
            </Modal>
        </Flex>
    );
};

export default PaymentMethodForm;
