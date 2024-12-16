import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import PropTypes from "prop-types";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { Colors } from "../../constants/Colors";

export default function Intro({ business }) {
  // Fallback for undefined business object
  const fallbackImage = "https://via.placeholder.com/500";
  const imageUrl = business?.ImageUrl || fallbackImage;

  if (!business) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>No business data available.</Text>
      </View>
    );
  }
  const router = useRouter();

  return (
    <View>
      <View style={styles.container}>
        <View style={styles.iconsContainer}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back-circle" size={40} color="black" />
          </TouchableOpacity>
          <Ionicons name="heart-outline" size={40} color="black" />
        </View>
      </View>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <View style={styles.des}>
        <Text style={styles.title}>{business?.name || "Business Name"}</Text>
        <Text style={styles.adress}>{business?.adress || "Business Name"}</Text>
      </View>
    </View>
  );
}

// Prop Validation
Intro.propTypes = {
  business: PropTypes.shape({
    ImageUrl: PropTypes.string,
    name: PropTypes.string,
  }),
};

const styles = StyleSheet.create({
  iconsContainer: {
    position: "absolute",
    zIndex: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    padding: 10,
  },
  image: {
    width: "100%",
    height: 340,
    borderRadius: 10,
  },
  des: {
    padding: 10,
    marginTop: -20,
    backgroundColor: Colors.GREY,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    fontFamily: "outfit-bold",
  },
  adress: {
    fontSize: 18,
    fontFamily: "outfit",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
  },
});
