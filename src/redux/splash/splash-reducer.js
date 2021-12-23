import { SPLASH_ACTION_TYPES } from "./splash-action-types";

const INITIAL_STATE = {
  appLoading: true,
};

const splashReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SPLASH_ACTION_TYPES.RESTORE_TOKEN_REQUEST:
      return {
        ...state,
        appLoading: true
      }

    case SPLASH_ACTION_TYPES.RESTORE_TOKEN_SUCCESS:
      return {
        ...state,
        appLoading: false,
      }

    case SPLASH_ACTION_TYPES.RESTORE_TOKEN_FAILURE:
      return {
        ...state,
        appLoading: false,
      }
    default:
      return state;
  }
}

export const selectSplash = state => state.splash;

export default splashReducer;
