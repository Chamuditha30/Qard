import { useQuery } from "@realm/react";
import { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import AddCardButton from "../../src/components/AddCardButton";
import AddDeckButton from "../../src/components/AddDeckButton";
import AddDeckSheet from "../../src/components/AddDeckSheet";
import Background from "../../src/components/Background";
import DeckCard from "../../src/components/Deck";
import SearchBox from "../../src/components/SearchBox";
import Space from "../../src/components/Space";
import { Deck } from "../../src/models/models";

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

  //new deck sheet state
  const [isNewDeckSheetVisible, setIsNewDeckSheetVisible] = useState(false);

  //new deck sheet toggle
  const toggleNewDeckSheet = () => {
    setIsNewDeckSheetVisible(!isNewDeckSheetVisible);
  };

  //get all decks
  const decks = useQuery(Deck).filtered("name CONTAINS[c] $0", query);

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
            <AddDeckButton onPress={toggleNewDeckSheet} />
            <AddCardButton />
          </View>
        </View>

        <Space height={40} />

        {/* display all cards */}
        <FlatList
          data={decks}
          keyExtractor={(item) => item._id.toString()}
          renderItem={({ item }) => (
            <DeckCard name={item.name} count={item.cards.length} />
          )}
        />
      </View>

      {/* add deck bottom sheet */}
      <AddDeckSheet
        toggle={toggleNewDeckSheet}
        visible={isNewDeckSheetVisible}
      />
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
