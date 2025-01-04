import { createSlice } from "@reduxjs/toolkit";

const initialExercisesState = {
    exercisesVisible: true,
    myExercisesVisible: false,
    selectedExercisesState : [],
    bundleNameState : "",
    selectedMyWorkoutBundleData : null,
    isMyWorkOutBundleVisible : true,
    isSelectedMyWorkoutBundleVisible : false,
    updatedSelectedExercisesState : []
};

const exercisesSlice = createSlice({
    name: "exercises",
    initialState: initialExercisesState, 
    reducers: {
        setExercisesVisible: (state, action) => {
            state.exercisesVisible = action.payload.exercisesVisible;
        },
        setMyExercisesVisible: (state, action) => {
            state.myExercisesVisible = action.payload.myExercisesVisible;
        },
        setSelectedExercisesState: (state, action) => {
            state.selectedExercisesState = action.payload.selectedExercisesState;
        },
        setBundleNameState: (state, action) => {
            state.bundleNameState = action.payload.bundleNameState;
        },
        setSelectedMyWorkoutBundleData: (state, action) => {
            state.selectedMyWorkoutBundleData = action.payload.selectedMyWorkoutBundleData;
        },
        setIsMyWorkOutBundleVisible: (state, action) => {
            state.isMyWorkOutBundleVisible = action.payload.isMyWorkOutBundleVisible;
        },
        setIsSelectedMyWorkoutBundleVisible: (state, action) => {
            state.isSelectedMyWorkoutBundleVisible = action.payload.isSelectedMyWorkoutBundleVisible;
        },
        setUpdatedSelectedExercisesState: (state, action) => {
            state.updatedSelectedExercisesState = action.payload.updatedSelectedExercisesState;
        },
    },
});

export const   {setExercisesVisible,
            setMyExercisesVisible,
            setSelectedExercisesState,
            setBundleNameState,
            setSelectedMyWorkoutBundleData,
            setIsMyWorkOutBundleVisible,
            setIsSelectedMyWorkoutBundleVisible,
            setUpdatedSelectedExercisesState} = exercisesSlice.actions;

export default exercisesSlice.reducer;
