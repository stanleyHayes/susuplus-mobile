import { GROUP_PAYMENT_METHOD_ACTION_TYPES } from "./group-payment-method-action-types";
import axios from "axios";
import { API_URL_CONSTANTS, SCREEN_NAME_CONSTANTS } from "../../constants/constants";

const getGroupPaymentMethodsRequest = () => {
  return {
    type: GROUP_PAYMENT_METHOD_ACTION_TYPES.GET_GROUP_PAYMENT_METHODS_REQUEST,
  };
};

const getGroupPaymentMethodsSuccess = data => {
  return {
    type: GROUP_PAYMENT_METHOD_ACTION_TYPES.GET_GROUP_PAYMENT_METHODS_SUCCESS,
    payload: data,
  };
};

const getGroupPaymentMethodsFailure = message => {
  return {
    type: GROUP_PAYMENT_METHOD_ACTION_TYPES.GET_GROUP_PAYMENT_METHODS_FAILURE,
    payload: message,
  };
};

const getGroupPaymentMethods = (token, groupID) => {
  return async dispatch => {
    try {
      dispatch(getGroupPaymentMethodsRequest());
      const response = await axios({
        method: "GET",
        url: `${API_URL_CONSTANTS.BASE_SERVER_URL}/payment-methods?ownership=Group&group=${groupID}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const { data } = response.data;
      dispatch(getGroupPaymentMethodsSuccess(data));
    } catch (e) {
      const { message } = e.response.data;
      dispatch(getGroupPaymentMethodsFailure(message));
    }
  };
};

const addGroupPaymentMethodRequest = () => {
  return {
    type: GROUP_PAYMENT_METHOD_ACTION_TYPES.ADD_GROUP_PAYMENT_METHOD_REQUEST,
  };
};

const addGroupPaymentMethodSuccess = data => {
  return {
    type: GROUP_PAYMENT_METHOD_ACTION_TYPES.ADD_GROUP_PAYMENT_METHOD_SUCCESS,
    payload: data,
  };
};

const addGroupPaymentMethodsFailure = message => {
  return {
    type: GROUP_PAYMENT_METHOD_ACTION_TYPES.ADD_GROUP_PAYMENT_METHOD_FAILURE,
    payload: message,
  };
};

const addGroupPaymentMethod = (token, paymentMethod, groupID, navigation) => {
  console.log(paymentMethod)
  return async dispatch => {
    try {
      dispatch(addGroupPaymentMethodRequest());
      const response = await axios({
        method: "POST",
        url: `${API_URL_CONSTANTS.BASE_SERVER_URL}/payment-methods?ownership=Group&group=${groupID}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: paymentMethod
      });
      
      const { data } = response.data;
      dispatch(addGroupPaymentMethodSuccess(data));
      navigation.navigate(SCREEN_NAME_CONSTANTS.GROUP_PAYMENT_METHODS, {groupID})
    } catch (e) {
      const { message } = e.response.data;
      dispatch(addGroupPaymentMethodsFailure(message));
    }
  };
};

export const GROUP_PAYMENT_METHOD_ACTION_CREATORS = {
  getGroupPaymentMethods, addGroupPaymentMethod
};
