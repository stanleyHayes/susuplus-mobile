import React, { useEffect } from "react";
import AuthNavigator from "./src/navigators/auth-navigator";
import MainNavigator from "./src/navigators/main-navigator";
import { useDispatch, useSelector } from "react-redux";
import { selectAuth } from "./src/redux/auth/auth-reducer";
import { restoreToken } from "./src/redux/auth/auth-action-creators";
import SplashScreen from "./src/screens/splash/splash-screen";

const App = () => {
  const dispatch = useDispatch();
  const { authToken, authLoading } = useSelector(selectAuth);

  useEffect(() => {
    dispatch(restoreToken());
  }, []);

  return (
    <React.Fragment>
      {authLoading ? <SplashScreen /> : authToken ? (<MainNavigator />) : (<  AuthNavigator />)}
    </React.Fragment>
  );
};

export default App;
