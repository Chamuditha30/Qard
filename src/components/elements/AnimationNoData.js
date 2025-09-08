import LottieView from "lottie-react-native";
import { Dimensions, StyleSheet, View } from "react-native";
import nodata from "../../assets/images/noData.json";

const { width } = Dimensions.get("window");

export default function AnimationNoData() {
  return (
    <View style={styles.container}>
      <LottieView
        source={nodata}
        loop
        autoplay
        style={{ width: width * 0.5, height: width * 0.5 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
