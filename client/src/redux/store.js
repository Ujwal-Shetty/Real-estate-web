import { configureStore } from '@reduxjs/toolkit'
import userReducer from './user/userSlice'


export const store = configureStore({
    reducer:{user:userReducer},
    middlewar:(getDefaultMiddleware) =>
    getDefaultMiddleware({
        serializableCheck:false,
    })
})