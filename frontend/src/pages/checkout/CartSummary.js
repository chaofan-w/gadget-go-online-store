import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
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
import {
  Box,
  Typography,
  Card,
  CardHeader,
  IconButton,
  Stack,
  CardMedia,
  CardContent,
  CardActions,
  Grid,
  Paper,
} from "@mui/material";
import { BiBody } from "react-icons/bi";
import { GoTasklist } from "react-icons/go";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Close } from "@mui/icons-material";
import AddToCartBtn from "../../components/AddToCartBtn";

const CartSummary = () => {
  const [quantity, setQuantity] = React.useState(0);
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
  return (
    <Box sx={{ height: "auto" }}>
      {productsInCart &&
        productsInCart.map((product) => (
          <Grid
            container
            key={`cartItem-${product._id}`}
            sx={{
              height: "fit-content",
              width: "100%",
              minWidth: 300,
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
              xs={3}
              sm={3}
              md={2}
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
              xs={6}
              sm={4}
              md={3}
              sx={{
                height: 100,
                // border: "1px solid green",
                p: 0,
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  lineHeight: 1.5,
                  display: "flex",
                  alignItems: "center",
                  height: "100%",
                  // border: "1px solid green",
                }}
              >
                {product.name}
              </Typography>
            </Grid>
            <Grid
              item
              xs={8}
              sm={4}
              md={3}
              sx={{
                height: 100,
                // border: "1px solid green",
                p: 0,
              }}
            >
              <Stack
                direction="row"
                alignItems="center"
                justifyContent={"space-between"}
                sx={{ height: "100%" }}
              >
                <Stack
                  direction="column"
                  alignItems="flex-start"
                  justifyContent="flex-start"
                >
                  <Typography
                    variant="subtitle2"
                    color="text.secondary"
                    sx={{ ml: 2 }}
                  >
                    {`$ ${
                      product.promotionPrice
                        ? product.promotionPrice
                        : product.price
                    } x ${
                      cart[0].products.find(
                        (item) => item.productId === product._id
                      ).quantity
                    }
                `}
                  </Typography>
                  <Box sx={{ width: "50%" }}>
                    <AddToCartBtn
                      carts={cart}
                      quantity={quantity}
                      setQuantity={setQuantity}
                      product={product}
                    />
                  </Box>
                </Stack>
                <Stack direction={"column"}>
                  <Typography variant="caption" sx={{ mr: 2 }}>
                    subtotal
                  </Typography>
                  <Typography variant="subtitle1">
                    {`$ ${
                      (product.promotionPrice
                        ? product.promotionPrice
                        : product.price) *
                      cart[0].products.find(
                        (item) => item.productId === product._id
                      ).quantity
                    }`}
                  </Typography>
                </Stack>
              </Stack>
            </Grid>

            <IconButton
              sx={{
                position: "absolute",
                top: 2,
                right: 2,
              }}
            >
              <Close />
            </IconButton>
          </Grid>
        ))}
    </Box>
  );
};

export default CartSummary;
