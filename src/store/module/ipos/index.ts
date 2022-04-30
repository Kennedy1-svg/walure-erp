import { computed } from 'vue'
import * as mutationTypes from './constants/mutation'
import * as actionTypes from './constants/action'
import { api_url } from '../../../config'
import router from '../../../router'
import { addData, fetchData, editData, removeData, addEmptyData, addDataFile } from '../../../helpers/api';

export default {
  state: () => ({
      ipos: '',
      ipo: {
        name: '',
        email: '',
        date: '',
        PhoneNumber: '',
        message: '',
      },
      editipo: '',
      alert_status: false,
      alert_text: '',
  }),
  getters: {
    getIPOs: (state: any) => {
      return computed(() => {
        return state.ipos
      })
    },
    getEditIPO: (state: any) => {
      return computed(() => {
        return state.editipo
      })
    },
    getIPOAlertStatus: (state: any) => {
      return computed(() => {
        return state.alert_status
      })
    },   
    getIPOAlertText: (state: any) => {
      return computed(() => {
        return state.alert_text
      })
    },
  },
  mutations: {
    [mutationTypes.SetIPOs] (state: any, data: any) {
      state.ipos = data
    },
    [mutationTypes.SetEditIPO] (state: any, data: any) {
      console.log('i don reach to update')
      state.editipo = data
      // console.log('this is data in edit ipo', state.editipo)
    },
    [mutationTypes.SetIPOAlertStatus] (state: any, data: any) {
      state.alert_status = data
    },
    [mutationTypes.SetIPOAlertText] (state: any, data: any) {
      state.alert_text = data
    },
  },
  actions: {
    async [actionTypes.FetchIPOs] ({ commit }: any, data: any = `${api_url}api/ipous/get-ipos/{pageIndex}/{pageSize}`) {
      const token:any = localStorage.getItem('token')
      const ipos:any = await fetchData(data, token)
      console.log('ipos', ipos)
      if (ipos.payload) {
        await commit(mutationTypes.SetIPOs, ipos)
      } else if (ipos.response.status === 401) {
        router.push({ name: 'Login' });
      }
    },
    async [actionTypes.FetchEditIPO] ({ commit }: any, data: any) {
      const token:any = localStorage.getItem('token')
      console.log('token here')
      const ipo = await fetchData(data, token)
      console.log('data tch', data)
      // console.log('Iipos', ipo.payload)
    //   console.log('Iipos', ipos.value)
    //   console.log('Iipos', JSON.parse(JSON.stringify(ipos)))
    //   console.log('Iipos', JSON.parse(JSON.stringify(ipos.value)))
    //   console.log('Iipos', ipos.value)
      if (ipo.payload) {
        await commit(mutationTypes.SetEditIPO, ipo.payload)
      } else if (ipo.response.status === 401) {
        router.push({ name: 'Login' });
      }
      // await commit(mutationTypes.SetNewIPO, ipo.payload)
    },
    async [actionTypes.RemoveIPO] ({ commit, dispatch }: any, data: any) {
      const token:any = localStorage.getItem('token')
      console.log('token here')
      const ipo = await removeData(data, token)
      if (!ipo.hasErrors) {
        await commit(mutationTypes.SetIPOAlertText, 'IPO removed successfully')
        await commit(mutationTypes.SetIPOAlertStatus, true)
        await dispatch(actionTypes.FetchIPOs)
      } else if (ipo.response.status === 401) {
        router.push({ name: 'Login' });
      } else if (ipo.message.includes('400')) {
        await commit(mutationTypes.SetIPOAlertText, 'Invalid Id!')
        await commit(mutationTypes.SetIPOAlertStatus, true)
      } else {
        await commit(mutationTypes.SetIPOAlertText, 'Houston, we have a problem!')
        await commit(mutationTypes.SetIPOAlertStatus, true)
      }

      setTimeout(() => {
        commit(mutationTypes.SetIPOAlertStatus, false)
        commit(mutationTypes.SetIPOAlertText, '')
      }, 2000)
    }
  },
}