import { createSlice } from "@reduxjs/toolkit";

const initialLoadingState = {
    isLoading: ""
};

const loadingSlice = createSlice({
    name: "loading",
    initialState: initialLoadingState, 
    reducers: {
        setIsLoading: (state, action) => {
            state.isLoading = action.payload.isLoading;
        }
    },
});

export const { setIsLoading} = loadingSlice.actions;

export default loadingSlice.reducer;
