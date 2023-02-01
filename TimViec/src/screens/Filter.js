import React, {useState} from 'react';
import { 
View,
ScrollView,  
Text,
StyleSheet,
TextInput,
TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as theme from '../UI/theme'
import {Picker} from '@react-native-community/picker'; 


const Filter = (props) => {
const [language, setLanguage] = useState('null')
const [location, setLocation] = useState('null')
const [time,setTime] = useState('null')
const [salarange,setSalarange] = useState(0)

const Reset = () => {
    setLanguage('null')
    setLocation('null')
    setTime('null')
    setSalarange(0)
};



const filterHander = () =>{
    props.navigation.navigate('Result', {
        language : language,
        location: location,
        time : time,
        salarange : salarange
    });
    console.log(salarange)
}


return (
    <ScrollView style={styles.container}>
        {/* Header */}
        <View  style={styles.header}>
            <TouchableOpacity onPress={() => props.navigation.goBack()}>
                <Icon name="keyboard-arrow-left" size={30} color={theme.colors.black} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Bộ lọc tìm kiếm</Text>
            <TouchableOpacity onPress={() => Reset()}>
                <Text style={{color: theme.colors.gray}}>Reset</Text>
            </TouchableOpacity>
        </View>

        {/* Body */}
        <View style={styles.body}>
            <Text style={styles.title}>Ngôn ngữ</Text>
            <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={language}
                    onValueChange={(itemValue, itemIndex) => setLanguage(itemValue)}>
                    <Picker.Item label="====Bất kỳ====" value = 'null' />
                    <Picker.Item label="React Native" value="React native" />
                    <Picker.Item label="ReactJS" value="ReactJS" />
                    <Picker.Item label="PHP" value="PHP" />
                    <Picker.Item label="WordPress" value="WordPress" />
                    <Picker.Item label="Java" value="Java" />
                    <Picker.Item label="C#" value="C#" />
                    <Picker.Item label="Swift" value="Swift" />
                    <Picker.Item label="Python" value="Python" />
                    <Picker.Item label="GoLang" value="GoLang" />
                    <Picker.Item label="Objective-C" value="Objective-C" />
                    <Picker.Item label="C/C++" value="C/C++" />
                </Picker>
            </View>

            <Text style={styles.title}>Khu vực làm việc</Text>
            <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={location}
                    onValueChange={(itemValue, itemIndex) => setLocation(itemValue)}>
                    <Picker.Item label="====Bất kỳ====" value = 'null' />
                    <Picker.Item label="Hà Nội" value="Hà Nội" />
                    <Picker.Item label="Thành phố Hồ Chí Minh" value="Thành phố Hồ Chí Minh" />
                    <Picker.Item label="Đà Nẵng" value="Đà Nẵng" />
                </Picker>
            </View>

            <Text style={styles.title}>Hình thức làm việc</Text>
            <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={time}
                    onValueChange={(itemValue, itemIndex) => setTime(itemValue)}>
                    <Picker.Item label="====Bất kỳ====" value = 'null'/>
                    <Picker.Item label="Fulltime" value="Fulltime" />
                    <Picker.Item label="Parttime" value="Parttime" />
                    <Picker.Item label="Thực tập" value="Thực tập" />
                </Picker>
            </View>

            <Text style={styles.title}>Mức lương</Text>
            <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={salarange}
                    onValueChange={(itemValue, itemIndex) => setSalarange(itemValue)}>
                    <Picker.Item label="====Bất kỳ====" value = {0} />
                    <Picker.Item label="3 triệu - 10 triệu" value={10}  />
                    <Picker.Item label="10 triệu - 20 triệu" value={20}/>
                    <Picker.Item label="20 triệu - 30 triệu" value={30}/>
                    <Picker.Item label="30 triệu - 40 triệu" value={40}/>
                    <Picker.Item label="40 triệu - 50 triệu" value={50}/>
                </Picker>
            </View>

        </View>

 

        {/* Footer */}
        <View style={{padding: 20, backgroundColor: theme.colors.white}}>
            <TouchableOpacity style={styles.btnContainer}  onPress={() => filterHander()}>
                <Text style={styles.btnText}>Tìm kiếm</Text>
            </TouchableOpacity>
        </View>
    </ScrollView>
);
};



const styles = StyleSheet.create({
container: {
    flex: 1, 
    backgroundColor: theme.colors.lightWhite
},
header: {
    height: 70,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.lightWhite
},
headerTitle: {
    fontWeight: 'bold',
    alignItems: 'center',
    fontSize: theme.sizes.h4
},
body: {
    flex: 1, 
    padding : 20,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    backgroundColor: theme.colors.white
},
title: {
    marginTop: 20,
    fontWeight: 'bold',
    fontSize: theme.sizes.h4
},
pickerContainer: {
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: theme.colors.black
},
normalText: {
    fontWeight: '900',
    fontSize: theme.sizes.h3,
    color: theme.colors.black
},
locationInputContainer: {
    marginTop: 10,
    paddingLeft: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: theme.colors.black,
    alignItems: 'center',
    flexDirection: 'row',
},
btnContainer: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.black
},
btnText: {
    fontWeight: 'bold',
    fontSize: theme.sizes.h4,
    color: theme.colors.white
}
});

export default Filter;