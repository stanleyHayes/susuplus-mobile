import React, { useEffect } from "react";
import AuthNavigator from "./src/navigators/auth-navigator";
import MainNavigator from "./src/navigators/main-navigator";
import { useDispatch, useSelector } from "react-redux";
import { selectAuth } from "./src/redux/auth/auth-reducer";
import SplashScreen from "./src/screens/splash/splash-screen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AUTH_ACTION_CREATORS } from "./src/redux/auth/auth-action-creators";

const App = () => {
    const dispatch = useDispatch();
    const { authToken, authLoading, splashLoading } = useSelector(selectAuth);
    
    const StackNavigator = createNativeStackNavigator();
    
    useEffect(() => {
        dispatch(AUTH_ACTION_CREATORS.restoreToken());
    }, []);
    
    if (splashLoading)
        return <SplashScreen />;
    
    return (
        <StackNavigator.Navigator screenOptions={{ headerShown: false }}>
            {authToken === null ?
                <StackNavigator.Screen
                    name="AUTH_NAVIGATOR"
                    component={AuthNavigator} /> :
                <StackNavigator.Screen
                    name="MAIN_NAVIGATOR"
                    component={MainNavigator} />
            }
        </StackNavigator.Navigator>
    );
};

export default App;
