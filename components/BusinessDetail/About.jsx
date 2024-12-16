import { Text, View } from "react-native";
import React from "react";
import { Colors } from "../../constants/Colors";

export default function About({ business }) {
  return (
    <View style={{ padding: 20, backgroundColor: Colors.GREY, height: 300 }}>
      <Text style={{ fontFamily: "outfit-bold", fontSize: 20 }}>About</Text>
      <Text style={{ fontFamily: "outfit", fontSize: 14, lineHeight: 25 }}>
        {business?.description}
      </Text>
    </View>
  );
}
