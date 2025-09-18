import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Pressable, StyleSheet, ToastAndroid } from "react-native";
import colors from "../../constants/colors";

export default function AddCardButton({ onPress, decks }) {
  return (
    <Pressable
      style={styles.button}
      onPress={() => {
        if (decks.length === 0) {
          ToastAndroid.show(
            "Create a deck before creating a card.",
            ToastAndroid.SHORT
          );
          return;
        }
        onPress();
      }}
    >
      <MaterialCommunityIcons
        name="card-plus"
        size={32}
        color={colors.lightBlue}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.white,
    padding: 4,
    borderRadius: 100,
    elevation: 8,
  },
});
