import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Auth, { screenOptions as authScreenOptions } from '../screens/Auth';
import Home from '../screens/Home';
import Detail from '../screens/Detail';
import UserOverview from '../screens/UserOverview';
import Applied from '../screens/Applied';
import Saved from '../screens/Saved';
import EditProfile from '../screens/EditProfile';
import Profile from '../screens/Profile';
import Company from '../screens/Company';
import Filter from '../screens/Filter';
import Result from '../screens/Result';
import EditCV from '../screens/EditCV';

const defaultNavOptions = {
   headerShown : false
}

const ScreenStackNavigator = createStackNavigator();

export const ScreenNavigator = () => {   
   return <ScreenStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <ScreenStackNavigator.Screen name="Home" component={Home} />
      <ScreenStackNavigator.Screen name="Detail" component={Detail} />
      <ScreenStackNavigator.Screen name="UserOverview" component={UserOverview} />
      <ScreenStackNavigator.Screen name="Applied" component={Applied} />
      <ScreenStackNavigator.Screen name="Saved" component={Saved} />
      <ScreenStackNavigator.Screen name="EditProfile" component={EditProfile} />
      <ScreenStackNavigator.Screen name="Profile" component={Profile} />
      <ScreenStackNavigator.Screen name="Company" component={Company} />
      <ScreenStackNavigator.Screen name="Filter" component={Filter} />
      <ScreenStackNavigator.Screen name="Result" component={Result} />
      <ScreenStackNavigator.Screen name="EditCV" component={EditCV} />
   </ScreenStackNavigator.Navigator>
}

const AuthStackNavigator = createStackNavigator();

export const AuthNavigator = () => {
   return <AuthStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <AuthStackNavigator.Screen
         name='Auth'
         component={Auth}
         options={authScreenOptions} 
      />
   </AuthStackNavigator.Navigator>
} 
