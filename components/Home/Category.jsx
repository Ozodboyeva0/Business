import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { Colors } from "../../constants/Colors"; // Ensure Colors is defined
import { collection, getDocs, query } from "firebase/firestore"; // Ensure Firestore is configured
import { db } from "../../configs/FirebaseConfig"; // Ensure FirebaseConfig is valid
import CategoryItem from "./CategoryItem"; // Ensure CategoryItem works
import { useRouter } from "expo-router";

export default function Category() {
  const [categoryList, setCategoryList] = useState([]); // State to hold categories
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const router = useRouter(); // Initialize router from expo-router

  useEffect(() => {
    getCategoryList(); // Fetch categories on mount
  }, []);

  // Function to fetch category list from Firestore
  const getCategoryList = async () => {
    try {
      console.log("Fetching categories...");
      const q = query(collection(db, "Category")); // Query the "Category" collection
      const querySnapshot = await getDocs(q);

      // Map categories with IDs
      const categories = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      console.log("Categories fetched:", categories);
      setCategoryList(categories); // Update state with categories
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setIsLoading(false); // Stop loading spinner
    }
  };

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Category</Text>
        <Text style={styles.viewAllText}>View All</Text>
      </View>

      {/* Conditional Rendering: Loader or Category List */}
      {isLoading ? (
        <ActivityIndicator
          size="large"
          color={Colors.PRIMARY}
          style={styles.loader}
        />
      ) : categoryList.length > 0 ? (
        <FlatList
          data={categoryList} // Array of categories
          horizontal // Enable horizontal scrolling
          showsHorizontalScrollIndicator={false} // Hide scroll indicator
          keyExtractor={(item) => item.id} // Use document ID as key
          renderItem={({ item }) => (
            <CategoryItem
              category={item}
              onCategoryPress={() => {
                console.log("Pressed category:", item.name);
                router.push(`/businesslist/${item.name}`);
              }}
            />
          )}
          contentContainerStyle={styles.flatListContainer}
        />
      ) : (
        <Text style={styles.noCategoriesText}>No categories available.</Text>
      )}
    </View>
  );
}

// Styles for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    padding: 20,
    marginTop: 10,
  },
  headerText: {
    fontSize: 20,
    fontFamily: "outfit-bold",
  },
  viewAllText: {
    color: Colors.PRIMARY,
    fontFamily: "outfit-medium",
  },
  loader: {
    marginTop: 50,
  },
  flatListContainer: {
    marginLeft: 20,
  },
  noCategoriesText: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 16,
    color: "#777",
  },
});
