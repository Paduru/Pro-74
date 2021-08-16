import React, { useState } from "react";
import {
  View,
  TextInput,
  Image,
  Alert,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
  ToastAndroid,
} from "react-native";
import { Header } from "react-native-elements";
import db from "../config";
import firebase from "firebase";

export default function WritingScreen() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [story, setStory] = useState("");

  const sumbitStory = () => {
    db.collection("storys")
      .add({
        story_author: author,
        story_title: title,
        story_text: story,
      })
      .then(() => {
        console.log("story added to database.");
        Alert.alert("Book has been issued");
      })
      .catch((error) => {
        console.log("error while adding story to database", error);
      })
      .finally(() => {
        setTitle("");
        setAuthor("");
        setStory("");
        ToastAndroid.show("Story Published", ToastAndroid.SHORT);
      });
  };

  return (
    <KeyboardAvoidingView>
      <Header
        backgroundColor="black"
        centerComponent={{
          text: "Write a Story",
          style: { color: "white", fontSize: 25 },
        }}
      />
      <View style={{ alignItems: "center" }}>
        <TextInput
          placeholder="Title of story"
          style={{ width: 300, fontSize: 15, borderWidth: 2, marginTop: 10 }}
          onChangeText={(text) => {
            setTitle(text);
          }}
          value={title}
        />
        <TextInput
          placeholder="Author of story"
          style={{ width: 300, fontSize: 15, borderWidth: 2, marginTop: 10 }}
          onChangeText={(text) => {
            setAuthor(text);
          }}
          value={author}
        />
        <TextInput
          placeholder="Write the story"
          multiline={true}
          style={{
            width: 300,
            fontSize: 15,
            borderWidth: 2,
            height: 350,
            marginTop: 10,
          }}
          onChangeText={(text) => {
            setStory(text);
          }}
          value={story}
        />
        <TouchableOpacity
          onPress={() => {
            sumbitStory();
          }}
          style={{
            backgroundColor: "red",
            marginTop: 15,
            alignItems: "center",
            flex: 1,
            justifyContent: "center",
            padding: 10,
          }}
        >
          <Text style={{ fontSize: 25 }}> Sumbit </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
