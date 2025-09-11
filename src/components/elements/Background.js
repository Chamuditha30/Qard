import { Image, ImageBackground, StyleSheet, View } from "react-native";
import bgCards from "../../../assets/images/bgCards.png";
import bgDecks from "../../../assets/images/bgDecks.png";
import logo from "../../../assets/images/logo.png";
import colors from "../../constants/colors";

export default function Background({ children, screen, haveCards }) {
  return (
    <ImageBackground
      source={screen == "decks" ? bgDecks : bgCards}
      style={styles.background}
      resizeMode="cover"
    >
      {/* logo image */}
      <Image source={logo} style={styles.logo} resizeMode="contain" />

      {/* bottom box */}
      {haveCards && <View style={styles.box} />}

      {/* content */}
      <View style={styles.content}>{children}</View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    width: "100%",
    height: "100%",
  },
  box: {
    width: "100%",
    height: 320,
    position: "absolute",
    bottom: 0,
    left: 0,
    backgroundColor: colors.darkBlue,
    borderTopRightRadius: 24,
    borderTopLeftRadius: 24,
    opacity: 0.8,
  },
  logo: {
    width: 208,
    height: 120,
    marginTop: 16,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
});
