export function wsConnect(url = "ws://localhost:8000/ws/posts/") {
  return dispatch => {
    dispatch({
      type: "WEBSOCKET:CONNECT",
      payload: { url }
    });
  };
}
