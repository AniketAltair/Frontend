import { createSlice } from "@reduxjs/toolkit";

const initialTrainerDetailsState = {
    id: 0,
    nameOfTrainer: "",
    age:0,
    yoe:0,
    imageLink: "",
    rating: 0
};

const trainerDetailsSlice = createSlice({
    name: "trainerDetails",
    initialState: initialTrainerDetailsState, 
    reducers: {
        setTrainerDetails: (state, action) => {
            state.id = action.payload.id;
            state.nameOfTrainer = action.payload.nameOfTrainer;
            state.age = action.payload.age;
            state.yoe = action.payload.yoe;
            state.imageLink = action.payload.imageLink;
            state.rating = action.payload.rating;
        }
    },
});

export const { setTrainerDetails} = trainerDetailsSlice.actions;

export default trainerDetailsSlice.reducer;
