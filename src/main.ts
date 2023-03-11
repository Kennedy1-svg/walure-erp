import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './main.css'
// import { createAuth0 } from '@auth0/auth0-vue';
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import '@vueup/vue-quill/dist/vue-quill.bubble.css'
import axios from 'axios'
// import { client_id, scope, base_url, oidc_authority } from './config'
import idSrvAuth from './idSrvAuth'

// axios.defaults.baseURL = 'http://localhost:3000'

axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token')

idSrvAuth.startup().then((ok:any) => {
    if (ok) {
        // const app:any = createApp(App);

        // app.use(createRouter(app)).use(store).component('QuillEditor', QuillEditor).use(
        //     createAuth0({
        //         domain: `${oidc_authority}`,
        //         clientId: `${client_id}`,
        //         authorizationParams: {
        //             redirect_uri: `${redirectUri}`,
        //             scope: `${scopes}`,
        //             provider: 'Zoho',
        //             prompt: 'login',
        //             // redirect_uri: window.location.origin,
        //         }
        //     })
        // );

        const app:any = createApp(App).use(router).use(store).component('QuillEditor', QuillEditor);

        app.config.globalProperties.$oidc = idSrvAuth

        app.mount('#app')
    } else {
        console.log(`Startup was not okay`)
    }
});

// createAuth0({
//     domain: '<AUTH0_DOMAIN>',
//     clientId: '<AUTH0_CLIENT_ID>',
//     authorizationParams: {
//       redirect_uri: '<MY_CALLBACK_URL>'
//     }
//   })