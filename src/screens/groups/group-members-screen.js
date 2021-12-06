import React, { useEffect } from "react";
import { Alert, Spinner, FlatList, Flex, Center, VStack, Text } from "native-base";
import { useDispatch, useSelector } from "react-redux";
import Empty from "../../components/empty";
import GroupMember from "../../components/group-member";
import { selectGroupMembers } from "../../redux/group-members/group-members-reducers";
import { GROUP_MEMBERS_ACTION_CREATORS } from "../../redux/group-members/group-members-action-creators";
import { selectAuth } from "../../redux/auth/auth-reducer";

const GroupMembersScreen = ({navigation, route}) => {
    const { groupMemberLoading, groupMemberError, groupMembers } = useSelector(selectGroupMembers);

    const dispatch = useDispatch();
    const {authToken} = useSelector(selectAuth);

    const {groupID} = route.params;

    useEffect(() => {
        dispatch(GROUP_MEMBERS_ACTION_CREATORS.getGroupMembers(authToken, groupID));
    }, []);

    return (
        <Flex position="relative" height="100%" width="100%" backgroundColor="gray.100">
            {groupMemberLoading &&
            <Center width="100%" height="100%">
                <Spinner
                    position="absolute"
                    width="50%"
                    height="50%"
                    size="lg"
                    color="secondary.500"
                />
            </Center>}

            {groupMemberError && (
                <Alert p={3} width="100%" status="error" borderRadius={32} variant="left-accent">
                    <VStack alignItems="center" width="100%" space={2}>
                        <Alert.Icon size="lg" />
                        <Text color="red.600" textAlign="center" fontSize="lg">Error</Text>
                        <Text fontSize="md" color="red.600">{groupMemberError}</Text>
                    </VStack>
                </Alert>
            )}

            {groupMembers && groupMembers.length === 0 ? (
                <Flex backgroundColor="white" width="100%" height="100%" justifyContent="center" alignItems="center">
                    <Empty description="There are no group members" title="Group Members" />
                </Flex>
            ) : (
                <FlatList
                    height="100%"
                    data={groupMembers}
                    renderItem={(member) => <GroupMember navigation={navigation} member={member.item} />}
                    keyExtractor={(member) => member._id}
                />
            )}
        </Flex>
    );
};

export default GroupMembersScreen;
