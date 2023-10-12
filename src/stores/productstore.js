import { defineStore } from 'pinia';
import axios from 'axios';

export const productStore = defineStore('products', {
    state: () => ({
        productList: null,
    }),
    getters: {
        list: (state) => state.productList,
    },
    actions: {
        async getProductList(id) {
            const data = await axios.get(`/api/products/${id}`);
            this.productList = data.data;
        },
    },
});
