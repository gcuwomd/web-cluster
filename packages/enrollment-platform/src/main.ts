import { createApp } from 'vue'
import {createPinia} from 'pinia'
import 'uno.css'
import './assets/scss/global.scss'
import 'element-plus/theme-chalk/el-message.css'
import 'element-plus/theme-chalk/src/message-box.scss'
import 'element-plus/theme-chalk/src/message.scss'
import App from './App.vue'
import router from './router/index'
const app=createApp(App);
const pinia =createPinia();
app.use(pinia)
.use(router).mount('#app')
