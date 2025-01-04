import { createSlice } from "@reduxjs/toolkit";

const initialMyDietBundleState = {
    myDietBundleVisible: true,
    addNewBundleVisible: false,
    viewMyBundleVisible: false,
    viewMyBundleData:null,
    viewMyBundleMealIndexData:0,
    addNewBundleData:null,
    addNewBundleMealIndexData:0,
    addNewBundleName:"",
    addNewBundleNumberOfMeals:0
};

const MyDietBundleSlice = createSlice({
    name: "myDietBundle",
    initialState: initialMyDietBundleState, 
    reducers: {
        setMyDietBundleVisible: (state, action) => {
            state.myDietBundleVisible = action.payload.myDietBundleVisible;
        },
        setAddNewBundleVisibleVisible: (state, action) => {
            state.addNewBundleVisible = action.payload.addNewBundleVisible;
        },
        setViewMyBundleVisible: (state, action) => {
            state.viewMyBundleVisible = action.payload.viewMyBundleVisible;
        },
        setviewMyBundleData: (state, action) => {
            state.viewMyBundleData = action.payload.viewMyBundleData;
        },
        setviewMyBundleMealIndexData: (state, action) => {
            state.viewMyBundleMealIndexData = action.payload.viewMyBundleMealIndexData;
        },
        setAddNewBundleData: (state, action) => {
            state.addNewBundleData = action.payload.addNewBundleData;
        },
        setAddNewBundleMealIndexData: (state, action) => {
            state.addNewBundleMealIndexData = action.payload.addNewBundleMealIndexData;
        },
        setAddNewBundleName: (state, action) => {
            state.addNewBundleName = action.payload.addNewBundleName;
        },
        setAddNewBundleNumberOfMeals: (state, action) => {
            state.addNewBundleNumberOfMeals = action.payload.addNewBundleNumberOfMeals;
        }
    },
});

export const {setMyDietBundleVisible,
              setAddNewBundleVisibleVisible,
              setViewMyBundleVisible,
              setviewMyBundleData,
              setviewMyBundleMealIndexData,
              setAddNewBundleData,
              setAddNewBundleMealIndexData,
              setAddNewBundleName,
              setAddNewBundleNumberOfMeals } = MyDietBundleSlice.actions;

export default MyDietBundleSlice.reducer;
