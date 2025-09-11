import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useState } from "react";
import {
  Dimensions,
  Image,
  ImageBackground,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
} from "react-native";
import ImageViewing from "react-native-image-viewing";
import bgEasyCard from "../../../assets/images/bgEasyCard.png";
import bgHardCard from "../../../assets/images/bgHardCard.png";
import bgNormalCard from "../../../assets/images/bgNormalCard.png";
import colors from "../../constants/colors";
import SinhalaText from "../elements/SinhalaText";
import Space from "../elements/Space";

const { width } = Dimensions.get("window");

export default function CardView({ toggle, visible, item }) {
  if (!item) return null;

  const backgroundSource =
    item.lastRating === "hard"
      ? bgHardCard
      : item.lastRating === "normal"
      ? bgNormalCard
      : bgEasyCard;

  //set image viewer states
  const [imageViewerVisible, setImageViewerVisible] = useState(false);
  const [viewerImages, setViewerImages] = useState([]);

  //toggle image viewer
  const openViewer = (imgUri1, imgUri2) => {
    setViewerImages([
      { uri: "file://" + imgUri1 },
      { uri: "file://" + imgUri2 },
    ]);
    setImageViewerVisible(true);
  };

  return (
    <Modal transparent visible={visible} animationType="slide">
      <ImageBackground
        source={backgroundSource}
        resizeMode="cover"
        style={styles.background}
      >
        {/* close icon */}
        <Pressable style={styles.closeIcon} onPress={toggle}>
          <MaterialCommunityIcons
            name="close-box"
            size={56}
            color={
              item.lastRating == "hard"
                ? colors.red
                : item.lastRating == "normal"
                ? colors.orange
                : colors.green
            }
          />
        </Pressable>

        <Space height={40} />

        {/* card info */}
        <ScrollView style={styles.info}>
          <SinhalaText
            style={[
              {
                color:
                  item.lastRating == "hard"
                    ? colors.red
                    : item.lastRating == "normal"
                    ? colors.orange
                    : colors.green,
              },
              styles.name,
            ]}
          >
            {item.name}
          </SinhalaText>

          <Space height={40} />

          {item.frontImg && (
            <Pressable onPress={() => openViewer(item.frontImg, item.backImg)}>
              <Image
                source={{ uri: "file://" + item.frontImg }}
                style={styles.image}
              />
            </Pressable>
          )}

          <Space />

          <SinhalaText style={styles.text}>{item.frontText}</SinhalaText>

          <Space height={40} />

          {item.backImg && (
            <Pressable onPress={() => openViewer(item.backImg, item.frontImg)}>
              <Image
                source={{ uri: "file://" + item.backImg }}
                style={styles.image}
              />
            </Pressable>
          )}

          <Space />

          <SinhalaText style={styles.text}>{item.backText}</SinhalaText>
        </ScrollView>

        {/* fullscreen image viewer */}
        <ImageViewing
          images={viewerImages}
          imageIndex={0}
          visible={imageViewerVisible}
          onRequestClose={() => setImageViewerVisible(false)}
        />
      </ImageBackground>
    </Modal>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  closeIcon: {
    position: "absolute",
    right: 8,
    top: 8,
  },
  info: {
    width: "100%",
    flex: 1,
  },
  name: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
  },
  image: {
    width: width,
    height: width,
    aspectRatio: 1,
  },
  text: {
    fontSize: 16,
    color: colors.darkBlue,
    fontWeight: "bold",
    textAlign: "justify",
  },
});
