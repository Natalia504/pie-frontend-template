import counter from "../counter";

import { Reducer, combineReducers } from "@reduxjs/toolkit";

import { appName } from "../../utils/constants";

interface FrontendTemplateState {
  counter: number;
}
export interface RootState {
  [appName]: FrontendTemplateState;
}

export const frontendTemplateSelector = (
  state: RootState
): FrontendTemplateState => state[appName];

export const createRootReducer = (): Reducer =>
  combineReducers({
    counter
  });
