import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { STATUS } from "../../utils/status";
import { BASE_URL } from "../../config/baseApi";
import api from "../../api/api";

const loadCartFromStorage = () => {
  const savedCart = localStorage.getItem("cart");
  return savedCart ? JSON.parse(savedCart) : [];
};

const initialState = {
  baslangıcState: loadCartFromStorage(),
  cartItems: loadCartFromStorage(),
  status: STATUS.IDLE,
  cartTotal: {
    totalPrice: 0,
    kdv: 0,
    shippingCost: 0,
    totalWithShipping: 0,
    progressValue: 0,
  },
};

const calculateTotals = (bagimsizCartItems) => {
  if (bagimsizCartItems.length == 0) {
    return {
      totalPrice: 0,
      kdv: 0,
      shippingCost: 0,
      totalWithShipping: 0,
      progressValue: 0,
    };
  }

  const kdvRate = 0.2; // %20 KDV
  const shippingThreshold = 2000;

  const totalPrice = bagimsizCartItems.reduce(
    (acc, item) => acc + item.comparePrice * item.quantity,
    0
  );

  const kdv = (totalPrice * kdvRate) / (1 + kdvRate);
  const shippingCost = totalPrice >= shippingThreshold ? 0 : 200;
  const totalWithShipping = totalPrice + shippingCost;
  const progressValue = Math.min((totalPrice / shippingThreshold) * 100, 100);

  return {
    totalPrice,
    kdv,
    shippingCost,
    totalWithShipping,
    progressValue,
  };
};

export const fetchCartItems = createAsyncThunk(
  "cart/fetchCartItems",
  async (cartItems) => {
    if (cartItems.length == 0) {
      return [];
    }

    try {
      const idsOnly = cartItems.map((item) => ({ productId: item.id }));
      const response = await axios.post(
        `${BASE_URL}/api/v1/card-item/by-ids`,
        idsOnly
      );

      const products = response.data;
      const enrichedProducts = products.map((product) => {
        const match = cartItems.find((item) => item.id === product.id);
        return {
          ...product,
          quantity: match?.quantity || 0,
        };
      });

      return enrichedProducts;
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
      console.log(response.data);
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
      const { id, quantity } = action.payload;
      const existingItem = state.baslangıcState.find((item) => item.id === id);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.baslangıcState.push({ id, quantity });
      }

      localStorage.setItem("cart", JSON.stringify(state.baslangıcState));
    },

    removeFromCart: (state, action) => {
      state.baslangıcState = state.baslangıcState.filter(
        (item) => item.id !== action.payload
      );
      localStorage.setItem("cart", JSON.stringify(state.baslangıcState));

      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );
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
        state.cartTotal = calculateTotals(action.payload);
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
        state.cartTotal = calculateTotals(action.payload);
      })

      .addCase(fetchCartItemsLoggedIn.rejected, (state) => {
        state.status = STATUS.FAIL;
      });
  },
});

export const { addToCart, removeFromCart } = sepetCartSlice.actions;
export default sepetCartSlice.reducer;
