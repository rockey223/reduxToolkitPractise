import React from 'react'
import {useDispatch} from 'react-redux'
import { increaseNumber } from '../../store/slices/numberSlice';
const IncreaseNumber = () => {

    const dispatch = useDispatch();

  return (
   <>
   <button onClick={()=>dispatch(increaseNumber())}>increase</button>
   </>
  )
}

export default IncreaseNumber