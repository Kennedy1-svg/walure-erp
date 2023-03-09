import { createApp } from 'vue'
import App from './App.vue'
import { createRouter } from './router'
import store from './store'
import './main.css'
import { createAuth0 } from '@auth0/auth0-vue';
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import '@vueup/vue-quill/dist/vue-quill.bubble.css'
import axios from 'axios'
import { client_id, scope, base_url, oidc_authority } from './config'
// import idSrvAuth from './idSrvAuth'

// axios.defaults.baseURL = 'http://localhost:3000'
const authCallbackPath = 'index.html?auth-callback=1';
const logoutCallbackPath = 'index.html?logout-callback=1';
const prompt= 'login'
const redirectUri = `${base_url}${authCallbackPath}`;
const scopes = 'offline_access';

axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token')

// idSrvAuth.startup().then((ok:any) => {
//     if (ok) {
        const app:any = createApp(App);

        app.use(createRouter(app)).use(store).component('QuillEditor', QuillEditor).use(
            createAuth0({
                domain: `${oidc_authority}`,
                clientId: `${client_id}`,
                authorizationParams: {
                    // redirect_uri: `${redirectUri}`
                    scope: `${scopes}`,
                    issuer: 'zoho',
                    prompt: 'login',
                    redirect_uri: window.location.origin,
                }
            })
        );

        // app.config.globalProperties.$oidc = idSrvAuth

        app.mount('#app')
//     } else {
//         console.log(`Startup was not okay`)
//     }
// });

// createAuth0({
//     domain: '<AUTH0_DOMAIN>',
//     clientId: '<AUTH0_CLIENT_ID>',
//     authorizationParams: {
//       redirect_uri: '<MY_CALLBACK_URL>'
//     }
//   })