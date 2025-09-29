import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import { Quasar, Notify, Loading, Meta, LocalStorage, SessionStorage } from 'quasar'
// ✅ Auto routes
import { routes } from 'vue-router/auto-routes'
import { createPersistedStatePlugin } from 'pinia-plugin-persistedstate-2';

// ✅ Correct history creator
import { createRouter, createWebHistory } from 'vue-router'
import '@quasar/extras/material-icons/material-icons.css'
import '@quasar/extras/mdi-v7/mdi-v7.css'
import 'quasar/src/css/index.sass'

import './assets/styles.scss'
// import 'material-icons/iconfont/material-icons.css'
const pinia = createPinia()
const router = createRouter({
  history: createWebHistory(),
  routes
})
const app = createApp(App)
app.use(Quasar, {
  plugins: {
    Notify,
    Loading,
    Meta,
    LocalStorage,
    SessionStorage
  }
})
pinia.use(
  createPersistedStatePlugin({
    storage: localStorage
  })
)
app.use(pinia)
app.use(router)

app.mount('#app')
