// import { configureStore } from "@reduxjs/toolkit";
import { compose, createStore, applyMiddleware, Middleware } from "redux";
// import thunk from "redux-thunk";
import { persistStore, persistReducer, PersistConfig } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

import logger from "redux-logger";
import { rootReducer } from "./root-reducer";
// import { loggerMiddleware } from "./middleware/logger"; //if you prefer our middleware
import createSagaMiddleware from "@redux-saga/core";
import { rootSaga } from "./root-saga";

export type RootState = ReturnType<typeof rootReducer>
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
  }
}

type ExtendedPersistConfig = PersistConfig<RootState> & { 
  whitelist: (keyof RootState)[]
}

const persistConfig: ExtendedPersistConfig = {
  key: "root",
  storage,
  // blacklist: ["user"],
  whitelist: ["cart"], //we only really need cart to persist
};

const sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleWares = [
  process.env.NODE_ENV !== "production" && logger,
  // thunk, (removed, bcz using saga)
  sagaMiddleware,
].filter((middleware): middleware is Middleware => Boolean(middleware));

const composedEnhancer =
  (process.env.NODE_ENV !== "production" &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const composedEnhancers = composedEnhancer(applyMiddleware(...middleWares));

// export const store = createStore(rootReducer, undefined, composedEnhancers);
export const store = createStore(
  persistedReducer,
  undefined,
  composedEnhancers
);

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
