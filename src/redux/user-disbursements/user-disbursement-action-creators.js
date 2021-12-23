import axios from "axios";
import { API_URL_CONSTANTS, SECURE_STORAGE_CONSTANTS } from "../../constants/constants";
import { DISBURSEMENT_ACTION_TYPES } from "./user-disbursement-action-types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SPLASH_ACTION_CREATORS } from "../splash/splash-action-creators";

const getDisbursementsRequest = () => {
  return {
    type: DISBURSEMENT_ACTION_TYPES.GET_DISBURSEMENTS_REQUEST,
  };
};

const getDisbursementsSuccess = data => {
  return {
    type: DISBURSEMENT_ACTION_TYPES.GET_DISBURSEMENTS_SUCCESS,
    payload: data,
  };
};

const getDisbursementsFailure = error => {
  return {
    type: DISBURSEMENT_ACTION_TYPES.GET_DISBURSEMENTS_FAILURE,
    payload: error,
  };
};

const getDisbursements = (token, recipientID) => {
  return async dispatch => {
    dispatch(getDisbursementsRequest());
    try {
      const response = await axios({
        method: "GET",
        url: `${API_URL_CONSTANTS.BASE_SERVER_URL}/disbursements?recipient=${recipientID}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { data } = response.data;
      dispatch(getDisbursementsSuccess(data));
    } catch (e) {
      const { message } = e.response.message;
  
      if(message === 'jwt expired'){
        await AsyncStorage.removeItem(SECURE_STORAGE_CONSTANTS.SUSU_PLUS_TOKEN_KEY);
        await AsyncStorage.removeItem(SECURE_STORAGE_CONSTANTS.SUSU_PLUS_USER_DATA_KEY);
        dispatch(SPLASH_ACTION_CREATORS.restoreToken());
      }
      dispatch(getDisbursementsFailure(message));
    }
  };
};


const getDisbursementRequest = () => {
  return {
    type: DISBURSEMENT_ACTION_TYPES.GET_DISBURSEMENT_REQUEST,
  };
};

const getDisbursementSuccess = data => {
  return {
    type: DISBURSEMENT_ACTION_TYPES.GET_DISBURSEMENT_SUCCESS,
    payload: data,
  };
};

const getDisbursementFailure = error => {
  return {
    type: DISBURSEMENT_ACTION_TYPES.GET_DISBURSEMENT_FAILURE,
    payload: error,
  };
};

const getDisbursement = (disbursementID, token) => {
  return async dispatch => {
    dispatch(getDisbursementRequest());
    try {
      const response = await axios({
        method: "GET",
        url: `${API_URL_CONSTANTS.BASE_SERVER_URL}/disbursements/${disbursementID}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { data } = response.data;
      dispatch(getDisbursementSuccess(data));
    } catch (e) {
      const { message } = e.response.message;
  
      if(message === 'jwt expired'){
        await AsyncStorage.removeItem(SECURE_STORAGE_CONSTANTS.SUSU_PLUS_TOKEN_KEY);
        await AsyncStorage.removeItem(SECURE_STORAGE_CONSTANTS.SUSU_PLUS_USER_DATA_KEY);
        dispatch(SPLASH_ACTION_CREATORS.restoreToken());
      }
      dispatch(getDisbursementFailure(message));
    }
  };
};

export const DISBURSEMENTS_ACTION_CREATORS = { getDisbursements, getDisbursement };
