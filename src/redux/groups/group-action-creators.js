import { GROUP_ACTION_TYPES } from "./group-action-types";
import axios from "axios";
import { API_URL_CONSTANTS, SCREEN_NAME_CONSTANTS } from "../../constants/constants";

const getGroupRequest = () => {
    return {
        type: GROUP_ACTION_TYPES.GET_GROUP_REQUEST,
    };
};

const getGroupSuccess = (group, members) => {
    return {
        type: GROUP_ACTION_TYPES.GET_GROUP_SUCCESS,
        payload: { group, members },
    };
};

const getGroupFailure = message => {
    return {
        type: GROUP_ACTION_TYPES.GET_GROUP_FAILURE,
        payload: message,
    };
};

const getGroup = (token, groupID) => {
    return async dispatch => {
        dispatch(getGroupRequest());
        try {
            const response = await axios({
                url: `${API_URL_CONSTANTS.BASE_SERVER_URL}/groups/${groupID}`,
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const { data, members } = response.data;
            dispatch(getGroupSuccess(data, members));
        } catch (e) {
            const { message } = e.response.data;
            dispatch(getGroupFailure(message));
        }
    };
};


const saveGroupBasicInfo = info => {
    return {
        type: GROUP_ACTION_TYPES.SAVE_GROUP_BASIC_INFO,
        payload: info,
    };
};

const saveGroupPaymentInfo = paymentInfo => {
    return {
        type: GROUP_ACTION_TYPES.SAVE_PAYMENT_INFO,
        payload: paymentInfo,
    };
};


const saveGroupInvites = invitations => {
    return {
        type: GROUP_ACTION_TYPES.SAVE_GROUP_INVITATIONS,
        payload: invitations,
    };
};

const saveGroupRegulations = regulations => {
    return {
        type: GROUP_ACTION_TYPES.SAVE_GROUP_REGULATIONS,
        payload: regulations,
    };
};

const groupGoToNextPage = () => {
    return {
        type: GROUP_ACTION_TYPES.GROUP_GO_TO_NEXT_PAGE,
    };
};

const groupGoToPreviousPage = () => {
    return {
        type: GROUP_ACTION_TYPES.GROUP_GO_TO_PREVIOUS_PAGE,
    };
};

const groupGoToPage = page => {
    return {
        type: GROUP_ACTION_TYPES.GROUP_GO_TO_PAGE,
        payload: page,
    };
};


const createGroupRequest = () => {
    return {
        type: GROUP_ACTION_TYPES.CREATE_GROUP_REQUEST,
    };
};

const createGroupSuccess = (group) => {
    return {
        type: GROUP_ACTION_TYPES.CREATE_GROUP_SUCCESS,
        payload: group,
    };
};

const createGroupFailure = message => {
    return {
        type: GROUP_ACTION_TYPES.CREATE_GROUP_FAILURE,
        payload: message,
    };
};

const createGroup = (token, group, navigation) => {
    return async dispatch => {
        dispatch(createGroupRequest());
        try {
            const response = await axios({
                url: `${API_URL_CONSTANTS.BASE_SERVER_URL}/groups`,
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                data: group
            });
            const { data } = response.data;
            dispatch(createGroupSuccess(data));
            navigation.push(SCREEN_NAME_CONSTANTS.GROUPS_SCREEN);
        } catch (e) {
            const { message } = e.response.data;
            dispatch(createGroupFailure(message));
        }
    };
};



export const GROUP_ACTION_CREATORS = {
    saveGroupInvites,
    saveGroupBasicInfo,
    saveGroupRegulations,
    groupGoToNextPage,
    getGroup,
    groupGoToPage,
    groupGoToPreviousPage,
    saveGroupPaymentInfo,
    createGroup
};
