import { configureStore, current } from "@reduxjs/toolkit";
import toastReducer from "./slice/toastSlice";
import currentTabReducer from "./slice/currentTabSlice";
import loadingReducer from "./slice/loadingSlice";
import assistantReducer from "./slice/assistantSlice";
import premiumPlanReducer from "./slice/premiumPlanSlice";
import gymDetailsReducer from "./slice/gymDetailsSlice";
import trainerDetailsReducer from "./slice/trainerDetailsSlice"
import dietBundleReducer from "./slice/dietBundleSlice"

const store = configureStore({
    reducer:{
        toast: toastReducer,
        currentTab : currentTabReducer,
        loading : loadingReducer,
        assistant: assistantReducer,
        premiumPlan : premiumPlanReducer,
        gymDetails : gymDetailsReducer,
        trainerDetails : trainerDetailsReducer,
        dietBundle : dietBundleReducer
    }
})

export default store;