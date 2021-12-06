const SIGN_IN_SCREEN = "SIGN_IN_SCREEN";
const SIGN_UP_SCREEN = "SIGN_UP_SCREEN";
const FORGOT_PASSWORD_SCREEN = "FORGOT_PASSWORD_SCREEN";
const VERIFY_ACCOUNT_SCREEN = "VERIFY_ACCOUNT_SCREEN";
const FORGOT_PASSWORD_SUCCESS_SCREEN = "FORGOT_PASSWORD_SUCCESS_SCREEN";
const RESET_PASSWORD_SCREEN = "RESET_PASSWORD_SCREEN";
const MAIN_BOTTOM_TABS_NAVIGATOR = "MAIN_BOTTOM_TABS_NAVIGATOR";
const SUSU_STACK_NAVIGATOR = "SUSU_STACK_NAVIGATOR";
const SUSU_DETAIL_SCREEN = "SUSU_DETAIL_SCREEN";
const CREATE_PROJECT_SCREEN = "CREATE_PROJECT_SCREEN";
const SUSU_SCREEN = "SUSU_SCREEN";
const DASHBOARD_SCREEN = "DASHBOARD_SCREEN";
const GROUPS_STACK_NAVIGATOR = "GROUPS_STACK_NAVIGATOR";
const GROUP_DETAIL_SCREEN = "GROUP_DETAIL_SCREEN";
const CREATE_GROUP_SCREEN = "CREATE_GROUP_SCREEN";
const GROUPS_SCREEN = "GROUPS_SCREEN";
const TRANSACTIONS_SCREEN = "TRANSACTIONS_SCREEN";
const CREATE_SUSU_SCREEN = "CREATE_SUSU_SCREEN";
const TRANSACTION_DETAIL_SCREEN = "TRANSACTION_DETAIL_SCREEN";
const TRANSACTION_STACK_NAVIGATOR = "TRANSACTION_STACK_NAVIGATOR";
const NOTIFICATIONS_SCREEN = "NOTIFICATIONS_SCREEN";
const PROFILE_SCREEN = "PROFILE_SCREEN";
const EDIT_PROFILE_SCREEN = "EDIT_PROFILE_SCREEN";
const ABOUT_APP_SCREEN = "ABOUT_APP_SCREEN";
const PRIVACY_POLICY_SCREEN = "PRIVACY_POLICY_SCREEN";
const SETTINGS_SCREEN = "SETTINGS_SCREEN";
const TERMS_AND_CONDITIONS_SCREEN = "TERMS_AND_CONDITIONS_SCREEN";
const CHANGE_PASSWORD_SCREEN = "CHANGE_PASSWORD_SCREEN";
const ACCOUNT_SCREEN = "ACCOUNT_SCREEN";
const MORE_STACK_NAVIGATOR = "MORE_STACK_NAVIGATOR";
const MORE_SCREEN = "MORE_SCREEN";
const PAYMENT_METHODS_SCREEN = "PAYMENT_METHODS_SCREEN";
const ADD_PAYMENT_METHOD_SCREEN = "ADD_PAYMENT_METHOD_SCREEN";
const CONTRIBUTIONS_SCREEN = "CONTRIBUTIONS_SCREEN";
const DISBURSEMENTS_SCREEN = "DISBURSEMENTS_SCREEN";
const TRANSACTIONS_TOP_TABS_NAVIGATOR = "TRANSACTIONS_TOP_TABS_NAVIGATOR";
const DISBURSEMENT_DETAIL_SCREEN = "DISBURSEMENT_DETAIL_SCREEN";
const GROUP_DISBURSEMENT_DETAIL_SCREEN = "GROUP_DISBURSEMENT_DETAIL_SCREEN";
const SUSU_DISBURSEMENT_DETAIL_SCREEN = "SUSU_DISBURSEMENT_DETAIL_SCREEN";
const DISBURSEMENT_STACK_NAVIGATOR = "DISBURSEMENT_STACK_NAVIGATOR";
const CONTRIBUTION_DETAIL_SCREEN = "CONTRIBUTION_DETAIL_SCREEN";
const GROUP_CONTRIBUTION_DETAIL_SCREEN = "GROUP_CONTRIBUTION_DETAIL_SCREEN";
const SUSU_CONTRIBUTION_DETAIL_SCREEN = "SUSU_CONTRIBUTION_DETAIL_SCREEN";
const SUSU_PAYMENT_ORDER_SCREEN = "SUSU_PAYMENT_ORDER_SCREEN";
const CONTRIBUTION_STACK_NAVIGATOR = "CONTRIBUTION_STACK_NAVIGATOR";
const USER_GROUP_INVITATIONS_SCREEN = 'USER_GROUP_INVITATIONS_SCREEN';
const GROUP_INVITATIONS_SCREEN = 'GROUP_INVITATIONS_SCREEN';
const GROUP_MEMBERS_SCREEN = 'GROUP_MEMBERS_SCREEN';
const GROUP_DISBURSEMENTS_SCREEN = 'GROUP_DISBURSEMENTS_SCREEN';
const GROUP_CONTRIBUTIONS_SCREEN = 'GROUP_CONTRIBUTIONS_SCREEN';
const SUSU_MEMBERS_SCREEN = 'SUSU_MEMBERS_SCREEN';
const SUSU_DISBURSEMENTS_SCREEN = 'SUSU_DISBURSEMENTS_SCREEN';
const SUSU_CONTRIBUTIONS_SCREEN = 'SUSU_CONTRIBUTIONS_SCREEN';
const MAKE_CONTRIBUTION_SCREEN = 'MAKE_CONTRIBUTION_SCREEN';
const CREATE_GROUP_SUSU_SCREEN = 'CREATE_GROUP_SUSU_SCREEN';
const INVITE_GROUP_MEMBERS_SCREEN = 'INVITE_GROUP_MEMBERS_SCREEN';
let BASE_SERVER_URL;
if (process.env.NODE_ENV === "development") {
  BASE_SERVER_URL = `https://susuplus.herokuapp.com/api/v1`;
} else {
  BASE_SERVER_URL = `https://susuplus.herokuapp.com/api/v1`;
}

