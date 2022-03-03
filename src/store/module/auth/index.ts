import { computed } from 'vue'
import * as mutationTypes from './constants/mutation'
import * as actionTypes from './constants/action'
import { addData, fetchData, editData, removeData } from '../../../helpers/api'

export default {
  state: () => ({
    data: '',
    user: '',
    token: '',
    token_type: 'Bearer ',
    refresh_token: '',
    id_token: '',
    expires_in: '',
    errors: {
    },
    editing: false,
    title: ''
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
    getTokenType: (state: any) => {
      return computed(() => {
        return state.token_type
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
    [mutationTypes.SetToken] (state: any, data: any) {
      state.token = data
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
      const user = await addData(data.url, data.data)
      commit(mutationTypes.SetData, user)
    },
    async [actionTypes.FetchUser] ({ commit }: any, data: any) {
      commit(mutationTypes.SetUser, data)
    },
    async [actionTypes.FetchToken] ({ commit }: any, data: any) {
      commit(mutationTypes.SetToken, data)
    },
    async [actionTypes.FetchExpiresIn] ({ commit }: any, data: any) {
      commit(mutationTypes.SetExpiresIn, data)
    },
    async [actionTypes.FetchRefreshToken] ({ commit }: any, data: any) {
      commit(mutationTypes.SetRefreshToken, data)
    },
    async [actionTypes.FetchTokenId] ({ commit }: any, data: any) {
      commit(mutationTypes.SetTokenId, data)
    }
  }
}
