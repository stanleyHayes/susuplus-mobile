import { GROUP_PAYMENT_METHOD_ACTION_TYPES } from "./group-payment-method-action-types";

const INITIAL_STATE = {
    groupPaymentMethodLoading: false,
    groupPaymentMethods: [],
    groupPaymentMethodError: null,
};

const groupPaymentMethodReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        
        case GROUP_PAYMENT_METHOD_ACTION_TYPES.GET_GROUP_PAYMENT_METHODS_REQUEST:
            return {
                ...state,
                groupPaymentMethodError: null,
                groupPaymentMethodLoading: true,
            };
        
        case GROUP_PAYMENT_METHOD_ACTION_TYPES.GET_GROUP_PAYMENT_METHODS_SUCCESS:
            return {
                ...state,
                groupPaymentMethodError: null,
                groupPaymentMethodLoading: false,
                groupPaymentMethods: action.payload,
            };
        
        case GROUP_PAYMENT_METHOD_ACTION_TYPES.GET_GROUP_PAYMENT_METHODS_FAILURE:
            return {
                ...state,
                groupPaymentMethodError: action.payload,
                groupPaymentMethodLoading: false,
                groupPaymentMethods: [],
            };
        
        
        case GROUP_PAYMENT_METHOD_ACTION_TYPES.ADD_GROUP_PAYMENT_METHOD_REQUEST:
            return {
                ...state,
                groupPaymentMethodError: null,
                groupPaymentMethodLoading: true,
            };
        
        case GROUP_PAYMENT_METHOD_ACTION_TYPES.ADD_GROUP_PAYMENT_METHOD_SUCCESS:
            return {
                ...state,
                groupPaymentMethodError: null,
                groupPaymentMethodLoading: false,
                groupPaymentMethods: [...state.groupPaymentMethods, action.payload],
            };
        
        case GROUP_PAYMENT_METHOD_ACTION_TYPES.ADD_GROUP_PAYMENT_METHOD_FAILURE:
            return {
                ...state,
                groupPaymentMethodError: action.payload,
                groupPaymentMethodLoading: false,
            };
        
        default:
            return state;
        
    }
};

export const selectGroupPaymentMethods = state => state.groupPaymentMethods;

export default groupPaymentMethodReducer;
