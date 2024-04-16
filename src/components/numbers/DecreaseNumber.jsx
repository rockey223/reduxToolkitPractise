import React from 'react'
import {useDispatch} from 'react-redux'
import { decreaseNumber } from '../../store/slices/numberSlice'
const DecreaseNumber = () => {
    const dispatch = useDispatch()
  return (
    <>
    <button onClick={()=>dispatch(decreaseNumber())}>Decrease</button>
    </>
  )
}

export default DecreaseNumber