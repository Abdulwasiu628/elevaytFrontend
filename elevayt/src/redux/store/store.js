import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../slicers/countSlicer";
import userFormReducer from "../slicers/formSlicer";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    userForm: userFormReducer
  }
});