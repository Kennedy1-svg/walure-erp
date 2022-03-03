import { computed } from 'vue'
import * as mutationTypes from './constants/mutation'
import * as actionTypes from './constants/action'
import { addData, fetchData, editData, removeData } from '../../../helpers/api'

export default {
  state: () => ({
    students: '',
    isEditing: false,
    title: ''
  }),
  getters: {
    getStudents: (state: any) => {
      return computed(() => {
        return state.students
      })
    },
    getEditStatus: (state: any) => {
      return computed(() => {
        return state.isEditing
      })
    },
    getTitle: (state: any) => {
      return computed(() => {
        return state.title
      })
    },
  },
  mutations: {
    [mutationTypes.SetStudent] (state: any, data: any) {
      state.students = data
    },
    [mutationTypes.SetEditStatus] (state: any, data: any) {
      state.isEditing = data
    },
    [mutationTypes.SetTitle] (state: any, data: any) {
      state.title = data
    },
  },
  actions: {
    async [actionTypes.FetchStudents] ({ commit }: any, data: any) {
      const students = await fetchData(data)
      commit(mutationTypes.SetStudent, students)
    },
  }
}
