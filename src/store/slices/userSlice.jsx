import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    name: "",
    number: "",
    userList: [],
    commentList: [],
  },
  reducers: {
    getUser(state, action) {
      return {
        ...state,
        userList: action.payload,
      };
    },
    getComment(state, action) {
      return {
        ...state,
        commentList: action.payload,
      };
    },
    getPhone(state, action) {
      return {
        ...state,
        number: "321654987",
      };
    },
    addUser(state, action) {
      
      return {
        ...state,
        name: action.payload.name,
      };
    },
  },
});

export default userSlice.reducer;
export const { getUser, getPhone, getComment, addUser } = userSlice.actions;
