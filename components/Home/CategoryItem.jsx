import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Colors } from "../../constants/Colors";

export default function CategoryItem({ category, onCategoryPress }) {
  return (
    <TouchableOpacity
      onPress={() => onCategoryPress(category)}
      style={{ marginBottom: 10 }} // Optional: Add spacing for better layout
    >
      <View
        style={{
          padding: 10,
          backgroundColor: Colors.icon || "#f0f0f0", // Default color if Colors.icon is undefined
          borderRadius: 99,
          marginRight: 15,
          alignItems: "center", // Align icon properly
          justifyContent: "center",
        }}
      >
        <Image
          source={{ uri: category.icon || "https://via.placeholder.com/40" }} // Default placeholder image
          style={{ width: 40, height: 40 }}
        />

        <Text
          style={{
            fontSize: 12,
            fontFamily: "outfit-medium",
            textAlign: "center", // Corrected syntax
            marginTop: 5,
          }}
        >
          {category.name || "Unknown"} {/* Fallback name */}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
