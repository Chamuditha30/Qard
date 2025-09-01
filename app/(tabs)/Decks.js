import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import AddCardButton from "../../src/components/AddCardButton";
import AddDeckButton from "../../src/components/AddDeckButton";
import Background from "../../src/components/Background";
import SearchBox from "../../src/components/SearchBox";
import Space from "../../src/components/Space";

export default function Decks() {
  //get user searched query
  const [query, setQuery] = useState("");

  //handle search bar input changes
  const handleQueryChanges = (text) => {
    setQuery(text);
  };

  //clear search bar
  const clearSearchbar = () => {
    setQuery("");
  };

  //create new deck
  const createNewDeck = () => {
    console.log("Deck created successful");
  };

  //create new card
  const createNewCard = () => {
    console.log("Card created successful");
  };

  return (
    <Background>
      <View style={styles.container}>
        {/* search box, add deck button & add card button */}
        <View style={styles.controlArea}>
          <SearchBox
            value={query}
            onChangeText={handleQueryChanges}
            clearSearchbar={clearSearchbar}
          />

          {/* button container */}
          <View style={styles.btnContainer}>
            <AddDeckButton onPress={createNewDeck} />
            <AddCardButton onPress={createNewCard} />
          </View>
        </View>

        <Space />

        <Text>{query}</Text>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "start",
    alignItems: "center",
  },
  controlArea: {
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  btnContainer: {
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
  },
});
