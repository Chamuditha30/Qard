import { StyleSheet, View } from "react-native";
import colors from "../../constants/colors";

export default function Progressbar({ progress }) {
  return (
    <View>
      <View style={styles.progressbarBg}>
        <View style={[styles.progressbarFill, { flex: progress }]} />
        <View style={{ flex: 1 - progress }} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  progressbarBg: {
    backgroundColor: colors.white,
    width: "100%",
    height: 16,
    flexDirection: "row",
    marginVertical: 16,
    borderRadius: 100,
    overflow: "hidden",
    padding: 1,
  },
  progressbarFill: {
    backgroundColor: colors.lightBlue,
    borderRadius: 100,
  },
});
