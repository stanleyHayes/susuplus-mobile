import { AUTH_ACTION_TYPES } from "./auth-action-types";

const INITIAL_STATE = {
  authToken: null,
  authLoading: false,
  authError: null,
  userData: {},
  resetPasswordToken: null,
  signUpToken: null,
  splashLoading: true
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  
    case AUTH_ACTION_TYPES.VERIFY_ACCOUNT_REQUEST:
      return {
        ...state,
        authLoading: true,
        authError: null
      }
  
    case AUTH_ACTION_TYPES.VERIFY_ACCOUNT_SUCCESS:
      return {
        ...state,
        authLoading: false,
        authError: null,
        signUpToken: null,
      }
  
    case AUTH_ACTION_TYPES.VERIFY_ACCOUNT_FAILURE:
      return {
        ...state,
        authLoading: false,
        authError: action.payload
      }
      
    case AUTH_ACTION_TYPES.RESTORE_TOKEN_REQUEST:
      return {
        ...state,
        splashLoading: true
      }

    case AUTH_ACTION_TYPES.RESTORE_TOKEN_SUCCESS:
      return {
        ...state,
        splashLoading: false,
        authError: null,
        authToken: action.payload.authToken,
        userData: action.payload.userData
      }

    case AUTH_ACTION_TYPES.RESTORE_TOKEN_FAILURE:
      return {
        ...state,
        splashLoading: false,
        authError: action.payload,
        authToken: null,
        userData: {}
      }

    case AUTH_ACTION_TYPES.SIGN_IN_REQUEST:
      return {
        ...state,
        authLoading: true,
        authError: null
      }

    case AUTH_ACTION_TYPES.SIGN_IN_SUCCESS:
      return {
        ...state,
        authLoading: false,
        authError: null,
        authToken: action.payload.token,
        userData: action.payload.userData
      }

    case AUTH_ACTION_TYPES.SIGN_IN_FAILURE:
      return {
        ...state,
        authLoading: false,
        authError: action.payload,
        authToken: null,
        userData: {}
      }
      
    case AUTH_ACTION_TYPES.SIGN_UP_REQUEST:
      return {
        ...state,
        authLoading: true,
        authError: null
      }

    case AUTH_ACTION_TYPES.SIGN_UP_SUCCESS:
      return {
        ...state,
        authLoading: false,
        authError: null,
        signUpToken: action.payload
      }

    case AUTH_ACTION_TYPES.SIGN_UP_FAILURE:
      return {
        ...state,
        authLoading: false,
        authError: action.payload,
        signUpToken: null,
        userData: {}
      }

    case AUTH_ACTION_TYPES.UPDATE_PROFILE_REQUEST:
      return {
        ...state,
        authLoading: true,
        authError: null
      }

    case AUTH_ACTION_TYPES.UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        authLoading: false,
        authError: null,
        userData: action.payload
      }

    case AUTH_ACTION_TYPES.UPDATE_PROFILE_FAILURE:
      return {
        ...state,
        authLoading: false,
        authError: action.payload
      }

    case AUTH_ACTION_TYPES.FORGOT_PASSWORD_REQUEST:
      return {
        ...state,
        authLoading: true,
        authError: null
      }

    case AUTH_ACTION_TYPES.FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        authLoading: false,
        authError: null,
        resetPasswordToken: action.payload
      }

    case AUTH_ACTION_TYPES.FORGOT_PASSWORD_FAILURE:
      return {
        ...state,
        authLoading: false,
        authError: action.payload,
        authToken: null
      }

    case AUTH_ACTION_TYPES.RESET_PASSWORD_REQUEST:
      return {
        ...state,
        authLoading: true,
        authError: null
      }

    case AUTH_ACTION_TYPES.RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        authLoading: false,
        authError: null
      }

    case AUTH_ACTION_TYPES.RESET_PASSWORD_FAILURE:
      return {
        ...state,
        authLoading: false,
        authError: action.payload
      }
      
    case AUTH_ACTION_TYPES.GET_PROFILE_REQUEST:
      return {
        ...state,
        authLoading: true,
        authError: null
      }
      
    case AUTH_ACTION_TYPES.GET_PROFILE_SUCCESS:
      return {
        ...state,
        authLoading: false,
        authError: null,
        userData: action.payload.user,
        authToken: action.payload.token
      }
  
    case AUTH_ACTION_TYPES.GET_PROFILE_FAILURE:
      return {
        ...state,
        authLoading: false,
        authError: action.payload
      }
  
    case AUTH_ACTION_TYPES.LOGOUT_REQUEST:
      return {
        ...state,
        authLoading: true,
        authError: null
      }
  
    case AUTH_ACTION_TYPES.LOGOUT_SUCCESS:
      return {
        ...state,
        authLoading: false,
        authError: null
      }
  
    case AUTH_ACTION_TYPES.LOGOUT_FAILURE:
      return {
        ...state,
        authLoading: false,
        authError: action.payload
      }
    default:
      return state;
  }
}

export const selectAuth = state => state.auth;

export default authReducer;
