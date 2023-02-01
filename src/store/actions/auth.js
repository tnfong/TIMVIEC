import AsyncStorage from '@react-native-async-storage/async-storage';
import Env from "../../firebase/config";
import User from "../../models/user";

export const AUTHENTICATE = 'AUTHENTICATE';
export const CREATE_PERSON = 'CREATE_PERSON';
export const SET_PERSON = 'SET_PERSON';
export const LOGOUT = 'LOGOUT';
export const SET_DID_TRY_AL = 'SET_DID_TRY_AL';

let timer;

export const setDidTryAL = () => {
   return { type: SET_DID_TRY_AL };
}

export const authenticate = (userId, token, expiryTime) => {
   return dispatch => {
      dispatch(setLogoutTimer(expiryTime));
      dispatch({ type: AUTHENTICATE, userId: userId, token: token });
   };
}


export const signup = (email, password) => {
   return async dispatch => {
      const response1 = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${Env.key}`, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({
            email: email,
            password: password,
            returnSecureToken: true
         })
      })


      if (!response1.ok) {
         const errorResData = await response1.json();
         const errorId = errorResData.error.message;
         let message = 'Something went wromg';

         if (errorId === 'EMAIL_EXISTS') {
            message = 'This email exists already';
         } else if (errorId === 'TOO_MANY_ATTEMPTS_TRY_LATER') {
            message = 'All requests have been blocked from this device due to unusual activity. Try again later';
         }
         throw new Error(message);
      }
      const resData = await response1.json();

      dispatch(
         authenticate(
            resData.localId, resData.idToken, parseInt(resData.expiresIn) * 1000
         )
      );

      const expirationDate = new Date(
         new Date().getTime() + parseInt(resData.expiresIn) * 1000
      );
      saveDataToStorage(resData.idToken, resData.localId, expirationDate);

      
      
   };
}


export const login = (email, password) => {
   return async dispatch => {
      const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${Env.key}`, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({
            email: email,
            password: password,
            returnSecureToken: true
         })
      })

      if (!response.ok) {
         const errorResData = await response.json();
         const errorId = errorResData.error.message;
         let message = 'Something went wromg';

         if (errorId === 'EMAIL_NOT_FOUND') {
            message = 'This email could not be found';
         } else if (errorId === 'INVALID_PASSWORD') {
            message = 'This password is not valid';
         }
         throw new Error(message);
      }

      const resData = await response.json();
      dispatch(
         authenticate(
            resData.localId,
            resData.idToken,
            parseInt(resData.expiresIn) * 1000
         )
      );
      const expirationDate = new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000);
      saveDataToStorage(resData.idToken, resData.localId, expirationDate);
   };
}



export const logout = () => {
   clearLogoutTimer();
   AsyncStorage.removeItem('userData');
   return { type: LOGOUT };
}

const clearLogoutTimer = () => {
   if (timer) {
      clearTimeout(timer);
   }
}

const setLogoutTimer = expirationTime => {
   return dispatch => {
      timer = setTimeout(() => {
         dispatch(logout());
      }, expirationTime)//
   };
}

const saveDataToStorage = (token, userId, expirationDate) => {
   AsyncStorage.setItem('userData', JSON.stringify({
      token: token,
      userId: userId,
      expiryDate: expirationDate.toISOString()
   }));
}
