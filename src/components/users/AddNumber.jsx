import React from "react";
import { useDispatch } from "react-redux";
import { getComment } from "../../store/slices/userSlice";
import { Get } from "../../fetch";
const AddNumber = () => {
  const dispatch = useDispatch();

  async function getcomment() {
    let data = await Get("comments");
    dispatch(getComment(data));
  }

  return <button onClick={() => getcomment()}>AddNumber</button>;
};

export default AddNumber;
