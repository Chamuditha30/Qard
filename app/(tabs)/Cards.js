import { useQuery } from "@realm/react";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import FlashCard from "../../src/components/cardModals/FlashCard";
import Progressbar from "../../src/components/cardModals/Progressbar";
import Background from "../../src/components/elements/Background";
import { Card } from "../../src/models/models";

export default function Cards() {
  //get now date
  const now = new Date();
  //get all cards for review
  const cards = useQuery(Card).filtered("nextReview <= $0", now);

  //set initial card counts
  const [initialCardCount, setInitialCardCount] = useState(cards.length);

  useEffect(() => {
    setInitialCardCount(cards.length);
  }, []);

  //calculate progress
  const reviewedCount = initialCardCount - cards.length + 1;
  const progress = reviewedCount / initialCardCount;

  return (
    <Background screen={"cards"} haveCards={cards.length > 0}>
      <View style={styles.container}>
        {/* display all cards */}
        {cards.map((item, index) => (
          <FlashCard
            key={item._id}
            item={item}
            style={{
              position: "absolute",
              zIndex: cards.length - index,
            }}
          />
        ))}
      </View>

      {/* progressbar */}
      {cards.length > 0 && <Progressbar progress={progress} />}
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
});
