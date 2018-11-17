export const wsConnect = (url = "ws://localhost:8000/ws/notifications/") => ({
  type: "WEBSOCKET:CONNECT",
  payload: { url }
});
