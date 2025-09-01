import Ionicons from "@expo/vector-icons/Ionicons";
import { Dimensions, StyleSheet, TextInput, View } from "react-native";
import colors from "../../src/constants/colors";

export default function SearchBox({ value, onChangeText, clearSearchbar }) {
  return (
    <View style={styles.searchBox}>
      <TextInput
        placeholder="Search"
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
      />
      <Ionicons
        name={value ? "close-circle" : "search"}
        size={24}
        color="#A9A9A9"
        style={styles.searchIcon}
        onPress={clearSearchbar}
      />
    </View>
  );
}

const screenWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  searchBox: {
    backgroundColor: colors.white,
    width: screenWidth * 0.6,
    borderRadius: 100,
    flexDirection: "row",
    alignItems: "center",
    elevation: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    marginLeft: 8,
  },
  searchIcon: {
    marginRight: 8,
  },
});

// const [query, setQuery] = useState("");
// const handleQueryInput = (text) => {
//     setQuery(text)
// }
// <SearchBox
//   value={query}
//   onChangeText={handleQueryInput}
// />;
