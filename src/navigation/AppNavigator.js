//điều hướng đăng nhập
import React from 'react';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';

import { ScreenNavigator, AuthNavigator } from './ScreenNavigator';
import StartupScreen from '../screens/StartupScreen';

const AppNavigator = () => {
   const isAuth = useSelector(state => !!state.auth.token);
   const didTryAutoLogin = useSelector(state => state.auth.didTryAutoLogin);
   
   return <NavigationContainer>
      {isAuth && <ScreenNavigator />}
      {!isAuth && didTryAutoLogin && <AuthNavigator />}                               
      {!isAuth && !didTryAutoLogin && <StartupScreen />}
   </NavigationContainer>
}

export default AppNavigator;