import * as React from "react";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import styled from "styled-components";

const StyledAutocomplete = styled(Autocomplete)`
  & input#autocomplete-input {
    border: none;
    transform: translateY(-6px);
  }
  & .MuiAutocomplete-inputRoot {
    height: 40px;
    font-size: 14px;
    border: none !important;
  }
`;

export default function AutocompleteInput({
  suggestions,
  searchValue,
  setSearchValue,
}) {
  const handleSearchValueChange = (e, newValue) => {
    setSearchValue(newValue);
  };

  // usage of getOptionLabel, getOptionSelected
  // https://stackoverflow.com/questions/62494672/what-is-getoptionselected-and-getoptionlabel-in-material-ui-with-an-example

  return (
    <Box sx={{ flex: 1, height: 40, m: 0, p: 0 }}>
      <StyledAutocomplete
        value={searchValue}
        onChange={handleSearchValueChange}
        freeSolo
        id="autocomplete-input"
        // disableClearable
        handleHomeEndKeys
        options={suggestions}
        getOptionLabel={(option) => (option ? option.name : "")}
        isOptionEqualToValue={(option, value) => option.name === value.name}
        renderInput={(params) => (
          <TextField
            {...params}
            // InputProps={{
            //   ...params.InputProps,
            //   "aria-label": "search product name",
            //   type: "search",
            // }}
            // hiddenLabel
          />
        )}
      />
    </Box>
  );
}
