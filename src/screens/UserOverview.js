//giao diện trang chủ
import React, { useState, useEffect, useCallback } from 'react';
import {
   View,
   Text,
   StyleSheet, 
   Image,
   ImageBackground
} from 'react-native';
import { ListItem, Icon } from 'react-native-elements'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';


import * as userActions from '../store/actions/user';
import * as authActions from '../store/actions/auth';
import * as cvActions from '../store/actions/cv';

const UserOverview= props => {

   const [isLoading, setIsLoading] = useState(false);

   const [userId, setUserId] = useState('');

   const user = useSelector(state => state.user.user);
   const cv = useSelector(state => state.cv.cv)

   useEffect(() => {
      setIsLoading(true);
      dispatch(userActions.fetchUser()).then(() => {
         setIsLoading(false);
      });
      console.log(user)
   }, [dispatch]);
   useEffect(() => {
      setIsLoading(true);
      dispatch(cvActions.fetchCV()).then(() => {
         setIsLoading(false);
      });
   }, [dispatch]);

   useEffect(() => {
      const tryGetId = async () => {
         const userData = await AsyncStorage.getItem('userData');
         const transformedData = JSON.parse(userData);
         const { token, userId, expiryDate } = transformedData;
         setUserId(userId)
      };
      tryGetId()
   }, []);




 
   const dispatch = useDispatch()

   const selectEditProfileHandler = id => {
      props.navigation.navigate('EditProfile', {
         uid: id,
      });
   };
   const selectProfileHandler = id => {
      props.navigation.navigate('Profile', {
         uid: id,
      });
      console.log(user)
   };
   const selectAppliedHandler = () => {
      props.navigation.navigate('Applied');
   };

   const selectSaveHandler = () => {
      props.navigation.navigate('Saved');
   };

    return(
        <View style={styles.screen}>
            {user.length == 0 ?
            <ImageBackground source={require('../images/dev2.png')} 
            style={{marginLeft:50, width:"100%",height:250}}>
                      <View style={styles.img_container}>
                          <TouchableOpacity onPress={()=>props.navigation.replace("Home")}>
                               <Image source={require('../images/back.png')} style={{width:25,height:10}}/>
                            </TouchableOpacity>
                      </View>
                      <View style={{alignItems:"center",justifyContent:"center", marginLeft : -50}}>
                           <Text style={{fontSize: 25}}>Có vẻ như bạn chưa có hồ sơ xin việc</Text>
                          <TouchableOpacity onPress={() => { selectEditProfileHandler(userId)}}>
                               <Text style={{fontSize: 25,borderWidth: 3, borderRadius: 10,borderColor: '#000',backgroundColor: "#DFDFDF"}}>Bắt đầu tạo hồ sơ</Text>
                            </TouchableOpacity>
                      </View>
            </ImageBackground>
             :
            <ImageBackground source={require('../images/dev2.png')} 
                  style={{marginLeft:50, width:"100%",height:250}}>
                      <View style={styles.img_container}>
                          <TouchableOpacity onPress={()=>props.navigation.replace("Home")}>
                               <Image source={require('../images/back.png')} style={{width:25,height:10}}/>
                            </TouchableOpacity>
                    
                      </View>
            </ImageBackground>
            }


            <ListItem bottomDivider onPress={() => { selectSaveHandler()}}>
               <Icon name= 'visibility' />
               <ListItem.Content>
                  <ListItem.Title>Việc làm đang quan tâm</ListItem.Title>
               </ListItem.Content>
               <ListItem.Chevron />
            </ListItem>

            <ListItem bottomDivider onPress={() => { selectAppliedHandler()}}>
               <Icon name= 'history' />
               <ListItem.Content>
                  <ListItem.Title>Lịch sử ứng tuyển</ListItem.Title>
               </ListItem.Content>
               <ListItem.Chevron />
            </ListItem> 


            <Text style={styles.headerText}>Tài khoản</Text>
            {user.length == 0 
            ?
            <View></View>
            :
            <ListItem bottomDivider onPress={() => { selectProfileHandler(userId)}}>
               <Icon name= 'account-circle' />
               <ListItem.Content>
                  <ListItem.Title>Thông tin cá nhân</ListItem.Title>
               </ListItem.Content>
               <ListItem.Chevron />
            </ListItem>}



            <ListItem bottomDivider onPress={() => { dispatch(authActions.logout()) }} >
               <Icon name= 'logout' color={'red'} />
               <ListItem.Content>
                  <ListItem.Title style={{color:'red'}}>Đăng xuất</ListItem.Title>
               </ListItem.Content>
               <ListItem.Chevron />
            </ListItem>  
        </View>
    )
};

 
 const styles = StyleSheet.create({
    screen: {
      margin: 10,
    },
    headerText: {
       fontSize: 18,
       margin: 10
    },
   header_container: {
      backgroundColor:"#FFF",
      borderRadius:5,
      padding:5,
      flexDirection:"row",
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
    buttons:{
      marginBottom: 5
    },
    texts:{
      fontSize: 15,
      textAlign: 'center'
    }
 });
export default UserOverview;