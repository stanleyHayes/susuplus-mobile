import React from "react";
import { SCREEN_NAME_CONSTANTS } from "../constants/constants";
import { Badge, Box, Center, Divider, Flex, HStack, Icon, Image, Pressable, Text } from "native-base";
import moment from "moment";
import defaultUserImage from "./../assets/images/user.png";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const GroupSusuHistoryItem = ({ susu, navigation }) => {
    
    const renderStatus = status => {
        switch (status) {
            case 'PENDING':
                return <Badge alignSelf="flex-start" variant="subtle" colorScheme="default" borderRadius={32}><Text textTransform="capitalize" color="teal.600" fontSize="sm">{status}</Text></Badge> ;
            case 'STARTED':
                return <Badge alignSelf="flex-start" variant="subtle" colorScheme="info" borderRadius={32}><Text textTransform="capitalize" color="blue.600" fontSize="sm">{status}</Text></Badge> ;
            case 'PAUSED':
                return <Badge alignSelf="flex-start" variant="subtle" colorScheme="default" borderRadius={32}><Text textTransform="capitalize" color="red.600" fontSize="sm">{status}</Text></Badge> ;
            case 'STOPPED':
                return <Badge alignSelf="flex-start" variant="subtle" colorScheme="danger" borderRadius={32}><Text textTransform="capitalize" color="red.600" fontSize="sm">{status}</Text></Badge> ;
            case 'COMPLETED':
                return <Badge alignSelf="flex-start" variant="subtle" colorScheme="success" borderRadius={32}><Text textTransform="capitalize" color="teal.600" fontSize="sm">{status}</Text></Badge> ;
        }
    }
    
    return (
        <Pressable
            onPress={() => navigation.push(SCREEN_NAME_CONSTANTS.GROUP_SUSU_DETAIL_SCREEN, { susuID: susu._id, groupID: susu.group._id })}>
            <Box
                borderRadius={32}
                backgroundColor="white"
                p={4}
                mx={2}
                my={.5}
                shadow={0}>
                <HStack mb={2}>
                    <Box ml={2}>
                        {renderStatus(susu.status)}
                        <Text>
                            {`${moment(susu.startDate).format("YYYY, MMM DD")} - ${moment(susu.endDate).format("YYYY, MMM DD")}`}
                        </Text>
                    </Box>
                </HStack>
                <Divider
                    alignSelf="center"
                    width="100%"
                    mt={1}
                    mb={1}
                    backgroundColor="muted.200"
                    orientation="horizontal"
                    thickness={1} />
                <Text
                    mb={2}
                    fontSize="md">
                    {`A contribution of ${susu.paymentPlan.amount === 1 ? "" : susu.paymentPlan.amount} ${susu.paymentPlan.currency} every ${susu.contributionPlan.interval === 1 ? "": susu.contributionPlan.interval} ${susu.contributionPlan.interval === 1 ? susu.contributionPlan.unit:  `${susu.contributionPlan.unit}s`}`}
                </Text>
                <Box shadow={0} borderRadius={32} p={2} backgroundColor="primary.50">
                    <HStack>
                        <Center
                            backgroundColor="primary.100"
                            borderRadius={100}
                            size={50}>
                            <Image
                                alt={susu.currentRecipient.member.user.name}
                                source={susu.currentRecipient.member.user.image ? susu.currentRecipient.member.user.image : defaultUserImage}
                                objectPosition="center"
                                resizeMode="cover"
                                borderRadius={100}
                                size={30}
                            />
                        </Center>
                        <Flex flex={1} ml={2} justifyContent="center">
                            <Text fontSize="md">{susu.currentRecipient.member.user.name}</Text>
                            <Text fontSize="xs">{`Disbursement ${moment(susu.currentRecipient.date).fromNow()}`}</Text>
                        </Flex>
                        <Flex justifyContent="center">
                            <Icon size="md" as={MaterialIcons} color="primary.600" name="chevron-right" />
                        </Flex>
                    </HStack>
                </Box>
            </Box>
        </Pressable>
    );
};


export default GroupSusuHistoryItem;
