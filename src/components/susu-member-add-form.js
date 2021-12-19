import React, { useEffect, useState } from "react";
import { Box, Button, Divider, ScrollView, Text } from "native-base";
import { useDispatch, useSelector } from "react-redux";
import { selectSusu } from "../redux/susu/susu-reducer";
import { SUSU_ACTION_CREATORS } from "../redux/susu/susu-action-creators";
import { GROUP_MEMBERS_ACTION_CREATORS } from "../redux/group-members/group-members-action-creators";
import SusuMemberListItem from "./susu-member-list-item";
import { selectAuth } from "../redux/auth/auth-reducer";
import { selectGroupMembers } from "../redux/group-members/group-members-reducers";
import Empty from "./empty";

const AddSusuMembersForm = ({ groupDetail }) => {
    
    const { createSusuMembers } = useSelector(selectSusu);
    const { groupMembers } = useSelector(selectGroupMembers);
    
    const { authToken } = useSelector(selectAuth);
    
    const [selectedSusuMembers, setSelectedSusuMembers] = useState([...createSusuMembers]);
    
    const [error, setError] = useState({});
    
    const addMember = m => {
        
        if (selectedSusuMembers.findIndex(
            member => member.user.email.toLowerCase() === m.user.email.toLowerCase()) !== -1) {
            setError({ error, member: "Member already added" });
            return;
        }
        setSelectedSusuMembers([...selectedSusuMembers, m]);
    };
    
    const removeMember = i => {
        setSelectedSusuMembers(selectedSusuMembers.filter((member, index) => i !== index));
    };
    
    const dispatch = useDispatch();
    
    const handleGroupMembersSubmit = () => {
        if (selectedSusuMembers.length <= 0) {
            setError({ error, members: "Add at least one member" });
            return;
        } else {
            setError({ error, members: null });
        }
        dispatch(SUSU_ACTION_CREATORS.saveSusuMembers(selectedSusuMembers));
        dispatch(SUSU_ACTION_CREATORS.susuGoToNextPage());
    };
    
    
    useEffect(() => {
        dispatch(GROUP_MEMBERS_ACTION_CREATORS.getGroupMembers(authToken, groupDetail._id));
    }, []);
    
    
    return (
        <ScrollView flex={1} minHeight="100%">
            <Box borderRadius={32} p={5} shadow={0} backgroundColor="white" m={2}>
                <Text textAlign="center" fontSize="md">Group Members</Text>
                
                <Divider width="100%" my={2} />
                
                <Box>
                    {groupMembers && groupMembers.length === 0 ? (
                        <Box>
                            <Empty description="No group members" title="Group Members" />
                        </Box>
                    ) : (
                        groupMembers && groupMembers.map((member, index) => {
                            return (
                                <SusuMemberListItem
                                    showMessage={true}
                                    key={index}
                                    member={member}
                                    index={index}
                                    showDelete={true}
                                    removeMember={removeMember}
                                    addMember={addMember}
                                />
                            );
                        })
                    )}
                </Box>
            </Box>
            
            <Box borderRadius={32} p={4} shadow={0} backgroundColor="white" m={2}>
                <Text
                    textAlign="center"
                    fontSize="md">
                    Selected Group Members ({selectedSusuMembers.length})
                </Text>
                
                <Divider width="100%" my={2} />
                
                <Box>
                    {selectedSusuMembers && selectedSusuMembers.length === 0 ? (
                        <Box>
                            <Empty description="No susu members" title="Susu Members" />
                        </Box>
                    ) : (
                        selectedSusuMembers && selectedSusuMembers.map((member, index) => {
                            return (
                                <SusuMemberListItem
                                    key={index}
                                    member={member}
                                    index={index}
                                    showDelete={true}
                                    removeMember={removeMember}
                                />
                            );
                        })
                    )}
                </Box>
            </Box>
            
            <Box borderRadius={32} p={4} shadow={0} backgroundColor="white" m={2}>
                <Button
                    mt={2}
                    backgroundColor="primary.600"
                    py={2}
                    borderRadius={32}
                    onPress={() => dispatch(SUSU_ACTION_CREATORS.susuGoToPreviousPage())}
                    variant="subtle">
                    <Text color="white" fontSize="md">Previous</Text>
                </Button>
                
                {selectedSusuMembers.length > 0 && (
                    <Button
                        mt={2}
                        backgroundColor="primary.600"
                        py={2}
                        borderRadius={32}
                        onPress={handleGroupMembersSubmit}
                        variant="subtle">
                        <Text color="white" fontSize="md">Save Members</Text>
                    </Button>
                )}
            </Box>
        </ScrollView>
    );
};

export default AddSusuMembersForm;
