import * as React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import CategorySelect from "./CategorySelect";
import { Box, Paper, InputBase, Divider, IconButton } from "@mui/material";
import { useSelector, dispatch } from "react-redux";
import { selectAllCategories } from "../../features/categories/categoriesSlice";
import { selectAllProducts } from "../../features/products/productsSlice";
import AutocompleteInput from "./DropDownSuggestions";

export default function SearchBar() {
  const categories = useSelector(selectAllCategories);
  const [categoryId, setCategoryId] = React.useState(0);
  const products = useSelector(selectAllProducts);
  const suggestionPool = products.map((product) => {
    return { id: product._id, name: product.name, category: product.category };
  });
  const [suggestions, setSuggestions] = React.useState(suggestionPool);
  const [searchValue, setSearchValue] = React.useState("");

  console.log(suggestions);
  console.log(searchValue);

  React.useEffect(() => {
    const generateSuggestionPool = async () => {
      await setSuggestions(suggestionPool);
    };
    generateSuggestionPool();
  }, []);

  return (
    <Paper
      component="form"
      elevation={0}
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        minWidth: 300,
        height: 40,
        ml: 2,
        p: 0,
      }}
    >
      <Box
        sx={{
          width: "fit-content",
          height: 40,
          bgcolor: "primary.light",
          border: "none",
        }}
      >
        <CategorySelect
          categories={categories}
          categoryId={categoryId}
          setCategoryId={setCategoryId}
          products={products}
          setSuggestions={setSuggestions}
          suggestions={suggestions}
          suggestionPool={suggestionPool}
          setSearchValue={setSearchValue}
        />
      </Box>

      {/* <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search Your Product"
        inputProps={{ "aria-label": "search google maps" }}
        value={searchWord}
        onChange={handleSearchWord}
      /> */}
      <AutocompleteInput
        suggestions={suggestions}
        setSearchValue={setSearchValue}
        searchValue={searchValue}
      />
      {/* <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" /> */}
      <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}
