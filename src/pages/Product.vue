<template>
    <div class="container">
        <div class="col-md-6 m-auto">
            <h1>View Product</h1>
            <div v-if="useProduct.list">
                <div class="card p-5">
                    <div class="mb-3">
                        <label for="product_name" class="form-label">Name</label>
                        <input type="text"  class="form-control" id="product_name" v-model="useProduct.list.name" disabled>

                    </div>
                    <div class="mb-3">
                        <label for="product_price" class="form-label">Price</label>
                        <input type="number" class="form-control" id="product_price" v-model="useProduct.list.price" disabled>
                    </div>
                    <div v-if="useAuth.user">
                        <router-link :to="'/products/' + useProduct.list.id + '/edit'" class="btn btn-warning" v-if="useAuth.user.role === 'Admin'">Edit</router-link>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { productStore } from '../stores/productstore.js'
import { authStore } from '../stores/authstore'
import { useRoute } from 'vue-router';

const useAuth = authStore();
const useProduct = productStore();
const route = useRoute();

const id = route.params.id;

onMounted(async () => {
    const list = useProduct.getProductList(id);
})
</script>