import * as React from "react";
import { Text, View, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ReadingScreen from "./screens/ReadingScreen";
import WritingScreen from "./screens/WritingScreen";
import {
  MaterialCommunityIcons,
  FontAwesome5,
  Ionicons,
} from "react-native-vector-icons";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Write a Story"
          component={WritingScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="typewriter"
                color={color}
                size={size}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Read a Story"
          component={ReadingScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <FontAwesome5 name="book-reader" size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
