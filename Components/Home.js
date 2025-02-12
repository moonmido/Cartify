import React from 'react';
import { View, SafeAreaView, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Profile from './Profile';
import SearchBar from './SearchBar';
import Cat from './Categories/Cat';
import TopS from './TopSelling/TopS';
import Cart from './Cart';
import Favorite from './Favorite';
import Fontisto from '@expo/vector-icons/Fontisto';
import AntDesign from '@expo/vector-icons/AntDesign';
const Tab = createBottomTabNavigator();
const MainHome = () => {
  return (
    <SafeAreaView style={styles.container}>
    <ScrollView contentContainerStyle={{paddingBottom:50}}>
      <Profile />
      <View style={{ marginTop: height * 0.02 }}>
        <SearchBar />
      </View>
      <View style={{ marginTop: height * 0.02 }}>
        <Cat />
      </View>
      <View style={{ marginTop: height * 0.02 }}>
        <TopS />
      </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const { width, height } = Dimensions.get('window');

// إضافة Bottom Tab داخل Home
const Home = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false,tabBarShowLabel:false,tabBarActiveTintColor:"#8E6CEF"}}>
      <Tab.Screen name="MainHome" component={MainHome}  options={{tabBarIcon:({color})=><AntDesign name="home" size={30} color={color}/> , tabBarStyle:{bottom:10,width:width*0.7,marginLeft:width*0.15,borderRadius:18}}} />
      <Tab.Screen name="Cart" component={Cart}  options={{tabBarIcon:({color})=><AntDesign name="shoppingcart" size={30} color={color}/>, tabBarStyle:{bottom:10,width:width*0.7,marginLeft:width*0.15,borderRadius:18}}}  />
      <Tab.Screen name="favorite" component={Favorite}   options={{tabBarIcon:({color})=><Fontisto name="favorite" size={30} color={color} />, tabBarStyle:{bottom:10,width:width*0.7,marginLeft:width*0.15,borderRadius:18}}} />

    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    marginTop: height * 0.07,
    marginLeft: width * 0.06
  }
});

export default Home;
