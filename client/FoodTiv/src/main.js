import { createApp, markRaw } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
import '../src/assets/main.css'
import vue3GoogleLogin from 'vue3-google-login'


const app = createApp(App)
const pinia = createPinia()

app.use(router)
app.use(pinia)
app.use(VueSweetalert2)
app.use(vue3GoogleLogin, {
  clientId: '766684739586-j2kpo172acud6esrffvh0ho1m8uoap84.apps.googleusercontent.com'
})
pinia.use(({ store }) => {
  store.router = markRaw(router)
})

app.mount('#app')

