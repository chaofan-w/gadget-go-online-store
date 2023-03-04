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
import {
  Box,
  Stack,
  Paper,
  Typography,
  Snackbar,
  Alert,
  IconButton,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import MuiAlert from "@mui/material/Alert";
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

import {
  selectNotifications,
  notificationClosed,
  notificationDisplayed,
} from "./features/notifications/notificationsSlice";

import CheckoutMain from "./pages/checkout/CheckoutNavBar";
import CartSummary from "./pages/checkout/CartSummary";
import Checkout from "./pages/checkout/Checkout";
import Payment from "./pages/checkout/Payment";
import OrderReview from "./pages/checkout/Review";
import Confirmation from "./pages/checkout/Confirmation";

import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import CheckoutNavBar from "./pages/checkout/CheckoutNavBar";

import { CheckoutContextProvider } from "./pages/checkout/CheckoutContext";

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

  // const [displayAlert, setDisplayAlert] = React.useState(false);
  const Alert = React.forwardRef(function Alert(props, ref) {
    return (
      <MuiAlert
        elevation={6}
        ref={ref}
        variant="filled"
        sx={{ zIndex: 10, width: "50%", minWidth: 360 }}
        {...props}
      />
    );
  });
  const notification = useSelector(selectNotifications);
  const notificationsStatus = useSelector(
    (state) => state.notifications.status
  );

  // console.log(notification);

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
        <Route path="/checkout" element={<CheckoutNavBar />} />
        {/* <Route path="summary" element={<CartSummary />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="payment" element={<Payment />} />
          <Route path="orderreview" element={<OrderReview />} />
          <Route path="confirmation" element={<Confirmation />} /> */}
        {/* </Route> */}
      </Routes>
      {notification && notification.text && (
        <Snackbar
          open={notification.text.length > 0}
          sx={{
            width: "50%",
            color: (theme) => theme.palette.white,
            zIndex: 200,
          }}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          action={
            <IconButton
              size="small"
              color="inherit"
              onClick={() => {
                const response = dispatch(notificationClosed);
                return response;
              }}
            >
              <Close fontSize="small" />
            </IconButton>
          }
        >
          <Alert
            variant="filled"
            severity={notification.severity}
            onClose={(e, reason) => {
              if (reason === "clickaway") {
                return;
              }
              dispatch(notificationClosed());
            }}
            sx={{
              width: "100%",
              color: (theme) => theme.palette.white,
            }}
          >
            {notification.text}
          </Alert>
        </Snackbar>
      )}
    </Router>
  );
}

export default App;
