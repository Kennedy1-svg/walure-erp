import { computed } from 'vue'
import * as mutationTypes from './constants/mutation'
import * as actionTypes from './constants/action'
import { hr_api_url } from '../../../config'
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
    allEmployeeBiodata: '',
    employeeBiodata: {
      firstName: 'string',
      lastName: 'string',
      otherName: 'string',
      department: 'string',
      phoneNumber: 'string',
      dateOfBirth: 'string',
      dateJoined: 'string',
      sex: 'string',
      maritalStatus: 'string',
      jobTitle: 'string',
      religion: 'string',
      stateOfOrigin: 'string',
      emailAddress: 'string',
      homeAddress: 'string',
      birthdayReminder: 'string',
      imageFilePath: 'string',
      nextOfKin: 'string',
      nextOfKinState: 'string',
      nextOfKinSex: 'string',
      nextOfKinMobileNumber: 'string',
      nextOfKinHomeAddress: 'string',
      nextOfKinStateOfOrigin: 'string',
      relationshipWithNextOfKin: 'string',
      bankName: 'string',
      accountName: 'string',
      accountNumber: 'string',
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
    getAllEmployeeBiodata: (state: any) => {
      return computed(() => {
        return state.allEmployeeBiodata
      })
    },
    getNewEmployeeBiodata: (state: any) => {
      return computed(() => {
        return state.employeeBiodata
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
    [mutationTypes.SetNewLeaveManagement] (state: any, data: any) {
      console.log('i don reach to update')
      state.leaveManagement = data
      // console.log('this is data in edit course', state.editcourse)
    },
    [mutationTypes.SetEmployeeBiodata] (state: any, data: any) {
      state.leaveManagements = data
    },
    [mutationTypes.SetNewEmployeeBiodata] (state: any, data: any) {
      console.log('i don reach to update')
      state.editcourse = data
      // console.log('this is data in edit course', state.editcourse)
    },
  },
  actions: {
    async [actionTypes.FetchLeaveManagement] ({ commit }: any, data: any = `${hr_api_url}api/leavemanagement/getleave?pageIndex={pageIndex}`) {
      const token:any = localStorage.getItem('token')
      const leavemanagement:any = await fetchData(data, token)
      console.log('leavemanagement', leavemanagement)
      if (leavemanagement.payload) {
        await commit(mutationTypes.SetLeaveManagement, leavemanagement)
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
      // await commit(mutationTypes.SetNewEmployeeBiodata, course.payload)
    },
    async [actionTypes.AddNewEmployeeBiodata] ({ commit, dispatch }: any, data: any) {
      const token:any = localStorage.getItem('token')
      console.log('token here')
      const course_category = await addData(data.url, data.data, token)
      if (!course_category.hasErrors) {
        // commit(mutationTypes.SetNewEmployeeBiodata, course_category.payload)
        await commit(mutationTypes.SetEmployeeBiodataAlertText, 'EmployeeBiodata added successfully')
        await commit(mutationTypes.SetEmployeeBiodataAlertStatus, true)
        await dispatch(actionTypes.FetchLeaveManagement)
      // } else if (course_category.response.status === 401) {
      //   router.push({ name: 'Login' });
      } else if (course_category.message.includes('400')) {
        await commit(mutationTypes.SetEmployeeBiodataAlertText, 'Invalid Input!')
        await commit(mutationTypes.SetEmployeeBiodataAlertStatus, true)
      } else {
        await commit(mutationTypes.SetEmployeeBiodataAlertText, 'Houston, we have a problem!')
        await commit(mutationTypes.SetEmployeeBiodataAlertStatus, true)
      }

      setTimeout(() => {
        commit(mutationTypes.SetEmployeeBiodataAlertStatus, false)
        commit(mutationTypes.SetEmployeeBiodataAlertText, '')
      }, 2000)
    },
    async [actionTypes.EditLeaveManagement] ({ commit, dispatch }: any, data: any) {
      const token:any = localStorage.getItem('token')
      console.log('token here')
      const course_category = await editData(data.url, data.data, token)
      // if (!course_category.hasErrors) {
      //   // commit(mutationTypes.SetNewEmployeeBiodata, course_category.payload)
      //   await commit(mutationTypes.SetEmployeeBiodataAlertText, 'EmployeeBiodata updated successfully')
      //   await commit(mutationTypes.SetEmployeeBiodataAlertStatus, true)
      //   await dispatch(actionTypes.FetchLeaveManagement)
      // // } else if (course_category.response.status === 401) {
      // //   router.push({ name: 'Login' });
      // } else if (course_category.message.includes('400')) {
      //   await commit(mutationTypes.SetEmployeeBiodataAlertText, 'Invalid Input!')
      //   await commit(mutationTypes.SetEmployeeBiodataAlertStatus, true)
      // } else {
      //   await commit(mutationTypes.SetEmployeeBiodataAlertText, 'Houston, we have a problem!')
      //   await commit(mutationTypes.SetEmployeeBiodataAlertStatus, true)
      // }

      setTimeout(() => {
        commit(mutationTypes.SetEmployeeBiodataAlertStatus, false)
        commit(mutationTypes.SetEmployeeBiodataAlertText, '')
      }, 2000)
    },
    async [actionTypes.FetchEmployeeBiodata] ({ commit }: any, data: any = `${hr_api_url}api/courseapplicant/get-courseapplicant/{pageNumber}/{pageSize}`) {
      const token:any = localStorage.getItem('token')
      const courseapplicants:any = await fetchData(data, token)
      console.log('course applicants', courseapplicants)
      if (courseapplicants.payload) {
        await commit(mutationTypes.SetEmployeeBiodata, courseapplicants)
      // } else if (courseapplicants.response.status === 401) {
      //   router.push({ name: 'Login' });
      }
    },
    async [actionTypes.FetchEditEmployeeBiodata] ({ commit }: any, data: any) {
      await commit(mutationTypes.SetEditEmployeeBiodata, data)
    },
    async [actionTypes.EditEmployeeBiodata] ({ commit, dispatch }: any, data: any) {
      const token:any = localStorage.getItem('token')
      console.log('token here')
      const course_category = await editData(data.url, data.data, token)
      // if (!course_category.hasErrors) {
      //   // commit(mutationTypes.SetNewEmployeeBiodata, course_category.payload)
      //   await commit(mutationTypes.SetEmployeeBiodataAlertText, 'EmployeeBiodata  updated successfully')
      //   await commit(mutationTypes.SetEmployeeBiodataAlertStatus, true)
      //   await dispatch(actionTypes.FetchEmployeeBiodataCategories)
      // // } else if (course_category.response.status === 401) {
      // //   router.push({ name: 'Login' });
      // } else if (course_category.message.includes('400')) {
      //   await commit(mutationTypes.SetEmployeeBiodataAlertText, 'Invalid Input!')
      //   await commit(mutationTypes.SetEmployeeBiodataAlertStatus, true)
      // } else {
      //   await commit(mutationTypes.SetEmployeeBiodataAlertText, 'Houston, we have a problem!')
      //   await commit(mutationTypes.SetEmployeeBiodataAlertStatus, true)
      // }

      setTimeout(() => {
        commit(mutationTypes.SetEmployeeBiodataAlertStatus, false)
        // commit(mutationTypes.SetNewEmployeeBiodata, '')
        commit(mutationTypes.SetEmployeeBiodataAlertText, '')
      }, 2000)
    },
    async [actionTypes.RemoveEmployeeBiodata] ({ commit, dispatch }: any, data: any) {
      const token:any = localStorage.getItem('token')
      console.log('token here')
      const course_category = await removeData(data, token)
      // if (!course_category.hasErrors) {
      //   await commit(mutationTypes.SetEmployeeBiodataAlertText, 'EmployeeBiodata  removed successfully')
      //   await commit(mutationTypes.SetEmployeeBiodataAlertStatus, true)
      //   await dispatch(actionTypes.FetchEmployeeBiodataCategories)
      // // } else if (course_category.response.status === 401) {
      // //   router.push({ name: 'Login' });
      // } else if (course_category.message.includes('400')) {
      //   await commit(mutationTypes.SetEmployeeBiodataAlertText, 'Invalid Id!')
      //   await commit(mutationTypes.SetEmployeeBiodataAlertStatus, true)
      // } else {
      //   await commit(mutationTypes.SetEmployeeBiodataAlertText, 'Houston, we have a problem!')
      //   await commit(mutationTypes.SetEmployeeBiodataAlertStatus, true)
      // }

      setTimeout(() => {
        commit(mutationTypes.SetEmployeeBiodataAlertStatus, false)
        commit(mutationTypes.SetEmployeeBiodataAlertText, '')
      }, 2000)
    },
    async [actionTypes.RemoveLeaveManagement] ({ commit, dispatch }: any, data: any) {
      const token:any = localStorage.getItem('token')
      console.log('token here')
      const course:any = await removeData(data, token)
      if (!course.hasErrors) {
        await commit(mutationTypes.SetEmployeeBiodataAlertText, 'Employee Biodata removed successfully')
        await commit(mutationTypes.SetEmployeeBiodataAlertStatus, true)
        await dispatch(actionTypes.FetchLeaveManagement)
      // } else if (course.response.status === 401) {
      //   router.push({ name: 'Login' });
      } else if (course.message.includes('400')) {
        await commit(mutationTypes.SetEmployeeBiodataAlertText, 'Invalid Id!')
        await commit(mutationTypes.SetEmployeeBiodataAlertStatus, true)
      } else {
        await commit(mutationTypes.SetEmployeeBiodataAlertText, 'Houston, we have a problem!')
        await commit(mutationTypes.SetEmployeeBiodataAlertStatus, true)
      }

      setTimeout(() => {
        commit(mutationTypes.SetEmployeeBiodataAlertStatus, false)
        commit(mutationTypes.SetEmployeeBiodataAlertText, '')
      }, 2000)
    }
  },
}