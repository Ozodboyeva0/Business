import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import React from "react";
import { ActivityIndicator } from "react-native";
import LoginScreen from "../components/LoginScreen";

export default function RootLayout() {
  // Load custom fonts
  const [fontsLoaded] = useFonts({
    "outfit-bold": require("../assets/fonts/Outfit-Bold.ttf"),
    "outfit-medium": require("../assets/fonts/Outfit-Medium.ttf"),
    " outfit-regular": require("../assets/fonts/Outfit-Regular.ttf"),
  });

  // Show loading indicator while fonts are loading
  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#007AFF" />;
  }

  return (
    <ClerkProvider
      publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY} // Make sure this is correctly set in your environment variables
    >
      {/* Render authenticated stack or login screen */}
      <SignedIn>
        <Stack>
          <Stack.Screen
            name="(tabs)" // Ensure this matches your tabs layout file
            options={{
              headerShown: false,
            }}
          />
        </Stack>
      </SignedIn>
      <SignedOut>
        <LoginScreen /> {/* Show login screen if user is not signed in */}
      </SignedOut>
    </ClerkProvider>
  );
}
