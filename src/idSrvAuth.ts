import { User } from 'oidc-client'
import { createOidcAuth, SignInType, LogLevel } from 'vue-oidc-client/vue3'
import { zoho_client_id, zoho_scope } from './config'

const loco = window.location
// const appRootUrl = `${loco.protocol}//${loco.host}`

// console.log(`Creating OIDC client for ${appRootUrl}`)
  const appRootUrl = 'localhost:5500'
  const authCallbackPath = '/index.html?auth-callback=1';
  const logoutCallbackPath = '/index.html?logout-callback=1';
  const backendUri = 'https://walureerp.azurewebsites.net'
  const redirectUri = `https://localhost:5500${authCallbackPath}`;
  const scopes = 'offline_access';
  const logoutRedirectUri = `${backendUri}${logoutCallbackPath}`;
// console.log(`Creating OIDC client for ${redirectUri}`)

const idsrvAuth = createOidcAuth(
  'main',
  SignInType.Popup,
  appRootUrl,
  {
    authority: 'https://walureerp.azurewebsites.net/',
    client_id: 'erp_webapp', // 'implicit.shortlived',
    response_type: 'code',
    // scope: 'openid profile email api',
    // test use
    filterProtocolClaims: true,
    loadUserInfo: false,
    scope: scopes,
    redirect_uri: redirectUri,
    prompt: 'login',
    // extraTokenParams: {scope: scopes},
  },
  console,
  LogLevel.Debug
)

// handle events
idsrvAuth.events.addAccessTokenExpiring(function() {
  // eslint-disable-next-line no-console
  console.log('access token expiring')
})

idsrvAuth.events.addAccessTokenExpired(function() {
  // eslint-disable-next-line no-console
  console.log('access token expired')
})

idsrvAuth.events.addSilentRenewError(function(err: Error) {
  // eslint-disable-next-line no-console
  console.error('silent renew error', err)
})

idsrvAuth.events.addUserLoaded(function(user: User) {
  // eslint-disable-next-line no-console
  console.log('user loaded', user)
})

idsrvAuth.events.addUserUnloaded(function() {
  // eslint-disable-next-line no-console
  console.log('user unloaded')
})

idsrvAuth.events.addUserSignedOut(function() {
  // eslint-disable-next-line no-console
  console.log('user signed out')
})

idsrvAuth.events.addUserSessionChanged(function() {
  // eslint-disable-next-line no-console
  console.log('user session changed')
})

export default idsrvAuth