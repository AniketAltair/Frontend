import { createSlice } from "@reduxjs/toolkit";

const initialDietBundleState = {
    selectedItemsState:[],
    mandatoryItemsState:[],
    macrosInput:[null,null,null,null,1],
};

const dietBundleSlice = createSlice({
    name: "dietBundle",
    initialState: initialDietBundleState, 
    reducers: {
        setDietBundle: (state, action) => {
            state.selectedItemsState = action.payload.selectedItemsState;
            state.mandatoryItemsState = action.payload.mandatoryItemsState;
        },
        setMacrosInput: (state,action) => {
            state.macrosInput[0] = action.payload.macrosInput[0];
            state.macrosInput[1] = action.payload.macrosInput[1];
            state.macrosInput[2] = action.payload.macrosInput[2];
            state.macrosInput[3] = action.payload.macrosInput[3];
            state.macrosInput[4] = action.payload.macrosInput[4];
        }
    },
});

export const { setDietBundle,setMacrosInput} = dietBundleSlice.actions;

export default dietBundleSlice.reducer;
