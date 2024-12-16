import { View, Text, TextInput, StyleSheet } from "react-native";
import { Colors } from "../../constants/Colors";
import Feather from "@expo/vector-icons/Feather";
import Category from "../../components/Home/Category";
import { getDocs, query, where } from "firebase/firestore";
import { collection } from "firebase/firestore/lite";
import { db } from "../../configs/FirebaseConfig";
import { useState } from "react";
import ExploreBusinessList from "../../components/Explore/ExploreBusinessList";

export default function Explore() {
  const [discountList, setDiscountList] = useState([]);
  const getDiscountByCategory = async (category) => {
    const q = query(
      collection(db, "BusinessList"),
      where("category", "==", category)
    );
    const querySnapShot = await getDocs(q);
    querySnapShot.forEach((doc) => {
      console.log(doc.data());
      setDiscountList((prev) => [...prev, { id: doc.id, ...doc.data() }]);
    });
  };
  return (
    <View style={styles.container}>
      {/* Heading */}
      <Text style={styles.heading}>Explore More</Text>

      {/* SearchBar */}
      <View style={styles.searchBar}>
        <Feather name="search" size={18} color={Colors.PRIMARY} />
        <TextInput
          placeholder="Search..."
          placeholderTextColor={Colors.GREY}
          style={styles.searchInput}
        />
      </View>

      {/* Category */}
      <Category
        explore={true}
        onCategorySelect={(category) =>
          getDiscountByCategory("namdosan", category)
        }
      />

      {/* BusinessList */}
      <ExploreBusinessList discountList={discountList} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f5f5f5", // Background color for better contrast
  },
  heading: {
    fontFamily: "outfit-bold",
    fontSize: 30,
    marginBottom: 10,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 10,
    marginVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
  },
  searchInput: {
    fontFamily: "outfit-bold",
    fontSize: 16,
    marginLeft: 10, // Add spacing between icon and input
    flex: 1, // Take up remaining space
  },
});
