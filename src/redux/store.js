import { combineReducers, configureStore } from '@reduxjs/toolkit'
import productSlice from './features/productSlice'
import cartSlice from './features/cartSlice'
import adminSlice from './features/adminSlice'
import userSlice from './features/userSlice'


import {
    persistReducer,
    persistStore,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'



// custom storage

const storage = {
    getItem: (key) => Promise.resolve(localStorage.getItem(key)),
    setItem: (key, value) => {
        localStorage.setItem(key, value);
        return Promise.resolve();
    },
    removeItem: (key) => {
        localStorage.removeItem(key);
        return Promise.resolve();
    },
};

const persistConfig = {
    key: 'Ekart',
    version: 2,
    storage,
}

const rootReducer = combineReducers({
    user: userSlice,
    products: productSlice,
    admin:adminSlice,
    cart: cartSlice,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})

export const persistor = persistStore(store)

export default store;