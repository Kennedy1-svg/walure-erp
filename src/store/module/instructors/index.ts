import { computed } from 'vue'
import * as mutationTypes from './constants/mutation'
import * as actionTypes from './constants/action'
import { api_url } from '../../../config/index'
import { addData, fetchData, editData, removeData } from '../../../helpers/api'

export default {
  state: () => ({
    instructors: [],
    instructor: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      address: '',
      image: '',
      otherName: '',
      gender: '',
      course: '',
    },
    editinstructor: '',
    total_count: '',
    isEditing: false,
    title: ''
  }),
  getters: {
    getInstructor: (state: any) => {
      return computed(() => {
        return state.instructors
      })
    },
    getEditInstructor: (state: any) => {
      return computed(() => {
        return state.editinstructor
      })
    },
    getNewInstructor: (state: any) => {
      return computed(() => {
        return state.instructor
      })
    },
    getInstructorTotalCount: (state: any) => {
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
    [mutationTypes.SetInstructor] (state: any, data: any) {
      state.instructors = data
    },
    [mutationTypes.SetEditInstructor] (state: any, data: any) {
      state.editinstructor = data
    },
    [mutationTypes.SetNewInstructor] (state: any, data: any) {
      state.instructor = data
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
    async [actionTypes.FetchInstructors] ({ commit }: any, data: any = `${api_url}api/instructor/get-instructors/{pageIndex}/{pageSize}`) {
      const token:any = localStorage.getItem('token')
      console.log('token here', token)
      const instructors = await fetchData(data, token)
      console.log('data fe', data)
    //   console.log('Iinstructors', instructors.payload)
    //   console.log('Iinstructors', instructors.value)
    //   console.log('Iinstructors', JSON.parse(JSON.stringify(instructors)))
    //   console.log('Iinstructors', JSON.parse(JSON.stringify(instructors.value)))
    //   console.log('Iinstructors', instructors.value)
      commit(mutationTypes.SetInstructor, instructors.payload)
      commit(mutationTypes.SetTotalCount, instructors.totalCount)
    },
    async [actionTypes.FetchEditInstructor] ({ commit }: any, data: any) {
      const token:any = localStorage.getItem('token')
      console.log('token here', token)
      const instructor = await fetchData(data, token)
      console.log('data tch', data)
      // console.log('Iinstructors', instructor.payload)
    //   console.log('Iinstructors', instructors.value)
    //   console.log('Iinstructors', JSON.parse(JSON.stringify(instructors)))
    //   console.log('Iinstructors', JSON.parse(JSON.stringify(instructors.value)))
    //   console.log('Iinstructors', instructors.value)
      commit(mutationTypes.SetEditInstructor, instructor.payload)
      // commit(mutationTypes.SetTotalCount, instructors.totalCount)
    },
    async [actionTypes.FilterInstructor] ({ commit }: any, data: any) {
      const token:any = localStorage.getItem('token')
      console.log('token here', token)
      const instructor = await fetchData(data, token)
      console.log('data', data)
      console.log('Iinstructors', instructor.payload)
    //   console.log('Iinstructors', instructors.value)
    //   console.log('Iinstructors', JSON.parse(JSON.stringify(instructors)))
    //   console.log('Iinstructors', JSON.parse(JSON.stringify(instructors.value)))
    //   console.log('Iinstructors', instructors.value)
      commit(mutationTypes.SetInstructor, instructor.payload)
      // commit(mutationTypes.SetTotalCount, instructors.totalCount)
    },
    async [actionTypes.AddNewInstructor] ({ commit, dispatch }: any, data: any) {
      const token:any = localStorage.getItem('token')
      console.log('token here', token)
      console.log('data is', data)
      const instructor = await addData(data.url, data.data, token)
      await dispatch(actionTypes.FetchInstructors)
    }
  }
}
