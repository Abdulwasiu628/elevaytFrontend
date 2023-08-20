import {createSlice} from "@reduxjs/toolkit";


const countSlicer = createSlice({
  name: "counter",
  initialState: 0,
  reducers: {
    increment: (state) => state + 1,
    decrement: (state) => state - 1
  }
});

export const {increment, decrement} = countSlicer.actions;
export default countSlicer.reducer;