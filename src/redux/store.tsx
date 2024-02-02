import { configureStore } from '@reduxjs/toolkit';
import cartSlice from './CartSlice';
import userSlice from './UserSlice';
import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import persistConfig from './persist';
import { persistStore } from 'redux-persist';
import theamSlice from './TheamSlice';

const rootReducer = combineReducers({ 
    cart: cartSlice.reducer,
    user: userSlice.reducer,
    theam: theamSlice.reducer,
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