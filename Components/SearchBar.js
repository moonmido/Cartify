import { View, Text, TextInput, Dimensions, StyleSheet } from 'react-native'
import React, { useState } from 'react'

const {width,height} = Dimensions.get('window');


const SearchBar = () => {

    const [search,setSearch] = useState("");

  return (
    <View>
<TextInput placeholder='Search' value={search} onChangeText={(e)=>setSearch(e)} placeholderTextColor={"#272727"} style={styles.textInp}/>
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