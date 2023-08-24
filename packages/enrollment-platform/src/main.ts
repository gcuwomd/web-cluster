import { createApp } from 'vue'
import {createPinia} from 'pinia'
import piniaPersist from 'pinia-plugin-persist'
import 'uno.css'
import "./assets/scss/global.scss"
import App from './App.vue'
import router from './router/index'
const app=createApp(App);
const pinia =createPinia();
pinia.use(piniaPersist)
app.use(pinia)
.use(router).mount('#app')
