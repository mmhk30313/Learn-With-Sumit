import { getVideo, updateVideo } from "./videoAPI";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const initialState = {
    video: {},
    isLoading: false,
    isError: false,
    error: "",
};

// async thunk
export const fetchVideo = createAsyncThunk("video/fetchVideo", async (id) => {
    const video = await getVideo(id);
    return video;
});

export const updateCurrentVideo = createAsyncThunk("video/updateVideo", async ({id, videoData}) => {
    // console.log({id, videoData});
    await updateVideo(id, videoData);
    // return video;
});

const videoSlice = createSlice({
    name: "video",
    initialState,
    reducers: {
        incrementVideoLikes: (state, action) => {
            state.video.likes += action.payload || 1;
        },
        incrementVideoUnLikes: (state, action) => {
            state.video.unlikes += action.payload || 1;
        },

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchVideo.pending, (state) => {
                state.isError = false;
                state.isLoading = true;
            })
            .addCase(fetchVideo.fulfilled, (state, action) => {
                state.isLoading = false;
                state.video = action.payload;
            })
            .addCase(fetchVideo.rejected, (state, action) => {
                state.isLoading = false;
                state.video = {};
                state.isError = true;
                state.error = action.error?.message;
            })
            // .addCase(updateCurrentVideo.fulfilled, (state, action) => {
            //     state.video = action.payload;
            // });
    },
});

export default videoSlice.reducer;
export const { incrementVideoLikes, incrementVideoUnLikes } = videoSlice.actions;
