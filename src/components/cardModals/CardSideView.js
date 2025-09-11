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

export default function CardSideView({
  toggle,
  visible,
  name,
  image,
  text,
  rate,
}) {
  const backgroundSource =
    rate === "hard"
      ? bgHardCard
      : rate === "normal"
      ? bgNormalCard
      : bgEasyCard;

  //set image viewer states
  const [imageViewerVisible, setImageViewerVisible] = useState(false);
  const [viewerImages, setViewerImages] = useState([]);

  //toggle image viewer
  const openViewer = (imgUri1) => {
    setViewerImages([{ uri: "file://" + imgUri1 }]);
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
              rate == "hard"
                ? colors.red
                : rate == "normal"
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
                  rate == "hard"
                    ? colors.red
                    : rate == "normal"
                    ? colors.orange
                    : colors.green,
              },
              styles.name,
            ]}
          >
            {name}
          </SinhalaText>

          <Space height={40} />

          {image && (
            <Pressable onPress={() => openViewer(image)}>
              <Image source={{ uri: "file://" + image }} style={styles.image} />
            </Pressable>
          )}

          <Space />

          <SinhalaText style={styles.text}>{text}</SinhalaText>
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
