import { computed } from 'vue'
import * as mutationTypes from './constants/mutation'
import * as actionTypes from './constants/action'
import router from '../../../router'
import { api_url } from '../../../config/index'
import { addData, fetchData, editData, addEmptyData, removeData } from '../../../helpers/api'

export default {
    state: () => ({
        projects: '',
        outsourcingList: '',
        newOutsourcing: '',
        outsourcing: '',
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
        consultancies: '',
        editconsultancy: '',
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
        getOutsourcing: (state: any) => {
        return computed(() => {
            return state.outsourcing
        })
        },
        getNewOutsourcing: (state: any) => {
        return computed(() => {
            return state.newOutsourcing
        })
        },
        getOutsourcingListt: (state: any) => {
        return computed(() => {
            return state.outsourcingList
        })
        },
        getConsultancy: (state: any) => {
        return computed(() => {
            return state.consultancies
        })
        },
        getEditConsultancy: (state: any) => {
        return computed(() => {
            return state.editconsultancy
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
      [mutationTypes.SetOutsourcing] (state: any, data: any) {
        state.outsourcing = data
      },
      [mutationTypes.SetNewOutsourcing] (state: any, data: any) {
        state.newOutsourcing = data
      },
      [mutationTypes.SetOutsourcingList] (state: any, data: any) {
        state.outsourcingList = data
      },
      [mutationTypes.SetConsultancy] (state: any, data: any) {
        state.consultancies = data
      },
      [mutationTypes.SetEditConsultancy] (state: any, data: any) {
        state.editconsultancy = data
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
        if (project.payload) {
          await commit(mutationTypes.SetProject, project)
        } else if (project.response.status === 401) {
          router.push({ name: 'Login' });
        }
          // commit(mutationTypes.SetProject, project)
          // commit(mutationTypes.SetTotalProjectCount, project.totalCount)
        },
        async [actionTypes.FetchOutsourcing] ({ commit }: any, data: any = `${api_url}api/outsourcing/get/{page}/{limit}`) {
          const token:any = localStorage.getItem('token')
        //   console.log('token here', token)
          const project = await fetchData(data, token)
        //   console.log('data', data)
        //   console.log('Iprojects', projects.payload)
        //   console.log('Iprojects', projects.value)
        //   console.log('Iprojects', JSON.parse(JSON.stringify(projects)))
        //   console.log('Iprojects', JSON.parse(JSON.stringify(projects.value)))
        //   console.log('Iprojects', projects.value)
        if (project.payload) {
          await commit(mutationTypes.SetProject, project)
        } else if (project.response.status === 401) {
          router.push({ name: 'Login' });
        }
          // commit(mutationTypes.SetProject, project)
          // commit(mutationTypes.SetTotalProjectCount, project.totalCount)
        },
        async [actionTypes.FetchConsultancy] ({ commit }: any, data: any = `${api_url}api/consultancy/get-consultancy/{page}/{limit}`) {
          const token:any = localStorage.getItem('token')
        //   console.log('token here', token)
          const consultancy = await fetchData(data, token)
        //   console.log('data', data)
        //   console.log('Iconsultancys', consultancys.payload)
        //   console.log('Iconsultancys', consultancys.value)
        //   console.log('Iconsultancys', JSON.parse(JSON.stringify(consultancys)))
        //   console.log('Iconsultancys', JSON.parse(JSON.stringify(consultancys.value)))
        //   console.log('Iconsultancys', consultancys.value)
        if (consultancy.payload) {
          await commit(mutationTypes.SetConsultancy, consultancy)
        } else if (consultancy.response.status === 401) {
          router.push({ name: 'Login' });
        }
          // commit(mutationTypes.SetProject, project)
          // commit(mutationTypes.SetTotalProjectCount, project.totalCount)
        },
        async [actionTypes.AddStudentToProject] ({ commit, dispatch }: any, data: any) {
          const token:any = localStorage.getItem('token')
            console.log('token here', token)
            console.log('data is', data)
          const addToProject = await addData(data.url, data.data, token)
          console.log('addToProject', addToProject)
          if (addToProject.payload) {
            commit(mutationTypes.SetProjectAlertText, 'Student added to project successfully')
            commit(mutationTypes.SetProjectAlertStatus, true)
            dispatch(actionTypes.FetchProject)
          } else if (addToProject.response.status === 401) {
            router.push({ name: 'Login' });
          } else if (addToProject.message.includes('400')) {
            commit(mutationTypes.SetProjectAlertText, 'Student already added to project')
            commit(mutationTypes.SetProjectAlertStatus, true)
          } else if (addToProject.message.includes('404')) {
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
          const newproject = await addData(data.url, data.data, token)
          if (newproject.payload) {
            await commit(mutationTypes.SetProjectAlertText, 'Project added successfully')
            await commit(mutationTypes.SetProjectAlertStatus, true)
            await dispatch(actionTypes.FetchProject)
          } else if (newproject.message.includes('400')) {
            await commit(mutationTypes.SetProjectAlertText, 'Invalid Input!')
            await commit(mutationTypes.SetProjectAlertStatus, true)
          } else if (newproject.response.status === 401) {
            router.push({ name: 'Login' });
          } else {
            await commit(mutationTypes.SetProjectAlertText, 'Houston, we have a problem!')
            await commit(mutationTypes.SetProjectAlertStatus, true)
          }
    
          setTimeout(() => {
            commit(mutationTypes.SetProjectAlertStatus, false)
            commit(mutationTypes.SetProjectAlertText, '')
          }, 2000)
        },
        async [actionTypes.EditProject] ({ commit, dispatch }: any, data: any) {
          const token:any = localStorage.getItem('token')
          console.log('token here')
          const project = await editData(data.url, data.data, token)
          if (!project.hasErrors) {
            // commit(mutationTypes.SetNewProjectCategory, project.payload)
            await commit(mutationTypes.SetProjectAlertText, 'Project updated successfully')
            await commit(mutationTypes.SetProjectAlertStatus, true)
            await dispatch(actionTypes.FetchProject)
          } else if (project.response.status === 401) {
            router.push({ name: 'Login' });
          } else if (project.message.includes('400')) {
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
          const newproject = await removeData(data, token)
          console.log('newproject', newproject)
          if (!newproject.hasErrors) {
            await commit(mutationTypes.SetProjectAlertText, 'Project removed successfully')
            await commit(mutationTypes.SetProjectAlertStatus, true)
            await dispatch(actionTypes.FetchProject)
          } else if (newproject.response.status === 401) {
            router.push({ name: 'Login' });
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
        async [actionTypes.RemoveConsultancy] ({ commit, dispatch }: any, data: any) {
          const token:any = localStorage.getItem('token')
          console.log('token here')
          console.log('all data is', data)
          const newproject = await removeData(data, token)
          console.log('newproject', newproject)
          if (!newproject.hasErrors) {
            await commit(mutationTypes.SetProjectAlertText, 'Consultancy removed successfully')
            await commit(mutationTypes.SetProjectAlertStatus, true)
            await dispatch(actionTypes.FetchProject)
          } else if (newproject.response.status === 401) {
            router.push({ name: 'Login' });
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
          const newproject = await addData(data.url, data.data, token)
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
          if (project.payload) {
            commit(mutationTypes.SetEditProject, project.payload)
          } else if (project.response.status === 401) {
            router.push({ name: 'Login' });
          }
        },
        async [actionTypes.FetchEditConsultancy] ({ commit }: any, data: any) {
          const token:any = localStorage.getItem('token')
          console.log('token here')
          console.log('all data is', data)
          const consultancy = await fetchData(data, token)
          console.log('consultancy', consultancy)
          if (consultancy.payload) {
            commit(mutationTypes.SetEditConsultancy, consultancy.payload)
          } else if (consultancy.response.status === 401) {
            router.push({ name: 'Login' });
          }
        },
        async [actionTypes.UpdateProjectStatus] ({ commit, dispatch }: any, data: any) {
          const token:any = localStorage.getItem('token')
          console.log('token in update')
          console.log('update data is', data)
          const UpdateProjectStatus = await addEmptyData(data, token)
          console.log('UpdateProjectStatus', UpdateProjectStatus)
          if (UpdateProjectStatus.payload) {
            await commit(mutationTypes.SetProjectAlertText, 'Project status updated successfully')
            await commit(mutationTypes.SetProjectAlertStatus, true)
            await dispatch(actionTypes.FetchConsultancy)
          } else if (UpdateProjectStatus.response.status === 401) {
            router.push({ name: 'Login' });
          } else if (UpdateProjectStatus.message.includes('400')) {
            await commit(mutationTypes.SetProjectAlertText, 'Bad request received')
            await commit(mutationTypes.SetProjectAlertStatus, true)
          } else if (UpdateProjectStatus.message.includes('404')) {
            await commit(mutationTypes.SetProjectAlertText, 'Applicant not found')
            await commit(mutationTypes.SetProjectAlertStatus, true)
          } else {
            await commit(mutationTypes.SetProjectAlertText, 'Something went wrong')
            await commit(mutationTypes.SetProjectAlertStatus, true)
          }
    
          setTimeout(() => {
            commit(mutationTypes.SetProjectAlertStatus, false)
            commit(mutationTypes.SetProjectAlertText, '')
          }, 2000)
        },
        async [actionTypes.UpdateConsultancyStatus] ({ commit, dispatch }: any, data: any) {
          const token:any = localStorage.getItem('token')
          console.log('token in update')
          console.log('update data is', data)
          const UpdateConsultancyStatus = await addEmptyData(data, token)
          console.log('UpdateConsultancyStatus', UpdateConsultancyStatus)
          if (UpdateConsultancyStatus.payload) {
            await commit(mutationTypes.SetProjectAlertText, 'Consultancy status updated successfully')
            await commit(mutationTypes.SetProjectAlertStatus, true)
            await dispatch(actionTypes.FetchConsultancy)
          } else if (UpdateConsultancyStatus.response.status === 401) {
            router.push({ name: 'Login' });
          } else if (UpdateConsultancyStatus.message.includes('400')) {
            await commit(mutationTypes.SetProjectAlertText, 'Bad request received')
            await commit(mutationTypes.SetProjectAlertStatus, true)
          } else if (UpdateConsultancyStatus.message.includes('404')) {
            await commit(mutationTypes.SetProjectAlertText, 'Applicant not found')
            await commit(mutationTypes.SetProjectAlertStatus, true)
          } else {
            await commit(mutationTypes.SetProjectAlertText, 'Something went wrong')
            await commit(mutationTypes.SetProjectAlertStatus, true)
          }
    
          setTimeout(() => {
            commit(mutationTypes.SetProjectAlertStatus, false)
            commit(mutationTypes.SetProjectAlertText, '')
          }, 2000)
        },
    },
}