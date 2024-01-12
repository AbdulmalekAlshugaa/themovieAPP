import { View, Text, SafeAreaView, FlatList } from "react-native";
import React, { useState } from "react";
import { Button } from "react-native";
import todoStore from "../app/daemon/mobxToDo";
import { observer } from "mobx-react";
import { TouchableOpacity } from "react-native-gesture-handler";

const TodoScreen = () => {
  const [newTodo, setNewTodo] = useState("");

  const handleAddTodo = () => {
    setNewTodo(`ahmed`);

    if (newTodo.trim() !== "") {
      todoStore.addTodo({ id: Date.now(), text: newTodo });
      setNewTodo("");
    }
  };

  return (
    <SafeAreaView>
      <Text>To Do List</Text>
      <Button style={{}} title="Add Todo" onPress={handleAddTodo} />
      <FlatList
        data={todoStore.todoList}
        renderItem={({ item, index, separators }) => (
          <TouchableOpacity key={index} onPress={() => console.log(item)}>
            <View style={{ backgroundColor: "white" }}>
              <Text>{item.text}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

export default observer(TodoScreen);
