import React from "react";
import { useDispatch } from "react-redux";
import { addUser, getUser } from "../../store/slices/userSlice";

import { Post } from "../../fetch";
const AddName = () => {
  const dispatch = useDispatch();

  async function adduser() {
    const data = await Post("posts",{title: 'foo',body: 'bar',name: 'prashant'});
   
    dispatch(addUser(data));
  }
  return <button onClick={() => adduser()}>AddName</button>;
};

export default AddName;
