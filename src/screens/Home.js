import React, { useState, useEffect, useCallback } from 'react';
import {View,Text,Image,Button,TextInput,StyleSheet,FlatList,ActivityIndicator,Modal} from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';

import * as jobsActions from '../store/actions/jobs';
import * as companyActions from '../store/actions/company';
import * as appliedJobsActions from '../store/actions/appliedjobs';
import SlideCard from '../components/SlideCard';
import ListCard from '../components/ListCard';

const Home = props => { 
    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [error, setError] = useState();
    const jobs = useSelector(state => state.jobs.availableJobs);
    const jobs1 = jobs.filter(jobs => jobs.salary >0).sort((a, b) => b.salary - a.salary);
    const hnjobs = jobs.filter(jobs => jobs.city == 'Hà Nội');
    const hcmjobs = jobs.filter(jobs => jobs.city == 'HCM');
    const reactwebjobs = jobs.filter(jobs => jobs.language == "ReactJS");
    const reactnativejobs = jobs.filter(jobs => jobs.language == "React Native");
    const company = useSelector(state => state.company.company);
    const appliedjobs = useSelector(state => state.appliedjobs.appliedjobs);
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
   useEffect(() => {
    setIsLoading(true);
    dispatch(companyActions.fetchCompany()).then(() => {
       setIsLoading(false);
    });
 }, [dispatch]);
 

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
   const filterHander = ()=>{
      props.navigation.navigate('Filter')
   }

   if (error) {
        console.log({error})
      return (
         <View style={styles.centered}>
            <Text>Lỗi hiển thị</Text>
            <Button title='Thử lại' onPress={loadJobs} />
         </View>
      )
   }

   if (isLoading) {
      return (
         <View style={styles.centered}>
            <ActivityIndicator size='large' />
         </View>
      )
   }

   if (!isLoading && jobs.length === 0) {
      return (
         <View style={styles.centered}>
            <Text>Chưa có việc làm</Text>
         </View>
      )
   }

        return(
            <ScrollView style={styles.screen}>
                <View style={styles.setting_container}>
                    <TouchableOpacity 
                            
                            onPress={() => props.navigation.push('UserOverview')}
                            
                            style={styles.setting_img}>
                            <Image source={require('../images/menu.png')} style={{width:70,height:70,marginTop:30}}/>
                    </TouchableOpacity>
                    <View>
                        <Text style={styles.open_text1}>Chào mừng bạn quay trở lại</Text> 
                        <Text style={styles.open_text2}>Tìm kiếm công việc phù hợp</Text>
                    </View>
                </View>
                <View style={styles.view_search}>
                {/* <View style={styles.searchInputContainer}>
                            <Icon name="search" size={30} color='#bdc3c7' />
                            <Text>Tìm kiếm công việc theo mong muốn</Text> 
                        </View> */}
                  <TouchableOpacity style={styles.searchIconContainer} onPress={() => filterHander() }>
                     <Icon name="filter-list" size={10} color='#ffffff' />
                  </TouchableOpacity>   
                </View>
                <Text style={styles.category}>Công việc nổi bật</Text>

               
                <View horizontal showsHorizontalScrollIndicator={false} style={{height:250}}>
                        <View>
                            <FlatList
                                 nestedScrollEnabled= {true}
                                 horizontal
                                 pagingEnabled={true}
                                 showsHorizontalScrollIndicator={false}
                                 onRefresh={loadJobs}
                                 refreshing={isRefreshing}
                                 data={jobs}
                                 keyExtractor={item => item.id}
                                 renderItem={itemData =>
                                    <SlideCard
                                       image={itemData.item.imageUrl}
                                       title={itemData.item.title}
                                       time={itemData.item.time}
                                       salary={itemData.item.salary}
                                       company={itemData.item.company}
                                       onSelect={() => {
                                          selectItemHandler(itemData.item.id);
                                       }}
                                    >
                                    </SlideCard>
                                 }
                              />
                        </View>

            </View>
                <Text style={styles.category}>Công việc lương cao</Text>

                        <View>
                        <FlatList
                                 nestedScrollEnabled= {true}
                                 horizontal
                                 pagingEnabled={true}
                                 showsHorizontalScrollIndicator={false}
                                 onRefresh={loadJobs}
                                 refreshing={isRefreshing}
                                 data={jobs1}
                                 keyExtractor={item => item.id}
                                 renderItem={itemData =>
                                    <SlideCard
                                       image={itemData.item.imageUrl}
                                       title={itemData.item.title}
                                       time={itemData.item.time}
                                       salary={itemData.item.salary}
                                       company={itemData.item.company}
                                       onSelect={() => {
                                          selectItemHandler(itemData.item.id);
                                       }}
                                    >
                                    </SlideCard>
                                 }
                              />
                        </View>

                        <Text style={styles.category}>Công việc tại Hà Nội</Text>

                        <View>
                        <FlatList
                                 nestedScrollEnabled= {true}
                                 horizontal
                                 pagingEnabled={true}
                                 showsHorizontalScrollIndicator={false}
                                 onRefresh={loadJobs}
                                 refreshing={isRefreshing}
                                 data={hnjobs}
                                 keyExtractor={item => item.id}
                                 renderItem={itemData =>
                                    <SlideCard
                                       image={itemData.item.imageUrl}
                                       title={itemData.item.title}
                                       time={itemData.item.time}
                                       salary={itemData.item.salary}
                                       company={itemData.item.company}
                                       onSelect={() => {
                                          selectItemHandler(itemData.item.id);
                                       }}
                                    >
                                    </SlideCard>
                                 }
                              />
                        </View>


                        <Text style={styles.category}>Công việc ReactJS</Text>

                        <View>
                        <FlatList
                                 nestedScrollEnabled= {true}
                                 horizontal
                                 pagingEnabled={true}
                                 showsHorizontalScrollIndicator={false}
                                 onRefresh={loadJobs}
                                 refreshing={isRefreshing}
                                 data={reactwebjobs}
                                 keyExtractor={item => item.id}
                                 renderItem={itemData =>
                                    <SlideCard
                                       image={itemData.item.imageUrl}
                                       title={itemData.item.title}
                                       time={itemData.item.time}
                                       salary={itemData.item.salary}
                                       company={itemData.item.company}
                                       onSelect={() => {
                                          selectItemHandler(itemData.item.id);
                                       }}
                                    >
                                    </SlideCard>
                                 }
                              />
                        </View>


                        <Text style={styles.category}>Công việc React Native</Text>

                        <View>
                        <FlatList
                                 nestedScrollEnabled= {true}
                                 horizontal
                                 pagingEnabled={true}
                                 showsHorizontalScrollIndicator={false}
                                 onRefresh={loadJobs}
                                 refreshing={isRefreshing}
                                 data={reactnativejobs}
                                 keyExtractor={item => item.id}
                                 renderItem={itemData =>
                                    <SlideCard
                                       image={itemData.item.imageUrl}
                                       title={itemData.item.title}
                                       time={itemData.item.time}
                                       salary={itemData.item.salary}
                                       company={itemData.item.company}
                                       onSelect={() => {
                                          selectItemHandler(itemData.item.id);
                                       }}
                                    >
                                    </SlideCard>
                                 }
                              />
                        </View>
            </ScrollView>
        )

}

