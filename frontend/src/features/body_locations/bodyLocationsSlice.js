import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  body_locations: [],
  status: "idle",
  error: null,
};

export const fetchBodyLocations = createAsyncThunk(
  "body_locations/fetchBodyLocations",
  async () => {
    const response = await fetch("/api/bodylocations");
    const bodyLocationsData = await response.json();
    console.log(bodyLocationsData);
    return bodyLocationsData;
  }
);

const bodyLocationsSlice = createSlice({
  name: "body_locations",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchBodyLocations.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchBodyLocations.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.body_locations =
          action.payload.status === 200 ? action.payload.data : null;
        state.error = action.payload.message && action.payload.message;
      })
      .addCase(fetchBodyLocations.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.message;
      });
  },
});

export const {} = bodyLocationsSlice.actions;

export default bodyLocationsSlice.reducer;

export const selectAllBodyLocations = (state) =>
  state.body_locations.body_locations;
