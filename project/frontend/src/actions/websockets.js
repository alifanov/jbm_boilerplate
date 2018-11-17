const baseUrl = process.env.REACT_APP_WS_URL + "/ws/notifications/";
export const wsConnect = (url = baseUrl) => ({
  type: "WEBSOCKET:CONNECT",
  payload: { url }
});
