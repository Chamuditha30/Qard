import { useQuery, useRealm } from "@realm/react";
import { useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  View,
} from "react-native";
import { createCard } from "../src/controllers/cardContoller";
import { Card } from "../src/models/models";

export default function Sample() {
  const realm = useRealm();

  //store user inputs
  const [data, setData] = useState({
    name: "",
    frontText: "",
    backText: "",
    lastRating: "",
    lastReviewed: new Date(),
    nextReview: new Date(),
    lastIntervalHours: 0,
  });

  //get user inputs
  const handleInputChange = (name, value) => {
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //create card
  const createFlashCard = () => {
    const {
      name,
      frontText,
      backText,
      lastRating,
      lastReviewed,
      nextReview,
      lastIntervalHours,
    } = data;

    if (!name || !frontText || !backText || !lastRating) {
      ToastAndroid.show("Fill all fields.", ToastAndroid.SHORT);
      return;
    }

    const success = createCard(realm, data);

    ToastAndroid.show(
      success ? "Flash card created." : "Flash card not created.",
      ToastAndroid.SHORT
    );
  };

  //get all cards
  const cards = useQuery(Card);

  return (
    <View style={styles.container}>
      {/* create card */}
      <TextInput
        placeholder="Card name"
        style={styles.input}
        value={data.name}
        onChangeText={(text) => handleInputChange("name", text)}
      />
      <TextInput
        placeholder="Front text"
        style={styles.input}
        value={data.frontText}
        onChangeText={(text) => handleInputChange("frontText", text)}
      />
      <TextInput
        placeholder="Back text"
        style={styles.input}
        value={data.backText}
        onChangeText={(text) => handleInputChange("backText", text)}
      />
      <TextInput
        placeholder="Rate"
        style={styles.input}
        value={data.lastRating}
        onChangeText={(text) => handleInputChange("lastRating", text)}
      />
      <Pressable onPress={createFlashCard}>
        <Text>Submit</Text>
      </Pressable>

      {/* display all cards */}
      <FlatList
        data={cards}
        keyExtractor={(item) => item._id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{item.name}</Text>
            <Text>{item.frontText}</Text>
            <Text>{item.backText}</Text>
            <Text>{item.lastRating}</Text>
            <Text>{item.lastReviewed.toLocaleString()}</Text>
            <Text>{item.nextReview.toLocaleString()}</Text>
            <Text>{item.lastIntervalHours}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "start",
    alignItems: "center",
    padding: 16,
  },

  input: {
    width: 200,
    height: 40,
    borderWidth: 1,
    borderColor: "#000000",
    padding: 4,
    marginBottom: 8,
  },
});
