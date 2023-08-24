import { createApp } from 'vue'
import {createPinia} from 'pinia'
import 'uno.css'
import "./assets/scss/global.scss"
import App from './App.vue'
import router from './router/index'
const app=createApp(App);
const pinia =createPinia();
app.use(pinia)
.use(router).mount('#app')
