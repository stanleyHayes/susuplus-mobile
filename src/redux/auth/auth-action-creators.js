import { AUTH_ACTION_TYPES } from "./auth-action-types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL_CONSTANTS, SCREEN_NAME_CONSTANTS, SECURE_STORAGE_CONSTANTS } from "../../constants/constants";
import axios from "axios";
import { UTILS } from "../../utils/utils";

const restoreTokenRequest = () => {
  return {
    type: AUTH_ACTION_TYPES.RESTORE_TOKEN_REQUEST,
  };
};

const restoreTokenSuccess = (authToken, userData) => {
  return {
    type: AUTH_ACTION_TYPES.RESTORE_TOKEN_SUCCESS,
    payload: { authToken, userData },
  };
};

const restoreTokenFailure = error => {
  return {
    type: AUTH_ACTION_TYPES.RESTORE_TOKEN_FAILURE,
    payload: error,
  };
};

export const restoreToken = () => {
  return async dispatch => {
    dispatch(restoreTokenRequest());
    try {
      const token = await AsyncStorage.getItem(SECURE_STORAGE_CONSTANTS.SUSU_PLUS_TOKEN_KEY);
      const userData = await AsyncStorage.getItem(SECURE_STORAGE_CONSTANTS.SUSU_PLUS_USER_DATA_KEY);
      if (token && userData) {
        dispatch(restoreTokenSuccess(token, JSON.parse(userData)));
      } else {
        dispatch(restoreTokenFailure());
        
      }
    } catch (e) {
      dispatch(restoreTokenFailure(e.message));
    }
  };
};


const signInRequest = () => {
  return {
    type: AUTH_ACTION_TYPES.SIGN_IN_REQUEST,
  };
};

const signInSuccess = (token, userData) => {
  return {
    type: AUTH_ACTION_TYPES.SIGN_IN_SUCCESS,
    payload: { token, userData },
  };
};

const signInFailure = error => {
  return {
    type: AUTH_ACTION_TYPES.SIGN_IN_FAILURE,
    payload: error,
  };
};

export const signIn = (user) => {
  return async dispatch => {
    dispatch(signInRequest());
    try {
      const response = await axios({
        method: "POST",
        data: user,
        url: `${API_URL_CONSTANTS.BASE_SERVER_URL}/auth/login`,
      });
      const { token, data } = response.data;
      await AsyncStorage.setItem(SECURE_STORAGE_CONSTANTS.SUSU_PLUS_TOKEN_KEY, token);
      await AsyncStorage.setItem(SECURE_STORAGE_CONSTANTS.SUSU_PLUS_USER_DATA_KEY, JSON.stringify(data));
      UTILS.showToast('Sign In successful', 'Welcome back to susu plus. Enjoy', 'success', 5000);
      dispatch(signInSuccess(token, data));
    } catch (e) {
      const { message } = e.response.data;
      UTILS.showToast('Sign up failed', message, 'error', 5000);
      dispatch(signInFailure(message));
    }
  };
};


const signUpRequest = () => {
  return {
    type: AUTH_ACTION_TYPES.SIGN_UP_REQUEST,
  };
};

const signUpSuccess = (userData) => {
  return {
    type: AUTH_ACTION_TYPES.SIGN_UP_SUCCESS,
    payload: userData,
  };
};

const signUpFailure = error => {
  return {
    type: AUTH_ACTION_TYPES.SIGN_UP_FAILURE,
    payload: error,
  };
};

export const signUp = (user, navigator) => {
  return async dispatch => {
    dispatch(signUpRequest());
    try {
      const response = await axios({
        method: "POST",
        data: user,
        url: `${API_URL_CONSTANTS.BASE_SERVER_URL}/auth/register`,
      });
      const { token } = response.data;
      dispatch(signUpSuccess(token));
      UTILS.showToast('Account Created', 'Verify your account to continue', 'success', 5000);
      await AsyncStorage.setItem(SECURE_STORAGE_CONSTANTS.SUSU_PLUS_SIGN_UP_TOKEN_KEY, token);
      navigator.navigate(SCREEN_NAME_CONSTANTS.VERIFY_ACCOUNT_SCREEN);
    } catch (e) {
      const { message } = e.response.data;
      UTILS.showToast('Account Created Failed', message, 'error', 5000);
      dispatch(signUpFailure(message));
    }
  };
};


const forgotPasswordRequest = () => {
  return {
    type: AUTH_ACTION_TYPES.FORGOT_PASSWORD_REQUEST,
  };
};

const forgotPasswordSuccess = data => {
  return {
    type: AUTH_ACTION_TYPES.FORGOT_PASSWORD_SUCCESS,
    payload: data,
  };
};

