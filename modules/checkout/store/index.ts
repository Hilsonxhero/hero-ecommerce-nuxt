// @ts-nocheck
// import { ref, computed } from "vue";

import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", () => {
  const cart = ref({});
  const cart_preview = ref({});

  const get = async () => {
    try {
      const { data } = await useApiService.get(`cart`);
      cart.value = data;
    } catch (error) {
      return error;
    }
  };

  const add = async (payload) => {
    try {
      const { data } = await useApiService.post(`cart`, payload);
      cart.value = data;
      cart_preview.value = data
    } catch (error) {
      return error;
    }
  };

  const update = async (payload) => {
    try {
      const { data } = await useApiService.put(`cart/${payload.cart_item_id}`, payload);

      cart.value = data;
      cart_preview.value = data
    } catch (error) {
      return error;
    }
  };

  const remove = async (payload) => {
    try {
      const { data } = await useApiService.remove(`cart/${payload}`, payload);

      cart.value = data;
      cart_preview.value = data
    } catch (error) {
      return error;
    }
  };

  const fetch = async (payload) => {
    cart.value = payload;
  };

  const fetchPreviewCart = async (payload) => {
    cart_preview.value = payload;
  };


  const replace = (payload) => {
    Object.keys(payload).forEach((item, key) => {
      if (cart.value.hasOwnProperty(item)) {
        cart.value[item] = payload[item]
      }
    })

  };


  return {
    cart,
    cart_preview,
    get,
    add,
    update,
    remove,
    fetch,
    replace,
    fetchPreviewCart
  };
});

