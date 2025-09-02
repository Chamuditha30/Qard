import Feather from "@expo/vector-icons/Feather";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import colors from "../../src/constants/colors";

export default function Deck({ name, count = 10 }) {
  //share value for horizontal movement
  const translateX = useSharedValue(0);

  const onSwipeRight = () => {
    console.log("Swiped Right");
  };

  const onSwipeLeft = () => {
    console.log("Swiped Left");
  };

  //define pan gesture for swipe
  const panGesture = Gesture.Pan()
    .activeOffsetX([-64, 64]) //swipe only triggers if user moves > 10px horizontally
    .onUpdate((e) => {
      //update translateX value if user drag card horizontally
      const maxSwipe = 136; //max distance card can move
      if (e.translationX > maxSwipe) translateX.value = maxSwipe;
      else if (e.translationX < -maxSwipe) translateX.value = -maxSwipe;
      else translateX.value = e.translationX;
    })
    .onEnd(() => {
      //call when user release the swip
      if (translateX.value > 100) {
        //if swiped right more than 100 pixels trigger right function
        runOnJS(onSwipeRight)();
      } else if (translateX.value < -100) {
        //if swiped left more than 100 pixels trigger left function
        runOnJS(onSwipeLeft)();
      }
      //animate the card back to its original position
      translateX.value = withSpring(0);
    });

  //animate card movement
  const animatedStyle = useAnimatedStyle(() => ({
    //move the card horizontally
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View style={[styles.deckWrapper, animatedStyle]}>
        <Pressable
          style={styles.deck}
          android_ripple={{
            color: "#E5E7FF",
            borderless: false,
          }}
        >
          <View>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.count}>Cards {count}</Text>
          </View>
          <Feather name="arrow-up-right" size={24} color={colors.lightBlue} />
        </Pressable>
      </Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  deckWrapper: {
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 16,
    elevation: 4,
  },
  deck: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: colors.white,
    width: "100%",
    borderWidth: 4,
    borderColor: colors.lightBlue,
    borderRadius: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.lightBlue,
  },
  count: { fontSize: 16, fontWeight: "bold", color: colors.darkGray },
});
