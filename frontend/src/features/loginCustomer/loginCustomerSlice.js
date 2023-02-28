import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  loginCustomer: [],
  status: "idle",
  error: null,
};

export const fetchLoginCustomer = createAsyncThunk(
  "loginCustomer/fetchLoginCustomer",
  async ({ email, password }) => {
    const response = await fetch(`api/customers/login/${email}/${password}`);
    const loginCustomerData = response.json();
    return loginCustomerData;
  }
);

const loginCustomerSlice = createSlice({
  name: "loginCustomer",
  initialState,
  reducers: {
    customerLogout: (state, action) => {
      state.loginCustomer = [];
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchLoginCustomer, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchLoginCustomer.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.loginCustomer =
          action.payload.status === 200 ? action.payload.data : [];
        state.error = action.payload.message && action.payload.message;
      })
      .addCase(fetchLoginCustomer.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.message;
      });
  },
});

export const { customerLogout } = loginCustomerSlice.actions;
export default loginCustomerSlice.reducer;
export const selectLoginCustomer = (state) => state.loginCustomer.loginCustomer;
