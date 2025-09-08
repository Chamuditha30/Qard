import Realm from "realm";
import { getNextReview, getUpdatedInterval } from "../helpers/cardHelpers";

//create new card
export const createCard = (realm, data) => {
  try {
    realm.write(() => {
      //get selected deck
      const deck = realm.objectForPrimaryKey("Deck", data.deckId);

      if (!deck) {
        console.error("Deck not found");
        return false;
      }

      //get new interval
      const lastIntervalHours = getUpdatedInterval(0, null, data.lastRating);

      //get next review
      const nextReview = getNextReview(lastIntervalHours, data.lastRating);

      const card = realm.create("Card", {
        _id: new Realm.BSON.ObjectId(), //generate unique card id
        lastReviewed: new Date(),
        nextReview,
        lastIntervalHours,
        ...data,
      });

      //add card reference to deck
      deck.cards.push(card);
    });

    return true;
  } catch (error) {
    console.error("Failed to create card:", error);
    return false;
  }
};

//edit card
export const editCard = (realm, data) => {
  try {
    realm.write(() => {
      //find card using id
      const card = realm.objectForPrimaryKey("Card", data._id);

      if (!card) {
        console.error("Card not found");
        return false;
      }

      //get new interval
      const lastIntervalHours = getUpdatedInterval(
        card.lastIntervalHours,
        card.lastRating,
        data.lastRating
      );

      //get next review
      const nextReview = getNextReview(lastIntervalHours, data.lastRating);

      realm.create(
        "Card",
        {
          _id: data._id,
          lastIntervalHours,
          nextReview,
          lastReviewed: new Date(),
          ...data,
        },
        "modified"
      );
    });
    return true;
  } catch (error) {
    console.error("Failed to edit card:", error);
    return false;
  }
};

//delete card
export const deleteCard = (realm, cardId) => {
  try {
    realm.write(() => {
      //get selected card
      const card = realm.objectForPrimaryKey("Card", cardId);

      if (!card) {
        console.error("Card not found");
        return false;
      }

      //delete card (also removes it from any deck)
      realm.delete(card);
    });

    return true;
  } catch (error) {
    console.error("Failed to delete card:", error);
    return false;
  }
};
