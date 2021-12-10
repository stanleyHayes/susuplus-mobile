import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignInScreen from "../screens/auth/sign-in-screen";
import { SCREEN_NAME_CONSTANTS } from "../constants/constants";
import ForgotPasswordScreen from "../screens/auth/forgot-password-screen";
import ResetPasswordScreen from "../screens/auth/reset-password-screen";
import SignUpScreen from "../screens/auth/sign-up-screen";
import ForgotPasswordSuccessScreen from "../screens/auth/forgot-password-success-screen";
import VerifyOTPScreen from "../screens/auth/verify-otp-screen";

const AuthNavigator = () => {
    const StackNavigator = createNativeStackNavigator();
    return (
        <StackNavigator.Navigator
            screenOptions={{ headerShown: false }}>
            
            <StackNavigator.Screen
                name={SCREEN_NAME_CONSTANTS.SIGN_IN_SCREEN}
                component={SignInScreen}
            />
            
            <StackNavigator.Screen
                name={SCREEN_NAME_CONSTANTS.SIGN_UP_SCREEN}
                component={SignUpScreen}
            />
            
            <StackNavigator.Screen
                name={SCREEN_NAME_CONSTANTS.RESET_PASSWORD_SCREEN}
                component={ResetPasswordScreen}
            />
            
            <StackNavigator.Screen
                name={SCREEN_NAME_CONSTANTS.FORGOT_PASSWORD_SCREEN}
                component={ForgotPasswordScreen}
            />
            
            <StackNavigator.Screen
                name={SCREEN_NAME_CONSTANTS.FORGOT_PASSWORD_SUCCESS_SCREEN}
                component={ForgotPasswordSuccessScreen}
            />
            
            <StackNavigator.Screen
                name={SCREEN_NAME_CONSTANTS.VERIFY_ACCOUNT_SCREEN}
                component={VerifyOTPScreen}
            />
        </StackNavigator.Navigator>
    );
};

export default AuthNavigator;
