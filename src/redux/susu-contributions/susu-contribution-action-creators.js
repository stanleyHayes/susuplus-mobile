import { CONTRIBUTION_ACTION_TYPES } from "../user-contributions/user-contribution-action-types";
import axios from "axios";
import { API_URL_CONSTANTS } from "../../constants/constants";

const getContributionsRequest = () => {
  return {
    type: CONTRIBUTION_ACTION_TYPES.GET_CONTRIBUTIONS_REQUEST,
  };
};

const getContributionsSuccess = data => {
  return {
    type: CONTRIBUTION_ACTION_TYPES.GET_CONTRIBUTIONS_SUCCESS,
    payload: data
  };
};

const getContributionsFailure = message => {
  return {
    type: CONTRIBUTION_ACTION_TYPES.GET_CONTRIBUTIONS_FAILURE,
    payload: message
  };
};

const getContributions = (token, userID) => {
  return async dispatch => {
    try {
      dispatch(getContributionsRequest());
      const response = await axios({
        method: 'GET',
        url: `${API_URL_CONSTANTS.BASE_SERVER_URL}/contributions?contributor=${userID}`,
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const {data} = response.data;
      dispatch(getContributionsSuccess(data));
    } catch (e) {
      const {message} = e.response.data;
      dispatch(getContributionsFailure(message));
    }
  };
};


const getContributionRequest = () => {
  return {
    type: CONTRIBUTION_ACTION_TYPES.GET_CONTRIBUTIONS_REQUEST,
  };
};

const getContributionSuccess = data => {
  return {
    type: CONTRIBUTION_ACTION_TYPES.GET_CONTRIBUTIONS_SUCCESS,
    payload: data
  };
};

const getContributionFailure = message => {
  return {
    type: CONTRIBUTION_ACTION_TYPES.GET_CONTRIBUTIONS_FAILURE,
    payload: message
  };
};

const getContribution = (token, contributionID) => {
  return async dispatch => {
    try {
      dispatch(getContributionRequest());
      const response = await axios({
        method: 'GET',
        url: `${API_URL_CONSTANTS.BASE_SERVER_URL}/contributions/${contributionID}`,
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const {data} = response.data;
      dispatch(getContributionSuccess(data));
    } catch (e) {
      const {message} = e.response.data;
      dispatch(getContributionFailure(message));
    }
  };
};


export const CONTRIBUTIONS_ACTION_CREATORS = {
  getContributions, getContribution
};