const forgotPasswordFailure = error => {
  return {
    type: AUTH_ACTION_TYPES.FORGOT_PASSWORD_FAILURE,
    payload: error,
  };
};

export const forgotPassword = (email, navigation) => {
  return async dispatch => {
    dispatch(forgotPasswordRequest());
    try {
      const response = await axios({
        method: "POST",
        data: { email },
        url: `${API_URL_CONSTANTS.BASE_SERVER_URL}/auth/forgot-password`,
      });
      const { token } = response.data;
      await AsyncStorage.setItem(SECURE_STORAGE_CONSTANTS.SUSU_PLUS_FORGOT_PASSWORD_TOKEN_KEY, token);
      UTILS.showToast(
          'Reset Password Link Sent',
          'Follow the link to reset your password',
          'success',
          5000);
      dispatch(forgotPasswordSuccess(token));
      navigation.push(SCREEN_NAME_CONSTANTS.FORGOT_PASSWORD_SUCCESS_SCREEN);
    } catch (e) {
      const { message } = e.response.data;
      UTILS.showToast(
          'Reset Password Link not sent',
          message,
          'error',
          5000);
      dispatch(forgotPasswordFailure(message));
    }
  };
};


const resetPasswordRequest = () => {
  return {
    type: AUTH_ACTION_TYPES.SIGN_IN_REQUEST,
  };
};

const resetPasswordSuccess = () => {
  return {
    type: AUTH_ACTION_TYPES.SIGN_IN_SUCCESS,
  };
};

const resetPasswordFailure = error => {
  return {
    type: AUTH_ACTION_TYPES.SIGN_IN_FAILURE,
    payload: error,
  };
};

export const resetPassword = (user, token, navigator) => {
  return async dispatch => {
    dispatch(resetPasswordRequest());
    try {
      await axios({
        method: "PUT",
        data: user,
        url: `${API_URL_CONSTANTS.BASE_SERVER_URL}/auth/reset-password/${token}`,
      });
      dispatch(resetPasswordSuccess());
      UTILS.showToast(
          'Password Reset Successful',
          'Account successfully reset. Login to continue',
          'success',
          5000);
      navigator.push(SCREEN_NAME_CONSTANTS.SIGN_IN_SCREEN);
    } catch (e) {
      const { message } = e.response.data;
      UTILS.showToast('Reset Password failed', message, 'error', 5000);
      dispatch(resetPasswordFailure(message));
    }
  };
};


const verifyAccountRequest = () => {
  return {
    type: AUTH_ACTION_TYPES.CHANGE_PASSWORD_REQUEST,
  };
};

const verifyAccountSuccess = () => {
  return {
    type: AUTH_ACTION_TYPES.CHANGE_PASSWORD_SUCCESS,
  };
};

const verifyAccountFailure = error => {
  return {
    type: AUTH_ACTION_TYPES.CHANGE_PASSWORD_FAILURE,
    payload: error,
  };
};

