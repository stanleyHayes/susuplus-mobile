import axios from "axios";
import { API_URL_CONSTANTS, SCREEN_NAME_CONSTANTS, SECURE_STORAGE_CONSTANTS } from "../../constants/constants";
import { CONTRIBUTION_ACTION_TYPES } from "./user-contribution-action-types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AUTH_ACTION_CREATORS } from "../auth/auth-action-creators";

const getContributionsRequest = () => {
  return {
    type: CONTRIBUTION_ACTION_TYPES.GET_CONTRIBUTIONS_REQUEST,
  };
};

const getContributionsSuccess = data => {
  return {
    type: CONTRIBUTION_ACTION_TYPES.GET_CONTRIBUTIONS_SUCCESS,
    payload: data,
  };
};

const getContributionsFailure = error => {
  return {
    type: CONTRIBUTION_ACTION_TYPES.GET_CONTRIBUTIONS_FAILURE,
    payload: error,
  };
};

const getContributions = (token) => {
  return async dispatch => {
    dispatch(getContributionsRequest());
    try {
      const response = await axios({
        method: "GET",
        url: `${API_URL_CONSTANTS.BASE_SERVER_URL}/contributions`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { data } = response.data;
      dispatch(getContributionsSuccess(data));
    } catch (e) {
      const { message } = e.response.data;
  
      if(message === 'jwt expired'){
        await AsyncStorage.removeItem(SECURE_STORAGE_CONSTANTS.SUSU_PLUS_TOKEN_KEY);
        await AsyncStorage.removeItem(SECURE_STORAGE_CONSTANTS.SUSU_PLUS_USER_DATA_KEY);
        dispatch(AUTH_ACTION_CREATORS.restoreToken());
      }
      dispatch(getContributionsFailure(message));
    }
  };
};


const getContributionRequest = () => {
  return {
    type: CONTRIBUTION_ACTION_TYPES.GET_CONTRIBUTION_REQUEST,
  };
};

const getContributionSuccess = data => {
  return {
    type: CONTRIBUTION_ACTION_TYPES.GET_CONTRIBUTION_SUCCESS,
    payload: data,
  };
};

const getContributionFailure = error => {
  return {
    type: CONTRIBUTION_ACTION_TYPES.GET_CONTRIBUTION_FAILURE,
    payload: error,
  };
};

const getContribution = (contributionID, token) => {
  return async dispatch => {
    dispatch(getContributionRequest());
    try {
      const response = await axios({
        method: "GET",
        url: `${API_URL_CONSTANTS.BASE_SERVER_URL}/contributions/${contributionID}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { data } = response.data;
      dispatch(getContributionSuccess(data));
    } catch (e) {
      const { message } = e.response.message;
  
      if(message === 'jwt expired'){
        await AsyncStorage.removeItem(SECURE_STORAGE_CONSTANTS.SUSU_PLUS_TOKEN_KEY);
        await AsyncStorage.removeItem(SECURE_STORAGE_CONSTANTS.SUSU_PLUS_USER_DATA_KEY);
        dispatch(AUTH_ACTION_CREATORS.restoreToken());
      }
      dispatch(getContributionFailure(message));
    }
  };
};


const makeContributionRequest = () => {
  return {
    type: CONTRIBUTION_ACTION_TYPES.MAKE_CONTRIBUTION_REQUEST,
  };
};

const makeContributionSuccess = data => {
  return {
    type: CONTRIBUTION_ACTION_TYPES.MAKE_CONTRIBUTION_SUCCESS,
    payload: data,
  };
};

const makeContributionFailure = error => {
  return {
    type: CONTRIBUTION_ACTION_TYPES.MAKE_CONTRIBUTION_FAILURE,
    payload: error,
  };
};

const makeContributions = (contribution, token, navigation) => {
  return async dispatch => {
    dispatch(makeContributionRequest);
    try {
      const response = await axios({
        method: "POST",
        url: `${API_URL_CONSTANTS.BASE_SERVER_URL}/contributions`,
        data: contribution,
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const { data } = response.data;
      dispatch(makeContributionSuccess(data));
      navigation.push(SCREEN_NAME_CONSTANTS.SUSU_DETAIL_SCREEN);
    } catch (e) {
      const { message } = e.response.message;
  
      if(message === 'jwt expired'){
        await AsyncStorage.removeItem(SECURE_STORAGE_CONSTANTS.SUSU_PLUS_TOKEN_KEY);
        await AsyncStorage.removeItem(SECURE_STORAGE_CONSTANTS.SUSU_PLUS_USER_DATA_KEY);
        dispatch(AUTH_ACTION_CREATORS.restoreToken());
      }
      dispatch(makeContributionFailure(message));
    }
  };
};

export const CONTRIBUTIONS_ACTION_CREATORS = { makeContributions, getContributions, getContribution };
