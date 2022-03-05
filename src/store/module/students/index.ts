import { computed } from 'vue'
import * as mutationTypes from './constants/mutation'
import * as actionTypes from './constants/action'
import { addData, fetchData, editData, removeData } from '../../../helpers/api'

export default {
  state: () => ({
    students: '',
    total_count: '',
    isEditing: false,
    title: ''
  }),
  getters: {
    GetStudent: (state: any) => {
      return computed(() => {
        return state.students
      })
    },
    getTotalCount: (state: any) => {
      return computed(() => {
        return state.total_count
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
    [mutationTypes.SetTotalCount] (state: any, data: any) {
      state.total_count = data
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
      const token:any = localStorage.getItem('token')
    //   console.log('token here', token)
      const students = await fetchData(data, token)
    //   console.log('data', data)
    //   console.log('Istudents', students.payload)
    //   console.log('Istudents', students.value)
    //   console.log('Istudents', JSON.parse(JSON.stringify(students)))
    //   console.log('Istudents', JSON.parse(JSON.stringify(students.value)))
    //   console.log('Istudents', students.value)
      commit(mutationTypes.SetStudent, students.payload)
      commit(mutationTypes.SetTotalCount, students.totalCount)
    },
  }
}
