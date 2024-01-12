import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../../screens/HomeScreen";
import MovieScreen from "../../screens/MovieScreen";
import PersonScreen from "../../screens/PersonScreen";
import SearchScreen from "../../screens/SearchScreen";
import LoginScreen from "../../screens/LoginScreen";
import { screens } from "../constants";
import TodoScreen from "../../screens/TodoScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name={screens.ToDO}
          options={{ headerShown: false }}
          component={TodoScreen}
        />
        <Stack.Screen
          name={screens.login}
          options={{ headerShown: false }}
          component={LoginScreen}
        />
        <Stack.Screen
          name={screens.home}
          options={{ headerShown: false }}
          component={HomeScreen}
        />
        <Stack.Screen
          name={screens.movie}
          options={{ headerShown: false }}
          component={MovieScreen}
        />
        <Stack.Screen
          name={screens.person}
          options={{ headerShown: false }}
          component={PersonScreen}
        />
        <Stack.Screen
          name={screens.search}
          options={{ headerShown: false }}
          component={SearchScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
