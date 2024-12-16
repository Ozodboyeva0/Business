import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
} from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import { useNavigation } from "expo-router";
import { Colors } from "../../constants/Colors";
import * as ImagePicker from "expo-image-picker";
import RNPickerSelect from "react-native-picker-select";
import { db } from "../../configs/FirebaseConfig";
import { collection, query, getDocs } from "firebase/firestore";

export default function AddDiscount() {
  const navigation = useNavigation();
  const [image, setImage] = useState(null);
  const [categoryList, setCategoryList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState();
  const [adress, setAdress] = useState();
  const [contact, setContact] = useState();
  const [website, setWebsite] = useState();
  const [about, setAbout] = useState();
  const [category, setCategory] = useState();
  const [price, setPrice] = useState();
  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Add New Discount",
      headerShown: true,
    });
    getCategoryList();
  }, []);

  const onImagePick = useCallback(async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });
      if (!result.cancelled) {
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Error picking image: ", error);
    }
  }, []);

  const getCategoryList = useCallback(async () => {
    setLoading(true);
    try {
      const q = query(collection(db, "Category"));
      const snapShot = await getDocs(q);
      const categories = snapShot.docs.map((doc) => ({
        label: doc.data().name,
        value: doc.data().name,
      }));
      setCategoryList(categories);
    } catch (error) {
      console.error("Error fetching categories: ", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const onAddnewDiscount = async () => {
    const fileName = Date.now().toString() + ".jpg";
    const resp = await fetch(image);
    const blob = await resp.blob();

    const imageRef = ref(storage, "business-app/" + fileName);
    uploadBytes(imageRef, blob)
      .then((snapShot) => {
        console.log("File uploaded");
      })
      .then((resp) => {
        getDownloadURL(imageRef).then(async (downloadUrl) => {
          console.log(downloadUrl);
        });
      });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Add New Discount</Text>
      <Text style={styles.description}>
        Fill all details in order to add a new discount product
      </Text>
      <TouchableOpacity style={{ marginTop: 20 }} onPress={onImagePick}>
        {!image ? (
          <Image
            source={require("../../assets/images/photo.png")}
            style={styles.image}
          />
        ) : (
          <Image source={{ uri: image }} style={styles.image} />
        )}
      </TouchableOpacity>
      <View>
        <TextInput
          placeholder="Name"
          onChangeText={(v) => setName(v)}
          style={styles.input}
        />
        <TextInput
          placeholder="Address"
          style={styles.input}
          onChangeText={(v) => setAdress(v)}
        />
        <TextInput
          placeholder="Contact"
          onChangeText={(v) => setContact(v)}
          style={styles.input}
        />
        <TextInput
          placeholder="Website"
          onChangeText={(v) => setWebsite(v)}
          style={styles.input}
        />
        <TextInput
          placeholder="productDiscount"
          onChangeText={(v) => setPrice(v)}
          style={styles.input}
        />
        <TextInput
          placeholder="About"
          multiline
          numberOfLines={5}
          onChangeText={(v) => setAbout(v)}
          style={[styles.input, { height: 100 }]}
        />
        {loading ? (
          <ActivityIndicator size="large" color={Colors.PRIMARY} />
        ) : (
          <View
            style={{
              borderWidth: 1,
              borderRadius: 5,
              fontSize: 17,
              backgroundColor: "#fff",
              marginTop: 10,
              borderColor: Colors.PRIMARY,
              fontFamily: "outfit",
            }}
          >
            <RNPickerSelect
              onValueChange={(value) => setCategory(value)}
              items={
                categoryList.length
                  ? categoryList
                  : [{ label: "No categories available", value: null }]
              }
            />
          </View>
        )}
      </View>
      <TouchableOpacity
        style={{
          padding: 15,
          backgroundColor: Colors.PRIMARY,
          borderRadius: 15,
          marginTop: 20,
        }}
        onPress={() => onAddnewDiscount()}
      >
        <Text
          style={{
            textAlign: "center",
            fontFamily: "outfit-medium",
            color: "#fff",
          }}
        >
          Add New discount product
        </Text>
      </TouchableOpacity>
      <Text style={{ height: 50, width: 34 }}></Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontFamily: "outfit-bold", fontSize: 25 },
  description: { fontFamily: "outfit", fontSize: 15, color: Colors.GREY },
  input: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    fontSize: 17,
    backgroundColor: "#fff",
    marginTop: 10,
    borderColor: Colors.PRIMARY,
    fontFamily: "outfit",
  },
  image: { width: 100, height: 100, borderRadius: 5 },
});
