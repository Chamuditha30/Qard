import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Pressable, StyleSheet, Text } from "react-native";
import colors from "../../src/constants/colors";

export default function ButtonUpload({ onPress, isUploaded }) {
  return (
    <Pressable
      android_ripple={{ color: "#ffffff49", borderless: false }}
      style={styles.btn}
      onPress={onPress}
    >
      <Text style={styles.btnTxt}>{isUploaded ? "Uploaded" : "Upload"}</Text>
      {isUploaded ? (
        <MaterialIcons name="check-circle" size={24} color={colors.white} />
      ) : (
        <MaterialIcons name="upload" size={24} color={colors.white} />
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: colors.lightBlue,
    padding: 4,
    alignItems: "center",
    borderRadius: 4,
    overflow: "hidden",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    width: 160,
    justifyContent: "center",
  },
  btnTxt: {
    color: colors.white,
    fontSize: 20,
    fontWeight: "semibold",
  },
});
