import React, { useEffect, useState, useCallback} from 'react';
import {ScrollView,View,ImageBackground, Image,Text, StyleSheet,Button, Alert,TouchableHighlight} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector, useDispatch } from 'react-redux';

import * as userActions from '../store/actions/user';
import * as appliedJobsActions from '../store/actions/appliedjobs';
import * as savedJobsActions from '../store/actions/savedjobs';
import * as companyActions from '../store/actions/company';

const Detail = props => {
    const [isLoading, setIsLoading] = useState(false);
    const [Saved, setSaved] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [error, setError] = useState();
    const jobId = props.route.params.jobsId;
    const user = useSelector(state => state.user.user);
    const selectedJobs = useSelector(state =>
        state.jobs.availableJobs.find(jobs => jobs.id === jobId)
    );
    const appliedjobs = useSelector(state => state.appliedjobs.appliedjobs.filter(jobs => jobs.jobid === jobId));
    const company = useSelector(state => state.company.company);
    const dispatch = useDispatch();

    const loadAppliedJobs = useCallback(async () => {
        setError(null);
        setIsRefreshing(true);
    try {
        dispatch(appliedJobsActions.fetchAppliedJobs());
        // dispatch(savedJobsActions.fetchSavedJobs());
    } catch (err) {
       setError(err.message)
    }
    
    setIsRefreshing(false);
 }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', loadAppliedJobs)

    return () => {
       unsubscribe();
    };
  }, [loadAppliedJobs]);

 useEffect(() => {
    setIsLoading(true);
    loadAppliedJobs().then(() => {
       setIsLoading(false);
    });
 }, [dispatch, loadAppliedJobs]);

 useEffect(() => {
    setIsLoading(true);
    dispatch(companyActions.fetchCompany()).then(() => {
       setIsLoading(false);
    });
 }, [dispatch]);
 useEffect(() => {
    setIsLoading(true);
    dispatch(userActions.fetchUser()).then(() => {
       setIsLoading(false);
    });
    console.log(user)
 }, [dispatch]);

   const appliedHandler = async () => {
    if(user.length == 0){
        props.navigation.push('UserOverview')
    } else{
    setIsLoading(true)
    await dispatch(appliedJobsActions.addAppliedJobs(jobId, selectedJobs.title, selectedJobs.imageUrl, selectedJobs.time, selectedJobs.salary));
    setIsLoading(false)
    Alert.alert('Thành Công!!!!','Bạn hãy chờ phản hổi của công ty ứng tuyển nhé.')}
 }


 const savedHandler = async () => {
    setIsLoading(true)
    await dispatch(savedJobsActions.addSavedJobs(jobId, selectedJobs.title, selectedJobs.imageUrl, selectedJobs.time, selectedJobs.salary));
    setIsLoading(false)
    Alert.alert('Thành Công!!!!','Bạn hãy chờ phản hổi của công ty ứng tuyển nhé.')
 }  

    const touchProps = {
        activeOpacity: 1,                               
        style: Saved ? styles.btn_favourite2 : styles.btn_favourite1, 
        onPress: () => savedHandle(),                 
        };

    const savedHandle = () => {
        Saved ? setSaved(false) : setSaved(true)
        savedHandler()
    };

        return(
            <ScrollView style={styles.screen}> 
            <ImageBackground source={{ uri: selectedJobs.imageUrl }} 
                  style={{marginLeft:50, width:"100%",height:250}}>
                      <View style={styles.img_container}>
                          <TouchableOpacity onPress={()=>props.navigation.goBack()}>
                               <Image source={require('../images/back.png')} style={{width:25,height:10}}/>
                            </TouchableOpacity>
                    
            </View>
            </ImageBackground>
                    <View style={{backgroundColor:"#FFF",padding:10,borderRadius:15}}>
                            <View style={{ flexDirection:"row",alignItems:"center",borderRadius:15}}>
                                <View>
                                    <Text style={styles.job_name}>{selectedJobs.title}</Text>

                                    <Text style={styles.job_company}>{selectedJobs.company}</Text>

                                    <Text style={styles.job_location}>{selectedJobs.location}</Text>
                                </View>
                                    <TouchableHighlight {...touchProps}>
                                        <Image source={require('../images/favourite.png')} style={{width:25,height:25,opacity:0.5}}/>
                                    </TouchableHighlight>   
                            </View>
                            <TouchableOpacity onPress={()=>props.navigation.push('Company', {cid: selectedJobs.comid })}>
                               <Text>Xem chi tiết công ty</Text>
                            </TouchableOpacity>
                    </View>

                    <View style={{
                        flexDirection:"row",
                        marginTop:20,
                        borderRadius:15
                    }}>
                            <View style={styles.view1}>
                                        <Text style={{fontFamily:"ExtraBold"}}>Mức lương</Text>
                                        <Text style={{fontFamily:"ExtraBold", color:"#B8B8B8",}}>{selectedJobs.salary.toFixed(0)} triệu</Text>
                            </View>

                            <View style={styles.view2}>
                                        <Text style={{fontFamily:"ExtraBold"}}>Hình thức làm việc</Text>
                                        <Text style={{fontFamily:"ExtraBold", color:"#B8B8B8",}}>{selectedJobs.time}</Text>
                            </View>

                    </View>

                    
                    <View style={{
                        flexDirection:"row",
                        marginTop:20,
                        borderRadius:15
                    }}>
                            <View style={styles.view1}>
                                        <Text style={{fontFamily:"ExtraBold"}}>Cấp bậc</Text>
                                        <Text style={{fontFamily:"ExtraBold", color:"#B8B8B8",}}>{selectedJobs.type}</Text>
                            </View>

                            <View style={styles.view2}>
                                        <Text style={{fontFamily:"ExtraBold"}}>Bằng cấp tiếng anh</Text>
                                        <Text style={{fontFamily:"ExtraBold", color:"#B8B8B8",}}>{selectedJobs.req_eng}</Text>
                            </View>

                    </View>


                    <View style={{
                        flexDirection:"row",
                        marginTop:20,
                        borderRadius:15
                    }}>
                            <View style={styles.view1}>
                                        <Text style={{fontFamily:"ExtraBold"}}>Giới tính</Text>
                                        <Text style={{fontFamily:"ExtraBold", color:"#B8B8B8",}}>{selectedJobs.req_gen}</Text>
                            </View>

                            <View style={styles.view2}>
                                        <Text style={{fontFamily:"ExtraBold"}}>Số lượng tuyển</Text>
                                        <Text style={{fontFamily:"ExtraBold", color:"#B8B8B8",}}>2 người</Text>
                            </View>

                    </View>



                    <View style={styles.view_descr}>
                        <Text style={{fontFamily:"ExtraBold",fontSize:20,marginBottom:10}}>Mô tả công việc</Text>
                        <Text style={{fontFamily:"SemiBold",color:"#B2B2B2",}}> 
                            {selectedJobs.description}
                        </Text>
                    </View>
                    <View style={styles.view_descr}>
                        <Text style={{fontFamily:"ExtraBold",fontSize:20,marginBottom:10}}>Yêu cầu ứng viên</Text>
                        <Text style={{fontFamily:"SemiBold",color:"#B2B2B2",}}> 
                            {selectedJobs.requirement}
                        </Text>
                    </View>
                    {appliedjobs.length === 0 ?
                    <View style={{ width:"100%",alignItems:"flex-end"}}>
                        <Button color={"#000"} title='Ứng tuyển ngay' onPress={appliedHandler}/>

                    </View> :
                    <View style={{alignItems:"flex-end",margin:20}}>
                    <Button color={"#000"} title='Bạn đã ứng tuyển' onPress={console.log("dmm")}/>

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
    job_name: {
        fontSize:18,
        fontFamily:"ExtraBold"
    },
    job_company: {
        fontFamily:"ExtraBold",
        color:"#000",
        opacity:0.6,
        fontSize:14
    },
    job_location:{
        fontFamily:"Bold",
        fontSize:13,
        color:"#B8B8B8",
    },
    pop_salary: {
        color:"#B0B0B0",
        fontFamily:"Bold",
        fontSize:13,
        marginLeft:25
    },
    btn_favourite1: {
        backgroundColor:"#dfdfdf",
        height:32,
        width:32,
        borderRadius:5,
        marginLeft:50,
        marginTop:5,
        alignItems:"center",
        justifyContent:"center"
    },
    btn_favourite2: {
        backgroundColor:"#ff6161",
        height:32,
        width:32,
        borderRadius:5,
        marginLeft:50,
        marginTop:5,
        alignItems:"center",
        justifyContent:"center"
    },
    btn_apply: {
        backgroundColor:"#000",
        alignItems:"center",
        justifyContent:"center",
        width:90,
        height:55,
        marginTop:30,
        borderRadius:15,
        padding:10
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
        width:140
    },
    view_descr: {
        backgroundColor:"#FFF",
        borderRadius:15,
        padding:20,
        marginTop:20
    }
 });

 export default Detail