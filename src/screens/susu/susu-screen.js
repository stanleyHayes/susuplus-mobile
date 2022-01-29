import React, { useEffect } from "react";
import { Center, FlatList, Flex, Spinner } from "native-base";
import { useDispatch, useSelector } from "react-redux";
import Empty from "../../components/empty";
import Susu from "../../components/susu";
import { selectSusuGroupMembers } from "../../redux/susu-members/susu-members-reducers";
import { SUSU_MEMBERS_ACTION_CREATORS } from "../../redux/susu-members/susu-members-action-creators";
import { selectAuth } from "../../redux/auth/auth-reducer";
import NavigationBar from "react-native-navbar-color";

const SusuScreen = ({ navigation }) => {
    const { susuMemberLoading, susuGroupsOfUser } = useSelector(selectSusuGroupMembers);
    const { authToken, userData } = useSelector(selectAuth);
    
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(SUSU_MEMBERS_ACTION_CREATORS.getGroupsOfUser(authToken, userData._id));
    }, []);
    
    useEffect(() => {
        NavigationBar.setColor('#155e75');
    }, []);
    
    return (
        <Flex position="relative" height="100%" width="100%" py={2} backgroundColor="gray.100">
            {susuMemberLoading &&
            <Center width="100%" height="100%">
                <Spinner
                    size={50}
                    color="primary.800"
                />
            </Center>}
            
            {susuGroupsOfUser && susuGroupsOfUser.length === 0 ? (
                <Flex
                    backgroundColor="white"
                    width="100%" height="100%"
                    justifyContent="center"
                    alignItems="center">
                    <Empty description="You belong to no susu groups" title="Susu Groups" />
                </Flex>
            ) : (
                <FlatList
                    refreshing={susuMemberLoading}
                    onRefresh={() => dispatch(SUSU_MEMBERS_ACTION_CREATORS.getGroupsOfUser(authToken, userData._id))}
                    data={susuGroupsOfUser}
                    renderItem={(susu) => <Susu navigation={navigation} susu={susu.item.susu}
                                                group={susu.item.group} />}
                    keyExtractor={(susu) => susu._id}
                />
            )}
        </Flex>
    );
};

export default SusuScreen;
