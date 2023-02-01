//giao diện trang đtặ hàng
import React, { useEffect, useState , useCallback} from 'react';
import { View, Text, FlatList, Platform, ActivityIndicator, StyleSheet, ImageBackground, Image } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector, useDispatch } from 'react-redux';
import { AntDesign } from '@expo/vector-icons'; 

import SavedCard from '../components/SavedCard';
import * as savedJobsActions from '../store/actions/savedjobs';

const Saved = props => {
   const [isLoading, setIsLoading] = useState(false);
   const savedjobs = useSelector(state => state.savedjobs.savedjobs);
   const dispatch = useDispatch();

   useEffect(() => {
      setIsLoading(true);
      dispatch(savedJobsActions.fetchSavedJobs()).then(() => {
         setIsLoading(false);
      });
   }, [dispatch]);

   const selectItemHandler = (id) => {
      props.navigation.navigate('Detail', {
         jobsId: id,
      });
    console.log(id)
   };

   const deleteHandler = (id) => {
      setError(null);
      setIsDeleting(true);
      try {
         dispatch(savedJobsActions.unSaved(id));
      } catch (err) {
         setError(err.message);
         }
      setIsDeleting(false);
    }

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
            <Text>CÔNG VIỆC MÀ BẠN ĐÃ YÊU THÍCH</Text> 
         </View> 
         {savedjobs.length === 0 ?
            <View style={styles.centered}>
               <Text>Chưa có công việc nào đã ứng tuyển</Text>
            </View> :
         <FlatList
            data={savedjobs}
            keyExtractor={item => item.id}
            renderItem={itemData =>
               <SavedCard
                  jobid={itemData.item.jobid}
                  title={itemData.item.title}
                  imageUrl={itemData.item.imageUrl}
                  time={itemData.item.time}
                  salary={itemData.item.salary}
                  onSelect={() => {
                     selectItemHandler(itemData.item.jobid);
                  }}
               >
               <AntDesign name="delete" size={100}  style={styles.button}
                     onPress={() => {
                        deleteHandler(itemData.item.id);
                     }}/>
               <View><Text>dmm</Text></View>
               </SavedCard>
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
   alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  },
   centered: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
   },
   button:{
      margin:'10px',
   }
})

export default Saved