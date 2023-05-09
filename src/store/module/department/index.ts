import { computed } from 'vue'
import * as mutationTypes from './constants/mutations'
import * as actionTypes from './constants/actions'
import { api_url } from '../../../config'
// import router from '../../../router'
import {  fetchData } from '../../../helpers/api';

export default {
    state: () => ({
        department: ''     
    }),
    getters : {
        getDepartment(state:any){
            return computed(() => {
                return state.courses
              })
        }    
    },
    mutations : {
        [mutationTypes.SetDepartment] (state: any, data: any) {
            state.department = data
          },
    },
    actions : {
        async [actionTypes.FetchDepartment] ({ commit }: any, data: any = `${api_url}api/Department/getall-department/`) {
            const token:any = localStorage.getItem('token')
            const department:any = await fetchData(data, token)
            console.log('department', department.data)
            if (department?.data?.payload) {
              await commit(mutationTypes.SetDepartment, department.data)
            // } else if (courses.response.status === 401) {
            //   router.push({ name: 'Login' });
            }
          }
    }

    
}
