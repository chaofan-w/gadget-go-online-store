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

const AddToCartBtn = ({ product }) => {
  const dispatch = useDispatch();
  //  use the useSelector hook to update the quantity, everytime the state updates, the quantity will updates accordingly and re-render in component
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
          onClick={() => {
            dispatch(productAdded({ product: product }));
          }}
        >
          <Typography variant="caption">
            {product.numInStock === 0 ? "OUT OF STOCK" : "ADD TO CART"}
          </Typography>
        </Button>
      )}
      {quantity > 0 && (
        <Stack
          direction="row"
          alignItems="center"
          justifyContent={"space-between"}
          sx={{ width: "100%", height: "100%", p: 0 }}
        >
          <IconButton
            sx={{ color: "secondary.main" }}
            onClick={() => {
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
            onClick={() => {
              dispatch({
                type: "carts/increment",
                payload: { product: product },
              });
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
