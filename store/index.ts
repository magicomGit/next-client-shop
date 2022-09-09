import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit"
import { createWrapper } from "next-redux-wrapper";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import  authMiddleware  from "../middleware/authMiddleware";
import { shopApi } from "./shop.api";
import authReducer from "./slices/authSlice";
import loginFormReducer from "./slices/showLoginFormSlice";

const rootReducer = combineReducers({
    authReducer, loginFormReducer,
    [shopApi.reducerPath]: shopApi.reducer

})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(shopApi.middleware).concat(authMiddleware)
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelctor: TypedUseSelectorHook<RootState> = useSelector

export const wrapper = createWrapper<AppStore>(setupStore);