import React from 'react'
import {useDispatch} from 'react-redux'
import { getUser } from '../../store/slices/userSlice';
import { Get } from '../../fetch';
const AddUserList = () => {
    const dispatch = useDispatch();
    async function getuser() {
      const data = await Get("posts");
      dispatch(getUser(data));
    }
    return <button onClick={() => getuser()}>Add user list</button>;
}

export default AddUserList