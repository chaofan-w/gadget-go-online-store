import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  companies: [],
  status: "idle",
  error: null,
};

export const fetchCompanies = createAsyncThunk(
  "companies/fetchCompanies",
  async () => {
    const response = await fetch("/api/companies");
    const companiesData = await response.json();
    // console.log(bodyLocationsData);
    return companiesData;
  }
);

const companiesSlice = createSlice({
  name: "companies",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCompanies.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchCompanies.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.companies =
          action.payload.status === 200 ? action.payload.data : null;
        state.error = action.payload.message && action.payload.message;
      })
      .addCase(fetchCompanies.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.message;
      });
  },
});

export const {} = companiesSlice.actions;

export default companiesSlice.reducer;

export const selectAllCompanies = (state) => state.companies.companies;
