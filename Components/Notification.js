import { View, Text, SafeAreaView, TouchableOpacity, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { db,getDoc,updateDoc,doc } from '../Firebase/firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
const {width,height} = Dimensions.get("window");

const Notification = () => {

  const [notifications,setNotifications] = useState([]);

useEffect(()=>{
const handleNotification = async()=>{
  const userID = await AsyncStorage.getItem('userID');
  const userCond = await getDoc(doc(db,'Users',userID));
setNotifications([ userCond.data().Notification,...notifications]);
}
handleNotification();
},[])
const navigation = useNavigation();

  return (
    <ScrollView style={{marginTop:height*0.09,marginLeft:width*0.05}}>
    <View>
    <TouchableOpacity style={{backgroundColor:"#ECEAEA",width:width*0.12,height:height*0.06,justifyContent:"center",alignItems:"center",borderRadius:35}} onPress={()=>navigation.navigate('home')}>
<Ionicons name="chevron-back" size={24} color="black"/>
</TouchableOpacity>
    </View>

<View style={{marginTop:height*0.05}}>
<View style={{display:"flex",flexDirection:"row",justifyContent:"space-around",backgroundColor:"#ECEAEA",width:width*0.9,padding:18,borderRadius:15}}>
<Ionicons name="notifications" size={24} color="black"  style={{marginTop:height*0.04}}/>
<Text style={{width:width*0.8,paddingHorizontal:20}}>{notifications}</Text>
</View>
</View>


    </ScrollView>
  )
}

export default Notification