import { computed } from 'vue'
import * as mutationTypes from './constants/mutation'
import * as actionTypes from './constants/action'
import { addData, fetchData, editData, removeData } from '../../../helpers/api'

export default {
    state: () => ({
        courses: '',
    }),
    getters: {
      getCourses: (state: any) => {
        return computed(() => {
          return state.courses
        })
      },
    },
    mutations: {
      [mutationTypes.SetCourse] (state: any, data: any) {
        state.courses = data
      },
    },
    actions: {
      async [actionTypes.FetchCourses] ({ commit }: any, data: any) {
        const token:any = localStorage.getItem('token')
        const courses:any = await fetchData(data, token)

        commit(mutationTypes.SetCourse, data)
      },
    },
}