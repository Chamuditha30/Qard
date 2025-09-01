import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Pressable, StyleSheet } from "react-native";
import colors from "../../src/constants/colors";

export default function AddCardButton({ onPress }) {
  return (
    <Pressable style={styles.button} onPress={onPress}>
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
