import { computed } from 'vue'
import * as mutationTypes from './constants/mutation'
import * as actionTypes from './constants/action'
import { addData, fetchData, editData, removeData } from '../../../helpers/api'

export default {
    state: () => ({
        batch: '',
        total_count: '',
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
        async [actionTypes.FetchBatch] ({ commit }: any, data: any) {
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
          commit(mutationTypes.SetTotalCount, batch.totalCount)
        },
    },
}