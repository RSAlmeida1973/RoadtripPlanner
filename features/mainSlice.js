import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const mainSlice = createSlice({
    name: 'results',
    initialState: { isLoading: true, errMess: null, resultsArray: [] },
    reducers: {},
    extraReducers: (builder) => {}
});

export const mainReducer = mainSlice.reducer;