import React, { useEffect, useState, useCallback} from 'react';
import {ScrollView,View,ImageBackground, Image,Text, StyleSheet,Button, Linking} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector, useDispatch } from 'react-redux';

import * as userActions from '../store/actions/user';
import * as cvActions from '../store/actions/cv';

const Profile = props => {
    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [error, setError] = useState();
    const [isDeleting, setIsDeleting] = useState(false);
    const userId = props.route.params ? props.route.params.uid : null;

    const userProfile = useSelector(state =>
        state.user.user.find(user => user.uid === userId)
    );
    const cv = useSelector(state => state.cv.cv.find(cv => cv.uid === userId));

    const dispatch = useDispatch();

    const loadUserProfile = useCallback(async () => {
        setError(null);
        setIsRefreshing(true);
    try {
       await dispatch(userActions.fetchUser());
    } catch (err) {
       setError(err.message)
       console.log(error)
    }
    
    setIsRefreshing(false);
 }, [dispatch, setIsLoading, setError]);

    useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', loadUserProfile)

    return () => {
       unsubscribe();
    };
  }, [loadUserProfile]);

 useEffect(() => {
    setIsLoading(true);
    loadUserProfile().then(() => {
       setIsLoading(false);
    });
    console.log(cv)
 }, [dispatch, loadUserProfile]);


    const viewCV = () =>{
        Linking.openURL(cv.docUrl).catch((err) => {
            console.log(err)
      });
    }

    const deleteCV = () =>{
            setError(null);
            setIsDeleting(true);
            try {
               dispatch(cvActions.deleteCV(cv.id));
            } catch (err) {
               setError(err.message);
               }
            setIsDeleting(false);

    } 

 if(!userProfile){
    <View style={styles.screen}>
        <Text style={{fontFamily:"ExtraBold", color:"#B8B8B8",alignSelf:'center'}}>Có vẻ bạn chưa nhập thông tin hồ sơ</Text>
        <View style={{ width:"100%",alignItems:"center", marginTop: 20}}>
            <Button color={"#000"} title='Tạo hồ sơ' onPress={()=>props.navigation.replace('EditProfile', {uid: userId })}/>
        </View>
    </View>
    
 }
 if (isDeleting) {
    return (
       <View style={styles.centered}>
          <ActivityIndicator size='large' color={Colors.primary} />
       </View>
    )
 }

 

        return(
            <ScrollView style={styles.screen}> 
            <ImageBackground source={require('../images/pentool.png')} 
                  style={{marginLeft:50, width:"100%",height:250}}>
                      <View style={styles.img_container}>
                          <TouchableOpacity onPress={()=>props.navigation.replace("Home")}>
                               <Image source={require('../images/back.png')} style={{width:25,height:10}}/>
                            </TouchableOpacity>
                    
            </View>
            </ImageBackground>
                    <View style={{backgroundColor:"#FFF",padding:10,borderRadius:15}}>
                    <Image source={{uri: userProfile.pic}} style={styles.pic} resizeMode="contain"/>
                    <Text style={{fontFamily:"ExtraBold",alignSelf:'center',fontSize:25}}>{userProfile.name}</Text>
                    </View>

                    <View style={{
                        display: "flex",
                        flexDirection:"row",
                        marginTop:20,
                        borderRadius:15
                    }}>
                            <View style={styles.view1}>
                                        <Text style={{fontFamily:"ExtraBold"}}>Giới tính</Text>
                                        <Text style={{fontFamily:"ExtraBold", color:"#B8B8B8",}}>{userProfile.gender}</Text>
                            </View>

                            <View style={styles.view2}>
                                        <Text style={{fontFamily:"ExtraBold"}}>Số chứng minh thư</Text>
                                        <Text style={{fontFamily:"ExtraBold", color:"#B8B8B8",}}>{userProfile.cmnd}</Text>
                            </View>

                    </View>

                    <View style={{
                        flexDirection:"row",
                        marginTop:20,
                        borderRadius:15
                    }}>
                            <View style={styles.view1}>
                                        <Text style={{fontFamily:"ExtraBold"}}>Ngày sinh</Text>
                                        <Text style={{fontFamily:"ExtraBold", color:"#B8B8B8",}}>{userProfile.dob}</Text>
                            </View>

                            <View style={styles.view2}>
                                        <Text style={{fontFamily:"ExtraBold"}}>Nơi sinh</Text>
                                        <Text style={{fontFamily:"ExtraBold", color:"#B8B8B8",}}>{userProfile.pob}</Text>
                            </View>

                    </View>

                    <View style={styles.view_descr}>
                        <Text style={{fontFamily:"ExtraBold",fontSize:20,marginBottom:10}}>Hiện đang sống trong khu vực</Text>
                        <Text style={{fontFamily:"SemiBold",color:"#B2B2B2",}}> 
                            {userProfile.dd}
                        </Text>
                    </View>





                    <View style={styles.view_descr}>
                        <Text style={{fontFamily:"ExtraBold",fontSize:20,marginBottom:10}}>Bằng cấp</Text>
                        <Text style={{fontFamily:"SemiBold",color:"#B2B2B2",}}> 
                            {userProfile.diplo}
                        </Text>
                    </View>
                    <View style={styles.view_descr}>
                        <Text style={{fontFamily:"ExtraBold",fontSize:20,marginBottom:10}}>Chứng chỉ</Text>
                        <Text style={{fontFamily:"SemiBold",color:"#B2B2B2",}}> 
                            {userProfile.quali}
                        </Text>
                    </View>
                    <View style={styles.view_descr}>
                        <Text style={{fontFamily:"ExtraBold",fontSize:20,marginBottom:10}}>Thông tin liên lạc</Text>
                        <Text style={{fontFamily:"SemiBold",color:"#B2B2B2",}}> 
                            Email: {userProfile.email}
                        </Text>
                        <Text style={{fontFamily:"SemiBold",color:"#B2B2B2",}}> 
                            SĐT: {userProfile.phone}
                        </Text>
                    </View>
                    <View style={{alignItems:"center", margin: 20}}>
                        <Button color={"#000"} title='Chỉnh sửa hồ sơ' onPress={()=>props.navigation.replace('EditProfile', {uid: userId })}/>
                    </View>
                    {cv 
                    ?
                    <View style={{alignItems:"center"}}>
                        <Button color={"#000"} title='Xem CV' onPress={viewCV}/>
                        <Text>                </Text>
                        <Button color={"#000"} title='Xóa CV' onPress={deleteCV}/>
                    </View>
                    :
                    <View style={{alignItems:"center"}}>
                        <Button color={"#000"} title='Tạo CV' onPress={()=>props.navigation.navigate('EditCV', {uid: userId })}/>
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
    }
 });

 export default Profile