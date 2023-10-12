<template>
    <div class="container" v-if="useAuth.user">
        <div class="col-md-6 m-auto" v-if="useAuth.user.role === 'Admin'">
            <div class="mt-3" style="color: green;">
                {{ message }}
            </div>
            
            <form @submit.prevent="addProduct">
                <div class="card p-5 row">
                    <div><h1>Add Product</h1></div>
                    <div class="mb-3">
                        <label for="product_name" class="form-label">Name</label>
                        <input type="text" class="form-control" id="product_name" v-model="form.name">

                    </div>
                    <div class="mb-3">
                        <label for="product_price" class="form-label">Price</label>
                        <input type="number" class="form-control" id="product_price" v-model="form.price">
                    </div>
                    <button type="submit" class="btn btn-primary">Add</button>
                </div>
            </form>
            <br>
        </div>
    </div>
</template>

<script setup>
import axios from 'axios';
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { authStore } from '../stores/authstore'

const router = useRouter();
const useAuth = authStore();

const form = ref({
    name: '',
    price: '',
});

const message = ref('');

const addProduct = async () => {
    await useAuth.getToken()
    await axios.post('/api/products', {
        name: form.value.name,
        price: form.value.price,
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