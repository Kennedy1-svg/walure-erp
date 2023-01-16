import { computed } from 'vue'
import * as mutationTypes from './constants/mutation'
import * as actionTypes from './constants/action'
import { auth_creds } from '../../../config'
import { addData, getData, editData, removeData } from '../../../helpers/api'

export default {
  state: () => ({
    data: '',
    user: '',
    token: localStorage.getItem('token'),
    token_type: 'Bearer ',
    refresh_token: '',
    id_token: '',
    expires_in: '',
    alert_status: false,
    alert_text: '',
    editing: false,
    title: '',
    auth_credentials: '',
    issuer: '',
    authorization_endpoint: '',
    token_endpoint: '',
    end_session_endpoint: '',
    jwks_uri: '',
    grant_types_supported: '',
    response_types_supported: '',
    response_modes_supported: '',
    scopes_supported: '',
    claims_supported: '',
    id_token_signing_alg_values_supported: '',
    code_challenge_methods_supported: '',
    subject_types_supported: '',
    token_endpoint_auth_methods_supported: '',
    claims_parameter_supported: '',
    request_parameter_supported: '',
    request_uri_parameter_supported: '',
  }),
  getters: {
    getData: (state: any) => {
      return computed(() => {
        return state.data
      })
    },
    getUser: (state: any) => {
      return computed(() => {
        return state.user
      })
    },
    getToken: (state: any) => {
      return computed(() => {
        return state.token
      })
    },
    getAuthCreds: (state: any) => {
      return computed(() => {
        return state.auth_credentials
      })
    },
    getLoginAlertStatus: (state: any) => {
      return computed(() => {
        return state.alert_status
      })
    },
    getLoginAlertText: (state: any) => {
      return computed(() => {
        return state.alert_text
      })
    },
    getTokenType: (state: any) => {
      return computed(() => {
        return state.token_type
      })
    },
    getEndSessionEndpoint: (state: any) => {
      return computed(() => {
        return state.end_session_endpoint
      })
    },
    getRefreshToken: (state: any) => {
      return computed(() => {
        return state.refresh_token
      })
    },
    getTokenId: (state: any) => {
      return computed(() => {
        return state.id_token
      })
    },
    getExpiresIn: (state: any) => {
      return computed(() => {
        return state.expires_in
      })
    }
  },
  mutations: {
    [mutationTypes.SetData] (state: any, data: any) {
      state.data = data
    },
    [mutationTypes.SetUser] (state: any, data: any) {
      state.user = data
    },
    [mutationTypes.SetAuthCreds] (state: any, data: any) {
      state.auth_credentials = data
    },
    [mutationTypes.SetIssuer] (state: any, data: any) {
      state.issuer = data
    },
    [mutationTypes.SetAuthEndpoint] (state: any, data: any) {
      state.authorization_endpoint = data
    },
    [mutationTypes.SetTokenEndpoint] (state: any, data: any) {
      state.token_endpoint = data
    },
    [mutationTypes.SetEndSessionEndpoint] (state: any, data: any) {
      state.end_session_endpoint = data
    },
    [mutationTypes.SetJwksUri] (state: any, data: any) {
      state.jwks_uri = data
    },
    [mutationTypes.SetGrantType] (state: any, data: any) {
      state.grant_types_supported = data
    },
    [mutationTypes.SetResponseType] (state: any, data: any) {
      state.response_types_supported = data
    },
    [mutationTypes.SetResponseMode] (state: any, data: any) {
      state.response_modes_supported = data
    },
    [mutationTypes.SetScopes] (state: any, data: any) {
      state.scopes_supported = data
    },
    [mutationTypes.SetClaims] (state: any, data: any) {
      state.claims_supported = data
    },
    [mutationTypes.SetIdTokenSigning] (state: any, data: any) {
      state.id_token_signing_alg_values_supported = data
    },
    [mutationTypes.SetCodeChallengeMethod] (state: any, data: any) {
      state.code_challenge_methods_supported = data
    },
    [mutationTypes.SetSubjectType] (state: any, data: any) {
      state.subject_types_supported = data
    },
    [mutationTypes.SetTokenEndpointAuth] (state: any, data: any) {
      state.token_endpoint_auth_methods_supported = data
    },
    [mutationTypes.SetClaimsParameter] (state: any, data: any) {
      state.claims_parameter_supported = data
    },
    [mutationTypes.SetRequestParams] (state: any, data: any) {
      state.request_parameter_supported = data
    },
    [mutationTypes.SetRequestURIParam] (state: any, data: any) {
      state.request_uri_parameter_supported = data
    },
    [mutationTypes.SetToken] (state: any, data: any) {
      localStorage.setItem('token', state.token = data)
    },
    [mutationTypes.SetLoginAlertStatus] (state: any, data: any) {
      state.alert_status = data
    },
    [mutationTypes.SetLoginAlertText] (state: any, data: any) {
      state.alert_text = data
    },
    [mutationTypes.SetTokenId] (state: any, data: any) {
      state.id_token = data
    },
    [mutationTypes.SetRefreshToken] (state: any, data: any) {
      state.refresh_token = data
    },
    [mutationTypes.SetExpiresIn] (state: any, data: any) {
      state.expires_in = data
    },
  },
  actions: {
    async [actionTypes.FetchData] ({ commit }: any, data: any) {
      const user = await addData(data.url, data.data, data.token = null)
      if (user.access_token) {
        commit(mutationTypes.SetLoginAlertText, 'Login Successful')
        commit(mutationTypes.SetLoginAlertStatus, true)
        commit(mutationTypes.SetData, user)
        commit(mutationTypes.SetToken, user.access_token)
        commit(mutationTypes.SetExpiresIn, user.expires_in)
        commit(mutationTypes.SetRefreshToken, user.refresh_token)
        commit(mutationTypes.SetTokenId, user.id_token)
      } else if (user.message.includes('400')) {
        commit(mutationTypes.SetLoginAlertText, 'Invalid Email or Password')
        commit(mutationTypes.SetLoginAlertStatus, true)
      } else if (user.message.includes('404')) {
        commit(mutationTypes.SetLoginAlertText, 'Invalid connection string!')
        commit(mutationTypes.SetLoginAlertStatus, true)
      } else {
        commit(mutationTypes.SetLoginAlertText, 'Houston we have a problem!')
        commit(mutationTypes.SetLoginAlertStatus, true)
      }

      setTimeout(() => {
        commit(mutationTypes.SetLoginAlertStatus, false)
      }, 2000)
    },
    async [actionTypes.FetchUser] ({ commit }: any, data: any) {
      commit(mutationTypes.SetUser, data)
    },
    async [actionTypes.FetchZohoCreds] ({ commit }: any, data: any = `${auth_creds}`) {
      console.log(`data is ${data}`)
      const authdata:any = await getData(data)
      console.log(`data is ${JSON.stringify(authdata.issuer)}`)
      console.log(`authdata is ${authdata.issuer}`)
      commit(mutationTypes.SetAuthCreds, authdata)
      commit(mutationTypes.SetIssuer, authdata.issuer)
      commit(mutationTypes.SetAuthEndpoint, authdata.authorization_endpoint)
      commit(mutationTypes.SetTokenEndpoint, authdata.token_endpoint)
      commit(mutationTypes.SetEndSessionEndpoint, authdata.end_session_endpoint)
      commit(mutationTypes.SetJwksUri, authdata.jwks_uri)
      commit(mutationTypes.SetGrantType, authdata.grant_types_supported)
      commit(mutationTypes.SetResponseType, authdata.response_types_supported)
      commit(mutationTypes.SetResponseMode, authdata.response_modes_supported)
      commit(mutationTypes.SetScopes, authdata.scopes_supported)
      commit(mutationTypes.SetClaims, authdata.claims_supported)
      commit(mutationTypes.SetIdTokenSigning, authdata.id_token_signing_alg_values_supported)
      commit(mutationTypes.SetCodeChallengeMethod, authdata.code_challenge_methods_supported)
      commit(mutationTypes.SetSubjectType, authdata.subject_types_supported)
      commit(mutationTypes.SetTokenEndpointAuth, authdata.token_endpoint_auth_methods_supported)
      commit(mutationTypes.SetClaimsParameter, authdata.claims_parameter_supported)
      commit(mutationTypes.SetRequestParams, authdata.request_parameter_supported)
      commit(mutationTypes.SetRequestURIParam, authdata.request_uri_parameter_supported)
      console.log(`authdata authorization_endpoint is ${authdata.authorization_endpoint}`)
      console.log(`authdata token_endpoint is ${authdata.token_endpoint}`)
      console.log(`authdata response_types_supported is ${authdata.response_types_supported}`)
    },
  }
}