export const verifyAccount = (otp, token, navigation) => {
  return async dispatch => {
    dispatch(verifyAccountRequest());
    try {
      await axios({
        method: "PUT",
        data: otp,
        url: `${API_URL_CONSTANTS.BASE_SERVER_URL}/auth/verify/${token}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(verifyAccountSuccess());
      navigation.push(SCREEN_NAME_CONSTANTS.SIGN_IN_SCREEN);
      UTILS.showToast(
          'Account verified',
          'Account successfully verified. Login to continue',
          'success',
          5000);
  
    } catch (e) {
      const { message } = e.response.data;
      UTILS.showToast('Account Verification Failed', message, 'error', 5000);
      dispatch(verifyAccountFailure(message));
    }
  };
};


const updateProfileRequest = () => {
  return {
    type: AUTH_ACTION_TYPES.UPDATE_PROFILE_REQUEST,
  };
};

const updateProfileSuccess = data => {
  return {
    type: AUTH_ACTION_TYPES.UPDATE_PROFILE_SUCCESS,
    payload: data,
  };
};

const updateProfileFailure = error => {
  return {
    type: AUTH_ACTION_TYPES.UPDATE_PROFILE_FAILURE,
    payload: error,
  };
};

export const updateProfile = (user, token, navigation) => {
  return async dispatch => {
    dispatch(updateProfileRequest());
    try {
      const response = await axios({
        method: "PUT",
        data: user,
        url: `${API_URL_CONSTANTS.BASE_SERVER_URL}/auth/profile`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response, "response");
      const { data } = response.data;
      dispatch(updateProfileSuccess(data));
      navigation.push(SCREEN_NAME_CONSTANTS.MORE_SCREEN);
      UTILS.showToast(
          'Profile Updated',
          'Profile updated successfully.',
          'success',
          5000);
    } catch (e) {
      const { message } = e.response.data;
      if(e.response.message === 'jwt expired'){
        await AsyncStorage.removeItem(SECURE_STORAGE_CONSTANTS.SUSU_PLUS_TOKEN_KEY);
        await AsyncStorage.removeItem(SECURE_STORAGE_CONSTANTS.SUSU_PLUS_USER_DATA_KEY);
        dispatch(restoreToken());
      }
      UTILS.showToast('Update profile failed', message, 'error', 5000);
      dispatch(updateProfileFailure(message));
    }
  };
};


const changePasswordRequest = () => {
  return {
    type: AUTH_ACTION_TYPES.CHANGE_PASSWORD_REQUEST,
  };
};

const changePasswordSuccess = () => {
  return {
    type: AUTH_ACTION_TYPES.CHANGE_PASSWORD_SUCCESS,
  };
};

const changePasswordFailure = error => {
  return {
    type: AUTH_ACTION_TYPES.CHANGE_PASSWORD_FAILURE,
    payload: error,
  };
};

export const changePassword = (passwords, token, navigation) => {
  return async dispatch => {
    dispatch(changePasswordRequest());
    try {
      await axios({
        method: "PUT",
        data: passwords,
        url: `${API_URL_CONSTANTS.BASE_SERVER_URL}/auth/change-password`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(changePasswordSuccess());
      navigation.push(SCREEN_NAME_CONSTANTS.MORE_SCREEN);
      UTILS.showToast(
          'Password Changed',
          'Password changed successfully',
          'success',
          5000);
    } catch (e) {
      const { message } = e.response.data;
      if(e.response.message === 'jwt expired'){
        await AsyncStorage.removeItem(SECURE_STORAGE_CONSTANTS.SUSU_PLUS_TOKEN_KEY);
        await AsyncStorage.removeItem(SECURE_STORAGE_CONSTANTS.SUSU_PLUS_USER_DATA_KEY);
        dispatch(restoreToken());
      }
      UTILS.showToast('Update password failed', message, 'error', 5000);
      dispatch(changePasswordFailure(message));
    }
  };
};


const logoutRequest = () => {
  return {
    type: AUTH_ACTION_TYPES.LOGOUT_REQUEST,
  };
};

const logoutSuccess = () => {
  return {
    type: AUTH_ACTION_TYPES.LOGOUT_SUCCESS,
  };
};

const logoutFailure = error => {
  return {
    type: AUTH_ACTION_TYPES.LOGOUT_FAILURE,
    payload: error,
  };
};

export const logout = () => {
  return async dispatch => {
    dispatch(logoutRequest());
    try {
      await AsyncStorage.removeItem(SECURE_STORAGE_CONSTANTS.SUSU_PLUS_TOKEN_KEY);
      await AsyncStorage.removeItem(SECURE_STORAGE_CONSTANTS.SUSU_PLUS_USER_DATA_KEY);
      dispatch(logoutSuccess());
      dispatch(restoreToken());
    } catch (e) {
      const { message } = e.response.data;
      dispatch(logoutFailure(message));
    }
  };
};


const disableAccountRequest = () => {
  return {
    type: AUTH_ACTION_TYPES.DISABLE_ACCOUNT_REQUEST,
  };
};

const disableAccountSuccess = () => {
  return {
    type: AUTH_ACTION_TYPES.DISABLE_ACCOUNT_SUCCESS,
  };
};

const disableAccountFailure = error => {
  return {
    type: AUTH_ACTION_TYPES.DISABLE_ACCOUNT_FAILURE,
    payload: error,
  };
};

export const disableAccount = (token, navigator) => {
  return async dispatch => {
    dispatch(disableAccountRequest());
    try {
      await axios({
        method: "DELETE",
        url: `${API_URL_CONSTANTS.BASE_SERVER_URL}/auth/profile`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(disableAccountSuccess());
      navigator.push(SCREEN_NAME_CONSTANTS.SIGN_IN_SCREEN);
      UTILS.showToast(
          'Account Disabled',
          'Account disabled successfully verified. We are sorry to see you leave. We hope you come back',
          'success',
          5000);
    } catch (e) {
      const { message } = e.response.data;
      UTILS.showToast('Could not disable profile', message, 'error', 5000);
      dispatch(disableAccountFailure(message));
    }
  };
};


export const AUTH_ACTION_CREATORS = { updateProfile, changePassword, forgotPassword, resetPassword, verifyAccount };
