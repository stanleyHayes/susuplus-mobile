import { GROUP_MEMBER_ACTION_TYPES } from "./group-members-action-types";
import axios from "axios";
import { API_URL_CONSTANTS, SECURE_STORAGE_CONSTANTS } from "../../constants/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AUTH_ACTION_CREATORS } from "../auth/auth-action-creators";

const getGroupsOfUserRequest = () => {
  return {
    type: GROUP_MEMBER_ACTION_TYPES.GET_GROUPS_OF_USER_REQUEST
  }
}

const getGroupsOfUserSuccess = groups => {
  return {
    type: GROUP_MEMBER_ACTION_TYPES.GET_GROUPS_OF_USER_SUCCESS,
    payload: groups
  }
}

const getGroupsOfUserFailure = message => {
  return {
    type: GROUP_MEMBER_ACTION_TYPES.GET_GROUPS_OF_USER_FAILURE,
    payload: message
  }
}

const getGroupsOfUser = (token, userID) => {
  return async dispatch => {
    dispatch(getGroupsOfUserRequest());
    try {
      const response = await axios({
        url: `${API_URL_CONSTANTS.BASE_SERVER_URL}/group-members/${userID}`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const {data} = response.data;
      dispatch(getGroupsOfUserSuccess(data));
    }catch (e) {
      const {message} = e.response.data;
  
      if(message === 'jwt expired'){
        await AsyncStorage.removeItem(SECURE_STORAGE_CONSTANTS.SUSU_PLUS_TOKEN_KEY);
        await AsyncStorage.removeItem(SECURE_STORAGE_CONSTANTS.SUSU_PLUS_USER_DATA_KEY);
        dispatch(AUTH_ACTION_CREATORS.restoreToken());
      }
      dispatch(getGroupsOfUserFailure(message));
    }
  }
}


const getGroupMembersRequest = () => {
  return {
    type: GROUP_MEMBER_ACTION_TYPES.GET_GROUP_MEMBERS_REQUEST
  }
}

const getGroupMembersSuccess = members => {
  return {
    type: GROUP_MEMBER_ACTION_TYPES.GET_GROUP_MEMBERS_SUCCESS,
    payload: members
  }
}

const getGroupMembersFailure = message => {
  return {
    type: GROUP_MEMBER_ACTION_TYPES.GET_GROUP_MEMBERS_FAILURE,
    payload: message
  }
}

const getGroupMembers = (token, groupID) => {
  return async dispatch => {
    dispatch(getGroupMembersRequest());
    try {
      const response = await axios({
        url: `${API_URL_CONSTANTS.BASE_SERVER_URL}/group-members?group=${groupID}`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const {data} = response.data;
      dispatch(getGroupMembersSuccess(data));
    }catch (e) {
      const {message} = e.response.data;
  
      if(message === 'jwt expired'){
        await AsyncStorage.removeItem(SECURE_STORAGE_CONSTANTS.SUSU_PLUS_TOKEN_KEY);
        await AsyncStorage.removeItem(SECURE_STORAGE_CONSTANTS.SUSU_PLUS_USER_DATA_KEY);
        dispatch(AUTH_ACTION_CREATORS.restoreToken());
      }
      dispatch(getGroupMembersFailure(message));
    }
  }
}


export const GROUP_MEMBERS_ACTION_CREATORS = {getGroupsOfUser, getGroupMembers};
