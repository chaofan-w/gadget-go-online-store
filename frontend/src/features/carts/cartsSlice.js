import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  carts: [],
  status: "idle",
  error: null,
};

export const fetchCarts = createAsyncThunk(
  "carts/fetchCarts",

  //###### pass argument in the async()=>{} callback, here the customerId

  async (customerId) => {
    const response = await fetch(`/api/carts/${customerId}`);
    const cartsData = await response.json();
    return cartsData;
  }
);

const cartsSlice = createSlice({
  name: "carts",
  initialState,
  reducers: {
    // cartAdded: (state,action)=>{
    //   const {}

    // }

    increment: (state, action) => {
      const { product } = action.payload;
      const updatedProduct = state.carts[0].products.find(
        (item) => item.productId === product._id
      );
      if (updatedProduct && updatedProduct.quantity < product.numInStock) {
        updatedProduct.quantity++;
        state.error = "";
      } else {
        state.error = "you have reached our number of stock for this product";
      }
    },
    decrement: (state, action) => {
      const { product } = action.payload;
      const updatedProduct = state.carts[0].products.find(
        (item) => item.productId === product._id
      );
      if (updatedProduct && updatedProduct.quantity > 1) {
        updatedProduct.quantity--;
      } else {
        state.carts[0].products = state.carts[0].products.filter(
          (item) => item.productId !== product._id
        );
      }
    },
    productAdded: (state, action) => {
      const { product } = action.payload;
      state.carts[0].products.push({
        productId: product._id,
        price: product.promotionPrice ? product.promotionPrice : product.price,
        quantity: 1,
      });
    },
    productRemoved: (state, action) => {
      const { product } = action.payload;
      const updatedProducts = state.carts[0].products.filter(
        (item) => item.productId !== product._id
      );
      state.carts[0].products = updatedProducts;
    },
    cartCleared: (state, action) => {
      state.carts = [];
      state.status = "idle";
      state.error = null;
    },
    cartProductsCleared: (state, action) => {
      state.carts[0].products = [];
      state.status = "idle";
      state.error = null;
    },
    errorCleared: (state, action) => {
      state.error = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCarts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchCarts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.carts = action.payload.status === 200 ? action.payload.data : [];
        state.error = action.payload.message && action.payload.message;
      })
      .addCase(fetchCarts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.message;
      });
  },
});

export const {
  increment,
  decrement,
  productAdded,
  cartCleared,
  errorCleared,
  productRemoved,
  cartProductsCleared,
} = cartsSlice.actions;
export default cartsSlice.reducer;
export const selectAllCarts = (state) => state.carts.carts;
