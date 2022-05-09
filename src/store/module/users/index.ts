import { computed } from 'vue'
import * as mutationTypes from './constants/mutation'
import * as actionTypes from './constants/action'
import { api_url } from '../../../config'
import router from '../../../router'
import { addData, fetchData, editData, removeData, addEmptyData, addDataFile } from '../../../helpers/api';

export default {
  state: () => ({
      users: '',
      roles: '',
      role: {
        code: '',
        totalCount: '',
        Email: '',
        PhoneNumber: '',
        UserId: '',
        Sex: '',
        Addresss: '',
        OtherNames: '',
      },
      user: {
        email: '',
        userName: '',
        lastName: '',
        firstName: '',
        phoneNumber: '',
        password: '',
        department: '',
        roleId: '',
      },
      edituser: '',
      editrole: '',
      alert_status: false,
      alert_text: '',
  }),
  getters: {
    getUsers: (state: any) => {
      return computed(() => {
        return state.users
      })
    },
    getRole: (state: any) => {
      return computed(() => {
        return state.roles
      })
    },
    getEditUser: (state: any) => {
      return computed(() => {
        return state.edituser
      })
    },
    getNewRole: (state: any) => {
      return computed(() => {
        return state.role
      })
    },
    getNewUser: (state: any) => {
      return computed(() => {
        return state.user
      })
    },
    getUserAlertStatus: (state: any) => {
      return computed(() => {
        return state.alert_status
      })
    },   
    getUserAlertText: (state: any) => {
      return computed(() => {
        return state.alert_text
      })
    },
  },
  mutations: {
    [mutationTypes.SetUsers] (state: any, data: any) {
      state.users = data
    },
    [mutationTypes.SetNewRole] (state: any, data: any) {
      state.role = data
    },
    [mutationTypes.SetNewUser] (state: any, data: any) {
      state.user = data
    },
    [mutationTypes.SetRole] (state: any, data: any) {
      state.roles = data
    },
    [mutationTypes.SetEditUser] (state: any, data: any) {
      console.log('i don reach to update')
      state.edituser = data
      // console.log('this is data in edit user', state.edituser)
    },
    [mutationTypes.SetUserAlertStatus] (state: any, data: any) {
      state.alert_status = data
    },
    [mutationTypes.SetUserAlertText] (state: any, data: any) {
      state.alert_text = data
    },
    [mutationTypes.SetEditRole] (state: any, data: any) {
      state.role = data
    },
  },
  actions: {
    async [actionTypes.FetchUsers] ({ commit }: any, data: any = `${api_url}api/user/get-users/{pageIndex}/{pageSize}`) {
      const token:any = localStorage.getItem('token')
      const users:any = await fetchData(data, token)
      console.log('users', users)
      if (users.payload) {
        await commit(mutationTypes.SetUsers, users)
      } else if (users.response.status === 401) {
        router.push({ name: 'Login' });
      }
    },
    async [actionTypes.FetchRole] ({ commit }: any, data: any = `${api_url}api/role/get-roles/{pageNumber}/{pageSize}`) {
      const token:any = localStorage.getItem('token')
      console.log('data', data)
      const roles:any = await fetchData(data, token)
      console.log('roles', roles)
      if (roles.payload) {
        await commit(mutationTypes.SetRole, roles)
      } else if (roles.response.status === 401) {
        router.push({ name: 'Login' });
      }
    },
    async [actionTypes.FetchEditUser] ({ commit }: any, data: any) {
      const token:any = localStorage.getItem('token')
      console.log('token here')
      const user = await fetchData(data, token)
      console.log('data tch', data)
      // console.log('Iusers', user.payload)
    //   console.log('Iusers', users.value)
    //   console.log('Iusers', JSON.parse(JSON.stringify(users)))
    //   console.log('Iusers', JSON.parse(JSON.stringify(users.value)))
    //   console.log('Iusers', users.value)
      if (user.payload) {
        await commit(mutationTypes.SetEditUser, user.payload)
      } else if (user.response.status === 401) {
        router.push({ name: 'Login' });
      }
      // await commit(mutationTypes.SetNewUser, user.payload)
    },
    async [actionTypes.AddNewRole] ({ commit, dispatch }: any, data: any) {
      const token:any = localStorage.getItem('token')
      console.log('token here')
      const role = await addData(data.url, data.data, token)
      if (!role.hasErrors) {
        // commit(mutationTypes.SetNewRole, role.payload)
        await commit(mutationTypes.SetUserAlertText, 'User Category added successfully')
        await commit(mutationTypes.SetUserAlertStatus, true)
        await dispatch(actionTypes.FetchRole)
      } else if (role.response.status === 401) {
        router.push({ name: 'Login' });
      } else if (role.message.includes('400')) {
        await commit(mutationTypes.SetUserAlertText, 'Invalid Input!')
        await commit(mutationTypes.SetUserAlertStatus, true)
      } else {
        await commit(mutationTypes.SetUserAlertText, 'Houston, we have a problem!')
        await commit(mutationTypes.SetUserAlertStatus, true)
      }

      setTimeout(() => {
        commit(mutationTypes.SetUserAlertStatus, false)
        commit(mutationTypes.SetUserAlertText, '')
      }, 2000)
    },
    async [actionTypes.AddNewUser] ({ commit, dispatch }: any, data: any) {
      const token:any = localStorage.getItem('token')
      console.log('token here')
      const role = await addData(data.url, data.data, token)
      if (!role.hasErrors) {
        // commit(mutationTypes.SetNewRole, role.payload)
        await commit(mutationTypes.SetUserAlertText, 'User added successfully')
        await commit(mutationTypes.SetUserAlertStatus, true)
        await dispatch(actionTypes.FetchUsers)
      } else if (role.response.status === 401) {
        router.push({ name: 'Login' });
      } else if (role.message.includes('400')) {
        await commit(mutationTypes.SetUserAlertText, 'Invalid Input!')
        await commit(mutationTypes.SetUserAlertStatus, true)
      } else {
        await commit(mutationTypes.SetUserAlertText, 'Houston, we have a problem!')
        await commit(mutationTypes.SetUserAlertStatus, true)
      }

      setTimeout(() => {
        commit(mutationTypes.SetUserAlertStatus, false)
        commit(mutationTypes.SetUserAlertText, '')
      }, 2000)
    },
    async [actionTypes.EditUser] ({ commit, dispatch }: any, data: any) {
      const token:any = localStorage.getItem('token')
      console.log('token here')
      const role = await editData(data.url, data.data, token)
      if (!role.hasErrors) {
        // commit(mutationTypes.SetNewRole, role.payload)
        await commit(mutationTypes.SetUserAlertText, 'User updated successfully')
        await commit(mutationTypes.SetUserAlertStatus, true)
        await dispatch(actionTypes.FetchUsers)
      } else if (role.response.status === 401) {
        router.push({ name: 'Login' });
      } else if (role.message.includes('400')) {
        await commit(mutationTypes.SetUserAlertText, 'Invalid Input!')
        await commit(mutationTypes.SetUserAlertStatus, true)
      } else {
        await commit(mutationTypes.SetUserAlertText, 'Houston, we have a problem!')
        await commit(mutationTypes.SetUserAlertStatus, true)
      }

      setTimeout(() => {
        commit(mutationTypes.SetUserAlertStatus, false)
        commit(mutationTypes.SetUserAlertText, '')
      }, 2000)
    },
    async [actionTypes.FetchEditRole] ({ commit }: any, data: any) {
      await commit(mutationTypes.SetEditRole, data)
    },
    async [actionTypes.EditRole] ({ commit, dispatch }: any, data: any) {
      const token:any = localStorage.getItem('token')
      console.log('token here')
      const role = await editData(data.url, data.data, token)
      if (!role.hasErrors) {
        // commit(mutationTypes.SetNewRole, role.payload)
        await commit(mutationTypes.SetUserAlertText, 'User Category updated successfully')
        await commit(mutationTypes.SetUserAlertStatus, true)
        await dispatch(actionTypes.FetchRole)
      } else if (role.response.status === 401) {
        router.push({ name: 'Login' });
      } else if (role.message.includes('400')) {
        await commit(mutationTypes.SetUserAlertText, 'Invalid Input!')
        await commit(mutationTypes.SetUserAlertStatus, true)
      } else {
        await commit(mutationTypes.SetUserAlertText, 'Houston, we have a problem!')
        await commit(mutationTypes.SetUserAlertStatus, true)
      }

      setTimeout(() => {
        commit(mutationTypes.SetUserAlertStatus, false)
        // commit(mutationTypes.SetNewRole, '')
        commit(mutationTypes.SetUserAlertText, '')
      }, 2000)
    },
    async [actionTypes.RemoveRole] ({ commit, dispatch }: any, data: any) {
      const token:any = localStorage.getItem('token')
      console.log('token here')
      const role = await removeData(data, token)
      if (!role.hasErrors) {
        await commit(mutationTypes.SetUserAlertText, 'User Category removed successfully')
        await commit(mutationTypes.SetUserAlertStatus, true)
        await dispatch(actionTypes.FetchRole)
      } else if (role.response.status === 401) {
        router.push({ name: 'Login' });
      } else if (role.message.includes('400')) {
        await commit(mutationTypes.SetUserAlertText, 'Invalid Id!')
        await commit(mutationTypes.SetUserAlertStatus, true)
      } else {
        await commit(mutationTypes.SetUserAlertText, 'Houston, we have a problem!')
        await commit(mutationTypes.SetUserAlertStatus, true)
      }

      setTimeout(() => {
        commit(mutationTypes.SetUserAlertStatus, false)
        commit(mutationTypes.SetUserAlertText, '')
      }, 2000)
    },
    async [actionTypes.RemoveUser] ({ commit, dispatch }: any, data: any) {
      const token:any = localStorage.getItem('token')
      console.log('token here')
      const user = await removeData(data, token)
      if (!user.hasErrors) {
        await commit(mutationTypes.SetUserAlertText, 'User removed successfully')
        await commit(mutationTypes.SetUserAlertStatus, true)
        await dispatch(actionTypes.FetchUsers)
      } else if (user.response.status === 401) {
        router.push({ name: 'Login' });
      } else if (user.message.includes('400')) {
        await commit(mutationTypes.SetUserAlertText, 'Invalid Id!')
        await commit(mutationTypes.SetUserAlertStatus, true)
      } else {
        await commit(mutationTypes.SetUserAlertText, 'Houston, we have a problem!')
        await commit(mutationTypes.SetUserAlertStatus, true)
      }

      setTimeout(() => {
        commit(mutationTypes.SetUserAlertStatus, false)
        commit(mutationTypes.SetUserAlertText, '')
      }, 2000)
    }
  },
}