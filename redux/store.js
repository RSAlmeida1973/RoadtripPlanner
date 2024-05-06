import { configureStore } from '@reduxjs/toolkit';
import { mainReducer } from '../features/mainSlice';
import {
    persistStore,
    persistCombineReducers,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER
} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

const config = {
    key: 'root',
    storage: AsyncStorage,
    debug: true
}

export const store = configureStore({
    reducer: persistCombineReducers(config, {
        main: mainReducer
    }),
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [
                FLUSH,
                REHYDRATE,
                PAUSE,
                PERSIST,
                PURGE,
                REGISTER
            ]
        }
    })
});

export const persistor = persistStore(store);