import React, { useEffect } from "react";
import {
    Avatar,
    Box,
    Button,
    Center,
    Divider,
    Flex,
    HStack,
    Icon,
    Image,
    Pressable,
    ScrollView,
    Spinner,
    Text,
} from "native-base";


import invitationsImage from "./../../assets/images/invite.png";
import savingsImage from "./../../assets/images/savings64px.png";
import investmentImage from "./../../assets/images/investment64px.png";

import { useDispatch, useSelector } from "react-redux";
import { selectGroups } from "../../redux/groups/group-reducers";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { SCREEN_NAME_CONSTANTS } from "../../constants/constants";
import { GROUP_ACTION_CREATORS } from "../../redux/groups/group-action-creators";
import { selectAuth } from "../../redux/auth/auth-reducer";
import susuMembersIcon from "../../assets/images/team.png";
import disbursementOrderIcon from "../../assets/images/expenses.png";
import contributionIcon from "../../assets/images/donation.png";
import AvatarGroup from "native-base/src/components/composites/Avatar/Group";
import { UTILS } from "../../utils/utils";
import SingleRegulationListItem from "../../components/single-regulation-list-item";

const GroupDetailScreen = ({ navigation, route }) => {
    const { groupLoading, groupDetail, groupMembers } = useSelector(selectGroups);
    const { authToken } = useSelector(selectAuth);
    
    const { groupID } = route.params;
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(GROUP_ACTION_CREATORS.getGroup(authToken, groupID));
    }, []);
    
    return (
        <ScrollView>
            {groupLoading &&
            <Center flex={1} height="100%">
                <Spinner
                    size={50}
                    color="primary.800"
                />
            </Center>}
            
            {groupDetail && (
                <Box m={2}>
                    <Box p={2} backgroundColor="gray.100">
                        <Box mb={2} shadow={0}
                             borderBottomLeftRadius={0}
                             borderTopRightRadius={0}
                             borderBottomRightRadius={16}
                             borderTopLeftRadius={16} backgroundColor="white" p={4}>
                            <Text fontFamily="body" fontSize="sm" color="muted.400">
                                About Group
                            </Text>
                            <Divider
                                alignSelf="center"
                                width="100%"
                                mt={1}
                                mb={1}
                                backgroundColor="muted.200"
                                orientation="horizontal"
                                thickness={1} />
                            <Text mb={2} fontSize="lg">{groupDetail.name}</Text>
                            <Text mb={2}>
                                {groupMembers && `${groupMembers.length} ${groupMembers.length === 1 ? "group member" : "group members"}`}
                            </Text>
                            <Divider
                                alignSelf="center"
                                width="100%"
                                mt={1}
                                mb={1}
                                backgroundColor="muted.200"
                                orientation="horizontal"
                                thickness={1} />
                            
                            <Flex flex={1} flexDirection="row" justifyContent="flex-start">
                                <AvatarGroup size="md" max={5}>
                                    {groupMembers.map(member => {
                                        return (
                                            member.user.image ?
                                                <Avatar key={member._id} source={member.user.image} size="md" /> :
                                                <Avatar key={member._id} backgroundColor="primary.100">
                                                    <Text
                                                        fontSize="xl"
                                                        color="primary.600"
                                                        bold={true}>
                                                        {UTILS.getInitials(member.user.name)}
                                                    </Text>
                                                </Avatar>
                                        );
                                    })}
                                </AvatarGroup>
                            </Flex>
                            
                            <Divider
                                alignSelf="center"
                                width="100%"
                                mt={1}
                                mb={1}
                                backgroundColor="muted.200"
                                orientation="horizontal"
                                thickness={1} />
                            
                            <Text fontFamily="body" fontSize="xs" color="muted.500">
                                {groupDetail.description}
                            </Text>
                        </Box>
                        <Box mb={2}>
                            <Flex direction="row" width="100%" justifyContent="space-around">
                                <Box
                                    flex={1}
                                    alignItems="center"
                                    p={4} mr={1}
                                    flexGrow={1}
                                    shadow={0}
                                    borderBottomLeftRadius={0}
                                    borderTopRightRadius={0}
                                    borderBottomRightRadius={16}
                                    borderTopLeftRadius={16}
                                    backgroundColor="white">
                                    <Flex
                                        flex={1}
                                        justifyContent="center"
                                        alignItems="center"
                                        backgroundColor="primary.100"
                                        px={3}
                                        borderBottomLeftRadius={0}
                                        borderTopRightRadius={0}
                                        borderBottomRightRadius={16}
                                        borderTopLeftRadius={16}>
                                        <Image size={7} alt="Savings image" source={savingsImage} />
                                    </Flex>
                                    
                                    <Text
                                        color="muted.500"
                                        textAlign="center"
                                        fontFamily="body"
                                        fontSize="md">
                                        {groupDetail && groupDetail.percentages && groupDetail.percentages.susu}%
                                    </Text>
                                    <Text
                                        color="muted.400"
                                        textAlign="center"
                                        fontFamily="body">
                                        Susu
                                    </Text>
                                </Box>
                                
                                <Box flex={1} p={4} ml={1} alignItems="center" flexGrow={1} shadow={0}
                                     borderBottomLeftRadius={0}
                                     borderTopRightRadius={0}
                                     borderBottomRightRadius={16}
                                     borderTopLeftRadius={16}
                                     backgroundColor="white">
                                    <Flex
                                        flex={1}
                                        borderBottomLeftRadius={0}
                                        borderTopRightRadius={0}
                                        borderBottomRightRadius={16}
                                        borderTopLeftRadius={16}
                                        justifyContent="center"
                                        alignItems="center"
                                        backgroundColor="primary.100"
                                        py={2}
                                        px={3}>
                                        <Image size={30} alt="Investment image" source={investmentImage} />
                                    </Flex>
                                    <Text
                                        color="muted.500"
                                        textAlign="center"
                                        fontFamily="body"
                                        fontSize="lg">
                                        {groupDetail && groupDetail.percentages && groupDetail.percentages.investment}%
                                    </Text>
                                    <Text
                                        color="muted.400"
                                        textAlign="center"
                                        fontFamily="body">
                                        Investment
                                    </Text>
                                </Box>
                            </Flex>
                        </Box>
                        <Box
                            mb={2}
                             shadow={0}
                             borderBottomLeftRadius={0}
                             borderTopRightRadius={0}
                             borderBottomRightRadius={16}
                             borderTopLeftRadius={16}
                            backgroundColor="white" p={4}>
                            <Text fontFamily="body" fontSize="sm" color="muted.400">
                                Group Regulations
                            </Text>
                            <Divider
                                alignSelf="center"
                                width="100%"
                                mt={1}
                                mb={1}
                                backgroundColor="muted.200"
                                orientation="horizontal"
                                thickness={1} />
                            {
                                groupDetail.regulations.map((regulation, index) => {
                                    return (
                                        <SingleRegulationListItem
                                            key={index}
                                            regulation={regulation}
                                            index={index}
                                            showDelete={false}
                                        />
                                    );
                                })
                            }
                        </Box>
                        <Box p={2}>
                            <Button
                                onPress={() => {
                                    navigation.push(SCREEN_NAME_CONSTANTS.CREATE_GROUP_SUSU_SCREEN, { groupID: groupDetail._id });
                                }}
                                variant="outlined"
                                my={1}
                                backgroundColor="secondary.600"
                                size="lg"
                                py={4}
                                borderBottomLeftRadius={0}
                                borderTopRightRadius={0}
                                borderBottomRightRadius={16}
                                borderTopLeftRadius={16}>
                                <Text fontSize="md" color="white">Create Susu</Text>
                            </Button>
                        </Box>
                        
                        <Pressable
                            onPress={() => navigation.push(SCREEN_NAME_CONSTANTS.GROUP_MEMBERS_SCREEN, { groupID: groupDetail._id })}>
                            <Box
                                mt={2}
                                 mb={2}
                                 shadow={0}
                                 borderBottomLeftRadius={0}
                                 borderTopRightRadius={0}
                                 borderBottomRightRadius={16}
                                 borderTopLeftRadius={16} p={2}
                                 backgroundColor="primary.50">
                                <HStack>
                                    <Center
                                        backgroundColor="primary.100"
                                        borderRadius={100}
                                        size={50}>
                                        <Image
                                            alt="Susu members Icon"
                                            source={susuMembersIcon}
                                            objectPosition="center"
                                            resizeMode="cover"
                                            borderRadius={100}
                                            size={30}
                                        />
                                    </Center>
                                    <Flex flex={1} ml={2} justifyContent="center">
                                        <Text fontSize="md">Group Members</Text>
                                        <Text fontSize="xs">View Group Members</Text>
                                    </Flex>
                                    <Flex justifyContent="center">
                                        <Icon size="md" as={MaterialIcons} color="primary.600"
                                              name="chevron-right" />
                                    </Flex>
                                </HStack>
                            </Box>
                        </Pressable>
                        
                        <Pressable
                            onPress={() => navigation.push(SCREEN_NAME_CONSTANTS.GROUP_SUSU_HISTORY_SCREEN, { groupID: groupDetail._id })}>
                            <Box mt={2} mb={2} shadow={0}
                                 borderBottomLeftRadius={0}
                                 borderTopRightRadius={0}
                                 borderBottomRightRadius={16}
                                 borderTopLeftRadius={16}
                                 p={2}
                                 backgroundColor="primary.50">
                                <HStack>
                                    <Center
                                        backgroundColor="primary.100"
                                        borderRadius={100}
                                        size={50}>
                                        <Image
                                            alt="Savings Icon"
                                            source={savingsImage}
                                            objectPosition="center"
                                            resizeMode="cover"
                                            borderRadius={100}
                                            size={30}
                                        />
                                    </Center>
                                    <Flex flex={1} ml={2} justifyContent="center">
                                        <Text fontSize="md">Susu</Text>
                                        <Text fontSize="xs">View Susu History</Text>
                                    </Flex>
                                    <Flex justifyContent="center">
                                        <Icon size="md" as={MaterialIcons} color="primary.600"
                                              name="chevron-right" />
                                    </Flex>
                                </HStack>
                            </Box>
                        </Pressable>
                        
                        <Pressable
                            onPress={() => navigation.push(SCREEN_NAME_CONSTANTS.GROUP_PAYMENT_METHODS, { groupID: groupDetail._id })}>
                            <Box mt={2} mb={2} shadow={0}
                                 borderBottomLeftRadius={0}
                                 borderTopRightRadius={0}
                                 borderBottomRightRadius={16}
                                 borderTopLeftRadius={16}
                                 p={2}
                                 backgroundColor="primary.50">
                                <HStack>
                                    <Center
                                        backgroundColor="primary.100"
                                        borderRadius={100}
                                        size={50}>
                                        <Image
                                            alt="Payment Methods"
                                            source={savingsImage}
                                            objectPosition="center"
                                            resizeMode="cover"
                                            borderRadius={100}
                                            size={30}
                                        />
                                    </Center>
                                    <Flex flex={1} ml={2} justifyContent="center">
                                        <Text fontSize="md">Payment Methods</Text>
                                        <Text fontSize="xs">View Group Payment Methods</Text>
                                    </Flex>
                                    <Flex justifyContent="center">
                                        <Icon size="md" as={MaterialIcons} color="primary.600"
                                              name="chevron-right" />
                                    </Flex>
                                </HStack>
                            </Box>
                        </Pressable>
                        
                        <Pressable
                            onPress={() => navigation.push(SCREEN_NAME_CONSTANTS.GROUP_DISBURSEMENTS_SCREEN, { groupID: groupDetail._id })}>
                            <Box mt={2} mb={2} shadow={0} borderBottomLeftRadius={0}
                                 borderTopRightRadius={0}
                                 borderBottomRightRadius={16}
                                 borderTopLeftRadius={16}
                                 p={2}
                                 backgroundColor="primary.50">
                                <HStack>
                                    <Center
                                        backgroundColor="primary.100"
                                        borderRadius={100}
                                        size={50}>
                                        <Image
                                            alt="Disbursement Icon"
                                            source={disbursementOrderIcon}
                                            objectPosition="center"
                                            resizeMode="cover"
                                            borderRadius={100}
                                            size={30}
                                        />
                                    </Center>
                                    <Flex flex={1} ml={2} justifyContent="center">
                                        <Text fontSize="md">Disbursements</Text>
                                        <Text fontSize="xs">View Disbursement History</Text>
                                    </Flex>
                                    <Flex justifyContent="center">
                                        <Icon size="md" as={MaterialIcons} color="primary.600"
                                              name="chevron-right" />
                                    </Flex>
                                </HStack>
                            </Box>
                        </Pressable>
                        
                        <Pressable
                            onPress={() => navigation.push(SCREEN_NAME_CONSTANTS.GROUP_CONTRIBUTION_DETAIL_SCREEN, { groupID: groupDetail._id })}>
                            <Box mt={2} mb={2} shadow={0} borderBottomLeftRadius={0}
                                 borderTopRightRadius={0}
                                 borderBottomRightRadius={16}
                                 borderTopLeftRadius={16}
                                 p={2}
                                 backgroundColor="primary.50">
                                <HStack>
                                    <Center
                                        backgroundColor="primary.100"
                                        borderRadius={100}
                                        size={50}>
                                        <Image
                                            alt="Contribution Icon"
                                            source={contributionIcon}
                                            objectPosition="center"
                                            resizeMode="cover"
                                            borderRadius={100}
                                            size={30}
                                        />
                                    </Center>
                                    <Flex flex={1} ml={2} justifyContent="center">
                                        <Text fontSize="md">Contributions</Text>
                                        <Text fontSize="xs">View Contributions History</Text>
                                    </Flex>
                                    <Flex justifyContent="center">
                                        <Icon size="md" as={MaterialIcons} color="primary.600"
                                              name="chevron-right" />
                                    </Flex>
                                </HStack>
                            </Box>
                        </Pressable>
                        
                        <Pressable
                            onPress={() => navigation.push(SCREEN_NAME_CONSTANTS.GROUP_INVITATIONS_SCREEN, { groupID: groupDetail._id })}>
                            <Box mt={2} mb={2} shadow={0}
                                 borderBottomLeftRadius={0}
                                 borderTopRightRadius={0}
                                 borderBottomRightRadius={16}
                                 borderTopLeftRadius={16}
                                 p={2}
                                 backgroundColor="primary.50">
                                <HStack>
                                    <Center
                                        backgroundColor="primary.100"
                                        borderRadius={100}
                                        size={50}>
                                        <Image
                                            alt="Invitations"
                                            source={invitationsImage}
                                            objectPosition="center"
                                            resizeMode="cover"
                                            borderRadius={100}
                                            size={30}
                                        />
                                    </Center>
                                    <Flex flex={1} ml={2} justifyContent="center">
                                        <Text fontSize="md">Invitations</Text>
                                        <Text fontSize="xs">View Group Invitations</Text>
                                    </Flex>
                                    <Flex justifyContent="center">
                                        <Icon size="md" as={MaterialIcons} color="primary.600"
                                              name="chevron-right" />
                                    </Flex>
                                </HStack>
                            </Box>
                        </Pressable>
                    </Box>
                </Box>
            )}
        </ScrollView>
    );
};

export default GroupDetailScreen;
