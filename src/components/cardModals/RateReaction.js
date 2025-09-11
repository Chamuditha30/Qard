import { useEffect, useState } from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";
import easyAnimeEmo from "../../../assets/images/easyAnimeEmo.gif";
import easyStaticEmo from "../../../assets/images/easyStaticEmo.png";
import hardAnimeEmo from "../../../assets/images/hardAnimeEmo.gif";
import hardStaticEmo from "../../../assets/images/hardStaticEmo.png";
import normalAnimeEmo from "../../../assets/images/normalAnimeEmo.gif";
import normalStaticEmo from "../../../assets/images/normalStaticEmo.png";
import colors from "../../constants/colors";

export default function RateReaction({ lastRating, rateHandler }) {
  //initialize rates visibility
  const [isRatesVisible, setIsRatesVisible] = useState(false);

  //hide rate selector automatically after 2 seconds
  useEffect(() => {
    let timer;
    if (isRatesVisible) {
      timer = setTimeout(() => setIsRatesVisible(false), 2000);
    }
    return () => clearTimeout(timer);
  }, [isRatesVisible]);

  //rates visibility handler
  const visibilityHandler = () => {
    setIsRatesVisible((prev) => !prev);
  };

  return (
    <View style={styles.rateContainer}>
      {/* rate reactions */}
      {isRatesVisible && (
        <View style={styles.rateSelector}>
          <Pressable
            style={[
              {
                backgroundColor:
                  lastRating === "hard" ? colors.bgBlue : colors.white,
              },
              styles.selectedEmoji,
            ]}
            onPress={() => {
              rateHandler("hard");
              visibilityHandler();
            }}
            pointerEvents="auto"
          >
            <Image source={hardAnimeEmo} style={styles.emoji} />
          </Pressable>

          <Pressable
            style={[
              {
                backgroundColor:
                  lastRating === "normal" ? colors.darkGray : colors.white,
              },
              styles.selectedEmoji,
            ]}
            onPress={() => {
              rateHandler("normal");
              visibilityHandler();
            }}
          >
            <Image source={normalAnimeEmo} style={styles.emoji} />
          </Pressable>

          <Pressable
            style={[
              {
                backgroundColor:
                  lastRating === "easy" ? colors.darkGray : colors.white,
              },
              styles.selectedEmoji,
            ]}
            onPress={() => {
              rateHandler("easy");
              visibilityHandler();
            }}
          >
            <Image source={easyAnimeEmo} style={styles.emoji} />
          </Pressable>
        </View>
      )}

      {/* rate react button */}
      <Pressable style={styles.rateBtn} onLongPress={visibilityHandler}>
        <Image
          source={
            lastRating === "hard"
              ? hardStaticEmo
              : lastRating === "normal"
              ? normalStaticEmo
              : easyStaticEmo
          }
          style={styles.emoji}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  rateContainer: {
    position: "absolute",
    right: 40,
    bottom: -20,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    zIndex: 5,
  },
  rateBtn: {
    backgroundColor: colors.white,
    width: 48,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    elevation: 8,
  },
  rateSelector: {
    backgroundColor: colors.white,
    // width: 80,
    height: 48,
    marginBottom: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8,
    // paddingHorizontal: 8,
    borderRadius: 100,
    overflow: "hidden",
  },
  emoji: {
    width: 40,
    height: 40,
  },
  selectedEmoji: {
    borderRadius: 100,
    padding: 8,
  },
});
