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
    sorting: "ascending",
    filterProducts: {
      search: "",
      price: 0,
      category: "All",
    },
    filteredProduct: [],
  },
  reducers: {
    update_filter(state, action) {
      const { name, value } = action.payload;

      state.filterProducts = {
        ...state.filterProducts,
        [name]: value,
      };

      productSlice.caseReducers.filter_products(state);
      productSlice.caseReducers.sorting(state);
    },

    filter_products(state) {
      const { search, price, category } = state.filterProducts;
      let tempFilter = [...state.allProducts];
      if (search) {
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

    update_sorting(state, action) {
      state.sorting = action.payload;
      productSlice.caseReducers.sorting(state);
    },

    sorting(state) {
      let sortedData;
      const { filteredProduct, sorting } = state;
      let tempSort = [...filteredProduct];

      const sortingProducts = (a, b) => {
        if (sorting === "ascending") {
          return a.title.localeCompare(b.title);
        }
        if (sorting === "descending") {
          return b.title.localeCompare(a.title);
        }
        if (sorting === "lowest") {
          return a.price - b.price;
        }
        if (sorting === "highest") {
          return b.price - a.price;
        }
      };
      sortedData = tempSort.sort(sortingProducts);

      state.filteredProduct = sortedData;
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
        productSlice.caseReducers.sorting(state);
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default productSlice.reducer;
export const { filter_products, update_filter, update_sorting } =
  productSlice.actions;
