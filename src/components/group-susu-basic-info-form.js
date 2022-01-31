import React, { useState } from "react";
import { Box, Button, Divider, Input, ScrollView, Select, Text } from "native-base";
import { useDispatch, useSelector } from "react-redux";
import { selectSusu } from "../redux/susu/susu-reducer";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { SUSU_ACTION_CREATORS } from "../redux/susu/susu-action-creators";
import moment from "moment";

const GroupSusuBasicInfoForm = ({ groupDetail }) => {
    
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
    
    const handleDateChange = (event, date) => {
        setShowStartDateDialog(false);
        setStartDate(date);
    };
    
    return (
        <ScrollView>
            <Box borderBottomLeftRadius={0}
                 borderTopRightRadius={0}
                 borderBottomRightRadius={16}
                 borderTopLeftRadius={16}
                 mb={2}
                 py={3}
                 px={5}
                 shadow={0}
                 backgroundColor="white"
                 m={2}>
                <Text fontSize="xs" color="muted.400">Group Info</Text>
                
                <Divider width="100%" my={1} />
                
                <Text mb={1} color="muted.400">Name</Text>
                <Text fontSize="sm" color="muted.500">{groupDetail.name}</Text>
            </Box>
            
            <Box
                borderBottomLeftRadius={0}
                borderTopRightRadius={0}
                borderBottomRightRadius={16}
                borderTopLeftRadius={16}
                py={3}
                px={5}
                shadow={0}
                backgroundColor="white"
                m={2}>
                
                <Text fontSize="xs" color="muted.400">Payment Plan</Text>
                
                <Divider width="100%" my={2} />
                
                <Box mb={1}>
                    <Text mb={1} fontSize="xs" color="muted.400">Payment Amount</Text>
                    
                    <Input
                        placeholder="Payment Amount"
                        variant="outline"
                        borderBottomLeftRadius={0}
                        borderTopRightRadius={0}
                        borderBottomRightRadius={16}
                        borderTopLeftRadius={16}
                        py={3}
                        px={4}
                        isInvalid={Boolean(error.name)}
                        _focus={{ borderColor: "gray.400" }}
                        _invalid={{ borderColor: "red.400", borderWidth: 1, borderStyle: "solid" }}
                        isFullWidth={true}
                        mb={1}
                        size="md"
                        value={paymentAmount}
                        name="paymentAmount"
                        keyboardType="number-pad"
                        onChangeText={paymentAmount => setPaymentAmount(paymentAmount)}
                        isRequired={true}
                    />
                    {error.paymentAmount && <Text color="error.400">{error.paymentAmount}</Text>}
                </Box>
                <Box>
                    <Text mb={1} color="muted.400" fontSize="xs">Payment Currency</Text>
                    <Select
                        py={3}
                        px={4}
                        mb={1}
                        variant="outline"
                        borderBottomLeftRadius={0}
                        borderTopRightRadius={0}
                        borderBottomRightRadius={16}
                        borderTopLeftRadius={16}
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
                
                <Text color="muted.400" fontSize="xs">Contribution Plan</Text>
                
                <Divider width="100%" my={2} />
                
                <Box mb={2}>
                    <Text mb={1} color="muted.400" fontSize="xs">Interval</Text>
                    <Input
                        placeholder="Contribution interval"
                        variant="outline"
                        borderWidth={1}
                        borderBottomLeftRadius={0}
                        borderTopRightRadius={0}
                        borderBottomRightRadius={16}
                        borderTopLeftRadius={16}
                        py={3}
                        keyboardType="number-pad"
                        px={4}
                        size="md"
                        isInvalid={Boolean(error.intervalUnit)}
                        _focus={{ borderColor: "gray.400" }}
                        _invalid={{ borderColor: "red.400", borderWidth: 1, borderStyle: "solid" }}
                        isFullWidth={true}
                        mb={1}
                        value={intervalAmount}
                        name="intervalAmount"
                        onChangeText={intervalAmount => setIntervalAmount(intervalAmount)}
                        isRequired={true}
                    />
                    {error.intervalAmount && <Text color="error.400">{error.intervalAmount}</Text>}
                </Box>
                
                <Box mb={2}>
                    <Text mb={1} color="muted.400" fontSize="xs">Period</Text>
                    <Select
                        px={4}
                        py={3}
                        variant="outline"
                        borderWidth={1}
                        borderBottomLeftRadius={0}
                        borderTopRightRadius={0}
                        borderBottomRightRadius={16}
                        borderTopLeftRadius={16}
                        name="intervalUnit"
                        placeholder="Contribution interval UNIT"
                        onValueChange={intervalUnit => setIntervalUnit(intervalUnit)}
                        selectedValue={intervalUnit}>
                        <Select.Item label="Day" value="day" />
                        <Select.Item label="Week" value="week" />
                        <Select.Item label="Month" value="month" />
                        <Select.Item label="Year" value="year" />
                    </Select>
                    {error.intervalUnit && <Text color="error.400">{error.intervalUnit}</Text>}
                </Box>
                <Divider width="100%" my={2} />
                
                <Box mb={4}>
                    <Text mb={1} color="muted.400" fontSize="xs">Start Date</Text>
                    
                    <Text color="muted.500" fontSize="sm">{moment(startDate).format("dddd, Do MMM YYYY")}</Text>
                    
                    <Divider width="100%" my={2} />
                    
                    <Box mb={1}>
                        {showStartDateDialog && (
                            <RNDateTimePicker
                                value={startDate}
                                mode="date"
                                minimumDate={new Date()}
                                onChange={handleDateChange}
                            />
                        )}
                    </Box>
                    
                    <Button
                        mb={1}
                        borderBottomLeftRadius={0}
                        borderTopRightRadius={0}
                        borderBottomRightRadius={16}
                        borderTopLeftRadius={16}
                        onPress={() => setShowStartDateDialog(true)}
                        variant="solid"
                        py={3}
                        _text={{ color: "primary.600", fontSize: "xs" }}
                        backgroundColor="primary.100">
                        Select Start Date
                    </Button>
                    {error.startDate && <Text textAlign="center" color="error.400">{error.startDate}</Text>}
                </Box>
                
                <Button
                    onPress={handleSaveGroupBasicInfo}
                    borderBottomLeftRadius={0}
                    borderTopRightRadius={0}
                    borderBottomRightRadius={16}
                    borderTopLeftRadius={16}
                    py={3}
                    _text={{ color: "white", fontSize: "xs" }}
                    backgroundColor="primary.600"
                    variant="solid">
                    Save Basic Info
                </Button>
            </Box>
        </ScrollView>
    );
};

export default GroupSusuBasicInfoForm;
