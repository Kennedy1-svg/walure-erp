import { computed } from 'vue'
import * as mutationTypes from './constants/mutation'
import * as actionTypes from './constants/action'
import { api_url } from '../../../config/index'
import { addData, fetchData, editData, removeData } from '../../../helpers/api'

export default {
    state: () => ({
        batch: '',
        total_count: '',
        alert_status: false,
        alert_text: '',
        editing: false,
        isEditing: false,
        title: ''
    }),
    getters: {
        getBatch: (state: any) => {
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
    },
    mutations: {
      [mutationTypes.SetBatch] (state: any, data: any) {
        state.batch = data
      },
      [mutationTypes.SetTotalBatchCount] (state: any, data: any) {
        state.total_count = data
      },
      [mutationTypes.SetEditStatus] (state: any, data: any) {
        state.isEditing = data
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
    },
    actions: {
        async [actionTypes.FetchBatch] ({ commit }: any, data: any = `${api_url}api/batch/get-batches/{pageIndex}/{pageSize}`) {
          const token:any = localStorage.getItem('token')
        //   console.log('token here', token)
          const batch = await fetchData(data, token)
        //   console.log('data', data)
        //   console.log('Ibatchs', batchs.payload)
        //   console.log('Ibatchs', batchs.value)
        //   console.log('Ibatchs', JSON.parse(JSON.stringify(batchs)))
        //   console.log('Ibatchs', JSON.parse(JSON.stringify(batchs.value)))
        //   console.log('Ibatchs', batchs.value)
          commit(mutationTypes.SetBatch, batch.payload)
          commit(mutationTypes.SetTotalBatchCount, batch.totalCount)
        },
        async [actionTypes.AddStudentToBatch] ({ commit, dispatch }: any, data: any) {
          const token:any = localStorage.getItem('token')
            console.log('token here', token)
            console.log('data is', data)
          const addStudent = await addData(data.url, data.data, token)
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
          }, 2000)
          // commit(mutationTypes.SetBatch, batch.payload)
          // commit(mutationTypes.SetTotalBatchCount, batch.totalCount)
        }
    },
}