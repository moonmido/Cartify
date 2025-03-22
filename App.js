import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Signin from './Components/Signin';
import Signup from './Components/Signup';
import Home from './Components/Home';
import SeeAllCat from './Components/Categories/SeeAllCat';
import CatProd from './Components/Categories/CatProd';
import SeeAllTop from './Components/TopSelling/SeeAllTop';
import Product_View from './Components/Product_View';
import Cart from './Components/Cart';
import Favorite from './Components/Favorite';
import Notification from './Components/Notification';
import Splach from './Components/Splach/Splach';
import SplachChanger from './Components/Splach/SplachChanger';
export default function App() {
const Stack = createStackNavigator();

  return (
<NavigationContainer>
<Stack.Navigator initialRouteName='SplachChanger'>
<Stack.Screen name='SplachChanger' component={SplachChanger} options={{headerShown:false}}/>
<Stack.Screen name='prodview' component={Product_View} options={{headerShown:false}}/>
<Stack.Screen name='CatProd' component={CatProd} options={{headerShown:false}}/>
<Stack.Screen name='seeAllTop' component={SeeAllTop} options={{headerShown:false}}/>
<Stack.Screen name='seeCat' component={SeeAllCat} options={{headerShown:false}}/>
<Stack.Screen name='signin' component={Signin} options={{headerShown:false}}/>
<Stack.Screen name='signup' component={Signup} options={{headerShown:false,presentation:"modal"}}/>
<Stack.Screen name='home' component={Home} options={{headerShown:false}}/>
<Stack.Screen name='cart' component={Cart} options={{headerShown:false}}/>
<Stack.Screen name='favorite' component={Favorite} options={{headerShown:false}}/>
<Stack.Screen name='notification' component={Notification} options={{headerShown:false}}/>

</Stack.Navigator>
</NavigationContainer>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
