import { GROUP_ACTION_TYPES } from "./group-action-types";

const INITIAL_STATE = {
  groupLoading: false,
  groups: [],
  groupMembers: [],
  groupError: null,
  groupDetail: null,
  createGroupPage: 0,
  createGroupBasicInfo: {},
  createGroupRegulations: [],
  createGroupInvitations: [],
  createGroupPaymentMethod: {
    mobileMoneyAccount: {},
    bankAccount: {},
    card: {}
  }
};

const groupReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case GROUP_ACTION_TYPES.GET_GROUP_REQUEST:
      return {
        ...state,
        groupLoading: true,
        groupError: null
      }

    case GROUP_ACTION_TYPES.GET_GROUP_SUCCESS:
      return {
        ...state,
        groupLoading: false,
        groupError: null,
        groupDetail: action.payload.group,
        groupMembers: action.payload.members
      }
    case GROUP_ACTION_TYPES.GET_GROUP_FAILURE:
      return {
        ...state,
        groupLoading: false,
        groupError: action.payload,
        groupDetail: null,
        groupMembers: []
      }

    case GROUP_ACTION_TYPES.SAVE_GROUP_BASIC_INFO:
      return {
        ...state,
        createGroupBasicInfo: action.payload
      }

    case GROUP_ACTION_TYPES.GROUP_GO_TO_NEXT_PAGE:
      return {
        ...state,
        createGroupPage: state.createGroupPage + 1
      }

    case GROUP_ACTION_TYPES.GROUP_GO_TO_PREVIOUS_PAGE:
      return {
        ...state,
        createGroupPage: state.createGroupPage - 1
      }

    case GROUP_ACTION_TYPES.GROUP_GO_TO_PAGE:
      return {
        ...state,
        createGroupPage: action.payload
      }

    case GROUP_ACTION_TYPES.SAVE_GROUP_REGULATIONS:
      return {
        ...state,
        createGroupRegulations: action.payload
      }

    case GROUP_ACTION_TYPES.SAVE_GROUP_INVITATIONS:
      return {
        ...state,
        createGroupInvitations: action.payload
      }

      case GROUP_ACTION_TYPES.SAVE_PAYMENT_INFO:
      return {
        ...state,
        createGroupPaymentMethod: action.payload
      }

    case GROUP_ACTION_TYPES.CREATE_GROUP_REQUEST:
      return {
        ...state,
        groupLoading: true,
        groupError: null
      }

    case GROUP_ACTION_TYPES.CREATE_GROUP_SUCCESS:
      return {
        ...state,
        groupLoading: false,
        groupError: null,
      }
    case GROUP_ACTION_TYPES.CREATE_GROUP_FAILURE:
      return {
        ...state,
        groupLoading: false,
        groupError: action.payload,
      }
    default:
      return state;

  }
};

export const selectGroups = state => state.groups;

export default groupReducer;
