import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  reviews: [],
  status: "idle",
  error: null,
};

export const fetchReviews = createAsyncThunk(
  "reviews/fetchReviews",
  async () => {
    const response = await fetch("/api/reviews");
    const reviewsData = await response.json();
    // console.log(reviewsData);
    return reviewsData;
  }
);

const reviewsSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchReviews.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.reviews =
          action.payload.status === 200 ? action.payload.data : null;
        state.error = action.payload.message && action.payload.message;
      })
      .addCase(fetchReviews.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.message;
      });
  },
});

export const {} = reviewsSlice.actions;

export default reviewsSlice.reducer;

export const selectAllReviews = (state) => state.reviews.reviews;
