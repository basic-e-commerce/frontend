import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  categories: [],
  selectedCategory: "",
};

export const getCategories = createAsyncThunk("category", async () => {
  const response = await axios.get(
    "https://fakestoreapi.com/products/categories"
  );
  const data = response.data;
  return data;
});

export const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setSelectedCategory(state, action) {
      state.selectedCategory = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.categories = action.payload;
    });
  },
});

export const { setSelectedCategory } = categorySlice.actions;

export default categorySlice.reducer;
