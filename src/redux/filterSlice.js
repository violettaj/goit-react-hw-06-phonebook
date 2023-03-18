import { createSlice } from "@reduxjs/toolkit";

const filtersInitialState = {
    value: "",
};

const filterSlice = createSlice({
    name: "filters",
    initialState: filtersInitialState,
    reducers: {
        addWantedValue: {
            reducer(state, action) {
                state.value = action.payload;
            },
        },
    },
})

export const { addWantedValue } = filterSlice.actions;
export const filtersReducer = filterSlice.reducer;
