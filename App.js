import React, { useState } from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import ReduxThunk from 'redux-thunk';

import jobsReducer from './src/store/reducers/jobs';
import companyReducer from './src/store/reducers/company';
import userReducer from './src/store/reducers/user'
import appliedjobsreducer from './src/store/reducers/appliedjobs';
import savedjobsreducer from './src/store/reducers/savedjobs';
import cvreducer from './src/store/reducers/cv'
import authReducer from './src/store/reducers/auth';
import AppNavigator from './src/navigation/AppNavigator';

const fetchFonts = () => {
  return Font.loadAsync({
      'open-sans-bold' : require('./src/fonts/OpenSans-Bold.ttf'),
      'SemiBold' : require('./src/fonts/Montserrat-SemiBold.otf'),
      'Bold' : require('./src/fonts/Montserrat-Bold.otf'),
      'ExtraBold' : require('./src/fonts/Montserrat-ExtraBold.otf'),
      'Medium' : require('./src/fonts/Montserrat-Medium.otf'),
      'Regular' : require('./src/fonts/Montserrat-Regular.otf')
  })
};

const rootReducer = combineReducers({
  jobs: jobsReducer,
  user: userReducer,
  appliedjobs: appliedjobsreducer,
  savedjobs: savedjobsreducer,
  auth: authReducer,
  company: companyReducer,
  cv : cvreducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);
  if (!fontLoaded) {
    return <AppLoading 
      startAsync={fetchFonts} 
      onFinish={() => {
        setFontLoaded(true);
      }} 
      onError={(err) => console.log(err)}
    />
  }
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
};