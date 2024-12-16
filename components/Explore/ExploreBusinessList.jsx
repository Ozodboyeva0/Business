import { View, FlatList } from "react-native";
import React from "react";
import ExploreBusines from "./ExploreBusines";

export default function ExploreBusinessList({ discountList }) {
  return (
    <View>
      <FlatList
        data={discountList}
        renderItem={({ item, index }) => <ExploreBusines business={item} />}
      />
    </View>
  );
}
