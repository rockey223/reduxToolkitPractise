import {createSlice} from '@reduxjs/toolkit'

const numberSlice = createSlice({
    name: 'number',
    initialState: 0,
    reducers:{
        increaseNumber(state,action){
          return state+1
        },
        decreaseNumber(state,action){
            return state-1
        },
        reset(state,action){
            return state = 0
        }
    }
})

export default numberSlice.reducer;
export const {increaseNumber,decreaseNumber,reset} = numberSlice.actions
