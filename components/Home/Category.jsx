import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Alert,
  Button,
} from "react-native";
import { Colors } from "../../constants/Colors";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../../configs/FirebaseConfig";
import CategoryItem from "./CategoryItem";
import { useRouter } from "expo-router";

export default function Category({ explore = false, onCategorySelect }) {
  const [categoryList, setCategoryList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    getCategoryList();
  }, []);

  const getCategoryList = async () => {
    try {
      setIsLoading(true);
      const q = query(collection(db, "Category"));
      const querySnapshot = await getDocs(q);
      const categories = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCategoryList(categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setError("Failed to load categories. Please try again later.");
      Alert.alert(
        "Error",
        "Could not fetch categories. Please check your connection and try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const onCategoryPressHandler = useCallback(
    (item) => {
      if (!explore) {
        router.push(`/businesslist/${item.name}`);
      } else {
        onCategorySelect(item.name);
      }
    },
    [explore, router, onCategorySelect]
  );

  return (
    <View style={styles.container}>
      {!explore && (
        <View style={styles.header}>
          <Text style={styles.headerText}>Category</Text>
          <Text
            style={styles.viewAllText}
            onPress={() => console.log("View All pressed")}
          >
            View All
          </Text>
        </View>
      )}

      {isLoading ? (
        <ActivityIndicator
          size="large"
          color={Colors.PRIMARY}
          style={styles.loader}
        />
      ) : error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <Button
            title="Retry"
            onPress={getCategoryList}
            color={Colors.PRIMARY}
          />
        </View>
      ) : categoryList.length > 0 ? (
        <FlatList
          data={categoryList}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <CategoryItem
              category={item}
              onCategoryPress={() => onCategoryPressHandler(item)}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
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
    marginTop: 10,
  },
  noCategoriesText: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 16,
    color: "#777",
  },
  errorContainer: {
    alignItems: "center",
    marginTop: 50,
  },
  errorText: {
    fontSize: 16,
    color: "red",
    marginBottom: 10,
  },
});
