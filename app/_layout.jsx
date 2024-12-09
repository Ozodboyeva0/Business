import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import React from "react";
import { ActivityIndicator } from "react-native";
import LoginScreen from "../components/LoginScreen";

export default function RootLayout() {
  // Load custom fonts
  const [fontsLoaded] = useFonts({
    outfitbold: require("../assets/fonts/Outfit-Bold.ttf"),
    outfitmedium: require("../assets/fonts/Outfit-Medium.ttf"),
    " outfitregular": require("../assets/fonts/Outfit-Regular.ttf"),
  });

  // Show loading indicator while fonts are loading
  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#007AFF" />;
  }

  return (
    <ClerkProvider
      publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY}
    >
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="{tabs}"></Stack>
      </Stack>
    </ClerkProvider>
  );
}
