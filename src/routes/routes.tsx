import React from "react";
import { Route } from "react-router";
import { Home } from "../pages/Home";

export enum StandardRoutes {
  HOME = "/"
}

export const standardRoutes = [
  <Route
    key={StandardRoutes.HOME}
    path={StandardRoutes.HOME}
    component={Home}
  />
];
