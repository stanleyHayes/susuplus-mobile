import React, { useState } from "react";
import { Box, Button, Divider, Input, ScrollView, Select, Text } from "native-base";
import { useDispatch, useSelector } from "react-redux";
import { selectSusu } from "../redux/susu/susu-reducer";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { SUSU_ACTION_CREATORS } from "../redux/susu/susu-action-creators";

const SusuBasicInfoForm = ({groupDetail}) => {
    
    const { createSusuBasicInfo } = useSelector(selectSusu);
    
    const [paymentAmount, setPaymentAmount] = useState(createSusuBasicInfo.paymentAmount);
    const [paymentCurrency, setPaymentCurrency] = useState(createSusuBasicInfo.paymentCurrency);
    const [intervalAmount, setIntervalAmount] = useState(createSusuBasicInfo.intervalAmount);
    const [intervalUnit, setIntervalUnit] = useState(createSusuBasicInfo.intervalUnit);
    const [startDate, setStartDate] = useState(createSusuBasicInfo.startDate);
    const [showStartDateDialog, setShowStartDateDialog] = useState(false);
    const [error, setError] = useState({});
    
    const dispatch = useDispatch();
    
    const handleSaveGroupBasicInfo = () => {
        
        if (!paymentAmount) {
            setError({ error, paymentAmount: "Field Required" });
            return;
        } else {
            setError({ error, paymentAmount: null });
        }
        
        if (!paymentCurrency) {
            setError({ error, paymentCurrency: "Field Required" });
            return;
        } else {
            setError({ error, paymentCurrency: null });
        }
        
        if (!intervalAmount) {
            setError({ error, intervalAmount: "Field Required" });
            return;
        } else {
            setError({ error, intervalAmount: null });
        }
        
        if (!intervalUnit) {
            setError({ error, intervalUnit: "Field Required" });
            return;
        } else {
            setError({ error, intervalUnit: null });
        }
        
        if (!startDate) {
            setError({ error, startDate: "Field Required" });
            return;
        } else {
            setError({ error, startDate: null });
        }
        
        dispatch(SUSU_ACTION_CREATORS.saveSusuBasicInfo({
            paymentAmount,
            paymentCurrency,
            intervalAmount,
            intervalUnit,
            startDate,
        }));
        dispatch(SUSU_ACTION_CREATORS.susuGoToNextPage());
    };
    
    return (
        <ScrollView p={2}>
            <Box borderRadius={32} mb={2} p={5} shadow={0} backgroundColor="white" m={2}>
                <Text textAlign="center" fontSize="lg">Group Info</Text>
                
                <Divider width="100%" my={2} />
                
                <Text>Name</Text>
                <Text fontSize="md">{groupDetail.name}</Text>
            
            </Box>
            
            <Box mb={2} borderRadius={32} p={5} shadow={0} backgroundColor="white" m={2}>
                
                <Text textAlign="center" fontSize="lg">Payment Plan</Text>
                
                <Divider width="100%" my={2} />
                
                <Text mb={1}>Payment Amount</Text>
                
                <Box mb={1}>
                    <Input
                        placeholder="Payment Amount"
                        variant="filled"
                        borderRadius={32}
                        py={4}
                        px={4}
                        isInvalid={Boolean(error.name)}
                        _focus={{ borderColor: "gray.50" }}
                        _invalid={{ borderColor: "red.400", borderWidth: 1, borderStyle: "solid" }}
                        isFullWidth={true}
                        backgroundColor="gray.50"
                        mb={1}
                        value={name}
                        name="paymentAmount"
                        keyboardType="number-pad"
                        onChangeText={paymentAmount => setPaymentAmount(paymentAmount)}
                        isRequired={true}
                    />
                    {error.paymentAmount && <Text color="error.400">{error.paymentAmount}</Text>}
                </Box>
                <Box>
                    <Select
                        p={4}
                        mb={1}
                        variant="filled"
                        backgroundColor="gray.50"
                        name="paymentCurrency"
                        placeholder="Payment Currency"
                        onValueChange={paymentCurrency => setPaymentCurrency(paymentCurrency)}
                        selectedValue={paymentCurrency}>
                        <Select.Item label="Cedis" value="GHS" />
                        <Select.Item label="Dollars" value="USD" />
                    </Select>
                    {error.paymentCurrency && <Text color="error.400">{error.paymentCurrency}</Text>}
                </Box>
                
                <Divider width="100%" my={2} />
                
                <Text textAlign="center" fontSize="lg">Contribution Plan</Text>
                
                <Divider width="100%" my={2} />
                
                <Text mb={1}>Interval</Text>
                
                <Box mb={2}>
                    <Input
                        placeholder="Contribution amount"
                        variant="filled"
                        borderRadius={32}
                        py={4}
                        keyboardType="number-pad"
                        px={4}
                        isInvalid={Boolean(error.intervalUnit)}
                        _focus={{ borderColor: "gray.50" }}
                        _invalid={{ borderColor: "red.400", borderWidth: 1, borderStyle: "solid" }}
                        isFullWidth={true}
                        backgroundColor="gray.50"
                        mb={1}
                        value={intervalAmount}
                        name="intervalAmount"
                        onChangeText={intervalAmount => setIntervalAmount(intervalAmount)}
                        isRequired={true}
                    />
                    {error.intervalAmount && <Text color="error.400">{error.intervalAmount}</Text>}
                </Box>
                
                <Box mb={2}>
                    <Select
                        p={4}
                        variant="filled"
                        backgroundColor="gray.50"
                        name="intervalUnit"
                        placeholder="Contribution interval uint"
                        onValueChange={intervalUnit => setIntervalUnit(intervalUnit)}
                        selectedValue={intervalUnit}>
                        <Select.Item label=" " value="Select interval" />
                        <Select.Item label="Cedis" value="GHS" />
                        <Select.Item label="Dollars" value="USD" />
                    </Select>
                    {error.intervalUnit && <Text color="error.400">{error.intervalUnit}</Text>}
                </Box>
                
                <Text textAlign="center" fontSize="lg">Start Date</Text>
                
                <Divider width="100%" my={2} />
                
                <Box mb={4}>
                    
                    <Box mb={1}>
                        {showStartDateDialog && (
                            <RNDateTimePicker
                                value={startDate}
                                mode="date"
                                minimumDate={new Date()}
                                onChange={(event, date) => setStartDate(date)}
                            />
                        )}
                    </Box>
                    
                    <Button
                        onPress={() => setShowStartDateDialog(true)}
                        variant="solid"
                        backgroundColor="primary.300" color="primary.600">
                        <Text>Select Start Date</Text>
                    </Button>
                    {error.startDate && <Text color="error.400">{error.startDate}</Text>}
                </Box>
                
                <Button
                    onPress={handleSaveGroupBasicInfo}
                    borderRadius={32}
                    py={2}
                    backgroundColor="primary.600"
                    variant="solid">
                    <Text color="white" fontSize="md">Save Basic Info</Text>
                </Button>
            </Box>
        </ScrollView>
    );
};

export default SusuBasicInfoForm;
