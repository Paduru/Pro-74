import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  StyleSheet,
} from "react-native";
import { Header } from "react-native-elements";
import db from "../config";
import * as firebase from "firebase";

export default function ReadingScreen() {
  const [searchText, setSearchText] = useState("");
  const [allStories, setAllStories] = useState([]);

  useEffect(() => {
    getAllStories();
  }, []);

  const getAllStories = async () => {
    var stories = [];
    db.collection("storys")
      .limit(10)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          stories.push(doc.data());
          setAllStories(stories);
        });
      })
      .catch((error) => {
        console.log("error while getting stories", error);
      });
  };

  const handleSearch = () => {
    setAllStories("");
    var stories = [];
    db.collection("storys")
      .where("story_title", "==", searchText)
      .limit(10)
      .get()
      .then((snapShot) => {
        snapShot.forEach((doc) => {
          stories.push(doc.data());
          setAllStories(stories);
        });
      })
      .catch((error) => {
        console.log("error while getting transaction of the book", error);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.upperContainer}>
        <Header
          style={{ borderWidth: 5, margin: 5 }}
          backgroundColor="white"
          centerComponent={{
            text: "Read a Story",
            style: { fontSize: 25 },
          }}
        />
        <View style={styles.textInputContainer}>
          <TextInput
            placeholder="type here"
            placeholderTextColor="#DDDDDD"
            onChangeText={(text) => {
              setSearchText(text);
            }}
            style={styles.textInput}
          />
          <TouchableOpacity
            style={styles.searchButton}
            onPress={() => {
              handleSearch();
            }}
          >
            <Text style={styles.searchButtonText}>Search</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.lowerContainer}>
        <FlatList
          data={allStories}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={{ borderBottomWidth: 2, padding: 5 }}>
              <Text style={{ fontSize: 24 }}>
                {"Title: " + item.story_title}
              </Text>
              <Text style={{ fontSize: 18 }}>
                {"Author: " + item.story_author}
              </Text>
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0000" },
  upperContainer: {
    flex: 0.2,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  lowerContainer: { flex: 0.8, backgroundColor: "pink" },
  textInputContainer: {
    borderWidth: 2,
    borderRadius: 10,
    flexDirection: "row",
    backgroundColor: "#222222",
    borderColor: "#555555",
  },
  textInput: {
    width: "60%",
    height: 50,
    padding: 10,
    borderColor: "#FFFFFF",
    borderRadius: 10,
    borderWidth: 2,
    fontSize: 18,
    backgroundColor: "#555555",
    color: "#FFFFFF",
  },
  searchButton: {
    width: 100,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  searchButtonText: {
    fontSize: 24,
    color: "#DDDDDD",
    fontFamily: "Rajdhani_600SemiBold",
  },
});
