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
    
    const { createSusuBasicInfo, createSusuMembers, createSusuRegulations, susuLoading } = useSelector(selectSusu);
    
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
                <Text textAlign="center" fontSize="md" color="muted.500">Susu Summary</Text>
                
                <Divider width="100%" my={2} />
                
                <Text mb={1} fontSize="sm" color="muted.400">Susu Basic Info</Text>
                
                <Divider width="100%" my={2} />
                
                <Text mb={1} fontSize="xs" color="muted.400">Group Name</Text>
                
                <Text mb={2} fontSize="sm" color="muted.500">{groupDetail.name}</Text>
                
                <Divider width="100%" my={2} />
                
                <Box>
                    <Box mb={2}>
                        <Text mb={1} fontSize="xs" color="muted.400">Payment Plan</Text>
                        <Text fontSize="sm" color="muted.500">
                            {`${createSusuBasicInfo.paymentAmount} ${createSusuBasicInfo.paymentCurrency}`}
                        </Text>
                    </Box>
                    
                    <Divider width="100%" my={2} />
                    
                    <Box>
                        <Text fontSize="xs" color="muted.400" mb={1}>Contribution Plan</Text>
                        <Text fontSize="sm" color="muted.500">
                            {`${createSusuBasicInfo.intervalAmount} ${createSusuBasicInfo.intervalUnit}`}
                        </Text>
                    </Box>
                    
                    <Divider width="100%" my={2} />
                    
                    <Box mb={4}>
                        <Text mb={1} fontSize="xs" color="muted.400">Start Date</Text>
                        
                        <Text fontSize="sm" color="muted.500">{moment(createSusuBasicInfo.startDate).format("dddd, Do MMM YYYY")}</Text>
                    
                    </Box>
                 </Box>
                
                <Divider width="100%" my={2} />
                
                <Box>
                    <Text mb={1} fontSize="xs" color="muted.400">Group Regulations</Text>
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
                    <Text mb={1} fontSize="xs" color="muted.400">Susu Members</Text>
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
                    py={3}
                    borderBottomLeftRadius={0}
                    borderTopRightRadius={0}
                    borderBottomRightRadius={16}
                    borderTopLeftRadius={16}
                    isLoading={susuLoading}
                    isDisabled={susuLoading}
                    isLoadingText="Creating Susu..."
                    onPress={handleCreateSusu}
                    _text={{color: 'white', fontSize: 'xs'}}
                    variant="solid">
                    Create Susu
                </Button>
            </Box>
        
            <Box px={4} mt={3} flexDirection="row">
                <Button
                    mt={2}
                    flexGrow={1}
                    borderColor="primary.600"
                    borderWidth={1}
                    backgroundColor="white"
                    py={3}
                    mr={2}
                    borderBottomLeftRadius={0}
                    borderTopRightRadius={0}
                    borderBottomRightRadius={16}
                    borderTopLeftRadius={16}
                    _text={{color: 'primary.600', fontSize: 'xs'}}
                    onPress={() => dispatch(SUSU_ACTION_CREATORS.susuGoToPreviousPage())}
                    variant="subtle">
                    Previous
                </Button>
                <Button
                    mt={2}
                    backgroundColor="red.600"
                    py={3}
                    flexGrow={1}
                    borderBottomLeftRadius={0}
                    borderTopRightRadius={0}
                    borderBottomRightRadius={16}
                    borderTopLeftRadius={16}
                    _text={{color: 'white', fontSize: 'xs'}}
                    onPress={() => dispatch(SUSU_ACTION_CREATORS.cancelSusuCreation(navigation))}
                    variant="subtle">
                    Cancel
                </Button>
            </Box>
        </ScrollView>
    );
};

export default CreateSusuSummary;
