import { USER_ACTION_TYPES } from "./user-action-types";
import axios from "axios";
import { API_URL_CONSTANTS, SECURE_STORAGE_CONSTANTS } from "../../constants/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AUTH_ACTION_CREATORS } from "../auth/auth-action-creators";
import { PermissionsAndroid, Platform } from "react-native";
import Contacts from "react-native-contacts";

const getUsersRequest = () => {
    return {
        type: USER_ACTION_TYPES.GET_USERS_REQUEST,
    };
};

const getUsersSuccess = (users) => {
    return {
        type: USER_ACTION_TYPES.GET_USERS_SUCCESS,
        payload: users,
    };
};

const getUsersFailure = message => {
    return {
        type: USER_ACTION_TYPES.GET_USERS_FAILURE,
        payload: message,
    };
};

const getUsers = (token) => {
    return async dispatch => {
        dispatch(getUsersRequest());
        try {
            const response = await axios({
                url: `${API_URL_CONSTANTS.BASE_SERVER_URL}/users/`,
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const { data } = response.data;
            dispatch(getUsersSuccess(data));
        } catch (e) {
            const { message } = e.response.data;
            
            if (message === "jwt expired") {
                await AsyncStorage.removeItem(SECURE_STORAGE_CONSTANTS.SUSU_PLUS_TOKEN_KEY);
                await AsyncStorage.removeItem(SECURE_STORAGE_CONSTANTS.SUSU_PLUS_USER_DATA_KEY);
                dispatch(AUTH_ACTION_CREATORS.restoreToken());
            }
            dispatch(getUsersFailure(message));
        }
    };
};

const getUserContactsRequest = () => {
    return {
        type: USER_ACTION_TYPES.GET_USER_CONTACTS_REQUEST,
    };
};


const getUserContactsSuccess = contacts => {
    return {
        type: USER_ACTION_TYPES.GET_USER_CONTACTS_SUCCESS,
        payload: contacts,
    };
};

const getUserContactsFailure = message => {
    return {
        type: USER_ACTION_TYPES.GET_USER_CONTACTS_FAILURE,
        payload: message,
    };
};

const getUserContacts = () => {
    return async dispatch => {
        dispatch(getUserContactsRequest());
        try {
            if (Platform.OS === "android") {
                if (!await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_CONTACTS)) {
                    const result = await PermissionsAndroid.request(
                        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
                        {
                            title: "Contacts",
                            message: "Invite your friends to this group",
                            buttonPositive: "Allow",
                            buttonNegative: "Reject",
                            buttonNeutral: "Ask Me Later",
                        },
                    );
                    if (result === PermissionsAndroid.RESULTS.GRANTED) {
                        const contacts = await Contacts.getAll();
                        dispatch(getUserContactsSuccess(contacts));
                    } else if (result === PermissionsAndroid.RESULTS.DENIED) {
                        dispatch(getUserContactsFailure('Permission denied'));
                    } else if (result === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
                        dispatch(getUserContactsFailure('Permission denied'));
                    }
                } else {
                    const contacts = await Contacts.getAll();
                    dispatch(getUserContactsSuccess(contacts));
                }
            } else if (Platform.OS === "ios") {
                const contacts = await Contacts.getAll();
                dispatch(getUserContactsSuccess(contacts));
            }
        } catch (e) {
        
        }
    };
};

export const USER_ACTION_CREATORS = {
    getUsers,
    getUserContacts
};
