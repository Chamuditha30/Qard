import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Pressable, StyleSheet } from "react-native";
import colors from "../../constants/colors";

export default function AddDeckButton({ onPress }) {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <MaterialCommunityIcons
        name="view-grid-plus"
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
