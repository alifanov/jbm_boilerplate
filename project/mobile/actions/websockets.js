export function wsConnect(url = "ws://ec2-176-34-133-231.eu-west-1.compute.amazonaws.com/ws/notifications/") {
  return dispatch => {
    dispatch({


      type: "WEBSOCKET:CONNECT",
      payload: { url }
    });
  };
}
