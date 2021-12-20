import React, { useEffect, useState } from "react";
import { Avatar, Box, Center, Divider, Flex, Image, ScrollView, Select, Text } from "native-base";
import { useDispatch, useSelector } from "react-redux";
import { selectDashboard } from "../../redux/dashboard/dashboard-reducer";
import { DASHBOARD_ACTION_CREATORS } from "../../redux/dashboard/dashboard-action-creators";
import { selectAuth } from "../../redux/auth/auth-reducer";
import { Dimensions, RefreshControl } from "react-native";
import moment from "moment";
import { UTILS } from "../../utils/utils";

import contributionIcon from "../../assets/images/investment.png";
import disbursementIcon from "../../assets/images/donation.png";
import savingsImage from "../../assets/images/savings64px.png";
import investmentImage from "../../assets/images/investment64px.png";
import Empty from "../../components/empty";
import { LineChart } from "react-native-chart-kit";
import NumberSuffix from "number-suffix";

const DashboardScreen = () => {
    const { dashboard, dashboardLoading, period } = useSelector(selectDashboard);
    const { authToken, userData } = useSelector(selectAuth);
    
    const [selectedPeriod, setSelectedPeriod] = useState(period);
    
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(DASHBOARD_ACTION_CREATORS.getDashboard(authToken));
        if (period)
            setSelectedPeriod(period);
    }, []);
    
    const handlePeriodChange = period => {
        setSelectedPeriod(period);
        dispatch(DASHBOARD_ACTION_CREATORS.changePeriod(period));
    };
    
    const generateGreeting = () => {
        const currentHour = moment().format("HH");
        if (currentHour >= 3 && currentHour < 12)
            return "Good Morning";
        else if (currentHour >= 12 && currentHour < 15)
            return "Good Afternoon";
        else if (currentHour >= 15 && currentHour < 20)
            return "Good Evening";
        else if (currentHour >= 20 && currentHour < 3)
            return "Good Night";
        return "Hello";
    };
    
    const getCurrency = currency => {
        switch (currency) {
            case "GHS":
                return "\u00A2";
            case "USD":
                return "\u0024";
            default:
                return "\u00A2";
        }
    };
    
    return (
        <ScrollView
            flex={1}
            backgroundColor="#FFF9ED"
            refreshControl={
                <RefreshControl
                    refreshing={dashboardLoading}
                    onRefresh={() => dispatch(DASHBOARD_ACTION_CREATORS.getDashboard(authToken))}
                />
            }>
            <Box shadow={0} p={3} my={1} mx={2} backgroundColor="white" borderRadius={32}>
                <Flex flex={1} flexDirection="row" width="100%" alignItems="center">
                    <Avatar backgroundColor="primary.50" size={12} borderRadius={100}>
                        <Text color="primary.600" fontSize="2xl">{UTILS.getInitials(userData.name)}</Text>
                    </Avatar>
                    <Box ml={2}>
                        <Text fontSize="xl">{`${generateGreeting()} ${userData.name.split(" ")[0]}`}</Text>
                        <Text fontSize="md">Welcome Back!!!</Text>
                    </Box>
                </Flex>
            </Box>
            
            {dashboard && !dashboardLoading && (
                <Box>
                    <Box shadow={0} p={3} my={1} mx={2} backgroundColor="white" borderRadius={32}>
                        <Flex flex={1} flexDirection="row" width="100%" alignItems="center">
                            <Center size={16} borderRadius={100} backgroundColor="primary.50">
                                <Image size={10} source={contributionIcon} alt="Contribution Icon" />
                            </Center>
                            <Box ml={2} flex={1}>
                                <Text fontSize="lg">Total Contributions</Text>
                                <Text
                                    fontSize="md">{`${dashboard.contributions.totalContributions} Contributions`}</Text>
                            </Box>
                            <Box>
                                <Text fontSize="xl">
                                    {`${getCurrency(dashboard.contributions.contributionCurrency)} ${dashboard.contributions.totalContributionsAmount && NumberSuffix.format(dashboard.contributions.totalContributionsAmount, { precision: 2 })}`}
                                </Text>
                            </Box>
                        </Flex>
                    </Box>
                    
                    <Box shadow={0} p={3} my={1} mx={2} backgroundColor="white" borderRadius={32}>
                        <Flex flex={1} flexDirection="row" alignItems="center" justifyContent="space-between">
                            
                            <Box mr={2}>
                                <Text fontSize="lg" mb={1}>
                                    Select Period
                                </Text>
                            </Box>
                            
                            <Select
                                flex={1}
                                p={2}
                                borderRadius={32}
                                placeholder="Select Period"
                                onValueChange={period => handlePeriodChange(period)}
                                variant="outline"
                                selectedValue={selectedPeriod}>
                                <Select.Item label="Weekly" value="week" />
                                <Select.Item label="Monthly" value="month" />
                            </Select>
                        
                        </Flex>
                    </Box>
                    
                    {selectedPeriod && (
                        selectedPeriod === "week" ? (
                            <Box pt={4} backgroundColor="white" mb={2} borderRadius={32} mx={2} shadow={0} flex={1}
                                 justifyContent="space-between" alignItems="center">
                                <Flex px={2} direction="row" width="100%" justifyContent="space-between">
                                    <Text fontSize="xl" mb={1}>
                                        {`${getCurrency(dashboard?.contributions?.contributionCurrency)} ${dashboard?.contributions?.week?.lastWeekContributionAmount && NumberSuffix.format(dashboard?.contributions?.week?.lastWeekContributionAmount, { precision: 2 })}`}
                                    </Text>
                                    
                                    <Text
                                        mb={1}
                                        textAlign="center"
                                        fontFamily="body"
                                        fontSize="xs">
                                        {`${dashboard?.contributions?.week?.lastWeekContributionsCount && NumberSuffix.format(dashboard?.contributions?.week?.lastWeekContributionsCount, { precision: 2 })} Contributions this week`}
                                    </Text>
                                </Flex>
                                
                                <Box>
                                    <LineChart
                                        yAxisLabel={getCurrency(dashboard?.disbursements?.disbursementCurrency)}
                                        yAxisInterval={1}
                                        chartConfig={{
                                            backgroundColor: "#22d3ee",
                                            backgroundGradientFrom: "#0891b2",
                                            backgroundGradientTo: "#67e8f9",
                                            decimalPlaces: 2,
                                            color: (opacity = 1``) => `rgba(255, 255, 255, ${opacity})`,
                                            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                            style: {
                                                borderRadius: 32,
                                            },
                                            propsForDots: {
                                                r: "4",
                                                strokeWidth: "2",
                                                stroke: "#0e7490",
                                            },
                                            formatXLabel: (label) => label + 5,
                                            paddingRight: 8,
                                        }}
                                        bezier={true}
                                        style={{
                                            borderRadius: 32,
                                            paddingHorizontal: 8,
                                        }}
                                        data={{
                                            labels: dashboard?.contributions?.week?.labels,
                                            datasets: [
                                                {
                                                    data: dashboard?.contributions?.week?.data,
                                                },
                                            ],
                                        }}
                                        width={Dimensions.get("window").width - 16}
                                        height={200}
                                    />
                                </Box>
                            </Box>
                        ) : selectedPeriod === "month" ? (
                            <Box>
                                <Box pt={4} backgroundColor="white" borderRadius={32} mb={2} mx={2} shadow={0} flex={1}
                                     justifyContent="space-between" alignItems="center">
                                    <Flex px={2} direction="row" width="100%" justifyContent="space-between">
                                        <Text fontSize="xl" mb={1}>
                                            {`${getCurrency(dashboard?.contributions?.contributionCurrency)} ${dashboard?.contributions?.month?.lastMonthContributionAmount && NumberSuffix.format(dashboard?.contributions?.month?.lastMonthContributionAmount, { precision: 2 })}`}
                                        </Text>
                                        
                                        <Text
                                            mb={1}
                                            textAlign="center"
                                            fontFamily="body"
                                            fontSize="xs">
                                            {`${dashboard?.contributions?.month?.lastMonthContributionsCount && NumberSuffix.format(dashboard?.contributions?.month?.lastMonthContributionsCount, { precision: 2 })} Contributions this month`}
                                        </Text>
                                    </Flex>
                                    
                                    <Box>
                                        <LineChart
                                            yAxisLabel={getCurrency(dashboard?.disbursements?.disbursementCurrency)}
                                            yAxisInterval={1}
                                            chartConfig={{
                                                backgroundColor: "#22d3ee",
                                                backgroundGradientFrom: "#0891b2",
                                                backgroundGradientTo: "#67e8f9",
                                                decimalPlaces: 2,
                                                color: (opacity = 1``) => `rgba(255, 255, 255, ${opacity})`,
                                                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                                style: {
                                                    borderRadius: 32,
                                                },
                                                propsForDots: {
                                                    r: "4",
                                                    strokeWidth: "2",
                                                    stroke: "#0e7490",
                                                },
                                                formatXLabel: (label) => NumberSuffix.format(Integer.valueOf(label), { precision: 2 }),
                                                paddingRight: 8,
                                            }}
                                            bezier={true}
                                            style={{
                                                borderRadius: 32,
                                                paddingHorizontal: 8,
                                            }}
                                            data={{
                                                labels: dashboard?.contributions?.month?.labels,
                                                datasets: [
                                                    {
                                                        data: dashboard?.contributions?.month?.data,
                                                    },
                                                ],
                                            }}
                                            width={Dimensions.get("window").width - 16}
                                            height={200}
                                        />
                                    </Box>
                                </Box>
                            </Box>
                        ) : null)}
                    
                    
                    <Box shadow={0} p={3} my={1} mx={2} backgroundColor="white" borderRadius={32}>
                        <Flex flex={1} flexDirection="row" width="100%" alignItems="center">
                            <Center size={16} borderRadius={100} backgroundColor="primary.50">
                                <Image size={10} source={disbursementIcon} alt="Disbursement Icon" />
                            </Center>
                            <Box ml={2} flex={1}>
                                <Text fontSize="lg">Total Disbursements</Text>
                                <Text
                                    fontSize="md">{`${dashboard?.disbursements?.totalDisbursements && NumberSuffix.format(dashboard?.disbursements?.totalDisbursements, { precision: 2 })} Disbursements`}</Text>
                            </Box>
                            <Box>
                                <Text fontSize="xl">
                                    {`${getCurrency(dashboard?.disbursements?.disbursementCurrency)} ${dashboard?.disbursements?.totalDisbursements && NumberSuffix.format(dashboard?.disbursements?.totalDisbursements, { precision: 2 })}`}
                                </Text>
                            </Box>
                        </Flex>
                    </Box>
                    
                    {selectedPeriod && (
                        selectedPeriod === "week" ? (
                            <Box
                                px={4}
                                pt={4}
                                mb={2}
                                backgroundColor="white"
                                borderRadius={32}
                                mx={2}
                                shadow={0}
                                flex={1}
                                justifyContent="space-between"
                                alignItems="center">
                                <Flex px={2} direction="row" width="100%" justifyContent="space-between">
                                    <Text fontSize="xl" mb={1}>
                                        {`${getCurrency(dashboard?.disbursements?.disbursementCurrency)} ${dashboard?.disbursements?.week?.lastWeekDisbursementAmount && NumberSuffix.format(dashboard?.disbursements?.week?.lastWeekDisbursementAmount, { precision: 2 })}`}
                                    </Text>
                                    
                                    <Text
                                        mb={1}
                                        textAlign="center"
                                        fontFamily="body"
                                        fontSize="xs">
                                        {`${dashboard?.disbursements?.week?.lastWeekDisbursementsCount && NumberSuffix.format(dashboard?.disbursements?.week?.lastWeekDisbursementsCount, { precision: 2 })} Disbursements this week`}
                                    </Text>
                                </Flex>
                                
                                <Box>
                                    <LineChart
                                        yAxisLabel={getCurrency(dashboard?.disbursements?.disbursementCurrency)}
                                        yAxisInterval={1}
                                        chartConfig={{
                                            backgroundColor: "#22d3ee",
                                            backgroundGradientFrom: "#0891b2",
                                            backgroundGradientTo: "#67e8f9",
                                            decimalPlaces: 2,
                                            color: (opacity = 1``) => `rgba(255, 255, 255, ${opacity})`,
                                            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                            style: {
                                                borderRadius: 32,
                                            },
                                            propsForDots: {
                                                r: "4",
                                                strokeWidth: "2",
                                                stroke: "#0e7490",
                                            },
                                            formatXLabel: (label) => label + 5,
                                            paddingRight: 8,
                                        }}
                                        bezier={true}
                                        style={{
                                            borderRadius: 32,
                                            paddingHorizontal: 8,
                                        }}
                                        data={{
                                            labels: dashboard?.disbursements?.week?.labels,
                                            datasets: [
                                                {
                                                    data: dashboard?.disbursements?.week?.data,
                                                },
                                            ],
                                        }}
                                        width={Dimensions.get("window").width - 16}
                                        height={200}
                                    />
                                </Box>
                            </Box>
                        ) : selectedPeriod === "month" ? (
                            <Box>
                                <Box
                                    px={4}
                                    pt={4}
                                    mb={2}
                                    backgroundColor="white"
                                    borderRadius={32}
                                    mx={2}
                                    shadow={0}
                                    flex={1}
                                    justifyContent="space-between"
                                    alignItems="center">
                                    <Flex px={2} direction="row" width="100%" justifyContent="space-between"
                                          alignItems="center">
                                        <Text fontSize="xl" mb={1}>
                                            {`${getCurrency(dashboard?.disbursements?.contributionCurrency)} ${dashboard?.disbursements?.month?.lastMonthDisbursementAmount && NumberSuffix.format(dashboard?.disbursements?.month?.lastMonthDisbursementAmount, { precision: 2 })}`}
                                        </Text>
                                        
                                        <Text
                                            mb={1}
                                            textAlign="center"
                                            fontFamily="body"
                                            fontSize="xs">
                                            {`${dashboard?.disbursements?.month?.lastMonthDisbursementsCount && NumberSuffix.format(dashboard?.disbursements?.month?.lastMonthDisbursementsCount, { precision })} Disbursements this month`}
                                        </Text>
                                    </Flex>
                                    
                                    <Box>
                                        <LineChart
                                            yAxisLabel={getCurrency(dashboard?.disbursements?.disbursementCurrency)}
                                            yAxisInterval={1}
                                            chartConfig={{
                                                backgroundColor: "#22d3ee",
                                                backgroundGradientFrom: "#0891b2",
                                                backgroundGradientTo: "#67e8f9",
                                                decimalPlaces: 2,
                                                color: (opacity = 1``) => `rgba(255, 255, 255, ${opacity})`,
                                                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                                style: {
                                                    borderRadius: 32,
                                                },
                                                propsForDots: {
                                                    r: "4",
                                                    strokeWidth: "2",
                                                    stroke: "#0e7490",
                                                },
                                                formatXLabel: (label) => NumberSuffix.format(Integer.valueOf(label), { precision: 2 }),
                                                paddingRight: 8,
                                            }}
                                            bezier={true}
                                            style={{
                                                borderRadius: 32,
                                                paddingHorizontal: 8,
                                            }}
                                            data={{
                                                labels: dashboard?.disbursements?.month?.labels,
                                                datasets: [
                                                    {
                                                        data: dashboard?.disbursements?.month?.data,
                                                    },
                                                ],
                                            }}
                                            width={Dimensions.get("window").width - 16}
                                            height={200}
                                        />
                                    </Box>
                                </Box>
                            </Box>
                        ) : null)}
                    
                    <Box shadow={0} p={3} my={1} mx={2} backgroundColor="white" borderRadius={32}>
                        <Flex flex={1} flexDirection="row" width="100%" alignItems="center">
                            <Center size={16} borderRadius={100} backgroundColor="primary.50">
                                <Image size={10} source={disbursementIcon} alt="Disbursement Icon" />
                            </Center>
                            <Box ml={2} flex={1}>
                                <Text fontSize="lg">Expired Invitations</Text>
                                <Text fontSize="md">
                                    {`${dashboard.invitations?.expiredInvitations?.expiredInvitationsCount && NumberSuffix.format(dashboard.invitations?.expiredInvitations?.expiredInvitationsCount)} Invitations`}
                                </Text>
                            </Box>
                            <Box>
                            
                            </Box>
                        </Flex>
                    </Box>
                    
                    <Box shadow={0} p={3} my={1} mx={2} backgroundColor="white" borderRadius={32}>
                        <Flex flex={1} flexDirection="row" width="100%" alignItems="center">
                            <Center size={16} borderRadius={100} backgroundColor="primary.50">
                                <Image size={10} source={disbursementIcon} alt="Disbursement Icon" />
                            </Center>
                            <Box ml={2} flex={1}>
                                <Text fontSize="lg">Rejected Invitations</Text>
                                <Text fontSize="md">
                                    {`${dashboard.invitations?.rejectedInvitations?.rejectedInvitationsCount && NumberSuffix.format(dashboard.invitations?.rejectedInvitations?.rejectedInvitationsCount, { precision: 2 })} Invitations`}
                                </Text>
                            </Box>
                            <Box>
                            
                            </Box>
                        </Flex>
                    </Box>
                    
                    <Box shadow={0} p={3} my={1} mx={2} backgroundColor="white" borderRadius={32}>
                        <Flex flex={1} flexDirection="row" width="100%" alignItems="center">
                            <Center size={16} borderRadius={100} backgroundColor="primary.50">
                                <Image size={10} source={disbursementIcon} alt="Disbursement Icon" />
                            </Center>
                            <Box ml={2} flex={1}>
                                <Text fontSize="lg">Accepted Invitations</Text>
                                <Text fontSize="md">
                                    {`${dashboard.invitations?.acceptedInvitations?.acceptedInvitationsCount && NumberSuffix.format(dashboard.invitations?.acceptedInvitations?.acceptedInvitationsCount, { precision: 2 })} Invitations`}
                                </Text>
                            </Box>
                            <Box>
                            
                            </Box>
                        </Flex>
                    </Box>
                    
                    <Box>
                        <Flex direction="row" width="100%" justifyContent="space-around">
                            <Box
                                p={3} my={1} mx={2}
                                flex={1}
                                alignItems="center"
                                flexGrow={1}
                                shadow={0}
                                borderRadius={32}
                                backgroundColor="white">
                                <Flex
                                    flex={1}
                                    justifyContent="center"
                                    alignItems="center"
                                    backgroundColor="primary.100"
                                    px={3}
                                    borderRadius={100}>
                                    <Image size={7} alt="Savings image" source={savingsImage} />
                                </Flex>
                                
                                <Text
                                    textAlign="center"
                                    fontFamily="body"
                                    fontSize="lg">
                                    {dashboard.susu.totalUserSusu}
                                </Text>
                                <Text
                                    textAlign="center"
                                    fontFamily="body">
                                    Susu
                                </Text>
                            </Box>
                            
                            <Box
                                flex={1}
                                p={3}
                                my={1}
                                mx={2}
                                alignItems="center"
                                flexGrow={1}
                                shadow={0}
                                borderRadius={32} backgroundColor="white">
                                <Flex
                                    flex={1}
                                    justifyContent="center"
                                    alignItems="center"
                                    backgroundColor="primary.100"
                                    borderRadius={100}
                                    py={2}
                                    px={3}>
                                    <Image size={30} alt="Investment image" source={investmentImage} />
                                </Flex>
                                <Text
                                    textAlign="center"
                                    fontFamily="body"
                                    fontSize="lg">
                                    {dashboard.groups.totalUserGroups}
                                </Text>
                                <Text
                                    textAlign="center"
                                    fontFamily="body">
                                    Groups
                                </Text>
                            </Box>
                        </Flex>
                    </Box>
                    
                    <Box shadow={0} py={4} my={1} mx={2} backgroundColor="white" borderRadius={32}>
                        <Text px={4}>Latest Contributions</Text>
                        <Divider orientation="horizontal" width="100%" my={2} />
                        {
                            dashboard?.contributions?.latestContributions?.length === 0 ? (
                                <Box>
                                    <Box mx={2}>
                                        <Flex
                                            flex={1}
                                            flexDirection="row" backgroundColor="primary.50" py={2} borderRadius={32}>
                                            <Text textAlign="center" color="primary.600" flex={1}>Group</Text>
                                            <Text textAlign="center" color="primary.600" flex={1}>Amount</Text>
                                            <Text textAlign="center" color="primary.600" flex={1}>Date</Text>
                                        </Flex>
                                    </Box>
                                    <Empty description="No contributions" title="Latest Contributions" />
                                </Box>
                            ) : (
                                <Box>
                                    <Box>
                                        <Flex flex={1}>
                                            <Text flex={1}>Group</Text>
                                            <Text flex={1}>Amount</Text>
                                            <Text flex={1}>Date</Text>
                                        </Flex>
                                    </Box>
                                    {dashboard?.contributions?.latestContributions?.map((contribution, index) => {
                                        return (
                                            <Box key={index}>
                                            
                                            </Box>
                                        );
                                    })}
                                </Box>
                            )
                        }
                    </Box>
                    
                    <Box shadow={0} py={4} my={1} mx={2} backgroundColor="white" borderRadius={32}>
                        <Text px={4}>Latest Disbursements</Text>
                        <Divider orientation="horizontal" width="100%" my={2} />
                        {
                            dashboard?.disbursements?.latestDisbursements?.length === 0 ? (
                                <Box>
                                    <Box mx={2}>
                                        <Box mx={2}>
                                            <Flex
                                                flex={1}
                                                flexDirection="row" backgroundColor="primary.50" py={2}
                                                borderRadius={32}>
                                                <Text textAlign="center" color="primary.600" flex={1}>Group</Text>
                                                <Text textAlign="center" color="primary.600" flex={1}>Amount</Text>
                                                <Text textAlign="center" color="primary.600" flex={1}>Date</Text>
                                            </Flex>
                                        </Box>
                                    </Box>
                                    <Empty description="No disbursements" title="Latest Disbursements" />
                                </Box>
                            ) : (
                                <Box>
                                    <Box>
                                        <Box mx={2}>
                                            <Flex
                                                flex={1}
                                                flexDirection="row" backgroundColor="primary.50" py={2}
                                                borderRadius={32}>
                                                <Text textAlign="center" color="primary.600" flex={1}>Group</Text>
                                                <Text textAlign="center" color="primary.600" flex={1}>Amount</Text>
                                                <Text textAlign="center" color="primary.600" flex={1}>Date</Text>
                                            </Flex>
                                        </Box>
                                    </Box>
                                    {dashboard?.disbursements?.latestDisbursements?.map((disbursement, index) => {
                                        return (
                                            <Box key={index}>
                                            
                                            </Box>
                                        );
                                    })}
                                </Box>
                            )
                        }
                    </Box>
                </Box>
            )}
        </ScrollView>
    );
};

export default DashboardScreen;
