import React, { useEffect } from "react";
import { Center, Fab, FlatList, Flex, Icon, Spinner } from "native-base";
import { useDispatch, useSelector } from "react-redux";
import Empty from "../../components/empty";
import Group from "../../components/group";
import { selectGroupMembers } from "../../redux/group-members/group-members-reducers";
import { GROUP_MEMBERS_ACTION_CREATORS } from "../../redux/group-members/group-members-action-creators";
import { selectAuth } from "../../redux/auth/auth-reducer";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { SCREEN_NAME_CONSTANTS } from "../../constants/constants";

const GroupsScreen = ({ navigation }) => {
    const { groupMemberLoading, groupsOfUser } = useSelector(selectGroupMembers);
    
    const dispatch = useDispatch();
    
    const { userData, authToken } = useSelector(selectAuth);
    
    useEffect(() => {
        dispatch(GROUP_MEMBERS_ACTION_CREATORS.getGroupsOfUser(authToken, userData._id));
    }, []);
    
    return (
        <Flex position="relative" height="100%" width="100%" backgroundColor="gray.100">
            {groupMemberLoading &&
            <Center width="100%" height="100%">
                <Spinner
                    position="absolute"
                    size={50}
                    color="primary.800"
                />
            </Center>}
            
            <Fab
                borderRadius="full"
                backgroundColor="primary.800"
                placement="bottom-right"
                position="absolute"
                onPress={() => {
                    navigation.push(SCREEN_NAME_CONSTANTS.CREATE_GROUP_SCREEN);
                }}
                right={5}
                bottom={20}
                icon={<Icon as={<MaterialIcons size={10} name="add" />} />}
            />
            
            {groupsOfUser && groupsOfUser.length === 0 ? (
                <Flex
                    backgroundColor="white"
                    width="100%"
                    height="100%"
                    justifyContent="center"
                    alignItems="center">
                    <Empty description="You belong to no groups" title="User Groups" />
                </Flex>
            ) : (
                <FlatList
                    refreshing={groupMemberLoading}
                    onRefresh={() => dispatch(GROUP_MEMBERS_ACTION_CREATORS.getGroupsOfUser(authToken, userData._id))}
                    data={groupsOfUser}
                    renderItem={(group) => <Group navigation={navigation} group={group.item.group} />}
                    keyExtractor={(group) => group._id}
                />
            )}
        </Flex>
    );
};

export default GroupsScreen;
