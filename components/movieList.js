import {
  View,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import {
  fallbackMoviePoster,
  image185,
  image342,
  poster342,
} from "../app/api/moviedb";
import { styles } from "../app/theme";
const { width, height } = Dimensions.get("window");
import todoStore from "../app/daemon/mobxToDo";
import { observer } from "mobx-react";

const MovieList = ({ title, hideSeeAll, data }) => {
  console.log("todoStore Movies", todoStore.todoList);

  const navigation = useNavigation();
  return (
    <View style={makeStyle.container}>
      <View style={makeStyle.bodyContainer}>
        <Text style={makeStyle.text}>{title}</Text>
        {!hideSeeAll && (
          <TouchableOpacity>
            <Text
              style={styles.text}
              style={{
                color: "#F5C518",
                fontSize: 18,
              }}
            >
              See All
            </Text>
          </TouchableOpacity>
        )}
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {data.map((item, index) => {
          return (
            <TouchableWithoutFeedback
              key={index}
              onPress={() => navigation.push("Movie", item)}
            >
              <View
                style={{
                  marginBottom: 4,
                  marginRight: 16,
                }}
              >
                <Image
                  // source={require('../assets/images/moviePoster2.png')}
                  source={{
                    uri: image185(item.poster_path) || fallbackMoviePoster,
                  }}
                  style={{
                    width: width * 0.33,
                    height: height * 0.22,
                    borderRadius: 24,
                  }}
                />
                <Text
                  style={{
                    color: "#D1D5DB",
                    fontSize: 14,
                    textAlign: "center",
                    marginVertical: 8,
                  }}
                >
                  {item.title.length > 14
                    ? item.title.slice(0, 14) + "..."
                    : item.title}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          );
        })}
      </ScrollView>
    </View>
  );
};

const makeStyle = StyleSheet.create({
  container: {
    marginBottom: 32,
    marginVertical: 16,
  },
  bodyContainer: {
    marginHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    color: "white",
    fontSize: 18,
  },
  imageContainert: {
    borderRadius: 24,
    width: width * 0.6,
    height: height * 0.4,
  },
});

export default observer(MovieList);
