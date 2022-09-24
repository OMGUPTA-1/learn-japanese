import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
    name: "dict",
    initialState: {},
    reducers: {
        setDictData: (state, action) => {
            const { data, key } = action.payload;
            state[key] = data;
        },
    },
});

export const { setDictData } = slice.actions;
export default slice.reducer;
