import { 
  View, Text, TouchableOpacity, Dimensions, Image, ScrollView, ActivityIndicator 
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get("window");

const SeeAllCat = () => {
  const navigation = useNavigation();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch Categories
  const fetchCategories = async () => {
    try {
      const response = await fetch("https://api.escuelajs.co/api/v1/categories");
      let data = await response.json();
  
      // Filter out "Computers" and "Grocery" categories
      data = data.filter(item => item.name !== "Computer Category" && item.name !== "Grosery"&& item.name !== "dfdf");
  
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <SafeAreaView>
      <ScrollView style={{ marginTop: height * 0.03, marginLeft: width * 0.08 }}>
        {/* Back Button */}
        <TouchableOpacity
          style={{
            backgroundColor: "#ECEAEA",
            width: width * 0.12,
            height: height * 0.06,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 35
          }}
          onPress={() => navigation.navigate('home')}
        >
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>

        {/* Title */}
        <View style={{ marginTop: height * 0.04 }}>
          <Text style={{ fontSize: 22, fontWeight: "800" }}>Shop by Categories</Text>

          {/* Loading Indicator */}
          {loading ? (
            <ActivityIndicator size="large" color="blue" style={{ marginTop: height * 0.02 }} />
          ) : (
            <View style={{ marginTop: height * 0.02 }}>
              {categories.map((item) => (
                <TouchableOpacity key={item.id} onPress={() => navigation.navigate('CatProd', { category: item.name })}>
                  <View style={{ marginTop: height * 0.02, width: width * 0.8 }}>
                    <View style={{
                      flexDirection: "row",
                      alignItems: "center",
                      backgroundColor: "#ECEAEA",
                      padding: 10,
                      borderRadius: 15
                    }}>
                      <Image 
                        source={{ uri: item.image }} 
                        style={{ width: width * 0.15, height: height * 0.07, borderRadius: 15 }} 
                      />
                      <Text style={{ marginLeft: width * 0.05 }}>{item.name}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SeeAllCat;
