import { createApp } from 'vue'
import 'uno.css'
import "./assets/scss/global.scss"
import App from './App.vue'
import router from './router/index'

createApp(App).use(router).mount('#app')
