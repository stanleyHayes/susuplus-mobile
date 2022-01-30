import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { SCREEN_NAME_CONSTANTS } from "../constants/constants";
import DashboardScreen from "../screens/dashboard/dashboard-screen";
import SusuScreen from "../screens/susu/susu-screen";
import GroupsScreen from "../screens/groups/groups-screen";
import SusuDetailScreen from "../screens/susu/susu-detail-screen";
import GroupDetailScreen from "../screens/groups/group-detail-screen";
import TermsAndConditionsScreen from "../screens/others/terms-and-conditions-screen";
import PrivacyPolicyScreen from "../screens/others/privacy-policy-screen";
import AccountScreen from "../screens/account/account-screen";
import ChangePasswordScreen from "../screens/account/change-password-screen";
import SettingsScreen from "../screens/account/settings-screen";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Entypo from "react-native-vector-icons/Entypo";
import { Icon, Text } from "native-base";
import MoreScreen from "../screens/others/more-screen";
import AddPaymentMethodScreen from "../screens/payment-methods/add-payment-method-screen";
import AboutAppScreen from "../screens/others/about-app-screen";
import EditProfileScreen from "../screens/profile/edit-profile-screen";
import ContributionsScreen from "../screens/transactions/contributions-screen";
import DisbursementsScreen from "../screens/transactions/disbursements-screen";
import PaymentMethodsScreen from "../screens/payment-methods/payment-methods-screen";
import DisbursementDetailScreen from "../screens/others/disbursement-detail-screen";
import ContributionDetailScreen from "../screens/others/contribution-detail-screen";
import GroupDisbursementDetailScreen from "../screens/groups/group-disbursement-detail-screen";
import GroupContributionDetailScreen from "../screens/groups/group-contribution-detail-screen";
import UserGroupInvitationsScreen from "../screens/others/user-group-invitations-screen";
import GroupDisbursementsScreen from "../screens/groups/group-disbursements-screen";
import GroupContributionsScreen from "../screens/groups/group-contributions-screen";
import GroupMembersScreen from "../screens/groups/group-members-screen";
import SusuMembersScreen from "../screens/susu/susu-members-screen";
import SusuDisbursementsScreen from "../screens/susu/susu-disbursements-screen";
import SusuContributionsScreen from "../screens/susu/susu-contributions-screen";
import SusuDisbursementDetailScreen from "../screens/susu/susu-disbursement-detail-screen";
import SusuContributionDetailScreen from "../screens/susu/susu-contribution-detail-screen";
import SusuPaymentOrderScreen from "../screens/susu/susu-payment-order-screen";
import MakePaymentScreen from "../screens/transactions/make-payment-screen";
import CreateGroupScreen from "../screens/groups/create-group-screen";
import CreateSusuScreen from "../screens/groups/create-susu-screen";
import CreateGroupSusuScreen from "../screens/groups/create-susu-screen";
import GroupInvitationsScreen from "../screens/groups/group-invitations-screen";
import InviteGroupUsersScreen from "../screens/groups/invite-group-users-screen";
import AddSusuMembersScreen from "../screens/susu/add-susu-members-screen";
import GroupPaymentMethodsScreen from "../screens/groups/group-payment-methods-screen";
import UpdateGroupDetailScreen from "../screens/groups/update-group-detail-screen";
import GroupSusuHistoryScreen from "../screens/groups/group-susu-history-screen";
import GroupSusuDetailScreen from "../screens/groups/group-susu-detail-screen";
import AddGroupPaymentMethodScreen from "../screens/groups/add-group-payment-method-screen";

const BottomTabsNavigator = createMaterialBottomTabNavigator();
const StackNavigator = createNativeStackNavigator();

