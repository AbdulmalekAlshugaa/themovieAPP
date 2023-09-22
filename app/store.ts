import { configureStore } from '@reduxjs/toolkit'
import { reducer } from './daemon/slices'
import { useDispatch } from 'react-redux'
export const store = configureStore({
    reducer: {
        movies: reducer
    }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch // Export a hook that can be reused to resolve types

export default store
