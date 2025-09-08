import Realm from "realm";

//card model
export class Card extends Realm.Object {
  static schema = {
    name: "Card",
    primaryKey: "_id",
    properties: {
      _id: "objectId",
      name: "string",
      frontText: "string",
      frontImg: "string?",
      backText: "string",
      backImg: "string?",
      lastReviewed: "date",
      nextReview: "date",
      lastIntervalHours: "int",
      lastRating: "string",
    },
  };
}

//deck model
export class Deck extends Realm.Object {
  static schema = {
    name: "Deck",
    primaryKey: "_id",
    properties: {
      _id: "objectId",
      name: "string",
      cards: "Card[]", // One to many: Deck → multiple Cards
    },
  };
}
