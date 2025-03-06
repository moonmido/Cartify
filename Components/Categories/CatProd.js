import { 
  View, Text, ActivityIndicator, ScrollView, Image, 
  TouchableWithoutFeedback, Dimensions, TouchableOpacity 
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Feather from '@expo/vector-icons/Feather';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get("window");

const CatProd = ({ route }) => {
  const { category } = route.params;
  const navigation = useNavigation();

  const [allProd, setAllProd] = useState([]);
  const [loading, setLoading] = useState(true);
  const [save, setSave] = useState(false);

  // 🔹 Fetch Products by Category
  const handleFetchApiCat = async () => {
    try {
      // Step 1: Fetch categories
      const categoriesResponse = await fetch("https://api.escuelajs.co/api/v1/categories");
      const categories = await categoriesResponse.json();

      // Step 2: Find the category ID
      const selectedCategory = categories.find(cat => cat.name.toLowerCase() === category.toLowerCase());

      if (!selectedCategory) {
        console.log("Category not found");
        setLoading(false);
        return;
      }

      // Step 3: Fetch products using category ID
      const productsResponse = await fetch(`https://api.escuelajs.co/api/v1/products/?categoryId=${selectedCategory.id}`);
      const products = await productsResponse.json();

      // Step 4: Update state
      setAllProd(products);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleFetchApiCat();
  }, []);

  return (
    <SafeAreaView>
      {/* 🔹 Loading Spinner */}
      {loading && (
        <View style={{ marginTop: 20 }}>
          <ActivityIndicator color="blue" size="large" />
        </View>
      )}

      {/* 🔹 Back Button */}
      <TouchableOpacity 
        style={{
          backgroundColor: "#ECEAEA",
          width: width * 0.12,
          height: height * 0.06,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 35,
          margin: width * 0.05,
        }} 
        onPress={() => navigation.navigate("home")}
      >
        <Ionicons name="chevron-back" size={24} color="black" />
      </TouchableOpacity>

      {/* 🔹 Product List */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        <Text style={{ fontWeight: "700", marginLeft: width * 0.05, fontSize: 20 }}>
          All Products ({allProd.length})
        </Text>

        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
            padding: 10,
          }}
        >
          {allProd.map((item) => (
            <TouchableWithoutFeedback 
              key={item.id} 
              onPress={() => navigation.navigate("prodview", {
                title: item.title,
                img: item.images,
                price: item.price,
                description: item.description
              })}
            >
              <View
                style={{
                  marginTop: 15,
                  height: height * 0.38,
                  width: width * 0.4,
                  backgroundColor: "white",
                  borderRadius: 15,
                  marginHorizontal: 5,
                }}
              >
                {/* 🔹 Heart Button */}
                <TouchableOpacity onPress={() => setSave(!save)}>
                  <Feather 
                    name="heart" 
                    size={16} 
                    color={save ? "red" : "black"}  
                    style={{ position: "absolute", right: 0, margin: 8 }} 
                  />
                </TouchableOpacity>

                {/* 🔹 Product Image */}
                <Image
                  source={{ uri: item.images[0] }}
                  style={{
                    width: width * 0.3,
                    height: height * 0.25,
                    resizeMode: "contain",
                    marginLeft: width * 0.05,
                  }}
                />

                {/* 🔹 Product Title */}
                <Text
                  style={{
                    fontSize: 12,
                    paddingTop: 10,
                    marginLeft: 7,
                  }}
                >
                  {item.title.length > 19 ? item.title.slice(0, 19) + "..." : item.title}
                </Text>

                {/* 🔹 Product Price */}
                <Text
                  style={{
                    fontWeight: "700",
                    fontSize: 13,
                    marginTop: 5,
                    marginLeft: 7,
                  }}
                >
                  {item.price} $
                </Text>
              </View>
            </TouchableWithoutFeedback>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CatProd;
