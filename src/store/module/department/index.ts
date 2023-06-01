import { computed } from 'vue'
import * as mutationTypes from './constants/mutations'
import * as actionTypes from './constants/actions'
import { api_url } from '../../../config'
// import router from '../../../router'
import {  fetchData, addData, removeData, editDataPut } from '../../../helpers/api';

export default {
    state: () => ({
        department: '',
        departmentType:'' ,
        newdepartment: {
          name: '',
          description: '',
          email: '',
          uniqueidentifierCode: '',
          id: ''
        }, 
        alert_status: false,
        alert_text: '',
    }),
    getters : {
        getDepartment(state:any){
            return computed(() => {
                return state.department
              })
        },
        getDepartmentType(state:any){
            return computed(() => {
                return state.departmentType
              })
        },
        getNewDepartment(state:any){
          return computed(() => {
              return state.newdepartment
            })
      },
      getDepartmentAlertStatus: (state: any) => {
        return computed(() => {
          return state.alert_status
        })
      },
      getDepartmentAlertText: (state: any) => {
        return computed(() => {
          return state.alert_text
        })
      },   
    },
    mutations : {
        [mutationTypes.SetDepartment] (state: any, data: any) {
            state.department = data
          },
          [mutationTypes.SetDepartmentType] (state: any, data: any) {
            state.departmentType = data
          },
          [mutationTypes.SetNewDepartment] (state: any, data: any) {
            state.newdepartment = data
          },
          [mutationTypes.SetNewDepartmentAlertStatus] (state: any, data: any) {
            state.alert_status = data
          },
          [mutationTypes.SetNewDepartmentAlertText] (state: any, data: any) {
            state.alert_text = data
          },
          [mutationTypes.SetEditDepartment] (state: any, data: any) {
            state.newdepartment = data
          },
  },
    actions : {
        async [actionTypes.FetchDepartment] ({ commit }: any, data: any = `${api_url}api/Department/getall-department/`) {
            const token:any = localStorage.getItem('token')
            const department:any = await fetchData(data, token)
            console.log('department from store', department.data)
            if (department?.data?.payload) {
              await commit(mutationTypes.SetDepartment, department.data)
            // } else if (courses.response.status === 401) {
            //   router.push({ name: 'Login' });
            }
          },
          async [actionTypes.FetchDepartmentType] ({ commit }: any, data: any = `${api_url}api/Department/get-department/{id}`) {
            const token:any = localStorage.getItem('token')
            const departmentType:any = await fetchData(data, token)
            console.log('departmentType from store', departmentType.data)
            if (departmentType?.data?.payload) {
              await commit(mutationTypes.SetDepartmentType, departmentType.data)
            // } else if (courses.response.status === 401) {
            //   router.push({ name: 'Login' });
            }
          },

          async [actionTypes.AddNewDepartment] ({ commit, dispatch }: any, data: any) {
            const token:any = localStorage.getItem('token')
            console.log('token here')
            const newdepartment = await addData(data.url, data.data, token)
            if (!newdepartment.hasErrors) {
              // commit(mutationTypes.SetNewRole, user.payload)
              await commit(mutationTypes.SetNewDepartmentAlertText, 'Department added successfully')
              await commit(mutationTypes.SetNewDepartmentAlertStatus, true)
              await dispatch(actionTypes.FetchDepartment)
            } else if (newdepartment.response.status === 401) {
              // router.push({ name: 'Login' });
            } else if (newdepartment.message.includes('400')) {
              await commit(mutationTypes.SetNewDepartmentAlertText, 'Invalid Input!')
              await commit(mutationTypes.SetNewDepartmentAlertStatus, true)
            } else {
              await commit(mutationTypes.SetNewDepartmentAlertText, 'Houston, we have a problem!')
              await commit(mutationTypes.SetNewDepartmentAlertStatus, true)
            }
      
            setTimeout(() => {
              commit(mutationTypes.SetNewDepartmentAlertStatus, false)
              commit(mutationTypes.SetNewDepartmentAlertText, '')
            }, 2000)
          },

          async [actionTypes.RemoveDepartment] ({ commit, dispatch }: any, data: any) {
            const token:any = localStorage.getItem('token')
            console.log('token here')
            console.log('all data is', data)
            const newdepartment:any = await removeData(data, token)
            console.log('newexpenditure here', newdepartment)
            if (newdepartment?.data) {
              await commit(mutationTypes.SetNewDepartmentAlertText, 'Department removed successfully')
              await commit(mutationTypes.SetNewDepartmentAlertStatus, true)
              await dispatch(actionTypes.FetchDepartment)
            } else if (newdepartment?.response?.status === 401) {
              // router.push({ name: 'Login' });
            } else if (newdepartment?.message?.includes('400')) {
              await commit(mutationTypes.SetNewDepartmentAlertText, 'Invalid Input!')
              await commit(mutationTypes.SetNewDepartmentAlertStatus, true)
            } else {
              await commit(mutationTypes.SetNewDepartmentAlertText, 'Houston, we have a problem!')
              await commit(mutationTypes.SetNewDepartmentAlertStatus, true)
            }
      
            setTimeout(() => {
              commit(mutationTypes.SetNewDepartmentAlertStatus, false)
              commit(mutationTypes.SetNewDepartmentAlertText, '')
            }, 2000)
          },

          async [actionTypes.FetchEditDepartment] ({ commit }: any, data: any) {
            const token:any = localStorage.getItem('token')
            console.log('token here')
            console.log('all data is', data)
            const department:any = await fetchData(data, token)
            console.log('department', department)
            if (department?.data?.payload) {
              commit(mutationTypes.SetEditDepartment, department.data.payload)
            } else if (department?.response?.status === 401) {
              // router.push({ name: 'Login' });
            }
          },

          async [actionTypes.EditDepartment] ({ commit, dispatch }: any, data: any) {
            const token:any = localStorage.getItem('token')
            console.log('token here')
            const department:any = await editDataPut(data.url, data.data, token)
            console.log('department that came', department)
            if (department?.data) {
              // commit(mutationTypes.SetNewExpenditureCategory, expenditure.payload)
              await commit(mutationTypes.SetNewDepartmentAlertText, 'Department updated successfully')
              await commit(mutationTypes.SetNewDepartmentAlertStatus, true)
              await dispatch(actionTypes.FetchDepartment)
            } else if (department?.response?.status === 401) {
              // router.push({ name: 'Login' });
            } else if (department?.message?.includes('400')) {
              await commit(mutationTypes.SetNewDepartmentAlertText, 'Invalid Input!')
              await commit(mutationTypes.SetNewDepartmentAlertStatus, true)
            } else {
              await commit(mutationTypes.SetNewDepartmentAlertText, 'Houston, we have a problem!')
              await commit(mutationTypes.SetNewDepartmentAlertStatus, true)
            }
      
            setTimeout(() => {
              commit(mutationTypes.SetNewDepartmentAlertStatus, false)
              commit(mutationTypes.SetNewDepartmentAlertText, '')
            }, 2000)
          },

          
    }

    
}
