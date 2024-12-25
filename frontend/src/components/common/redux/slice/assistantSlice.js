import { createSlice } from "@reduxjs/toolkit";

const initialAssistantState = {
    isAssistantVisible: false
};

const assistantSlice = createSlice({
    name: "assistant",
    initialState: initialAssistantState, 
    reducers: {
        setIsAssistantVisible: (state, action) => {
            state.isAssistantVisible = action.payload.isAssistantVisible;
        }
    },
});

export const { setIsAssistantVisible} = assistantSlice.actions;

export default assistantSlice.reducer;
