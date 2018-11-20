import { View, StyleSheet } from "react-native";

import { AppLoading } from "expo";

import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { getPosts } from "./../../actions";
import { wsConnect } from "./../../actions/websockets";

import Post from "../../components/Post";

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start"
  }
});

class HomeScreen extends Component {
  componentDidMount() {
    this.props.wsConnect();
    this.props.getPosts();
  }

  render() {
    return this.props.posts.length === 0 ? (
      <AppLoading onFinish={() => null} onError={console.error} />
    ) : (
      <View style={styles.wrapper}>
        {this.props.posts.map((p, i) => (
          <Post key={i} {...p} />
        ))}
      </View>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getPosts,
      wsConnect
    },
    dispatch
  );

const mapStateToProps = state => ({
  posts: state.posts
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);