export const API_URL_CONSTANTS = {
  BASE_SERVER_URL,
};

export const SCREEN_NAME_CONSTANTS = {
  GROUP_INVITATIONS_SCREEN,
  INVITE_GROUP_MEMBERS_SCREEN,
  CREATE_GROUP_SUSU_SCREEN,
  CREATE_SUSU_SCREEN,
  VERIFY_ACCOUNT_SCREEN,
  FORGOT_PASSWORD_SUCCESS_SCREEN,
  MAKE_CONTRIBUTION_SCREEN,
  SUSU_DISBURSEMENT_DETAIL_SCREEN,
  SUSU_CONTRIBUTION_DETAIL_SCREEN,
  SUSU_PAYMENT_ORDER_SCREEN,
  GROUP_MEMBERS_SCREEN,
  GROUP_DISBURSEMENTS_SCREEN,
  GROUP_CONTRIBUTIONS_SCREEN,
  SUSU_MEMBERS_SCREEN,
  SUSU_DISBURSEMENTS_SCREEN,
  USER_GROUP_INVITATIONS_SCREEN,
  SUSU_CONTRIBUTIONS_SCREEN,
  GROUP_DISBURSEMENT_DETAIL_SCREEN,
  GROUP_CONTRIBUTION_DETAIL_SCREEN,
  TRANSACTIONS_TOP_TABS_NAVIGATOR,
  CONTRIBUTIONS_SCREEN,
  DISBURSEMENTS_SCREEN,
  PAYMENT_METHODS_SCREEN,
  ADD_PAYMENT_METHOD_SCREEN,
  SIGN_IN_SCREEN,
  MORE_SCREEN,
  RESET_PASSWORD_SCREEN,
  FORGOT_PASSWORD_SCREEN,
  SIGN_UP_SCREEN,
  SUSU_STACK_NAVIGATOR,
  DASHBOARD_SCREEN,
  MAIN_BOTTOM_TABS_NAVIGATOR,
  SUSU_DETAIL_SCREEN,
  CREATE_PROJECT_SCREEN,
  SUSU_SCREEN,
  GROUPS_SCREEN,
  CREATE_GROUP_SCREEN,
  GROUP_DETAIL_SCREEN,
  GROUPS_STACK_NAVIGATOR,
  TRANSACTIONS_SCREEN,
  TRANSACTION_DETAIL_SCREEN,
  TRANSACTION_STACK_NAVIGATOR,
  NOTIFICATIONS_SCREEN,
  PROFILE_SCREEN,
  EDIT_PROFILE_SCREEN,
  ABOUT_APP_SCREEN,
  PRIVACY_POLICY_SCREEN,
  TERMS_AND_CONDITIONS_SCREEN,
  SETTINGS_SCREEN,
  CHANGE_PASSWORD_SCREEN,
  ACCOUNT_SCREEN,
  MORE_STACK_NAVIGATOR,
  DISBURSEMENT_DETAIL_SCREEN,
  DISBURSEMENT_STACK_NAVIGATOR,
  CONTRIBUTION_DETAIL_SCREEN,
  CONTRIBUTION_STACK_NAVIGATOR,
};

const SUSU_PLUS_TOKEN_KEY = "SUSU_PLUS_TOKEN_KEY";
const SUSU_PLUS_FORGOT_PASSWORD_TOKEN_KEY = "SUSU_PLUS_FORGOT_PASSWORD_TOKEN_KEY";
const SUSU_PLUS_SIGN_UP_TOKEN_KEY = "SUSU_PLUS_SIGN_UP_TOKEN_KEY";
const SUSU_PLUS_USER_DATA_KEY = "SUSU_PLUS_USER_DATA_KEY";
export const SECURE_STORAGE_CONSTANTS = {
  SUSU_PLUS_SIGN_UP_TOKEN_KEY,
  SUSU_PLUS_FORGOT_PASSWORD_TOKEN_KEY,
  SUSU_PLUS_TOKEN_KEY,
  SUSU_PLUS_USER_DATA_KEY,
};
