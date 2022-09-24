import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
    name: "quiz",
    initialState: {},
    reducers: {
        setQuizData: (state, action) => {
            const { data, key } = action.payload;
            state[key] = data;
        },
    },
});

export const { setQuizData } = slice.actions;
export default slice.reducer;
