import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  Dimensions,
  StyleSheet,
  Button,
} from "react-native";
import React, { useState } from "react";
import Carousel from "react-native-snap-carousel";
import { useNavigation } from "@react-navigation/native";
import { image500 } from "../app/api/moviedb";

var { width, height } = Dimensions.get("window");
import todoStore from "../app/daemon/mobxToDo";

const TrendingMovies = ({ data }) => {
  const navigation = useNavigation();
  const [newTodo, setNewTodo] = useState("");

  const handleAddTodo = () => {
    setNewTodo(`ahmed`);

    if (newTodo.trim() !== "") {
      todoStore.addTodo({ id: Date.now(), text: newTodo });
      setNewTodo("");
    }
  };

  const handleRemoveTodo = (todoId) => {
    todoStore.removeTodo(todoId);
  };

  const handleClick = (item) => {
    navigation.navigate("Movie", item);
  };
  return (
    <View className="mb-8">
      <Text style={makeStyle.text}>Trending</Text>
      <Button style={{}} title="Add Todo" onPress={handleAddTodo} />
      <Carousel
        data={data}
        renderItem={({ item }) => (
          <MovieCard handleClick={handleClick} item={item} />
        )}
        firstItem={1}
        loop={true}
        autoplay={true}
        inactiveSlideOpacity={0.6}
        sliderWidth={width}
        itemWidth={width * 0.62}
        slideStyle={{ display: "flex", alignItems: "center" }}
      />
    </View>
  );
};

const MovieCard = ({ item, handleClick }) => {
  return (
    <TouchableWithoutFeedback onPress={() => handleClick(item)}>
      <Image
        style={makeStyle.Image}
        // source={require('../assets/images/moviePoster1.png')}
        source={{ uri: image500(item.poster_path) }}
      />
    </TouchableWithoutFeedback>
  );
};

const makeStyle = StyleSheet.create({
  text: {
    color: "white",
    fontSize: 20,
    marginHorizontal: 16,
    marginBottom: 20,
  },
  Image: {
    borderRadius: 24,
    width: width * 0.6,
    height: height * 0.4,
  },
});

export default TrendingMovies;
