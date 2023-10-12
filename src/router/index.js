import { createRouter, createWebHistory } from "vue-router";

import Home from '../pages/Home.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import("../pages/Login.vue")
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import("../pages/Register.vue")
    },
    {
        path: '/forgot',
        name: 'Forgot',
        component: () => import("../pages/Forgot.vue")
    },
    {
        path: '/password-reset/:token',
        name: 'PasswordReset',
        component: () => import("../pages/ResetPassword.vue")
    },
    {
        path: '/products/:id',
        name: 'Product',
        component: () => import("../pages/Product.vue")
    },
    {
        path: '/products/:id/edit',
        name: 'ProductEdit',
        component: () => import("../pages/Product-Edit.vue")
    },
    {
        path: '/customer',
        name: 'Customer',
        component: () => import("../pages/Customer.vue")
    },
    {
        path: '/customers/:id/edit',
        name: 'CustomerEdit',
        component: () => import("../pages/Customer-Edit.vue")
    },

];

const router = createRouter({
    history: createWebHistory(),
    routes,
    linkActiveClass:'active'
});

export default router;