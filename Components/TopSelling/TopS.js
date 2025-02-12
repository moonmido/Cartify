import { View, Text,SafeAreaView, TouchableWithoutFeedback, Dimensions,Image,ActivityIndicator, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import Feather from '@expo/vector-icons/Feather';
import { useNavigation } from '@react-navigation/native'
import Categorie from '../Categories/Data';

const {width,height} = Dimensions.get("window");
const TopS = () => {

const [prod, setProd] = useState([]);
const [loading, setLoading] = useState(true);

const handleTopProd = async (limit = 6) => {
  try {
    const response = await fetch(`https://fakestoreapi.com/products?limit=${limit}`);
    const data = await response.json();
    setProd(data); // Set the fetched products directly
    setLoading(false);
  } catch (error) {
    console.error(error);
    setLoading(false);
  }
};


useEffect(() => {
  handleTopProd(); // Fetch top products when the component mounts
}, []);

if (loading) {
  return <ActivityIndicator size="large" color="#0000ff" />;
}




    const navigation = useNavigation();
  return (
    <SafeAreaView>

<View style={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}>
<Text style={{ fontSize: 16, fontWeight: "800" }}>Top Selling</Text>
        <TouchableWithoutFeedback onPress={() => navigation.navigate("seeAllTop")}>
          <Text style={{ fontSize: 16, marginRight: width * 0.15 }}>See All</Text>
        </TouchableWithoutFeedback>        
        </View>
        <ScrollView horizontal contentContainerStyle={{paddingRight:20}}>

{
            prod.map((item)=>(
                <TouchableWithoutFeedback onPress={()=>navigation.navigate("prodview",{
title : item.title,
img : item.image,
price : item.price,
description : item.description


                })}>
                <View style={{marginTop:15,height:height*0.38,width:width*0.45,display:"flex",marginHorizontal:10,backgroundColor:"white",borderRadius:15}}>
<Image source={{uri:item.image}} style={{width:width*0.3,height:height*0.25,resizeMode:"contain",marginLeft:width*0.07}}/>

<Text style={{fontSize:12,paddingTop:10,marginLeft:7}}>{item.title.length>19 ? item.title.slice(0,19)+"...." : item.title}</Text>
<Text style={{fontWeight:"700",fontSize:13,marginTop:5,marginLeft:7}}>{item.price} $</Text>
</View>
          </TouchableWithoutFeedback>      
            ))
            
        }
        </ScrollView>

    </SafeAreaView>

  )
}

export default TopS