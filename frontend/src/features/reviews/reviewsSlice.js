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

export const postNewReview = createAsyncThunk(
  "reviews/postNewReview",
  async ({ reviewId, customerId, productId, rating, text }) => {
    try {
      const option = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          reviewId: reviewId,
          customerId: customerId,
          productId: productId,
          rating: rating,
          text: text,
        }),
      };
      const response = await fetch("/api/reviews/postreview", option);
      const result = response.json();
      return result;
    } catch (err) {
      console.log(err);
    }
  }
);

export const patchProductReview = createAsyncThunk(
  "reviews/patchProductReview",
  async ({ reviewId, rating, text }) => {
    try {
      const option = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          reviewId: reviewId,
          rating: rating,
          text: text,
        }),
      };
      const response = await fetch("/api/reviews/updateReview", option);
      const result = response.json();
      return result;
    } catch (err) {
      console.log(err);
    }
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
      })
      .addCase(postNewReview.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(postNewReview.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = action.payload.message;
      })
      .addCase(postNewReview.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.message;
      })
      .addCase(patchProductReview.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(patchProductReview.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = action.payload.message;
      })
      .addCase(patchProductReview.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.message;
      });
  },
});

export const {} = reviewsSlice.actions;

export default reviewsSlice.reducer;

export const selectAllReviews = (state) => state.reviews.reviews;
