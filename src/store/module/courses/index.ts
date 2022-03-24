import { computed } from 'vue'
import * as mutationTypes from './constants/mutation'
import * as actionTypes from './constants/action'
import { api_url } from '../../../config'
import { addData, fetchData, editData, removeData } from '../../../helpers/api'

export default {
    state: () => ({
        courses: '',
        categories: '',
        editcourse: '',
        course_categories: '',
        course_category: {},
        alert_status: false,
        alert_text: '',
    }),
    getters: {
      getCourses: (state: any) => {
        return computed(() => {
          return state.courses
        })
      },
      getCourseCategories: (state: any) => {
        return computed(() => {
          return state.course_categories
        })
      },
      getEditCourse: (state: any) => {
        return computed(() => {
          return state.editcourse
        })
      },
      getNewCourseCategory: (state: any) => {
        return computed(() => {
          return state.course_category
        })
      },
      getCourseAlertStatus: (state: any) => {
        return computed(() => {
          return state.alert_status
        })
      },   
      getCourseAlertText: (state: any) => {
        return computed(() => {
          return state.alert_text
        })
      },
    },
    mutations: {
      [mutationTypes.SetCourses] (state: any, data: any) {
        state.courses = data
      },
      [mutationTypes.SetNewCourseCategory] (state: any, data: any) {
        state.course_category = data
      },
      [mutationTypes.SetCourseCategories] (state: any, data: any) {
        state.course_categories = data
      },
      [mutationTypes.SetEditCourse] (state: any, data: any) {
        state.editcourse = data
      },
      [mutationTypes.SetCourseAlertStatus] (state: any, data: any) {
        state.alert_status = data
      },
      [mutationTypes.SetCourseAlertText] (state: any, data: any) {
        state.alert_text = data
      },
    },
    actions: {
      async [actionTypes.FetchCourses] ({ commit }: any, data: any = `${api_url}api/course/get-courses/{pageIndex}/{pageSize}`) {
        const token:any = localStorage.getItem('token')
        const courses:any = await fetchData(data, token)
        console.log('courses', courses)
        commit(mutationTypes.SetCourses, courses)
      },
      async [actionTypes.FetchCourseCategories] ({ commit }: any, data: any = `${api_url}api/coursecategory/get-categories`) {
        const token:any = localStorage.getItem('token')
        console.log('data', data)
        const categories:any = await fetchData(data, token)
        console.log('categories', categories)
        commit(mutationTypes.SetCourseCategories, categories)
      },
      async [actionTypes.FetchEditCourse] ({ commit }: any, data: any) {
        const token:any = localStorage.getItem('token')
        console.log('token here', token)
        const course = await fetchData(data, token)
        console.log('data tch', data)
        // console.log('Icourses', course.payload)
      //   console.log('Icourses', courses.value)
      //   console.log('Icourses', JSON.parse(JSON.stringify(courses)))
      //   console.log('Icourses', JSON.parse(JSON.stringify(courses.value)))
      //   console.log('Icourses', courses.value)
        commit(mutationTypes.SetEditCourse, course.payload)
        // commit(mutationTypes.SetTotalCount, students.totalCount)
      },
      async [actionTypes.AddCourse] ({ commit }: any, data: any) {

      },
      async [actionTypes.AddNewCourseCategory] ({ commit, dispatch }: any, data: any) {
        const token:any = localStorage.getItem('token')
        console.log('token here', token)
        const course_category = await addData(data.url, data.data, token)
        if (!course_category.hasErrors) {
          commit(mutationTypes.SetNewCourseCategory, course_category.payload)
          await commit(mutationTypes.SetCourseAlertText, 'Course Category added successfully')
          await commit(mutationTypes.SetCourseAlertStatus, true)
          await dispatch(actionTypes.FetchCourseCategories)
        } else if (course_category.message.includes('400')) {
          await commit(mutationTypes.SetCourseAlertText, 'Invalid Input!')
          await commit(mutationTypes.SetCourseAlertStatus, true)
        } else {
          await commit(mutationTypes.SetCourseAlertText, 'Houston, we have a problem!')
          await commit(mutationTypes.SetCourseAlertStatus, true)
        }
  
        setTimeout(() => {
          commit(mutationTypes.SetCourseAlertStatus, false)
        }, 2000)
      },
      async [actionTypes.RemoveCourseCategory] ({ commit, dispatch }: any, data: any) {
        const token:any = localStorage.getItem('token')
        console.log('token here', token)
        const course_category = await removeData(data, token)
        if (!course_category.hasErrors) {
          await commit(mutationTypes.SetCourseAlertText, 'Course Category removed successfully')
          await commit(mutationTypes.SetCourseAlertStatus, true)
          await dispatch(actionTypes.FetchCourseCategories)
        } else if (course_category.message.includes('400')) {
          await commit(mutationTypes.SetCourseAlertText, 'Invalid Id!')
          await commit(mutationTypes.SetCourseAlertStatus, true)
        } else {
          await commit(mutationTypes.SetCourseAlertText, 'Houston, we have a problem!')
          await commit(mutationTypes.SetCourseAlertStatus, true)
        }
  
        setTimeout(() => {
          commit(mutationTypes.SetCourseAlertStatus, false)
        }, 2000)
      },
    },
}