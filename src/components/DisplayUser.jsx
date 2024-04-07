import React from "react";
import {useDispatch, useSelector } from "react-redux";

import { removeUser } from "../store/slices/UserSlice";

const DisplayUser = () => {
    const dispatch = useDispatch()
  const data = useSelector((state) => {
    return state.users;
  });



  return (
    <>
      {data.map((user, id) => {
        return (
          <li key={id}>
            {user}
            <button onClick={()=>dispatch(removeUser(id))}>delete</button>
          </li>
        );
      })}
    </>
  );
};

export default DisplayUser;
