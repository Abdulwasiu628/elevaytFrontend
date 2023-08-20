import { createSlice } from "@reduxjs/toolkit";

const formSlicer = createSlice({
  name: "userForm",
  initialState: {
    name: "",
    email: "",
  },
  reducers:{
    setName: (state, action) => {
      state.name = action.payload;
    },
    setEmail: (state, action) => {
      state.name = action.payload;
    },
    clearForm: (state) => {
      state.name = "";
      state.email="";
    }
  },
});

export const {setName, setEmail, clearForm} = formSlicer.actions;
export default formSlicer.reducer;