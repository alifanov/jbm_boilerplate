export function wsConnect(url = "ws://192.168.1.38:8000/ws/notifications/") {
  return dispatch => {
    dispatch({
      type: "WEBSOCKET:CONNECT",
      payload: { url }
    });
  };
}
