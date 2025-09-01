import { StyleSheet, Text, View } from "react-native";
import Background from "../../src/components/Background";

export default function Cards() {
  return (
    <Background>
      <View style={styles.container}>
        <Text>cards</Text>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
});
