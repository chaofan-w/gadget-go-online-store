import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  status: "idle",
  error: null,
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (currPage) => {
    const response = await fetch(`/api/productsPage/${currPage}`);
    const productsData = await response.json();
    if (productsData.status === 200) {
      return productsData;
    }
    // console.log(productsData);
  }
);

export const fetchMultiProductsByIds = createAsyncThunk(
  "products/fetchMultiProductsByIds",
  async (allCartItemIds) => {
    // req.query to get an Object from URL query string
    // first to change the array of ids into id1=6543&id3=6544 string format
    // second create URL using get endpoint + ?queryString
    // in backend, will use Object.values(req.query) to convert URLserchparams back to array of ids
    const queryArr = allCartItemIds.map((i, index) => `id${index}=${i}`);
    const queryString = queryArr.join("&");
    const response = await fetch(`/api/multiproducts?${queryString}`);
    const productsData = await response.json();
    if (productsData.status === 200) {
      return productsData;
    }
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
      })
      .addCase(fetchMultiProductsByIds.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchMultiProductsByIds.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products =
          action.payload.status === 200 ? action.payload.data : null;
        state.error = action.payload.message && action.payload.message;
      })
      .addCase(fetchMultiProductsByIds.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.message;
      });
  },
});

export const {} = productsSlice.actions;

export default productsSlice.reducer;

export const selectAllProducts = (state) => state.products.products;
