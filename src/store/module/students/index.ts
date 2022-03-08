import { computed } from 'vue'
import * as mutationTypes from './constants/mutation'
import * as actionTypes from './constants/action'
import { addData, fetchData, editData, removeData } from '../../../helpers/api'

export default {
  state: () => ({
    students: '',
    editstudent: '',
    total_count: '',
    isEditing: false,
    title: ''
  }),
  getters: {
    getStudent: (state: any) => {
      return computed(() => {
        return state.students
      })
    },
    getEditStudent: (state: any) => {
      return computed(() => {
        return state.editstudent
      })
    },
    getStudentTotalCount: (state: any) => {
      return computed(() => {
        console.log('total_count here', state.total_count)
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
    [mutationTypes.SetEditStudent] (state: any, data: any) {
      state.editstudent = data
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
      console.log('token here', token)
      const students = await fetchData(data, token)
      console.log('data fe', data)
    //   console.log('Istudents', students.payload)
    //   console.log('Istudents', students.value)
    //   console.log('Istudents', JSON.parse(JSON.stringify(students)))
    //   console.log('Istudents', JSON.parse(JSON.stringify(students.value)))
    //   console.log('Istudents', students.value)
      commit(mutationTypes.SetStudent, students.payload)
      commit(mutationTypes.SetTotalCount, students.totalCount)
    },
    async [actionTypes.FetchEditStudent] ({ commit }: any, data: any) {
      const token:any = localStorage.getItem('token')
      console.log('token here', token)
      const student = await fetchData(data, token)
      console.log('data tch', data)
      // console.log('Istudents', student.payload)
    //   console.log('Istudents', students.value)
    //   console.log('Istudents', JSON.parse(JSON.stringify(students)))
    //   console.log('Istudents', JSON.parse(JSON.stringify(students.value)))
    //   console.log('Istudents', students.value)
      commit(mutationTypes.SetEditStudent, student.payload)
      // commit(mutationTypes.SetTotalCount, students.totalCount)
    },
    async [actionTypes.FilterStudent] ({ commit }: any, data: any) {
      const token:any = localStorage.getItem('token')
      console.log('token here', token)
      const student = await fetchData(data, token)
      console.log('data', data)
      console.log('Istudents', student.payload)
    //   console.log('Istudents', students.value)
    //   console.log('Istudents', JSON.parse(JSON.stringify(students)))
    //   console.log('Istudents', JSON.parse(JSON.stringify(students.value)))
    //   console.log('Istudents', students.value)
      commit(mutationTypes.SetStudent, student.payload)
      // commit(mutationTypes.SetTotalCount, students.totalCount)
    },
  }
}
