import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  deleteCategory,
  deleteCoverImgCategory,
  fetchCategories,
  updateCategoryImage,
  updateCategoryText,
} from "../../api/apiCategory";

const initialState = {
  categories: [],
  selectedCategory: null,
  loading: false,
  error: null,
};

export const getCategories = createAsyncThunk("category", async () => {
  try {
    return await fetchCategories();
  } catch (error) {
    console.log(error);
  }
});

export const updateCategory = createAsyncThunk(
  "category/update",
  async ({ formData, initialKapakImages }, { dispatch, rejectWithValue }) => {
    try {
      await updateCategoryText({
        id: formData.id,
        name: formData.name,
        description: formData.description,
      });

      if (formData.coverImage !== initialKapakImages) {
        if (!formData.coverImage) {
          await deleteCoverImgCategory(formData.id);
        } else if (formData.coverImage instanceof File) {
          const kapakData = new FormData();
          kapakData.append("image", formData.coverImage);
          await updateCategoryImage(formData.id, kapakData);
        }
      }
      await dispatch(getCategories());
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const removeCategory = createAsyncThunk(
  "category/delete",
  async (id, { dispatch, rejectWithValue }) => {
    try {
      await deleteCategory(id);
      dispatch(setSelectedCategory(null));
      await dispatch(getCategories());
      return id;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setSelectedCategory(state, action) {
      state.selectedCategory = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.loading = false;
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setSelectedCategory } = categorySlice.actions;

export default categorySlice.reducer;
