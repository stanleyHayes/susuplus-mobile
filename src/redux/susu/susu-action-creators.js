import { SUSU_ACTION_TYPES } from "./susu-action-types";
import axios from "axios";
import { API_URL_CONSTANTS, SCREEN_NAME_CONSTANTS } from "../../constants/constants";
import { SUSU_MEMBERS_ACTION_CREATORS } from "../susu-members/susu-members-action-creators";

const getSusuGroupRequest = () => {
    return {
        type: SUSU_ACTION_TYPES.GET_SUSU_GROUP_REQUEST,
    };
};

const getSusuGroupSuccess = (susu) => {
    return {
        type: SUSU_ACTION_TYPES.GET_SUSU_GROUP_SUCCESS,
        payload: susu,
    };
};

const getSusuGroupFailure = message => {
    return {
        type: SUSU_ACTION_TYPES.GET_SUSU_GROUP_SUCCESS,
        payload: message,
    };
};

const getSusuGroup = (token, susuID) => {
    return async dispatch => {
        dispatch(getSusuGroupRequest());
        try {
            const response = await axios({
                url: `${API_URL_CONSTANTS.BASE_SERVER_URL}/susus/${susuID}`,
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const { data } = response.data;
            dispatch(getSusuGroupSuccess(data));
        } catch (e) {
            const { message } = e.response.data;
            dispatch(getSusuGroupFailure(message));
        }
    };
};


const saveSusuBasicInfo = info => {
    return {
        type: SUSU_ACTION_TYPES.SAVE_SUSU_BASIC_INFO,
        payload: info,
    };
};


const saveSusuMembers = members => {
    return {
        type: SUSU_ACTION_TYPES.ADD_SUSU_MEMBERS,
        payload: members,
    };
};

const saveSusuRegulations = regulations => {
    return {
        type: SUSU_ACTION_TYPES.ADD_SUSU_REGULATIONS,
        payload: regulations,
    };
};


const susuGoToNextPage = () => {
    return {
        type: SUSU_ACTION_TYPES.SUSU_GO_TO_NEXT_PAGE,
    };
};

const susuGoToPreviousPage = () => {
    return {
        type: SUSU_ACTION_TYPES.SUSU_GO_TO_PREVIOUS_PAGE,
    };
};


const createSusuRequest = () => {
    return {
        type: SUSU_ACTION_TYPES.CREATE_SUSU_REQUEST,
    };
};


const createSusuSuccess = susu => {
    return {
        type: SUSU_ACTION_TYPES.CREATE_SUSU_SUCCESS,
        payload: susu
    };
};


const createSusuFailure = message => {
    return {
        type: SUSU_ACTION_TYPES.CREATE_SUSU_FAILURE,
        payload: message,
    };
};


const createSusu = (token, susu, userID, navigation) => {
    return async dispatch => {
        dispatch(createSusuRequest());
        try {
            const response = await axios({
                url: `${API_URL_CONSTANTS.BASE_SERVER_URL}/susus`,
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                data: susu,
            });
            const { data } = response.data;
            dispatch(createSusuSuccess(data));
            dispatch(SUSU_MEMBERS_ACTION_CREATORS.getGroupsOfUser(token, userID));
            navigation.push(SCREEN_NAME_CONSTANTS.GROUP_DETAIL_SCREEN, {groupID: susu.group});
        } catch (e) {
            const { message } = e.response.data;
            dispatch(createSusuFailure(message));
        }
    };
};


export const SUSU_ACTION_CREATORS = {
    getSusuGroup,
    createSusu,
    saveSusuBasicInfo,
    susuGoToPreviousPage,
    susuGoToNextPage,
    saveSusuRegulations,
    saveSusuMembers,
};
