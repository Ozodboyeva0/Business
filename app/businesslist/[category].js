import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useLocalSearchParams } from "expo-router";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../configs/FirebaseConfig";
import BusinessListCard from "../../components/BusinessList/BusinessListCard";

export default function BusinessListByCategory() {
  const navigation = useNavigation();
  const { category } = useLocalSearchParams();
  const [businessList, setBusinessList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: category || "Businesses",
    });

    if (category) {
      getBusinessList(); // Fetch only if category exists
    }
  }, [navigation, category]);

  const getBusinessList = async () => {
    try {
      setIsLoading(true);
      setBusinessList([]); // Clear existing data
      console.log("Fetching businesses for category:", category); // Debug log

      const q = query(
        collection(db, "BusinessList"),
        where("category", "==", category) // Ensure exact match
      );

      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        console.log("No businesses found for this category."); // Debug log
      }

      const business = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      console.log("Fetched businesses:", business); // Debug log
      setBusinessList(business);
    } catch (error) {
      console.error("Error fetching businesses:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!category) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No category selected.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : businessList.length > 0 ? (
        <FlatList
          data={businessList}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <BusinessListCard business={item} />} // Pass "business" as prop
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <Text style={styles.noDataText}>
          No businesses found in this category.
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    textAlign: "center",
    color: "red",
    marginTop: 50,
  },
  loadingText: {
    fontSize: 18,
    textAlign: "center",
    color: "#555",
    marginTop: 50,
  },
  listContainer: {
    paddingBottom: 20,
  },
  noDataText: {
    fontSize: 16,
    textAlign: "center",
    color: "#777",
    marginTop: 50,
  },
});
