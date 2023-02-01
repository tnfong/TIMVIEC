import React, { useEffect, useState, useCallback} from 'react';
import {ScrollView,View,ImageBackground, Image,Text, StyleSheet,Button, ActivityIndicator} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector, useDispatch } from 'react-redux';
import * as DocumentPicker from 'expo-document-picker';
import { firebase } from '../store/firebase';

import * as userActions from '../store/actions/user';
import * as cvActions from '../store/actions/cv';


const EditCV = props => {
    const [uploading, setUploading] = useState(false)
    const [isLoading, setIsLoading] = useState(false);
    const userId = props.route.params ? props.route.params.uid : null;
    const [CV, setCV] = useState(null)
    const [doc1, setDoc1] = useState(null)
    const [loading, setLoading] = useState(false);
    const [filePath, setFilePath] = useState(null);

  const dispatch = useDispatch();

  const user = useSelector(state => state.user.user);

   useEffect(() => {
      setIsLoading(true);
      dispatch(userActions.fetchUser()).then(() => {
         setIsLoading(false);
      });
   }, [dispatch]);
 
  const chooseFile = async () => {
    let result = await DocumentPicker.getDocumentAsync({
    });

    if (result != null) {
      setCV(result.uri);
      setFilePath(result.name);
      console.log(result);
    }
  };
 
  const uploadFile = async () => {
    const blob = await new Promise((resolve, reject) => {
       const xhr = new XMLHttpRequest();
       xhr.onload = function() {
         resolve(xhr.response);
       };
       xhr.onerror = function() {
         reject(new TypeError('Network request failed'));
       };
       xhr.responseType = 'blob';
       xhr.open('GET', CV, true);
       xhr.send(null);
    })
    const ref = firebase.storage().ref().child(`File/` + userId)
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
             setDoc1(url);
             console.log(doc1)
           }
           setCV(url)
           return url
         })
       }
       )
   }
   const uploadCV = async () => {
    setIsLoading(true)
    await dispatch(cvActions.addCV(doc1));
    setIsLoading(false)
    props.navigation.replace("Home")
 }


 const backHandler = id => {
  console.log(doc1)
  props.navigation.replace('EditProfile', {uid: userId })
};




        return(
          <ScrollView style={styles.screen}>
            {user.length == 0 
              ?
              <View>
                <ImageBackground source={require('../images/pentool.png')} 
                      style={{marginLeft:50, width:"100%",height:250}}>
                <View style={styles.img_container}>
                  <TouchableOpacity onPress={()=>props.navigation.replace("Home")}>
                    <Image source={require('../images/back.png')} style={{width:25,height:10}}/>
                  </TouchableOpacity>
                </View>
              </ImageBackground>
                <Text style={{fontFamily:"ExtraBold", color:"#B8B8B8",alignSelf:'center'}}>Có vẻ bạn chưa nhập thông tin hồ sơ</Text>
                <View style={{ width:"100%",alignItems:"center", marginTop: 20}}>
                  <Button color={"#000"} title='Tạo hồ sơ' onPress={()=>backHandler(userId)}/>
                </View>
              </View>  
              :
              <View>
              <ImageBackground source={require('../images/pentool.png')} 
                      style={{marginLeft:50, width:"100%",height:250}}>
                <View style={styles.img_container}>
                  <TouchableOpacity onPress={()=>props.navigation.replace("Home")}>
                    <Image source={require('../images/back.png')} style={{width:25,height:10}}/>
                  </TouchableOpacity>
                </View>
              </ImageBackground>
                {CV ? <Text style={{fontFamily:"ExtraBold", color:"#B8B8B8",alignSelf:'center'}}>Đã chọn file: {filePath}</Text> : <View/>}
              <ScrollView horizontal showsHorizontalScrollIndicator={true} style={{alignSelf:'center'}}>
                <View style={{margin:10}}><Button title='Chọn file' color={"#000"} onPress={chooseFile} /></View>
                <View style={{margin:10}}>{!uploading ? <Button title='Xác nhận file' color={"#000"} onPress={uploadFile} />: <ActivityIndicator size={'small'} color='black' />}</View>
              </ScrollView>
              <View style={{ width:"100%",alignItems:"center", marginTop: 20}}>
                  <Button color={"#000"} title='Gửi CV' onPress={uploadCV}/>
                </View>
              </View>

            }
            </ScrollView>
        )
    }

export const screenOptions = {
    headerShown: false
}

const styles = StyleSheet.create({
    screen: {
        backgroundColor:"#f8f8f8",
        height:"100%",
        paddingHorizontal:20,
        flex:1
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
    pic: {
        flex: 1, 
        borderWidth: 1, 
        borderColor: "steel",
        alignSelf: 'center',
        justifyContent: 'center',
        minHeight: 200,
        minWidth: 200,
        marginTop: -100
      },
    view1: {
        backgroundColor:"#FFF",
        paddingVertical:10,
        paddingHorizontal:10,
        borderRadius:8,
        width:140
    },
    view2: {
        backgroundColor:"#FFF",
        paddingVertical:10,
        paddingHorizontal:10,
        marginLeft:35,
        borderRadius:8,
        width:140,
        alignSelf:"flex-end"
    },
    view_descr: {
        backgroundColor:"#FFF",
        borderRadius:15,
        padding:20,
        marginTop:20
    },
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        padding: 10,
      },
      titleText: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        padding: 20,
      },
      buttonStyle: {
        alignItems: "center",
        backgroundColor: "orange",
        padding: 10,
        width: 300,
        marginTop: 16,
      },
      buttonTextStyle: {
        color: "white",
        fontWeight: "bold",
      },
      footerHeading: {
        fontSize: 18,
        textAlign: "center",
        color: "grey",
      },
      footerText: {
        fontSize: 16,
        textAlign: "center",
        color: "grey",
      },
 });

 export default EditCV