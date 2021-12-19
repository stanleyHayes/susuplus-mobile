import { DASHBOARD_ACTION_TYPES } from "./dashboard-action-types";
import axios from "axios";
import { API_URL_CONSTANTS } from "../../constants/constants";

const getDashboardRequest = () => {
    return {
        type: DASHBOARD_ACTION_TYPES.GET_DASHBOARD_REQUEST
    }
}

const getDashboardSuccess = data => {
    return {
        type: DASHBOARD_ACTION_TYPES.GET_DASHBOARD_SUCCESS,
        payload: data
    }
}

const getDashboardFailure = message => {
    return {
        type: DASHBOARD_ACTION_TYPES.GET_DASHBOARD_FAILURE,
        payload: message
    }
}

const getDashboard = (token) => {
    return async dispatch => {
        try {
            dispatch(getDashboardRequest());
            const response = await axios({
                method: 'GET',
                url: `${API_URL_CONSTANTS.BASE_SERVER_URL}/dashboard`,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const {data} = response.data;
            dispatch(getDashboardSuccess(data));
        }catch (e) {
            const {message} = e.response.data;
            dispatch(getDashboardFailure(message));
        }
    }
}

export const DASHBOARD_ACTION_CREATORS = {getDashboard};
