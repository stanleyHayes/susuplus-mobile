import { INVITATIONS_ACTION_TYPE } from "./group-invites-action-types";

const INITIAL_STATE = {
    inviteLoading: false,
    invites: [],
    inviteError: null,
};

const groupInvitesReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        
        case INVITATIONS_ACTION_TYPE.GET_INVITATIONS_REQUEST:
            return {
                ...state,
                inviteError: null,
                inviteLoading: true,
            };
        
        case INVITATIONS_ACTION_TYPE.GET_INVITATIONS_SUCCESS:
            return {
                ...state,
                inviteError: null,
                inviteLoading: false,
                invites: action.payload,
            };
        case INVITATIONS_ACTION_TYPE.GET_INVITATIONS_FAILURE:
            return {
                ...state,
                inviteError: null,
                inviteLoading: false,
                invites: [],
            };
        
        
        case INVITATIONS_ACTION_TYPE.CREATE_INVITATION_REQUEST:
            return {
                ...state,
                inviteError: null,
                inviteLoading: true,
            };
        
        case INVITATIONS_ACTION_TYPE.CREATE_INVITATION_SUCCESS:
            return {
                ...state,
                inviteError: null,
                inviteLoading: false,
                invites: [...state.invites, ...action.payload],
            };
        
        case INVITATIONS_ACTION_TYPE.CREATE_INVITATION_FAILURE:
            return {
                ...state,
                inviteError: null,
                inviteLoading: false,
            };
        
        
        case INVITATIONS_ACTION_TYPE.ACCEPT_INVITATION_REQUEST:
            return {
                ...state,
                inviteError: null,
                inviteLoading: true,
            };
        
        case INVITATIONS_ACTION_TYPE.ACCEPT_INVITATION_SUCCESS:
            return {
                ...state,
                inviteError: null,
                inviteLoading: false,
                invites: [...state.invites.map(invitation => {
                    if (invitation._id === action.payload._id)
                        return { ...action.payload };
                    return invitation;
                })],
            };
        
        
        case INVITATIONS_ACTION_TYPE.ACCEPT_INVITATION_FAILURE:
            return {
                ...state,
                inviteError: null,
                inviteLoading: false,
                invites: [],
            };
        
        case INVITATIONS_ACTION_TYPE.DECLINE_INVITATION_REQUEST:
            return {
                ...state,
                inviteError: null,
                inviteLoading: true,
            };
        
        case INVITATIONS_ACTION_TYPE.DECLINE_INVITATION_SUCCESS:
            return {
                ...state,
                inviteError: null,
                inviteLoading: false,
                invites: [...state.invites.map(invitation => {
                    if (invitation._id === action.payload._id)
                        return { ...action.payload };
                    return invitation;
                })],
            };
        case INVITATIONS_ACTION_TYPE.DECLINE_INVITATION_FAILURE:
            return {
                ...state,
                inviteError: null,
                inviteLoading: false,
            };
        default:
            return state;
        
    }
};

export const selectInvites = state => state.groupInvites;

export default groupInvitesReducer;
