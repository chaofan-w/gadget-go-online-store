import * as React from "react";
// import { useSelector, useDispatch } from "react-redux";
// import styled from "styled-components";
// import {
//   fetchLoginCustomer,
//   selectLoginCustomer,
// } from "../../features/loginCustomer/loginCustomerSlice";
// import {
//   selectNotifications,
//   notificationClosed,
//   notificationDisplayed,
// } from "../../features/notifications/notificationsSlice";
// import { selectAllProducts } from "../../features/products/productsSlice";
// import { selectAllCarts, fetchCarts } from "../../features/carts/cartsSlice";
import { useNavigate } from "react-router-dom";
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
import { BiBody } from "react-icons/bi";
import { GoTasklist } from "react-icons/go";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Close } from "@mui/icons-material";
import AddToCartBtn from "../../components/AddToCartBtn";
const voucherCodeList = [
  { code: "SPRING15", discount: 0.85 },
  { code: "SUMMER25", discount: 0.75 },
  { code: "FALL30", discount: 0.7 },
  { code: "BLACKFRIDAY40", discount: 0.6 },
];

const CartSummary = ({
  dispatch,
  quantity,
  setQuantity,
  total,
  setTotal,
  discount,
  setDiscount,
  cart,
  products,
  allCartItemIds,
  productsInCart,
  selectedTab,
  setSelectedTab,
  handleNotification,
  productRemoved,
}) => {
  // const dispatch = useDispatch();
  // const [quantity, setQuantity] = React.useState(0);
  // const [total, setTotal] = React.useState(0);
  const [voucherCode, setVoucherCode] = React.useState("");
  const navigate = useNavigate();
  // const [discount, setDiscount] = React.useState(1);
  // const loginCustomer = useSelector(selectLoginCustomer);
  // const cart = useSelector(selectAllCarts);
  // const allCartItemIds = cart[0].products.reduce(
  //   (accum, curr) => accum.concat(curr.productId),
  //   []
  // );
  // const products = useSelector(selectAllProducts);
  // const productsInCart = products.filter((item) =>
  //   allCartItemIds.includes(item._id)
  // );
  // async function handleNotification({ text, severity }) {
  //   await dispatch(
  //     notificationDisplayed({
  //       notification: {
  //         text: text,
  //         severity: severity,
  //       },
  //     })
  //   );

  //   setTimeout(function () {
  //     dispatch(notificationClosed());
  //   }, 3000);
  // }

  React.useEffect(() => {
    setTotal(
      cart.length > 0
        ? cart[0].products.reduce(
            (accum, curr) => accum + curr.price * curr.quantity,
            0
          ) * discount
        : 0
    );
  }, [discount, cart]);

  return (
    <Grid container sx={{ width: "100%", minWidth: 360 }}>
      <Grid item xs={12} md={8}>
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
                bgcolor: "background.paper",
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
                onClick={async () => {
                  if (cart[0].products.length > 1) {
                    await dispatch(productRemoved({ product: product }));
                  } else {
                    await dispatch(productRemoved({ product: product }));
                    navigate("/");
                  }
                }}
              >
                <Close />
              </IconButton>
            </Grid>
          ))}
      </Grid>
      <Grid
        item
        xs={12}
        md={4}
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
            bgcolor: "background.paper",
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
              {/* {`$ ${(
                cart[0].products.reduce(
                  (accum, curr) => accum + curr.price * curr.quantity,
                  0
                ) * discount
              ).toFixed(2)}`} */}
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
          <TextField
            size="small"
            label={<Typography variant="body2">Voucher</Typography>}
            sx={{ width: "100%" }}
            value={voucherCode}
            onChange={(e) => setVoucherCode(e.currentTarget.value)}
          />
          <Button
            fullWidth
            variant="outlined"
            disabled={!voucherCode}
            onClick={async (e) => {
              e.preventDefault();
              if (discount < 1) {
                await handleNotification({
                  text: "Voucher can only be used once per order",
                  severity: "warning",
                });
                setVoucherCode("");
                return;
              }
              if (voucherCode) {
                const applicableVoucher = voucherCodeList.find(
                  (voucher) => voucher.code === voucherCode.toUpperCase()
                );
                if (applicableVoucher) {
                  setDiscount(applicableVoucher.discount);
                } else {
                  await handleNotification({
                    text: "Sorry, incorrect voucher code",
                    severity: "warning",
                  });
                }
              }
              setVoucherCode("");
            }}
          >
            Apply Voucher
          </Button>
          <Stack
            direction="row"
            justifyContent="space-between"
            sx={{
              width: "100%",
              height: "fit-content",
              py: 1,
              borderBottom: `1px solid lightgrey`,
              borderTop: `1px solid lightgrey`,
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
          <Button
            fullWidth
            variant="contained"
            onClick={() => setSelectedTab(selectedTab + 1)}
          >
            Procced To Shipping
          </Button>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default CartSummary;
