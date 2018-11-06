import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
  Button,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image
} from "react-native";

import { createBottomTabNavigator } from "react-navigation";

import { Camera, Permissions } from "expo";

import {
  inactiveTabColor,
  activeTabColor,
  primaryWhite,
  primaryBlue,
  lineColor,
  secondaryBlue,
  underlaySecondaryBlue
} from "./colors";

const styles = StyleSheet.create({
  flipBtn: {
    // flex: 0,
    color: "white",
    paddingVertical: 10,
    fontWeight: "bold",
    fontSize: 30,
    backgroundColor: "steelblue"
    // borderRadius: 5
  }
});

class CameraScreen extends React.Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.front,
    result: null
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === "granted" });
  }
  async snap() {
    if (this.camera) {
      let photo = await this.camera.takePictureAsync();

      let localUri = photo.uri;
      let filename = localUri.split("/").pop();

      // Infer the type of the image
      let match = /\.(\w+)$/.exec(filename);
      let type = match ? `image/${match[1]}` : `image`;

      // Upload the image using the fetch and FormData APIs
      let formData = new FormData();
      // Assume "photo" is the name of the form field the server expects
      formData.append("photo", { uri: localUri, name: filename, type });

      fetch("http://192.168.1.38:8000/api/upload/img/", {
        method: "POST",
        body: formData,
        header: {
          "content-type": "multipart/form-data"
        }
      })
        .then(async res => {
          const text = await res.text();
          this.setState({ result: `http://192.168.1.38:8000${text}` });
        })
        .catch(err => console.log(err));

      // const asset = await MediaLibrary.createAssetAsync(photo.uri);
      // const album = await MediaLibrary.getAlbumAsync("Expo");
      // const result = await MediaLibrary.addAssetsToAlbumAsync(
      //   [asset],
      //   album,
      //   false
      // );
    }
  }

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          {this.state.result ? (
            <Image
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                bottom: 0,
                right: 0
              }}
              source={{ uri: this.state.result }}
            />
          ) : (
            <Camera
              style={{ flex: 1 }}
              type={this.state.type}
              ref={ref => {
                this.camera = ref;
              }}
            >
              <View
                style={{
                  flex: 1,
                  backgroundColor: "transparent",
                  flexDirection: "row"
                }}
              >
                <TouchableOpacity
                  style={{
                    flex: 1,
                    alignSelf: "flex-end",
                    alignItems: "center",
                    backgroundColor: "steelblue"
                  }}
                  onPress={() => {
                    this.snap();
                    // this.setState({
                    //   type:
                    //     this.state.type === Camera.Constants.Type.back
                    //       ? Camera.Constants.Type.front
                    //       : Camera.Constants.Type.back
                    // });
                  }}
                >
                  {/*<Button style={styles.flipBtn} title="Flip" />*/}
                  <Text style={styles.flipBtn}> SNAP </Text>
                </TouchableOpacity>
              </View>
            </Camera>
          )}
        </View>
      );
    }
  }
}

const HomeScreen = props => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
        // flexDirection: "column"
      }}
    >
      <Text>Home</Text>
    </View>
  );
};

const RootStack = createBottomTabNavigator(
  {
    Home: {
      screen: HomeScreen
    },
    Camera: {
      screen: CameraScreen
    }
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === "Camera") {
          iconName = "md-camera";
        } else if (routeName === "Home") {
          iconName = "md-home";
        }

        return <Ionicons name={iconName} size={25} color={tintColor} />;
      }
    }),
    tabBarOptions: {
      activeTintColor: activeTabColor,
      inactiveTintColor: inactiveTabColor,
      style: {
        backgroundColor: underlaySecondaryBlue
      }
    },
    tabBarPosition: "bottom",
    animationEnabled: true,
    swipeEnabled: false
  }
);

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}
