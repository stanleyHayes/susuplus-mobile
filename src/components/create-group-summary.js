import React from "react";
import { Box, Button, Divider, FlatList, Flex, Image, ScrollView, Text } from "native-base";
import { useDispatch, useSelector } from "react-redux";
import { selectGroups } from "../redux/groups/group-reducers";
import savingsImage from "../assets/images/savings64px.png";
import investmentImage from "../assets/images/investment64px.png";
import SingleRegulationListItem from "./single-regulation-list-item";
import SingleInvitationListItem from "./single-invitation-item";
import PaymentMethodCard from "./payment-method-card";
import { GROUP_ACTION_CREATORS } from "../redux/groups/group-action-creators";
import { selectAuth } from "../redux/auth/auth-reducer";
import UserGroupContactInvitation from "./user-group-contact-invitation";

const CreateGroupSummary = ({ navigation,  }) => {

    const {
        createGroupBasicInfo,
        createGroupRegulations,
        createGroupInvitations,
        createGroupPaymentMethod,
        groupLoading
    } = useSelector(selectGroups);

    const { authToken } = useSelector(selectAuth);

    const dispatch = useDispatch();

    const handleCreateGroup = () => {
        dispatch(GROUP_ACTION_CREATORS.createGroup(
            authToken,
            {
                basicInfo: {...createGroupBasicInfo},
                regulations: [...createGroupRegulations],
                invitations: [...createGroupInvitations],
                paymentMethod: {...createGroupPaymentMethod}
            },
            navigation));
    };

    return (
        <ScrollView flex={1} minHeight="100%">
            <Box
                borderBottomLeftRadius={0}
                  borderTopRightRadius={0}
                  borderBottomRightRadius={16}
                  borderTopLeftRadius={16} p={5} shadow={0} backgroundColor="white" m={2}>
                <Text textAlign="center" fontSize="sm" color="muted.500">Group Summary</Text>

                <Divider width="100%" my={2} />

                <Text mb={1} fontSize="xs" color="muted.400">Group Basic Info</Text>

                <Divider width="100%" my={2} />

                <Text mb={1} fontSize="xs" color="muted.400">Name</Text>
                <Text mb={2} fontSize="md">{createGroupBasicInfo.name}</Text>

                <Divider width="100%" my={2} />

                <Text mb={1} fontSize="sm" color="muted.400">Percentages</Text>
                <Box mt={2} mb={2}>
                    <Flex direction="row" width="100%" justifyContent="space-around">
                        <Box
                            flex={1}
                            alignItems="center"
                            p={4} mr={1}
                            flexGrow={1}
                            borderBottomLeftRadius={0}
                            borderTopRightRadius={0}
                            borderBottomRightRadius={16}
                            borderTopLeftRadius={16}
                            backgroundColor="gray.50">
                            <Flex
                                flex={1}
                                justifyContent="center"
                                alignItems="center"
                                backgroundColor="primary.100"
                                borderBottomLeftRadius={0}
                                borderTopRightRadius={0}
                                borderBottomRightRadius={16}
                                borderTopLeftRadius={16}
                                size={50}>
                                <Image size={30} alt="Savings image" source={savingsImage} />
                            </Flex>

                            <Text
                                textAlign="center"
                                fontFamily="body"
                                fontSize="md">
                                {createGroupBasicInfo.susuPercentage}%
                            </Text>
                            <Text
                                textAlign="center"
                                fontFamily="body"
                                color="muted.500"
                                fontSize="sm">
                                Susu
                            </Text>
                        </Box>

                        <Box flex={1}
                             p={4}
                             ml={1}
                             alignItems="center"
                             flexGrow={1}
                             borderBottomLeftRadius={0}
                             borderTopRightRadius={0}
                             borderBottomRightRadius={16}
                             borderTopLeftRadius={16}
                             backgroundColor="gray.50">
                            <Flex
                                flex={1}
                                justifyContent="center"
                                alignItems="center"
                                backgroundColor="primary.100"
                                borderBottomLeftRadius={0}
                                borderTopRightRadius={0}
                                borderBottomRightRadius={16}
                                borderTopLeftRadius={16}
                                size={50}>
                                <Image size={30} alt="Investment image" source={investmentImage} />
                            </Flex>
                            <Text
                                textAlign="center"
                                fontFamily="body"
                                color="muted.500"
                                fontSize="md">
                                {createGroupBasicInfo.investmentPercentage}%
                            </Text>
                            <Text
                                textAlign="center"
                                fontFamily="body"
                                color="muted.500"
                                fontSize="sm">
                                Investment
                            </Text>
                        </Box>
                    </Flex>
                </Box>

                <Divider width="100%" my={2} />

                <Text mb={1} fontSize="xs" color="muted.400">Description</Text>
                <Text mb={2} fontSize="sm" color="muted.500">{createGroupBasicInfo.description}</Text>

                <Divider width="100%" my={2} />

                <Text mb={1} fontSize="xs" color="muted.400">Group Regulations</Text>
                <Box>
                    {createGroupRegulations && createGroupRegulations.map((instruction, index) => {
                        return (
                            <SingleRegulationListItem
                                key={index}
                                regulation={instruction}
                                index={index}
                                showDelete={false}
                            />
                        )
                    })}
                </Box>

                <Divider width="100%" my={2} />

                <Text mb={1} fontSize="xs" color="muted.400">Group Invitations</Text>
                
                <Box>
                    {createGroupInvitations && createGroupInvitations.map((invitation, index) => {
                        return (
                            <UserGroupContactInvitation
                                key={index}
                                showDelete={false}
                                contact={invitation}
                            />
                        )
                    })}
                </Box>

                <Divider width="100%" my={2} />

                <Text mb={1} fontSize="xs" color="muted.400">Group Payment Method</Text>
                <Box>
                    <PaymentMethodCard paymentMethod={createGroupPaymentMethod} />
                </Box>

                <Button
                    borderBottomLeftRadius={0}
                    borderTopRightRadius={0}
                    borderBottomRightRadius={16}
                    borderTopLeftRadius={16}
                    mt={2}
                    backgroundColor="primary.600"
                    py={3}
                    _text={{color: 'white', fontSize: 'xs'}}
                    isLoading={groupLoading}
                    isLoadingText="Creating Group..."
                    onPress={handleCreateGroup}
                    isDisabled={groupLoading}
                    variant="solid">
                    Create Group
                </Button>
            </Box>
    
            <Box p={5}>
                <Button
                    mt={2}
                    borderBottomLeftRadius={0}
                    borderTopRightRadius={0}
                    borderBottomRightRadius={16}
                    borderTopLeftRadius={16}
                    backgroundColor="primary.600"
                    py={3}
                    _text={{color: 'white', fontSize: 'xs'}}
                    onPress={() => dispatch(GROUP_ACTION_CREATORS.groupGoToPreviousPage())}
                    variant="subtle">
                    Previous
                </Button>
            </Box>
        </ScrollView>
    );
};

export default CreateGroupSummary;
