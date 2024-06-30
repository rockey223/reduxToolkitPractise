import { configureStore } from "@reduxjs/toolkit";
import ProductSlice from "./slices/ProductSlice";
const store = configureStore({
  reducer: {
    products: ProductSlice
  },
});

export default store;