const SusuStackNavigator = () => {
    return (
        <StackNavigator.Navigator screenOptions={{ headerShown: false }}>
            <StackNavigator.Screen
                name={SCREEN_NAME_CONSTANTS.SUSU_SCREEN}
                component={SusuScreen} />
            
            <StackNavigator.Screen
                options={{
                    headerShown: true,
                    headerTitle: ({ props }) => <Text fontSize="lg" {...props}>Contribution</Text>,
                }}
                name={SCREEN_NAME_CONSTANTS.MAKE_CONTRIBUTION_SCREEN}
                component={MakePaymentScreen} />
            
            <StackNavigator.Screen
                name={SCREEN_NAME_CONSTANTS.SUSU_DETAIL_SCREEN}
                component={SusuDetailScreen}
                options={{
                    headerShown: true,
                    headerTitle: ({ props }) => <Text fontSize="lg" {...props}>Susu Detail</Text>,
                }}
            />
            <StackNavigator.Screen
                options={{
                    headerShown: true,
                    headerTitle: ({ props }) => <Text fontSize="lg" {...props}>Disbursement Detail</Text>,
                }}
                name={SCREEN_NAME_CONSTANTS.SUSU_DISBURSEMENT_DETAIL_SCREEN}
                component={SusuDisbursementDetailScreen}
            />
            <StackNavigator.Screen
                options={{
                    headerShown: true,
                    headerTitle: ({ props }) => <Text fontSize="lg" {...props}>Contribution Detail</Text>,
                }}
                name={SCREEN_NAME_CONSTANTS.SUSU_CONTRIBUTION_DETAIL_SCREEN}
                component={SusuContributionDetailScreen}
            />
            
            <StackNavigator.Screen
                options={{
                    headerShown: true,
                    headerTitle: ({ props }) => <Text fontSize="lg" {...props}>Contributions</Text>,
                }}
                name={SCREEN_NAME_CONSTANTS.SUSU_CONTRIBUTIONS_SCREEN}
                component={SusuContributionsScreen}
            />
            
            <StackNavigator.Screen
                options={{
                    headerShown: true,
                    headerTitle: ({ props }) => <Text fontSize="lg" {...props}>Disbursements</Text>,
                }}
                name={SCREEN_NAME_CONSTANTS.SUSU_DISBURSEMENTS_SCREEN}
                component={SusuDisbursementsScreen}
            />
            
            <StackNavigator.Screen
                options={({ navigation, route }) => {
                    return {
                        headerShown: true,
                        headerTitle: ({ props }) => <Text fontSize="lg" {...props}>Members</Text>,
                        headerRight: () => {
                            return (
                                <Icon
                                    onPress={
                                        () => navigation.push(SCREEN_NAME_CONSTANTS.ADD_PAYMENT_METHOD_SCREEN,
                                            { susuID: route.params.susuID })}
                                    size={8}
                                    as={<MaterialIcons name="group-add" />}
                                />
                            );
                        },
                    };
                }}
                name={SCREEN_NAME_CONSTANTS.SUSU_MEMBERS_SCREEN}
                component={SusuMembersScreen}
            />
            
            <StackNavigator.Screen
                options={{
                    headerShown: true,
                    headerTitle: ({ props }) => <Text fontSize="lg" {...props}>Payment Order</Text>,
                }}
                name={SCREEN_NAME_CONSTANTS.SUSU_PAYMENT_ORDER_SCREEN}
                component={SusuPaymentOrderScreen}
            />
            
            <StackNavigator.Screen
                options={{
                    headerShown: true,
                    headerTitle: ({ props }) => <Text fontSize="lg" {...props}>Invite Members</Text>,
                }}
                name={SCREEN_NAME_CONSTANTS.ADD_PAYMENT_METHOD_SCREEN}
                component={AddSusuMembersScreen}
            />
            
            <StackNavigator.Screen
                options={{
                    headerShown: true,
                    headerTitle: ({ props }) => <Text fontSize="lg" {...props}>Create Susu</Text>,
                }}
                name={SCREEN_NAME_CONSTANTS.CREATE_SUSU_SCREEN}
                component={CreateSusuScreen}
            />
        </StackNavigator.Navigator>
    );
};


