import {  SPLASH_ACTION_TYPES } from "./splash-action-types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL_CONSTANTS, SCREEN_NAME_CONSTANTS, SECURE_STORAGE_CONSTANTS } from "../../constants/constants";
import { AUTH_ACTION_CREATORS } from "../auth/auth-action-creators";


const restoreTokenRequest = () => {
  return {
    type: SPLASH_ACTION_TYPES.RESTORE_TOKEN_REQUEST,
  };
};

const restoreTokenSuccess = () => {
  return {
    type: SPLASH_ACTION_TYPES.RESTORE_TOKEN_SUCCESS,
  };
};

const restoreTokenFailure = error => {
  return {
    type: SPLASH_ACTION_TYPES.RESTORE_TOKEN_FAILURE,
    payload: error,
  };
};

export const restoreToken = () => {
  return async dispatch => {
    dispatch(restoreTokenRequest());
    try {
      const token = await AsyncStorage.getItem(SECURE_STORAGE_CONSTANTS.SUSU_PLUS_TOKEN_KEY);
      if (token) {
        dispatch(AUTH_ACTION_CREATORS.getProfile(token));
      } else {
        dispatch(restoreTokenFailure());
      }
    } catch (e) {
      dispatch(restoreTokenFailure(e.message));
    }
  };
};

export const SPLASH_ACTION_CREATORS = { restoreToken };
