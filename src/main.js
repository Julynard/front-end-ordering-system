import { createApp } from 'vue'
import { createPinia} from 'pinia'

import App from './App.vue'

import router from './router'

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

import '../axios'

import ProductList from './components/ProductList.vue'
import ProductForm from './components/ProductForm.vue'
import Nav from './components/Nav.vue'

const app = createApp(App);

app.component('Nav', Nav);
app.component('ProductList', ProductList);
app.component('ProductForm', ProductForm);

const pinia = createPinia();

app.use(pinia)
app.use(router)

app.mount("#app")
