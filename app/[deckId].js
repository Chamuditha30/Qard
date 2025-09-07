import { useObject } from "@realm/react";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { BSON } from "realm";
import AddCardButton from "../src/components/AddCardButton";
import AddCardSheet from "../src/components/AddCardSheet";
import AddDeckButton from "../src/components/AddDeckButton";
import AddDeckSheet from "../src/components/AddDeckSheet";
import Background from "../src/components/Background";
import CardComp from "../src/components/Card";
import EditCardSheet from "../src/components/EditCardSheet";
import SearchBox from "../src/components/SearchBox";
import Space from "../src/components/Space";
import { Deck } from "../src/models/models";

export default function DeckCards() {
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

  //new card sheet state
  const [isNewCardSheetVisible, setIsNewCardSheetVisible] = useState(false);

  //new card sheet toggle
  const toggleNewCardSheet = () => {
    setIsNewCardSheetVisible(!isNewCardSheetVisible);
  };

  //selected card state
  const [selectedCard, setSelectedCard] = useState(null);

  //edit deck sheet state
  const [isEditCardSheetVisible, setIsEditCardSheetVisible] = useState(false);

  //edit deck sheet toggle
  const toggleEditCardSheet = (card) => {
    setSelectedCard(card);
    setIsEditCardSheetVisible(!isEditCardSheetVisible);
  };

  //get selected deck id
  const { deckId } = useLocalSearchParams();

  // convert string -> ObjectId
  const objectId = new BSON.ObjectId(deckId);

  //get deck by id
  const deck = useObject(Deck, objectId);

  //get all cards and filter
  const cards = deck.cards.filtered("name CONTAINS[c] $0", query);

  return (
    <Background screen={"decks"}>
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
            <AddCardButton onPress={toggleNewCardSheet} />
          </View>
        </View>

        <Space height={40} />

        {/* display all cards */}
        <FlatList
          data={cards}
          keyExtractor={(item) => item._id.toString()}
          renderItem={({ item }) => (
            <CardComp
              name={item.name}
              rate={item.lastRating}
              openEditSheet={() => toggleEditCardSheet(item)}
            />
          )}
        />
      </View>

      {/* add deck bottom sheet */}
      <AddDeckSheet
        toggle={toggleNewDeckSheet}
        visible={isNewDeckSheetVisible}
      />

      {/* add card bottom sheet */}
      <AddCardSheet
        toggle={toggleNewCardSheet}
        visible={isNewCardSheetVisible}
      />

      {/* edit card bottom sheet */}
      <EditCardSheet
        toggle={toggleEditCardSheet}
        visible={isEditCardSheetVisible}
        item={selectedCard}
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
