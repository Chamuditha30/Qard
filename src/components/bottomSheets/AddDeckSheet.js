import { useRealm } from "@realm/react";
import { useState } from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  View,
} from "react-native";
import colors from "../../constants/colors";
import { createDeck } from "../../controllers/deckController";
import Button from "../elements/Button";
import Space from "../elements/Space";

export default function AddDeckSheet({ toggle, visible }) {
  //initialize realm
  const realm = useRealm();

  //get user input
  const [data, setData] = useState({
    name: "",
    cards: [],
  });

  //handle input changes
  const handleInputChanges = (name, value) => {
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //create new deck
  const createNewDeck = () => {
    //get data
    const { name, cards } = data;

    //validate input
    if (!name) {
      ToastAndroid.show("Enter deck name.", ToastAndroid.SHORT);
      return;
    }

    //create new deck and get response
    const success = createDeck(realm, data);

    ToastAndroid.show(
      success ? `${name} Deck created.` : "Deck not created.",
      ToastAndroid.SHORT
    );

    if (success) {
      setData({ name: "", cards: [] });
      toggle();
    }
  };

  return (
    <Modal transparent visible={visible}>
      <Pressable
        style={styles.backdrop}
        onPress={() => {
          toggle();
        }}
      />
      <View style={styles.bottomSheet}>
        <Text style={styles.title}>New Deck</Text>
        <Space height={40} />
        <TextInput
          placeholder="Deck name"
          style={styles.input}
          value={data.name}
          onChangeText={(text) => handleInputChanges("name", text)}
        />
        <Space />
        <Button type={"save"} text={"Save"} onPress={createNewDeck} />
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
  input: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: colors.darkGray,
    padding: 4,
    fontSize: 20,
  },
});
