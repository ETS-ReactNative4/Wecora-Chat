import React from 'react';
import { StackNavigator } from "react-navigation";
import SplashScreen from '../screens/Splash';
import SignInScreen from '../screens/SignIn';
import ForgetPasswordScreen from '../screens/ForgetPassword';
import ProjectsScreen from '../screens/Projects';
import BoardsScreen from '../screens/Boards';
import { Root } from "native-base";

const AppNavigator = StackNavigator(
  {
    Splash: { screen: SplashScreen },
    SignIn: { screen: SignInScreen },
    ForgetPassword: { screen: ForgetPasswordScreen },
    Projects: { screen: ProjectsScreen },
    Boards: { screen: BoardsScreen }
  },
  {
    initialRouteName: "Splash",
    headerMode: "none"
  }
);

export default () =>
  <Root>
    <AppNavigator />
  </Root>;
