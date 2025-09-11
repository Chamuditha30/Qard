import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRealm } from "@realm/react";
import { useCallback, useState } from "react";
import {
  Dimensions,
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import bgEasyCard from "../../../assets/images/bgEasyCard.png";
import bgHardCard from "../../../assets/images/bgHardCard.png";
import bgNormalCard from "../../../assets/images/bgNormalCard.png";
import colors from "../../constants/colors";
import { reviewCard } from "../../controllers/cardContoller";
import SinhalaText from "../elements/SinhalaText";
import Space from "../elements/Space";
import CardSideView from "./CardSideView";
import RateReaction from "./RateReaction";

const { width, height } = Dimensions.get("window");

export default function FlashCard({ item, style }) {
  //initialize use realm
  const realm = useRealm();

  //track card state front or back
  const [isFront, setIsFront] = useState(true);

  //side card view state
  const [isCardSideViewVisible, setIsCardSideViewVisible] = useState(false);

  //side view card toggle
  const toggleSideCardView = useCallback(() => {
    setIsCardSideViewVisible((prev) => !prev);
  }, []);

  //initialize card rotation
  const rotation = useSharedValue(0);

  //flip card
  const flipCard = () => {
    rotation.value = withTiming(rotation.value === 0 ? 180 : 0);
    setIsFront((prev) => !prev);
  };

  //card back flip animation
  const flipBackAnimation = useAnimatedStyle(() => {
    return {
      transform: [{ perspective: 1000 }, { rotateY: `${rotation.value}deg` }],
    };
  });

  //card front flip animation
  const flipFrontAnimation = useAnimatedStyle(() => {
    return {
      transform: [
        { perspective: 1000 },
        { rotateY: `${rotation.value + 180}deg` },
      ],
    };
  });

  //initialize share value for horizontal movement
  const translateX = useSharedValue(0);

  //get updated rate
  const [lastRating, setLastRating] = useState(item.lastRating);

  //rate handler
  const rateHandler = (rate) => {
    console.log("User selected:", rate);
    setLastRating(rate);
  };

  //remove card
  const removeCard = () => {
    reviewCard(realm, item._id, lastRating);
    console.log("Card removed and updated");
  };

  //define pan gesture for swipe
  const panGesture = Gesture.Pan()
    .onUpdate((e) => {
      translateX.value = e.translationX;
    })
    .onEnd(() => {
      if (translateX.value > 120 || translateX.value < -120) {
        // Animate out of screen
        translateX.value = withTiming(
          translateX.value > 0 ? 1000 : -1000,
          {},
          () => {
            // Remove the card from state after animation completes
            runOnJS(removeCard)();
          }
        );
      } else {
        // Animate back to center if threshold not reached
        translateX.value = withTiming(0);
      }
    });

  //animate card movement
  const cardSwipeAnimation = useAnimatedStyle(() => ({
    //move the card horizontally
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View style={[style, cardSwipeAnimation]}>
        {/* front side */}
        <Animated.View
          style={[styles.card, flipBackAnimation]}
          pointerEvents={isFront ? "auto" : "none"}
        >
          <View style={styles.wrapper}>
            <ImageBackground
              source={
                lastRating === "hard"
                  ? bgHardCard
                  : lastRating === "normal"
                  ? bgNormalCard
                  : bgEasyCard
              }
              style={styles.bg}
            >
              <Pressable onPress={flipCard}>
                <SinhalaText
                  style={[
                    {
                      color:
                        item.lastRating === "hard"
                          ? colors.red
                          : item.lastRating === "normal"
                          ? colors.orange
                          : colors.green,
                    },
                    styles.name,
                  ]}
                >
                  {item.name}
                </SinhalaText>

                <Space height={40} />

                <Image
                  source={{
                    uri: "file://" + item.frontImg,
                  }}
                  style={[
                    { display: item.frontImg ? "flex" : "none" },
                    styles.image,
                  ]}
                />

                <Space />

                <SinhalaText style={styles.text}>
                  {item.frontText &&
                    item.frontText
                      .split("")
                      .slice(0, item.frontImg ? 180 : 640)
                      .join("") +
                      (item.frontText.length > (item.frontImg ? 180 : 640)
                        ? "..."
                        : "")}
                </SinhalaText>

                <Space />
              </Pressable>
              <Pressable
                onPress={(e) => {
                  e.stopPropagation();
                  toggleSideCardView();
                }}
                style={styles.expandIcon}
              >
                <MaterialIcons
                  name="expand-circle-down"
                  size={40}
                  color={
                    lastRating === "hard"
                      ? colors.red
                      : lastRating === "normal"
                      ? colors.orange
                      : colors.green
                  }
                />
              </Pressable>
            </ImageBackground>
          </View>
          {/* rate reaction */}
          <RateReaction lastRating={lastRating} rateHandler={rateHandler} />
        </Animated.View>

        {/* back side */}
        <Animated.View
          style={[styles.card, styles.backCard, flipFrontAnimation]}
          pointerEvents={!isFront ? "auto" : "none"}
        >
          <View style={styles.wrapper}>
            <ImageBackground
              source={
                lastRating === "hard"
                  ? bgHardCard
                  : lastRating === "normal"
                  ? bgNormalCard
                  : bgEasyCard
              }
              style={styles.bg}
            >
              <Pressable onPress={flipCard}>
                <SinhalaText
                  style={[
                    {
                      color:
                        lastRating === "hard"
                          ? colors.red
                          : lastRating === "normal"
                          ? colors.orange
                          : colors.green,
                    },
                    styles.name,
                  ]}
                >
                  {item.name}
                </SinhalaText>

                <Space height={40} />

                <Image
                  source={{
                    uri: "file://" + item.backImg,
                  }}
                  style={[
                    { display: item.backImg ? "flex" : "none" },
                    styles.image,
                  ]}
                />

                <Space />

                <SinhalaText style={styles.text}>
                  {item.backText &&
                    item.backText
                      .split("")
                      .slice(0, item.backImg ? 180 : 640)
                      .join("") +
                      (item.frontText.length > (item.backImg ? 180 : 640)
                        ? "..."
                        : "")}
                </SinhalaText>

                <Space />
              </Pressable>

              <Pressable
                onPress={(e) => {
                  e.stopPropagation();
                  toggleSideCardView();
                }}
                style={styles.expandIcon}
              >
                <MaterialIcons
                  name="expand-circle-down"
                  size={40}
                  color={
                    lastRating === "hard"
                      ? colors.red
                      : lastRating === "normal"
                      ? colors.orange
                      : colors.green
                  }
                />
              </Pressable>
            </ImageBackground>
          </View>
          {/* rate reaction */}
          <RateReaction lastRating={lastRating} rateHandler={rateHandler} />
        </Animated.View>

        {/* card side view */}
        {isCardSideViewVisible && (
          <CardSideView
            name={item.name}
            image={isFront ? item.frontImg : item.backImg}
            text={isFront ? item.frontText : item.backText}
            rate={lastRating}
            toggle={toggleSideCardView}
            visible={isCardSideViewVisible}
          />
        )}
      </Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  card: { backfaceVisibility: "hidden" },
  wrapper: { overflow: "hidden", borderRadius: 16 },
  backCard: {
    position: "absolute",
  },
  bg: {
    width: width * 0.9,
    height: height * 0.7,
    padding: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  image: {
    width: "100%",
    aspectRatio: 1,
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "justify",
    color: colors.darkBlue,
    height: "100%",
  },
  expandIcon: {
    position: "absolute",
    bottom: 16,
    left: (width * 0.8) / 2,
  },
});
