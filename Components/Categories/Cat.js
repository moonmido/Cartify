import {
  View,
  Text,
  TouchableWithoutFeedback,
  Dimensions,
  FlatList,
  Image,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

const Cat = () => {
  const navigation = useNavigation();

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCategories = async () => {
    try {
      const response = await fetch("https://api.escuelajs.co/api/v1/categories");
      let data = await response.json();
  
      // Filter out "Computers" and "Grocery" categories
      data = data.filter(item => item.name !== "Computer Category" && item.name !== "Grosery");
  data = data.slice(0,4)
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

  if (loading) {
    return <ActivityIndicator size="large" color="blue" />;
  }

  return (
    <View>
      {/* Categories Header */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 10,
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: "800" }}>Categories</Text>
        <TouchableWithoutFeedback onPress={() => navigation.navigate("seeCat")}>
          <Text style={{ fontSize: 16, marginRight: width * 0.15 }}>See All</Text>
        </TouchableWithoutFeedback>
      </View>

      {/* Categories FlatList */}
      <FlatList
        data={categories}
        style={{ marginTop: 10 , paddingRight:50 }}
        horizontal
        renderItem={({ item }) => (
          <TouchableWithoutFeedback onPress={() => navigation.navigate("CatProd", { category: item.name })}>
            <View style={{ width: width * 0.23, alignItems: "center" }}>
              <Image
                source={{ uri: item.image }}
                style={{
                  width: width * 0.2,
                  height: height * 0.1,
                  borderRadius: 35,
                }}
              />
              <Text style={{ marginTop: 5, fontSize: 12, fontWeight: "400" }}>
                {item.name}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default Cat;
