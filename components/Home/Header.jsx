import { View, Text, Image, TextInput } from "react-native";
import React from "react";
import { useUser } from "@clerk/clerk-expo";
import { Colors } from "../../constants/Colors";
import Feather from "@expo/vector-icons/Feather";

export default function Header() {
  const { user } = useUser();
  return (
    <View
      style={{ padding: 20, paddingTop: 40, backgroundColor: Colors.PRIMARY }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
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
          marginVertical: 10,
          marginTop: 15,
          borderRadius: 8,
        }}
      >
        <Feather name="search" size={24} color={Colors.PRIMARY} />
        <TextInput
          placeholder="Search..."
          style={{ fontFamily: "outfit-bold", fontSize: 16 }}
        />
      </View>
    </View>
  );
}
