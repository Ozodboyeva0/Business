import { View, Text, Image } from "react-native";
import React from "react";

export default function BusinessListCard({ business }) {
  return (
    <View>
      <Image source={{ uri: business.ImageUrl }} />
      <Text>BusinessListCard</Text>
    </View>
  );
}
