import { createSlice } from "@reduxjs/toolkit";

const initialCurrenTabState = {
    currentTab: ""
};

const currentTabSlice = createSlice({
    name: "currentTab",
    initialState: initialCurrenTabState, 
    reducers: {
        setCurrentTab: (state, action) => {
            state.currentTab = action.payload.currentTab;
        }
    },
});

export const {setCurrentTab} = currentTabSlice.actions;

export default currentTabSlice.reducer;
