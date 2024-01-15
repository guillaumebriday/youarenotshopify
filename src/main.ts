import { createApp } from 'vue'
import App from './App.vue'

import PrimeVue from 'primevue/config'
import 'primevue/resources/themes/md-light-indigo/theme.css'
import './assets/main.css'

const app = createApp(App)

app.use(PrimeVue)

app.mount('#app')
