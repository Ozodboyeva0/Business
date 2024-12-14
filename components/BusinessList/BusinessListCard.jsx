import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import PropTypes from "prop-types"; // Import PropTypes for prop validation

export default function BusinessListCard({ businesses }) {
  // Fallback image URL if ImageUrl is missing
  const fallbackImage = "https://via.placeholder.com/200";

  return (
    <TouchableOpacity style={styles.card}>
      <Image
        source={{ uri: businesses.ImageUrl || fallbackImage }}
        style={styles.image}
      />
      <Text style={styles.name}>{businesses.name}</Text>
      <Text style={styles.description}>{businesses.description}</Text>
    </TouchableOpacity>
  );
}

// PropTypes for validating props
BusinessListCard.propTypes = {
  businesses: PropTypes.shape({
    ImageUrl: PropTypes.string,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};

const styles = StyleSheet.create({
  card: {
    padding: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
});
