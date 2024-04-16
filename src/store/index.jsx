import {configureStore} from '@reduxjs/toolkit'
import numberSlice from './slices/numberSlice'
import userSlice from './slices/userSlice'


const store = configureStore({
reducer:{
    number: numberSlice,
    user: userSlice
}
})

export default store