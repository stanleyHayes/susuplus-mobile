import { SUSU_MEMBER_ACTION_TYPES } from "./susu-members-action-types";

const INITIAL_STATE = {
  susuMemberLoading: true,
  susuMembers: [],
  susuMemberError: null,
  susuGroupsOfUser: [],
};

const susuMembersReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case SUSU_MEMBER_ACTION_TYPES.GET_SUSU_GROUPS_OF_USER_REQUEST:
      return {
        ...state,
        susuMemberError: null,
        susuMemberLoading: true,
      };

    case SUSU_MEMBER_ACTION_TYPES.GET_SUSU_GROUPS_OF_USER_SUCCESS:
      return {
        ...state,
        susuMemberError: null,
        susuMemberLoading: false,
        susuGroupsOfUser: action.payload,
      };

    case SUSU_MEMBER_ACTION_TYPES.GET_SUSU_GROUPS_OF_USER_FAILURE:
      return {
        ...state,
        susuMemberError: action.payload,
        susuMemberLoading: false,
        susuGroupsOfUser: [],
      };

    case SUSU_MEMBER_ACTION_TYPES.GET_SUSU_MEMBERS_REQUEST:
      return {
        ...state,
        susuMemberError: null,
        susuMemberLoading: true,
      };

    case SUSU_MEMBER_ACTION_TYPES.GET_SUSU_MEMBERS_SUCCESS:
      console.log(action.payload);
      return {
        ...state,
        susuMemberError: null,
        susuMemberLoading: false,
        susuMembers: action.payload,
      };

    case SUSU_MEMBER_ACTION_TYPES.GET_SUSU_MEMBERS_FAILURE:
      return {
        ...state,
        susuMemberError: action.payload,
        susuMemberLoading: false,
        susuMembers: [],
      };
    default:
      return state;

  }
};

export const selectSusuGroupMembers = state => state.susuMembers;

export default susuMembersReducer;
