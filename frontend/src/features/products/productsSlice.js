import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  status: "idle",
  error: null,
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await fetch("/api/products");
    const productsData = await response.json();
    if (productsData.status === 200) {
      return productsData;
    }
    // console.log(productsData);
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchProducts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products =
          action.payload.status === 200 ? action.payload.data : null;
        state.error = action.payload.message && action.payload.message;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.message;
      });
  },
});

export const {} = productsSlice.actions;

export default productsSlice.reducer;

export const selectAllProducts = (state) => state.products.products;
