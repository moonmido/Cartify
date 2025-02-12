import { View, Text, Dimensions, StyleSheet, TextInput, Pressable, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native';
import {signInWithEmailAndPassword,auth,getAuth} from '../Firebase/firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
const {width,height} = Dimensions.get('window');

const Signin = () => {
const navigation = useNavigation();


const [email ,setEmail ] = useState("");
const [password,setPassword] = useState("");


const handleSignin = async ()=>{
await signInWithEmailAndPassword(auth, email, password)
.then((userCredential) => {
  // Signed in 
  const user = userCredential.user;
  // ...
  console.log("Hey Mr ",user.email);
navigation.navigate("home");
  AsyncStorage.setItem('userID',user.uid);

})
.catch((error) => {
  const errorCode = error.code;
  const errorMessage = error.message;
});


}

  return (
    <SafeAreaView style={styles.container}>
    <View style={{marginTop:height*0.12,marginLeft:width*0.08}}>
    <Text style={{fontSize:25,fontWeight:"700"}}>Sign in</Text>
<View style={{marginTop:height*0.06}}>
<TextInput value={email} onChangeText={(e)=>setEmail(e)} placeholder='Email Address' style={{backgroundColor:"#ECEAEA",width:width*0.83,borderRadius:10,padding:12,height:height*0.07}}/>
<TextInput value={password} onChangeText={(e)=>setPassword(e)}  placeholder='Password' style={{backgroundColor:"#ECEAEA",width:width*0.83,borderRadius:10,padding:12,height:height*0.07,marginTop:height*0.03}}/>
<TouchableOpacity style={{marginTop:height*0.03,backgroundColor:"#8E6CEF",justifyContent:"center",alignItems:"center",width:width*0.83,borderRadius:25}} onPress={handleSignin}>
    <Text style={{padding:height*0.017,color:"white",fontWeight:"700"}}>Continue</Text>
</TouchableOpacity>
<Text onPress={()=>navigation.navigate("signup")} style={{marginTop:height*0.024,fontSize:12}}>Don't have an Account ? <Text style={{fontWeight:"800"}}>Create One</Text></Text>
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




export default Signin