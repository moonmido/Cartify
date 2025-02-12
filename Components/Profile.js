import { View, Text, Image, Dimensions, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import {doc,getAuth, db, getDoc} from '../Firebase/firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';

const {width,height} = Dimensions.get('window');


const Profile = () => {
const [profPIC,setProfPIC] = useState("");


useEffect(()=>{


    const handleUser = async()=>{

        try {
            const userID = await AsyncStorage.getItem("userID")
            const user = await getDoc(doc(db,"Users",userID));
    if(user.exists()){
    setProfPIC(user.data().profPic);
    console.log("User connected with img : ",user.data().profPic);
    }
    
        } catch (error) {
            console.error(error);
        }
    
    }
    
handleUser();

},[])

const navigation = useNavigation();
  return (
    <View style={{display:"flex",flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
<Image source={{uri:profPIC}} style={{width:width*0.15,height:height*0.075,borderRadius:25}}/>
<TouchableOpacity onPress={()=>navigation.navigate("notification")} style={{backgroundColor:"#8E6CEF",marginRight:width*0.15,borderRadius:25}}>
    <Text style={{padding:8}}><Ionicons name="notifications" size={24} color="white" /></Text>
</TouchableOpacity>
    </View>
  )
}

export default Profile