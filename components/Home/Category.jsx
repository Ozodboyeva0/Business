import { View, Text } from "react-native";
import React from "react";
import { Colors } from "../../constants/Colors";

const Category = () => {
  return (
    <View>
      <View
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "row",
          padding: 20,
          marginTop: 10,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontFamily: "outfit-bold",
          }}
        >
          Category
        </Text>
        <Text style={{ color: Colors.PRIMARY, fontFamily: "outfit-medium" }}>
          Wiew All
        </Text>
      </View>
    </View>
  );
};

export default Category;
