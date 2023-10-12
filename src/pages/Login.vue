<template>
    <div class="container">
        <div class="col-md-6 m-auto">
            <h1>Login Page</h1>

            <div class="mt-3" style="color: red;">
                {{ errmessage }}
            </div>

            <div>
                <form @submit.prevent="submitLogin">
                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Email address</label>
                        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                            v-model="form.email">
                        <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label">Password</label>
                        <input type="password" class="form-control" id="exampleInputPassword1" v-model="form.password">
                    </div>
                    <div class="d-flex justify-content-between">
                        <button type="submit" class="btn btn-primary">Submit</button>
                        <router-link to="/forgot">Forgot Password?</router-link>
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
    password: ''
});

const errmessage = ref();

const submitLogin = async () => {
    await useAuth.getToken()
    await axios.post('/login', {
        email: form.value.email,
        password: form.value.password
    }).then( function (response) {
        if(response.status === 204){
            router.push('/');
        }
    }).catch(function (error) {
        console.log(error.response.data.message);
        errmessage.value = error.response.data.message
    });

    
}
</script>