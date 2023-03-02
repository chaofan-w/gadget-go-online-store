import * as React from "react";
import { AddBox, IndeterminateCheckBox } from "@mui/icons-material";
import { Box, Stack, IconButton, Typography, Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import {
  selectAllCarts,
  increment,
  decrement,
  productAdded,
} from "../features/carts/cartsSlice";
import { selectLoginCustomer } from "../features/loginCustomer/loginCustomerSlice";
import {
  notificationClosed,
  notificationDisplayed,
} from "../features/notifications/notificationsSlice";
const AddToCartBtn = ({ product }) => {
  const dispatch = useDispatch();
  const loginCustomer = useSelector(selectLoginCustomer);
  //  use the useSelector hook to update the quantity, everytime the state updates, the quantity will updates accordingly and re-render in component
  const error = useSelector((state) => state.carts.error);
  const quantity = useSelector((state) => {
    if (state.carts.carts.length > 0) {
      const itemInCart = state.carts.carts[0].products.find(
        (item) => item.productId === product._id
      );
      if (itemInCart) {
        return itemInCart.quantity;
      }
    }
    return 0;
  });

  const handleNotification = async () => {
    if (product.numInStock && quantity === product.numInStock) {
      await dispatch(
        notificationDisplayed({
          notification: {
            text: "you have reached the number of stock for this product",
            severity: "warning",
          },
        })
      );

      setTimeout(function () {
        dispatch(notificationClosed());
      }, 3000);
    }
  };

  // React.useEffect(() => {
  //   if (product.numInStock && quantity === product.numInStock) {
  //     dispatch(
  //       notificationDisplayed({
  //         notification: {
  //           text: "you have reached the number of stock for this product",
  //           severity: "warning",
  //         },
  //       })
  //     );
  //   }
  // }, [quantity]);

  return (
    <Box
      sx={{
        width: "100%",
        minWidth: 100,
        height: 40,
        // border: "1px solid red",
        p: 0,
      }}
    >
      {quantity === 0 && (
        <Button
          type="button"
          variant="contained"
          sx={{ width: "100%", height: "100%", p: 0 }}
          disabled={product.numInStock === 0}
          onClick={async () => {
            //use action creator 'productAdded' to create action Object in dispatch
            if (loginCustomer.length > 0) {
              await dispatch(productAdded({ product: product }));
            } else {
              await dispatch(
                notificationDisplayed({
                  notification: {
                    text: "Please login to add items to cart.",
                    severity: "warning",
                  },
                })
              );
            }
          }}
        >
          <Typography variant="caption">
            {product.numInStock === 0 ? "OUT OF STOCK" : "ADD TO CART"}
          </Typography>
        </Button>
      )}
      {quantity > 0 && loginCustomer.length > 0 && (
        <Stack
          direction="row"
          alignItems="center"
          justifyContent={"space-between"}
          sx={{ width: "100%", height: "100%", p: 0 }}
        >
          <IconButton
            sx={{ color: "secondary.main" }}
            onClick={() => {
              //use action creator 'decrement' to create action Object in dispatch
              dispatch(decrement({ product: product }));
            }}
          >
            <IndeterminateCheckBox />
          </IconButton>
          <Typography variant="body2" fontWeight={"medium"}>
            {quantity}
          </Typography>

          <IconButton
            sx={{ color: "secondary.main" }}
            // disabled={quantity === product.numInStock}
            onClick={async () => {
              //directly writeout the dispatch action object
              await dispatch({
                type: "carts/increment",
                payload: { product: product },
              });
              // always use pure function to handle the state change
              // directly compare quantity and numInStock like below example won't trigger everytime the quantity changes
              // if (product.numInStock && quantity === product.numInStock) {
              //   dispatch(
              //     notificationDisplayed({
              //       notification: {
              //         text: "you have reached the number of stock for this product",
              //         severity: "warning",
              //       },
              //     })
              //   );
              // }
              await handleNotification();
              // setTimeout(handleCloseNotification(), 6000);
            }}
          >
            <AddBox />
          </IconButton>
        </Stack>
      )}
    </Box>
  );
};

export default AddToCartBtn;
