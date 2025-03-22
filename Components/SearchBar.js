import { View, Text, TextInput, Dimensions, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import SeeAllTop from './TopSelling/SeeAllTop';
import { useNavigation } from '@react-navigation/native';

const {width,height} = Dimensions.get('window');


const SearchBar = () => {

    const [search,setSearch] = useState("");

const navigation = useNavigation();

  return (
    <View>
<TextInput placeholder='Search' value={search} onChangeText={(e)=>setSearch(e)} placeholderTextColor={"#272727"} style={styles.textInp}/>
    
<TouchableOpacity onPress={()=>navigation.navigate("seeAllTop",{search:search})} style={{backgroundColor:"red",position:"absolute",marginTop:height*0.01,right:65,borderRadius:25}}>
<Text style={{padding:5,fontWeight:"500",color:"white"}}>GO</Text>
</TouchableOpacity>
    
    </View>
  )
}


const styles = StyleSheet.create({

textInp :{
backgroundColor:"#ECEAEA",
width:width*0.83,
borderRadius:15,
paddingHorizontal:10
}

})

export default SearchBar