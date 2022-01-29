import { combineReducers } from "redux";
import authReducer from "./auth/auth-reducer";
import groupReducer from "./groups/group-reducers";
import susuReducer from "./susu/susu-reducer";
import dashboardReducer from "./dashboard/dashboard-reducer";
import paymentMethodReducer from "./payment-methods/payment-method-reducers";
import groupInvitesReducer from "./invites/group-invites-reducers";
import susuMembersReducer from "./susu-members/susu-members-reducers";
import groupMembersReducer from "./group-members/group-members-reducers";
import susuDisbursementReducer from "./susu-disbursements/susu-disbursement-reducers";
import groupDisbursementReducer from "./group-disbursements/group-disbursement-reducers";
import groupContributionReducer from "./group-contributions/group-contribution-reducers";
import susuContributionReducer from "./susu-contributions/susu-contribution-reducers";
import userContributionReducer from "./user-contributions/user-contribution-reducers";
import userDisbursementReducer from "./user-disbursements/user-disbursement-reducers";
import groupPaymentMethodReducer from "./group-payment-methods/group-payment-method-reducers";
import userReducers from "./users/user-reducers";

const rootReducer = combineReducers({
  auth: authReducer,
  groups: groupReducer,
  susus: susuReducer,
  dashboard: dashboardReducer,
  userDisbursements: userDisbursementReducer,
  userContributions: userContributionReducer,
  paymentMethods: paymentMethodReducer,
  groupInvites: groupInvitesReducer,
  susuMembers: susuMembersReducer,
  groupMembers: groupMembersReducer,
  susuDisbursements: susuDisbursementReducer,
  groupDisbursements: groupDisbursementReducer,
  groupContributions: groupContributionReducer,
  susuContributions: susuContributionReducer,
  groupPaymentMethods: groupPaymentMethodReducer,
  users: userReducers
});

export default rootReducer;
