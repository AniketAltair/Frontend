import { createSlice } from "@reduxjs/toolkit";

const initialDietBundleState = {
    selectedItemsState:[],
    mandatoryItemsState:[],
};

const dietBundleSlice = createSlice({
    name: "dietBundle",
    initialState: initialDietBundleState, 
    reducers: {
        setDietBundle: (state, action) => {
            state.selectedItemsState = action.payload.selectedItemsState;
            state.mandatoryItemsState = action.payload.mandatoryItemsState;
        }
    },
});

export const { setDietBundle} = dietBundleSlice.actions;

export default dietBundleSlice.reducer;
