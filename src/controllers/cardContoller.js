import Realm from "realm";

//create new card
export const createCard = (realm, data) => {
  try {
    realm.write(() => {
      realm.create("Card", {
        _id: new Realm.BSON.ObjectId(), //generate unique card id
        ...data,
      });
    });
    return true;
  } catch (error) {
    console.error("Failed to create card:", error);
    return false;
  }
};

//get all cards
export const getAllCards = (realm) => {
  try {
    const cards = realm.objects("Card");

    return Array.from(cards); //return it as array
  } catch (error) {
    console.error("Failed to get cards:", error);
    return [];
  }
};
