import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import * as WebBrowser from "expo-web-browser";
import { useWarmUpBrowser } from "../hooks/useWarmUpBrowser";
import { useOAuth } from "@clerk/clerk-expo";
import { useRouter } from "expo-router"; // Import useRouter hook

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  useWarmUpBrowser();
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
  const router = useRouter(); // Initialize useRouter hook for navigation

  const onPress = React.useCallback(async () => {
    try {
      const result = await startOAuthFlow();
      console.log("OAuth Flow Result:", result); // Log the result for debugging

      const { createdSessionId, setActive, signIn, signUp } = result;

      // Check if the session was created
      if (createdSessionId) {
        console.log("Session created:", createdSessionId);
        await setActive({ session: createdSessionId }); // Set the active session
        // Navigate to fileScreen after successful login
        router.push({
          pathname: "/fileScreen", // Use the correct path for fileScreen
          params: { sessionId: createdSessionId }, // Pass the sessionId as a parameter
        });
      } else {
        // If no session was created, try to sign in or sign up
        if (signIn) {
          console.log("Attempting to sign in...");
          await signIn(); // Call signIn method if available
        } else if (signUp) {
          console.log("Attempting to sign up...");
          await signUp(); // Call signUp method if available
        } else {
          console.log("No signIn or signUp method available.");
        }
      }
    } catch (err) {
      console.log("OAuth error:", err);
    }
  }, [router]); // Include router in the dependency array

  return (
    <View>
      <View style={{ display: "flex", alignItems: "center", marginTop: 20 }}>
        <Image
          source={require("../assets/images/login.png")}
          style={{
            width: 220,
            height: 450,
            borderRadius: 20,
            borderWidth: 7,
            borderColor: "#000",
          }}
        />
      </View>
      <View style={{ backgroundColor: "#ffff", padding: 20, marginTop: -25 }}>
        <Text
          style={{
            fontSize: 22,
            fontFamily: "outfitbold",
            textAlign: "center",
          }}
        >
          Your Ultimate
          <Text style={{ color: Colors.PRIMARY }}>
            Community Business Directory
          </Text>
          App
        </Text>
        <Text
          style={{
            fontSize: 15,
            fontFamily: "outfitregular",
            textAlign: "center",
            marginVertical: 15,
            color: Colors.GREY,
          }}
        >
          Find your favorite business near you and post your own business
        </Text>
        <TouchableOpacity style={styles.btn} onPress={onPress}>
          <Text
            style={{
              textAlign: "center",
              color: "#ffff",
              fontFamily: "outfitregular",
            }}
          >
            Let's Get Started
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: Colors.PRIMARY,
    padding: 16,
    borderRadius: 99,
    marginTop: 0,
  },
});
