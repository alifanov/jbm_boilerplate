import React from "react";
import { Camera, Permissions } from "expo";
import { Text, View, TouchableOpacity, StyleSheet, Image } from "react-native";

const styles = StyleSheet.create({
  flipBtn: {
    color: "white",
    paddingVertical: 10,
    fontWeight: "bold",
    fontSize: 30,
    backgroundColor: "steelblue"
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
      let photo = await this.camera.takePictureAsync();

      let localUri = photo.uri;
      let filename = localUri.split("/").pop();

      let match = /\.(\w+)$/.exec(filename);
      let type = match ? `image/${match[1]}` : `image`;
      let formData = new FormData();
      formData.append("photo", { uri: localUri, name: filename, type });

      global._fetch = fetch; // for debug

      global.fetch = function(uri, options, ...args) {
        return global._fetch(uri, options, ...args).then(response => {
          console.log("Fetch", {
            request: { uri, options, ...args },
            response
          });
          return response;
        });
      };

      fetch("http://192.168.1.38:8000/vision/upload/img/", {
        method: "POST",
        body: formData,
        header: {
          "content-type": "multipart/form-data"
        }
      })
        .then(async _ => {
          this.setState({
            result: "http://192.168.1.38:8000/static/my.jpg"
          });
          global.fetch = global._fetch;
        })
        .catch(err => console.log(err));
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
