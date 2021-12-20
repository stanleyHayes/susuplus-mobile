import { SUSU_MEMBER_ACTION_TYPES } from "./susu-members-action-types";
import axios from "axios";
import { API_URL_CONSTANTS, SCREEN_NAME_CONSTANTS, SECURE_STORAGE_CONSTANTS } from "../../constants/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AUTH_ACTION_CREATORS } from "../auth/auth-action-creators";

const getSusuGroupsOfUserRequest = () => {
  return {
    type: SUSU_MEMBER_ACTION_TYPES.GET_SUSU_GROUPS_OF_USER_REQUEST
  }
}

const getSusuGroupsOfUserSuccess = groups => {
  return {
    type: SUSU_MEMBER_ACTION_TYPES.GET_SUSU_GROUPS_OF_USER_SUCCESS,
    payload: groups
  }
}

const getSusuGroupsOfUserFailure = message => {
  return {
    type: SUSU_MEMBER_ACTION_TYPES.GET_SUSU_GROUPS_OF_USER_FAILURE,
    payload: message
  }
}

const getGroupsOfUser = (token, userID) => {
  return async dispatch => {
    dispatch(getSusuGroupsOfUserRequest());
    try {
      const response = await axios({
        url: `${API_URL_CONSTANTS.BASE_SERVER_URL}/susu-members/${userID}`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const {data} = response.data;
      dispatch(getSusuGroupsOfUserSuccess(data));
    }catch (e) {
      const {message} = e.response.data;
  
      if(message === 'jwt expired'){
        await AsyncStorage.removeItem(SECURE_STORAGE_CONSTANTS.SUSU_PLUS_TOKEN_KEY);
        await AsyncStorage.removeItem(SECURE_STORAGE_CONSTANTS.SUSU_PLUS_USER_DATA_KEY);
        dispatch(AUTH_ACTION_CREATORS.restoreToken());
      }
      dispatch(getSusuGroupsOfUserFailure(message));
    }
  }
}


const addSusuMembersRequest = () => {
  return {
    type: SUSU_MEMBER_ACTION_TYPES.ADD_SUSU_MEMBERS_REQUEST
  }
}

const addSusuMembersSuccess = members => {
  return {
    type: SUSU_MEMBER_ACTION_TYPES.ADD_SUSU_MEMBERS_SUCCESS,
    payload: members
  }
}

const addSusuMembersFailure = message => {
  return {
    type: SUSU_MEMBER_ACTION_TYPES.ADD_SUSU_MEMBERS_FAILURE,
    payload: message
  }
}

const addSusuMembers = (token, members, navigation) => {
  return async dispatch => {
    dispatch(addSusuMembersRequest());
    try {
      const response = await axios({
        url: `${API_URL_CONSTANTS.BASE_SERVER_URL}/susu-members`,
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        },
        data: members
      });
      const {data} = response.data;
      dispatch(addSusuMembersSuccess(data))
      navigation.navigate(SCREEN_NAME_CONSTANTS.SUSU_MEMBERS_SCREEN, {susuID: members.susuID})
    }catch (e) {
      const {message} = e.response.data;
  
      if(message === 'jwt expired'){
        await AsyncStorage.removeItem(SECURE_STORAGE_CONSTANTS.SUSU_PLUS_TOKEN_KEY);
        await AsyncStorage.removeItem(SECURE_STORAGE_CONSTANTS.SUSU_PLUS_USER_DATA_KEY);
        dispatch(AUTH_ACTION_CREATORS.restoreToken());
      }
      dispatch(addSusuMembersFailure(message));
    }
  }
}



const getSusuGroupMembersRequest = () => {
  return {
    type: SUSU_MEMBER_ACTION_TYPES.GET_SUSU_MEMBERS_REQUEST
  }
}

const getSusuGroupMembersSuccess = members => {
  return {
    type: SUSU_MEMBER_ACTION_TYPES.GET_SUSU_MEMBERS_SUCCESS,
    payload: members
  }
}

const getSusuGroupMembersFailure = message => {
  return {
    type: SUSU_MEMBER_ACTION_TYPES.GET_SUSU_MEMBERS_FAILURE,
    payload: message
  }
}

const getSusuGroupMembers = (token, susuID) => {
  return async dispatch => {
    dispatch(getSusuGroupMembersRequest());
    try {
      const response = await axios({
        url: `${API_URL_CONSTANTS.BASE_SERVER_URL}/susu-members?susu=${susuID}`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const {data} = response.data;
      dispatch(getSusuGroupMembersSuccess(data));
    }catch (e) {
      const {message} = e.response.data;
  
      if(message === 'jwt expired'){
        await AsyncStorage.removeItem(SECURE_STORAGE_CONSTANTS.SUSU_PLUS_TOKEN_KEY);
        await AsyncStorage.removeItem(SECURE_STORAGE_CONSTANTS.SUSU_PLUS_USER_DATA_KEY);
        dispatch(AUTH_ACTION_CREATORS.restoreToken());
      }
      dispatch(getSusuGroupMembersFailure(message));
    }
  }
}


export const SUSU_MEMBERS_ACTION_CREATORS = {getGroupsOfUser, getSusuGroupMembers, addSusuMembers};
