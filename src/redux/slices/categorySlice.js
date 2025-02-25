import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchCategories, fetchSubCategories } from "../../api/apiCategory";

const initialState = {
  categories: [],
  subcategories: [],
  selectedCategory: null,
};

export const getCategories = createAsyncThunk("category", async () => {
  return await fetchCategories();
});

export const getSubCategories = createAsyncThunk("subCategory", async () => {
  return await fetchSubCategories();
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
    builder.addCase(getSubCategories.fulfilled, (state, action) => {
      state.subcategories = action.payload;
    });
  },
});

export const { setSelectedCategory } = categorySlice.actions;

export default categorySlice.reducer;
