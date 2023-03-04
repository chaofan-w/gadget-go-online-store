import * as React from "react";
import { Box, Button } from "@mui/material";
import { postNewOrder } from "../../features/orders/ordersSlice";
import { useNavigate } from "react-router-dom";
import { cartCleared } from "../../features/carts/cartsSlice";

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
}) => {
  const navigate = useNavigate();
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
        await dispatch(cartCleared());
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
    <Box>
      <Button onClick={handleSubmitOrder}>submit</Button>
    </Box>
  );
};

export default Review;
