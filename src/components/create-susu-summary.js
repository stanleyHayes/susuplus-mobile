import React from "react";
import { Box, Button, Divider, ScrollView, Text } from "native-base";
import { useDispatch, useSelector } from "react-redux";
import SingleRegulationListItem from "./single-regulation-list-item";
import { selectAuth } from "../redux/auth/auth-reducer";
import { selectSusu } from "../redux/susu/susu-reducer";
import { SUSU_ACTION_CREATORS } from "../redux/susu/susu-action-creators";
import moment from "moment";
import SusuMemberListItem from "./susu-member-list-item";

const CreateSusuSummary = ({ navigation, groupDetail }) => {
    
    const { createSusuBasicInfo, createSusuMembers, createSusuRegulations } = useSelector(selectSusu);
    
    const { authToken, userData } = useSelector(selectAuth);
    
    const dispatch = useDispatch();
    
    const handleCreateSusu = () => {
        dispatch(SUSU_ACTION_CREATORS.createSusu(
            authToken,
            {
                ...createSusuBasicInfo,
                regulations: [...createSusuRegulations],
                members: [...createSusuMembers.map(member => member.user._id)],
                group: groupDetail._id,
            },
            userData._id,
            navigation));
    };
    
    return (
        <ScrollView flex={1} minHeight="100%">
            <Box borderBottomLeftRadius={0}
                 borderTopRightRadius={0}
                 borderBottomRightRadius={16}
                 borderTopLeftRadius={16} p={5} shadow={0} backgroundColor="white" m={2}>
                <Text textAlign="center" fontSize="xl">Susu Summary</Text>
                
                <Divider width="100%" my={2} />
                
                <Text mb={1} fontSize="lg">Susu Basic Info</Text>
                
                <Divider width="100%" my={2} />
                
                <Text mb={1} fontSize="sm">Group Name</Text>
                
                <Text mb={2} fontSize="md">{groupDetail.name}</Text>
                
                <Divider width="100%" my={2} />
                
                <Box>
                    <Box mb={2}>
                        <Text mb={1}>Payment Plan</Text>
                        <Text fontSize="md">
                            {`${createSusuBasicInfo.paymentAmount} ${createSusuBasicInfo.paymentCurrency}`}
                        </Text>
                    </Box>
                    
                    <Divider width="100%" my={2} />
                    
                    <Box>
                        <Text mb={1}>Contribution Plan</Text>
                        <Text fontSize="md">
                            {`${createSusuBasicInfo.intervalAmount} ${createSusuBasicInfo.intervalUnit}`}
                        </Text>
                    </Box>
                    
                    <Divider width="100%" my={2} />
                    
                    <Box mb={4}>
                        <Text mb={1}>Start Date</Text>
                        
                        <Text fontSize="md">{moment(createSusuBasicInfo.startDate).format("dddd, Do MMM YYYY")}</Text>
                    
                    </Box>
                 </Box>
                
                <Divider width="100%" my={2} />
                
                <Box>
                    <Text mb={1} fontSize="sm">Group Regulations</Text>
                    <Box>
                        {createSusuRegulations.map((regulation, index) => {
                            return (
                                <SingleRegulationListItem
                                    key={index}
                                    regulation={regulation}
                                    showDelete={false}
                                    index={index}
                                />
                            );
                        })}
                    </Box>
                </Box>
                
                <Divider width="100%" my={2} />
                
                <Box>
                    <Text mb={1} fontSize="sm">Susu Members</Text>
                    <Box>
                        {createSusuMembers.map((member, index) => {
                            return (
                                <SusuMemberListItem
                                    key={index}
                                    showMessage={false}
                                    showDelete={false}
                                    index={index}
                                    member={member}
                                />
                            );
                        })}
                    </Box>
                </Box>
                
                <Divider width="100%" my={2} />
                
                <Button
                    mt={2}
                    backgroundColor="primary.600"
                    py={2}
                    borderRadius={32}
                    onPress={() => dispatch(SUSU_ACTION_CREATORS.susuGoToPreviousPage())}
                    variant="subtle">
                    <Text color="white" fontSize="md">Previous</Text>
                </Button>
                
                <Button
                    mt={2}
                    backgroundColor="primary.700"
                    py={3}
                    borderRadius={32}
                    onPress={handleCreateSusu}
                    variant="subtle">
                    <Text color="white" fontSize="md">Create Susu</Text>
                
                </Button>
            </Box>
        
        </ScrollView>
    );
};

export default CreateSusuSummary;
