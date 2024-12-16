import { View, Image } from "react-native";
import React from "react";

export default function ExploreBusines({ business }) {
  return (
    <View>
      <Image
        source={{ uri: business?.ImageUrl }}
        style={{
          width: "100%",
          height: 150,
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
        }}
      />
    </View>
  );
}
