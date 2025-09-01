import { LinearGradient } from "expo-linear-gradient";
import { Image, StyleSheet, View } from "react-native";
import logo from "../../assets/images/logo.png";
import colors from "../../src/constants/colors";

export default function Background({ children }) {
  return (
    <View style={styles.background}>
      {/* top gradient box */}
      <LinearGradient
        colors={[colors.darkBlue, colors.lightBlue]}
        style={styles.box}
      >
        {/* logo image */}
        <Image source={logo} style={styles.logo} resizeMode="contain" />
      </LinearGradient>

      {/* content */}
      <View style={styles.content}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    width: "100%",
    height: "100%",
    backgroundColor: colors.white,
  },
  box: {
    width: "100%",
    height: 320,
    position: "absolute",
    top: 0,
    left: 0,
    borderBottomRightRadius: 40,
    borderBottomLeftRadius: 40,
  },
  logo: {
    width: 160,
    height: 160,
  },
  content: {
    flex: 1,
    padding: 16,
    paddingTop: 136,
  },
});
