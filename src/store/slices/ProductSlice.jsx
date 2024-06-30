import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await axios.get("https://fakestoreapi.com/products");
    return response.data;
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    status: "idle",
    error: null,
    allProducts: [],
    category: [],
    highestPrice: 0,
    filterProducts: {
      search: "",
      price: 0,
      category: "All",
    },
    filteredProduct: [],
  },
  reducers: {
    update_filter(state, action) {
      if (action.payload.category) {
        state.filterProducts.category = action.payload.category;
      }
      if (action.payload.price) {
        state.filterProducts.price = action.payload.price;
      }

      if (action.payload.search) {
        state.filterProducts.search = action.payload.search;
      }

      productSlice.caseReducers.filter_products(state);
    },

    filter_products(state) {
      const { search, price, category } = state.filterProducts;
      let tempFilter = state.allProducts;
      if (search !== "") {
        tempFilter = tempFilter.filter((product) => {
          return product.title.toLowerCase().includes(search);
        });
      }
      if (category !== "All") {
        tempFilter = tempFilter.filter(
          (product) => product.category === category
        );
      }

      if (price === 0) {
        tempFilter = tempFilter.filter((product) => product.price === price);
      } else {
        tempFilter = tempFilter.filter((product) => product.price <= price);
      }
      state.filteredProduct = tempFilter;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.allProducts = action.payload;
        state.filteredProduct = action.payload;

        // let category =
        state.category = [
          "All",
          ...new Set(action.payload.map((products) => products.category)),
        ];
        let maxPrice = Math.max(
          ...action.payload.map((product) => product.price)
        );
        state.highestPrice = maxPrice;
        state.filterProducts.price = maxPrice;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default productSlice.reducer;
export const { filter_products, update_filter } = productSlice.actions;
