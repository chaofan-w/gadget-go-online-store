import * as React from "react";
import { Spinner } from "./Spinner";
import { useSelector, useDispatch } from "react-redux";
import { Box, Stack, Paper, Typography } from "@mui/material";
import { selectAllProducts } from "../features/products/productsSlice";
import { selectAllCategories } from "../features/categories/categoriesSlice";

import ProductDetailCard from "./productDetailPage";
import { selectAllBodyLocations } from "../features/body_locations/bodyLocationsSlice";
import { selectAllReviews } from "../features/reviews/reviewsSlice";
import { selectAllCarts } from "../features/carts/cartsSlice";

const ProductsPage = ({ loginUserId }) => {
  const dispatch = useDispatch();
  const products = useSelector(selectAllProducts);
  const categories = useSelector(selectAllCategories);
  const error = useSelector((state) => state.products.error);
  const productsStatus = useSelector((state) => state.products.status);
  const body_locations = useSelector(selectAllBodyLocations);
  const reviews = useSelector(selectAllReviews);
  const carts = useSelector(selectAllCarts);

  // React.useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       if (productsStatus === "idle") {
  //         const response = await fetchProducts();
  //         dispatch(response);
  //       }
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }
  //   fetchData();
  // }, [dispatch, productsStatus]);

  // React.useEffect(() => {
  //   async function fetchCateData() {
  //     try {
  //       if (categoriesStatus === "idle") {
  //         const response = await fetchCategories();
  //         dispatch(response);
  //       }
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }
  //   fetchCateData();
  // }, [dispatch, categoriesStatus]);
  // React.useEffect(() => {
  //   async function fetchReviewsData() {
  //     try {
  //       if (reviewsStatus === "idle") {
  //         const response = await fetchReviews();
  //         dispatch(response);
  //       }
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }
  //   fetchReviewsData();
  // }, [dispatch, reviewsStatus]);

  // React.useEffect(() => {
  //   async function fetchBodyData() {
  //     try {
  //       if (bodyLocationsStatus === "idle") {
  //         const response = await fetchBodyLocations();
  //         dispatch(response);
  //       }
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }
  //   fetchBodyData();
  // }, [dispatch, bodyLocationsStatus]);

  // React.useEffect(() => {
  //   async function fetchCartsData() {
  //     try {
  //       if (cartsStatus === "idle") {
  //         //### in the carts asyncthunk, within the callback there is
  //         // the argument of customerId needed. so pass the argument here
  //         const response = await fetchCarts(loginUserId);
  //         dispatch(response);
  //       }
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }
  //   fetchCartsData();
  // }, [dispatch, cartsStatus]);

  // console.log(reviews);

  let content;
  if (productsStatus === "loading") {
    content = <Spinner text="Loading..." />;
  } else if (productsStatus === "succeeded") {
    content = products ? (
      // && categories
      <Box sx={{ width: "100%" }}>
        <Paper>
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
        </Paper>
      </Box>
    ) : (
      <div>{error}</div>
    );
  } else {
    content = <div>{error}</div>;
  }

  return <Box>{content}</Box>;
};

export default ProductsPage;
