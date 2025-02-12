import { View, Text, SafeAreaView, StyleSheet, Dimensions, Button, TouchableOpacity, TextInput } from 'react-native'
import React, { useState } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import {getAuth, createUserWithEmailAndPassword,app,auth,setDoc,doc,getDoc,db} from '../Firebase/firebase';
import * as ImagePicker from 'expo-image-picker';
import Entypo from '@expo/vector-icons/Entypo';
const {width,height} = Dimensions.get('window');


const Signup = () => {

const [fname,setFname] = useState("");
const [email,setEmail] = useState("");
const [password,setPassword] = useState("");
const [lname,setLname] = useState("");
const [img,setImg] = useState(null);


    const navigation = useNavigation();


const handleImg=async()=>{

  let result = await ImagePicker.launchCameraAsync({
    aspect: [4, 3],
    allowsEditing:true,
    quality:1,
    mediaTypes:['images','videos'],
      });
    
      if(!result.canceled){
        setImg(result.assets[0].uri);
      }
    
    
}


const handleSignup= async()=>{

  if (email === "" || password === "" || fname === ""||lname==="" ) {
    Alert.alert("Error", "Please fill in all fields.");
    return;
  }




 await createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const user = userCredential.user;
     setDoc(doc(db,"Users",user.uid),{
      Fname : fname,
      Lname : lname,
      email : user.email,
      profPic:img,
      Favorite:[],
      Cart:[],
      CreatedAt: new Date()

     });
     console.log('User signed up and added to Firestore:', user);
     console.log('Navigating to signin...');
     navigation.navigate("signin");


  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });





}


  return (
    <SafeAreaView style={styles.container}>
<View style={{marginTop:height*0.08,marginLeft:width*0.08}}>
<TouchableOpacity  style={{backgroundColor:"#ECEAEA",width:width*0.12,height:height*0.06,justifyContent:"center",alignItems:"center",borderRadius:35}} onPress={()=>navigation.navigate('signin')}>
<Ionicons name="chevron-back" size={24} color="black"/>
</TouchableOpacity>
<View style={{marginTop:height*0.04}}>
<Text style={{fontSize:24,fontWeight:"700"}}>Create Account</Text>
<View style={{marginTop:height*0.038}}>
    <TextInput placeholder='Firstname' value={fname} onChangeText={(e)=>setFname(e)} style={{backgroundColor:"#ECEAEA",width:width*0.83,borderRadius:10,paddingHorizontal:10,height:height*0.07}}/>
    <TextInput placeholder='Lastname' value={lname} onChangeText={(e)=>setLname(e)} style={{backgroundColor:"#ECEAEA",width:width*0.83,borderRadius:10,marginTop:height*0.03,paddingHorizontal:10,height:height*0.07}}/>
    <TextInput placeholder='Email Address' keyboardType="email-address"  value={email} onChangeText={(e)=>setEmail(e)}  style={{backgroundColor:"#ECEAEA",width:width*0.83,borderRadius:10,marginTop:height*0.03,paddingHorizontal:10,height:height*0.07}}/>
    <TextInput placeholder='Password'  value={password} onChangeText={(e)=>setPassword(e)} keyboardType='visible-password'  style={{backgroundColor:"#ECEAEA",width:width*0.83,borderRadius:10,marginTop:height*0.03,paddingHorizontal:10,height:height*0.07}}/>
<TouchableOpacity style={{borderRadius:15,backgroundColor:"transparent",width:width*0.65,alignItems:"center",marginLeft:0,marginTop:height*0.05,borderWidth:0.5,borderColor:"#8E6CEF",elevation:20,shadowColor:"#8E6CEF"}} onPress={handleImg}>
  <Text style={{padding:5,fontWeight:"700"}}><Entypo name="folder-images" size={24} color="#8E6CEF" />   Select Profile picture</Text>
</TouchableOpacity>
<TouchableOpacity style={{marginTop:height*0.05,backgroundColor:"#8E6CEF",justifyContent:"center",alignItems:"center",width:width*0.83,borderRadius:25}} onPress={handleSignup}>
    <Text style={{padding:height*0.017,color:"white",fontWeight:"700"}}>Continue</Text>
</TouchableOpacity>
</View>
</View>
</View>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
container :{

width:"100%",
height:"100%"
}


})

export default Signup