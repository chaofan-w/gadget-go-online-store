import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import styled from "styled-components";

const StyledSelect = styled(Select)`
  & .MuiFilledInput-input {
    padding: 10px 10px 10px 10px;
  }
`;

const LightTooltip = styled.div`
  & .MuiTooltip-popper {
    background-color: white;
    color: black;
    border-radius: 10%;
  }
`;

export default function CategorySelect({
  categories,
  categoryId,
  setCategoryId,
  products,
  suggestionPool,
  suggestions,
  setSuggestions,
  setSearchValue,
}) {
  const handleChange = (event) => {
    setCategoryId(event.target.value);
    setSuggestions(
      suggestionPool.filter((suggestion) => {
        if (event.target.value === 0) {
          setSearchValue("");
          return suggestion.category;
        } else {
          setSearchValue("");
          return suggestion.category === event.target.value;
        }
      })
    );
  };

  return (
    <FormControl
      variant="filled"
      sx={{
        width: "fit-content",
        height: 40,
        m: 0,
        p: 0,
      }}
    >
      <LightTooltip title="Search in">
        <StyledSelect
          disableUnderline
          labelId="search-bar-category-select"
          id="category-select"
          value={categoryId}
          label="category"
          onChange={handleChange}
          sx={{
            height: 40,
            m: 0,
            p: 0,
            width: "fit-content",
            fontSize: 12,
            // border: "1px solid red",
          }}
        >
          <MenuItem value={0} sx={{ fontSize: 15 }}>
            All
          </MenuItem>
          {categories &&
            categories.map((category) => (
              <MenuItem
                key={`category-${category._id}`}
                value={category._id}
                sx={{ fontSize: 15 }}
              >
                {category.category}
              </MenuItem>
            ))}
        </StyledSelect>
      </LightTooltip>
    </FormControl>
  );
}
