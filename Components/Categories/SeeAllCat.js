import { View, Text, TouchableWithoutFeedback,TouchableOpacity, Dimensions, Image, ScrollView } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import Categorie from './Data'
import Ionicons from '@expo/vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context'

const {width,height} = Dimensions.get("window");

const SeeAllCat = () => {
    const navigation = useNavigation();
  return (
    <SafeAreaView>

<ScrollView  style={{marginTop:height*0.03,marginLeft:width*0.08}}>
<TouchableOpacity  style={{backgroundColor:"#ECEAEA",width:width*0.12,height:height*0.06,justifyContent:"center",alignItems:"center",borderRadius:35}} onPress={()=>navigation.navigate('home')}>
<Ionicons name="chevron-back" size={24} color="black"/>
</TouchableOpacity>
    <View style={{marginTop:height*0.04}}>
    <Text style={{fontSize:22,fontWeight:"800"}}>Shop by Categories</Text>
    <View style={{marginTop:height*0.02}}>

{
  Categorie.map((item)=>(
    <TouchableOpacity key={item.id}>

    <View key={item.id} style={{marginTop:height*0.02,width:width*0.8}}>
    <View style={{display:"flex",flexDirection:"row",alignItems:"center",backgroundColor:"#ECEAEA",padding:10,borderRadius:15}}>
    <Image source={{uri:item.img}} style={{width:width*0.15,height:height*0.07,borderRadius:15}}/>
<Text style={{marginLeft:width*0.05}}>{item.title}</Text>
</View>
</View>
    </TouchableOpacity>

  ))
}
</View>
</View>

</ScrollView>




    </SafeAreaView>
  )
}

export default SeeAllCat