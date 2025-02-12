import {
  View,
  Text,
  TouchableWithoutFeedback,
  Dimensions,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import Categorie from "./Data";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

const Cat = () => {
  const navigation = useNavigation();


  const handleSend = (title) => {
    // Map titles directly to category names
    let category = "";

    if (title === "Electronics") {
      category = "electronics";
    } else if (title === "Jewelery") {
      category = "jewelery";
    } else if (title === "Men's Clothing") {
      category = "men's clothing";
    } else if (title === "Women's Clothing") {
      category = "women's clothing";
    }

    // Navigate with the category name
    navigation.navigate("CatProd", {
      categorie: category,
    });
  };

  return (
    <View>
      {/* Categories Header */}
      <View
        style={{
          display: "flex",
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
        data={Categorie}
        style={{ marginTop: 10 }}
        horizontal
        renderItem={({ item }) => (
          <TouchableWithoutFeedback onPress={() => handleSend(item.title)}>
            <View
              style={{
                width: width * 0.23,
              }}
            >
              <Image
                source={{ uri: item.img }}
                style={{
                  width: width * 0.2,
                  height: height * 0.1,
                  borderRadius: 35,
                }}
              />
              <Text style={{ marginTop: 5, fontSize: 10 }}>{item.title}</Text>
            </View>
          </TouchableWithoutFeedback>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default Cat;
