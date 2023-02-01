//giao diện xem hàng
import React, { useState } from 'react';
import { View, Text, Button, StyleSheet , Image} from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

import Card from './Card';
const AppliedCard = props => {

   return (
      <Card style={styles.card}>
      <TouchableOpacity 
          onPress={props.onSelect} style={styles.nor_container}>
              <View style={styles.nor_img}>
                  <Image source={{ uri: props.imageUrl }} style={{width:50,height:50}}/>
              </View>

              <View style={{paddingHorizontal:20}}>
                  <Text style={styles.nor_name}>{props.title}</Text>
                      <View style={styles.nor_descr_container}>
                          <Text style={styles.nor_descr}>{props.time}</Text>
                      </View>
              </View>
              <Text style={styles.nor_salary}>{props.salary} triệu</Text>
      </TouchableOpacity>
      <Text>Công việc đã ứng tuyển vào {props.date}</Text>
  </Card>
   )
};

const styles = StyleSheet.create({
    card: {
        flex:1
    },
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
      borderRadius:5,
      height:40,
      width:40,
      alignItems:"center",
      justifyContent:"center"
  },
  nor_name: {
      fontFamily:"ExtraBold",
      fontSize:13
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
      opacity:0.5
  },
  nor_salary: {
      fontFamily:"ExtraBold",
      fontSize:18,
      marginLeft:40,
      marginTop:10
  }
});

export default AppliedCard;