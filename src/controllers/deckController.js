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

//add card into deck
export const createCard = (realm, data) => {
  try {
    //get deck by id
    const deck = realm.objectForPrimaryKey("Deck", data.deckId);

    if (!deck) {
      console.error("Deck not found");
      return false;
    }

    //add card to deck
    realm.write(() => {
      deck.cards.push({
        _id: new Realm.BSON.ObjectId(), //generate unique card id
        lastReviewed: new Date(),
        nextReview: new Date(),
        lastIntervalHours: 0,
        ...data,
      });
    });
    return true;
  } catch (error) {
    console.error("Failed to add card to deck:", error);
    return false;
  }
};

//edit card by id
export const editCard = (realm, data) => {
  try {
  } catch (error) {}
};