const GroupsStackNavigator = () => {
    return (
        <StackNavigator.Navigator screenOptions={{ headerShown: false }}>
            <StackNavigator.Screen
                name={SCREEN_NAME_CONSTANTS.GROUPS_SCREEN}
                component={GroupsScreen} />
            <StackNavigator.Screen
                options={({ navigation, route }) => {
                    return {
                        headerShown: true,
                        headerTitle: ({ props }) => <Text fontSize="lg" {...props}>Group Detail</Text>,
                        headerRight: () => {
                            return (
                                <Icon
                                    color="muted.500"
                                    size="sm"
                                    as={<MaterialIcons name="edit" size={8} />}
                                    onPress={() => navigation.push(SCREEN_NAME_CONSTANTS.UPDATE_GROUP_DETAILS_SCREEN, { groupID: route.params.groupID })} />
                            );
                        },
                    };
                }}
                name={SCREEN_NAME_CONSTANTS.GROUP_DETAIL_SCREEN}
                component={GroupDetailScreen}
            />
            <StackNavigator.Screen
                options={{
                    headerShown: true,
                    headerTitle: ({ props }) => <Text fontSize="lg" {...props}>Disbursement Detail</Text>,
                }}
                name={SCREEN_NAME_CONSTANTS.GROUP_DISBURSEMENT_DETAIL_SCREEN}
                component={GroupDisbursementDetailScreen}
            />
            <StackNavigator.Screen
                options={{
                    headerShown: true,
                    headerTitle: ({ props }) => <Text fontSize="lg" {...props}>Contribution Detail</Text>,
                }}
                name={SCREEN_NAME_CONSTANTS.GROUP_CONTRIBUTION_DETAIL_SCREEN}
                component={GroupContributionDetailScreen}
            />
            
            <StackNavigator.Screen
                options={{
                    headerShown: true,
                    headerTitle: ({ props }) => <Text fontSize="lg" {...props}>Group Contributions</Text>,
                }}
                name={SCREEN_NAME_CONSTANTS.GROUP_CONTRIBUTIONS_SCREEN}
                component={GroupContributionsScreen}
            />
            
            <StackNavigator.Screen
                options={{
                    headerShown: true,
                    headerTitle: ({ props }) => <Text fontSize="lg" {...props}>Group Disbursements</Text>,
                }}
                name={SCREEN_NAME_CONSTANTS.GROUP_DISBURSEMENTS_SCREEN}
                component={GroupDisbursementsScreen}
            />
            
            <StackNavigator.Screen
                options={({ navigation, route }) => {
                    return {
                        headerShown: true,
                        headerTitle: ({ props }) => <Text fontSize="lg" {...props}>Group Invitations</Text>,
                        headerRight: () => {
                            return (
                                <Icon
                                    onPress={() => navigation.push(SCREEN_NAME_CONSTANTS.INVITE_GROUP_MEMBERS_SCREEN, { groupID: route.params.groupID })}
                                    size={8}
                                    as={<MaterialIcons name="group-add" />}
                                />
                            );
                        },
                    };
                }}
                name={SCREEN_NAME_CONSTANTS.GROUP_INVITATIONS_SCREEN}
                component={GroupInvitationsScreen}
            />
            
            <StackNavigator.Screen
                options={{
                    headerShown: true,
                    headerTitle: ({ props }) => <Text fontSize="lg" {...props}>Invite Users</Text>,
                }}
                name={SCREEN_NAME_CONSTANTS.INVITE_GROUP_MEMBERS_SCREEN}
                component={InviteGroupUsersScreen}
            />
            
            <StackNavigator.Screen
                options={{
                    headerShown: true,
                    headerTitle: ({ props }) => <Text fontSize="lg" {...props}>Add Payment Method</Text>,
                }}
                name={SCREEN_NAME_CONSTANTS.GROUP_ADD_PAYMENT_METHOD_SCREEN}
                component={AddGroupPaymentMethodScreen}
            />
            
            <StackNavigator.Screen
                options={({ navigation, route }) => {
                    return {
                        headerShown: true,
                        headerTitle: ({ props }) => <Text fontSize="lg" {...props}>Group Members</Text>,
                        headerRight: () => {
                            return (
                                <Icon
                                    onPress={() => navigation.push(SCREEN_NAME_CONSTANTS.INVITE_GROUP_MEMBERS_SCREEN, { groupID: route.params.groupID })}
                                    size={8}
                                    as={<MaterialIcons name="group-add" />} />
                            );
                        },
                    };
                }}
                name={SCREEN_NAME_CONSTANTS.GROUP_MEMBERS_SCREEN}
                component={GroupMembersScreen}
            />
            
            
            <StackNavigator.Screen
                options={{
                    headerShown: true,
                    headerTitle: ({ props }) => <Text fontSize="lg" {...props}>New Group</Text>,
                }}
                name={SCREEN_NAME_CONSTANTS.CREATE_GROUP_SCREEN}
                component={CreateGroupScreen}
            />
            
            <StackNavigator.Screen
                options={{
                    headerShown: true,
                    headerTitle: ({ props }) => <Text fontSize="lg" {...props}>Create Susu</Text>,
                }}
                name={SCREEN_NAME_CONSTANTS.CREATE_GROUP_SUSU_SCREEN}
                component={CreateGroupSusuScreen}
            />
            
            <StackNavigator.Screen
                options={({ navigation, route }) => {
                    return {
                        headerShown: true,
                        headerTitle: ({ props }) => <Text fontSize="lg" {...props}>Payment Methods</Text>,
                        headerRight: () => {
                            return (
                                <Icon
                                    onPress={() => navigation.push(SCREEN_NAME_CONSTANTS.GROUP_ADD_PAYMENT_METHOD_SCREEN, { groupID: route.params.groupID })}
                                    size="sm"
                                    as={<MaterialIcons name="add" />} />
                            );
                        },
                    };
                    
                }}
                name={SCREEN_NAME_CONSTANTS.GROUP_PAYMENT_METHODS}
                component={GroupPaymentMethodsScreen}
            />
            
            <StackNavigator.Screen
                options={{
                    headerShown: true,
                    headerTitle: ({ props }) => <Text fontSize="lg" {...props}>Update Group Details</Text>,
                }}
                name={SCREEN_NAME_CONSTANTS.UPDATE_GROUP_DETAILS_SCREEN}
                component={UpdateGroupDetailScreen}
            />
            
            <StackNavigator.Screen
                options={{
                    headerShown: true,
                    headerTitle: ({ props }) => <Text fontSize="lg" {...props}>Susu History</Text>,
                }}
                name={SCREEN_NAME_CONSTANTS.GROUP_SUSU_HISTORY_SCREEN}
                component={GroupSusuHistoryScreen}
            />
            
            <StackNavigator.Screen
                options={{
                    headerShown: true,
                    headerTitle: ({ props }) => <Text fontSize="lg" {...props}>Susu Detail</Text>,
                }}
                name={SCREEN_NAME_CONSTANTS.GROUP_SUSU_DETAIL_SCREEN}
                component={GroupSusuDetailScreen}
            />
        </StackNavigator.Navigator>
    );
};

