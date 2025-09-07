import Realm from "realm";

//create new card
export const createCard = (realm, data) => {
  try {
    realm.write(() => {
      realm.create("Card", {
        _id: new Realm.BSON.ObjectId(), //generate unique card id
        lastReviewed: new Date(),
        nextReview: new Date(),
        lastIntervalHours: 0,
        lastRating: data.rating,

        ...data,
      });
    });
    return true;
  } catch (error) {
    console.error("Failed to create card:", error);
    return false;
  }
};
