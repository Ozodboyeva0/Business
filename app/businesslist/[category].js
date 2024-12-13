import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native"; // Import navigation hook
import { useLocalSearchParams } from "expo-router"; // Import route params hook
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../../configs/FirebaseConfig";
import { FlatList } from "react-native-web";
import BusinessListCard from "../../components/BusinessList/BusinessListCard";

export default function BusinessListByCategory() {
  const navigation = useNavigation();
  const { category } = useLocalSearchParams(); // Extract category from params
  const [BusinessList, setBusinessList] = useState([]);
  useEffect(() => {
    navigation.setOptions({
      headerShown: true, // Show header when this screen is active
      title: category || "Businesses", // Set header title
    });
    getBusinessList();
  }, [navigation, category]);

  if (!category) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No category selected.</Text>
      </View>
    );
  }

  const getBusinessList = async () => {
    const q = query(
      collection,
      (db, "businessList"),
      where("category", "==", category)
    );
    const getSnapShot = await getDocs(q);
    getSnapShot.forEach((doc) => {
      console.log(doc);
      setBusinessList((prev) => [...prev, doc.data()]);
    });
  };

  return (
    <View>
      <FlatList
        data={BusinessList}
        renderItem={({ item, index }) => (
          <BusinessListCard business={item} key={index} />
        )}
      />
    </View>
  );
}
