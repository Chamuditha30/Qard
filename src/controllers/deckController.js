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
