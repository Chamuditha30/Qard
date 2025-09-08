import {
  NotoSansSinhala_400Regular,
  NotoSansSinhala_600SemiBold,
  NotoSansSinhala_700Bold,
  useFonts,
} from "@expo-google-fonts/noto-sans-sinhala";
import { StyleSheet, Text } from "react-native";

export default function SinhalaText({ children, weight, style }) {
  //load fonts
  const [fontsLoaded] = useFonts({
    NotoSansSinhala_400Regular,
    NotoSansSinhala_600SemiBold,
    NotoSansSinhala_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  let fontFamily = "NotoSansSinhala_400Regular";
  if (weight === "semibold") {
    fontFamily = "NotoSansSinhala_600SemiBold";
  } else if (weight === "bold") {
    fontFamily = "NotoSansSinhala_700Bold";
  }

  return <Text style={[{ fontFamily }, style]}>{children}</Text>;
}

const styles = StyleSheet.create({});
