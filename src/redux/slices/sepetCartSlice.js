import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { STATUS } from "../../utils/status";
import { BASE_URL } from "../../config/baseApi";
import api from "../../api/api";

export const loadCartFromStorage = () => {
  const savedCart = localStorage.getItem("cart");
  return savedCart ? JSON.parse(savedCart) : [];
};

const initialState = {
  baslangıcState: loadCartFromStorage(),
  cartItems: null,
  status: STATUS.IDLE,
};

export const fetchCartItems = createAsyncThunk(
  "cart/fetchCartItems",
  async (baslangıcState) => {
    if (baslangıcState.length == 0) {
      return [];
    }

    try {
      const response = await axios.post(
        `${BASE_URL}/api/v1/card-item/by-ids`,
        baslangıcState
      );
      return response.data;
    } catch (error) {
      console.error("Fiyatları çekerken hata oluştu:", error);
      throw error;
    }
  }
);

export const fetchCartItemsLoggedIn = createAsyncThunk(
  "cart/fetchCartItemsLoggedIn",
  async () => {
    try {
      const response = await api.post(
        `${BASE_URL}/api/v1/card-item/by-ids`,
        []
      );
      return response.data;
    } catch (error) {
      console.error("Login sepet getirme hatası:", error);
      throw error;
    }
  }
);

const sepetCartSlice = createSlice({
  name: "sepet",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { productId, quantity } = action.payload;
      const existingItem = state.baslangıcState.find(
        (item) => item.productId === productId
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.baslangıcState.push({ productId, quantity });
      }

      localStorage.setItem("cart", JSON.stringify(state.baslangıcState));
    },

    updateQuantityLocal: (state, action) => {
      const { productId, quantity } = action.payload;
      const item = state.baslangıcState.find(
        (item) => item.productId === productId
      );
      if (item) {
        item.quantity += quantity;

        if (item.quantity <= 0) {
          state.baslangıcState = state.baslangıcState.filter(
            (i) => i.productId !== productId
          );
        }
      }
      localStorage.setItem("cart", JSON.stringify(state.baslangıcState));
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchCartItems.pending, (state) => {
        state.status = STATUS.LOADING;
      })

      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.status = STATUS.SUCCESS;
        state.cartItems = action.payload;
      })

      .addCase(fetchCartItems.rejected, (state) => {
        state.status = STATUS.FAIL;
      })

      .addCase(fetchCartItemsLoggedIn.pending, (state) => {
        state.status = STATUS.LOADING;
      })

      .addCase(fetchCartItemsLoggedIn.fulfilled, (state, action) => {
        state.status = STATUS.SUCCESS;
        state.cartItems = action.payload;
      })

      .addCase(fetchCartItemsLoggedIn.rejected, (state) => {
        state.status = STATUS.FAIL;
      });
  },
});

export const { addToCart, updateQuantityLocal } = sepetCartSlice.actions;
export default sepetCartSlice.reducer;
