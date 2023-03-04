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

const CheckoutContext = React.createContext(null);

export default CheckoutContext;

export const CheckoutContextProvider = ({ children }) => {
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

  return (
    <CheckoutContext.Provider
      value={{
        dispatch,
        quantity,
        setQuantity,
        total,
        setTotal,
        discount,
        setDiscount,
        loginCustomer,
        cart,
        products,
        productsInCart,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
};
