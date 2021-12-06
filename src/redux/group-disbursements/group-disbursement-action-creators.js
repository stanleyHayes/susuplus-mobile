import axios from "axios";
import { API_URL_CONSTANTS } from "../../constants/constants";
import { GROUP_DISBURSEMENT_CONSTANTS } from "./group-disbursement-action-types";

const getGroupDisbursementsRequest = () => {
  return {
    type: GROUP_DISBURSEMENT_CONSTANTS.GET_GROUP_DISBURSEMENTS_REQUEST,
  };
};

const getGroupDisbursementsSuccess = data => {
  return {
    type: GROUP_DISBURSEMENT_CONSTANTS.GET_GROUP_DISBURSEMENTS_SUCCESS,
    payload: data,
  };
};

const getGroupDisbursementsFailure = error => {
  return {
    type: GROUP_DISBURSEMENT_CONSTANTS.GET_GROUP_DISBURSEMENT_FAILURE,
    payload: error,
  };
};

const getGroupDisbursements = (token, groupID) => {
  return async dispatch => {
    dispatch(getGroupDisbursementsRequest());
    try {
      const response = await axios({
        method: "GET",
        url: `${API_URL_CONSTANTS.BASE_SERVER_URL}/disbursements?group=${groupID}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { data } = response.data;
      dispatch(getGroupDisbursementsSuccess(data));
    } catch (e) {
      const { message } = e.response.message;
      dispatch(getGroupDisbursementsFailure(message));
    }
  };
};


const getGroupDisbursementRequest = () => {
  return {
    type: GROUP_DISBURSEMENT_CONSTANTS.GET_GROUP_DISBURSEMENT_REQUEST,
  };
};

const getGroupDisbursementSuccess = data => {
  return {
    type: GROUP_DISBURSEMENT_CONSTANTS.GET_GROUP_DISBURSEMENT_SUCCESS,
    payload: data,
  };
};

const getGroupDisbursementFailure = error => {
  return {
    type: GROUP_DISBURSEMENT_CONSTANTS.GET_CONTRIBUTION_FAILURE,
    payload: error,
  };
};

const getGroupDisbursement = (disbursementID, token) => {
  return async dispatch => {
    dispatch(getGroupDisbursementRequest());
    try {
      const response = await axios({
        method: "GET",
        url: `${API_URL_CONSTANTS.BASE_SERVER_URL}/disbursements/${disbursementID}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { data } = response.data;
      dispatch(getGroupDisbursementSuccess(data));
    } catch (e) {
      const { message } = e.response.message;
      dispatch(getGroupDisbursementFailure(message));
    }
  };
};

export const GROUP_DISBURSEMENTS_ACTION_CREATORS = { getGroupDisbursements, getGroupDisbursement };
