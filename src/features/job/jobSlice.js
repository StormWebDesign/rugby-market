import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    datePost: [
        { id: 1, name: "Last 24 Hours", value: "24h", isChecked: false },
        { id: 2, name: "Last 7 Days", value: "7d", isChecked: false },
        { id: 3, name: "Last 14 Days", value: "14d", isChecked: false },
        { id: 4, name: "Last 30 Days", value: "30d", isChecked: false },
    ],
};

const jobSlice = createSlice({
    name: "job",
    initialState,
    reducers: {
        datePostCheck: (state, { payload }) => {
            state.datePost = state.datePost.map((item) =>
                item.id === payload ? { ...item, isChecked: true } : { ...item, isChecked: false }
            );
        },
    },
});

export const { datePostCheck } = jobSlice.actions;
export default jobSlice.reducer;
