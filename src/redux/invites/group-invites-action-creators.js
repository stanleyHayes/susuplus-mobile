import { INVITATIONS_ACTION_TYPE } from "./group-invites-action-types";
import axios from "axios";
import { API_URL_CONSTANTS, SCREEN_NAME_CONSTANTS, SECURE_STORAGE_CONSTANTS } from "../../constants/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UTILS } from "../../utils/utils";
import { SPLASH_ACTION_CREATORS } from "../splash/splash-action-creators";

const getInvitationsRequest = () => {
  return {
    type: INVITATIONS_ACTION_TYPE.GET_INVITATIONS_REQUEST
  }
}

const getInvitationsSuccess = data => {
  return {
    type: INVITATIONS_ACTION_TYPE.GET_INVITATIONS_SUCCESS,
    payload: data
  }
}

const getInvitationsFailure = message => {
  return {
    type: INVITATIONS_ACTION_TYPE.GET_INVITATIONS_FAILURE,
    payload: message
  }
}

const getInvitations = (token, query) => {
  return async dispatch => {
    dispatch(getInvitationsRequest());
    try {
      const response = await axios({
        url:`${API_URL_CONSTANTS.BASE_SERVER_URL}/invitations?${query}`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const {data} = response.data;
      dispatch(getInvitationsSuccess(data));
    }catch (e) {
      const {message} = e.response.data;
      if(message === 'jwt expired'){
        await AsyncStorage.removeItem(SECURE_STORAGE_CONSTANTS.SUSU_PLUS_TOKEN_KEY);
        await AsyncStorage.removeItem(SECURE_STORAGE_CONSTANTS.SUSU_PLUS_USER_DATA_KEY);
        dispatch(SPLASH_ACTION_CREATORS.restoreToken());
      }
      dispatch(getInvitationsFailure(message));
      UTILS.showToast('Error', message, 'error', 5000);
    }
  }
}


const createInvitationRequest = () => {
  return {
    type: INVITATIONS_ACTION_TYPE.CREATE_INVITATION_REQUEST
  }
}

const createInvitationSuccess = data => {
  return {
    type: INVITATIONS_ACTION_TYPE.CREATE_INVITATION_SUCCESS,
    payload: data
  }
}

const createInvitationFailure = message => {
  return {
    type: INVITATIONS_ACTION_TYPE.CREATE_INVITATION_FAILURE,
    payload: message
  }
}

const createInvitation = (invitations, token, navigation) => {
  return async dispatch => {
    dispatch(createInvitationRequest());
    try {
      const response = await axios({
        url:`${API_URL_CONSTANTS.BASE_SERVER_URL}/invitations`,
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        },
        data: invitations
      });
      const {data} = response.data;
      dispatch(createInvitationSuccess(data));
      navigation.push(SCREEN_NAME_CONSTANTS.GROUP_INVITATIONS_SCREEN, {groupID: invitations.group});
    }catch (e) {
      const {message} = e.response.data;
      if(message === 'jwt expired'){
        await AsyncStorage.removeItem(SECURE_STORAGE_CONSTANTS.SUSU_PLUS_TOKEN_KEY);
        await AsyncStorage.removeItem(SECURE_STORAGE_CONSTANTS.SUSU_PLUS_USER_DATA_KEY);
        dispatch(SPLASH_ACTION_CREATORS.restoreToken());
      }
      UTILS.showToast('Error', message, 'error', 5000);
      dispatch(createInvitationFailure(message));
    }
  }
}



const acceptInvitationRequest = () => {
  return {
    type: INVITATIONS_ACTION_TYPE.ACCEPT_INVITATION_REQUEST
  }
}

const acceptInvitationSuccess = data => {
  return {
    type: INVITATIONS_ACTION_TYPE.ACCEPT_INVITATION_SUCCESS,
    payload: data
  }
}

const acceptInvitationFailure = message => {
  return {
    type: INVITATIONS_ACTION_TYPE.ACCEPT_INVITATION_FAILURE,
    payload: message
  }
}

const acceptInvitation = (token, invitationID) => {
  return async dispatch => {
    dispatch(acceptInvitationRequest());
    try {
      const response = await axios({
        url:`${API_URL_CONSTANTS.BASE_SERVER_URL}/invitations/${invitationID}/response`,
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`
        },
        data: {
          response: 'ACCEPT'
        }
      });
      const {data} = response.data;
      dispatch(acceptInvitationSuccess(data));
    }catch (e) {
      const {message} = e.response.data;
  
      if(message === 'jwt expired'){
        await AsyncStorage.removeItem(SECURE_STORAGE_CONSTANTS.SUSU_PLUS_TOKEN_KEY);
        await AsyncStorage.removeItem(SECURE_STORAGE_CONSTANTS.SUSU_PLUS_USER_DATA_KEY);
        dispatch(SPLASH_ACTION_CREATORS.restoreToken());
      }
      dispatch(acceptInvitationFailure(message));
    }
  }
}


const declineInvitationRequest = () => {
  return {
    type: INVITATIONS_ACTION_TYPE.DECLINE_INVITATION_REQUEST
  }
}

const declineInvitationSuccess = data => {
  return {
    type: INVITATIONS_ACTION_TYPE.DECLINE_INVITATION_SUCCESS,
    payload: data
  }
}

const declineInvitationFailure = message => {
  return {
    type: INVITATIONS_ACTION_TYPE.DECLINE_INVITATION_FAILURE,
    payload: message
  }
}

const declineInvitation = (token, invitationID) => {
  return async dispatch => {
    dispatch(declineInvitationRequest());
    try {
      const response = await axios({
        url:`${API_URL_CONSTANTS.BASE_SERVER_URL}/invitations/${invitationID}/response`,
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`
        },
        data: {
          response: 'REJECT'
        }
      });
      const {data} = response.data;
      dispatch(declineInvitationSuccess(data));
    }catch (e) {
      const {message} = e.response.data;
  
      if(message === 'jwt expired'){
        await AsyncStorage.removeItem(SECURE_STORAGE_CONSTANTS.SUSU_PLUS_TOKEN_KEY);
        await AsyncStorage.removeItem(SECURE_STORAGE_CONSTANTS.SUSU_PLUS_USER_DATA_KEY);
        dispatch(SPLASH_ACTION_CREATORS.restoreToken());
      }
      dispatch(declineInvitationFailure(message));
    }
  }
}

export const INVITATION_ACTION_CREATORS = {
  declineInvitation, getInvitations, acceptInvitation, createInvitation
}
