import { userApi } from '@/services/user'
import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { userReducer } from './features/users/usersSlice'

export const store = configureStore({
    reducer: {
        [userApi.reducerPath]: userApi.reducer,
        user: userReducer
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(userApi.middleware),
})


setupListeners(store.dispatch)