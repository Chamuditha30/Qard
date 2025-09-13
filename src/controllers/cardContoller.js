import Realm from "realm";
import {
  getInterval,
  getNextReviewDate,
  getUpdatedIntervalForReview,
} from "../helpers/cardHelpers";
import { scheduleNotification } from "../helpers/notificationHelpers";

//create new card
export const createCard = (realm, data) => {
  try {
    //get selected deck
    const deck = realm.objectForPrimaryKey("Deck", data.deckId);

    if (!deck) {
      console.error("Deck not found");
      return false;
    }

    //get new interval
    const lastIntervalHours = getInterval(data.lastRating);

    //get next review
    const nextReview = getNextReviewDate(lastIntervalHours);
    // const nextReview = new Date();
    // console.log(nextReview.toLocaleString);

    realm.write(() => {
      const card = realm.create("Card", {
        _id: new Realm.BSON.ObjectId(), //generate unique card id
        lastReviewed: new Date(),
        nextReview: nextReview,
        lastIntervalHours: lastIntervalHours,
        ...data,
      });

      //add card reference to deck
      deck.cards.push(card);
    });

    //create notification
    scheduleNotification(nextReview);

    return true;
  } catch (error) {
    console.error("Failed to create card:", error);
    return false;
  }
};

//edit card
export const editCard = (realm, data) => {
  try {
    //find card using id
    const card = realm.objectForPrimaryKey("Card", data._id);

    if (!card) {
      console.error("Card not found");
      return false;
    }

    //get new interval and next review if rate changed
    // const { lastIntervalHours, nextReview, updated } = getUpdatedReviewDate(
    //   card.lastRating,
    //   data.lastRating,
    //   card.lastIntervalHours,
    //   card.nextReview
    // );

    realm.write(() => {
      realm.create(
        "Card",
        {
          _id: data._id,
          // lastIntervalHours,
          // nextReview,
          lastReviewed: new Date(),
          ...data,
        },
        "modified"
      );
    });

    //create notification if review changed
    // if (updated) {
    //   scheduleNotification(nextReview);
    // }

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

//review card
export const reviewCard = (realm, cardId, lastRating) => {
  try {
    //find card using id
    const card = realm.objectForPrimaryKey("Card", cardId);

    if (!card) {
      console.error("Card not found");
      return false;
    }

    //reset interval if rating changed, else multiply
    const lastIntervalHours = getUpdatedIntervalForReview(
      card.lastRating,
      lastRating,
      card.lastIntervalHours
    );

    const nextReview = getNextReviewDate(lastIntervalHours);

    realm.write(() => {
      realm.create(
        "Card",
        {
          _id: cardId,
          lastIntervalHours,
          nextReview,
          lastRating,
          lastReviewed: new Date(),
        },
        "modified"
      );
    });
    scheduleNotification(nextReview);

    return true;
  } catch (error) {
    console.error("Failed to review card:", error);
    return false;
  }
};
