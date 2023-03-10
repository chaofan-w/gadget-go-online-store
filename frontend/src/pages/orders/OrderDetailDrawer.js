import * as React from "react";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Typography,
  Stack,
  Grid,
  Button,
  SwipeableDrawer,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { selectAllProducts } from "../../features/products/productsSlice";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Transform } from "@mui/icons-material";
import WriteReview from "../../components/WriteReview";
import { selectAllCategories } from "../../features/categories/categoriesSlice";

const theme = createTheme({
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
  typography: {
    h1: {
      fontFamily: "Oswald",
    },
    h2: {
      fontFamily: "Oswald",
    },
    h3: {
      fontFamily: "Oswald",
    },
    caption: {
      fontFamily: "Roboto",
    },
    button: {
      fontFamily: "Lato",
    },
    body2: {
      fontFamily: "Roboto",
    },
    body1: {
      fontFamily: "Lato",
    },
    subtitle2: {
      fontFamily: "Raleway",
      fontWeight: 600,
    },
    subtitle1: {
      fontFamily: "Oswald",
      fontWeight: 600,
    },
    h4: {
      fontFamily: "Raleway",
      fontWeight: 700,
    },
    h5: {
      fontFamily: "Raleway",
      fontWeight: 700,
    },
    h6: {
      fontFamily: "Oswald",
      fontWeight: 700,
    },
  },
});

