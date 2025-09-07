import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Tabs } from "expo-router";
import { Pressable } from "react-native";
import colors from "../../src/constants/colors";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.lightBlue,
        tabBarInactiveTintColor: colors.darkGray,
        tabBarStyle: {
          backgroundColor: colors.white,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "semibold",
        },
        tabBarButton: (props) => (
          <Pressable
            {...props}
            android_ripple={{ color: "#E5E7FF", borderless: true }}
          />
        ),
      }}
    >
      <Tabs.Screen
        name="Cards"
        options={{
          title: "Cards",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="cards" size={32} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Decks"
        options={{
          title: "Decks",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="card-multiple"
              size={32}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
