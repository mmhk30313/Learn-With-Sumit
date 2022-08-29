import { getVideos, getPageVideos } from "./videosAPI";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const initialState = {
    videos: [],
    limit: 5,
    curPage: 0,
    totalVideos: 0,
    pageVideos: [],
    isLoading: false,
    isError: false,
    error: "",
};

// async thunk
export const fetchVideos = createAsyncThunk(
    "videos/fetchVideos",
    async ({ tags, search }, {dispatch}) => {
        const videos = await getVideos(tags, search);
        videos?.length > 0 && dispatch(fetchPageVideos({tags, search, page: initialState?.curPage, limit: initialState?.limit}));
        return videos;
    }
);

export const fetchPageVideos = createAsyncThunk(
    "videos/fetchPageVideos",
    async ({tags, search, page, limit }) => {
        const pageVideos = await getPageVideos(tags, search, page, limit);
        return {pageVideos, page};
    }
);

const videoSlice = createSlice({
    name: "videos",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchVideos.pending, (state) => {
                state.isError = false;
                state.isLoading = true;
            })
            .addCase(fetchVideos.fulfilled, (state, action) => {
                // state.isLoading = false;
                state.videos = action?.payload;
                state.totalVideos = action?.payload?.length || 0;
            })
            .addCase(fetchVideos.rejected, (state, action) => {
                state.videos = [];
                state.totalVideos = 0;
                state.pageVideos = [];
                state.isError = true;
                state.isLoading = false;
                state.error = action.error?.message;
            })
            .addCase(fetchPageVideos.pending, (state) => {
                state.isError = false;
                state.isLoading = true;
            })
            .addCase(fetchPageVideos.fulfilled, (state, action) => {
                // console.log({payload: action.payload});
                state.isLoading = false;
                state.pageVideos = action.payload.pageVideos;
                state.curPage = action.payload.page;
            })
            .addCase(fetchPageVideos.rejected, (state, action) => {
                state.pageVideos = [];
                state.isError = true;
                state.isLoading = false;
                state.error = action.error?.message;
            });
    },
});

export default videoSlice.reducer;
