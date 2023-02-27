import { computed } from 'vue'
import * as mutationTypes from './constants/mutation'
import * as actionTypes from './constants/action'
import { api_url } from '../../../config'
import router from '../../../router'
import { addData, fetchData, editData, removeData, addEmptyData, addDataFile } from '../../../helpers/api';

export default {
  state: () => ({
    leaveManagements: '',
    leaveManagement: {
      name: '',
      email: '',
      phone: '',
      startDate: '',
      endDate: '',
      leaveType: '',
      resumptionDate: '',
      nameOfRelief: '',
    },
    alert_status: false,
    alert_text: '',
  }),
  getters: {
    getLeaveManagement: (state: any) => {
      return computed(() => {
        return state.leaveManagements
      })
    },
    getNewLeaveManagement: (state: any) => {
      return computed(() => {
        return state.leaveManagement
      })
    },
    getHrAlertStatus: (state: any) => {
      return computed(() => {
        return state.alert_status
      })
    },
    getHrAlertText: (state: any) => {
      return computed(() => {
        return state.alert_text
      })
    },
  },
  mutations: {
    [mutationTypes.SetLeaveManagement] (state: any, data: any) {
      state.leaveManagements = data
    },
    [mutationTypes.SetNewCurriculum] (state:any, data:any) {
      state.curriculum = data
    },
    [mutationTypes.SetEditLeaveManagement] (state: any, data: any) {
      console.log('i don reach to update')
      state.editcourse = data
      // console.log('this is data in edit course', state.editcourse)
    },
  },
  actions: {
    async [actionTypes.FetchLeaveManagement] ({ commit }: any, data: any = `${api_url}api/course/get-courses/{pageIndex}/{pageSize}`) {
      const token:any = localStorage.getItem('token')
      const courses:any = await fetchData(data, token)
      console.log('courses', courses)
      if (courses.payload) {
        await commit(mutationTypes.SetLeaveManagement, courses)
      // } else if (courses.response.status === 401) {
      //   router.push({ name: 'Login' });
      }
    },
    async [actionTypes.FetchEditLeaveManagement] ({ commit }: any, data: any) {
      const token:any = localStorage.getItem('token')
      console.log('token here')
      const course = await fetchData(data, token)
      console.log('data tch', data)
      // console.log('Icourses', course.payload)
    //   console.log('Icourses', courses.value)
    //   console.log('Icourses', JSON.parse(JSON.stringify(courses)))
    //   console.log('Icourses', JSON.parse(JSON.stringify(courses.value)))
    //   console.log('Icourses', courses.value)
      // if (course.payload) {
      //   await commit(mutationTypes.SetEditLeaveManagement, course.payload)
      // // } else if (course.response.status === 401) {
      // //   router.push({ name: 'Login' });
      // }
      // await commit(mutationTypes.SetNewCourse, course.payload)
    },
    async [actionTypes.AddNewCourse] ({ commit, dispatch }: any, data: any) {
      const token:any = localStorage.getItem('token')
      console.log('token here')
      const course_category = await addData(data.url, data.data, token)
      if (!course_category.hasErrors) {
        // commit(mutationTypes.SetNewCourseCategory, course_category.payload)
        await commit(mutationTypes.SetCourseAlertText, 'Course added successfully')
        await commit(mutationTypes.SetCourseAlertStatus, true)
        await dispatch(actionTypes.FetchLeaveManagement)
      // } else if (course_category.response.status === 401) {
      //   router.push({ name: 'Login' });
      } else if (course_category.message.includes('400')) {
        await commit(mutationTypes.SetCourseAlertText, 'Invalid Input!')
        await commit(mutationTypes.SetCourseAlertStatus, true)
      } else {
        await commit(mutationTypes.SetCourseAlertText, 'Houston, we have a problem!')
        await commit(mutationTypes.SetCourseAlertStatus, true)
      }

      setTimeout(() => {
        commit(mutationTypes.SetCourseAlertStatus, false)
        commit(mutationTypes.SetCourseAlertText, '')
      }, 2000)
    },
    async [actionTypes.EditLeaveManagement] ({ commit, dispatch }: any, data: any) {
      const token:any = localStorage.getItem('token')
      console.log('token here')
      const course_category = await editData(data.url, data.data, token)
      // if (!course_category.hasErrors) {
      //   // commit(mutationTypes.SetNewCourseCategory, course_category.payload)
      //   await commit(mutationTypes.SetCourseAlertText, 'Course updated successfully')
      //   await commit(mutationTypes.SetCourseAlertStatus, true)
      //   await dispatch(actionTypes.FetchLeaveManagement)
      // // } else if (course_category.response.status === 401) {
      // //   router.push({ name: 'Login' });
      // } else if (course_category.message.includes('400')) {
      //   await commit(mutationTypes.SetCourseAlertText, 'Invalid Input!')
      //   await commit(mutationTypes.SetCourseAlertStatus, true)
      // } else {
      //   await commit(mutationTypes.SetCourseAlertText, 'Houston, we have a problem!')
      //   await commit(mutationTypes.SetCourseAlertStatus, true)
      // }

      setTimeout(() => {
        commit(mutationTypes.SetCourseAlertStatus, false)
        commit(mutationTypes.SetCourseAlertText, '')
      }, 2000)
    },
    async [actionTypes.FetchCourseApplicants] ({ commit }: any, data: any = `${api_url}api/courseapplicant/get-courseapplicant/{pageNumber}/{pageSize}`) {
      const token:any = localStorage.getItem('token')
      const courseapplicants:any = await fetchData(data, token)
      console.log('course applicants', courseapplicants)
      if (courseapplicants.payload) {
        await commit(mutationTypes.SetCourseApplicants, courseapplicants)
      // } else if (courseapplicants.response.status === 401) {
      //   router.push({ name: 'Login' });
      }
    },
    async [actionTypes.FetchEditCourseCategory] ({ commit }: any, data: any) {
      await commit(mutationTypes.SetEditCourseCategory, data)
    },
    async [actionTypes.EditCourseCategory] ({ commit, dispatch }: any, data: any) {
      const token:any = localStorage.getItem('token')
      console.log('token here')
      const course_category = await editData(data.url, data.data, token)
      // if (!course_category.hasErrors) {
      //   // commit(mutationTypes.SetNewCourseCategory, course_category.payload)
      //   await commit(mutationTypes.SetCourseAlertText, 'Course Category updated successfully')
      //   await commit(mutationTypes.SetCourseAlertStatus, true)
      //   await dispatch(actionTypes.FetchCourseCategories)
      // // } else if (course_category.response.status === 401) {
      // //   router.push({ name: 'Login' });
      // } else if (course_category.message.includes('400')) {
      //   await commit(mutationTypes.SetCourseAlertText, 'Invalid Input!')
      //   await commit(mutationTypes.SetCourseAlertStatus, true)
      // } else {
      //   await commit(mutationTypes.SetCourseAlertText, 'Houston, we have a problem!')
      //   await commit(mutationTypes.SetCourseAlertStatus, true)
      // }

      setTimeout(() => {
        commit(mutationTypes.SetCourseAlertStatus, false)
        // commit(mutationTypes.SetNewCourseCategory, '')
        commit(mutationTypes.SetCourseAlertText, '')
      }, 2000)
    },
    async [actionTypes.RemoveCourseCategory] ({ commit, dispatch }: any, data: any) {
      const token:any = localStorage.getItem('token')
      console.log('token here')
      const course_category = await removeData(data, token)
      // if (!course_category.hasErrors) {
      //   await commit(mutationTypes.SetCourseAlertText, 'Course Category removed successfully')
      //   await commit(mutationTypes.SetCourseAlertStatus, true)
      //   await dispatch(actionTypes.FetchCourseCategories)
      // // } else if (course_category.response.status === 401) {
      // //   router.push({ name: 'Login' });
      // } else if (course_category.message.includes('400')) {
      //   await commit(mutationTypes.SetCourseAlertText, 'Invalid Id!')
      //   await commit(mutationTypes.SetCourseAlertStatus, true)
      // } else {
      //   await commit(mutationTypes.SetCourseAlertText, 'Houston, we have a problem!')
      //   await commit(mutationTypes.SetCourseAlertStatus, true)
      // }

      setTimeout(() => {
        commit(mutationTypes.SetCourseAlertStatus, false)
        commit(mutationTypes.SetCourseAlertText, '')
      }, 2000)
    },
    async [actionTypes.RemoveLeaveManagement] ({ commit, dispatch }: any, data: any) {
      const token:any = localStorage.getItem('token')
      console.log('token here')
      const course:any = await removeData(data, token)
      if (!course.hasErrors) {
        await commit(mutationTypes.SetCourseAlertText, 'Course removed successfully')
        await commit(mutationTypes.SetCourseAlertStatus, true)
        await dispatch(actionTypes.FetchLeaveManagement)
      // } else if (course.response.status === 401) {
      //   router.push({ name: 'Login' });
      } else if (course.message.includes('400')) {
        await commit(mutationTypes.SetCourseAlertText, 'Invalid Id!')
        await commit(mutationTypes.SetCourseAlertStatus, true)
      } else {
        await commit(mutationTypes.SetCourseAlertText, 'Houston, we have a problem!')
        await commit(mutationTypes.SetCourseAlertStatus, true)
      }

      setTimeout(() => {
        commit(mutationTypes.SetCourseAlertStatus, false)
        commit(mutationTypes.SetCourseAlertText, '')
      }, 2000)
    }
  },
}