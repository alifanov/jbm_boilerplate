export const wsConnect = (
  url = ProcessingInstruction.env.REACT_APP_WS_URL + "/ws/notifications/"
) => {
  return dispatch => {
    dispatch({
      type: "WEBSOCKET:CONNECT",
      payload: { url }
    });
  };
};
