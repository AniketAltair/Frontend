import { createSlice } from "@reduxjs/toolkit";

const initialGymDetailsState = {
    id: 0,
    nameOfGym: "",
    imageLink: "",
    locationLink: "",
    rating: 0,
    plans: [],
    lat: 0,
    lng: 0,
};

const gymDetailsSlice = createSlice({
    name: "gymDetails",
    initialState: initialGymDetailsState, 
    reducers: {
        setGymDetails: (state, action) => {
            state.id = action.payload.id;
            state.nameOfGym = action.payload.nameOfGym;
            state.imageLink = action.payload.imageLink;
            state.locationLink = action.payload.locationLink;
            state.rating = action.payload.rating;
            state.plans = action.payload.plans;
            state.lat = action.payload.lat;
            state.lng = action.payload.lng;
        }
    },
});

export const { setGymDetails} = gymDetailsSlice.actions;

export default gymDetailsSlice.reducer;
