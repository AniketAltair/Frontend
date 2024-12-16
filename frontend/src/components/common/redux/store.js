import { configureStore, current } from "@reduxjs/toolkit";
import toastReducer from "./slice/toastSlice";
import currentTabReducer from "./slice/currentTabSlice";
import loadingReducer from "./slice/loadingSlice";

const store = configureStore({
    reducer:{
        toast: toastReducer,
        currentTab : currentTabReducer,
        loading : loadingReducer
    }
})

export default store;