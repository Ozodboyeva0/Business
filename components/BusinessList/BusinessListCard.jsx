import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import PropTypes from "prop-types"; // Import PropTypes for prop validation
import { Colors } from "../../constants/Colors";
import { useRouter } from "expo-router";

export default function BusinessListCard({ business }) {
  const router = useRouter();
  const fallbackImage = "https://via.placeholder.com/200";

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push(`/businessdetail/${business.id}`)}
    >
      <Image
        source={{ uri: business?.ImageUrl || fallbackImage }}
        style={styles.image}
      />
      <View style={{ flex: 1, gap: 7 }}>
        <Text style={styles.name}>{business?.name}</Text>
        <Text style={styles.description}>{business?.adress}</Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 5,
            alignItems: "center",
          }}
        >
          <Image
            source={require("../../assets/images/star2.png")}
            style={{ width: 20, height: 30 }}
          />
          <Text>4.5</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

BusinessListCard.propTypes = {
  business: PropTypes.shape({
    // Expect "business" as prop
    ImageUrl: PropTypes.string,
    name: PropTypes.string.isRequired,
    adress: PropTypes.string.isRequired, // Ensure this matches Firestore key
  }).isRequired,
};

const styles = StyleSheet.create({
  card: {
    padding: 10,
    margin: 10,
    borderRadius: 15,
    display: "flex",
    flexDirection: "row",
    gap: 20,
    backgroundColor: Colors.GREY,
  },
  image: {
    width: 120,
    height: 150,
    borderRadius: 15,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "outfit-bold",
    marginTop: 10,
  },
  description: {
    fontSize: 16,
    fontFamily: "outfit-regular",
    color: "#555",
    flex: 1,
    marginTop: 5,
  },
});
