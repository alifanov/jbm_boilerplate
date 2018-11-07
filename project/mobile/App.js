import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";

import { createStore, applyMiddleware } from "redux";
import { Provider, connect } from "react-redux";
import thunk from "redux-thunk";

import { createBottomTabNavigator } from "react-navigation";
import { Camera, Permissions } from "expo";

import reducer from "./reducers";

import { notificationMiddleware, wsMiddleware } from "./middlewares";

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

const store = createStore(
  reducer,
  applyMiddleware(thunk, wsMiddleware, notificationMiddleware)
);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <RootStack />
      </Provider>
    );
  }
}
