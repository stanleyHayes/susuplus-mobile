import React from "react";
import { Box } from "native-base";
import GroupRegulationsForm from "../../components/group-regulations-form";
import GroupBasicInfoForm from "../../components/group-basic-info-form";
import PaymentMethodForm from "../../components/payment-method-form";
import GroupInvitesForm from "../../components/group-invites-form";
import CreateGroupSummary from "../../components/create-group-summary";
import { useSelector } from "react-redux";
import { selectGroups } from "../../redux/groups/group-reducers";

const CreateGroupScreen = ({navigation}) => {

    const { createGroupPage } = useSelector(selectGroups);

    const renderPage = page => {
        switch (page) {
            case 0:
                return <GroupBasicInfoForm />;

            case 1:
                return <GroupRegulationsForm />;

            case 2:
                return <PaymentMethodForm />;

            case 3:
                return <GroupInvitesForm />;

            case 4:
                return <CreateGroupSummary navigation={navigation} />;

            default:
                return <GroupBasicInfoForm />;
        }
    };

    return (
        <Box flex={1} backgroundColor="gray.100" minHeight="100%">
            {renderPage(createGroupPage)}
        </Box>
    );
};

export default CreateGroupScreen;