const ContributionsStackNavigator = () => {
    return (
        <StackNavigator.Navigator
            screenOptions={{ headerShown: true }}>
            <StackNavigator.Screen
                options={{
                    headerShown: true,
                    headerTitle: ({ props }) => <Text fontSize="lg" {...props}>Contributions</Text>,
                }}
                name={SCREEN_NAME_CONSTANTS.CONTRIBUTIONS_SCREEN}
                component={ContributionsScreen} />
            <StackNavigator.Screen
                options={{
                    headerShown: true,
                    headerTitle: ({ props }) => <Text fontSize="lg" {...props}>Contribution Detail</Text>,
                }}
                name={SCREEN_NAME_CONSTANTS.CONTRIBUTION_DETAIL_SCREEN}
                component={ContributionDetailScreen} />
        </StackNavigator.Navigator>
    );
};

const DisbursementsStackNavigator = () => {
    return (
        <StackNavigator.Navigator
            screenOptions={{ headerShown: true }}>
            <StackNavigator.Screen
                options={{
                    headerShown: true,
                    headerTitle: ({ props }) => <Text fontSize="lg" {...props}>Disbursements</Text>,
                }}
                name={SCREEN_NAME_CONSTANTS.DISBURSEMENTS_SCREEN}
                component={DisbursementsScreen} />
            <StackNavigator.Screen
                options={{
                    headerShown: true,
                    headerTitle: ({ props }) => <Text fontSize="lg" {...props}>Disbursement Detail</Text>,
                }}
                name={SCREEN_NAME_CONSTANTS.DISBURSEMENT_DETAIL_SCREEN}
                component={DisbursementDetailScreen} />
        </StackNavigator.Navigator>
    );
};


