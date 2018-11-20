const baseURL = "ws://192.168.1.38:8000"; //process.env.REACT_APP_WS_URL

export const wsConnect = (url = baseURL + "/ws/notifications/") => {
  return dispatch => {
    dispatch({
      type: "WEBSOCKET:CONNECT",
      payload: { url }
    });
  };
};
