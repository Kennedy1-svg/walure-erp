import { computed } from 'vue'
import * as mutationTypes from './constants/mutation'
import * as actionTypes from './constants/action'
import { api_url } from '../../../config/index'
import { addData, fetchData, editData, removeData } from '../../../helpers/api'

export default {
    state: () => ({
        batches: '',
        batch: {
          title: '',
          courseId: '',
          startDate: '',
          endDate: '',
          instructors: [],
          batchCapacity: '',
          trainingType: '',
          course: ''
        },
        total_count: '',
        alert_status: false,
        alert_text: '',
        editing: false,
        isEditing: false,
        studentsInBatch: '',
        title: ''
    }),
    getters: {
        getBatch: (state: any) => {
        return computed(() => {
            return state.batches
        })
        },
        getNewBatch: (state: any) => {
        return computed(() => {
            return state.batch
        })
        },
        getTotalBatchCount: (state: any) => {
        return computed(() => {
            return state.total_count
        })
        },
        getBatchAlertStatus: (state: any) => {
          return computed(() => {
            return state.alert_status
          })
        },   
        getBatchAlertText: (state: any) => {
          return computed(() => {
            return state.alert_text
          })
        },    
        getEditBatchStatus: (state: any) => {
        return computed(() => {
            return state.isEditing
        })
        },
        getBatchTitle: (state: any) => {
        return computed(() => {
            return state.title
        })
        },
        getStudentsInBatch: (state: any) => {
          console.log(state.studentsInBatch)
          return computed(() => {
            return state.studentsInBatch
          })
        }
    },
    mutations: {
      [mutationTypes.SetBatch] (state: any, data: any) {
        state.batches = data
      },
      [mutationTypes.SetNewBatch] (state: any, data: any) {
        state.batch = data
      },
      [mutationTypes.SetTotalBatchCount] (state: any, data: any) {
        state.total_count = data
      },
      [mutationTypes.SetEditStatus] (state: any, data: any) {
        state.isEditing = data
      },
      [mutationTypes.SetEditBatch] (state: any, data: any) {
        state.batch = data
      },
      [mutationTypes.SetTitle] (state: any, data: any) {
        state.title = data
      },
      [mutationTypes.SetBatchAlertStatus] (state: any, data: any) {
        state.alert_status = data
      },
      [mutationTypes.SetBatchAlertText] (state: any, data: any) {
        state.alert_text = data
      },
      [mutationTypes.SetStudentsInBatch] (state: any, data: any) {
        console.log('studentsInaBatch', data)
        state.studentsInBatch = data
      },
    },
    actions: {
        async [actionTypes.FetchBatch] ({ commit }: any, data: any = `${api_url}api/batch/get-batches/{page}/{limit}`) {
          const token:any = localStorage.getItem('token')
        //   console.log('token here', token)
          const batch = await fetchData(data, token)
        //   console.log('data', data)
        //   console.log('Ibatchs', batchs.payload)
        //   console.log('Ibatchs', batchs.value)
        //   console.log('Ibatchs', JSON.parse(JSON.stringify(batchs)))
        //   console.log('Ibatchs', JSON.parse(JSON.stringify(batchs.value)))
        //   console.log('Ibatchs', batchs.value)
          await commit(mutationTypes.SetBatch, batch.payload)
          await commit(mutationTypes.SetTotalBatchCount, batch.totalCount)
        },
        async [actionTypes.AddStudentToBatch] ({ commit, dispatch }: any, data: any) {
          const token:any = localStorage.getItem('token')
            console.log('token here')
            console.log('data is', data)
          const addStudent = await addData(data.url, data.data)
          console.log('addStudent', addStudent)
          if (addStudent.payload) {
            commit(mutationTypes.SetBatchAlertText, 'Student added to batch successfully')
            commit(mutationTypes.SetBatchAlertStatus, true)
            dispatch(actionTypes.FetchBatch)
          } else if (addStudent.message.includes('400')) {
            commit(mutationTypes.SetBatchAlertText, 'Student already added to batch')
            commit(mutationTypes.SetBatchAlertStatus, true)
          } else if (addStudent.message.includes('404')) {
            commit(mutationTypes.SetBatchAlertText, 'Batch not found')
            commit(mutationTypes.SetBatchAlertStatus, true)
          } else {
            commit(mutationTypes.SetBatchAlertText, 'Something went wrong')
            commit(mutationTypes.SetBatchAlertStatus, true)
          }

          setTimeout(() => {
            commit(mutationTypes.SetBatchAlertStatus, false)
            commit(mutationTypes.SetBatchAlertText, '')
          }, 2000)
          // commit(mutationTypes.SetBatch, batch.payload)
          // commit(mutationTypes.SetTotalBatchCount, batch.totalCount)
        },
        async [actionTypes.AddInstructorToBatch] ({ commit, dispatch }: any, data: any) {
          const token:any = localStorage.getItem('token')
            console.log('token here')
            console.log('data is', data)
          const addInstructor = await addData(data.url, data.data)
          console.log('addInstructor', addInstructor)
          if (addInstructor.payload) {
            commit(mutationTypes.SetBatchAlertText, 'Instructor added to batch successfully')
            commit(mutationTypes.SetBatchAlertStatus, true)
            dispatch(actionTypes.FetchBatch)
          } else if (addInstructor.message.includes('400')) {
            commit(mutationTypes.SetBatchAlertText, 'Instructor already added to batch')
            commit(mutationTypes.SetBatchAlertStatus, true)
          } else if (addInstructor.message.includes('404')) {
            commit(mutationTypes.SetBatchAlertText, 'Batch not found')
            commit(mutationTypes.SetBatchAlertStatus, true)
          } else {
            commit(mutationTypes.SetBatchAlertText, 'Something went wrong')
            commit(mutationTypes.SetBatchAlertStatus, true)
          }

          setTimeout(() => {
            commit(mutationTypes.SetBatchAlertStatus, false)
            commit(mutationTypes.SetBatchAlertText, '')
          }, 2000)
          // commit(mutationTypes.SetBatch, batch.payload)
          // commit(mutationTypes.SetTotalBatchCount, batch.totalCount)
        },
        async [actionTypes.FetchStudentsInBatch] ({ commit }: any, data: any) {
          const token:any = localStorage.getItem('token')
        //   console.log('token here')
          const studentsinbatch = await fetchData(data, token)
        //   console.log('data', data)
          console.log('Ibatchs', studentsinbatch.payload)
        //   console.log('Ibatchs', batchs.value)
        //   console.log('Ibatchs', JSON.parse(JSON.stringify(batchs)))
        //   console.log('Ibatchs', JSON.parse(JSON.stringify(batchs.value)))
        //   console.log('Ibatchs', batchs.value)
          await commit(mutationTypes.SetStudentsInBatch, studentsinbatch)
          await commit(mutationTypes.SetTotalBatchCount, studentsinbatch.totalCount)
        },
        async [actionTypes.AddBatch] ({ commit, dispatch }: any, data: any) {
          const token:any = localStorage.getItem('token')
          console.log('token here')
          console.log('all data is', data.url, data.data)
          const newbatch = await addData(data.url, data.data)
          if (newbatch.payload) {
            await commit(mutationTypes.SetBatchAlertText, 'Batch added successfully')
            await commit(mutationTypes.SetBatchAlertStatus, true)
            await dispatch(actionTypes.FetchBatch)
          } else if (newbatch.message.includes('400')) {
            await commit(mutationTypes.SetBatchAlertText, 'Invalid Input!')
            await commit(mutationTypes.SetBatchAlertStatus, true)
          } else {
            await commit(mutationTypes.SetBatchAlertText, 'Houston, we have a problem!')
            await commit(mutationTypes.SetBatchAlertStatus, true)
          }
    
          setTimeout(() => {
            commit(mutationTypes.SetBatchAlertStatus, false)
            commit(mutationTypes.SetBatchAlertText, '')
          }, 2000)
        },
        async [actionTypes.RemoveBatch] ({ commit, dispatch }: any, data: any) {
          const token:any = localStorage.getItem('token')
          console.log('token here')
          console.log('all data is', data)
          const newbatch = await removeData(data)
          console.log('newbatch', newbatch)
          if (!newbatch.hasErrors) {
            await commit(mutationTypes.SetBatchAlertText, 'Batch removed successfully')
            await commit(mutationTypes.SetBatchAlertStatus, true)
            await dispatch(actionTypes.FetchBatch)
          } else if (newbatch.message.includes('400')) {
            await commit(mutationTypes.SetBatchAlertText, 'Invalid Input!')
            await commit(mutationTypes.SetBatchAlertStatus, true)
          } else {
            await commit(mutationTypes.SetBatchAlertText, 'Houston, we have a problem!')
            await commit(mutationTypes.SetBatchAlertStatus, true)
          }
    
          setTimeout(() => {
            commit(mutationTypes.SetBatchAlertStatus, false)
            commit(mutationTypes.SetBatchAlertText, '')
          }, 2000)
        },
        async [actionTypes.RemoveStudentFromBatch] ({ commit, dispatch }: any, data: any) {
          console.log('i am here')
          const token:any = localStorage.getItem('token')
          console.log('token here')
          console.log('all data is', data)
          const newbatch = await addData(data.url, data.data)
          console.log('newbatch', newbatch)
          if (!newbatch.hasErrors) {
            await commit(mutationTypes.SetBatchAlertText, 'Student removed successfully')
            await commit(mutationTypes.SetBatchAlertStatus, true)
            await dispatch(actionTypes.FetchBatch)
          } else if (newbatch.message.includes('400')) {
            await commit(mutationTypes.SetBatchAlertText, 'Invalid Input!')
            await commit(mutationTypes.SetBatchAlertStatus, true)
          } else {
            await commit(mutationTypes.SetBatchAlertText, 'Houston, we have a problem!')
            await commit(mutationTypes.SetBatchAlertStatus, true)
          }
    
          setTimeout(() => {
            commit(mutationTypes.SetBatchAlertStatus, false)
            commit(mutationTypes.SetBatchAlertText, '')
          }, 2000)
        },
        async [actionTypes.FetchEditBatch] ({ commit }: any, data: any) {
          const token:any = localStorage.getItem('token')
          // console.log('token here')
          console.log('all data is', data)
          const batch = await fetchData(data, token)
          console.log('batch now now', batch)
          commit(mutationTypes.SetEditBatch, batch.payload)
          // commit(mutationTypes.SetNewBatch, batch.payload)
        },
        async [actionTypes.EditBatch] ({ commit, dispatch }: any, data: any) {
          const token:any = localStorage.getItem('token')
          console.log('token here')
          console.log('all data is', data.url, data.data)
          const newbatch = await editData(data.url, data.data)
          if (newbatch.payload) {
            await commit(mutationTypes.SetBatchAlertText, 'Batch updated successfully')
            await commit(mutationTypes.SetBatchAlertStatus, true)
            await dispatch(actionTypes.FetchBatch)
          } else if (newbatch.message.includes('400')) {
            await commit(mutationTypes.SetBatchAlertText, 'Invalid Input!')
            await commit(mutationTypes.SetBatchAlertStatus, true)
          } else {
            await commit(mutationTypes.SetBatchAlertText, 'Houston, we have a problem!')
            await commit(mutationTypes.SetBatchAlertStatus, true)
          }
    
          setTimeout(() => {
            commit(mutationTypes.SetBatchAlertStatus, false)
            commit(mutationTypes.SetBatchAlertText, '')
          }, 2000)
        }
    },
}