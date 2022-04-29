import { computed } from 'vue'
import * as mutationTypes from './constants/mutation'
import * as actionTypes from './constants/action'
import { api_url } from '../../../config'
import router from '../../../router'
import { addData, fetchData, editData, removeData, addEmptyData, addDataFile } from '../../../helpers/api';

export default {
  state: () => ({
      contacts: '',
      contact: {
        name: '',
        contactCode: '',
        subTitle: '',
        description: '',
        thumbnail: '',
        cost: '',
        duration: '',
        levelType: '',
        categories: [],
        banner: '',
        resourceUrl: '',
        ContactLine1: '',
        ContactLine2: '',
        ContactLine3: '',
        ContactLine4: '',
        ContactLine5: '',
        isActive: false,
        isFeatured: false,
      },
      editcontact: '',
      alert_status: false,
      alert_text: '',
  }),
  getters: {
    getContacts: (state: any) => {
      return computed(() => {
        return state.contacts
      })
    },
    getNumberOfCurriculum: (state:any) => {
        return computed(() => {
            return state.curriculum.length
        })
    },
    getContactCategories: (state: any) => {
      return computed(() => {
        return state.contact_categories
      })
    },
    getEditContact: (state: any) => {
      return computed(() => {
        return state.editcontact
      })
    },
    getEditContactApplicant: (state: any) => {
      return computed(() => {
        return state.editcontactapplicant
      })
    },
    getNewContactCategory: (state: any) => {
      return computed(() => {
        return state.contact_category
      })
    },
    getNewContact: (state: any) => {
      return computed(() => {
        return state.contact
      })
    },
    getNewCurriculum: (state: any) => {
      return computed(() => {
        return state.curriculum
      })
    },
    getCurriculum: (state: any) => {
      return computed(() => {
        return state.allCurriculum
      })
    },
    getNewCurriculumBatch: (state: any) => {
      return computed(() => {
        return state.newCurriculumBatch
      })
    },
    getContactApplicants: (state: any) => {
      return computed(() => {
        return state.contact_applicants
      })
    },
    getNewContactApplicant: (state: any) => {
      return computed(() => {
        return state.contact_applicant
      })
    },
    getContactAlertStatus: (state: any) => {
      return computed(() => {
        return state.alert_status
      })
    },   
    getContactAlertText: (state: any) => {
      return computed(() => {
        return state.alert_text
      })
    },
  },
  mutations: {
    [mutationTypes.SetContacts] (state: any, data: any) {
      state.contacts = data
    },
    [mutationTypes.SetNewContactCategory] (state: any, data: any) {
      state.contact_category = data
    },
    [mutationTypes.SetNewContact] (state: any, data: any) {
      state.contact = data
    },
    [mutationTypes.SetContactCategories] (state: any, data: any) {
      state.contact_categories = data
    },
    [mutationTypes.SetEditContact] (state: any, data: any) {
      console.log('i don reach to update')
      state.editcontact = data
      // console.log('this is data in edit contact', state.editcontact)
    },
    [mutationTypes.SetEditContactApplicant] (state: any, data: any) {
      state.editcontactapplicant = data
    },
    [mutationTypes.SetContactApplicants] (state: any, data: any) {
      state.contact_applicants = data
    },
    [mutationTypes.SetNewContactApplicant] (state: any, data: any) {
      state.contact_applicant = data
    },
    [mutationTypes.SetContactAlertStatus] (state: any, data: any) {
      state.alert_status = data
    },
    [mutationTypes.SetContactAlertText] (state: any, data: any) {
      state.alert_text = data
    },
    [mutationTypes.SetEditContactCategory] (state: any, data: any) {
      state.contact_category = data
    },
  },
  actions: {
    async [actionTypes.FetchContacts] ({ commit }: any, data: any = `${api_url}api/contact/get-contacts/{pageIndex}/{pageSize}`) {
      const token:any = localStorage.getItem('token')
      const contacts:any = await fetchData(data, token)
      console.log('contacts', contacts)
      if (contacts.payload) {
        await commit(mutationTypes.SetContacts, contacts)
      } else if (contacts.response.status === 401) {
        router.push({ name: 'Login' });
      }
    },
    async [actionTypes.FetchContactCategories] ({ commit }: any, data: any = `${api_url}api/contactcategory/get-categories/{pageNumber}/{pageSize}`) {
      const token:any = localStorage.getItem('token')
      console.log('data', data)
      const categories:any = await fetchData(data, token)
      console.log('categories', categories)
      if (categories.payload) {
        await commit(mutationTypes.SetContactCategories, categories)
      } else if (categories.response.status === 401) {
        router.push({ name: 'Login' });
      }
    },
    async [actionTypes.FetchEditContact] ({ commit }: any, data: any) {
      const token:any = localStorage.getItem('token')
      console.log('token here')
      const contact = await fetchData(data, token)
      console.log('data tch', data)
      // console.log('Icontacts', contact.payload)
    //   console.log('Icontacts', contacts.value)
    //   console.log('Icontacts', JSON.parse(JSON.stringify(contacts)))
    //   console.log('Icontacts', JSON.parse(JSON.stringify(contacts.value)))
    //   console.log('Icontacts', contacts.value)
      if (contact.payload) {
        await commit(mutationTypes.SetEditContact, contact.payload)
      } else if (contact.response.status === 401) {
        router.push({ name: 'Login' });
      }
      // await commit(mutationTypes.SetNewContact, contact.payload)
    },
    async [actionTypes.AddNewContactCategory] ({ commit, dispatch }: any, data: any) {
      const token:any = localStorage.getItem('token')
      console.log('token here')
      const contact_category = await addData(data.url, data.data, token)
      if (!contact_category.hasErrors) {
        // commit(mutationTypes.SetNewContactCategory, contact_category.payload)
        await commit(mutationTypes.SetContactAlertText, 'Contact Category added successfully')
        await commit(mutationTypes.SetContactAlertStatus, true)
        await dispatch(actionTypes.FetchContactCategories)
      } else if (contact_category.response.status === 401) {
        router.push({ name: 'Login' });
      } else if (contact_category.message.includes('400')) {
        await commit(mutationTypes.SetContactAlertText, 'Invalid Input!')
        await commit(mutationTypes.SetContactAlertStatus, true)
      } else {
        await commit(mutationTypes.SetContactAlertText, 'Houston, we have a problem!')
        await commit(mutationTypes.SetContactAlertStatus, true)
      }

      setTimeout(() => {
        commit(mutationTypes.SetContactAlertStatus, false)
        commit(mutationTypes.SetContactAlertText, '')
      }, 2000)
    },
    async [actionTypes.AddNewContact] ({ commit, dispatch }: any, data: any) {
      const token:any = localStorage.getItem('token')
      console.log('token here')
      const contact_category = await addData(data.url, data.data, token)
      if (!contact_category.hasErrors) {
        // commit(mutationTypes.SetNewContactCategory, contact_category.payload)
        await commit(mutationTypes.SetContactAlertText, 'Contact added successfully')
        await commit(mutationTypes.SetContactAlertStatus, true)
        await dispatch(actionTypes.FetchContacts)
      } else if (contact_category.response.status === 401) {
        router.push({ name: 'Login' });
      } else if (contact_category.message.includes('400')) {
        await commit(mutationTypes.SetContactAlertText, 'Invalid Input!')
        await commit(mutationTypes.SetContactAlertStatus, true)
      } else {
        await commit(mutationTypes.SetContactAlertText, 'Houston, we have a problem!')
        await commit(mutationTypes.SetContactAlertStatus, true)
      }

      setTimeout(() => {
        commit(mutationTypes.SetContactAlertStatus, false)
        commit(mutationTypes.SetContactAlertText, '')
      }, 2000)
    },
    async [actionTypes.EditContact] ({ commit, dispatch }: any, data: any) {
      const token:any = localStorage.getItem('token')
      console.log('token here')
      const contact_category = await editData(data.url, data.data, token)
      if (!contact_category.hasErrors) {
        // commit(mutationTypes.SetNewContactCategory, contact_category.payload)
        await commit(mutationTypes.SetContactAlertText, 'Contact updated successfully')
        await commit(mutationTypes.SetContactAlertStatus, true)
        await dispatch(actionTypes.FetchContacts)
      } else if (contact_category.response.status === 401) {
        router.push({ name: 'Login' });
      } else if (contact_category.message.includes('400')) {
        await commit(mutationTypes.SetContactAlertText, 'Invalid Input!')
        await commit(mutationTypes.SetContactAlertStatus, true)
      } else {
        await commit(mutationTypes.SetContactAlertText, 'Houston, we have a problem!')
        await commit(mutationTypes.SetContactAlertStatus, true)
      }

      setTimeout(() => {
        commit(mutationTypes.SetContactAlertStatus, false)
        commit(mutationTypes.SetContactAlertText, '')
      }, 2000)
    },
    async [actionTypes.FetchContactApplicants] ({ commit }: any, data: any = `${api_url}api/contactapplicant/get-contactapplicant/{pageNumber}/{pageSize}`) {
      const token:any = localStorage.getItem('token')
      const contactapplicants:any = await fetchData(data, token)
      console.log('contact applicants', contactapplicants)
      if (contactapplicants.payload) {
        await commit(mutationTypes.SetContactApplicants, contactapplicants)
      } else if (contactapplicants.response.status === 401) {
        router.push({ name: 'Login' });
      }
    },
    async [actionTypes.FetchEditContactCategory] ({ commit }: any, data: any) {
      await commit(mutationTypes.SetEditContactCategory, data)
    },
    async [actionTypes.EditContactCategory] ({ commit, dispatch }: any, data: any) {
      const token:any = localStorage.getItem('token')
      console.log('token here')
      const contact_category = await editData(data.url, data.data, token)
      if (!contact_category.hasErrors) {
        // commit(mutationTypes.SetNewContactCategory, contact_category.payload)
        await commit(mutationTypes.SetContactAlertText, 'Contact Category updated successfully')
        await commit(mutationTypes.SetContactAlertStatus, true)
        await dispatch(actionTypes.FetchContactCategories)
      } else if (contact_category.response.status === 401) {
        router.push({ name: 'Login' });
      } else if (contact_category.message.includes('400')) {
        await commit(mutationTypes.SetContactAlertText, 'Invalid Input!')
        await commit(mutationTypes.SetContactAlertStatus, true)
      } else {
        await commit(mutationTypes.SetContactAlertText, 'Houston, we have a problem!')
        await commit(mutationTypes.SetContactAlertStatus, true)
      }

      setTimeout(() => {
        commit(mutationTypes.SetContactAlertStatus, false)
        // commit(mutationTypes.SetNewContactCategory, '')
        commit(mutationTypes.SetContactAlertText, '')
      }, 2000)
    },
    async [actionTypes.RemoveContactCategory] ({ commit, dispatch }: any, data: any) {
      const token:any = localStorage.getItem('token')
      console.log('token here')
      const contact_category = await removeData(data, token)
      if (!contact_category.hasErrors) {
        await commit(mutationTypes.SetContactAlertText, 'Contact Category removed successfully')
        await commit(mutationTypes.SetContactAlertStatus, true)
        await dispatch(actionTypes.FetchContactCategories)
      } else if (contact_category.response.status === 401) {
        router.push({ name: 'Login' });
      } else if (contact_category.message.includes('400')) {
        await commit(mutationTypes.SetContactAlertText, 'Invalid Id!')
        await commit(mutationTypes.SetContactAlertStatus, true)
      } else {
        await commit(mutationTypes.SetContactAlertText, 'Houston, we have a problem!')
        await commit(mutationTypes.SetContactAlertStatus, true)
      }

      setTimeout(() => {
        commit(mutationTypes.SetContactAlertStatus, false)
        commit(mutationTypes.SetContactAlertText, '')
      }, 2000)
    },
    async [actionTypes.RemoveContactApplicant] ({ commit, dispatch }: any, data: any) {
      const token:any = localStorage.getItem('token')
      console.log('token here')
      const contact_category = await removeData(data, token)
      if (!contact_category.hasErrors) {
        await commit(mutationTypes.SetContactAlertText, 'Contact Applicant removed successfully')
        await commit(mutationTypes.SetContactAlertStatus, true)
        await dispatch(actionTypes.FetchContactApplicants)
      } else if (contact_category.response.status === 401) {
        router.push({ name: 'Login' });
      } else if (contact_category.message.includes('400')) {
        await commit(mutationTypes.SetContactAlertText, 'Invalid Id!')
        await commit(mutationTypes.SetContactAlertStatus, true)
      } else {
        await commit(mutationTypes.SetContactAlertText, 'Houston, we have a problem!')
        await commit(mutationTypes.SetContactAlertStatus, true)
      }

      setTimeout(() => {
        commit(mutationTypes.SetContactAlertStatus, false)
        commit(mutationTypes.SetContactAlertText, '')
      }, 2000)
    },
    async [actionTypes.RemoveContact] ({ commit, dispatch }: any, data: any) {
      const token:any = localStorage.getItem('token')
      console.log('token here')
      const contact = await removeData(data, token)
      if (!contact.hasErrors) {
        await commit(mutationTypes.SetContactAlertText, 'Contact removed successfully')
        await commit(mutationTypes.SetContactAlertStatus, true)
        await dispatch(actionTypes.FetchContacts)
      } else if (contact.response.status === 401) {
        router.push({ name: 'Login' });
      } else if (contact.message.includes('400')) {
        await commit(mutationTypes.SetContactAlertText, 'Invalid Id!')
        await commit(mutationTypes.SetContactAlertStatus, true)
      } else {
        await commit(mutationTypes.SetContactAlertText, 'Houston, we have a problem!')
        await commit(mutationTypes.SetContactAlertStatus, true)
      }

      setTimeout(() => {
        commit(mutationTypes.SetContactAlertStatus, false)
        commit(mutationTypes.SetContactAlertText, '')
      }, 2000)
    }
  },
}