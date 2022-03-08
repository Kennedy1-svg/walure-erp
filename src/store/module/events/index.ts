import { computed } from 'vue'
import * as mutationTypes from './constants/mutation'
import * as actionTypes from './constants/action'

export default {
  state: () => ({
    loading: false,
    openAdd: false,
    openDetails: false,
    openDelete: false,
    openAddBatch: false,
    isEditing: false,
    errors: {
    },
    editing: false,
    title: ''
  }),
  getters: {
    getLoadingState: (state: any) => {
      return computed(() => {
        return state.loading
      })
    },
    getOpenAddState: (state: any) => {
      return computed(() => {
        return state.openAdd
      })
    },
    getOpenDetailState: (state: any) => {
      return computed(() => {
        return state.openDetails
      })
    },
    getOpenDeleteState: (state: any) => {
      return computed(() => {
        return state.openDelete
      })
    },
    getEventTitle: (state: any) => {
      return computed(() => {
        return state.title
      })
    },
    getIsEditingStatus: (state: any) => {
      return computed(() => {
        return state.isEditing
      })
    },
    geteditingStatus: (state: any) => {
      return computed(() => {
        return state.editing
      })
    },
    getErrorStatus: (state: any) => {
      return computed(() => {
        return state.errors
      })
    },
    getProviderErrorStatus: (state: any) => {
      return computed(() => {
        return state.providererror
      })
    }
  },
  mutations: {
    [mutationTypes.SetLoadingStatus] (state: any, data: any) {
      state.loading = data
    },
    [mutationTypes.SetOpenStatus] (state: any, data: any) {
      state.open = data
    },
    [mutationTypes.SetOpenAddStatus] (state: any, data: any) {
      state.openAdd = data
    },
    [mutationTypes.SetOpenDetailsStatus] (state: any, data: any) {
      state.openDetails = data
    },
    [mutationTypes.SetOpenDeleteStatus] (state: any, data: any) {
      state.openDelete = data
    },
    [mutationTypes.SetTitle] (state: any, data: any) {
      state.title = data
    },
    [mutationTypes.SetEditingStatus] (state: any, data: any) {
      state.isEditing = data
    },
    [mutationTypes.SetEditingStatus] (state: any, data: any) {
      state.editing = data
    },
    [mutationTypes.EditErrorStatus] (state: any, data: any) {
      state.errors = data
    },
    [mutationTypes.EditProviderErrorStatus] (state: any, data: any) {
      state.providererror = data
    }
  },
  actions: {
    [actionTypes.UpdateOpenStatus] ({ commit }: any, data: any) {
      commit(mutationTypes.SetOpenStatus, data)
    },
    [actionTypes.UpdateProclient] ({ commit }: any, data: any) {
      commit(mutationTypes.SetProclient, data)
    },
    [actionTypes.UpdateLoadingStatus] ({ commit }: any, data: any) {
      commit(mutationTypes.SetLoadingStatus, data)
    },
    [actionTypes.UpdateTitle] ({ commit }: any, data: any) {
      commit(mutationTypes.SetTitle, data)
    },
    [actionTypes.UpdateEditingStatus] ({ commit }: any, data: any) {
      commit(mutationTypes.SetEditingStatus, data)
    },
    [actionTypes.UpdateEditingStatus] ({ commit }: any, data: any) {
      commit(mutationTypes.SetEditingStatus, data)
    },
    [actionTypes.UpdateErrorStatus] ({ commit }: any, data: any) {
      commit(mutationTypes.EditErrorStatus, JSON.parse(JSON.stringify(data)))
    },
    [actionTypes.UpdateProviderErrorStatus] ({ commit }: any, data: any) {
      commit(mutationTypes.EditProviderErrorStatus, JSON.parse(JSON.stringify(data)))
    }
  }
}
