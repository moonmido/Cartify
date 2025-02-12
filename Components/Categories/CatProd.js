import { View, Text } from 'react-native'
import React from 'react'

const CatProd = ({route}) => {

    const {categorie} = route.params;
  return (
    <View>
      <Text>{categorie}</Text>
    </View>
  )
}

export default CatProd