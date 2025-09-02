import { Pressable, StyleSheet, Text } from "react-native";
import colors from "../../src/constants/colors";

export default function Button({ text, onPress }) {
  return (
    <Pressable
      android_ripple={{ color: "#ffffff49", borderless: false }}
      style={styles.btn}
      onPress={onPress}
    >
      <Text style={styles.btnTxt}>{text}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: colors.lightBlue,
    width: 80,
    padding: 4,
    alignItems: "center",
    borderRadius: 4,
    overflow: "hidden",
  },
  btnTxt: {
    color: colors.white,
    fontSize: 20,
    fontWeight: "semibold",
  },
});