const OrderDetailDrawer = ({ order, orderId, loginCustomer }) => {
  const products = useSelector(selectAllProducts);
  const categories = useSelector(selectAllCategories);

  const {
    firstName,
    lastName,
    phone,
    address1,
    address2,
    city,
    state,
    postCode,
    country,
    cardName,
    cardNumber,
    discount,
    products: cart,
    total,
  } = order;

  const allCartItemIds =
    cart && cart.length > 0
      ? cart.reduce((accum, curr) => accum.concat(curr.productId), [])
      : [];
  const productsInCart = products.filter((item) =>
    allCartItemIds.includes(item._id)
  );

  const shippingAddress = [
    {
      title: "Name",
      value: `${firstName + " " + lastName}`,
    },
    {
      title: "Phone",
      value: phone,
    },

    {
      title: "Address",
      value: `${[address1, address2, city, state, country, postCode].join(
        " "
      )}`,
    },
  ];

  const anchor = "right";
  const [drawerState, setDrawerState] = React.useState({
    [anchor]: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setDrawerState({ ...drawerState, [anchor]: open });
  };

  const [productArg, setProductArg] = React.useState([]);

  return (
    <ThemeProvider theme={theme}>
      <Grid
        container
        sx={{
          width: "100%",
          minWidth: 360,
          position: "relative",
        }}
      >
        <Grid item xs={12} md={12} sx={{ height: "auto" }}>
          {productsInCart &&
            productsInCart.map((product) => (
              <Grid
                container
                key={`cartItem-${product._id}`}
                sx={{
                  height: "auto",
                  width: "100%",
                  minWidth: 360,
                  p: 0,
                  boxShadow:
                    "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
                  borderRadius: 2,
                  mb: 3,
                  position: "relative",
                }}
              >
                <Grid
                  item
                  xs={4}
                  sm={3}
                  md={4}
                  sx={{
                    height: "100%",
                    // border: "1px solid green",
                    p: 0,
                    minWidth: 120,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-start",
                      height: "100%",
                    }}
                  >
                    <img
                      src={product.imageSrc}
                      alt={`Id: ${product._id}`}
                      style={{ width: 100, height: 100 }}
                    />
                  </Box>
                </Grid>
                <Grid
                  item
                  xs={8}
                  sm={4}
                  md={4}
                  sx={{
                    height: 100,
                    // border: "1px solid green",
                    p: 0,
                  }}
                >
                  <Stack
                    direction="column"
                    justifyContent={"space-between"}
                    sx={{ height: "100%", py: 1 }}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        lineHeight: 1,
                        display: "flex",
                        alignItems: "center",
                        height: "100%",
                        // border: "1px solid green",
                      }}
                    >
                      {product.name}
                    </Typography>
                    <Button
                      variant="contained"
                      fullWidth
                      sx={{ p: 0 }}
                      onClick={async () => {
                        await setProductArg(product);
                        await setDrawerState({ [anchor]: true });
                      }}
                    >
                      <Typography variant="caption" sx={{ fontSize: "10px" }}>
                        Write a review
                      </Typography>
                    </Button>
                  </Stack>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={4}
                  md={4}
                  sx={{
                    height: { xs: 50, sm: 100 },
                    // border: "1px solid green",
                    p: 0,
                  }}
                >
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent={{ xs: "flex-end", sm: "space-between" }}
                    sx={{ height: "100%", p: 0 }}
                  >
                    <Stack
                      direction={{ xs: "row", sm: "column" }}
                      alignItems="flex-start"
                      justifyContent="flex-start"
                    >
                      <Typography
                        variant="subtitle2"
                        color="text.secondary"
                        sx={{ ml: 1 }}
                      >
                        {`$ ${
                          product.promotionPrice
                            ? product.promotionPrice
                            : product.price
                        } 
              `}
                      </Typography>
                      <Typography
                        variant="subtitle2"
                        color="text.secondary"
                        sx={{ ml: 1 }}
                      >
                        {` x ${
                          cart.find((item) => item.productId === product._id)
                            .quantity
                        }
              `}
                      </Typography>
                    </Stack>
                    <Stack
                      direction={{ xs: "row", sm: "column" }}
                      alignItems={{ xs: "center", sm: "flex-start" }}
                      sx={{ pr: 1 }}
                    >
                      <Typography
                        variant="caption"
                        sx={{ mr: 1, ml: { xs: 2, sm: 0 } }}
                      >
                        subtotal
                      </Typography>
                      <Typography variant="subtitle1">
                        {`$ ${
                          (product.promotionPrice
                            ? product.promotionPrice
                            : product.price) *
                          cart.find((item) => item.productId === product._id)
                            .quantity
                        }`}
                      </Typography>
                    </Stack>
                  </Stack>
                </Grid>
              </Grid>
            ))}
        </Grid>
        <Grid
          item
          xs={12}
          md={12}
          sx={{
            height: "fit-content",
            px: { xs: 0, md: 0 },
          }}
        >
          <Stack
            direction="column"
            alignItems={"flex-start"}
            justifyContent={"flex-start"}
            // spacing={2}
            sx={{
              height: "fit-content",
              boxShadow:
                "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
              borderRadius: 1,
              mb: 2,
              // border: "1px solid red",
              px: 2,
              py: 2,
            }}
          >
            {shippingAddress &&
              shippingAddress.map((addr) => (
                <Stack
                  key={addr.title}
                  direction="row"
                  justifyContent="space-between"
                  sx={{
                    width: "100%",
                    height: "fit-content",
                    py: 1,
                    borderBottom: `1px solid lightgrey`,
                  }}
                >
                  <Typography variant="body2">{`${addr.title}:`}</Typography>
                  <Typography variant="body2" textAlign={"right"}>
                    {addr.value}
                  </Typography>
                </Stack>
              ))}
          </Stack>
        </Grid>
        <Grid
          item
          xs={12}
          md={12}
          sx={{
            height: "fit-content",
            // px: { xs: 0, md: 2 },
          }}
        >
          <Stack
            direction="column"
            alignItems={"flex-start"}
            justifyContent={"flex-start"}
            // spacing={2}
            sx={{
              height: "fit-content",
              boxShadow:
                "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
              borderRadius: 1,
              mb: 2,
              // border: "1px solid red",
              px: 2,
              py: 2,
            }}
          >
            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{
                width: "100%",
                height: 40,
                py: 1,
                borderBottom: `1px solid lightgrey`,
              }}
            >
              <Typography variant="body2">Total:</Typography>
              <Typography variant="body2">
                {total}

                {discount < 1 && (
                  <Typography
                    variant="caption"
                    sx={{ textDecoration: "line-through", color: "red", ml: 1 }}
                  >
                    {`$${(total / discount).toFixed(2)}`}
                  </Typography>
                )}
              </Typography>
            </Stack>
            {discount < 1 && (
              <Stack
                direction="row"
                justifyContent="space-between"
                sx={{
                  width: "100%",
                  height: 40,
                  py: 1,
                  borderBottom: `1px solid lightgrey`,
                }}
              >
                <Typography variant="body2">Discount:</Typography>
                <Typography variant="body2">{`${(
                  (1 - discount) *
                  100
                ).toFixed()}%`}</Typography>
              </Stack>
            )}

            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{
                width: "100%",
                height: "fit-content",
                py: 1,
                borderBottom: `1px solid lightgrey`,
              }}
            >
              <Typography variant="body2">Tax:</Typography>
              <Stack
                direction="column"
                sx={{
                  width: "60%",
                }}
              >
                <Typography
                  variant="body2"
                  textAlign={"right"}
                >{`QST(9.975%): $${(total * 0.0975).toFixed(2)}`}</Typography>
                <Typography variant="body2" textAlign={"right"}>{`GST(5%): $${(
                  total * 0.05
                ).toFixed(2)}`}</Typography>
              </Stack>
            </Stack>
            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{
                width: "100%",
                height: 40,
                py: 1,
                borderBottom: `1px solid lightgrey`,
              }}
            >
              <Typography variant="body2">Grand Total:</Typography>
              <Typography variant="subtitle1" fontWeight={"medium"}>{`$${(
                total * 1.14975
              ).toFixed(2)}`}</Typography>
            </Stack>
          </Stack>
        </Grid>

        <SwipeableDrawer
          anchor={anchor}
          open={drawerState[anchor]}
          onClose={() => setDrawerState({ [anchor]: false })}
          onOpen={toggleDrawer(anchor, true)}
        >
          <Box
            sx={{
              minWidth: 360,
            }}
          >
            <WriteReview product={productArg} loginCustomer={loginCustomer} />
            {/* drawer */}
          </Box>
        </SwipeableDrawer>
      </Grid>
    </ThemeProvider>
  );
};

export default OrderDetailDrawer;
