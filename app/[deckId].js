import { useObject } from "@realm/react";
import { useLocalSearchParams } from "expo-router";
import React, { useCallback, useState } from "react";
import { FlatList, Keyboard, StyleSheet, View } from "react-native";
import { BSON } from "realm";
import AddCardSheet from "../src/components/bottomSheets/AddCardSheet";
import AddDeckSheet from "../src/components/bottomSheets/AddDeckSheet";
import DeleteCardSheet from "../src/components/bottomSheets/DeleteCardSheet";
import EditCardSheet from "../src/components/bottomSheets/EditCardSheet";
import CardView from "../src/components/cardModals/CardView";
import AddCardButton from "../src/components/elements/AddCardButton";
import AddDeckButton from "../src/components/elements/AddDeckButton";
import Background from "../src/components/elements/Background";
import CardComp from "../src/components/elements/Card";
import EmptyState from "../src/components/elements/EmptyState";
import SearchBox from "../src/components/elements/SearchBox";
import Space from "../src/components/elements/Space";
import { Deck } from "../src/models/models";

//use react memo with CardComp to prevent unnecessary re renders
const MemoCardComp = React.memo(CardComp);

export default function DeckCards() {
  //get user searched query
  const [query, setQuery] = useState("");

  //handle search bar input changes
  const handleQueryChanges = useCallback((text) => {
    setQuery(text);
  }, []);

  //clear search bar
  const clearSearchbar = useCallback(() => {
    setQuery("");
    Keyboard.dismiss();
  }, []);

  //new deck sheet state
  const [isNewDeckSheetVisible, setIsNewDeckSheetVisible] = useState(false);

  //new deck sheet toggle
  const toggleNewDeckSheet = useCallback(() => {
    setIsNewDeckSheetVisible((prev) => !prev);
  }, []);

  //new card sheet state
  const [isNewCardSheetVisible, setIsNewCardSheetVisible] = useState(false);

  //new card sheet toggle
  const toggleNewCardSheet = useCallback(() => {
    setIsNewCardSheetVisible((prev) => !prev);
  }, []);

  //selected card state to edit
  const [selectedCard, setSelectedCard] = useState(null);

  //edit deck sheet state
  const [isEditCardSheetVisible, setIsEditCardSheetVisible] = useState(false);

  //edit deck sheet toggle
  const toggleEditCardSheet = useCallback((card) => {
    setSelectedCard(card);
    setIsEditCardSheetVisible((prev) => !prev);
  }, []);

  //card view state
  const [isCardViewVisible, setIsCardViewVisible] = useState(false);

  //view card toggle
  const toggleCardView = useCallback((card) => {
    setSelectedCard(card);
    setIsCardViewVisible((prev) => !prev);
  }, []);

  //selected card id to delete
  const [selectedCardId, setSelectedCardId] = useState(null);

  //delete card sheet state
  const [isDeleteCardSheetVisible, setIsDeleteCardSheetVisible] =
    useState(false);

  //delete selected card
  const selectCardToDelete = useCallback((card) => {
    if (!card?._id) return;
    setSelectedCardId(card._id);
  }, []);

  //delete deck sheet toggle
  const toggleDeleteCardSheet = useCallback(() => {
    setIsDeleteCardSheetVisible((prev) => !prev);
  }, []);

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
            <AddCardButton onPress={toggleNewCardSheet} decks={deck} />
          </View>
        </View>

        <Space height={40} />

        {/* display all cards */}
        <FlatList
          data={cards}
          keyExtractor={(item) => item._id.toString()}
          renderItem={({ item }) => (
            <MemoCardComp
              name={item.name}
              rate={item.lastRating}
              nextReview={item.nextReview}
              openEditSheet={() => toggleEditCardSheet(item)}
              openDeleteSheet={() => {
                selectCardToDelete(item);
                toggleDeleteCardSheet();
              }}
              onPress={() => toggleCardView(item)}
            />
          )}
          ListEmptyComponent={<EmptyState action={toggleNewCardSheet} />}
        />
      </View>

      {/* add deck bottom sheet */}
      {isNewDeckSheetVisible && (
        <AddDeckSheet
          toggle={toggleNewDeckSheet}
          visible={isNewDeckSheetVisible}
        />
      )}

      {/* add card bottom sheet */}
      {isNewCardSheetVisible && (
        <AddCardSheet
          toggle={toggleNewCardSheet}
          visible={isNewCardSheetVisible}
        />
      )}

      {/* view card */}
      {isCardViewVisible && (
        <CardView
          toggle={toggleCardView}
          visible={isCardViewVisible}
          item={selectedCard}
        />
      )}

      {/* edit card bottom sheet */}
      {isEditCardSheetVisible && (
        <EditCardSheet
          toggle={toggleEditCardSheet}
          visible={isEditCardSheetVisible}
          item={selectedCard}
        />
      )}

      {/* delete card bottom sheet */}
      {isDeleteCardSheetVisible && (
        <DeleteCardSheet
          toggle={toggleDeleteCardSheet}
          visible={isDeleteCardSheetVisible}
          cardId={selectedCardId}
        />
      )}
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
