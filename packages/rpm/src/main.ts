import { createApp } from 'vue'
import 'uno.css'
import App from './App.vue'
import './assets/scss/global.scss'
import router from './router'

createApp(App).use(router).mount('#app')
