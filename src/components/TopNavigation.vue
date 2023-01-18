<script lang="ts">
export default {
  name: 'TopNavigation',
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import SvgIcons from '../components/SvgIcons.vue';
import { useStore } from 'vuex';
import { addEmptyData } from '../helpers/api';
import idsrvAuth from '../idSrvAuth';
import { createOidcAuth, SignInType, LogLevel } from 'vue-oidc-client/vue3'
import { zoho_client_id, zoho_scope, base_url, oidc_authority } from '../config'

const loco = window.location
const appRootUrl = `${loco.protocol}//${loco.host}/`
// const appRootUrl = 'localhost:5500/'
const provider:any = 'Zoho'

  console.log(`Creating OIDC client for ${appRootUrl}`)
  const authCallbackPath = 'index.html?auth-callback=1';
  const logoutCallbackPath = 'index.html?logout-callback=1';
  const prompt= 'logout'
  const redirectUri = `${base_url}${authCallbackPath}`;
  const scopes = 'offline_access';
  const logoutRedirectUri = `${oidc_authority}${logoutCallbackPath}`;
  console.log(`Creating OIDC client for ${redirectUri}`)

	const clientSettings = {
	authority: oidc_authority,
	client_id: zoho_client_id,
	redirect_uri: redirectUri,
	post_logout_redirect_uri: 'https://walure-erp.netlify.app',
	// post_logout_redirect_uri: logoutRedirectUri,
	response_type: 'code',
	filterProtocolClaims: true,
	loadUserInfo: true,
	scope: zoho_scope,
	extraQueryParams: { scope: zoho_scope, prompt: prompt, provider: provider }
	// extraTokenParams: {scope: scopes},
	};

	const store = useStore();

	const endSessionEndpoint:any = computed(() => {
		return store.getters.getEndSessionEndpoint.value;
	})

	const logout:any = async () => {
		// const token:any = localStorage.getItem('token')
		// $oidc.signOut
		// let response:any = await addEmptyData(endSessionEndpoint.value, token)
		console.log(`emergency ${endSessionEndpoint}`)
		idsrvAuth.signOut(clientSettings);
		localStorage.clear();
		setTimeout(() => {
			window.location.href = '/';
		}, 5000);
		// window.location.href = '/';
	}
</script>

<template>
<div class="grid w-4/5 bg-white shadow-md py-2 justify-end items-center px-6">
	<!-- {{ endSessionEndpoint }} -->
	<div class="relative inline-block text-left dropdown">
		<button class="border text-grey flex justify-around gap-8 items-center rounded px-3 py-2" type="button" aria-haspopup="true" aria-expanded="true" aria-controls="headlessui-menu-items-117">
			<span class="icon border rounded-full ">
				<SvgIcons class="m-2" name="user-avatar" /> <!-- avatar icon -->
			</span>
			<span class="text-black">
				<p class="text-sm">Admin</p>
				<p class="text-xs">Walure Capital</p>
			</span>
			<span class="icon">
				<SvgIcons name="chevron-down" /> <!-- chevron down icon -->
			</span>
		</button>
		<div class="opacity-0 invisible dropdown-menu transition-all duration-300 transform origin-top-right -translate-y-2 scale-95">
			<div class="absolute right-0 w-full mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none" aria-labelledby="headlessui-menu-button-1" id="headlessui-menu-items-117" role="menu">
				<div class="py-1">
					<button @click.prevent="logout" tabindex="0" class="flex items-center py-5 px-7"  role="menuitem">
						<SvgIcons class="mr-4" name="logout" /> <!-- logout icon -->
						<p>Sign Out</p>
					</button>
				</div>
			</div>
		</div>
	</div>
</div>
</template>

<style scoped>
    .dropdown:focus-within .dropdown-menu {
    opacity:1;
    transform: translate(0) scale(1);
    visibility: visible;
    }
</style>
