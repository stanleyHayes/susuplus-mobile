import { DASHBOARD_ACTION_TYPES } from "./dashboard-action-types";
import axios from "axios";
import { API_URL_CONSTANTS, SECURE_STORAGE_CONSTANTS } from "../../constants/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SPLASH_ACTION_CREATORS } from "../splash/splash-action-creators";

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
            if(message === 'jwt expired'){
                await AsyncStorage.removeItem(SECURE_STORAGE_CONSTANTS.SUSU_PLUS_TOKEN_KEY);
                await AsyncStorage.removeItem(SECURE_STORAGE_CONSTANTS.SUSU_PLUS_USER_DATA_KEY);
                dispatch(SPLASH_ACTION_CREATORS.restoreToken());
            }
            dispatch(getDashboardFailure(message));
        }
    }
}


const changePeriodRequest = () => {
    return {
        type: DASHBOARD_ACTION_TYPES.CHANGE_PERIOD_REQUEST
    }
}

const changePeriodSuccess = data => {
    return {
        type: DASHBOARD_ACTION_TYPES.CHANGE_PERIOD_SUCCESS,
        payload: data
    }
}

const changePeriodFailure = message => {
    return {
        type: DASHBOARD_ACTION_TYPES.CHANGE_PERIOD_FAILURE,
        payload: message
    }
}

const changePeriod = period => {
    return async dispatch => {
        try {
            dispatch(changePeriodRequest());
            await AsyncStorage.setItem(SECURE_STORAGE_CONSTANTS.SUSU_PLUS_PERIOD_TYPE, period);
            dispatch(changePeriodSuccess(period));
        }catch (e) {
            const {message} = e.response.data;
            dispatch(changePeriodFailure(message));
        }
    }
}


const changeGraphTypeRequest = () => {
    return {
        type: DASHBOARD_ACTION_TYPES.CHANGE_GRAPH_TYPE_REQUEST
    }
}

const changeGraphTypeSuccess = data => {
    return {
        type: DASHBOARD_ACTION_TYPES.CHANGE_GRAPH_TYPE_SUCCESS,
        payload: data
    }
}

const changeGraphTypeFailure = message => {
    return {
        type: DASHBOARD_ACTION_TYPES.CHANGE_PERIOD_FAILURE,
        payload: message
    }
}

const changeGraphType = graphType => {
    return async dispatch => {
        try {
            dispatch(changeGraphTypeRequest());
            await AsyncStorage.setItem(SECURE_STORAGE_CONSTANTS.SUSU_PLUS_GRAPH_TYPE, graphType);
            dispatch(changeGraphTypeSuccess(graphType));
        }catch (e) {
            const {message} = e.response.data;
            dispatch(changeGraphTypeFailure(message));
        }
    }
}


export const DASHBOARD_ACTION_CREATORS = {getDashboard, changePeriod, changeGraphType};
