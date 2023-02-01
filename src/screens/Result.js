import React, { useState, useEffect, useCallback } from 'react';
import {View,Text,Image,Button,TextInput,StyleSheet,FlatList,ActivityIndicator} from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector, useDispatch } from 'react-redux';

import ListCard from '../components/ListCard';

const Result = props => { 
    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [error, setError] = useState();
    const [filtered, setFiltered] = useState([]);
    const [filteredDataSource, setFilteredDataSource] = useState([]);
    const [masterDataSource, setMasterDataSource] = useState([]);
    const language = props.route.params ? props.route.params.language : null;
    const location = props.route.params ? props.route.params.location : null;
    const time = props.route.params ? props.route.params.time : null;
    const salarange = props.route.params ? props.route.params.salarange: 0;
    const min = salarange - 10;
    const jobs = useSelector(state => state.jobs.availableJobs);
    
    const filter1 = () => {
        if (language != 'null'){
            const lajobs = jobs.filter(jobs => jobs.language=== language)
            filter2(lajobs)
        }
        else{
            filter2(jobs);  
        }
    }
    const filter2 = (test1) => {
        if (location != 'null'){
            const lojobs = test1.filter(jobs => jobs.city=== location)
            filter3(lojobs)
        }
        else{
            filter3(test1);
        }
    }
    const filter3 = (test2) => {
        if (time != 'null'){
            const tjobs = test2.filter(jobs => jobs.time=== time)
            filter4(tjobs)
        }
        else{
            filter4(test2);  
        }
    }
    const filter4 = (test3) => {
        if (salarange != 0){
            const msjobs = test3.filter(jobs => jobs.salary >= min)
            filter5(msjobs)
        }
        else{
            setFiltered(test3);  
        }
    }
    const filter5 = (test4) => {
        if (salarange != 0){
            const smjobs = test4.filter(jobs => jobs.salary < salarange)
            setFiltered(smjobs)
        }
        else{
            setFiltered(test4);  
        }
    }


     useEffect(() => {
        filter1();
        console.log(salarange)
     }, []);


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
            <View style={styles.screen}>
                <View style={styles.img_container}>
                    <TouchableOpacity onPress={()=>props.navigation.replace("Home")}>
                        <Image source={require('../images/back.png')} style={{width:25,height:10}}/>
                    </TouchableOpacity>
                </View>
                   
                <Text style={styles.category}>Công việc dựa trên tìm kiếm của bạn</Text>
                        <View>
                            <FlatList
                                 refreshing={isRefreshing}
                                 data={filtered}
                                 keyExtractor={item => item.id}
                                 renderItem={itemData =>
                                    <ListCard
                                       image={itemData.item.imageUrl}
                                       title={itemData.item.title}
                                       time={itemData.item.time}
                                       salary={itemData.item.salary}
                                       company={itemData.item.company}
                                       onSelect={() => {
                                          selectItemHandler(itemData.item.id)
                                       }}
                                    >
                                    </ListCard>
                                 }
                              />
                        </View>
            </View>
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
    img_container: {
        backgroundColor:"#000",
        height:30,
        width:40,
        marginTop:70,
        borderRadius:8,
        alignItems:"center",
        justifyContent:"center"
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
        backgroundColor:"#FFF",
        borderRadius:5,
        padding:5,
        flexDirection:"row",
        alignItems:"center",
        marginTop:20,
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
 export default Result