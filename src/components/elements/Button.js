import { Pressable, StyleSheet, Text } from "react-native";
import colors from "../../constants/colors";

export default function Button({ type, text, onPress }) {
  return (
    <Pressable
      android_ripple={{ color: "#ffffff49", borderless: false }}
      style={[
        {
          backgroundColor: type == "save" ? colors.lightBlue : colors.red,
        },
        styles.btn,
      ]}
      onPress={onPress}
    >
      <Text style={styles.btnTxt}>{text}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
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
