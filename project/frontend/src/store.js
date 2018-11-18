import storage from "redux-persist/es/storage";
import { createStore, applyMiddleware, compose } from "redux";
import { createFilter } from "redux-persist-transform-filter";
import { persistReducer, persistStore } from "redux-persist";
import { routerMiddleware } from "react-router-redux";

import thunk from "redux-thunk";
import rootReducer from "./reducers";
import {
  jwtApiMiddleware,
  wsMiddleware,
  notificationMiddleware
} from "./middlewares";

export default () => {
  const persistedFilter = createFilter("auth", ["access", "refresh"]);
  const reducer = persistReducer(
    {
      key: "jbm",
      storage: storage,
      whitelist: ["auth"],
      transforms: [persistedFilter]
    },
    rootReducer
  );
  let enhancers = [];
  if (process.env.NODE_ENV === "development") {
    const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;

    if (typeof devToolsExtension === "function") {
      enhancers.push(devToolsExtension());
    }
  }
  const store = createStore(
    reducer,
    {},
    compose(
      applyMiddleware(
        thunk,
        jwtApiMiddleware,
        wsMiddleware,
        notificationMiddleware
      ),
      ...enhancers
    )
  );
  persistStore(store);
  return store;
};
