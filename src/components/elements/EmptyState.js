import { FontAwesome, FontAwesome6 } from "@expo/vector-icons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useNavigation } from "expo-router";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import colors from "../../constants/colors";
import Button from "./Button";

const { width, height } = Dimensions.get("window");

export default function EmptyState({ screen, action }) {
  //set icon base on screen
  const icon =
    screen === "cards" ? (
      <FontAwesome6 name="rocket" size={120} color={colors.darkGray} />
    ) : screen === "decks" ? (
      <FontAwesome name="tasks" size={120} color={colors.darkGray} />
    ) : (
      <FontAwesome5 name="inbox" size={120} color={colors.darkGray} />
    );

  //set empty states texts and buttons
  const reviewEmptyState = [
    { message: "All done! 🚀", button: "Add Cards" },
    { message: "Zero reviews! 💪", button: "Go to Decks" },
    { message: "Brain cleared! ⚡", button: "Add More" },
    { message: "Take a break, champ! 😎", button: "New Cards" },
    { message: "Streak safe! 🔥", button: "Decks" },
  ];

  const decksEmptyState = [
    { message: "Create your first deck! 📚", button: "Add Deck" },
    { message: "Start your brain garden 🌱", button: "New Deck" },
    { message: "Build your knowledge empire 🏰", button: "Create Deck" },
    { message: "No decks yet, let’s go! 🚀", button: "Add Now" },
    { message: "Time to add a deck! ⏰", button: "Start Deck" },
  ];

  const cardsEmptyState = [
    { message: "Add your first card! ✨", button: "Add Card" },
    { message: "Deck is empty, start now! ⚡", button: "New Card" },
    { message: "Your brain boost awaits! 🧠", button: "Create Card" },
    { message: "Empty deck, add cards! 🎯", button: "Add Now" },
    { message: "Create a card, level up! 🚀", button: "Start Card" },
  ];

  //get randomly text and button
  const randomReview =
    reviewEmptyState[Math.floor(Math.random() * reviewEmptyState.length)];

  const randomDeck =
    decksEmptyState[Math.floor(Math.random() * decksEmptyState.length)];

  const randomCard =
    cardsEmptyState[Math.floor(Math.random() * cardsEmptyState.length)];

  const text =
    screen === "cards"
      ? randomReview.message
      : screen === "decks"
      ? randomDeck.message
      : randomCard.message;

  const btnText =
    screen === "cards"
      ? randomReview.button
      : screen === "decks"
      ? randomDeck.button
      : randomCard.button;

  //initialize use navigation
  const navigation = useNavigation();

  //button press actions
  const buttonHanlder = () =>
    screen === "cards" ? navigation.navigate("Decks") : action && action();

  return (
    <View style={styles.container}>
      <View style={styles.bg}>
        {/* icon */}
        <View style={styles.icon}>{icon}</View>

        {/* text */}
        <Text style={styles.text}>{text}</Text>

        {/* button */}
        <Button
          type={"save"}
          text={btnText}
          customStyles={{ width: "auto", paddingHorizontal: 8 }}
          onPress={buttonHanlder}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: width * 0.8,
    height: height * 0.6,
    justifyContent: "center",
    alignItems: "center",
  },
  bg: {
    backgroundColor: colors.bgBlue,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    gap: 24,
    borderRadius: 16,
    paddingVertical: 40,
  },
  icon: {
    borderWidth: 6,
    borderColor: colors.darkGray,
    padding: 40,
    borderRadius: 1000,
    borderStyle: "dashed",
  },
  text: {
    fontSize: 24,
    color: colors.darkBlue,
    fontWeight: "bold",
    textAlign: "center",
  },
});
