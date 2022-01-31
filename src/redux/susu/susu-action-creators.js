import { SUSU_ACTION_TYPES } from "./susu-action-types";
import axios from "axios";
import { API_URL_CONSTANTS, SCREEN_NAME_CONSTANTS, SECURE_STORAGE_CONSTANTS } from "../../constants/constants";
import { SUSU_MEMBERS_ACTION_CREATORS } from "../susu-members/susu-members-action-creators";
import { UTILS } from "../../utils/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AUTH_ACTION_CREATORS } from "../auth/auth-action-creators";

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
            if(message === 'jwt expired'){
                await AsyncStorage.removeItem(SECURE_STORAGE_CONSTANTS.SUSU_PLUS_TOKEN_KEY);
                await AsyncStorage.removeItem(SECURE_STORAGE_CONSTANTS.SUSU_PLUS_USER_DATA_KEY);
                dispatch(AUTH_ACTION_CREATORS.restoreToken());
            }
            dispatch(getSusuGroupFailure(message));
        }
    };
};


const getSusuByGroupRequest = () => {
    return {
        type: SUSU_ACTION_TYPES.GET_SUSU_GROUP_REQUEST,
    };
};

const getSusuByGroupSuccess = (susus) => {
    return {
        type: SUSU_ACTION_TYPES.GET_SUSU_BY_GROUP_SUCCESS,
        payload: susus,
    };
};

const getSusuByGroupFailure = message => {
    return {
        type: SUSU_ACTION_TYPES.GET_SUSU_BY_GROUP_FAILURE,
        payload: message,
    };
};

const getSusuByGroup = (token, groupID) => {
    return async dispatch => {
        dispatch(getSusuByGroupRequest());
        try {
            const response = await axios({
                url: `${API_URL_CONSTANTS.BASE_SERVER_URL}/susus?group=${groupID}`,
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const { data } = response.data;
            dispatch(getSusuByGroupSuccess(data));
        } catch (e) {
            const { message } = e.response.data;
    
            if(message === 'jwt expired'){
                await AsyncStorage.removeItem(SECURE_STORAGE_CONSTANTS.SUSU_PLUS_TOKEN_KEY);
                await AsyncStorage.removeItem(SECURE_STORAGE_CONSTANTS.SUSU_PLUS_USER_DATA_KEY);
                dispatch(AUTH_ACTION_CREATORS.restoreToken());
            }
            dispatch(getSusuByGroupFailure(message));
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


const cancelSusuCreation = navigation => {
    navigation.navigate(SCREEN_NAME_CONSTANTS.SUSU_STACK_NAVIGATOR);
    return {
        type: SUSU_ACTION_TYPES.SUSU_CANCEL_CREATION
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
            const { data, message } = response.data;
            dispatch(createSusuSuccess(data));
            UTILS.showToast(
                'Susu Created',
                message,
                'success',
                5000);
            navigation.navigate(SCREEN_NAME_CONSTANTS.SUSU_STACK_NAVIGATOR);
        } catch (e) {
            const { message } = e.response.data;
    
            if(message === 'jwt expired'){
                await AsyncStorage.removeItem(SECURE_STORAGE_CONSTANTS.SUSU_PLUS_TOKEN_KEY);
                await AsyncStorage.removeItem(SECURE_STORAGE_CONSTANTS.SUSU_PLUS_USER_DATA_KEY);
                dispatch(AUTH_ACTION_CREATORS.restoreToken());
            }
            UTILS.showToast('Error', message, 'error', 5000);
            dispatch(createSusuFailure(message));
        }
    };
};


export const SUSU_ACTION_CREATORS = {
    cancelSusuCreation,
    getSusuGroup,
    createSusu,
    saveSusuBasicInfo,
    susuGoToPreviousPage,
    susuGoToNextPage,
    saveSusuRegulations,
    saveSusuMembers,
    getSusuByGroup
};
