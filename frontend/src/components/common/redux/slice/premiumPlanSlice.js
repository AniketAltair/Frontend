import { createSlice } from "@reduxjs/toolkit";

const initialPremiumPlanState = {
    planAmount:0,
    planValidity:0,
    planfeatures:[]
};

const premiumPlanSlice = createSlice({
    name: "premiumPlan",
    initialState: initialPremiumPlanState, 
    reducers: {
        setPremiumPlanDetails: (state, action) => {
            state.planAmount = action.payload.planAmount;
            state.planValidity = action.payload.planValidity;
            state.planfeatures = action.payload.planfeatures;
        }
    },
});

export const { setPremiumPlanDetails} = premiumPlanSlice.actions;

export default premiumPlanSlice.reducer;
