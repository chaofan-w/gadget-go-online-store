import { configureStore } from "@reduxjs/toolkit";
// import counterReducer from '../features/counter/counterSlice';
import productsReducer from "../features/products/productsSlice";
import categoriesReducer from "../features/categories/categoriesSlice";
import bodyLocationsReducer from "../features/body_locations/bodyLocationsSlice";
import reviewsReducer from "../features/reviews/reviewsSlice";
import cartsReducer from "../features/carts/cartsSlice";
import loginCustomerReducer from "../features/loginCustomer/loginCustomerSlice";
import notificationsReducer from "../features/notifications/notificationsSlice";
import ordersReducer from "../features/orders/ordersSlice";
import companiesReducer from "../features/compaines/companiesSlice";
import productsFilterReducer from "../features/productsFilter/productsFilterSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    categories: categoriesReducer,
    body_locations: bodyLocationsReducer,
    reviews: reviewsReducer,
    carts: cartsReducer,
    loginCustomer: loginCustomerReducer,
    notifications: notificationsReducer,
    orders: ordersReducer,
    companies: companiesReducer,
    productsFilter: productsFilterReducer,
  },
});
