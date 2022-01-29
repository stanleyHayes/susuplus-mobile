import React, { useEffect } from "react";
import { Center, FlatList, Flex, Icon, IconButton, Spinner, StatusBar } from "native-base";
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
            <StatusBar backgroundColor="#155e75" />
            {groupMemberLoading &&
            <Center width="100%" height="100%">
                <Spinner
                    position="absolute"
                    size={50}
                    color="primary.800"
                />
            </Center>}
            
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
            
            <IconButton
                icon={<Icon color="primary.800" as={MaterialIcons} name="add" />}
                borderRadius="full"
                variant="solid"
                placement="bottom-right"
                position="absolute"
                borderWidth={2}
                borderColor="primary.600"
                shadow={8}
                onPress={() => {
                    navigation.push(SCREEN_NAME_CONSTANTS.CREATE_GROUP_SCREEN);
                }}
                size="md"
                right={5}
                bottom={15}
            />
            
        </Flex>
    );
};

export default GroupsScreen;
