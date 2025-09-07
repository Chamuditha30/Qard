import { RealmProvider } from "@realm/react";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Card, Deck } from "../src/models/models";

export default function RootLayout() {
  return (
    <GestureHandlerRootView>
      <RealmProvider schema={[Card, Deck]}>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="[deckId]" options={{ headerShown: false }} />
        </Stack>
      </RealmProvider>
    </GestureHandlerRootView>
  );
}
