import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { STATUS } from "../../utils/status";
import { BASE_URL } from "../../config/baseApi";

const loadCartFromStorage = () => {
  const savedCart = localStorage.getItem("cart");
  return savedCart ? JSON.parse(savedCart) : [];
};

const initialState = {
  baslangıcState: loadCartFromStorage(),
  cartItems: loadCartFromStorage(),
  status: STATUS.IDLE,
};

export const fetchCartItems = createAsyncThunk(
  "cart/fetchCartItems",
  async (cartItems) => {
    const items = cartItems.map((item) => item.id);
    try {
      const response = await axios.get(
        `${BASE_URL}/api/v1/order/basket?productIds=${items.join(",")}`
      );

      const prices = response.data; // [{id:1,price:200,img:"https//aliveli.com",name:"Ali ürünü"}]
      const priceMap = new Map(prices.map((p) => [p.id, p]));

      return cartItems.map((item) => {
        const productInfo = priceMap.get(item.id) || {}; // Ürün bulunamazsa boş nesne döner

        return {
          ...item,
          discountPrice: productInfo.discountPrice || 0, // Eğer fiyat yoksa 0 ver
          coverImage: productInfo.coverImage || "", // Eğer img yoksa boş string ver
          name: productInfo.name || "Bilinmeyen Ürün", // Eğer isim yoksa default değer ata
          total: (productInfo.discountPrice || 0) * item.quantity,
        };
      });
    } catch (error) {
      console.error("Fiyatları çekerken hata oluştu:", error);
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
      })
      .addCase(fetchCartItems.rejected, (state) => {
        state.status = STATUS.FAIL;
      });
  },
});

export const { addToCart, removeFromCart, clearCart } = sepetCartSlice.actions;
export default sepetCartSlice.reducer;
