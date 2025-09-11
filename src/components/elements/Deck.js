import Feather from "@expo/vector-icons/Feather";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Pressable, StyleSheet, Text, Vibration, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  Extrapolate,
  interpolate,
  runOnJS,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";
import colors from "../../constants/colors";
import SinhalaText from "../elements/SinhalaText";

export default function Deck({
  name,
  count,
  openEditSheet,
  onPress,
  openDeleteSheet,
}) {
  //share value for horizontal movement
  const translateX = useSharedValue(0);

  //vibrate alert
  const vibrationAlert = () => {
    Vibration.vibrate(100);
    console.log("Vibrated");
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
        //keep card shifted right
        translateX.value = withTiming(104);

        //vibration alert
        runOnJS(vibrationAlert)();
      } else if (translateX.value < -100) {
        //keep card shifted left
        translateX.value = withTiming(-104);

        //vibration alert
        runOnJS(vibrationAlert)();
      } else {
        //animate the card back to its original position
        translateX.value = withTiming(0);
      }
    });

  //if user doesn't do anything card replace
  useAnimatedReaction(
    () => translateX.value,
    (current, previous) => {
      if (
        (current === -104 && previous !== -104) ||
        (current === 104 && previous !== 104)
      ) {
        //reset after 3 seconds using withDelay
        translateX.value = withDelay(1000, withTiming(0));
      }
    }
  );

  //animate card movement
  const animatedCard = useAnimatedStyle(() => ({
    //move the card horizontally
    transform: [{ translateX: translateX.value }],
  }));

  //animate edit button
  const animatedEditBtn = useAnimatedStyle(() => {
    //fade in when card swip left
    const opacity = interpolate(
      translateX.value,
      [0, -100], //input range
      [0, 1], //output range (0 → invisible, 1 → fully visible)
      Extrapolate.CLAMP
    );

    //increase scale when card swip left
    const scale = interpolate(
      translateX.value,
      [0, -100],
      [0.5, 0.8], //start smaller (0.8) → grow to normal (1)
      Extrapolate.CLAMP
    );

    return {
      opacity,
      transform: [{ scale }],
    };
  });

  //animate delete button
  const animatedDeleteBtn = useAnimatedStyle(() => {
    //fade in when card swip left
    const opacity = interpolate(
      translateX.value,
      [0, 100], //input range
      [0, 1], //output range (0 → invisible, 1 → fully visible)
      Extrapolate.CLAMP
    );

    //increase scale when card swip left
    const scale = interpolate(
      translateX.value,
      [0, 100],
      [0.5, 0.8], //start smaller (0.8) → grow to normal (1)
      Extrapolate.CLAMP
    );

    return {
      opacity,
      transform: [{ scale }],
    };
  });

  return (
    <View>
      {/* deck card */}
      <GestureDetector gesture={panGesture}>
        <Animated.View style={[styles.deckWrapper, animatedCard]}>
          <Pressable
            style={[
              {
                borderColor:
                  count <= 10
                    ? colors.green
                    : count <= 20
                    ? colors.orange
                    : colors.red,
              },
              styles.deck,
            ]}
            android_ripple={{
              color: "#E5E7FF",
              borderless: false,
            }}
            onPress={onPress}
          >
            <View
              style={[
                {
                  backgroundColor:
                    count <= 10
                      ? colors.green
                      : count <= 20
                      ? colors.orange
                      : colors.red,
                },
                styles.colorLbl,
              ]}
            />
            <View style={styles.info}>
              <SinhalaText
                style={[
                  {
                    color:
                      count <= 10
                        ? colors.green
                        : count <= 20
                        ? colors.orange
                        : colors.red,
                  },
                  styles.name,
                ]}
              >
                {name}
              </SinhalaText>
              <Text style={styles.count}>Cards {count}</Text>
            </View>
            <Feather
              name="arrow-up-right"
              size={24}
              color={
                count <= 10
                  ? colors.green
                  : count <= 20
                  ? colors.orange
                  : colors.red
              }
            />
          </Pressable>
        </Animated.View>
      </GestureDetector>

      {/* edit button */}
      <Pressable
        onPress={() => {
          translateX.value = withTiming(0);
          openEditSheet();
        }}
        style={{
          position: "absolute",
          right: 0,
          width: 80,
          height: 80,
        }}
      >
        <Animated.View style={[styles.editBtn, animatedEditBtn]}>
          <MaterialCommunityIcons
            name="square-edit-outline"
            size={40}
            color={colors.white}
          />
        </Animated.View>
      </Pressable>

      {/* delete button */}
      <Pressable
        onPress={() => {
          translateX.value = withTiming(0);
          openDeleteSheet();
        }}
        style={{ position: "absolute", left: 0, width: 80, height: 80 }}
      >
        <Animated.View style={[styles.deleteBtn, animatedDeleteBtn]}>
          <MaterialCommunityIcons
            name="delete-empty-outline"
            size={40}
            color={colors.white}
          />
        </Animated.View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  deckWrapper: {
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 16,
    elevation: 4,
    zIndex: 1,
  },
  deck: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: 16,
    backgroundColor: colors.white,
    width: "100%",
    height: 80,
    borderTopWidth: 2,
    borderRightWidth: 2,
    borderBottomWidth: 2,
    borderRadius: 16,
  },
  info: {
    flex: 1,
    marginLeft: 16,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
  },
  count: { fontSize: 14, fontWeight: "bold", color: "rgba(0,0,0,0.5)" },
  colorLbl: {
    width: 16,
    height: "100%",
  },
  editBtn: {
    width: 80,
    height: 80,
    backgroundColor: colors.green,
    position: "absolute",
    right: 0,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
  },
  deleteBtn: {
    width: 80,
    height: 80,
    backgroundColor: colors.red,
    position: "absolute",
    left: 0,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
  },
});