const MoreStackNavigator = () => {
    return (
        <StackNavigator.Navigator
            screenOptions={{ headerShown: true }}>
            
            <StackNavigator.Screen
                options={{ headerShown: false }}
                name={SCREEN_NAME_CONSTANTS.MORE_SCREEN}
                component={MoreScreen} />
            
            
            <StackNavigator.Screen
                options={{
                    headerTitle: ({ props }) => <Text fontSize="lg" {...props}>Edit Profile</Text>,
                }}
                name={SCREEN_NAME_CONSTANTS.EDIT_PROFILE_SCREEN}
                component={EditProfileScreen} />
            
            <StackNavigator.Screen
                options={{
                    headerTitle: ({ props }) => <Text fontSize="lg" {...props}>Payment Methods</Text>,
                }}
                name={SCREEN_NAME_CONSTANTS.PAYMENT_METHODS_SCREEN}
                component={PaymentMethodsScreen} />
            
            <StackNavigator.Screen
                options={{
                    headerTitle: ({ props }) => <Text fontSize="lg" {...props}>Add Payment Method</Text>,
                }}
                name={SCREEN_NAME_CONSTANTS.ADD_PAYMENT_METHOD_SCREEN}
                component={AddPaymentMethodScreen} />
            
            <StackNavigator.Screen
                options={{
                    headerTitle: ({ props }) => <Text fontSize="lg" {...props}>Terms & Conditions</Text>,
                }}
                name={SCREEN_NAME_CONSTANTS.TERMS_AND_CONDITIONS_SCREEN}
                component={TermsAndConditionsScreen} />
            
            <StackNavigator.Screen
                options={{ headerTitle: ({ props }) => <Text {...props}>Account</Text> }}
                name={SCREEN_NAME_CONSTANTS.ACCOUNT_SCREEN}
                component={AccountScreen} />
            
            <StackNavigator.Screen
                options={{
                    headerTitle: ({ props }) => <Text fontSize="lg" {...props}>About SUSU+</Text>,
                }}
                name={SCREEN_NAME_CONSTANTS.ABOUT_APP_SCREEN}
                component={AboutAppScreen} />
            
            <StackNavigator.Screen
                options={{
                    headerTitle: ({ props }) => <Text fontSize="lg" {...props}>Change Password</Text>,
                }}
                name={SCREEN_NAME_CONSTANTS.CHANGE_PASSWORD_SCREEN}
                component={ChangePasswordScreen} />
            
            <StackNavigator.Screen
                options={{
                    headerTitle: ({ props }) => <Text fontSize="lg" {...props}>Settings</Text>,
                }}
                name={SCREEN_NAME_CONSTANTS.SETTINGS_SCREEN}
                component={SettingsScreen} />
            
            <StackNavigator.Screen
                options={{
                    headerTitle: ({ props }) => <Text fontSize="lg" {...props}>Privacy Policy</Text>,
                }}
                name={SCREEN_NAME_CONSTANTS.PRIVACY_POLICY_SCREEN}
                component={PrivacyPolicyScreen} />
            
            <StackNavigator.Screen
                options={{ headerShown: false, headerTitle: ({ props }) => <Text {...props}>Contributions</Text> }}
                name={SCREEN_NAME_CONSTANTS.CONTRIBUTION_STACK_NAVIGATOR}
                component={ContributionsStackNavigator} />
            <StackNavigator.Screen
                options={{
                    headerTitle: ({ props }) => <Text fontSize="lg" {...props}>Disbursements</Text>,
                    headerShown: false,
                }}
                name={SCREEN_NAME_CONSTANTS.DISBURSEMENT_STACK_NAVIGATOR}
                component={DisbursementsStackNavigator} />
        </StackNavigator.Navigator>
    );
};


const MainBottomTabsNavigator = () => {
    return (
        <BottomTabsNavigator.Navigator
            barStyle={{
                backgroundColor: "#155e75",
                zIndex: 10,
                borderBottomWidth: 1,
                borderBottomColor: '#0e7490',
                borderTopWidth: 1,
                borderTopColor: '#0e7490'
        }}
            shifting={false}
            labeled={true}
            backBehavior="firstRoute"
            initialRouteName={SCREEN_NAME_CONSTANTS.DASHBOARD_SCREEN}>
            
            <BottomTabsNavigator.Screen
                options={{
                    title: "Dashboard",
                    tabBarIcon: ({ focused, color }) => <Icon size={25} as={MaterialIcons} color={color}
                                                              name="dashboard" />,
                }}
                
                name={SCREEN_NAME_CONSTANTS.DASHBOARD_SCREEN}
                component={DashboardScreen} />
            <BottomTabsNavigator.Screen
                options={{
                    title: "Susu",
                    tabBarIcon: ({ focused, color }) => <Icon size={25} as={Entypo} color={color} name="slideshare" />,
                }}
                name={SCREEN_NAME_CONSTANTS.SUSU_STACK_NAVIGATOR}
                component={SusuStackNavigator} />
            <BottomTabsNavigator.Screen
                options={{
                    title: "Groups",
                    tabBarIcon: ({ focused, color }) => <Icon size={25} as={MaterialIcons} color={color}
                                                              name="groups" />,
                }}
                name={SCREEN_NAME_CONSTANTS.GROUPS_STACK_NAVIGATOR}
                component={GroupsStackNavigator} />
            
            <BottomTabsNavigator.Screen
                options={{
                    title: "Invites",
                    tabBarIcon: ({ focused, color }) => <Icon size={25} as={MaterialIcons} color={color}
                                                              name="insert-invitation" />,
                }}
                name={SCREEN_NAME_CONSTANTS.USER_GROUP_INVITATIONS_SCREEN}
                component={UserGroupInvitationsScreen} />
            
            <BottomTabsNavigator.Screen
                options={{
                    title: "More",
                    tabBarIcon: ({ focused, color }) => <Icon size={25} as={MaterialIcons} color={color}
                                                              name="more-horiz" />,
                }}
                name={SCREEN_NAME_CONSTANTS.MORE_STACK_NAVIGATOR}
                component={MoreStackNavigator} />
        </BottomTabsNavigator.Navigator>
    );
};


export default MainBottomTabsNavigator;
