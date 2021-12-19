import React, { useEffect } from "react";
import { Avatar, Box, Center, Divider, Flex, Image, ScrollView, Text } from "native-base";
import { useDispatch, useSelector } from "react-redux";
import { selectDashboard } from "../../redux/dashboard/dashboard-reducer";
import { DASHBOARD_ACTION_CREATORS } from "../../redux/dashboard/dashboard-action-creators";
import { selectAuth } from "../../redux/auth/auth-reducer";
import { RefreshControl } from "react-native";
import moment from "moment";
import { UTILS } from "../../utils/utils";

import contributionIcon from "../../assets/images/investment.png";
import disbursementIcon from "../../assets/images/donation.png";
import savingsImage from "../../assets/images/savings64px.png";
import investmentImage from "../../assets/images/investment64px.png";
import Empty from "../../components/empty";

const DashboardScreen = () => {
    const { dashboard, dashboardLoading } = useSelector(selectDashboard);
    const { authToken, userData } = useSelector(selectAuth);
    
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(DASHBOARD_ACTION_CREATORS.getDashboard(authToken));
    }, []);
    
    console.log(dashboard);
    
    const generateGreeting = () => {
        const currentHour = moment().format("HH");
        if(currentHour >= 3 && currentHour < 12)
            return "Good Morning";
        else if(currentHour >= 12 && currentHour < 15)
            return "Good Afternoon";
        else if(currentHour >= 15 && currentHour < 20)
            return "Good Evening";
        else if(currentHour >= 20 && currentHour < 3)
            return "Good Night";
        return "Hello";
    }
    
    const getCurrency = currency => {
        switch (currency){
            case 'GHS':
                return '\u00A2';
            case 'USD':
                return '\u0024';
            default:
                return '\u00A2';
        }
    }
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
                    <Avatar size={12} borderRadius={100}>
                        <Text fontSize="2xl">{UTILS.getInitials(userData.name)}</Text>
                    </Avatar>
                    <Box ml={2}>
                        <Text fontSize="xl">{`${generateGreeting()} ${userData.name.split(' ')[0]}`}</Text>
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
                                <Text fontSize="md">{`${dashboard.contributions.totalContributions} Contributions`}</Text>
                            </Box>
                            <Box>
                                <Text fontSize="xl">
                                    {`${getCurrency(dashboard.contributions.contributionCurrency)} ${dashboard.contributions.totalContributionsAmount}`}
                                </Text>
                            </Box>
                        </Flex>
                    </Box>
    
                    <Box shadow={0} p={3} my={1} mx={2} backgroundColor="white" borderRadius={32}>
                        <Flex flex={1} flexDirection="row" width="100%" alignItems="center">
                            <Center size={16} borderRadius={100} backgroundColor="primary.50">
                                <Image size={10} source={disbursementIcon} alt="Disbursement Icon" />
                            </Center>
                            <Box ml={2} flex={1}>
                                <Text fontSize="lg">Total Disbursements</Text>
                                <Text fontSize="md">{`${dashboard.disbursements.totalDisbursements} Disbursements`}</Text>
                            </Box>
                            <Box>
                                <Text fontSize="xl">
                                    {`${getCurrency(dashboard.disbursements.disbursementCurrency)} ${dashboard.disbursements.totalDisbursements}`}
                                </Text>
                            </Box>
                        </Flex>
                    </Box>
    
                    <Box shadow={0} p={3} my={1} mx={2} backgroundColor="white" borderRadius={32}>
                        <Flex flex={1} flexDirection="row" width="100%" alignItems="center">
                            <Center size={16} borderRadius={100} backgroundColor="primary.50">
                                <Image size={10} source={disbursementIcon} alt="Disbursement Icon" />
                            </Center>
                            <Box ml={2} flex={1}>
                                <Text fontSize="lg">Expired Invitations</Text>
                                <Text fontSize="md">
                                    {`${dashboard.invitations?.expiredInvitations?.expiredInvitationsCount} Invitations`}
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
                                    {`${dashboard.invitations?.rejectedInvitations?.rejectedInvitationsCount} Invitations`}
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
                                    {`${dashboard.invitations?.acceptedInvitations?.acceptedInvitationsCount} Invitations`}
                                </Text>
                            </Box>
                            <Box>
                            
                            </Box>
                        </Flex>
                    </Box>
                    
                    <Box >
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
                            ): (
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
                                        )
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
                                                flexDirection="row" backgroundColor="primary.50" py={2} borderRadius={32}>
                                                <Text textAlign="center" color="primary.600" flex={1}>Group</Text>
                                                <Text textAlign="center" color="primary.600" flex={1}>Amount</Text>
                                                <Text textAlign="center" color="primary.600" flex={1}>Date</Text>
                                            </Flex>
                                        </Box>
                                    </Box>
                                    <Empty description="No disbursements" title="Latest Disbursements" />
                                </Box>
                            ): (
                                <Box>
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
                                    </Box>
                                    {dashboard?.disbursements?.latestDisbursements?.map((disbursement, index) => {
                                        return (
                                            <Box key={index}>
                                            
                                            </Box>
                                        )
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
