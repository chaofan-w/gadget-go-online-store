import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  orders: [],
  status: "idle",
  error: null,
};

export const postNewOrder = createAsyncThunk(
  "orders/postNewOrder",
  async ({
    customerId,
    products,
    firstName,
    lastName,
    phone,
    address1,
    address2,
    city,
    state,
    postCode,
    country,
    cardName,
    cardNumber,
    discount,
    total,
  }) => {
    try {
      const option = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          customerId: customerId,
          products: products,
          firstName: firstName,
          lastName: lastName,
          phone: phone,
          address1: address1,
          address2: address2 || "",
          city: city,
          state: state || "",
          postCode: postCode,
          country: country,
          cardName: cardName,
          cardNumber: cardNumber,
          discount: discount,
          total: total,
        }),
      };
      const response = await fetch("/api/orders", option);
      const result = response.json();
      // must return the response result, so as the update the state accordingly
      return result;
    } catch (err) {
      console.log(err);
    }
  }
);

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(postNewOrder.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(postNewOrder.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = action.payload.message;
      })
      .addCase(postNewOrder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.message;
      });
  },
});

export const {} = ordersSlice.actions;
export default ordersSlice.reducer;
export const selectAllOrders = (state) => state.orders.orders;
