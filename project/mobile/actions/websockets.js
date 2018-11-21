import { REACT_APP_WS_URL } from "react-native-dotenv";

const baseURL = REACT_APP_WS_URL;

export const wsConnect = (url = baseURL + "/ws/notifications/") => {
  return dispatch => {
    dispatch({
      type: "WEBSOCKET:CONNECT",
      payload: { url }
    });
  };
};
