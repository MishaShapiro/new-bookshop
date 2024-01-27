import { configureStore } from '@reduxjs/toolkit';
import cartSlice from './CartSlice';
import userSlice from './UserSlice';
import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import persistConfig from './persist';
import { persistStore } from 'redux-persist';

const rootReducer = combineReducers({ 
    cart: cartSlice.reducer,
    user: userSlice.reducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({ 
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    })
});

export const persistor = persistStore(store);

export default store;