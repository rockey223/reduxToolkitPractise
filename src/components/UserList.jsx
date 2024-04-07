import React from "react";
import DeleteUser from "./DeleteUser";
import { fakeUserData } from "../api";
import { useDispatch } from "react-redux";
import { addUser } from "../store/slices/UserSlice";
import DisplayUser from "./DisplayUser";

const UserList = () => {
  const dispatch = useDispatch();

  return (
    <>
      <div>UserList</div>
      <button className="add" onClick={() => dispatch(addUser(fakeUserData()))}>
        add user
      </button>
      <ul>
        <DisplayUser />
      </ul>
      <hr />
      <DeleteUser />
    </>
  );
};

export default UserList;
