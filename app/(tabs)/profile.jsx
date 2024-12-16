import { Text, ScrollView } from "react-native";
import React from "react";
import UserIntro from "../../components/Profile/UserIntro";
import MenuList from "../../components/Profile/MenuList";
export default function profile() {
  return (
    <ScrollView style={{ padding: 20 }}>
      <Text style={{ fontFamily: "outfit-bold", fontSize: 35 }}>Profile</Text>

      {/* UserInfo */}
      <UserIntro />
      {/* Menu List */}
      <MenuList />
    </ScrollView>
  );
}
