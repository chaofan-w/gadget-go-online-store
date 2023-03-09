import * as React from "react";
import { Spinner } from "../../components/Spinner";
import { useSelector, useDispatch } from "react-redux";
import { Box, Stack, Paper, Typography } from "@mui/material";
import { selectAllProducts } from "../../features/products/productsSlice";
import { selectAllCategories } from "../../features/categories/categoriesSlice";

import ProductDetailCard from "./productDetailPage";
import { selectAllBodyLocations } from "../../features/body_locations/bodyLocationsSlice";
import { selectAllReviews } from "../../features/reviews/reviewsSlice";
import { selectAllCarts } from "../../features/carts/cartsSlice";

const ProductsPage = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectAllProducts);
  const categories = useSelector(selectAllCategories);
  const error = useSelector((state) => state.products.error);
  const productsStatus = useSelector((state) => state.products.status);
  const body_locations = useSelector(selectAllBodyLocations);
  const reviews = useSelector(selectAllReviews);
  const carts = useSelector(selectAllCarts);

  let content;
  if (productsStatus === "loading") {
    content = <Spinner />;
  } else if (productsStatus === "succeeded") {
    content = products ? (
      // && categories
      <Box sx={{ width: "100%" }}>
        {/* <Paper
          variant={"outlined"}
          elevation={0}
          sx={{ bgcolor: "none", border: "1px solid red" }}
        > */}
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="flex-start"
          sx={{
            flexWrap: "wrap",
            width: "100%",
            height: "auto",
            gap: 4,
          }}
        >
          {products.map((product) => (
            <ProductDetailCard
              key={product._id}
              product={product}
              categories={categories}
              body_locations={body_locations}
              reviews={reviews}
              carts={carts}
            />
          ))}
        </Stack>
        {/* </Paper> */}
      </Box>
    ) : (
      <div>{error}</div>
    );
  } else {
    content = <div>{error}</div>;
  }

  return (
    <Box
      sx={{ width: "100%", minHeight: "100vh", p: 5, bgcolor: "primary.light" }}
    >
      {content}
    </Box>
  );
};

export default ProductsPage;
