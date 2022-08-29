const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
    isReset: false,
};

const resetSlice = createSlice({
    name: "reset",
    initialState,
    reducers: {
        resetData: (state, action) => {
            state.isReset = action.payload;
        }
    },
});

export default resetSlice.reducer;
export const { resetData } = resetSlice.actions;
