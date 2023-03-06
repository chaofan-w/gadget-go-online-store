import * as React from "react";
import { postNewOrder } from "../../features/orders/ordersSlice";
import { useNavigate } from "react-router-dom";
import {
  cartCleared,
  cartProductsCleared,
} from "../../features/carts/cartsSlice";
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
  Divider,
  TextField,
  Button,
} from "@mui/material";

const Review = ({
  dispatch,
  total,
  discount,
  cart,
  products,
  handleNotification,
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
  productsInCart,
  productRemoved,
}) => {
  const navigate = useNavigate();
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
  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    const response = await postNewOrder({
      customerId: cart[0].customerId,
      products: cart[0].products,
      firstName: firstName,
      lastName: lastName,
      phone: phone,
      address1: address1,
      address2: address2 || "",
      city: city,
      state: state || "",
      postCode: postCode,
      country: country,
      cardName: cardName,
      cardNumber: cardNumber,
      discount: discount,
      total: total.toFixed(2),
    });

    await dispatch(response).then(async (result) => {
      if (result.payload.status === 200) {
        await handleNotification({
          text: result.payload.message,
          severity: "success",
        });
        await dispatch(cartProductsCleared());
        navigate("/");
      } else {
        await handleNotification({
          text: result.payload.message,
          severity: "error",
        });
      }
    });
  };

  return (
    <Grid
      container
      sx={{
        width: "100%",
        minWidth: 360,
      }}
      spacing={2}
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
            </Grid>
          ))}
      </Grid>
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          height: "fit-content",
          px: { xs: 0, md: 2 },
        }}
      >
        <Stack
          direction="column"
          alignItems={"flex-start"}
          justifyContent={"flex-start"}
          spacing={2}
          sx={{
            height: "fit-content",
            boxShadow:
              "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
            borderRadius: 1,
            mb: 3,
            // border: "1px solid red",
            px: 2,
            py: 3,
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
        md={6}
        sx={{
          height: "fit-content",
          // px: { xs: 0, md: 2 },
        }}
      >
        <Stack
          direction="column"
          alignItems={"flex-start"}
          justifyContent={"flex-start"}
          spacing={2}
          sx={{
            height: "fit-content",
            boxShadow:
              "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
            borderRadius: 1,
            mb: 3,
            // border: "1px solid red",
            px: 2,
            py: 3,
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
              {`$${total.toFixed(2)}`}

              {discount < 1 && (
                <Typography
                  variant="caption"
                  sx={{ textDecoration: "line-through", color: "red", ml: 1 }}
                >
                  {/* {cart[0].products
                  .reduce(
                    (accum, curr) => accum + curr.price * curr.quantity,
                    0
                  )
                  .toFixed(2)} */}
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
          <Button fullWidth variant="contained" onClick={handleSubmitOrder}>
            submit
          </Button>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default Review;
