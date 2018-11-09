import React from "react";
import { View, Text, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  wrapper: {
    alignSelf: "stretch",
    borderRadius: 5,
    backgroundColor: "gray",
    marginVertical: 10,
    marginHorizontal: 10
  },
  postTitle: {
    padding: 5,
    borderBottomColor: "#333",
    borderBottomWidth: 1
  },
  postBody: {
    padding: 5
  },
  text: {
    color: "#ddd"
  }
});

const Post = props => {
  return (
    <View
      style={styles.wrapper}
    >
      <View
        style={styles.postTitle}
      >
        <Text
          style={styles.text}
        >
          {props.title}
        </Text>
      </View>
      <View
        style={styles.postBody}
      >
        <Text
          style={styles.text}
        >
          {props.text}
        </Text>
      </View>
    </View>
  );
};

export default Post;
