import { dashboardData } from "./dashboard-data";
import { DASHBOARD_ACTION_TYPES } from "./dashboard-action-types";

const INITIAL_STATE = {
  dashboardLoading: false,
  dashboard: { ...dashboardData },
  dashboardError: null,
};

const dashboardReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case DASHBOARD_ACTION_TYPES.GET_DASHBOARD_REQUEST:
      return {
        ...state,
        dashboardLoading: false,
        dashboardError: null
      }
  
    case DASHBOARD_ACTION_TYPES.GET_DASHBOARD_SUCCESS:
      return {
        ...state,
        dashboardLoading: false,
        dashboardError: null,
        dashboard: action.payload
      }
  
    case DASHBOARD_ACTION_TYPES.GET_DASHBOARD_FAILURE:
      return {
        ...state,
        dashboardLoading: true,
        dashboardError: action.payload,
        dashboard: null
      }
    default:
      return state;

  }
};

export const selectDashboard = state => state.dashboard;

export default dashboardReducer;
