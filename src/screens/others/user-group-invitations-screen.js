import React, { useEffect } from "react";
import { Center, FlatList, Flex, Spinner } from "native-base";
import { useDispatch, useSelector } from "react-redux";
import Empty from "../../components/empty";
import { selectInvites } from "../../redux/invites/group-invites-reducers";
import GroupInvite from "../../components/group-invite";
import { INVITATION_ACTION_CREATORS } from "../../redux/invites/group-invites-action-creators";
import { selectAuth } from "../../redux/auth/auth-reducer";
import NavigationBar from "react-native-navbar-color";

const UserGroupInvitationsScreen = ({ navigation }) => {
    const { inviteLoading, inviteError, invites } = useSelector(selectInvites);
    const { authToken, userData } = useSelector(selectAuth);
    
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(INVITATION_ACTION_CREATORS.getInvitations(authToken, `invitee=${userData._id}`));
    }, []);
    
    useEffect(() => {
        NavigationBar.setColor('#155e75');
    }, []);
    return (
        <Flex position="relative" height="100%" width="100%" backgroundColor="gray.100">
            {inviteLoading &&
            <Center width="100%" height="100%">
                <Spinner
                    size={50}
                    color="primary.800"
                />
            </Center>}
            
            {invites && invites.length === 0 ? (
                <Flex backgroundColor="white" width="100%" height="100%" justifyContent="center" alignItems="center">
                    <Empty description="You have no group invites" title="Group Invites" />
                </Flex>
            ) : (
                <FlatList
                    refreshing={inviteLoading}
                    onRefresh={() => dispatch(INVITATION_ACTION_CREATORS.getInvitations(authToken, `invitee=${userData._id}`))}
                    data={invites}
                    renderItem={(groupInvite) => <GroupInvite showButtons={true} navigation={navigation}
                                                              groupInvite={groupInvite.item} />}
                    keyExtractor={(groupInvite) => groupInvite._id}
                />
            )}
        </Flex>
    );
};

export default UserGroupInvitationsScreen;
