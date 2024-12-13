import { View, Text, FlatList, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../../configs/FirebaseConfig";

export default function Slider() {
  const [sliderList, setSliderList] = useState([]);

  const getSliderList = async () => {
    try {
      console.log("---------------------working------------------");
      const q = query(collection(db, "Slider"));
      const querySnapshot = await getDocs(q);

      const sliderData = [];
      querySnapshot.forEach((doc) => {
        console.log("data:", doc.data());
        sliderData.push(doc.data());
      });

      return sliderData;
    } catch (error) {
      console.error("Error fetching slider data:", error);
      return [];
    }
  };

  useEffect(() => {
    const loadSliderList = async () => {
      const sliders = await getSliderList(); // Fetch slider data
      setSliderList(sliders); // Update state with fetched data
    };
    loadSliderList();
  }, []);

  // useEffect(() => {
  //   getSliderList()
  // }, [])

  return (
    <View>
      <Text
        style={{
          fontFamily: "outfit-bold",
          fontSize: 20,
          paddingLeft: 20,
          paddingTop: 20,
          marginBottom: 5,
        }}
      >
        #Special for You
      </Text>
      <FlatList
        data={sliderList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{ paddingLeft: 20 }}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <Image
            source={{ uri: item?.imageUrl }}
            style={{
              width: 300,
              height: 100,
              marginRight: 15,
              borderRadius: 15,
            }}
          />
        )}
      />
    </View>
  );
}
