import React from 'react'
import {useDispatch} from 'react-redux'
import { reset } from '../../store/slices/numberSlice'
const ResetNumber = () => {
    const dispatch = useDispatch()
  return (
    <>
    
    <button onClick={()=>dispatch(reset())}>Reset</button>
    </>
  )
}

export default ResetNumber