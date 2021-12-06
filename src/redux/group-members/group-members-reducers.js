import { GROUP_MEMBER_ACTION_TYPES } from "./group-members-action-types";

const INITIAL_STATE = {
  groupMemberLoading: false,
  groupMembers: [],
  groupMemberError: null,
  groupsOfUser: []
};

const groupMembersReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case GROUP_MEMBER_ACTION_TYPES.GET_GROUPS_OF_USER_REQUEST:
      return {
        ...state,
        groupMemberError: null,
        groupMemberLoading: true
      }

    case GROUP_MEMBER_ACTION_TYPES.GET_GROUPS_OF_USER_SUCCESS:
      return {
        ...state,
        groupMemberError: null,
        groupMemberLoading: false,
        groupsOfUser: action.payload
      }

    case GROUP_MEMBER_ACTION_TYPES.GET_GROUPS_OF_USER_FAILURE:
      return {
        ...state,
        groupMemberError: action.payload,
        groupMemberLoading: false,
        groupsOfUser: []
      }

    case GROUP_MEMBER_ACTION_TYPES.GET_GROUP_MEMBERS_REQUEST:
      return {
        ...state,
        groupMemberError: null,
        groupMemberLoading: true
      }

    case GROUP_MEMBER_ACTION_TYPES.GET_GROUP_MEMBERS_SUCCESS:
      return {
        ...state,
        groupMemberError: null,
        groupMemberLoading: false,
        groupMembers: action.payload
      }

    case GROUP_MEMBER_ACTION_TYPES.GET_GROUP_MEMBERS_FAILURE:
      return {
        ...state,
        groupMemberError: action.payload,
        groupMemberLoading: false,
        groupMembers: []
      }
    default:
      return state;

  }
};

export const selectGroupMembers = state => state.groupMembers;

export default groupMembersReducer;
