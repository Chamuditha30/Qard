import Realm from "realm";

//card model
class Card extends Realm.Object {
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
class Deck extends Realm.Object {
  static schema = {
    name: "Deck",
    primaryKey: "_id",
    properties: {
      _id: "objectId",
      name: "string",
      cards: { type: "list", objectType: "Card" },
    },
  };
}

export { Card, Deck };
