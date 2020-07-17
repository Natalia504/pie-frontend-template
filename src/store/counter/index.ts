import { createSlice } from "@reduxjs/toolkit";
import { ApplicationState } from "../../devIndex";

export const counter = createSlice({
  name: "counter",
  initialState: 0,
  reducers: {
    increment: (state): number => state + 1,
    decrement: (state): number => (state > 0 ? state - 1 : 0)
  }
});

export const countSelector = (state: ApplicationState): number => state.counter;

export default counter.reducer;
