import { View, Text, SafeAreaView, TouchableOpacity, Dimensions, ScrollView, Image, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import {doc,setDoc,getDoc,updateDoc,arrayUnion,arrayRemove} from "firebase/firestore"
import { db } from '../Firebase/firebase';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
const {width,height} = Dimensions.get('window');

const Cart = () => {

const [card,setCard] = useState([]);


const handleOrder = async() =>{
try {
  const userID = await AsyncStorage.getItem('userID');
  if(userID.length===0){
    Alert.alert("Please Log in ");
  }
await setDoc(doc(db,"Orders",userID),{
  list_orders : card,
})

} catch (error) {
  
}

}



useEffect(() => {
  const handleCart = async () => {
    try {
      const userID = await AsyncStorage.getItem("userID");
      if (userID) {
        const user = await getDoc(doc(db, "Users", userID));
        if (user.exists()) {
          let CardK = user.data().Cart || [];
          console.log("Card Data:", CardK); // Debugging
          setCard(CardK);
        } else {
          console.log("User does not exist!");
        }
      } else {
        console.log("No userID found in AsyncStorage.");
      }
    } catch (error) {
      console.log("Error fetching cart data:", error);
    }
  };
  handleCart();

}, [card]);


const totale = card.reduce((sum,item)=>{
  return sum+(item.price * item.quan);
  },0)
  



const handleRemoveAll = async () => {
  try {
    const userID = await AsyncStorage.getItem("userID");
    const user = await getDoc(doc(db, "Users", userID));

    if (user.exists()) {
      await updateDoc(doc(db, "Users", userID), {
        Cart: []  // Setting Cart to an empty array
      });
      setCard([]);  // Clear the local state as well

await updateDoc(doc(db,"Orders",userID),{
  list_orders : [] 
})

    }

  } catch (error) {
    console.log("Error removing all products:", error);
  }
};




const handleRemove=async(item)=>{
const userID = await AsyncStorage.getItem("userID");
const user = await getDoc(doc(db,"Users",userID));

if(user.exists()){

  await updateDoc(doc(db,"Users",userID),{
    Cart : arrayRemove({
      img: item.img,
      price: item.price,
      quan: item.quan,
      title: item.title
    })
  })
await updateDoc(doc(db,"Orders",userID),{
  list_orders : arrayRemove({
    img: item.img,
      price: item.price,
      quan: item.quan,
      title: item.title
  })
})
}

}






  const navigation = useNavigation();

  return (
    <ScrollView  style={{marginTop:height*0.05,width:width,height:"100%"}} contentContainerStyle={{paddingBottom:100}}>
<View style={{marginTop:height*0.05}}>
<Text style={{fontWeight:"800",fontSize:18,textAlign:"center"}}>Cart</Text>
</View>

{
  card.length!==0 && (
<View style={{marginTop:height*0.05,marginRight:width*0.03}}>
<TouchableOpacity style={{width:width*0.32,position:"absolute",right:0}} onPress={handleRemoveAll}>
  <Text style={{textAlign:"right",fontSize:16,padding:3}}>Remove All</Text>
</TouchableOpacity>
</View>
)}

{
  console.log(card)
}
<View style={{marginTop:height*0.05}}>

{
  card.length===0 &&(
    <View style={{justifyContent:"center",alignItems:"center",marginTop:height*0.15}}>
     <FontAwesome5 name="shopping-bag" size={110} color="#fcba03" /> 
     <Text style={{marginTop:30,fontSize:22,fontWeight:"500"}}>Your Cart is Empty</Text>
     <TouchableOpacity onPress={()=>navigation.navigate("seeAllTop")} style={{marginTop:height*0.03,backgroundColor:"#8E6CEF",borderRadius:25}}>
      <Text style={{padding:15,color:"white"}}>Explore Products</Text>
     </TouchableOpacity>
     </View>
     )
}



{
  card.map((item, index) =>(
  <View key={index} style={{elevation:15,marginTop: height * 0.02, flexDirection: "row", backgroundColor: "#ECEAEA", width: width * 0.99, paddingVertical: 15, borderRadius: 15, marginLeft: 2}}>
    <Image source={{uri: item.img}} style={{width: width * 0.2, height: height * 0.1,resizeMode:"contain",borderRadius:10,backgroundColor:"white"}} />
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
      <TouchableOpacity onPress={()=>handleRemove(item)} style={{marginTop: height * 0.015, backgroundColor: "#8E6CEF", borderRadius: 55, width: width * 0.09, height: height * 0.045, marginLeft: 5}}>
        <FontAwesome name="remove" size={20} color="white" style={{textAlign: "center", padding: 4}} />
      </TouchableOpacity>
    </View>
  </View>
))}

{
card.length!==0 && (
<View style={{justifyContent:"center",alignItems:"center",marginTop:height*0.15}}>
<TouchableOpacity onPress={handleOrder} style={{backgroundColor:"#8E6CEF",borderRadius:35}}>
  <Text style={{padding:20,fontWeight:"800",fontSize:15,color:"white"}}>Checkout $ {totale.toFixed(2)}</Text>
</TouchableOpacity>
</View>
)}
</View>

</ScrollView>  

)
}

export default Cart