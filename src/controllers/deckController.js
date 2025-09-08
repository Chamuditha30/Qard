import Realm from "realm";

//create new deck
export const createDeck = (realm, data) => {
  try {
    realm.write(() => {
      realm.create("Deck", {
        _id: new Realm.BSON.ObjectID(), //generate unique deck id
        ...data,
      });
    });
    return true;
  } catch (error) {
    console.error("Failed to create deck:", error);
    return false;
  }
};

//edit deck
export const editDeck = (realm, data) => {
  try {
    realm.write(() => {
      realm.create(
        "Deck",
        {
          _id: data._id,
          ...data,
        },
        "modified"
      );
    });
    return true;
  } catch (error) {
    console.error("Failed to edit deck:", error);
    return false;
  }
};

//delete deck
export const deleteDeck = (realm, deckId) => {
  try {
    realm.write(() => {
      //get selected deck
      const deck = realm.objectForPrimaryKey("Deck", deckId);

      if (!deck) {
        console.error("Deck not found");
        return false;
      }

      //delete all cards in the deck
      if (deck.cards && deck.cards.length > 0) {
        //delete all cards in the cards array
        realm.delete(deck.cards);
      }

      //delete deck
      realm.delete(deck);
    });

    return true;
  } catch (error) {
    console.error("Failed to delete deck:", error);
    return false;
  }
};
