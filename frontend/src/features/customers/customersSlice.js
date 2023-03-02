import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  customers: [],
  status: "idle",
  error: null,
};

export const postNewCustomer = createAsyncThunk(
  "customers/postNewCustomer",
  async ({ firstName, lastName, email, password }) => {
    try {
      const option = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
        }),
      };
      const response = await fetch("/api/customers", option);
      const result = response.json();
      // must return the response result, so as the update the state accordingly
      return result;
    } catch (err) {
      console.log(err);
    }
  }
);

const customersSlice = createSlice({
  name: "customers",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(postNewCustomer, (state, action) => {
        state.status = "loading";
      })
      .addCase(postNewCustomer.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = action.payload.message;
      })
      .addCase(postNewCustomer.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.message;
      });
  },
});

export const {} = customersSlice.actions;
export default customersSlice.reducer;
export const selectAllCustomers = (state) => state.customers.customers;
