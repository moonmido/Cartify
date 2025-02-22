import { View, Text, ActivityIndicator, ScrollView, Image, TouchableWithoutFeedback, Dimensions, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Feather from '@expo/vector-icons/Feather';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {doc,setDoc,getDoc,updateDoc,arrayUnion,arrayRemove} from "firebase/firestore"
import { db } from '../../Firebase/firebase';

const {width,height} = Dimensions.get("window");


const SeeAllTop = () => {
const navigation = useNavigation();
const [allPROD,setAllPROD] = useState([]);
const [loading,setLoading] = useState(true);
const [save,setSave] = useState(true);




const [counter,setCounter] = useState(0);


  const handleAllProd = async()=>{
    try {
      const response = await fetch('https://api.escuelajs.co/api/v1/products');
      const data = await response.json();
setCounter(data.length);
    setAllPROD(data);
    setLoading(false);
    } catch (error) {
     console.log(error); 
     setLoading(false);
    }
    }
    
useEffect(()=>{
handleAllProd();
},[]);

if(loading){
  return <ActivityIndicator size={"large"} color={"blue"}/>
}

    

  return (
<SafeAreaView>
<TouchableOpacity  style={{backgroundColor:"#ECEAEA",width:width*0.12,height:height*0.06,justifyContent:"center",alignItems:"center",borderRadius:35,margin:width*0.05}} onPress={()=>navigation.navigate('home')}>
<Ionicons name="chevron-back" size={24} color="black"/>
</TouchableOpacity>
    <ScrollView  showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom:100}}>
    <Text style={{fontWeight:"700",marginLeft:width*0.05,fontSize:20}}>All Products ({counter})</Text>
    <View
      style={{
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between", // Add spacing between cards
        padding: 10, // Optional padding for better alignment
      }}
    >
      {allPROD.map((item, index) => (
        <TouchableWithoutFeedback key={index} onPress={()=>navigation.navigate("prodview",{
title : item.title,
img : item.images,
price : item.price,
description : item.description


                })}>
          <View
            style={{
              marginTop: 15,
              height: height * 0.38,
              width: width * 0.4, // Half of the screen width
              backgroundColor: "white",
              borderRadius: 15,
              marginHorizontal: 5, // Adjust spacing between items
            }}
          >
          <TouchableOpacity key={item.id}>
          <Feather name="heart" size={16} color={save? "black" : "red"}  style={{position:"absolute",right:0,margin:8}}/>
          </TouchableOpacity>
            <Image
              source={{ uri: item.images[0] }}
              style={{
                width: width * 0.3,
                height: height * 0.25,
                resizeMode: "contain",
                marginLeft: width * 0.05,
              }}
            />
            <Text
              style={{
                fontSize: 12,
                paddingTop: 10,
                marginLeft: 7,
              }}
            >
              {item.title.length > 19 ? item.title.slice(0, 19) + "...." : item.title}
            </Text>
            <Text
              style={{
                fontWeight: "700",
                fontSize: 13,
                marginTop: 5,
                marginLeft: 7,
              }}
            >
              {item.price} $
            </Text>
          </View>
        </TouchableWithoutFeedback>
      ))}
    </View>

    </ScrollView>
    </SafeAreaView>
  )
}

export default SeeAllTop