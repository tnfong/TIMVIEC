import React, { useState, useEffect, useCallback, useReducer } from 'react';
import {
   View,
   ScrollView,
   StyleSheet,
   Platform,
   Alert,
   KeyboardAvoidingView,
   ActivityIndicator,
   ImageBackground,
   TouchableOpacity,
   Image,
   Button,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import * as ImagePicker from "expo-image-picker"
import { firebase } from '../store/firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as userActions from '../store/actions/user';
import Input from '../components/Input';

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

const EditProfile =  props => {
   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState();
   const userId = props.route.params ? props.route.params.uid : null;



   const editedUser = useSelector(state =>
      state.user.user.find(user => user.uid === userId)
   );

   const [uimage, setImage] = useState(null)
   const [pic1, setPic1] = useState(null)
  const [uploading, setUploading] = useState(false)


  useEffect(() => {
   if(editedUser){
      setImage(editedUser.pic)
      setPic1(editedUser.pic)
   }
   }, []);


  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1,1],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri)
    }
  };

  const uploadImage = async () => {
   const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function() {
        resolve(xhr.response);
      };
      xhr.onerror = function() {
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', uimage, true);
      xhr.send(null);
   })
   const ref = firebase.storage().ref().child(`Pictures/` + userId)
   const snapshot = ref.put(blob)
   snapshot.on(firebase.storage.TaskEvent.STATE_CHANGED,
      ()=>{
        setUploading(true)
      },
      (error) => {
        setUploading(false)
        console.log(error)
        return 
      },
      () => {
        snapshot.snapshot.ref.getDownloadURL().then((url) => {
          setUploading(false)
          console.log("Dmm: ", url)
          if(url){
            setPic1(url);
          }
          setImage(url)
          return url
        })
      }
      )
  }

   const dispatch = useDispatch();


   const [formState, dispatchFormState] = useReducer(formReducer, {
      inputValues: {
         name: editedUser ? editedUser.name : '', 
         gender: editedUser ? editedUser.gender : '', 
         dob: editedUser ? editedUser.dob : '', 
         pob: editedUser ? editedUser.pob : '', 
         cmnd: editedUser ? editedUser.cmnd : '', 
         dd: editedUser ? editedUser.dd : '', 
         diplo: editedUser ? editedUser.diplo : '', 
         quali: editedUser ? editedUser.quali : '',
         email: editedUser ? editedUser.email : '',
         phone: editedUser ? editedUser.phone : ''
      },
      inputValidities: {
         name: editedUser ? true : false, 
         gender: editedUser ? true : false, 
         dob: editedUser ? true : false, 
         pob: editedUser ? true : false, 
         cmnd: editedUser ? true : false, 
         dd: editedUser ? true : false, 
         diplo: editedUser ? true : false, 
         quali: editedUser ? true : false,
         email: editedUser ? true : false,
         phone: editedUser ? true : false

      },
      formIsValid: editedUser ? true : false
   });

   useEffect(() => {
      if (error) {
         Alert.alert('Có lỗi xảy ra', error, [{ text: 'Ok' }]);
      }
   }, [error]);

   const submitHandler = useCallback(async () => {
      if (!formState.formIsValid) {
         Alert.alert('Nhập thông tin lỗi', 'Hãy kiểm tra lại', [{ text: 'Ok' }])
         return;
      }
      setIsLoading(true);
      setError(null);
      console.log(pic1)
      try {
         if (editedUser) {
            await dispatch(
               userActions.updateUser(
                  editedUser.id,
                  pic1, 
                  formState.inputValues.name, 
                  formState.inputValues.gender, 
                  formState.inputValues.dob, 
                  formState.inputValues.pob, 
                  formState.inputValues.cmnd, 
                  formState.inputValues.dd, 
                  formState.inputValues.diplo, 
                  formState.inputValues.quali,
                  formState.inputValues.email,
                  formState.inputValues.phone,
               )
            );
         } else {
            await dispatch(
               userActions.addUser(
                  pic1, 
                  formState.inputValues.name, 
                  formState.inputValues.gender, 
                  formState.inputValues.dob, 
                  formState.inputValues.pob, 
                  formState.inputValues.cmnd, 
                  formState.inputValues.dd, 
                  formState.inputValues.diplo, 
                  formState.inputValues.quali,
                  formState.inputValues.email,
                  formState.inputValues.phone,
               )
            );
         }
         props.navigation.navigate('Home');
      } catch (err) {
         setError(err.message);
         console.log(err.message)
      }

      setIsLoading(false);
   }, [dispatch, userId, formState]);


   const inputChangeHandler = useCallback((inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
         type: FORM_INPUT_UPDATE,
         value: inputValue,
         isValid: inputValidity,
         input: inputIdentifier
      });
   }, [dispatchFormState]);

   if (isLoading) {
      return (
         <View style={styles.centered}>
            <ActivityIndicator size='large' color='black' />
         </View>
      )
   }

   return (
      <KeyboardAvoidingView
         style={{ flex: 1 }}
         behavior='height'
         keyboardVerticalOffset={100}
      >
         <ScrollView>
         <ImageBackground source={require('../images/dev2.png')} 
                  style={{marginLeft:50, width:"100%",height:250}}>
                      <View style={styles.img_container}>
                          <TouchableOpacity onPress={()=>props.navigation.replace("Home")}>
                               <Image source={require('../images/back.png')} style={{width:25,height:10}}/>
                            </TouchableOpacity>
                    
                      </View>
            </ImageBackground>
            <View style={styles.form}>
               {uimage ? <Image source={{uri: uimage}} style={styles.pic} resizeMode="contain"/> : <View style={styles.pic}/>}
            <View horizontal showsHorizontalScrollIndicator={true} style={{alignSelf:'center'}}>
               <View style={{margin:10}}><Button title='Chọn ảnh' color={"#000"} onPress={pickImage} /></View>
               <View style={{margin:10}}>{!uploading ? <Button title='Xác nhận ảnh' color={"#000"} onPress={uploadImage} />: <ActivityIndicator size={'small'} color='black' />}</View>
            </View>


               <Input
                  id='name'
                  label='Tên của bạn'
                  errorText='Hãy nhập lại tên bạn'
                  keyboardType='default'
                  autoCapitalize='sentences'
                  autoCorrect
                  returnKeyType='next'
                  onInputChange={inputChangeHandler}
                  initialValue={editedUser ? editedUser.name : ''}
                  initiallyValid={!!editedUser}
                  required
               />

               <Input
                  id='gender'
                  label='Giới tính'
                  errorText='Hãy nhập lại giới tính'
                  keyboardType='default'
                  returnKeyType='next'
                  onInputChange={inputChangeHandler}
                  initialValue={editedUser ? editedUser.gender : ''}
                  required
               />
               <Input
                  id='dob'
                  label='Ngày sinh'
                  errorText='Hãy nhập lại ngày sinh'
                  keyboardType='default'
                  returnKeyType='next'
                  onInputChange={inputChangeHandler}
                  initialValue={editedUser ? editedUser.dob : ''}
                  required
               />
               <Input
                  id='pob'
                  label='Nơi sinh'
                  errorText='Hãy nhập lại nơi sinh'
                  keyboardType='default'
                  returnKeyType='next'
                  onInputChange={inputChangeHandler}
                  initialValue={editedUser ? editedUser.pob : ''}
                  required
               />
               <Input
                  id='cmnd'
                  label='Số chứng minh thư'
                  errorText='Hãy nhập lại số chứng minh thư'
                  keyboardType='default'
                  returnKeyType='next'
                  onInputChange={inputChangeHandler}
                  initialValue={editedUser ? editedUser.cmnd : ''}
                  required
               />
               <Input
                  id='dd'
                  label='Khu vực bạn đang sống'
                  errorText='Hãy nhập lại khu vực bạn đang sống'
                  keyboardType='default'
                  returnKeyType='next'
                  onInputChange={inputChangeHandler}
                  initialValue={editedUser ? editedUser.dd : ''}
                  required
               />
               <Input
                  id='diplo'
                  label='Chứng chỉ'
                  errorText='Hãy nhập lại các chứng chỉ'
                  keyboardType='default'
                  autoCapitalize='sentences'
                  autoCorrect
                  multiline
                  numberOfLines={3}
                  onInputChange={inputChangeHandler}
                  initialValue={editedUser ? editedUser.diplo : ''}
                  initiallyValid={!!editedUser}
                  required
                  minLength={5}
               />
               <Input
                  id='quali'
                  label='Bằng cấp'
                  errorText='Hãy nhập lại bằng cấp của bạn'
                  keyboardType='default'
                  autoCapitalize='sentences'
                  autoCorrect
                  multiline
                  numberOfLines={3}
                  onInputChange={inputChangeHandler}
                  initialValue={editedUser ? editedUser.quali : ''}
                  initiallyValid={!!editedUser}
                  required
                  minLength={5}
               />
               <Input
                  id='email'
                  label='Email'
                  errorText='Hãy nhập lại email'
                  keyboardType='default'
                  returnKeyType='next'
                  onInputChange={inputChangeHandler}
                  initialValue={editedUser ? editedUser.email : ''}
                  required
               />
               <Input
                  id='phone'
                  label='Số điện thoại'
                  errorText='Hãy nhập lại số điện thoại'
                  keyboardType='default'
                  returnKeyType='next'
                  onInputChange={inputChangeHandler}
                  initialValue={editedUser ? editedUser.phone : ''}
                  required
               />
               <View style={{ width:"100%",alignItems:"flex-end", marginTop: 20}}>
                        <Button color={"#000"} title='Xác nhận thông tin' onPress={submitHandler}/>
               </View>
            </View>
         </ScrollView>
      </KeyboardAvoidingView>
   )
};



const styles = StyleSheet.create({
   form: {
      margin: 20
   },
   img_container: {
      backgroundColor:"#000",
      height:30,
      width:40,
      marginLeft:-50,
      marginTop:70,
      borderRadius:8,
      alignItems:"center",
      justifyContent:"center"
  },
   open_text: {
      color:"#000000",
      marginTop:40,
      fontFamily:"Bold",
      alignSelf: 'center',
      flex: 1,
      justifyContent: 'center'
   },
   centered: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
   },
   pic: {
      flex: 1, 
      borderWidth: 1, 
      borderColor: "steel",
      alignSelf: 'center',
      justifyContent: 'center',
      minHeight: 200,
      minWidth: 200,
      marginTop: -30
    }
});

export default EditProfile;