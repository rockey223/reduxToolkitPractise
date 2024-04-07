import React from 'react'
import {useDispatch} from 'react-redux'
// import { removeAllUser } from '../store/slices/UserSlice'
import { removeAllUser } from '../store/actions'
const DeleteUser = () => {

    const dispatch = useDispatch()

  return (
  <>
    <button onClick={()=>dispatch(removeAllUser())}>DeleteUser</button>
  </>
  )
}

export default DeleteUser