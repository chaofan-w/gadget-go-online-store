import * as React from "react";
import TextField from "@mui/material/TextField";
import { Box, Typography, Popper } from "@mui/material";
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
    font-family: "Roboto";
    border: none !important;
  }
`;

export default function AutocompleteInput({
  suggestions,
  searchValue,
  setSearchValue,
  setSuggestions,
  products,
}) {
  const handleSearchValueChange = (e, newValue) => {
    setSearchValue(newValue);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  // const CustomPopper = (props) => {
  //   return <Popper {...props} placement="bottom" popperOptions />;
  // };
  // usage of getOptionLabel, getOptionSelected(updated to isOptionEqualToValue)
  // https://stackoverflow.com/questions/62494672/what-is-getoptionselected-and-getoptionlabel-in-material-ui-with-an-example

  return (
    <Box
      sx={{
        flex: 1,
        height: 40,
        m: 0,
        p: 0,
      }}
    >
      <StyledAutocomplete
        value={searchValue}
        onChange={handleSearchValueChange}
        onFocus={(e) => {
          e.stopPropagation();
          if (suggestions.length === 0) {
            setSuggestions(
              products.map((product) => {
                return {
                  id: product._id,
                  name: product.name,
                  category: product.category,
                };
              })
            );
          }
        }}
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
        // To change the style of dropdown options: leverage ListBoxProps, and the "& li" as key, to change the style in the value object
        ListboxProps={{
          sx: {
            "& li": {
              fontFamily: "Roboto",
              fontSize: "12px",
              color: "primary.main",
            },
          },
        }}
        // PopperComponent={CustomPopper}
      />
    </Box>
  );
}
