import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  productsFilter: { filterKey: "all", filterValue: "all", currPage: 1 },
  status: "idle",
  error: null,
};

// export const fetchBodyLocations = createAsyncThunk(
//   "body_locations/fetchBodyLocations",
//   async () => {
//     const response = await fetch("/api/bodylocations");
//     const bodyLocationsData = await response.json();
//     // console.log(bodyLocationsData);
//     return bodyLocationsData;
//   }
// );

const productsFilterSlice = createSlice({
  name: "productsFilter",
  initialState,
  reducers: {
    filterUpdated: (state, action) => {
      state.productsFilter.filterKey = action.payload.filterKey;
      state.productsFilter.filterValue = action.payload.filterValue;
      state.productsFilter.currPage = action.payload.currPage;
    },
    filterReset: (state, action) => {
      state.productsFilter.filterKey = "all";
      state.productsFilter.filterValue = "all";
      state.productsFilter.currPage = 1;
    },
  },
});

export const { filterUpdated, filterReset } = productsFilterSlice.actions;

export default productsFilterSlice.reducer;

export const selectAllProductsFilter = (state) =>
  state.productsFilter.productsFilter;
