import React, { useEffect } from "react";
import { Center, FlatList, Flex, Spinner } from "native-base";
import { useDispatch, useSelector } from "react-redux";
import Empty from "../../components/empty";
import { selectSusuGroupMembers } from "../../redux/susu-members/susu-members-reducers";
import SusuMember from "../../components/susu-member";
import { SUSU_MEMBERS_ACTION_CREATORS } from "../../redux/susu-members/susu-members-action-creators";
import { selectAuth } from "../../redux/auth/auth-reducer";
import NavigationBar from "react-native-navbar-color";

const SusuMembersScreen = ({ navigation, route }) => {
    const { susuMemberLoading, susuMembers } = useSelector(selectSusuGroupMembers);
    const { authToken } = useSelector(selectAuth);
    
    const { susuID } = route.params;
    
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(SUSU_MEMBERS_ACTION_CREATORS.getSusuGroupMembers(authToken, susuID));
    }, []);
    
    useEffect(() => {
        NavigationBar.setColor('#155e75');
    }, []);
    
    return (
        <Flex position="relative" height="100%" width="100%" backgroundColor="gray.100">
            {susuMemberLoading &&
            <Center width="100%" height="100%">
                <Spinner
                    position="absolute"
                    width="50%"
                    height="50%"
                    size="lg"
                    color="secondary.500"
                />
            </Center>}
            
            {susuMembers && susuMembers.length === 0 ? (
                <Flex backgroundColor="white" width="100%" height="100%" justifyContent="center" alignItems="center">
                    <Empty
                        description="There are no susu members"
                        title="Susu Members"
                    refresh={() => dispatch(SUSU_MEMBERS_ACTION_CREATORS.getSusuGroupMembers(authToken, susuID))}
                    />
                </Flex>
            ) : (
                <FlatList
                    height="100%"
                    data={susuMembers}
                    renderItem={(member) => <SusuMember navigation={navigation} susuMember={member.item} />}
                    keyExtractor={(member) => member._id}
                />
            )}
        </Flex>
    );
};

export default SusuMembersScreen;
