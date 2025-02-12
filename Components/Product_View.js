import { View, Text, SafeAreaView, TouchableOpacity, Dimensions, Image } from 'react-native'
import React, { use, useEffect, useState } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import AntDesign from '@expo/vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native-gesture-handler';
import {db} from '../Firebase/firebase';
import {doc,setDoc,getDoc,updateDoc,arrayUnion,arrayRemove} from "firebase/firestore"
const {width,height} = Dimensions.get("window");
const Product_View = ({route}) => {
const navigation = useNavigation();
const {title,price,description,img} = route.params;
const [quan,setQuan] = useState(1);
const [sColor,setSColor] = useState("gray");
const [save,setSave] = useState(false);







const handleSave = async () => {
  try {
    const userID = await AsyncStorage.getItem('userID');

    if (!userID) {
      console.log("User ID not found");
      return;
    }

    const userRef = doc(db, "Users", userID);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      console.log("User document does not exist.");
      return;
    }

    let favorites = userSnap.data().Favorite || []; // الحصول على المنتجات المخزنة

    // التحقق إذا كان المنتج موجودًا في المفضلة
    const existingItem = favorites.find(item => item.title === title);

    if (existingItem) {
      if (existingItem.quan !== quan) {
        // تحديث الكمية إذا كانت مختلفة
        const updatedFavorites = favorites.map(item =>
          item.title === title ? { ...item, quan } : item
        );

        await updateDoc(userRef, { Favorite: updatedFavorites });
        console.log("Updated quantity for:", title);
      } else {
        console.log("Item already exists with the same quantity.");
      }
    } else {
      // إضافة المنتج إذا لم يكن موجودًا
      await updateDoc(userRef, {
        Favorite: arrayUnion({ title, img, price}),
      });
      console.log("Saved new item:", title);
    }
  } catch (error) {
    console.log("Error saving:", error);
  }
};



const handleRemove = async()=>{
  const userID = await AsyncStorage.getItem('userID');
try {
await updateDoc(doc(db,'Users',userID),{
Favorite : arrayRemove({title,img,price}),
});
console.log("product = ",title," for ID = ",userID, " Deleted");
} catch (error) {
  console.error(error);
}
}

const SAVE_KEY = `${title}_saved`; // Unique key for this movie's save status

// Load the save state when the component mounts
useEffect(() => {
  const loadSaveState = async () => {
    try {
      const savedState = await AsyncStorage.getItem(SAVE_KEY);
      if (savedState !== null) {
       setSave(JSON.parse(savedState)); // Convert string to boolean
      }
    } catch (error) {
      console.error("Failed to load save state:", error);
    }
  };

  loadSaveState();
}, []);

// Save the state to AsyncStorage whenever it changes
useEffect(() => {
  const storeSaveState = async () => {
    try {
      await AsyncStorage.setItem(SAVE_KEY, JSON.stringify(save));
    } catch (error) {
      console.error("Failed to save state:", error);
    }
  };

  storeSaveState();
}, [save]);



useEffect(() => {
  console.log('Save state updated:', save);
  if(save){
    handleSave();
    console.log("Saved");
  }else{
    handleRemove();
  }

}, [save]); // This will run whenever `save` changes





const handleAddToCart= async ()=>{
  try {
    const userID = await AsyncStorage.getItem("userID");
    const user = await getDoc(doc(db,"Users",userID));
if(user.exists()){
let temCart = user.data().Cart || [];
const exist = temCart.find(item=>item.title===title);
if(exist){
  if(exist.quan !==quan){
const updCard = temCart.map(item=>item.title===title ? {...item,quan} : item);    
    await updateDoc(doc(db,"Users",userID),{
      Cart : updCard,
    })  
  }
}else{
  await updateDoc(doc(db,"Users",userID),{
    Cart : arrayUnion({title,quan,price,img}),
  });
}
}
    console.log("Send to Cart of user ID = ",userID);
  } catch (error) {
    console.error(error);
  }

  
}





  return (
    <ScrollView style={{marginTop:height*0.09,marginLeft:width*0.05}} contentContainerStyle={{paddingBottom:50}} showsVerticalScrollIndicator={false}>
<View style={{justifyContent:"space-between",display:"flex",flexDirection:"row"}}>
<TouchableOpacity     style={{backgroundColor:"#ECEAEA",width:width*0.12,height:height*0.06,justifyContent:"center",alignItems:"center",borderRadius:35}} onPress={()=>navigation.navigate('home')}>
<Ionicons name="chevron-back" size={24} color="black"/>
</TouchableOpacity>
<TouchableOpacity onPress={()=>setSave((e)=>!e)} style={{backgroundColor:"#ECEAEA",width:width*0.12,height:height*0.06,justifyContent:"center",alignItems:"center",borderRadius:35,marginRight:width*0.05}}>
<AntDesign name="heart" size={21} color={save ? "red" : "gray"} />
</TouchableOpacity>
</View>
<View style={{marginTop:height*0.03,width:width*0.9}}>
<Image source={{uri:img}} style={{width:width*0.55,height:height*0.4, resizeMode:"contain",marginLeft:width*0.18,backgroundColor:"white",borderRadius:15}}/>
<Text style={{marginTop:height*0.03,fontWeight:"800"}}>{title}</Text>
<Text style={{color:"#8E6CEF",fontWeight:"700",marginTop:10}}>$ {price} </Text>

<View style={{backgroundColor:"#ECEAEA",width:width*0.9,height:height*0.1,marginTop:20,position:"relative",borderRadius:15}}>
<Text style={{padding:20,alignItems:"center",justifyContent:"center"}}>Quantity</Text>
<View style={{position:"absolute",display:"flex",flexDirection:"row",right:0,margin:height*0.025}}>
<TouchableOpacity style={{marginRight:width*0.1,backgroundColor:"#8E6CEF",borderRadius:35 , width:30,paddingLeft:9}} onPress={()=>setQuan(quan+1)}>
  <Text style={{fontSize:20,color:"white",fontWeight:"700"}}>+</Text>
</TouchableOpacity>
<Text style={{marginRight:width*0.1,fontSize:15,marginTop:5}}>{quan}</Text>
<TouchableOpacity style={{backgroundColor:"#8E6CEF",borderRadius:35 , width:30,paddingLeft:11}}  onPress={()=>quan==0 ? setQuan(0) : setQuan(quan-1)}>
  <Text style={{fontSize:20,color:"white",fontWeight:"700"}}>-</Text>
</TouchableOpacity>
</View>
</View>
<View style={{marginTop:height*0.03}}>
<Text style={{color:"#656565"}}>{description}</Text>
<TouchableOpacity onPress={handleAddToCart} style={{marginTop:height*0.08,backgroundColor:"#8E6CEF",width:width*0.9,display:"flex",flexDirection:"row",borderRadius:30}}>
  <Text style={{padding:height*0.03,fontWeight:"800",color:"white"}}>$ {price}</Text>
  <Text style={{padding:height*0.03,marginLeft:width*0.2,color:"white"}}>Add to Bag</Text>
</TouchableOpacity>
</View>



</View>





    </ScrollView>
  )
}

export default Product_View