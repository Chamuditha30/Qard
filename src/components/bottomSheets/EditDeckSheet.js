import { useRealm } from "@realm/react";
import { useEffect, useState } from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import colors from "../../constants/colors";
import { editDeck } from "../../controllers/deckController";
import Button from "../elements/Button";
import Space from "../elements/Space";

export default function EditDeckSheet({ toggle, visible, item }) {
  //initialize realm
  const realm = useRealm();

  //get user input
  const [data, setData] = useState({ _id: null, name: "" });

  useEffect(() => {
    if (visible && item) {
      setData({ _id: item._id, name: item.name });
    }
  }, [visible, item]);

  //handle input changes
  const handleInputChanges = (name, value) => {
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //create new deck
  const updateDeck = () => {
    //get data
    const { _id, name } = data;

    //validate input
    if (!name) {
      ToastAndroid.show("Enter deck name.", ToastAndroid.SHORT);
      return;
    }

    //edit deck and get response
    const success = editDeck(realm, data);

    ToastAndroid.show(
      success ? `${name} Deck updated.` : "Deck not created.",
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
        <Pressable
          style={{ flex: 1 }}
          onPress={() => {
            toggle();
          }}
        />
      </Animated.View>

      <Animated.View style={[styles.bottomSheet, sheetStyle]}>
        <Text style={styles.title}>Edit Deck</Text>
        <Space height={40} />
        <TextInput
          placeholder="Deck name"
          placeholderTextColor={colors.darkGray}
          maxLength={20}
          style={styles.input}
          value={data.name}
          onChangeText={(text) => handleInputChanges("name", text)}
        />
        <Space />
        <Button type={"save"} text={"Save"} onPress={updateDeck} />
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
