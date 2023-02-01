import React, { useState, useEffect } from 'react';
import {View,Text,Image,TextInput,StyleSheet} from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
const SlideCard= props => {
    return (
        <View style={styles.pop_container}>
            <Image source={{ uri: props.image }} style={{width:200,height:150,alignItems:"center"}}/>
            <TouchableOpacity onPress={props.onSelect} style={styles.pop_img}>
                <Text style={styles.pop_name}>{props.title}</Text>
                <Text style={styles.pop_company}>{props.company}</Text>
                <View style={{flexDirection:"row",marginTop:4}}>
                    <View style={styles.pop_descr_container}>
                        <Text style={styles.pop_descr}>{props.time}</Text>
                    </View>
                    <Text style={styles.pop_salary}>{props.salary} triệu</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
 };
 
 const styles = StyleSheet.create({
    pop_container:{
        backgroundColor:"#FFF",
        height:250,
        width:200,
        borderRadius:20,
        marginLeft: 10,
    },
    pop_img: {
        backgroundColor:"#000",
        height:100,
        borderRadius:20,
        marginTop:-10,
        paddingHorizontal:8,
        paddingVertical:8,
        alignItems:"center",
    },
    pop_name: {
        color:"#FFF",
        fontFamily:"SemiBold",
        fontSize:13,
    },
    pop_company: {
        color:"#B0B0B0",
        fontFamily:"Medium",
        fontSize:10,
        alignItems:"center",
        marginTop:5,
    },
    pop_descr_container: {
        backgroundColor:"#3E3C3C",
        paddingHorizontal:5,
        alignItems:"center",
        justifyContent:"center",
        borderRadius:5
    },
    pop_descr:{
        color:"#B0B0B0",
        fontFamily:"Bold",
        fontSize:13
    },
    pop_salary: {
        color:"#B0B0B0",
        fontFamily:"Bold",
        fontSize:13,
        marginLeft:25
    }
 });
 
 export default SlideCard;