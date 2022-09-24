import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
    name: "kanji",
    initialState: {},
    reducers: {
        setKanjiData: (state, action) => {
            const { data, key } = action.payload;
            state[key] = data;
        },
    },
});

export const { setKanjiData } = slice.actions;
export default slice.reducer;
