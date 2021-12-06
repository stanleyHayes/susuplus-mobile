import { dashboardData } from "./dashboard-data";

const INITIAL_STATE = {
  dashboardLoading: false,
  dashboard: { ...dashboardData },
  dashboardError: null,
};

const dashboardReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {

    default:
      return state;

  }
};

export const selectDashboard = state => state.dashboard;

export default dashboardReducer;
