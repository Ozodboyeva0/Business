import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import { Colors } from "../../constants/Colors";

export default function PopularBusinessCard({ business }) {
  if (!business) {
    return null; // Render nothing if no business prop is passed
  }

  const { ImageUrl, name, adress } = business;

  return (
    <View style={styles.card}>
      <Image
        source={{ uri: ImageUrl || "https://via.placeholder.com/200" }} // Fallback image
        style={styles.image}
        accessibilityLabel={`Image of ${name || "business"}`}
      />
      <View style={styles.textContainer}>
        <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">
          {name || "Business Name"}
        </Text>
        <Text style={styles.address} numberOfLines={2} ellipsizeMode="tail">
          {adress || "Business Address"}
        </Text>
        <View
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
          }}
        >
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
          <Text style={styles.category}>{business.category}</Text>
        </View>
      </View>
    </View>
  );
}

PopularBusinessCard.propTypes = {
  business: PropTypes.shape({
    ImageUrl: PropTypes.string,
    name: PropTypes.string,
    adress: PropTypes.string,
  }),
};

const styles = StyleSheet.create({
  card: {
    marginLeft: 20,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3, // For Android shadow
  },
  image: {
    width: 200,
    height: 130,
    borderRadius: 15,
  },
  textContainer: {
    marginTop: 7,
    gap: 5,
  },
  name: {
    fontFamily: "outfit-bold",
    fontSize: 17,
  },
  address: {
    fontFamily: "outfit-medium",
    fontSize: 13,
    color: Colors.GREY,
  },
  category: {
    fontFamily: "outfit-medium",
    backgroundColor: Colors.PRIMARY,
    color: "#fff",
    padding: 5,
    fontSize: 13,
    borderRadius: 8,
  },
});
