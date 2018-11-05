import React from "react";
import { Button, Text, View, TouchableOpacity, StyleSheet } from "react-native";

import { Camera, Permissions, CameraRoll, MediaLibrary } from "expo";

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

export default class CameraExample extends React.Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(
      Permissions.CAMERA,
      Permissions.CAMERA_ROLL
    );
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
        .then(res => console.log(res))
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
        </View>
      );
    }
  }
}
