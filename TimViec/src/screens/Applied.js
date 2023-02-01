//giao diện trang đtặ hàng
import React, { useEffect, useState} from 'react';
import { View, Text, FlatList, Platform, ActivityIndicator, StyleSheet, ImageBackground, Image } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector, useDispatch } from 'react-redux';

import AppliedCard from '../components/AppliedCard';
import * as appliedJobsActions from '../store/actions/appliedjobs';

const Applied = props => {
   const [isLoading, setIsLoading] = useState(false);
   const appliedjobs = useSelector(state => state.appliedjobs.appliedjobs);
   const dispatch = useDispatch();

   useEffect(() => {
      setIsLoading(true);
      dispatch(appliedJobsActions.fetchAppliedJobs()).then(() => {
         setIsLoading(false);
      });
   }, [dispatch]);

   const selectItemHandler = (id) => {
      props.navigation.navigate('Detail', {
         jobsId: id,
      });
   };


   if (isLoading) {
      return (
         <View style={styles.centered}>
            <ActivityIndicator size='large' color={"#000"} />
         </View>
      )
   }


   return (
      <View style={styles.screen}>
         <ImageBackground source={require('../images/accountant.png')} 
                  style={{marginLeft:50, width:"100%",height:250}}>
                     <View style={styles.img_container}>
                          <TouchableOpacity onPress={()=>props.navigation.replace("Home")}>
                               <Image source={require('../images/back.png')} style={{width:25,height:10}}/>
                            </TouchableOpacity>
                    
                     </View>
         </ImageBackground>
         <View>
            <Text>CÔNG VIỆC MÀ BẠN ĐÃ ĐĂNG KÍ ỨNG TUYỂN</Text> 
         </View> 
         {appliedjobs.length === 0 ?
            <View style={styles.centered}>
               <Text>Chưa có công việc nào đã ứng tuyển</Text>
            </View> :
         <FlatList
            data={appliedjobs}
            keyExtractor={item => item.id}
            renderItem={itemData =>
               <AppliedCard
                  date={itemData.item.readableDate}
                  jobid={itemData.item.jobid}
                  title={itemData.item.title}
                  imageUrl={itemData.item.imageUrl}
                  time={itemData.item.time}
                  salary={itemData.item.salary}
                  onSelect={() => {
                     selectItemHandler(itemData.item.jobid);
                  }}
               />
            }/>}
      </View>
   )
};


const styles = StyleSheet.create({
   screen: {
      backgroundColor:"#f8f8f8",
      height:"100%",
      paddingHorizontal:20,
      width:"100%",
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
  open_text: {
   color:"#000000",
   marginTop:40,
   fontFamily:"Bold",
   alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  },
   centered: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
   }
})

export default Applied