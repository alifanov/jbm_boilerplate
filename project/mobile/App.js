import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { createBottomTabNavigator } from "react-navigation";

import { Camera, Permissions } from "expo";

import {
  inactiveTabColor,
  activeTabColor,
  underlaySecondaryBlue
} from "./colors";

import HomeScreen from "./screens/Home";
import CameraScreen from "./screens/Camera";

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
