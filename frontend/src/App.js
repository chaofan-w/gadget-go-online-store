import * as React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  Link,
} from "react-router-dom";
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
import {
  fetchLoginCustomer,
  selectLoginCustomer,
} from "./features/loginCustomer/loginCustomerSlice";
// const loginUserId = "63f513109c55023b48edaed7";
// const loginUserId = "63f513109c55023b48edaee2";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";

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
  const loginCustomerStatus = useSelector(
    (state) => state.loginCustomer.status
  );
  const loginCustomer = useSelector(selectLoginCustomer);

  React.useEffect(() => {
    async function fetchLoginCustomerData() {
      try {
        const loginCustomerFromLocalStorage = await JSON.parse(
          localStorage.getItem("loginCustomer")
        );

        if (loginCustomerFromLocalStorage) {
          console.log(loginCustomerFromLocalStorage);
          const response = await fetchLoginCustomer({
            email: loginCustomerFromLocalStorage["email"],
            password: loginCustomerFromLocalStorage["password"],
          });
          dispatch(response);
        }
      } catch (err) {
        console.log(err);
      }
    }
    fetchLoginCustomerData();
  }, []);

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
        if (loginCustomer.length > 0 && cartsStatus === "idle") {
          //### in the carts asyncthunk, within the callback there is
          // the argument of customerId needed. so pass the argument here
          const response = await fetchCarts(loginCustomer[0]._id);
          dispatch(response);
        }
      } catch (err) {
        console.log(err);
      }
    }
    fetchCartsData();
  }, [dispatch, cartsStatus, loginCustomer]);

  return (
    <Router>
      <PrimarySearchAppBar />
      <Routes>
        <Route path="/" element={<ProductsPage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
      </Routes>
    </Router>
  );
}

export default App;
