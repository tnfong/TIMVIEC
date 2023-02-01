import React, { useEffect, useState, useCallback} from 'react';
import {ScrollView,View,ImageBackground, Image,Text, StyleSheet,FlatList} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector, useDispatch } from 'react-redux';

import ListCard from '../components/ListCard';

const Company = props => {
    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [error, setError] = useState();

    const companyId = props.route.params ? props.route.params.cid : null;
    const company = useSelector(state => state.company.company.find(company => company.id === companyId));
    const comjobs = useSelector(state => state.jobs.availableJobs.filter(jobs => jobs.comid == companyId));
    const dispatch = useDispatch();

    const loadJobs = useCallback(async () => {
      setError(null);
      setIsRefreshing(true);
      try {
         await dispatch(jobsActions.fetchJobs());
      } catch (err) {
         setError(err.message)
      }
      
      setIsRefreshing(false);
   }, [dispatch, setIsLoading, setError]);

    useEffect(() => {
      const unsubscribe = props.navigation.addListener('focus', loadJobs)

      return () => {
         unsubscribe();
      };
    }, [loadJobs]);

   useEffect(() => {
      setIsLoading(true);
      loadJobs().then(() => {
         setIsLoading(false);
      });
   }, [dispatch, loadJobs]);

   const selectItemHandler = (id) => {
    props.navigation.navigate('Detail', {
       jobsId: id,
    });
 };



        return(
            <ScrollView style={styles.screen} nestedScrollEnabled> 
            <ImageBackground source={require('../images/buisness.png')} 
                  style={{marginLeft:50, width:"100%",height:250}}>
                      <View style={styles.img_container}>
                          <TouchableOpacity onPress={()=>props.navigation.replace("Home")}>
                               <Image source={require('../images/back.png')} style={{width:25,height:10}}/>
                            </TouchableOpacity>
                    
            </View>
            </ImageBackground>
                    <View style={{backgroundColor:"#FFF",padding:10,borderRadius:15}}>
                            <View style={{ flexDirection:"row",alignItems:"center",borderRadius:15}}>
                            <Image source={{ uri: company.imageUrl }} style={{width:70,height:70,opacity:0.5}}/>
                                <View>
                                    <Text style={styles.company_title}>{company.title}</Text>
                                    <Text style={styles.company_scale}>Quy mô: {company.scale}</Text>
                                    <Text style={styles.company_website}>Website: {company.website}</Text>
                                </View>                                                            
                            </View>
                    </View>
                    <View style={styles.view_descr}>
                        <Text style={{fontFamily:"ExtraBold",fontSize:20,marginBottom:10}}>Giới thiệu công ty</Text>
                        <Text style={{fontFamily:"SemiBold",color:"#B2B2B2",}}> 
                            {company.about}
                        </Text>
                    </View>
                    <View style={styles.view_descr}>
                        <Text style={{fontFamily:"ExtraBold",fontSize:20,marginBottom:10}}>Địa chỉ công ty</Text>
                        <Text style={{fontFamily:"SemiBold",color:"#B2B2B2",}}> 
                            {company.location}
                        </Text>
                    </View>
                    <View style={styles.view_descr}>
                        <Text style={{fontFamily:"ExtraBold",fontSize:20,marginBottom:10}}>Công việc đang tuyển dụng</Text>
                    </View>
                    <View horizontal showsHorizontalScrollIndicator={true} style={{height:250}}>
                        <View>
                            <FlatList
                                 nestedScrollEnabled = {true}
                                onRefresh={loadJobs}
                                 refreshing={isRefreshing}
                                 data={comjobs}
                                 keyExtractor={item => item.id}
                                 renderItem={itemData =>
                                    <ListCard
                                       image={itemData.item.imageUrl}
                                       title={itemData.item.title}
                                       time={itemData.item.time}
                                       salary={itemData.item.salary}
                                       company={itemData.item.company}
                                       onSelect={() => {
                                          selectItemHandler(itemData.item.id);
                                       }}
                                    >
                                    </ListCard>
                                 }
                              />
                        </View>

            </View>
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
        zIndex: 2,
        position: 'absolute',
        backgroundColor:"#000",
        height:30,
        width:40,
        marginLeft:-50,
        marginTop:70,
        borderRadius:8,
        alignItems:"center",
        justifyContent:"center"
    },
    company_title: {
        fontSize:20,
        fontFamily:"ExtraBold"
    },
    company_scale: {
        fontFamily:"ExtraBold",
        color:"#000",
        opacity:0.6,
        fontSize:16
    },
    company_website:{
        justifyContent:'flex-start',
        fontFamily:"Bold",
        fontSize:14,
        color:"#B8B8B8",
    },
    view_descr: {
        backgroundColor:"#f8f8f8",
        borderRadius:15,
        padding:20,
        marginTop:20
    }
 });

 export default Company