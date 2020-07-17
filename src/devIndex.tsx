import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import {
  configureStore,
  getDefaultMiddleware,
  EnhancedStore,
  Reducer,
  Unsubscribe,
  combineReducers
} from "@reduxjs/toolkit";
import createSagaMiddleware, { Saga, Task } from "redux-saga";
import { routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";

import { loadState } from "./store/localStorage";
import rootSaga from "./store/root/rootSaga";
import { ThemeProvider, createMuiTheme } from "@material-ui/core";
import { pieLightTheme, AuthProvider } from "@pie/components";
import App from "./App";
import DevelopmentWrapper from "./components/DevelopmentWrapper/DevelopmentWrapper";
import { noop } from "lodash";

const history = createBrowserHistory();
const reducer: Reducer = state => state;
export type ApplicationState = ReturnType<typeof reducer>;

export interface InjectionFunctions {
  injectReducer(key: string, reducer: Reducer): Promise<void>;
  injectSaga(key: string, saga: Saga): Promise<void>;
  subscribe(listener: () => void): Unsubscribe;
  getState<S>(): S;
}

export type AppStoreType = EnhancedStore &
  InjectionFunctions & {
    asyncReducers: { [key: string]: Reducer };
    asyncSagas: Map<string, Task>;
  };

export const renderApp = (rootElement: HTMLElement): void => {
  const sagaMiddleware = createSagaMiddleware();

  const store = configureStore({
    reducer,
    middleware: [
      ...getDefaultMiddleware({ thunk: false }),
      sagaMiddleware,
      routerMiddleware(history)
    ],
    devTools: process.env.NODE_ENV !== "production",
    preloadedState: loadState()
  }) as AppStoreType;

  // Setup store for loading external reducers
  store.asyncReducers = {};
  store.injectReducer = (key: string, asyncReducer: any): Promise<void> => {
    try {
      store.asyncReducers[key] = asyncReducer;
      store.replaceReducer(combineReducers(store.asyncReducers));
      return Promise.resolve();
    } catch (ex) {
      return Promise.reject(ex);
    }
  };

  // Setup store for loading external sagas
  store.asyncSagas = new Map();
  store.injectSaga = (key: string, asyncSaga: any): Promise<void> => {
    try {
      const existingTask = store.asyncSagas.get(key);
      // Don't replace unless this in dev/hot.module
      if (!module.hot && existingTask) return Promise.resolve();
      if (module.hot && existingTask) {
        existingTask.cancel();
        while (!existingTask.isCancelled()) {
          noop();
        }
      }

      // Start the saga and save task so we can cancel if needed in the future
      const task = sagaMiddleware.run(asyncSaga);
      store.asyncSagas.set(key, task);
      return Promise.resolve();
    } catch (ex) {
      return Promise.reject(ex);
    }
  };

  let sagaTask = sagaMiddleware.run(rootSaga);

  if (process.env.NODE_ENV !== "production" && module.hot) {
    module.hot.accept("./store/root/rootReducer", () => {
      const newReducers = require("./store/root/rootReducer").combineReducers(
        store.asyncReducers
      );
      store.replaceReducer(newReducers);
    });
    module.hot.accept("./store/root/rootSaga", () => {
      const newSagas = require("./store/root/rootSaga").default;
      sagaTask.cancel();
      while (!sagaTask.isCancelled()) {
        noop();
      }
      sagaTask = sagaMiddleware.run(newSagas);
    });
  }

  const theme = createMuiTheme(pieLightTheme);
  fetch("/appsettings.json")
    .then(res => res.json())
    .then(settings => {
      ReactDOM.render(
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <AuthProvider
              authConfiguration={settings.authConfiguration}
              userPoolMapping={settings.userPoolMapping}
              // @ts-ignore
              getLocation={() => window.location}
            >
              <DevelopmentWrapper>
                <div
                  style={{
                    minHeight: "100vh"
                  }}
                >
                  <App
                    injectReducer={store.injectReducer}
                    injectSaga={store.injectSaga}
                    // @ts-ignore
                    store={store}
                    theme={theme}
                  />
                </div>
              </DevelopmentWrapper>
            </AuthProvider>
          </ThemeProvider>
        </Provider>,
        rootElement
      );
    });
};
