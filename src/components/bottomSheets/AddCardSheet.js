import { Picker } from "@react-native-picker/picker";
import { useQuery, useRealm } from "@realm/react";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import {
  Dimensions,
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  View,
} from "react-native";
import colors from "../../constants/colors";
import { createCard } from "../../controllers/cardContoller";
import { Deck } from "../../models/models";
import Button from "../elements/Button";
import ButtonUpload from "../elements/ButtonUpload";
import Space from "../elements/Space";

const { height } = Dimensions.get("window");

export default function AddCardSheet({ toggle, visible }) {
  //initialize realm
  const realm = useRealm();

  //get user input
  const [data, setData] = useState({
    name: "",
    frontText: "",
    frontImg: "",
    backText: "",
    backImg: "",
    lastRating: "",
    deckId: "",
  });

  //handle input changes
  const handleInputChanges = (name, value) => {
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //create new card
  const createNewCard = () => {
    //get data
    const { name, frontText, frontImg, backText, backImg, lastRating, deckId } =
      data;

    //validate input
    if (!name || !frontText || !backText || !lastRating || !deckId) {
      ToastAndroid.show("Enter all fields.", ToastAndroid.SHORT);
      return;
    }

    //create new card and get response
    const success = createCard(realm, data);

    ToastAndroid.show(
      success ? `${name} Card created.` : "Card not created.",
      ToastAndroid.SHORT
    );

    if (success) {
      setData({
        name: "",
        frontText: "",
        frontImg: "",
        backText: "",
        backImg: "",
        lastRating: "",
        deckId: "",
      });
      toggle();
    }
  };

  //pick front image function
  const pickFrontImg = async () => {
    //request media library permission
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      alert("Permission to access gallery is required!");
      return;
    }

    //handle both new & old APIs
    const mediaType = ImagePicker.MediaType
      ? ImagePicker.MediaType.IMAGE //new expo sdk
      : ImagePicker.MediaTypeOptions.Images; //old sdk

    //open gallery
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: mediaType,
      quality: 1,
    });

    //save img uri
    if (!result.canceled) {
      setData((prev) => ({ ...prev, frontImg: result.assets[0].uri }));
    }
  };

  //pick back image function
  const pickBackImg = async () => {
    //request media library permission
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      alert("Permission to access gallery is required!");
      return;
    }

    //handle both new & old APIs
    const mediaType = ImagePicker.MediaType
      ? ImagePicker.MediaType.IMAGE //new expo sdk
      : ImagePicker.MediaTypeOptions.Images; //old sdk

    //open gallery
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: mediaType,
      quality: 1,
    });

    //save img uri
    if (!result.canceled) {
      setData((prev) => ({ ...prev, backImg: result.assets[0].uri }));
    }
  };

  //get all decks names
  const decks = useQuery(Deck);

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
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          alignItems: "center",
        }}
        style={styles.bottomSheet}
      >
        <Text style={styles.title}>New Card</Text>
        <Space height={40} />

        {/* card name input */}
        <TextInput
          placeholder="Card name"
          placeholderTextColor={colors.darkGray}
          maxLength={20}
          style={styles.input}
          value={data.name}
          onChangeText={(text) => handleInputChanges("name", text)}
        />
        <Space />

        {/* front text input */}
        <TextInput
          placeholder="Front text"
          placeholderTextColor={colors.darkGray}
          multiline={true}
          numberOfLines={5}
          textAlignVertical="top"
          style={[styles.input, { height: 120 }]}
          value={data.frontText}
          onChangeText={(text) => handleInputChanges("frontText", text)}
        />
        <Space />

        {/* front image input */}
        <View style={styles.uploadContainer}>
          <ButtonUpload onPress={pickFrontImg} isUploaded={data.frontImg} />
          {data.frontImg ? (
            <Image source={{ uri: data.frontImg }} style={styles.imgPrev} />
          ) : (
            <Text style={styles.formatHint}>(.jpg / .jpeg / .png)</Text>
          )}
        </View>
        <Space />

        {/* back text input */}
        <TextInput
          placeholder="Back text"
          placeholderTextColor={colors.darkGray}
          multiline={true}
          numberOfLines={5}
          textAlignVertical="top"
          style={[styles.input, { height: 120 }]}
          value={data.backText}
          onChangeText={(text) => handleInputChanges("backText", text)}
        />
        <Space />

        {/* back image input */}
        <View style={styles.uploadContainer}>
          <ButtonUpload onPress={pickBackImg} isUploaded={data.backImg} />
          {data.backImg ? (
            <Image source={{ uri: data.backImg }} style={styles.imgPrev} />
          ) : (
            <Text style={styles.formatHint}>(.jpg / .jpeg / .png)</Text>
          )}
        </View>
        <Space />

        {/* deck picker */}
        <Picker
          selectedValue={data.deckId}
          onValueChange={(deckId) => handleInputChanges("deckId", deckId)}
          style={styles.picker}
          dropdownIconColor={colors.darkGray}
        >
          <Picker.Item label="Select deck" value="" />
          {decks.map((deck) => (
            <Picker.Item key={deck._id} label={deck.name} value={deck._id} />
          ))}
        </Picker>
        <Space />

        {/* rate picker */}
        <Picker
          selectedValue={data.lastRating}
          onValueChange={(rate) => handleInputChanges("lastRating", rate)}
          style={styles.picker}
          dropdownIconColor={colors.darkGray}
        >
          <Picker.Item label="Select rate" value="" />
          <Picker.Item label="Hard" value="hard" />
          <Picker.Item label="Normal" value="normal" />
          <Picker.Item label="Easy" value="easy" />
        </Picker>
        <Space />

        <Button type={"save"} text={"Save"} onPress={createNewCard} />
        <Space height={80} />
      </ScrollView>
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
    height: (height / 3) * 2,
    backgroundColor: colors.white,
    // alignItems: "center",
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
    textAlign: "justify",
  },
  uploadContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  imgPrev: { width: 40, height: 40, marginLeft: 16, borderRadius: 8 },
  formatHint: {
    color: colors.red,
    fontWeight: "bold",
    marginLeft: 16,
  },
  picker: {
    width: "100%",
    backgroundColor: colors.lightGray,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: colors.darkGray,
    padding: 4,
    fontSize: 20,
    color: colors.black,
  },
});
