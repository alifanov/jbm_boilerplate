import { isRSAA, apiMiddleware } from "redux-api-middleware";
import { TOKEN_RECEIVED, refreshAccessToken } from "./actions/auth";
import { refreshToken, isAccessTokenExpired } from "./reducers";

import { actions as notifActions } from "redux-notifications";
const { notifSend } = notifActions;

let websocket;

export const wsMiddleware = store => next => action => {
  switch (action.type) {
    // User request to connect
    case "WEBSOCKET:CONNECT":
      // Configure the object
      websocket = new WebSocket(action.payload.url);

      // Attach the callbacks
      websocket.onopen = () => store.dispatch({ type: "WEBSOCKET:OPEN" });
      websocket.onclose = event =>
        store.dispatch({ type: "WEBSOCKET:CLOSE", payload: event });
      websocket.onmessage = event =>
        store.dispatch({ type: "WEBSOCKET:MESSAGE", payload: event });

      break;

    // User request to send a message
    case "WEBSOCKET:SEND":
      websocket.send(JSON.stringify(action.payload));
      break;

    // User request to disconnect
    case "WEBSOCKET:DISCONNECT":
      websocket.close();
      break;

    default:
      // We don't really need the default but ...
      break;
  }

  return next(action);
};

export const notificationMiddleware = store => next => action => {
  switch (action.type) {
    case "WEBSOCKET:MESSAGE":
      let data = JSON.parse(action.payload.data);
      store.dispatch(
        notifSend({
          kind: "success",
          dismissAfter: 3000,
          message: data.content.msg
        })
      );
      break;
    default:
      break;
  }

  return next(action);
};

export function createApiMiddlewareWithRefreshToken() {
  let postponedRSAAs = [];

  return ({ dispatch, getState }) => {
    const rsaaMiddleware = apiMiddleware({ dispatch, getState });

    return next => action => {
      const nextCheckPostoned = nextAction => {
        // Run postponed actions after token refresh
        if (nextAction.type === TOKEN_RECEIVED) {
          next(nextAction);
          postponedRSAAs.forEach(postponed => {
            rsaaMiddleware(next)(postponed);
          });
          postponedRSAAs = [];
        } else {
          next(nextAction);
        }
      };

      if (isRSAA(action)) {
        const state = getState(),
          token = refreshToken(state);

        if (token && isAccessTokenExpired(state)) {
          postponedRSAAs.push(action);
          if (postponedRSAAs.length === 1) {
            return rsaaMiddleware(nextCheckPostoned)(refreshAccessToken(token));
          } else {
            return;
          }
        }

        return rsaaMiddleware(next)(action);
      }
      return next(action);
    };
  };
}

export const jwtApiMiddleware = createApiMiddlewareWithRefreshToken();
