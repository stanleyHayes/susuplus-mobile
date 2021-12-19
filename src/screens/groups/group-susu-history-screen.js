import React, { useEffect } from "react";
import { Center, FlatList, Flex, Spinner } from "native-base";
import { useDispatch, useSelector } from "react-redux";
import Empty from "../../components/empty";
import { selectAuth } from "../../redux/auth/auth-reducer";
import { selectSusu } from "../../redux/susu/susu-reducer";
import { SUSU_ACTION_CREATORS } from "../../redux/susu/susu-action-creators";
import GroupSusuHistoryItem from "../../components/group-susu-history-item";

const GroupSusuHistoryScreen = ({ navigation, route }) => {
    const { susuLoading, susuByGroup } = useSelector(selectSusu);
    const { authToken } = useSelector(selectAuth);
    
    const { groupID } = route.params;
    
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(SUSU_ACTION_CREATORS.getSusuByGroup(authToken, groupID));
    }, []);
    

    return (
        <Flex position="relative" height="100%" width="100%" py={2} backgroundColor="gray.100">
            {susuLoading &&
            <Center width="100%" height="100%">
                <Spinner
                    size={50}
                    color="primary.800"
                />
            </Center>}
            
            {susuByGroup && susuByGroup.length === 0 ? (
                <Flex
                    backgroundColor="white"
                    width="100%" height="100%"
                    justifyContent="center"
                    alignItems="center">
                    <Empty description="This group has no susu" title="Group Susu" />
                </Flex>
            ) : (
                <FlatList
                    refreshing={susuLoading}
                    onRefresh={() => dispatch(SUSU_ACTION_CREATORS.getSusuByGroup(authToken, groupID))}
                    data={susuByGroup}
                    renderItem={(susu) => <GroupSusuHistoryItem navigation={navigation} susu={susu.item}
                                               />}
                    keyExtractor={(susu) => susu._id}
                />
            )}
        </Flex>
    );
};

export default GroupSusuHistoryScreen;

