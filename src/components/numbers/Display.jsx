import React from 'react'
import { useSelector } from 'react-redux'

const Display = () => {
const number = useSelector(state =>{return state.number})

  return (
    <span>{number}</span>
  )
}

export default Display