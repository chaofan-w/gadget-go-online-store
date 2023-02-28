import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  customers: [],
  status: "idle",
  error: null,
};

const customersSlice = createSlice({
  name: "customers",
  initialState,
  reducers: {},
});

export const {} = customersSlice.actions;
export default customersSlice.reducer;
export const selectAllCustomers = (state) => state.customers.customers;
