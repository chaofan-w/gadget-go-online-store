import * as React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import CategorySelect from "./CategorySelect";
import { Box, Paper, InputBase, Divider, IconButton } from "@mui/material";
import { useSelector, dispatch } from "react-redux";
import { selectAllCategories } from "../../features/categories/categoriesSlice";
import { selectAllProducts } from "../../features/products/productsSlice";
import AutocompleteInput from "./DropDownSuggestions";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
  const categories = useSelector(selectAllCategories);
  const [categoryId, setCategoryId] = React.useState(0);
  // const products = useSelector(selectAllProducts);
  const [products, setProducts] = React.useState([]);
  const [suggestions, setSuggestions] = React.useState([]);
  const suggestionPool = products.map((product) => {
    return { id: product._id, name: product.name, category: product.category };
  });

  const [searchValue, setSearchValue] = React.useState("");
  const navigate = useNavigate();

  const handleSearchProductById = () => {
    if (searchValue) {
      navigate(`/products/${searchValue.id}`);
      setSearchValue("");
    }
  };

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/products");
      const productsData = await response.json();
      if (productsData.status === 200) {
        setProducts(productsData.data);
      }
    };
    fetchData();
  }, []);

  // console.log(searchValue);

  return (
    <Paper
      component="form"
      elevation={0}
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        minWidth: { xs: 200, sm: 300, md: 360 },
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

      <AutocompleteInput
        suggestions={suggestions}
        setSearchValue={setSearchValue}
        searchValue={searchValue}
        setSuggestions={setSuggestions}
        products={products}
        suggestionPool={suggestionPool}
      />
      {/* <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" /> */}
      <IconButton
        type="button"
        sx={{ p: "10px" }}
        aria-label="search"
        onClick={handleSearchProductById}
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}
