import { SUSU_ACTION_TYPES } from "./susu-action-types";

const INITIAL_STATE = {
    susuLoading: true,
    susus: [],
    susuError: null,
    susuDetail: null,
    createSusuPage: 0,
    createSusuBasicInfo: {
        startDate: new Date()
    },
    createSusuMembers: [],
    createSusuRegulations: [],
};

const susuReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        
        case SUSU_ACTION_TYPES.GET_SUSU_GROUP_REQUEST:
            return {
                ...state,
                susuLoading: true,
                susuError: null
            }
        
        case SUSU_ACTION_TYPES.GET_SUSU_GROUP_SUCCESS:
            return {
                ...state,
                susuLoading: false,
                susuError: null,
                susuDetail: action.payload
            }
        case SUSU_ACTION_TYPES.GET_SUSU_GROUP_FAILURE:
            return {
                ...state,
                susuLoading: false,
                susuError: action.payload,
                susuDetail: null
            }
        
        case SUSU_ACTION_TYPES.SAVE_SUSU_BASIC_INFO:
            return {
                ...state,
                createSusuBasicInfo: action.payload
            }
        
        case SUSU_ACTION_TYPES.SUSU_GO_TO_NEXT_PAGE:
            return {
                ...state,
                createSusuPage: state.createSusuPage + 1
            }
        
        case SUSU_ACTION_TYPES.SUSU_GO_TO_PREVIOUS_PAGE:
            return {
                ...state,
                createSusuPage: state.createSusuPage - 1
            }
        
        
        case SUSU_ACTION_TYPES.ADD_SUSU_MEMBERS:
            return {
                ...state,
                createSusuMembers: action.payload
            }
        
        case SUSU_ACTION_TYPES.ADD_SUSU_REGULATIONS:
            return {
                ...state,
                createSusuRegulations: action.payload
            }
            
        case SUSU_ACTION_TYPES.CREATE_SUSU_REQUEST:
            return {
                ...state,
                susuLoading: true,
                susuError: null
            }
    
        case SUSU_ACTION_TYPES.CREATE_SUSU_SUCCESS:
            return {
                ...state,
                susuLoading: false,
                susuError: null
            }
    
    
        case SUSU_ACTION_TYPES.CREATE_SUSU_FAILURE:
            return {
                ...state,
                susuLoading: false,
                susuError: action.payload
            }
    
        default:
            return state;
    }
};

export const selectSusu = state => state.susus;

export default susuReducer;