export const screenOptions = {
    headerShown: false
 }

const styles = StyleSheet.create({
    screen: {
        backgroundColor:"#F8F8F8",
        paddingHorizontal:20,
        flex:1
    },
    search_container: {
        backgroundColor:"#F8F8F8",
        width:30,
        height:30,
        borderRadius:8,
        marginLeft:80,
        alignItems:"center",
        justifyContent:"center",
    },
    setting_container: {
        backgroundColor:"#FFF",
        borderRadius:5,
        padding:5,
        flexDirection:"row",
        height:110
    },
    setting_img: {
        backgroundColor:"#FFF",
        height:100,
        borderRadius:20,
        alignSelf: 'flex-end',
    },
    open_text1: {
        color:"#B0B0B0",
        marginTop:40,
        fontFamily:"Bold",
        flex:1
    },
    open_text2: {
        fontFamily:"ExtraBold",
        fontSize:16,
        marginTop:13,
        flex:1
    },
    view_search: {
        backgroundColor:"#F8F8F8",
        borderRadius:5,
        padding:5,
        flexDirection:"row",
        justifyContent: 'flex-end',
        marginTop:5,
    },
    searchInputContainer: {
      flex: 1,
      padding: 5,
      borderRadius: 5,
      alignItems: 'center',
      flexDirection: 'row',
      backgroundColor: '#ffffff'
  },
    searchIconContainer: {
      padding: 12,
      marginLeft: 10,
      borderRadius: 5,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#000000'
  },
    category: {
        fontFamily:"ExtraBold",
        marginTop:20,
        fontSize:15,
    },
    nor_container: {
        backgroundColor:"#FFF",
        marginTop:10,
        flexDirection:"row",
        borderRadius:10,
        height:60,
        alignItems:"center",
        paddingHorizontal:20,
        marginLeft: 30,
    },
    nor_img: {
        backgroundColor:"#DFDFDF",
        borderRadius:5,
        height:40,
        width:40,
        alignItems:"center",
        justifyContent:"center",
    },
    nor_name: {
        fontFamily:"ExtraBold",
        fontSize:13,
    },
    nor_descr_container: {
        backgroundColor:"#DFDFDF",
        borderRadius:5,
        width:70,
        alignItems:"center",
        marginVertical:5,
    },
    nor_descr: {
        fontFamily:"Medium",
        color:"#000",
        opacity:0.5,
    },
    nor_salary: {
        fontFamily:"ExtraBold",
        fontSize:18,
        marginLeft:40,
        marginTop:10,
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
     },
     textInputStyle: {
        height: 40,
        borderWidth: 1,
        paddingLeft: 20,
        margin: 5,
        borderColor: '#009688',
        backgroundColor: '#FFFFFF',
      },

 });
 export default Home