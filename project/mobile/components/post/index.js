import React from "react";
import { View, Text } from "react-native";

const Post = props => {
  return (
    <View
      style={{
        alignSelf: "stretch",
        borderRadius: 5,
        backgroundColor: "gray",
        marginVertical: 10,
        marginHorizontal: 10
      }}
    >
      <View
        style={{
          padding: 5,
          borderBottomColor: "#333",
          borderBottomWidth: 1
        }}
      >
        <Text
          style={{
            color: "#ddd"
          }}
        >
          {props.title}
        </Text>
      </View>
      <View
        style={{
          padding: 5
        }}
      >
        <Text
          style={{
            color: "#ddd"
          }}
        >
          {props.text}
        </Text>
      </View>
    </View>
  );
};

Post.propTypes = {};

export default Post;
