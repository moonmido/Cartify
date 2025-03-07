import { View, Text, SafeAreaView, ActivityIndicator, Dimensions, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import {getAuth, createUserWithEmailAndPassword,app,auth,setDoc,doc,getDoc,db,signInWithEmailAndPassword,updateDoc} from '../Firebase/firebase'
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const {width,height} = Dimensions.get('window');
const Favorite = () => {

const [favProd,setFavProd] = useState([]);
const [loading,setLoading] = useState(true);


const handleFavProd = async()=>{
try {
  const userID = await AsyncStorage.getItem('userID');
  const userData = await getDoc(doc(db,'Users',userID));
  if(userData.exists()){
let fav = userData.data().Favorite || [];
setFavProd(fav);
console.log(userData.data());
setLoading(false);
  }
} catch (error) {
  console.error(error);
  setLoading(true);
}
}

useEffect(()=>{
  handleFavProd();
},[favProd])



  return (
    <SafeAreaView>
    <View>
      {
        loading &&<ActivityIndicator color={'blue'}/>
      }
    </View>
    <View style={{top:height*0.1}}>
      <Text style={{textAlign:"center",fontSize:16,fontWeight:"800"}}>Favorite</Text>
    </View>
    <ScrollView style={{marginTop:height*0.15}} contentContainerStyle={{paddingBottom:100}} showsVerticalScrollIndicator={false}>
{
  favProd.length >0 ?(
  favProd.map((item,index)=>(
  <View key={index} style={{elevation:20,marginTop: height * 0.02, flexDirection: "row", backgroundColor: "#ECEAEA", width: width * 0.99, paddingVertical: 15, marginLeft: 2}}>
    <Image source={{uri: item.img[0]}} style={{width: width * 0.2, height: height * 0.1,resizeMode:"contain",borderRadius:10,backgroundColor:"white"}} />
    <View style={{width: width * 0.65, marginTop: 5,marginLeft:10}}>
      <Text style={{fontSize: 13}}>
        {item.title.length > 20 ? item.title.slice(0, 20) + "..." : item.title}
      </Text>
      <View style={{flexDirection: "row", marginTop: height * 0.015}}>
        <Text>Size - <Text style={{fontWeight: "800", color: "black"}}>M</Text></Text>
        <Text style={{paddingHorizontal: 25}}>Quant : <Text style={{fontWeight: "800", color: "black"}}>{item.quan}</Text></Text>
      </View>
    </View>
    <View style={{justifyContent:"center",alignItems:"center",marginLeft:-width*0.11}}>
      <Text style={{marginTop: 3, fontWeight: "800", color: "black",fontSize:13}}>${item.price.toFixed(2)}</Text>
    </View>
  </View>
))) : (
  <Text>Empty Favorite List</Text>
)
}
</ScrollView>

      </SafeAreaView>
  )
}

export default Favorite