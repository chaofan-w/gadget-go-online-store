import * as React from "react";
import { Spinner } from "./Spinner";
import { useSelector, useDispatch } from "react-redux";
import { Box, Stack, Paper, Typography } from "@mui/material";
import {
  selectAllProducts,
  fetchProducts,
} from "../features/products/productsSlice";
import {
  selectAllCategories,
  fetchCategories,
} from "../features/categories/categoriesSlice";

import ProductDetailCard from "./productDetailPage";
import {
  fetchBodyLocations,
  selectAllBodyLocations,
} from "../features/body_locations/bodyLocationsSlice";

const ProductsPage = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectAllProducts);
  const categories = useSelector(selectAllCategories);
  const error = useSelector((state) => state.products.error);
  const productsStatus = useSelector((state) => state.products.status);
  const categoriesStatus = useSelector((state) => state.categories.status);
  const bodyLocationsStatus = useSelector(
    (state) => state.body_locations.status
  );
  const body_locations = useSelector(selectAllBodyLocations);
  console.log(categories);
  console.log(body_locations);

  React.useEffect(() => {
    async function fetchData() {
      if (productsStatus === "idle") {
        const response = await fetchProducts();
        dispatch(response);
      }
    }
    async function fetchCateData() {
      if (categoriesStatus === "idle") {
        const response = await fetchCategories();
        dispatch(response);
      }
    }
    async function fetchBodyData() {
      if (bodyLocationsStatus === "idle") {
        const response = await fetchBodyLocations();
        dispatch(response);
      }
    }
    const main = async () => {
      await fetchData();
      await fetchCateData();
      await fetchBodyData();
    };
    main();
  }, []);

  let content;
  if (productsStatus === "loading") {
    content = <Spinner text="Loading..." />;
  } else if (productsStatus === "succeeded") {
    content = products ? (
      // && categories
      <Box sx={{ width: "100%" }}>
        <Paper>
          <Typography>Products Listing Page</Typography>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="flex-start"
            sx={{
              flexWrap: "wrap",
              width: "100%",
              height: "auto",
              gap: 2,
            }}
          >
            {products.map((product) => (
              <ProductDetailCard
                key={product._id}
                product={product}
                categories={categories}
                body_locations={body_locations}
              />
            ))}
          </Stack>
        </Paper>
      </Box>
    ) : (
      <div>{error}</div>
    );
  } else {
    console.log(error);
    content = <div>{error}</div>;
  }

  return <div>{content}</div>;
};

export default ProductsPage;
