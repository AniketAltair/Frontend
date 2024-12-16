import { createSlice } from "@reduxjs/toolkit";

const initialToastState = {
    toastMessage: "",
    isToastVisible: false,
    isToastValidType: true,
};

const toastSlice = createSlice({
    name: "toast",
    initialState: initialToastState, 
    reducers: {
        setToastMessage: (state, action) => {
            state.toastMessage = action.payload.toastMessage;
        },
        setIsToastVisible: (state, action) => {
            state.isToastVisible = action.payload.isToastVisible;
        },
        setIsToastValidType: (state, action) => {
            state.isToastValidType = action.payload.isToastValidType;
        },
    },
});

export const { setToastMessage, setIsToastVisible, setIsToastValidType } = toastSlice.actions;

export default toastSlice.reducer;
