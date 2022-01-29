import React, { useEffect, useState } from "react";
import { Box, Button, Divider, ScrollView, Text } from "native-base";
import { useDispatch, useSelector } from "react-redux";
import { selectGroupMembers } from "../../redux/group-members/group-members-reducers";
import { GROUP_MEMBERS_ACTION_CREATORS } from "../../redux/group-members/group-members-action-creators";
import { selectAuth } from "../../redux/auth/auth-reducer";
import { selectSusuGroupMembers } from "../../redux/susu-members/susu-members-reducers";
import { SUSU_MEMBERS_ACTION_CREATORS } from "../../redux/susu-members/susu-members-action-creators";
import SusuMemberListItem from "../../components/susu-member-list-item";
import Empty from "../../components/empty";
import { SUSU_ACTION_CREATORS } from "../../redux/susu/susu-action-creators";
import { selectSusu } from "../../redux/susu/susu-reducer";
import NavigationBar from "react-native-navbar-color";

const AddSusuMembersScreen = ({ navigation, route }) => {
    
    const { susuID } = route.params;
    const { groupMembers } = useSelector(selectGroupMembers);
    const { susuDetail } = useSelector(selectSusu);
    const { susuMembers } = useSelector(selectSusuGroupMembers);
    const { authToken } = useSelector(selectAuth);
    
    const [membersToAdd, setMembersToAdd] = useState([]);
    const [addedMembers, setAddedMembers] = useState([]);
    const [error, setError] = useState({});
    
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(SUSU_MEMBERS_ACTION_CREATORS.getSusuGroupMembers(authToken, susuID));
    }, []);
    
    useEffect(() => {
        if (susuDetail) {
            dispatch(GROUP_MEMBERS_ACTION_CREATORS.getGroupMembers(authToken, susuDetail.group._id));
        }
    }, []);
    
    
    useEffect(() => {
        dispatch(SUSU_ACTION_CREATORS.getSusuGroup(authToken, susuID));
    }, []);
    
    
    useEffect(() => {
        if (susuMembers && groupMembers) {
            const members = susuMembers.map(member => member.user);
            setMembersToAdd(groupMembers.filter(member => !members.includes(member.user._id)));
        }
    }, []);
    
    const addMember = m => {
        
        if (addedMembers.findIndex(
            member => member.user.email.toLowerCase() === m.user.email.toLowerCase()) !== -1) {
            setError({ error, member: "Member already added" });
            return;
        }
        setAddedMembers([...addedMembers, m]);
    };
    
    const removeMember = i => {
        setAddedMembers(addedMembers.filter((member, index) => i !== index));
    };
    
    const handleAddMembers = () => {
        if (addedMembers && addedMembers.length > 0) {
            const members = addedMembers.map(member => member.user._id);
            dispatch(
                SUSU_MEMBERS_ACTION_CREATORS.addSusuMembers(authToken, {
                    susuID,
                    groupID: susuDetail.group._id,
                    users: [...members],
                }, navigation));
        }
    };
    
    useEffect(() => {
        NavigationBar.setColor('#155e75');
    }, []);
    
    return (
        <ScrollView flex={1}>
            <Box borderRadius={32} p={5} shadow={0} backgroundColor="white" m={2}>
                <Text textAlign="center" fontSize="md">Members to Add</Text>
                <Divider width="100%" my={2} />
                <Box>
                    {membersToAdd && membersToAdd.length === 0 ? (
                        <Box>
                            <Empty description="No members to add" title="Members to Add" />
                        </Box>
                    ) : (
                        membersToAdd && membersToAdd.map((member, index) => {
                            return (
                                <SusuMemberListItem
                                    member={member}
                                    key={index}
                                    showMessage={true}
                                    index={index}
                                    showDelete={false}
                                    addMember={addMember}
                                    removeMember={removeMember}
                                />
                            );
                        })
                    )}
                </Box>
            </Box>
            
            
            <Box borderRadius={32} p={5} shadow={0} backgroundColor="white" m={2}>
                <Text textAlign="center" fontSize="md">Added Members ({addedMembers.length})</Text>
                <Divider width="100%" my={2} />
                <Box>
                    {addedMembers && addedMembers.length === 0 ? (
                        <Box>
                            <Empty
                                description="No members added"
                                title="Added Members" />
                        </Box>
                    ) : addedMembers && addedMembers.map((member, index) => {
                        return (
                            <SusuMemberListItem
                                key={index}
                                member={member}
                                showMessage={false}
                                index={index}
                                showDelete={true}
                                addMember={addMember}
                                removeMember={removeMember}
                            />
                        );
                    })}
                </Box>
                
                
                {addedMembers && addedMembers.length > 0 && (
                    <Button
                        onPress={handleAddMembers}
                        borderRadius={32}
                        mt={4}
                        backgroundColor="primary.600"
                        py={3}
                        variant="solid"
                        size="md"
                        width="100%">
                        <Text fontSize="md" color="white">Add Members</Text>
                    </Button>
                )}
            </Box>
        </ScrollView>
    );
};

export default AddSusuMembersScreen;
