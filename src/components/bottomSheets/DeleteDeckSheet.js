import { useRealm } from "@realm/react";
import { useEffect } from "react";
import { Modal, Pressable, StyleSheet, Text, ToastAndroid } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import colors from "../../constants/colors";
import { deleteDeck } from "../../controllers/deckController";
import Button from "../elements/Button";
import Space from "../elements/Space";

export default function DeleteDeckSheet({ deckId, toggle, visible }) {
  //initialize realm
  const realm = useRealm();

  //delete card
  const deletingDeck = () => {
    const success = deleteDeck(realm, deckId);

    ToastAndroid.show(
      success ? "Card deleted." : "Card not deleted.",
      ToastAndroid.SHORT
    );

    if (success) {
      toggle();
    }
  };

  //initialize shared value for opacity
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(300);

  //animate when modal opens/closes
  useEffect(() => {
    if (visible) {
      opacity.value = withTiming(1, { duration: 300 });
      translateY.value = withTiming(0, { duration: 300 });
    } else {
      opacity.value = withTiming(0, { duration: 200 });
      translateY.value = withTiming(300, { duration: 200 });
    }
  }, [visible]);

  //animated style for backdrop
  const backdropStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const sheetStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Modal
      transparent
      visible={visible}
      onRequestClose={() => {
        toggle();
      }}
    >
      <Animated.View style={[styles.backdrop, backdropStyle]}>
        <Pressable style={{ flex: 1 }} onPress={toggle} />
      </Animated.View>

      <Animated.View style={[styles.bottomSheet, sheetStyle]}>
        <Text style={styles.title}>Delete Deck</Text>
        <Space height={40} />
        <Text style={styles.warning}>Are you sure, Delete this deck?</Text>
        <Space height={24} />
        <Button type={"delete"} text={"Delete"} onPress={deletingDeck} />
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.8)",
    justifyContent: "flex-end",
  },
  bottomSheet: {
    width: "100%",
    height: 240,
    backgroundColor: colors.white,
    alignItems: "center",
    padding: 16,
    position: "absolute",
    bottom: 0,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "rgba(0,0,0,0.3)",
  },
  warning: {
    fontSize: 20,
    fontWeight: "bold",
    color: "rgba(0,0,0,0.5)",
  },
});
