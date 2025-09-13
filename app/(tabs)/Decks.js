import { useQuery } from "@realm/react";
import { useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import { FlatList, Keyboard, StyleSheet, View } from "react-native";
import AddCardSheet from "../../src/components/bottomSheets/AddCardSheet";
import AddDeckSheet from "../../src/components/bottomSheets/AddDeckSheet";
import DeleteDeckSheet from "../../src/components/bottomSheets/DeleteDeckSheet";
import EditDeckSheet from "../../src/components/bottomSheets/EditDeckSheet";
import AddCardButton from "../../src/components/elements/AddCardButton";
import AddDeckButton from "../../src/components/elements/AddDeckButton";
import Background from "../../src/components/elements/Background";
import DeckCard from "../../src/components/elements/Deck";
import EmptyState from "../../src/components/elements/EmptyState";
import SearchBox from "../../src/components/elements/SearchBox";
import Space from "../../src/components/elements/Space";
import { Deck } from "../../src/models/models";

//use react memo with CardComp to prevent unnecessary re renders
const MemoDeckCard = React.memo(DeckCard);

export default function Decks() {
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

  //selected deck state
  const [selectedDeck, setSelectedDeck] = useState(null);

  //edit deck sheet state
  const [isEditDeckSheetVisible, setIsEditDeckSheetVisible] = useState(false);

  //edit deck sheet toggle
  const toggleEditDeckSheet = useCallback((deck) => {
    setSelectedDeck(deck);
    setIsEditDeckSheetVisible((prev) => !prev);
  }, []);

  //selected deck id to delete
  const [selectedDeckId, setSelectedDeckId] = useState(null);

  //delete deck sheet state
  const [isDeleteDeckSheetVisible, setIsDeleteDeckSheetVisible] =
    useState(false);

  //delete selected deck
  const selectDeckToDelete = useCallback((deck) => {
    if (!deck?._id) return;
    setSelectedDeckId(deck._id);
  }, []);

  //delete deck sheet toggle
  const toggleDeleteDeckSheet = useCallback(() => {
    setIsDeleteDeckSheetVisible((prev) => !prev);
  }, []);

  //new card sheet state
  const [isNewCardSheetVisible, setIsNewCardSheetVisible] = useState(false);

  //new card sheet toggle
  const toggleNewCardSheet = useCallback(() => {
    setIsNewCardSheetVisible((prev) => !prev);
  }, []);

  //get all decks
  const decks = useQuery(Deck).filtered("name CONTAINS[c] $0", query);

  //initialize router to navigate dynamic screens
  const router = useRouter();

  //navigate
  const navigate = useCallback(
    (id) => {
      router.push(`/${id}`);
    },
    [router]
  );

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
          data={decks}
          keyExtractor={(item) => item._id.toString()}
          renderItem={({ item }) => (
            <MemoDeckCard
              name={item.name}
              count={item.cards.length}
              openEditSheet={() => toggleEditDeckSheet(item)}
              openDeleteSheet={() => {
                selectDeckToDelete(item);
                toggleDeleteDeckSheet();
              }}
              onPress={() => navigate(item._id)}
            />
          )}
          ListEmptyComponent={
            <EmptyState screen={"decks"} action={toggleNewDeckSheet} />
          }
        />
      </View>

      {/* add deck bottom sheet */}
      {isNewDeckSheetVisible && (
        <AddDeckSheet
          toggle={toggleNewDeckSheet}
          visible={isNewDeckSheetVisible}
        />
      )}

      {/* edit deck bottom sheet */}
      {isEditDeckSheetVisible && (
        <EditDeckSheet
          toggle={toggleEditDeckSheet}
          visible={isEditDeckSheetVisible}
          item={selectedDeck}
        />
      )}

      {/* delete deck bottom sheet */}
      {isDeleteDeckSheetVisible && (
        <DeleteDeckSheet
          toggle={toggleDeleteDeckSheet}
          visible={isDeleteDeckSheetVisible}
          deckId={selectedDeckId}
        />
      )}

      {/* add card bottom sheet */}
      {isNewCardSheetVisible && (
        <AddCardSheet
          toggle={toggleNewCardSheet}
          visible={isNewCardSheetVisible}
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
