import React, { useState, useEffect } from 'react';
import {View,Text,Image,TextInput,StyleSheet} from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
const ListCard = props => {
    return (
        <View>
            <TouchableOpacity 
                onPress={props.onSelect} style={styles.nor_container}>
                    <View style={styles.nor_img}>
                        <Image source={{ uri: props.image }} style={{width:50,height:50}}/>
                    </View>

                    <View style={{paddingHorizontal:20}}>
                        <Text style={styles.nor_name}>{props.title}</Text>
                            <View style={styles.nor_descr_container}>
                                <Text style={styles.nor_descr}>{props.time}</Text>
                            </View>
                    </View>
                    <Text style={styles.nor_salary}>{props.salary} triệu</Text>
            </TouchableOpacity>
        </View>
    )
 };
 
 const styles = StyleSheet.create({
    nor_container: {
        backgroundColor:"#FFF",
        marginTop:10,
        flexDirection:"row",
        borderRadius:10,
        height:60,
        alignItems:"center",
        paddingHorizontal:20,
    },
    nor_img: {
        backgroundColor:"#DFDFDF",
        height:40,
        width:40,
        alignItems:"center",
        justifyContent:"center"
    },
    nor_name: {
        fontFamily:"ExtraBold",
        fontSize:10
    },
    nor_descr_container: {
        backgroundColor:"#DFDFDF",
        borderRadius:5,
        width:70,
        alignItems:"center",
        marginVertical:5
    },
    nor_descr: {
        fontFamily:"Medium",
        color:"#000",
        opacity:0.5,
        fontSize:10
    },
    nor_salary: {
        fontFamily:"ExtraBold",
        fontSize:12,
        marginLeft:40,
    }
 });
 
 export default ListCard;