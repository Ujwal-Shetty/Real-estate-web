import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from './user/userSlice'
import persistReducer from 'redux-persist/es/persistReducer'
import persistStore from 'redux-persist/es/persistStore'
import storage from 'redux-persist/lib/storage'

const rootReducer= combineReducers({user:userReducer})
const persistCofig = {
    key:'root',
    storage,
    version:1,
}

const persistedReducer=persistReducer(persistCofig, rootReducer)
export const store = configureStore({
    reducer:persistedReducer,
    middlewar:(getDefaultMiddleware) =>
    getDefaultMiddleware({
        serializableCheck:false,
    })
})

export const persistor = persistStore(store)