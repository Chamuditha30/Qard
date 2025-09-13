import { useRealm } from "@realm/react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from "react-native";
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

  return (
    <Modal
      transparent
      visible={visible}
      onRequestClose={() => {
        toggle();
      }}
    >
      <Pressable
        style={styles.backdrop}
        onPress={() => {
          toggle();
        }}
      />
      <View style={styles.bottomSheet}>
        <Text style={styles.title}>Delete Deck</Text>
        <Space height={40} />
        <Text style={styles.warning}>Are you sure, Delete this deck?</Text>
        <Space height={24} />
        <Button type={"delete"} text={"Delete"} onPress={deletingDeck} />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.5)",
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
