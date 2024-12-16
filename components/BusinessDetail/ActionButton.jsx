import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Linking,
  Share,
  StyleSheet,
} from "react-native";
import React from "react";
import { Colors } from "../../constants/Colors";

export default function ActionButton({ business }) {
  const actionButtonMenu = [
    {
      id: 1,
      name: "Call",
      icon: require("../../assets/images/call.png"),
      url: "tel:" + business?.contact,
    },
    {
      id: 2,
      name: "Location",
      icon: require("../../assets/images/pin.png"),
      url: "https://google.com/maps/search/?api=1&query=" + business?.address,
    },
    {
      id: 3,
      name: "Web",
      icon: require("../../assets/images/pin.png"), // Updated icon for "Web"
      url: business?.website,
    },
    {
      id: 4,
      name: "Share",
      icon: require("../../assets/images/share.png"),
      url: null, // No direct URL needed for "Share"
    },
  ];

  const handlePress = (item) => {
    if (item.name === "Share") {
      Share.share({
        message: `${business?.name}\nAddress: ${business?.address}\nWebsite: ${
          business?.website || "N/A"
        }`,
      }).catch((error) => console.error("Error sharing:", error));
    } else if (item.url) {
      Linking.openURL(item.url).catch((err) =>
        console.error("Failed to open URL:", err)
      );
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={actionButtonMenu}
        numColumns={4}
        columnWrapperStyle={styles.columnWrapper}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handlePress(item)}
            style={styles.button}
          >
            <Image source={item.icon} style={styles.icon} />
            <Text style={styles.text}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.GREY,
    padding: 20,
  },
  columnWrapper: {
    justifyContent: "space-between",
  },
  button: {
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 10,
    width: "22%",
  },
  icon: {
    width: 40,
    height: 40,
    marginBottom: 5,
  },
  text: {
    color: "white",
    fontSize: 13,
    textAlign: "center",
    fontFamily: "outfit-medium",
    marginTop: 3,
  },
});
