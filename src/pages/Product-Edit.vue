<template>
    <div class="container">
        <div class="col-md-6 m-auto">
            <div class="mt-3" style="color: green;">
                {{ message }}
            </div>
            <h1>Edit Product</h1>
            <div v-if="useProduct.list">
                <form @submit.prevent="updateProduct">
                    <div class="card p-5">
                    <div class="mb-3">
                        <label for="product_name" class="form-label">Name</label>
                        <input type="text"  class="form-control" id="product_name" v-model="useProduct.list.name">

                    </div>
                    <div class="mb-3">
                        <label for="product_price" class="form-label">Price</label>
                        <input type="number" class="form-control" id="product_price" v-model="useProduct.list.price">
                    </div>
                    <button type="submit" class="btn btn-primary" >Update</button>
                </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue'
import { productStore } from '../stores/productstore.js'
import { useRoute, useRouter } from 'vue-router';
import { authStore } from '../stores/authstore'

const useProduct = productStore();
const route = useRoute();
const useAuth = authStore();

const id = route.params.id;

onMounted(async () => {
    useProduct.getProductList(id);
})

const form = ref({
    name: '',
    price: '',
});

const message = ref('');

const updateProduct = async () => {

    await useAuth.getToken()
    await axios.put(`/api/products/${id}`, {
        name: useProduct.list.name,
        price: useProduct.list.price,
    }).then( function (response) {
        if(response.status === 200){
            console.log(response)
            message.value = response.data.message;
        }
    }).catch(function (error) {
        console.log(error.response.data.message);
    });
}


</script>