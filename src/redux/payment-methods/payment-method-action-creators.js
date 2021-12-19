import { PAYMENT_METHOD_ACTION_TYPES } from "./payment-method-action-types";
import axios from "axios";
import { API_URL_CONSTANTS, SCREEN_NAME_CONSTANTS } from "../../constants/constants";
import { UTILS } from "../../utils/utils";

const addPaymentMethodRequest = () => {
  return {
    type: PAYMENT_METHOD_ACTION_TYPES.ADD_PAYMENT_METHOD_REQUEST,
  };
};

const addPaymentMethodSuccess = data => {
  return {
    type: PAYMENT_METHOD_ACTION_TYPES.ADD_PAYMENT_METHOD_SUCCESS,
    payload: data,
  };
};

const addPaymentMethodFailure = message => {
  return {
    type: PAYMENT_METHOD_ACTION_TYPES.ADD_PAYMENT_METHOD_FAILURE,
    payload: message,
  };
};

const addPaymentMethod = (paymentMethod, token, navigation) => {
  console.log(paymentMethod)
  return async dispatch => {
    try {
      dispatch(addPaymentMethodRequest());
      const response = await axios({
        method: "POST",
        url: `${API_URL_CONSTANTS.BASE_SERVER_URL}/payment-methods?ownership=Individual`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: paymentMethod,
      });

      const { data, message } = response.data;
      dispatch(addPaymentMethodSuccess(data));
      navigation.navigate(SCREEN_NAME_CONSTANTS.PAYMENT_METHODS_SCREEN);
      UTILS.showToast(
          'Payment Method Added',
          message,
          'success',
          5000);
    } catch (e) {
      const { message } = e.response.data;
      UTILS.showToast('Error', message, 'error', 5000);
      dispatch(addPaymentMethodFailure(message));
    }
  };
};


const getPaymentMethodRequest = () => {
  return {
    type: PAYMENT_METHOD_ACTION_TYPES.GET_PAYMENT_METHOD_REQUEST,
  };
};

const getPaymentMethodSuccess = data => {
  return {
    type: PAYMENT_METHOD_ACTION_TYPES.GET_PAYMENT_METHOD_SUCCESS,
    payload: data,
  };
};

const getPaymentMethodFailure = message => {
  return {
    type: PAYMENT_METHOD_ACTION_TYPES.GET_PAYMENT_METHOD_FAILURE,
    payload: message,
  };
};

const getPaymentMethod = (paymentMethodID, token) => {
  return async dispatch => {
    try {
      dispatch(getPaymentMethodRequest());
      const response = await axios({
        method: "GET",
        url: `${API_URL_CONSTANTS.BASE_SERVER_URL}/payment-methods/${paymentMethodID}?ownership=Individual`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const { data } = response.data;
      dispatch(getPaymentMethodSuccess(data));
    } catch (e) {
      const { message } = e.response.data;
      dispatch(getPaymentMethodFailure(message));
    }
  };
};


const getPaymentMethodsRequest = () => {
  return {
    type: PAYMENT_METHOD_ACTION_TYPES.GET_PAYMENT_METHODS_REQUEST,
  };
};

const getPaymentMethodsSuccess = data => {
  return {
    type: PAYMENT_METHOD_ACTION_TYPES.GET_PAYMENT_METHODS_SUCCESS,
    payload: data,
  };
};

const getPaymentMethodsFailure = message => {
  return {
    type: PAYMENT_METHOD_ACTION_TYPES.GET_PAYMENT_METHODS_FAILURE,
    payload: message,
  };
};

const getPaymentMethods = (token) => {
  return async dispatch => {
    try {
      dispatch(getPaymentMethodsRequest());
      const response = await axios({
        method: "GET",
        url: `${API_URL_CONSTANTS.BASE_SERVER_URL}/payment-methods?ownership=Individual`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { data } = response.data;
      dispatch(getPaymentMethodsSuccess(data));
    } catch (e) {
      const { message } = e.response.data;
      dispatch(getPaymentMethodsFailure(message));
    }
  };
};


const updatePaymentMethodRequest = () => {
  return {
    type: PAYMENT_METHOD_ACTION_TYPES.UPDATE_PAYMENT_METHOD_REQUEST,
  };
};

const updatePaymentMethodSuccess = data => {
  return {
    type: PAYMENT_METHOD_ACTION_TYPES.UPDATE_PAYMENT_METHOD_SUCCESS,
    payload: data,
  };
};

const updatePaymentMethodFailure = message => {
  return {
    type: PAYMENT_METHOD_ACTION_TYPES.UPDATE_PAYMENT_METHOD_FAILURE,
    payload: message,
  };
};

const updatePaymentMethod = (paymentMethodID, paymentMethod, token) => {
  return async dispatch => {
    try {
      dispatch(updatePaymentMethodRequest());
      const response = await axios({
        method: "PUT",
        url: `${API_URL_CONSTANTS.BASE_SERVER_URL}/payment-methods/${paymentMethodID}?ownership=Individual`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: paymentMethod,
      });

      const { data } = response.data;
      dispatch(updatePaymentMethodSuccess(data));
    } catch (e) {
      const { message } = e.response.data;
      dispatch(updatePaymentMethodFailure(message));
    }
  };
};


const removePaymentMethodRequest = () => {
  return {
    type: PAYMENT_METHOD_ACTION_TYPES.REMOVE_PAYMENT_METHOD_REQUEST,
  };
};

const removePaymentMethodSuccess = data => {
  return {
    type: PAYMENT_METHOD_ACTION_TYPES.REMOVE_PAYMENT_METHOD_SUCCESS,
    payload: data,
  };
};

const removePaymentMethodFailure = message => {
  return {
    type: PAYMENT_METHOD_ACTION_TYPES.REMOVE_PAYMENT_METHOD_FAILURE,
    payload: message,
  };
};

const removePaymentMethod = (paymentMethodID, token, query) => {
  return async dispatch => {
    try {
      dispatch(removePaymentMethodRequest());
      const response = await axios({
        method: "DELETE",
        url: `${API_URL_CONSTANTS.BASE_SERVER_URL}/payment-methods/${paymentMethodID}?${query}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { data } = response.data;
      dispatch(removePaymentMethodSuccess(data));
    } catch (e) {
      const { message } = e.response.data;
      dispatch(removePaymentMethodFailure(message));
    }
  };
};

export const PAYMENT_METHOD_ACTION_CREATORS = {
  addPaymentMethod, removePaymentMethod, updatePaymentMethod, getPaymentMethods, getPaymentMethod,
};
