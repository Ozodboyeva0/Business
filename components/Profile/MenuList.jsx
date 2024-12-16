import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import { Colors } from "../../constants/Colors";
import React from "react";
import { useRouter } from "expo-router";

export default function MenuList() {
  const menuList = [
    {
      id: 1,
      name: "Add Business",
      icon: require("../../assets/images/add.png"),
      path: "/discount/add-discount",
    },
    {
      id: 2,
      name: "My Business",
      icon: require("../../assets/images/add.png"),
      path: "",
    },
    {
      id: 3,
      name: "Share app ",
      icon: require("../../assets/images/logout.png"),
      path: "",
    },
    {
      id: 4,
      name: "Logout",
      icon: require("../../assets/images/add.png"),
      path: "",
    },
  ];
  const router = useRouter();
  const onMenuClick = (item) => {
    router.push(item.path);
  };
  return (
    <View style={{ marginTop: 30 }}>
      <FlatList
        data={menuList}
        numColumns={2}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => onMenuClick(item)}
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 10,
              flex: 1,
              alignItems: "center",
              padding: 10,
              borderRadius: 15,
              borderWidth: 1,
              margin: 10,
              backgroundColor: "#fff",
              borderColor: Colors.PRIMARY,
            }}
          >
            <Image source={item.icon} style={{ width: 50, height: 50 }} />
            <Text
              style={{ fontFamily: "outfit-medium", fontSize: 10, flex: 1 }}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />

      <Text
        style={{
          fontFamily: "outfit",
          textAlign: "center",
          marginTop: 30,
          color: Colors.GREY,
        }}
      >
        Developed by Dasturchi_qiz0 @2024
      </Text>
    </View>
  );
}
