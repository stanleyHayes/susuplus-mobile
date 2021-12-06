import { PAYMENT_METHOD_ACTION_TYPES } from "./payment-method-action-types";

const INITIAL_STATE = {
  paymentMethodLoading: false,
  paymentMethods: [],
  paymentMethodError: null,
  paymentMethodDetail: null
};

const paymentMethodReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case PAYMENT_METHOD_ACTION_TYPES.GET_PAYMENT_METHODS_REQUEST:
      return {
        ...state,
        paymentMethodError: null,
        paymentMethodLoading: true
      }

    case PAYMENT_METHOD_ACTION_TYPES.GET_PAYMENT_METHODS_SUCCESS:
      return {
        ...state,
        paymentMethodError: null,
        paymentMethodLoading: false,
        paymentMethods: action.payload,
        paymentMethodDetail: null
      }

    case PAYMENT_METHOD_ACTION_TYPES.GET_PAYMENT_METHODS_FAILURE:
      return {
        ...state,
        paymentMethodError: action.payload,
        paymentMethodLoading: false,
        paymentMethods: [],
        paymentMethodDetail: null
      }

    case PAYMENT_METHOD_ACTION_TYPES.GET_PAYMENT_METHOD_REQUEST:
      return {
        ...state,
        paymentMethodError: null,
        paymentMethodLoading: true
      }

    case PAYMENT_METHOD_ACTION_TYPES.GET_PAYMENT_METHOD_SUCCESS:
      return {
        ...state,
        paymentMethodError: null,
        paymentMethodLoading: false,
        paymentMethodDetail: action.payload
      }

    case PAYMENT_METHOD_ACTION_TYPES.GET_PAYMENT_METHOD_FAILURE:
      return {
        ...state,
        paymentMethodError: action.payload,
        paymentMethodLoading: false,
        paymentMethodDetail: null
      }


    case PAYMENT_METHOD_ACTION_TYPES.ADD_PAYMENT_METHOD_REQUEST:
      return {
        ...state,
        paymentMethodError: null,
        paymentMethodLoading: true
      }

    case PAYMENT_METHOD_ACTION_TYPES.ADD_PAYMENT_METHOD_SUCCESS:
      return {
        ...state,
        paymentMethodError: null,
        paymentMethodLoading: false,
        paymentMethods: [...state.paymentMethods, action.payload],
        paymentMethodDetail: null
      }

    case PAYMENT_METHOD_ACTION_TYPES.ADD_PAYMENT_METHOD_FAILURE:
      return {
        ...state,
        paymentMethodError: action.payload,
        paymentMethodLoading: false,
        paymentMethodDetail: null
      }

    default:
      return state;

  }
};

export const selectPaymentMethods = state => state.paymentMethods;

export default paymentMethodReducer;
