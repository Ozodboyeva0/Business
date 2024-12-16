import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "../../constants/Colors";
import { collection, query, getDocs, limit } from "firebase/firestore"; // Add limit import
import { db } from "../../configs/FirebaseConfig";
import PopularBusinessCard from "./PopularBusinessCard";

export default function PopularBusiness() {
  const [businessList, setBusinessList] = useState([]);

  useEffect(() => {
    getBusinessList();
  }, []);

  const getBusinessList = async () => {
    setBusinessList([]);
    const q = query(collection(db, "BusinessList"), limit(10));
    const querySnapshot = await getDocs(q);

    const businesses = [];
    querySnapshot.forEach((doc) => {
      businesses.push({ id: doc.id, ...doc.data() }); // Collect data into an array
    });
    setBusinessList(businesses); // Set business list after collecting all data
  };

  return (
    <View>
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
          Popular Business List
        </Text>
        <Text style={{ color: Colors.PRIMARY, fontFamily: "outfit-medium" }}>
          View All
        </Text>
      </View>
      <FlatList
        showsHorizontalScrollIndicator={false}
        data={businessList}
        horizontal={true}
        renderItem={({ item, index }) => (
          <View key={index}>
            <PopularBusinessCard business={item} />{" "}
            {/* Fix typo "busines" to "business" */}
          </View>
        )}
        keyExtractor={(item, index) => index.toString()} // Ensure unique key for each item
      />
    </View>
  );
}
