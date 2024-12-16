import { View, Image, StyleSheet, Text } from "react-native";
import React from "react";
import { useUser } from "@clerk/clerk-expo";

export default function UserIntro() {
  const { user } = useUser(); // Correct usage of useUser hook

  return (
    <View style={styles.container}>
      {user?.imageUrl ? (
        <Image source={{ uri: user.imageUrl }} style={styles.image} />
      ) : (
        <View style={styles.placeholder} />
      )}

      <Text style={styles.name}>{user?.fullName}</Text>
      <Text style={styles.email}>
        {user?.primaryEmailAddress?.emailAddress}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  image: {
    width: 100,
    height: 100, // Adjusted to maintain a square shape
    borderRadius: 99, // Makes the image circular
  },
  name: {
    fontFamily: "outfit-bold",
    fontSize: 20,
  },
  email: {
    fontFamily: "outfit",
    fontSize: 16,
  },

  placeholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#ccc", // Placeholder background color
  },
});
