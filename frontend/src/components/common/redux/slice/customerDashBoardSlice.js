import { createSlice, current } from "@reduxjs/toolkit";

const customerDashBoardState = {
    currentBundleData: null,
    currentDietBundleIndexData:0,
    isCustomerDashBoardVisible:true,
    isEditDietBundleVisible:false,
    isEditWorkoutBundleVisible:false,
    currentDate:null
};

const customerDashBoardSlice = createSlice({
    name: "customerDashBoard",
    initialState: customerDashBoardState, 
    reducers: {
        setCurrentBundleData: (state, action) => {
            // const newBundleData = action.payload.currentBundleData;
            // state.currentBundleData = state.currentBundleData
            //     ? { ...state.currentBundleData, ...newBundleData }
            //     : newBundleData;
            state.currentBundleData = action.payload.currentBundleData;
        },        
        setIsCustomerDashBoardVisible: (state, action) => {
            state.isCustomerDashBoardVisible = action.payload.isCustomerDashBoardVisible;
        },
        setIsEditDietBundleVisible: (state, action) => {
            state.isEditDietBundleVisible = action.payload.isEditDietBundleVisible;
        },
        setIsEditWorkoutBundleVisible: (state, action) => {
            state.isEditWorkoutBundleVisible = action.payload.isEditWorkoutBundleVisible;
        },
        setCurrentDietBundleIndexData: (state, action) => {
            state.currentDietBundleIndexData = action.payload.currentDietBundleIndexData;
        },
        setCurrentDate: (state, action) => {
            state.currentDate = action.payload.currentDate;
        },
    },
});

export const { setCurrentBundleData,
               setIsCustomerDashBoardVisible,
               setIsEditDietBundleVisible,
               setIsEditWorkoutBundleVisible,
               setCurrentDietBundleIndexData,
               setCurrentDate} = customerDashBoardSlice.actions;

export default customerDashBoardSlice.reducer;
