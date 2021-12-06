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

const CreateGroupSummary = ({ navigation,  }) => {

    const {
        createGroupBasicInfo,
        createGroupRegulations,
        createGroupInvitations,
        createGroupPaymentMethod,
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
            <Box borderRadius={32} p={5} shadow={0} backgroundColor="white" m={2}>
                <Text textAlign="center" fontSize="xl">Group Summary</Text>

                <Divider width="100%" my={2} />

                <Text mb={1} fontSize="lg">Group Basic Info</Text>

                <Divider width="100%" my={2} />

                <Text mb={1} fontSize="sm">Name</Text>
                <Text mb={2} fontSize="md">{createGroupBasicInfo.name}</Text>

                <Divider width="100%" my={2} />

                <Text mb={1} fontSize="sm">Percentages</Text>
                <Box mt={2} mb={2}>
                    <Flex direction="row" width="100%" justifyContent="space-around">
                        <Box
                            flex={1}
                            alignItems="center"
                            p={4} mr={1}
                            flexGrow={1}
                            borderRadius={8}
                            backgroundColor="gray.50">
                            <Flex
                                flex={1}
                                justifyContent="center"
                                alignItems="center"
                                backgroundColor="primary.100"
                                borderRadius={8}
                                size={50}>
                                <Image size={30} alt="Savings image" source={savingsImage} />
                            </Flex>

                            <Text
                                textAlign="center"
                                fontFamily="body"
                                fontSize="xl">
                                {createGroupBasicInfo.susuPercentage}%
                            </Text>
                            <Text
                                textAlign="center"
                                fontFamily="body"
                                fontSize="md">
                                Susu
                            </Text>
                        </Box>

                        <Box flex={1} p={4} ml={1} alignItems="center" flexGrow={1} borderRadius={8}
                             backgroundColor="gray.50">
                            <Flex
                                flex={1}
                                justifyContent="center"
                                alignItems="center"
                                backgroundColor="primary.100"
                                borderRadius={8}
                                size={50}>
                                <Image size={30} alt="Investment image" source={investmentImage} />
                            </Flex>
                            <Text
                                textAlign="center"
                                fontFamily="body"
                                fontSize="xl">
                                {createGroupBasicInfo.investmentPercentage}%
                            </Text>
                            <Text
                                textAlign="center"
                                fontFamily="body"
                                fontSize="md">
                                Investment
                            </Text>
                        </Box>
                    </Flex>
                </Box>

                <Divider width="100%" my={2} />

                <Text mb={1} fontSize="sm">Description</Text>
                <Text mb={2} fontSize="md">{createGroupBasicInfo.description}</Text>

                <Divider width="100%" my={2} />

                <Text mb={1} fontSize="sm">Group Regulations</Text>
                <Box>
                    <FlatList
                        data={createGroupRegulations}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => {
                            return (
                                <SingleRegulationListItem
                                    regulation={item}
                                    index={index}
                                    showDelete={false}
                                />
                            );
                        }} />
                </Box>

                <Divider width="100%" my={2} />


                <Text mb={1} fontSize="sm">Group Invitations</Text>
                <Box>
                    <FlatList
                        data={createGroupInvitations}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => {
                            return (
                                <SingleInvitationListItem
                                    email={item}
                                    index={index}
                                    showDelete={false}
                                />
                            );
                        }} />
                </Box>

                <Divider width="100%" my={2} />

                <Text mb={1} fontSize="sm">Group Invitations</Text>
                <Box>
                    <PaymentMethodCard paymentMethod={createGroupPaymentMethod} />
                </Box>

                <Button
                    mt={2}
                    backgroundColor="primary.600"
                    py={2}
                    borderRadius={32}
                    onPress={() => dispatch(GROUP_ACTION_CREATORS.groupGoToPreviousPage())}
                    variant="subtle">
                    <Text color="white" fontSize="md">Previous</Text>
                </Button>

                <Button
                    mt={2}
                    backgroundColor="primary.700"
                    py={3}
                    borderRadius={32}
                    onPress={handleCreateGroup}
                    variant="subtle">
                    <Text color="white" fontSize="md">Create Group</Text>
                </Button>
            </Box>

        </ScrollView>
    );
};

export default CreateGroupSummary;
