import { createSlice } from '@reduxjs/toolkit';

const filtersInitialState = {
  value: '',
};

const filterSlice = createSlice({
  name: 'filters',
  initialState: filtersInitialState,
  reducers: {
    addValue: {
      reducer(state, action) {
        state.value = action.payload;
      },
    },
  },
});

export const { addValue } = filterSlice.actions;
export const filtersReducer = filterSlice.reducer;
