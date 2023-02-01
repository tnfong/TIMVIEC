//giao diện đăng nhập
import React, { useState, useEffect, useReducer, useCallback } from 'react';
import {
   ScrollView,
   View,
   KeyboardAvoidingView,
   StyleSheet,
   Button,
   ActivityIndicator,
   Alert,
   Image
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch } from 'react-redux';

import Input from '../components/Input';
import Card from '../components/Card';
import * as authActions from '../store/actions/auth';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
   if (action.type === FORM_INPUT_UPDATE) {
      const updatedValues = {
         ...state.inputValues,
         [action.input]: action.value
      };
      const updatedValidities = {
         ...state.inputValidities,
         [action.input]: action.isValid
      };
      let updatedFormIsValid = true;
      for (let key in updatedValidities) {
         updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
      }
      return {
         formIsValid: updatedFormIsValid,
         inputValidities: updatedValidities,
         inputValues: updatedValues
      };
   }
   return state;
};

const Auth = () => {

   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState();
   const [isSignup, setIsSignup] = useState(false);
   const dispatch = useDispatch();

   const [formState1, dispatchFormState1] = useReducer(formReducer, {
      inputValues: {
         email: '',
         password: '',
      },
      inputValidities: {
         email: false,
         password: false,
      },
      formIsValid: false
   });

   const [formState2, dispatchFormState2] = useReducer(formReducer, {
      inputValues: {
         email: '',
         password: '',
         name:''
      },
      inputValidities: {
         email: false,
         password: false,
         name: false
      },
      formIsValid: false
   });

   useEffect(() => {
      if (error) {
         Alert.alert('Có lỗi xảy ra', error, [{ text: 'Ok' }]);
      }
   }, [error])

   const authHandler = async () => {
      let action;
      if (isSignup) {
         action =
            authActions.signup(
               formState2.inputValues.email,
               formState2.inputValues.password,
               formState2.inputValues.name,
            ),
            authActions.login
      } else {
         action = authActions.login(
            formState1.inputValues.email,
            formState1.inputValues.password
         )
      }
      setError(null);
      setIsLoading(true);
      try {
         await dispatch(action);
      } catch (err) {
         setError(err.message);
         setIsLoading(false);
      }
   }


   const inputChangeHandler1 = useCallback((inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState1({
         type: FORM_INPUT_UPDATE,
         value: inputValue,
         isValid: inputValidity,
         input: inputIdentifier
      });
   }, [dispatchFormState1]);

   const inputChangeHandler2 = useCallback((inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState2({
         type: FORM_INPUT_UPDATE,
         value: inputValue,
         isValid: inputValidity,
         input: inputIdentifier
      });
   }, [dispatchFormState2]);

   return (
      <KeyboardAvoidingView
         behavior='height'
         keyboardVerticalOffset={20}
         style={styles.screen}

      >
         <LinearGradient colors={['#ffffff ', '#ffffff']} style={styles.gradient}>
            <Card style={styles.authContainer}>
               <ScrollView>
                  <Input
                     id='email'
                     label='E-Mail'
                     keyboardType='email-address'
                     required
                     email
                     autoCapitalize='none'
                     errorText='Hãy nhập đúng mẫu địa chỉ email'
                     onInputChange={isSignup ? inputChangeHandler2 : inputChangeHandler1}
                     initialValue=''
                  />
                  <Input
                     id='password'
                     label='Mật khẩu'
                     keyboardType='default'
                     secureTextEntry
                     required
                     minLength={5}
                     autoCapitalize='none'
                     errorText='Hãy nhập đúng mẫu mật khẩu(>5 kí tự)'
                     onInputChange={isSignup ? inputChangeHandler2 : inputChangeHandler1}
                     initialValue=''
                  />
                  <View style={styles.buttonContainer}>
                     {isLoading ? (
                        <ActivityIndicator
                           size='small'
                           color='#000'
                        />
                     ) : (
                           <Button
                              title={isSignup ? 'Đăng ký' : 'Đăng nhập'}
                              color='#000'
                              onPress={authHandler}
                           />
                        )}
                  </View>
                  <View style={styles.buttonContainer}>
                     <Button
                        title={`${isSignup ? 'Đã có tài khoản? Đăng nhập' : 'Chưa có tài khoản? Đăng ký'}`}
                        color='#B0B0B0'
                        onPress={() => {
                           setIsSignup(prevState => !prevState);
                        }}
                     />
                  </View>
               </ScrollView>
            </Card>
         </LinearGradient>
      </KeyboardAvoidingView>

   )
};

export const screenOptions = {
   headerShown: false
}

const styles = StyleSheet.create({
   screen: {
      flex: 1,
      backgroundColor: '#ffffff'
   },
   gradient: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#ffffff'
   },
   authContainer: {
      width: '80%',
      maxWidth: 400,
      maxHeight: 800,
      padding: 20
   },
   buttonContainer: {
      marginTop: 10
   }
});

export default Auth;