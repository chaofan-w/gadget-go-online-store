import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchLoginCustomer,
  selectLoginCustomer,
} from "../../features/loginCustomer/loginCustomerSlice";
import {
  selectNotifications,
  notificationClosed,
  notificationDisplayed,
} from "../../features/notifications/notificationsSlice";
import { selectAllProducts } from "../../features/products/productsSlice";
import { selectAllCarts, fetchCarts } from "../../features/carts/cartsSlice";
// https://dev.to/tywenk/how-to-use-nested-routes-in-react-router-6-4jhd
//React Router provides a component called Outlet that renders a route's child component. <Outlet /> behaves a bit like props.children in standard React. <Outlet /> is the placeholder location for where the nested children routes will be rendered.
import { Outlet } from "react-router-dom";
import { Box, Tabs, Tab, CssBaseline, Grid, Paper } from "@mui/material";
import CartSummary from "./CartSummary";
import Checkout from "./Checkout";
import Payment from "./Payment";
import OrderReview from "./Review";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import styled from "styled-components";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`checkout-${index}`}
      aria-labelledby={`checkout-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </Box>
  );
}

const theme = createTheme({
  typography: {
    fontFamily: ["Lato", "Oswald", "Roboto"],
  },
  palette: {
    mode: "light",
    primary: {
      main: "#6e5b98",
      light: "#cec2dc",
      dark: "#2b2839",
    },
    secondary: {
      main: "#a9729b",
      dark: "#844881",
      light: "#f3d0ea",
    },
    background: {
      default: "rgba(255,255,255,0.8)",
      paper: "#f3f0f9",
    },
    info: {
      main: "#5a21f3",
    },
  },
});

const CheckoutNavBar = () => {
  const [selectedTab, setSelectedTab] = React.useState(0);
  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };
  const dispatch = useDispatch();
  const [quantity, setQuantity] = React.useState(0);
  const [total, setTotal] = React.useState(0);
  const [discount, setDiscount] = React.useState(1);
  const loginCustomer = useSelector(selectLoginCustomer);
  const cart = useSelector(selectAllCarts);
  const allCartItemIds = cart[0].products.reduce(
    (accum, curr) => accum.concat(curr.productId),
    []
  );
  const products = useSelector(selectAllProducts);
  const productsInCart = products.filter((item) =>
    allCartItemIds.includes(item._id)
  );

  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [address1, setAddress1] = React.useState("");
  const [address2, setAddress2] = React.useState("");
  const [city, setCity] = React.useState("");
  const [state, setState] = React.useState("");
  const [postCode, setPostCode] = React.useState("");
  const [country, setCountry] = React.useState("");

  const [cardName, setCardName] = React.useState("");
  const [cardNumber, setCardNumber] = React.useState("");
  const [expDate, setExpDate] = React.useState("");
  const [cvv, setCvv] = React.useState("");

  async function handleNotification({ text, severity }) {
    await dispatch(
      notificationDisplayed({
        notification: {
          text: text,
          severity: severity,
        },
      })
    );

    setTimeout(function () {
      dispatch(notificationClosed());
    }, 3000);
  }
  const tablist = [
    {
      tab: "Cart",
      page: (
        <CartSummary
          dispatch={dispatch}
          quantity={quantity}
          setQuantity={setQuantity}
          total={total}
          setTotal={setTotal}
          discount={discount}
          setDiscount={setDiscount}
          cart={cart}
          products={products}
          allCartItemIds={allCartItemIds}
          productsInCart={productsInCart}
          handleNotification={handleNotification}
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
        />
      ),
    },
    {
      tab: "Shipping",
      page: (
        <Checkout
          firstName={firstName}
          setFirstName={setFirstName}
          lastName={lastName}
          setLastName={setLastName}
          phone={phone}
          setPhone={setPhone}
          address1={address1}
          setAddress1={setAddress1}
          address2={address2}
          setAddress2={setAddress2}
          city={city}
          setCity={setCity}
          state={state}
          setState={setState}
          postCode={postCode}
          setPostCode={setPostCode}
          country={country}
          setCountry={setCountry}
          handleNotification={handleNotification}
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
        />
      ),
    },
    {
      tab: "Payment",
      page: (
        <Payment
          cardName={cardName}
          setCardName={setCardName}
          cardNumber={cardNumber}
          setCardNumber={setCardNumber}
          expDate={expDate}
          setExpDate={setExpDate}
          cvv={cvv}
          setCvv={setCvv}
          handleNotification={handleNotification}
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
        />
      ),
    },
    { tab: "Order", page: <OrderReview /> },
  ];

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          bgcolor: "background.paper",
          display: "flex",
          flexDirection: { xs: "row", sm: "column" },
          height: "fit-content",
          pt: 5,
          minWidth: 50,
          m: 0,
        }}
      >
        <StyledTabs
          sx={{
            borderRight: { xs: 1, sm: "none" },
            borderColor: { xs: "divider", sm: "none" },
          }}
          value={selectedTab}
          onChange={handleTabChange}
          aria-label="checkout stages"
          scrollButtons={false}
        >
          {tablist &&
            tablist.map((tab, index) => (
              <Tab
                key={`tab-${tab.tab}`}
                label={tab.tab}
                sx={{
                  bgcolor: selectedTab === index ? "primary.light" : "none",
                  borderRight: {
                    xs: selectedTab === index ? 3 : 0,
                    sm: "none",
                  },
                }}
              />
            ))}
        </StyledTabs>
        <Box sx={{ flex: { xs: 1 } }}>
          {tablist &&
            tablist.map((tab, index) => (
              <TabPanel
                key={`tabpanel-${tab.tab}`}
                value={selectedTab}
                index={index}
                sx={{
                  width: { xs: "100%", sm: "90%" },
                  height: { xs: "auto", md: "100vh" },
                  // minHeight: "95%",
                  mx: "auto",
                }}
              >
                {tab.page}
              </TabPanel>
            ))}
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default CheckoutNavBar;

const StyledTabs = styled(Tabs)`
  margin-left: auto;
  margin-right: auto;
  flex-direction: row !important;
  && .MuiTabs-flexContainer {
    @media (max-width: 600px) {
      flex-direction: column !important;
    }
  }
`;
