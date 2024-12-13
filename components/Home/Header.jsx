import { View, Text, Image, TextInput } from "react-native";
import React from "react";
import { useUser } from "@clerk/clerk-expo";
import { Colors } from "../../constants/Colors";
import Feather from "@expo/vector-icons/Feather";

export default function Header() {
  const { user } = useUser();
  return (
    <View
      style={{ padding: 10, paddingTop: 10, backgroundColor: Colors.PRIMARY }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          borderBottomLeftRadius: 90,
          borderBottomRightRadius: 90,
        }}
      >
        <Image
          source={{ uri: user?.imageUrl }}
          style={{
            width: 45,
            height: 45,
            borderRadius: 99,
          }}
        />
        <View>
          <Text style={{ color: "#ffff" }}>Welcomes</Text>
          <Text
            style={{
              fontSize: 19,
              color: "#ffff",
              fontFamily: "outfit-medium",
            }}
          >
            {user?.fullName}
          </Text>
        </View>
      </View>
      {/* SearchBar */}
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          alignItems: "center",
          backgroundColor: "#ffff",
          padding: 10,
          marginVertical: 7,
          marginTop: 10,
          borderRadius: 8,
        }}
      >
        <Feather name="search" size={18} color={Colors.PRIMARY} />
        <TextInput
          placeholder="Search..."
          style={{ fontFamily: "outfit-bold", fontSize: 16 }}
        />
      </View>
    </View>
  );
}
