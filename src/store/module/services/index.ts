import { computed } from 'vue'
import * as mutationTypes from './constants/mutation'
import * as actionTypes from './constants/action'
import { api_url } from '../../../config/index'
import { addData, fetchData, editData, removeData } from '../../../helpers/api'

export default {
    state: () => ({
        projects: '',
        project: {
          name: '',
          courseId: '',
          startDate: '',
          endDate: '',
          instructor: [],
          projectCapacity: '',
          trainingType: '',
          course: ''
        },
        total_count: '',
        alert_status: false,
        alert_text: '',
        editing: false,
        isEditing: false,
        studentsInProject: '',
        title: ''
    }),
    getters: {
        getProject: (state: any) => {
        return computed(() => {
            return state.projects
        })
        },
        getNewProject: (state: any) => {
        return computed(() => {
            return state.project
        })
        },
        getTotalProjectCount: (state: any) => {
        return computed(() => {
            return state.total_count
        })
        },
        getProjectAlertStatus: (state: any) => {
          return computed(() => {
            return state.alert_status
          })
        },   
        getProjectAlertText: (state: any) => {
          return computed(() => {
            return state.alert_text
          })
        },    
        getEditProjectStatus: (state: any) => {
        return computed(() => {
            return state.isEditing
        })
        },
        getProjectTitle: (state: any) => {
        return computed(() => {
            return state.title
        })
        },
        getStudentsInProject: (state: any) => {
          console.log(state.studentsInProject)
          return computed(() => {
            return state.studentsInProject
          })
        }
    },
    mutations: {
      [mutationTypes.SetProject] (state: any, data: any) {
        state.projects = data
      },
      [mutationTypes.SetNewProject] (state: any, data: any) {
        state.project = data
      },
      [mutationTypes.SetTotalProjectCount] (state: any, data: any) {
        state.total_count = data
      },
      [mutationTypes.SetEditStatus] (state: any, data: any) {
        state.isEditing = data
      },
      [mutationTypes.SetEditProject] (state: any, data: any) {
        state.project = data
      },
      [mutationTypes.SetTitle] (state: any, data: any) {
        state.title = data
      },
      [mutationTypes.SetProjectAlertStatus] (state: any, data: any) {
        state.alert_status = data
      },
      [mutationTypes.SetProjectAlertText] (state: any, data: any) {
        state.alert_text = data
      },
      [mutationTypes.SetStudentsInProject] (state: any, data: any) {
        console.log('studentsInaProject', data)
        state.studentsInProject = data
      },
    },
    actions: {
        async [actionTypes.FetchProject] ({ commit }: any, data: any = `${api_url}api/project/get-projects/{page}/{limit}`) {
          const token:any = localStorage.getItem('token')
        //   console.log('token here', token)
          const project = await fetchData(data, token)
        //   console.log('data', data)
        //   console.log('Iprojects', projects.payload)
        //   console.log('Iprojects', projects.value)
        //   console.log('Iprojects', JSON.parse(JSON.stringify(projects)))
        //   console.log('Iprojects', JSON.parse(JSON.stringify(projects.value)))
        //   console.log('Iprojects', projects.value)
          commit(mutationTypes.SetProject, project)
          // commit(mutationTypes.SetTotalProjectCount, project.totalCount)
        },
        async [actionTypes.AddStudentToProject] ({ commit, dispatch }: any, data: any) {
          const token:any = localStorage.getItem('token')
            console.log('token here', token)
            console.log('data is', data)
          const addStudent = await addData(data.url, data.data)
          console.log('addStudent', addStudent)
          if (addStudent.payload) {
            commit(mutationTypes.SetProjectAlertText, 'Student added to project successfully')
            commit(mutationTypes.SetProjectAlertStatus, true)
            dispatch(actionTypes.FetchProject)
          } else if (addStudent.message.includes('400')) {
            commit(mutationTypes.SetProjectAlertText, 'Student already added to project')
            commit(mutationTypes.SetProjectAlertStatus, true)
          } else if (addStudent.message.includes('404')) {
            commit(mutationTypes.SetProjectAlertText, 'Project not found')
            commit(mutationTypes.SetProjectAlertStatus, true)
          } else {
            commit(mutationTypes.SetProjectAlertText, 'Something went wrong')
            commit(mutationTypes.SetProjectAlertStatus, true)
          }

          setTimeout(() => {
            commit(mutationTypes.SetProjectAlertStatus, false)
            commit(mutationTypes.SetProjectAlertText, '')
          }, 2000)
          // commit(mutationTypes.SetProject, project.payload)
          // commit(mutationTypes.SetTotalProjectCount, project.totalCount)
        },
        async [actionTypes.FetchStudentsInProject] ({ commit }: any, data: any) {
          const token:any = localStorage.getItem('token')
        //   console.log('token here')
          const studentsinproject = await fetchData(data, token)
        //   console.log('data', data)
          console.log('Iprojects', studentsinproject.payload)
        //   console.log('Iprojects', projects.value)
        //   console.log('Iprojects', JSON.parse(JSON.stringify(projects)))
        //   console.log('Iprojects', JSON.parse(JSON.stringify(projects.value)))
        //   console.log('Iprojects', projects.value)
          commit(mutationTypes.SetStudentsInProject, studentsinproject)
          commit(mutationTypes.SetTotalProjectCount, studentsinproject.totalCount)
        },
        async [actionTypes.AddProject] ({ commit, dispatch }: any, data: any) {
          const token:any = localStorage.getItem('token')
          console.log('token here')
          console.log('all data is', data.url, data.data)
          const newproject = await addData(data.url, data.data)
          if (newproject.payload) {
            await commit(mutationTypes.SetProjectAlertText, 'Project added successfully')
            await commit(mutationTypes.SetProjectAlertStatus, true)
            await dispatch(actionTypes.FetchProject)
          } else if (newproject.message.includes('400')) {
            await commit(mutationTypes.SetProjectAlertText, 'Invalid Input!')
            await commit(mutationTypes.SetProjectAlertStatus, true)
          } else {
            await commit(mutationTypes.SetProjectAlertText, 'Houston, we have a problem!')
            await commit(mutationTypes.SetProjectAlertStatus, true)
          }
    
          setTimeout(() => {
            commit(mutationTypes.SetProjectAlertStatus, false)
            commit(mutationTypes.SetProjectAlertText, '')
          }, 2000)
        },
        async [actionTypes.RemoveProject] ({ commit, dispatch }: any, data: any) {
          const token:any = localStorage.getItem('token')
          console.log('token here')
          console.log('all data is', data)
          const newproject = await removeData(data)
          console.log('newproject', newproject)
          if (!newproject.hasErrors) {
            await commit(mutationTypes.SetProjectAlertText, 'Project removed successfully')
            await commit(mutationTypes.SetProjectAlertStatus, true)
            await dispatch(actionTypes.FetchProject)
          } else if (newproject.message.includes('400')) {
            await commit(mutationTypes.SetProjectAlertText, 'Invalid Input!')
            await commit(mutationTypes.SetProjectAlertStatus, true)
          } else {
            await commit(mutationTypes.SetProjectAlertText, 'Houston, we have a problem!')
            await commit(mutationTypes.SetProjectAlertStatus, true)
          }
    
          setTimeout(() => {
            commit(mutationTypes.SetProjectAlertStatus, false)
            commit(mutationTypes.SetProjectAlertText, '')
          }, 2000)
        },
        async [actionTypes.RemoveStudentFromProject] ({ commit, dispatch }: any, data: any) {
          console.log('i am here')
          const token:any = localStorage.getItem('token')
          console.log('token here')
          console.log('all data is', data)
          const newproject = await addData(data.url, data.data)
          console.log('newproject', newproject)
          if (!newproject.hasErrors) {
            await commit(mutationTypes.SetProjectAlertText, 'Student removed successfully')
            await commit(mutationTypes.SetProjectAlertStatus, true)
            await dispatch(actionTypes.FetchProject)
          } else if (newproject.message.includes('400')) {
            await commit(mutationTypes.SetProjectAlertText, 'Invalid Input!')
            await commit(mutationTypes.SetProjectAlertStatus, true)
          } else {
            await commit(mutationTypes.SetProjectAlertText, 'Houston, we have a problem!')
            await commit(mutationTypes.SetProjectAlertStatus, true)
          }
    
          setTimeout(() => {
            commit(mutationTypes.SetProjectAlertStatus, false)
            commit(mutationTypes.SetProjectAlertText, '')
          }, 2000)
        },
        async [actionTypes.FetchEditProject] ({ commit }: any, data: any) {
          const token:any = localStorage.getItem('token')
          console.log('token here')
          console.log('all data is', data)
          const project = await fetchData(data, token)
          console.log('project', project)
          commit(mutationTypes.SetEditProject, project.payload)
        }
    },
}