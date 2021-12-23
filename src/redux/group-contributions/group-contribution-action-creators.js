import axios from "axios";
import { API_URL_CONSTANTS, SECURE_STORAGE_CONSTANTS } from "../../constants/constants";
import { GROUP_CONTRIBUTION_ACTION_TYPES } from "./group-contribution-action-types";
import { UTILS } from "../../utils/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SPLASH_ACTION_CREATORS } from "../splash/splash-action-creators";

const getGroupContributionsRequest = () => {
  return {
    type: GROUP_CONTRIBUTION_ACTION_TYPES.GET_GROUP_CONTRIBUTIONS_REQUEST,
  };
};

const getGroupContributionsSuccess = data => {
  return {
    type: GROUP_CONTRIBUTION_ACTION_TYPES.GET_GROUP_CONTRIBUTIONS_SUCCESS,
    payload: data,
  };
};

const getGroupContributionsFailure = error => {
  return {
    type: GROUP_CONTRIBUTION_ACTION_TYPES.GET_GROUP_CONTRIBUTIONS_SUCCESS,
    payload: error,
  };
};

const getGroupContributions = (token, groupID) => {
  return async dispatch => {
    dispatch(getGroupContributionsRequest());
    try {
      const response = await axios({
        method: "GET",
        url: `${API_URL_CONSTANTS.BASE_SERVER_URL}/contributions?group=${groupID}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { data, message } = response.data;
      dispatch(getGroupContributionsSuccess(data));
      UTILS.showToast(
          'Group Created',
          message,
          'success',
          5000);
    } catch (e) {
      const { message } = e.response.message;
      if(message === 'jwt expired'){
        await AsyncStorage.removeItem(SECURE_STORAGE_CONSTANTS.SUSU_PLUS_TOKEN_KEY);
        await AsyncStorage.removeItem(SECURE_STORAGE_CONSTANTS.SUSU_PLUS_USER_DATA_KEY);
        dispatch(SPLASH_ACTION_CREATORS.restoreToken());
      }
      dispatch(getGroupContributionsFailure(message));
    }
  };
};


const getGroupContributionRequest = () => {
  return {
    type: GROUP_CONTRIBUTION_ACTION_TYPES.GET_GROUP_CONTRIBUTION_REQUEST,
  };
};

const getGroupContributionSuccess = data => {
  return {
    type: GROUP_CONTRIBUTION_ACTION_TYPES.GET_GROUP_CONTRIBUTION_SUCCESS,
    payload: data,
  };
};

const getGroupContributionFailure = error => {
  return {
    type: GROUP_CONTRIBUTION_ACTION_TYPES.GET_GROUP_CONTRIBUTION_FAILURE,
    payload: error,
  };
};

const getGroupContribution = (contributionID, token) => {
  return async dispatch => {
    dispatch(getGroupContributionRequest());
    try {
      const response = await axios({
        method: "GET",
        url: `${API_URL_CONSTANTS.BASE_SERVER_URL}/contributions/${contributionID}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { data } = response.data;
      dispatch(getGroupContributionSuccess(data));
    } catch (e) {
      const { message } = e.response.message;
      if(message === 'jwt expired'){
        await AsyncStorage.removeItem(SECURE_STORAGE_CONSTANTS.SUSU_PLUS_TOKEN_KEY);
        await AsyncStorage.removeItem(SECURE_STORAGE_CONSTANTS.SUSU_PLUS_USER_DATA_KEY);
        dispatch(SPLASH_ACTION_CREATORS.restoreToken());
      }
      dispatch(getGroupContributionFailure(message));
    }
  };
};

export const GROUP_CONTRIBUTIONS_ACTION_CREATORS = { getGroupContributions, getGroupContribution };
