import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './main.css'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import '@vueup/vue-quill/dist/vue-quill.bubble.css'
import axios from 'axios'
import VueApexCharts from 'vue3-apexcharts';

// axios.defaults.baseURL = 'http://localhost:3000'

axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token')

createApp(App).use(router).component('VueApexCharts', VueApexCharts).use(store).component('QuillEditor', QuillEditor).mount('#app')
