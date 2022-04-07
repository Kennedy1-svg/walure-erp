import { computed } from 'vue'
import * as mutationTypes from './constants/mutation'
import * as actionTypes from './constants/action'
import { api_url } from '../../../config'
import { addData, fetchData, editData, removeData, addEmptyData } from '../../../helpers/api'

export default {
  state: () => ({
      courses: '',
      course_applicants: '',
      course_applicant: {
        FirstName: '',
        LastName: '',
        Email: '',
        PhoneNumber: '',
        CourseId: '',
        Sex: '',
        Addresss: '',
        OtherNames: '',
      },
      course: {
        title: '',
        courseCode: '',
        subTitle: '',
        description: '',
        thumbnail: '',
        cost: '',
        duration: '',
        levelType: '',
        categories: '',
        banner: '',
        resourceUrl: '',
        CourseLine1: '',
        CourseLine2: '',
        CourseLine3: '',
        CourseLine4: '',
        CourseLine5: '',
        isActive: false,
        isFeatured: false,
      },
      categories: '',
      editcourse: '',
      curriculum: '',
      editcourseapplicant: '',
      editcours: '',
      course_categories: '',
      course_category: {
        name: '',
        description: '',
      },
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
    getEditCourseApplicant: (state: any) => {
      return computed(() => {
        return state.editcourseapplicant
      })
    },
    getNewCourseCategory: (state: any) => {
      return computed(() => {
        return state.course_category
      })
    },
    getNewCourse: (state: any) => {
      return computed(() => {
        return state.course
      })
    },
    getCurriculum: (state: any) => {
      return computed(() => {
        return state.curriculum
      })
    },
    getCourseApplicants: (state: any) => {
      return computed(() => {
        return state.course_applicants
      })
    },
    getNewCourseApplicant: (state: any) => {
      return computed(() => {
        return state.course_applicant
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
    [mutationTypes.SetNewCourse] (state: any, data: any) {
      state.course = data
    },
    [mutationTypes.SetCourseCategories] (state: any, data: any) {
      state.course_categories = data
    },
    [mutationTypes.SetCurriculum] (state: any, data: any) {
      state.curriculum = data
    },
    [mutationTypes.SetEditCourse] (state: any, data: any) {
      state.editcourse = data
    },
    [mutationTypes.SetEditCourseApplicant] (state: any, data: any) {
      state.editcourseapplicant = data
    },
    [mutationTypes.SetCourseApplicants] (state: any, data: any) {
      state.course_applicants = data
    },
    [mutationTypes.SetNewCourseApplicant] (state: any, data: any) {
      state.course_applicant = data
    },
    [mutationTypes.SetCourseAlertStatus] (state: any, data: any) {
      state.alert_status = data
    },
    [mutationTypes.SetCourseAlertText] (state: any, data: any) {
      state.alert_text = data
    },
    [mutationTypes.SetEditCourseCategory] (state: any, data: any) {
      state.course_category = data
    },
  },
  actions: {
    async [actionTypes.FetchCourses] ({ commit }: any, data: any = `${api_url}api/course/get-courses/{pageIndex}/{pageSize}`) {
      const token:any = localStorage.getItem('token')
      const courses:any = await fetchData(data)
      console.log('courses', courses)
      commit(mutationTypes.SetCourses, courses)
    },
    async [actionTypes.FetchCourseCategories] ({ commit }: any, data: any = `${api_url}api/coursecategory/get-categories`) {
      const token:any = localStorage.getItem('token')
      console.log('data', data)
      const categories:any = await fetchData(data)
      console.log('categories', categories)
      commit(mutationTypes.SetCourseCategories, categories)
    },
    async [actionTypes.FetchEditCourse] ({ commit }: any, data: any) {
      const token:any = localStorage.getItem('token')
      console.log('token here')
      const course = await fetchData(data)
      console.log('data tch', data)
      // console.log('Icourses', course.payload)
    //   console.log('Icourses', courses.value)
    //   console.log('Icourses', JSON.parse(JSON.stringify(courses)))
    //   console.log('Icourses', JSON.parse(JSON.stringify(courses.value)))
    //   console.log('Icourses', courses.value)
      commit(mutationTypes.SetEditCourse, course.payload)
      // commit(mutationTypes.SetTotalCount, students.totalCount)
    },
    async [actionTypes.AddNewCourseApplicant] ({ commit, dispatch }: any, data: any) {
      console.log('token here')
      const course_applicant = await addData(data.url, data.data)
      if (!course_applicant.hasErrors) {
        // commit(mutationTypes.SetNewCourseCategory, course_applicant.payload)
        await commit(mutationTypes.SetCourseAlertText, 'Course Applicant added successfully')
        await commit(mutationTypes.SetCourseAlertStatus, true)
        await dispatch(actionTypes.FetchCourseApplicants)
      } else if (course_applicant.message.includes('400')) {
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
    async [actionTypes.UpdateApplicantStatus] ({ commit, dispatch }: any, data: any) {
      const token:any = localStorage.getItem('token')
      console.log('token in update')
      console.log('update data is', data)
      const updateApplicantStatus = await addEmptyData(data)
      console.log('updateApplicantStatus', updateApplicantStatus)
      if (updateApplicantStatus.payload) {
        await commit(mutationTypes.SetCourseAlertText, 'Applicant status updated successfully')
        await commit(mutationTypes.SetCourseAlertStatus, true)
        await dispatch(actionTypes.FetchCourseApplicants)
      } else if (updateApplicantStatus.message.includes('400')) {
        await commit(mutationTypes.SetCourseAlertText, 'Bad request received')
        await commit(mutationTypes.SetCourseAlertStatus, true)
      } else if (updateApplicantStatus.message.includes('404')) {
        await commit(mutationTypes.SetCourseAlertText, 'Applicant not found')
        await commit(mutationTypes.SetCourseAlertStatus, true)
      } else {
        await commit(mutationTypes.SetCourseAlertText, 'Something went wrong')
        await commit(mutationTypes.SetCourseAlertStatus, true)
      }

      setTimeout(() => {
        commit(mutationTypes.SetCourseAlertStatus, false)
        commit(mutationTypes.SetCourseAlertText, '')
      }, 2000)
    },
    async [actionTypes.FetchEditCourseApplicant] ({ commit }: any, data: any) {
      const token:any = localStorage.getItem('token')
      console.log('token here')
      const applicant = await fetchData(data)
      console.log('data tch', applicant.payload)
      await commit(mutationTypes.SetEditCourseApplicant, applicant.payload)
    },
    async [actionTypes.AddNewCourseCategory] ({ commit, dispatch }: any, data: any) {
      const token:any = localStorage.getItem('token')
      console.log('token here')
      const course_category = await addData(data.url, data.data)
      if (!course_category.hasErrors) {
        // commit(mutationTypes.SetNewCourseCategory, course_category.payload)
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
        commit(mutationTypes.SetCourseAlertText, '')
      }, 2000)
    },
    async [actionTypes.AddNewCourse] ({ commit, dispatch }: any, data: any) {
      const token:any = localStorage.getItem('token')
      console.log('token here')
      const course_category = await addData(data.url, data.data)
      if (!course_category.hasErrors) {
        // commit(mutationTypes.SetNewCourseCategory, course_category.payload)
        await commit(mutationTypes.SetCourseAlertText, 'Course added successfully')
        await commit(mutationTypes.SetCourseAlertStatus, true)
        await dispatch(actionTypes.FetchCourses)
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
    async [actionTypes.FetchCourseApplicants] ({ commit }: any, data: any = `${api_url}api/courseapplicant/get-courseapplicant/{pageNumber}/{pageSize}`) {
      const token:any = localStorage.getItem('token')
      const courseapplicants:any = await fetchData(data)
      console.log('course applicants', courseapplicants)
      commit(mutationTypes.SetCourseApplicants, courseapplicants)
    },
    async [actionTypes.FetchCurriculum] ({ commit }: any, data: any) {
      const token:any = localStorage.getItem('token')
      const curriculum:any = await fetchData(data)
      console.log('course curriculum', curriculum)
      commit(mutationTypes.SetCurriculum, curriculum)
    },
    async [actionTypes.FetchEditCourseCategory] ({ commit }: any, data: any) {
      await commit(mutationTypes.SetEditCourseCategory, data)
    },
    async [actionTypes.EditCourseCategory] ({ commit, dispatch }: any, data: any) {
      const token:any = localStorage.getItem('token')
      console.log('token here')
      const course_category = await editData(data.url, data.data)
      if (!course_category.hasErrors) {
        // commit(mutationTypes.SetNewCourseCategory, course_category.payload)
        await commit(mutationTypes.SetCourseAlertText, 'Course Category updated successfully')
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
        // commit(mutationTypes.SetNewCourseCategory, '')
        commit(mutationTypes.SetCourseAlertText, '')
      }, 2000)
    },
    async [actionTypes.RemoveCourseCategory] ({ commit, dispatch }: any, data: any) {
      const token:any = localStorage.getItem('token')
      console.log('token here')
      const course_category = await removeData(data)
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
        commit(mutationTypes.SetCourseAlertText, '')
      }, 2000)
    },
    async [actionTypes.RemoveCourseApplicant] ({ commit, dispatch }: any, data: any) {
      const token:any = localStorage.getItem('token')
      console.log('token here')
      const course_category = await removeData(data)
      if (!course_category.hasErrors) {
        await commit(mutationTypes.SetCourseAlertText, 'Course Applicant removed successfully')
        await commit(mutationTypes.SetCourseAlertStatus, true)
        await dispatch(actionTypes.FetchCourseApplicants)
      } else if (course_category.message.includes('400')) {
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
    },
    async [actionTypes.RemoveCourse] ({ commit, dispatch }: any, data: any) {
      const token:any = localStorage.getItem('token')
      console.log('token here')
      const course = await removeData(data)
      if (!course.hasErrors) {
        await commit(mutationTypes.SetCourseAlertText, 'Course removed successfully')
        await commit(mutationTypes.SetCourseAlertStatus, true)
        await dispatch(actionTypes.FetchCourses)
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