import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "../../constants/Colors"; // Ensure Colors is defined
import { collection, getDocs, query } from "firebase/firestore"; // Ensure Firestore is configured
import { db } from "../../configs/FirebaseConfig"; // Ensure FirebaseConfig is valid
import CategoryItem from "./CategoryItem"; // Ensure CategoryItem works
import { useRouter } from "expo-router";

export default function Category() {
  const [categoryList, setCategoryList] = useState([]);
  const router = useRouter(); // Correctly initialize useRouter

  useEffect(() => {
    getCategoryList(); // Fetch categories on mount
  }, []);

  const getCategoryList = async () => {
    try {
      const q = query(collection(db, "Category")); // Query the "Category" collection
      const querySnapshot = await getDocs(q);

      // Map categories with IDs for better key management
      const categories = querySnapshot.docs.map((doc) => ({
        id: doc.id, // Use document ID
        ...doc.data(), // Spread document data
      }));

      setCategoryList(categories); // Update state
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  return (
    <View>
      {/* Header Section */}
      <View
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "row",
          padding: 20,
          marginTop: 10,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontFamily: "outfit-bold",
          }}
        >
          Categori
        </Text>
        <Text style={{ color: Colors.PRIMARY, fontFamily: "outfit-medium" }}>
          View All
        </Text>
      </View>

      {/* FlatList for Categories */}
      <FlatList
        data={categoryList} // Array of categories
        horizontal={true} // Enable horizontal scrolling
        showsHorizontalScrollIndicator={false} // Hide scroll indicator
        keyExtractor={(item) => item.id} // Use document ID as key
        renderItem={({ item }) => (
          <CategoryItem
            category={item}
            onCategoryPress={() => router.push(`/businesslist/${item.name}`)}
          />
        )}
        contentContainerStyle={{ marginLeft: 20 }} // Padding for content
      />
    </View>
  );
}
