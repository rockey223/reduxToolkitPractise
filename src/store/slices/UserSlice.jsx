import { createSlice } from "@reduxjs/toolkit";
import { removeAllUser } from "../actions";

const userSlice = createSlice({
  name: "user",
  initialState: [],
  reducers: {
    addUser(state, action) {
      state.push(action.payload);
    },
    removeUser(state, action) {
      state.splice(action.payload, 1);
    },
    // removeAllUser(state, action) {
    //    return []
    // },
  },


  extraReducers(builder){
    builder.addCase(removeAllUser,()=>{
      return []
    })
  }

});




export default userSlice.reducer;
export const { addUser, removeUser } = userSlice.actions;
