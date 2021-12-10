import React, { useEffect } from "react";
import { Center, Flex, Spinner } from "native-base";
import { useDispatch, useSelector } from "react-redux";
import { selectSusu } from "../../redux/susu/susu-reducer";
import { GROUP_ACTION_CREATORS } from "../../redux/groups/group-action-creators";
import { selectGroups } from "../../redux/groups/group-reducers";
import { selectAuth } from "../../redux/auth/auth-reducer";
import GroupSusuBasicInfoForm from "../../components/group-susu-basic-info-form";
import AddSusuMembersForm from "../../components/susu-member-add-form";
import SusuRegulationsForm from "../../components/susu-regulations-form";
import CreateSusuSummary from "../../components/create-susu-summary";

const CreateGroupSusuScreen = ({ navigation, route }) => {
    
    const { groupID } = route.params;
    
    const { createSusuPage, susuLoading } = useSelector(selectSusu);
    const { groupDetail, groupLoading } = useSelector(selectGroups);
    const { authToken } = useSelector(selectAuth);
    
    const renderPage = page => {
        switch (page) {
            case 0:
                return <GroupSusuBasicInfoForm groupDetail={groupDetail} />;
            
            case 1:
                return <SusuRegulationsForm />;
            
            case 2:
                return <AddSusuMembersForm groupDetail={groupDetail} />;
            
            case 3:
                return <CreateSusuSummary navigation={navigation} groupDetail={groupDetail} />;
            
            default:
                return <GroupSusuBasicInfoForm groupDetail={groupDetail} />;
        }
    };
    
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(GROUP_ACTION_CREATORS.getGroup(authToken, groupID));
    }, []);
    
    return (
        <Flex position="relative" flex={1} py={2} minHeight="100%">
            {susuLoading || groupLoading && (
                <Center position="absolute" flex={1} height="100%" width="100%">
                    <Spinner
                        zIndex={1000}
                        size="lg"
                    />
                </Center>
            )}
            
            {groupDetail && renderPage(createSusuPage)}
        </Flex>
    );
};

export default CreateGroupSusuScreen;
