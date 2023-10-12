<template>
    <div class="container">
        <div class="col-md-6 m-auto">
            <h1>Forgot Password</h1>

            <div class="mt-3" style="color: green;">
                {{ message }}
            </div>

            <div>
                <form @submit.prevent="submitForgot">
                    <div class="card p-5">
                        <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label">Email address</label>
                            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                                v-model="form.email">
                            <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                        </div>
                        <button type="submit" class="btn btn-primary">Send</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios';
import { useRouter } from 'vue-router'
import { authStore } from '../stores/authstore'

const router = useRouter();
const useAuth = authStore();

const form = ref({
    email: '',
});

const message = ref('');

const submitForgot = async () => {
    await useAuth.getToken()
    await axios.post('/forgot-password', {
        email: form.value.email,
    }).then( function (response) {
        if(response.status === 200){
            message.value = response.data.status;
        }
    }).catch(function (error) {
        console.log(error.response.data.message);
    });

    
}
</script>