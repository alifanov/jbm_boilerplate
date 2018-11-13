import React from "react";
import { Camera, Permissions } from "expo";
import { Text, View, TouchableOpacity, StyleSheet, Image } from "react-native";

const styles = StyleSheet.create({
  wrapper: { flex: 1 },
  flipBtn: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
    backgroundColor: "steelblue"
  },
  flipBtnText: {
    color: "white",
    paddingVertical: 10,
    fontWeight: "bold",
    fontSize: 30,
    backgroundColor: "steelblue"
  },
  cameraStyle: {
    flex: 1
  },
  cameraVisibleArea: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row"
  },
  cameraResultWrapper: {
    flex: 1,
    flexDirection: "row"
  },
  cameraResult: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  }
});

export default class CameraScreen extends React.Component {
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
      const baseUrl =
        "http://ec2-34-253-212-186.eu-west-1.compute.amazonaws.com";
      let photo = await this.camera.takePictureAsync();

      let localUri = photo.uri;
      let filename = localUri.split("/").pop();

      let match = /\.(\w+)$/.exec(filename);
      let type = match ? `image/${match[1]}` : `image`;
      let formData = new FormData();
      formData.append("photo", { uri: localUri, name: filename, type });

      try {
        let response = await fetch(`${baseUrl}/vision/upload/img/`, {
          method: "POST",
          body: formData,
          header: {
            "content-type": "multipart/form-data"
          }
        });
        this.setState({
          result: `${baseUrl}/static/my.jpg`
        });
      } catch (e) {
        console.error(e);
      }
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
        <View style={styles.wrapper}>
          {this.state.result ? (
            <View style={styles.cameraResultWrapper}>
              <Image
                style={styles.cameraResult}
                source={{ uri: this.state.result }}
              />
              <TouchableOpacity
                style={styles.flipBtn}
                onPress={() => {
                  this.setState({ result: null });
                }}
              >
                <Text style={styles.flipBtnText}> CLEAR </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <Camera
              style={styles.cameraStyle}
              type={this.state.type}
              autoFocus={false}
              ref={ref => {
                this.camera = ref;
              }}
            >
              <View style={styles.cameraVisibleArea}>
                <TouchableOpacity
                  style={styles.flipBtn}
                  onPress={() => {
                    this.snap();
                  }}
                >
                  <Text style={styles.flipBtnText}> SNAP </Text>
                </TouchableOpacity>
              </View>
            </Camera>
          )}
        </View>
      );
    }
  }
}
