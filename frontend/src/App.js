import React from "react";
import PrimarySearchAppBar from "./components/Header";
import ProductsPage from "./components/ProductsPage";
import { useSelector, useDispatch } from "react-redux";
import { Box, Stack, Paper, Typography } from "@mui/material";
import {
  selectAllProducts,
  fetchProducts,
} from "./features/products/productsSlice";
import {
  selectAllCategories,
  fetchCategories,
} from "./features/categories/categoriesSlice";

import ProductDetailCard from "./components/productDetailPage";
import {
  fetchBodyLocations,
  selectAllBodyLocations,
} from "./features/body_locations/bodyLocationsSlice";
import {
  fetchReviews,
  selectAllReviews,
} from "./features/reviews/reviewsSlice";
import { selectAllCarts, fetchCarts } from "./features/carts/cartsSlice";
// const loginUserId = "63f513109c55023b48edaed7";
const loginUserId = "63f513109c55023b48edaee2";

function App() {
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
  const reviews = useSelector(selectAllReviews);
  const reviewsStatus = useSelector((state) => state.reviews.status);
  const carts = useSelector(selectAllCarts);
  const cartsStatus = useSelector((state) => state.carts.status);

  React.useEffect(() => {
    async function fetchData() {
      try {
        if (productsStatus === "idle") {
          const response = await fetchProducts();
          dispatch(response);
        }
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, [dispatch, productsStatus]);

  React.useEffect(() => {
    async function fetchCateData() {
      try {
        if (categoriesStatus === "idle") {
          const response = await fetchCategories();
          dispatch(response);
        }
      } catch (err) {
        console.log(err);
      }
    }
    fetchCateData();
  }, [dispatch, categoriesStatus]);
  React.useEffect(() => {
    async function fetchReviewsData() {
      try {
        if (reviewsStatus === "idle") {
          const response = await fetchReviews();
          dispatch(response);
        }
      } catch (err) {
        console.log(err);
      }
    }
    fetchReviewsData();
  }, [dispatch, reviewsStatus]);

  React.useEffect(() => {
    async function fetchBodyData() {
      try {
        if (bodyLocationsStatus === "idle") {
          const response = await fetchBodyLocations();
          dispatch(response);
        }
      } catch (err) {
        console.log(err);
      }
    }
    fetchBodyData();
  }, [dispatch, bodyLocationsStatus]);

  React.useEffect(() => {
    async function fetchCartsData() {
      try {
        if (cartsStatus === "idle") {
          //### in the carts asyncthunk, within the callback there is
          // the argument of customerId needed. so pass the argument here
          const response = await fetchCarts(loginUserId);
          dispatch(response);
        }
      } catch (err) {
        console.log(err);
      }
    }
    fetchCartsData();
  }, [dispatch, cartsStatus]);

  return (
    <Box>
      <PrimarySearchAppBar />
      <ProductsPage loginUserId={loginUserId} />
    </Box>
  );
}

export default App;
