import { computed } from 'vue'
import { account_api_url } from '../../../config/index'
import { addData, addEmptyData, editData, editDataPut, fetchData, removeData } from '../../../helpers/api'
import router from '../../../router'
import * as actionTypes from './constants/action'
import * as mutationTypes from './constants/mutation'

export default {
  state: () => ({
    expenditures: '',
    revenues: '',
    newRevenue: {
      category: '',
      item: '',
      amount: '',
      dot: '',
    },
    newExpenditure: {
      category: '',
      item: '',
      amount: '',
      dot: '',
    },
    revenue: '',
    expenditure: '',
    total_count: '',
    alert_status: false,
    alert_text: '',
    editing: false,
    isEditing: false,
    categories: '',
    category: {
      name: ''
    },
    categoryList: '',
    incomeStatement: '',
  }),
  getters: {
    getExpenditure: (state: any) => {
      return computed(() => {
          return state.expenditures
      })
    },
    getCategoryList: (state: any) => {
      return computed(() => {
          return state.categoryList
      })
    },
    // getNewRevenueTalent: (state: any) => {
    //   return computed(() => {
    //       return state.newRevenueTalent
    //   })
    // },
    getIncomeStatement: (state: any) => {
      return computed(() => {
          return state.incomeStatement
      })
    },
    getNewExpenditure: (state: any) => {
      return computed(() => {
          return state.newExpenditure
      })
    },
    getTotalExpenditureCount: (state: any) => {
      return computed(() => {
          return state.total_count
      })
    },
    getRevenue: (state: any) => {
      return computed(() => {
          return state.revenues
      })
    },
    getNewRevenue: (state: any) => {
      return computed(() => {
          return state.newRevenue
      })
    },
    getCategory: (state: any) => {
      return computed(() => {
          return state.categories
      })
    },
    getNewCategory: (state: any) => {
      return computed(() => {
          return state.category
      })
    },
    // getEditCategory: (state: any) => {
    //   return computed(() => {
    //       return state.editconsultancy
    //   })
    // },
    getExpenditureAlertStatus: (state: any) => {
      return computed(() => {
        return state.alert_status
      })
    },
    getExpenditureAlertText: (state: any) => {
      return computed(() => {
        return state.alert_text
      })
    },
    getEditExpenditureStatus: (state: any) => {
      return computed(() => {
          return state.isEditing
      })
    },
  },
  mutations: {
    [mutationTypes.SetExpenditure] (state: any, data: any) {
      state.expenditures = data
    },
    [mutationTypes.SetIncomeStatement] (state: any, data: any) {
      state.incomeStatement = data
    },
    [mutationTypes.SetCategoryList] (state: any, data: any) {
      state.categoryList = data
    },
    [mutationTypes.SetNewExpenditure] (state: any, data: any) {
      state.newExpenditure = data
    },
    [mutationTypes.SetTotalExpenditureCount] (state: any, data: any) {
      state.total_count = data
    },
    [mutationTypes.SetRevenue] (state: any, data: any) {
      state.revenues = data
    },
    [mutationTypes.SetJobDetail] (state: any, data: any) {
      state.revenuejobdetails = data
    },
    [mutationTypes.SetNewRevenue] (state: any, data: any) {
      state.newRevenue = data
    },
    [mutationTypes.SetEditRevenue] (state: any, data: any) {
      state.newRevenue = data
    },
    [mutationTypes.SetRevenueList] (state: any, data: any) {
      state.revenueList = data
    },
    [mutationTypes.SetCategory] (state: any, data: any) {
      state.categories = data
    },
    // [mutationTypes.SetRevenueTalent] (state: any, data: any) {
    //   localStorage.setItem('revenueTalent', state.revenueTalent = data)
    // },
    [mutationTypes.SetRevenueTalent] (state: any, data: any) {
      state.revenueTalent = data
    },
    [mutationTypes.SetNewRevenueTalent] (state: any, data: any) {
      state.newRevenueTalent = data
    },
    [mutationTypes.SetEditCategory] (state: any, data: any) {
      state.editconsultancy = data
    },
    [mutationTypes.SetEditStatus] (state: any, data: any) {
      state.isEditing = data
    },
    [mutationTypes.SetEditExpenditure] (state: any, data: any) {
      state.newExpenditure = data
    },
    [mutationTypes.SetTitle] (state: any, data: any) {
      state.title = data
    },
    [mutationTypes.SetExpenditureAlertStatus] (state: any, data: any) {
      state.alert_status = data
    },
    [mutationTypes.SetExpenditureAlertText] (state: any, data: any) {
      state.alert_text = data
    },
    [mutationTypes.SetNewCategory] (state: any, data: any) {
      console.log('studentsInaExpenditure', data)
      state.category = data
    },
  },
  actions: {
    async [actionTypes.FetchExpenditure] ({ commit }: any, data: any = `${account_api_url}api/expenditure/getall-expenditure`) {
      const token:any = localStorage.getItem('token')
      console.log('token here', token)
      const expenditure = await fetchData(data, token)
      console.log('data', data)
      console.log('Iexpenditures', expenditure)
    //   console.log('Iexpenditures', expenditures.value)
    //   console.log('Iexpenditures', JSON.parse(JSON.stringify(expenditures)))
    //   console.log('Iexpenditures', JSON.parse(JSON.stringify(expenditures.value)))
    //   console.log('Iexpenditures', expenditures.value)
      if (expenditure.payload) {
        await commit(mutationTypes.SetExpenditure, expenditure)
      } else if (expenditure.response.status === 401) {
        router.push({ name: 'Login' });
      }
      // commit(mutationTypes.SetExpenditure, expenditure)
      // commit(mutationTypes.SetTotalExpenditureCount, expenditure.totalCount)
    },
    async [actionTypes.FetchIncomeStatement] ({ commit }: any, data: any = `${account_api_url}api/incomestatement/getall-incomestatement`) {
      const token:any = localStorage.getItem('token')
      console.log('token here', token)
      const incomestatement = await fetchData(data, token)
      console.log('data', data)
      console.log('Iincomestatements', incomestatement)
    //   console.log('Iincomestatements', incomestatements.value)
    //   console.log('Iincomestatements', JSON.parse(JSON.stringify(incomestatements)))
    //   console.log('Iincomestatements', JSON.parse(JSON.stringify(incomestatements.value)))
    //   console.log('Iincomestatements', incomestatements.value)
      if (incomestatement.payload) {
        await commit(mutationTypes.SetIncomeStatement, incomestatement)
      } else if (incomestatement.response.status === 401) {
        router.push({ name: 'Login' });
      }
      // commit(mutationTypes.SetExpenditure, expenditure)
      // commit(mutationTypes.SetTotalExpenditureCount, expenditure.totalCount)
    },
    async [actionTypes.FetchRevenue] ({ commit }: any, data: any = `${account_api_url}api/revenue/getall-revenue`) {
      const token:any = localStorage.getItem('token')
      console.log('token here', token)
      const revenues = await fetchData(data, token)
      console.log('data', data)
      console.log('Irevenues', revenues.payload)
    //   console.log('Irevenues', revenues.value)
    //   console.log('Irevenues', JSON.parse(JSON.stringify(revenues)))
    //   console.log('Irevenues', JSON.parse(JSON.stringify(revenues.value)))
    //   console.log('Irevenues', revenues.value)
      if (revenues.payload) {
        await commit(mutationTypes.SetRevenue, revenues)
      } else if (revenues.response.status === 401) {
        router.push({ name: 'Login' });
      }
      // commit(mutationTypes.SetExpenditure, expenditure)
      // commit(mutationTypes.SetTotalExpenditureCount, expenditure.totalCount)
    },
    async [actionTypes.FetchCategory] ({ commit }: any, data: any) {
      const token:any = localStorage.getItem('token')
    //   console.log('token here', token)
      const category = await fetchData(data, token)
      console.log('data', data)
      console.log('Icategorys', category.payload)
    //   console.log('Icategorys', categorys.value)
    //   console.log('Icategorys', JSON.parse(JSON.stringify(categorys)))
    //   console.log('Icategorys', JSON.parse(JSON.stringify(categorys.value)))
    //   console.log('Icategorys', categorys.value)
      if (category.payload) {
        await commit(mutationTypes.SetCategory, category)
      } else if (category.response.status === 401) {
        router.push({ name: 'Login' });
      }
      // commit(mutationTypes.SetExpenditure, expenditure)
      // commit(mutationTypes.SetTotalExpenditureCount, expenditure.totalCount)
    },
    async [actionTypes.FetchCategoryList] ({ commit }: any, data: any) {
      const token:any = localStorage.getItem('token')
    //   console.log('token here', token)
      const category = await fetchData(data, token)
      console.log('data', data)
      console.log('Icategorys', category.payload)
    //   console.log('Icategorys', categorys.value)
    //   console.log('Icategorys', JSON.parse(JSON.stringify(categorys)))
    //   console.log('Icategorys', JSON.parse(JSON.stringify(categorys.value)))
    //   console.log('Icategorys', categorys.value)
      if (category.payload) {
        await commit(mutationTypes.SetCategoryList, category)
      } else if (category.response.status === 401) {
        router.push({ name: 'Login' });
      }
      // commit(mutationTypes.SetExpenditure, expenditure)
      // commit(mutationTypes.SetTotalExpenditureCount, expenditure.totalCount)
    },
    async [actionTypes.FetchJobDetails] ({ commit }: any, data: any) {
      const token:any = localStorage.getItem('token')
    //   console.log('token here', token)
      const jobdetail = await fetchData(data, token)
    //   console.log('data', data)
    //   console.log('Ijobdetails', jobdetails.payload)
    //   console.log('Ijobdetails', jobdetails.value)
    //   console.log('Ijobdetails', JSON.parse(JSON.stringify(jobdetails)))
    //   console.log('Ijobdetails', JSON.parse(JSON.stringify(jobdetails.value)))
    //   console.log('Ijobdetails', jobdetails.value)
      if (jobdetail.payload) {
        await commit(mutationTypes.SetJobDetail, jobdetail)
      } else if (jobdetail.response.status === 401) {
        router.push({ name: 'Login' });
      }
      // commit(mutationTypes.SetExpenditure, expenditure)
      // commit(mutationTypes.SetTotalExpenditureCount, expenditure.totalCount)
    },
    async [actionTypes.FetchRevenueTalents] ({ commit }: any, data: any) {
      const token:any = localStorage.getItem('token')
    //   console.log('token here', token)
      const talents = await fetchData(data, token)
    //   console.log('data', data)
      console.log('Italentss', talents.payload)
      // console.log('Italentss', talents.value)
    //   console.log('Italentss', JSON.parse(JSON.stringify(talentss)))
    //   console.log('Italentss', JSON.parse(JSON.stringify(talentss.value)))
    //   console.log('Italentss', talentss.value)
      if (talents.payload) {
        await commit(mutationTypes.SetRevenueTalent, talents.payload.jobDetails)
      } else if (talents.response.status === 401) {
        router.push({ name: 'Login' });
      }
      // commit(mutationTypes.SetExpenditure, expenditure)
      // commit(mutationTypes.SetTotalExpenditureCount, expenditure.totalCount)
    },
    async [actionTypes.AddRevenueTalent] ({ commit, state }:any, data:any) {
      const revenueTalent:any = await JSON.parse(JSON.stringify(state.revenueTalent))
      console.log('revenue talent here', revenueTalent)
      console.log('data', data)
      const newData = [...revenueTalent, data]
      console.log('new added revenue talent data', newData)
      await commit(mutationTypes.SetRevenueTalent, newData)
    },
    async [actionTypes.EditRevenue] ({ commit, dispatch }: any, data: any) {
      const token:any = localStorage.getItem('token')
      console.log('token here')
      const revenue = await editDataPut(data.url, data.data, token)
      if (revenue.payload) {
        // commit(mutationTypes.SetNewExpenditureCategory, revenue.payload)
        await commit(mutationTypes.SetExpenditureAlertText, 'Revenue updated successfully')
        await commit(mutationTypes.SetExpenditureAlertStatus, true)
        await dispatch(actionTypes.FetchRevenue)
      } else if (revenue.response.status === 401) {
        router.push({ name: 'Login' });
      } else if (revenue.message.includes('400')) {
        await commit(mutationTypes.SetExpenditureAlertText, 'Invalid Input!')
        await commit(mutationTypes.SetExpenditureAlertStatus, true)
      } else {
        await commit(mutationTypes.SetExpenditureAlertText, 'Houston, we have a problem!')
        await commit(mutationTypes.SetExpenditureAlertStatus, true)
      }

      setTimeout(() => {
        commit(mutationTypes.SetExpenditureAlertStatus, false)
        commit(mutationTypes.SetExpenditureAlertText, '')
      }, 2000)
    },
    async [actionTypes.EditRevenueTalent] ({ commit, state }:any, data:any) {
      const revenueTalent:any = await JSON.parse(JSON.stringify(state.revenueTalent))
      console.log('revenue talent here', revenueTalent)
      console.log('data', data)
      const newData = [...revenueTalent, data]
      console.log('new added revenue talent data', newData)
      await commit(mutationTypes.SetRevenueTalent, newData)
    },
    async [actionTypes.AddExpenditureCategory] ({ commit, dispatch }:any, data:any) {
      // const revenueTalent:any = await JSON.parse(JSON.stringify(state.revenueTalent))
      const token:any = localStorage.getItem('token')
      // console.log('revenue talent here', revenueTalent)
      console.log('data', data)
      const url = 'api/expenditurecategory/getall-category'
      // console.log('new added revenue talent data', newData)
      // await commit(mutationTypes.SetRevenueTalent, newData)
      const addCategory = await addData(data.url, data.data, token)
      if (addCategory?.payload) {
        // commit(mutationTypes.SetNewCourseCategory, course_applicant.payload)
        await commit(mutationTypes.SetExpenditureAlertText, 'Category added successfully')
        await commit(mutationTypes.SetExpenditureAlertStatus, true)
        const requesturl:any = `${account_api_url}${url}`
        console.log(`the request url is ${requesturl}`)
        await dispatch(actionTypes.FetchCategory, requesturl)
      } else if (addCategory?.response?.status === 401) {
        router.push({ name: 'Login' });
      } else if (addCategory?.message?.includes('400')) {
        await commit(mutationTypes.SetExpenditureAlertText, 'Category exists!')
        await commit(mutationTypes.SetExpenditureAlertStatus, true)
      } else {
        await commit(mutationTypes.SetExpenditureAlertText, 'Houston, we have a problem!')
        await commit(mutationTypes.SetExpenditureAlertStatus, true)
      }

      setTimeout(() => {
        commit(mutationTypes.SetExpenditureAlertStatus, false)
        commit(mutationTypes.SetExpenditureAlertText, '')
      }, 2000)
    },
    async [actionTypes.AddRevenueCategory] ({ commit, dispatch }:any, data:any) {
      // const revenueTalent:any = await JSON.parse(JSON.stringify(state.revenueTalent))
      const token:any = localStorage.getItem('token')
      // console.log('revenue talent here', revenueTalent)
      console.log('data', data)
      const url = 'api/revenuecategory/getall-category'
      // console.log('new added revenue talent data', newData)
      // await commit(mutationTypes.SetRevenueTalent, newData)
      const addCategory:any = await addData(data.url, data.data, token)
      console.log('addCategory is the same', addCategory)
      console.log('addCategory is the same', addCategory.payload)
      // console.log('addCategory is the same', addCategory?.message)
      // console.log('addCategory is the same', addCategory?.message.includes('400'))
      // console.log('addCategory is the same', addCategory?.title)
      if (addCategory?.payload) {
        // commit(mutationTypes.SetNewCourseCategory, course_applicant.payload)
        await commit(mutationTypes.SetExpenditureAlertText, 'Category added successfully')
        await commit(mutationTypes.SetExpenditureAlertStatus, true)
        const requesturl:any = `${account_api_url}${url}`
        console.log(`the request url is ${requesturl}`)
        await dispatch(actionTypes.FetchCategory, requesturl)
      } else if (addCategory?.response?.status === 401) {
        router.push({ name: 'Login' });
      } else if (addCategory?.message?.includes('400')) {
        await commit(mutationTypes.SetExpenditureAlertText, 'Category exists!')
        await commit(mutationTypes.SetExpenditureAlertStatus, true)
      } else {
        await commit(mutationTypes.SetExpenditureAlertText, 'Houston, we have a problem!')
        await commit(mutationTypes.SetExpenditureAlertStatus, true)
      }

      setTimeout(() => {
        commit(mutationTypes.SetExpenditureAlertStatus, false)
        commit(mutationTypes.SetExpenditureAlertText, '')
      }, 2000)
    },
    async [actionTypes.EditExpenditureCategory] ({ commit, dispatch }:any, data:any) {
      // const revenueTalent:any = await JSON.parse(JSON.stringify(state.revenueTalent))
      const token:any = localStorage.getItem('token')
      // console.log('revenue talent here', revenueTalent)
      console.log('data', data)
      const url = 'api/expenditurecategory/getall-category'
      // console.log('new added revenue talent data', newData)
      // await commit(mutationTypes.SetRevenueTalent, newData)
      const editCategory = await editDataPut(data.url, data.data, token)
      if (editCategory?.payload) {
        // commit(mutationTypes.SetNewCourseCategory, course_applicant.payload)
        await commit(mutationTypes.SetExpenditureAlertText, 'Category updated successfully')
        await commit(mutationTypes.SetExpenditureAlertStatus, true)
        const requesturl:any = `${account_api_url}${url}`
        console.log(`the request url is ${requesturl}`)
        await dispatch(actionTypes.FetchCategory, requesturl)
      } else if (editCategory?.response?.status === 401) {
        router.push({ name: 'Login' });
      } else if (editCategory?.message?.includes('400')) {
        await commit(mutationTypes.SetExpenditureAlertText, 'Category exists!')
        await commit(mutationTypes.SetExpenditureAlertStatus, true)
      } else {
        await commit(mutationTypes.SetExpenditureAlertText, 'Houston, we have a problem!')
        await commit(mutationTypes.SetExpenditureAlertStatus, true)
      }

      setTimeout(() => {
        commit(mutationTypes.SetExpenditureAlertStatus, false)
        commit(mutationTypes.SetExpenditureAlertText, '')
      }, 2000)
    },
    async [actionTypes.EditRevenueCategory] ({ commit, dispatch }:any, data:any) {
      // const revenueTalent:any = await JSON.parse(JSON.stringify(state.revenueTalent))
      const token:any = localStorage.getItem('token')
      // console.log('revenue talent here', revenueTalent)
      console.log('data', data)
      const url = 'api/revenuecategory/getall-category'
      // console.log('new added revenue talent data', newData)
      // await commit(mutationTypes.SetRevenueTalent, newData)
      const editCategory = await editDataPut(data.url, data.data, token)
      if (editCategory?.payload) {
        // commit(mutationTypes.SetNewCourseCategory, course_applicant.payload)
        await commit(mutationTypes.SetExpenditureAlertText, 'Category updated successfully')
        await commit(mutationTypes.SetExpenditureAlertStatus, true)
        const requesturl:any = `${account_api_url}${url}`
        console.log(`the request url is ${requesturl}`)
        await dispatch(actionTypes.FetchCategory, requesturl)
      } else if (editCategory?.response?.status === 401) {
        router.push({ name: 'Login' });
      } else if (editCategory?.message?.includes('400')) {
        await commit(mutationTypes.SetExpenditureAlertText, 'Category exists!')
        await commit(mutationTypes.SetExpenditureAlertStatus, true)
      } else {
        await commit(mutationTypes.SetExpenditureAlertText, 'Houston, we have a problem!')
        await commit(mutationTypes.SetExpenditureAlertStatus, true)
      }

      setTimeout(() => {
        commit(mutationTypes.SetExpenditureAlertStatus, false)
        commit(mutationTypes.SetExpenditureAlertText, '')
      }, 2000)
    },
    async [actionTypes.AddRevenue] ({ commit, dispatch }:any, data:any) {
      // const revenueTalent:any = await JSON.parse(JSON.stringify(state.revenueTalent))
      const token:any = localStorage.getItem('token')
      // console.log('revenue talent here', revenueTalent)
      console.log('data', data)
      // const newData = [...revenueTalent, data]
      // console.log('new added revenue talent data', newData)
      // await commit(mutationTypes.SetRevenueTalent, newData)
      const addRevenue = await addData(data.url, data.data, token)
      if (!addRevenue.hasErrors) {
        // commit(mutationTypes.SetNewCourseCategory, course_applicant.payload)
        await commit(mutationTypes.SetExpenditureAlertText, 'Revenue added successfully')
        await commit(mutationTypes.SetExpenditureAlertStatus, true)
        await dispatch(actionTypes.FetchRevenue)
      } else if (addRevenue.response.status === 401) {
        router.push({ name: 'Login' });
      } else if (addRevenue.message.includes('400')) {
        await commit(mutationTypes.SetExpenditureAlertText, 'Invalid Input!')
        await commit(mutationTypes.SetExpenditureAlertStatus, true)
      } else {
        await commit(mutationTypes.SetExpenditureAlertText, 'Houston, we have a problem!')
        await commit(mutationTypes.SetExpenditureAlertStatus, true)
      }

      setTimeout(() => {
        commit(mutationTypes.SetExpenditureAlertStatus, false)
        commit(mutationTypes.SetExpenditureAlertText, '')
      }, 2000)
    },
    async [actionTypes.RemoveRevenueTalent] ({ state, commit }:any, data:any) {
      const revenueTalent:any = await JSON.parse(JSON.stringify(state.revenueTalent))
      console.log('revenue talent here', revenueTalent)
      console.log('data', data)
      const itemIndex = await revenueTalent.findIndex((item:any) => revenueTalent.indexOf(item) === data)
      console.log('item index', itemIndex)
      revenueTalent.splice(itemIndex, 1)
      console.log('new daleted revenue talent data', revenueTalent)
      await commit(mutationTypes.SetRevenueTalent, revenueTalent)
    },
    async [actionTypes.AddExpenditure] ({ commit, dispatch }: any, data: any) {
      const token:any = localStorage.getItem('token')
      console.log('token here')
      console.log('all data is', data.url, data.data)
      const newexpenditure = await addData(data.url, data.data, token)
      if (newexpenditure.payload) {
        await commit(mutationTypes.SetExpenditureAlertText, 'Expenditure added successfully')
        await commit(mutationTypes.SetExpenditureAlertStatus, true)
        await dispatch(actionTypes.FetchExpenditure)
      } else if (newexpenditure.message.includes('400')) {
        await commit(mutationTypes.SetExpenditureAlertText, 'Invalid Input!')
        await commit(mutationTypes.SetExpenditureAlertStatus, true)
      } else if (newexpenditure.response.status === 401) {
        router.push({ name: 'Login' });
      } else {
        await commit(mutationTypes.SetExpenditureAlertText, 'Houston, we have a problem!')
        await commit(mutationTypes.SetExpenditureAlertStatus, true)
      }

      setTimeout(() => {
        commit(mutationTypes.SetExpenditureAlertStatus, false)
        commit(mutationTypes.SetExpenditureAlertText, '')
      }, 2000)
    },
    async [actionTypes.EditExpenditure] ({ commit, dispatch }: any, data: any) {
      const token:any = localStorage.getItem('token')
      console.log('token here')
      const expenditure = await editDataPut(data.url, data.data, token)
      console.log('expenditure that came', expenditure)
      if (expenditure.data) {
        // commit(mutationTypes.SetNewExpenditureCategory, expenditure.payload)
        await commit(mutationTypes.SetExpenditureAlertText, 'Expenditure updated successfully')
        await commit(mutationTypes.SetExpenditureAlertStatus, true)
        await dispatch(actionTypes.FetchExpenditure)
      } else if (expenditure.response?.status === 401) {
        router.push({ name: 'Login' });
      } else if (expenditure.message?.includes('400')) {
        await commit(mutationTypes.SetExpenditureAlertText, 'Invalid Input!')
        await commit(mutationTypes.SetExpenditureAlertStatus, true)
      } else {
        await commit(mutationTypes.SetExpenditureAlertText, 'Houston, we have a problem!')
        await commit(mutationTypes.SetExpenditureAlertStatus, true)
      }

      setTimeout(() => {
        commit(mutationTypes.SetExpenditureAlertStatus, false)
        commit(mutationTypes.SetExpenditureAlertText, '')
      }, 2000)
    },
    async [actionTypes.RemoveExpenditure] ({ commit, dispatch }: any, data: any) {
      const token:any = localStorage.getItem('token')
      console.log('token here')
      console.log('all data is', data)
      const newexpenditure = await removeData(data, token)
      console.log('newexpenditure here', newexpenditure)
      if (!newexpenditure.hasErrors) {
        await commit(mutationTypes.SetExpenditureAlertText, 'Expenditure removed successfully')
        await commit(mutationTypes.SetExpenditureAlertStatus, true)
        await dispatch(actionTypes.FetchExpenditure)
      } else if (newexpenditure.response.status === 401) {
        router.push({ name: 'Login' });
      } else if (newexpenditure.message.includes('400')) {
        await commit(mutationTypes.SetExpenditureAlertText, 'Invalid Input!')
        await commit(mutationTypes.SetExpenditureAlertStatus, true)
      } else {
        await commit(mutationTypes.SetExpenditureAlertText, 'Houston, we have a problem!')
        await commit(mutationTypes.SetExpenditureAlertStatus, true)
      }

      setTimeout(() => {
        commit(mutationTypes.SetExpenditureAlertStatus, false)
        commit(mutationTypes.SetExpenditureAlertText, '')
      }, 2000)
    },
    async [actionTypes.RemoveExpenditureCategory] ({ commit, dispatch }: any, data: any) {
      const token:any = localStorage.getItem('token')
      console.log('token here')
      console.log('all data is', data)
      const newcategory = await removeData(data, token)
      console.log('newcategory', newcategory)
      if (!newcategory.hasErrors) {
        await commit(mutationTypes.SetExpenditureAlertText, 'Category removed successfully')
        await commit(mutationTypes.SetExpenditureAlertStatus, true)
        const fetchrequest:any = `${account_api_url}api/expenditurecategory/getall-category`;
        await dispatch(actionTypes.FetchExpenditure, fetchrequest)
      } else if (newcategory.response.status === 401) {
        router.push({ name: 'Login' });
      } else if (newcategory.message.includes('400')) {
        await commit(mutationTypes.SetExpenditureAlertText, 'Invalid Input!')
        await commit(mutationTypes.SetExpenditureAlertStatus, true)
      } else {
        await commit(mutationTypes.SetExpenditureAlertText, 'Houston, we have a problem!')
        await commit(mutationTypes.SetExpenditureAlertStatus, true)
      }

      setTimeout(() => {
        commit(mutationTypes.SetExpenditureAlertStatus, false)
        commit(mutationTypes.SetExpenditureAlertText, '')
      }, 2000)
    },
    async [actionTypes.RemoveRevenue] ({ commit, dispatch }: any, data: any) {
      const token:any = localStorage.getItem('token')
      console.log('token here')
      console.log('all data is', data)
      const revenue = await removeData(data, token)
      console.log('revenue', revenue)
      if (!revenue.hasErrors) {
        await commit(mutationTypes.SetExpenditureAlertText, 'Revenue removed successfully')
        await commit(mutationTypes.SetExpenditureAlertStatus, true)
        await dispatch(actionTypes.FetchRevenue)
      } else if (revenue.response.status === 401) {
        router.push({ name: 'Login' });
      } else if (revenue.message.includes('400')) {
        await commit(mutationTypes.SetExpenditureAlertText, 'Invalid Input!')
        await commit(mutationTypes.SetExpenditureAlertStatus, true)
      } else {
        await commit(mutationTypes.SetExpenditureAlertText, 'Houston, we have a problem!')
        await commit(mutationTypes.SetExpenditureAlertStatus, true)
      }

      setTimeout(() => {
        commit(mutationTypes.SetExpenditureAlertStatus, false)
        commit(mutationTypes.SetExpenditureAlertText, '')
      }, 2000)
    },
    async [actionTypes.FetchEditExpenditure] ({ commit }: any, data: any) {
      const token:any = localStorage.getItem('token')
      console.log('token here')
      console.log('all data is', data)
      const expenditure = await fetchData(data, token)
      console.log('expenditure', expenditure)
      if (expenditure.payload) {
        commit(mutationTypes.SetEditExpenditure, expenditure.payload)
      } else if (expenditure.response.status === 401) {
        router.push({ name: 'Login' });
      }
    },
    async [actionTypes.FetchEditRevenue] ({ commit }: any, data: any) {
      const token:any = localStorage.getItem('token')
      console.log('token here')
      console.log('all data is', data)
      const revenue = await fetchData(data, token)
      console.log('revenue', revenue)
      if (revenue.payload) {
        commit(mutationTypes.SetEditRevenue, revenue.payload)
      } else if (revenue.response.status === 401) {
        router.push({ name: 'Login' });
      }
    },
    async [actionTypes.FetchEditCategory] ({ commit }: any, data: any) {
      const token:any = localStorage.getItem('token')
      console.log('token here')
      console.log('all data is', data)
      const category = await fetchData(data, token)
      console.log('category value is', category)
      if (category?.payload) {
        commit(mutationTypes.SetNewCategory, category.payload)
      } else if (category?.response?.status === 401) {
        router.push({ name: 'Login' });
      }
    },
    async [actionTypes.UpdateExpenditureStatus] ({ commit, dispatch }: any, data: any) {
      const token:any = localStorage.getItem('token')
      console.log('token in update')
      console.log('update data is', data)
      const UpdateExpenditureStatus = await addEmptyData(data, token)
      console.log('UpdateExpenditureStatus', UpdateExpenditureStatus)
      if (UpdateExpenditureStatus.payload) {
        await commit(mutationTypes.SetExpenditureAlertText, 'Expenditure status updated successfully')
        await commit(mutationTypes.SetExpenditureAlertStatus, true)
        await dispatch(actionTypes.FetchCategory)
      } else if (UpdateExpenditureStatus.response.status === 401) {
        router.push({ name: 'Login' });
      } else if (UpdateExpenditureStatus.message.includes('400')) {
        await commit(mutationTypes.SetExpenditureAlertText, 'Bad request received')
        await commit(mutationTypes.SetExpenditureAlertStatus, true)
      } else if (UpdateExpenditureStatus.message.includes('404')) {
        await commit(mutationTypes.SetExpenditureAlertText, 'Applicant not found')
        await commit(mutationTypes.SetExpenditureAlertStatus, true)
      } else {
        await commit(mutationTypes.SetExpenditureAlertText, 'Something went wrong')
        await commit(mutationTypes.SetExpenditureAlertStatus, true)
      }

      setTimeout(() => {
        commit(mutationTypes.SetExpenditureAlertStatus, false)
        commit(mutationTypes.SetExpenditureAlertText, '')
      }, 2000)
    },
    async [actionTypes.UpdateRevenueStatus] ({ commit, dispatch }: any, data: any) {
      const token:any = localStorage.getItem('token')
      console.log('token in update', token)
      console.log('update data is', data)
      const UpdateRevenueStatus = await addEmptyData(data, token)
      console.log('UpdateRevenueStatus', UpdateRevenueStatus)
      if (UpdateRevenueStatus.payload) {
        await commit(mutationTypes.SetExpenditureAlertText, 'Revenue status updated successfully')
        await commit(mutationTypes.SetExpenditureAlertStatus, true)
        await dispatch(actionTypes.FetchRevenue)
      } else if (UpdateRevenueStatus.response.status === 401) {
        router.push({ name: 'Login' });
      } else if (UpdateRevenueStatus.message.includes('400')) {
        await commit(mutationTypes.SetExpenditureAlertText, 'Bad request received')
        await commit(mutationTypes.SetExpenditureAlertStatus, true)
      } else if (UpdateRevenueStatus.message.includes('404')) {
        await commit(mutationTypes.SetExpenditureAlertText, 'Revenue not found')
        await commit(mutationTypes.SetExpenditureAlertStatus, true)
      } else {
        await commit(mutationTypes.SetExpenditureAlertText, 'Something went wrong')
        await commit(mutationTypes.SetExpenditureAlertStatus, true)
      }

      setTimeout(() => {
        commit(mutationTypes.SetExpenditureAlertStatus, false)
        commit(mutationTypes.SetExpenditureAlertText, '')
      }, 2000)
    },
    async [actionTypes.UpdateCategoryStatus] ({ commit, dispatch }: any, data: any) {
      const token:any = localStorage.getItem('token')
      console.log('token in update')
      console.log('update data is', data)
      const UpdateCategoryStatus = await addEmptyData(data, token)
      console.log('UpdateCategoryStatus', UpdateCategoryStatus)
      if (UpdateCategoryStatus.payload) {
        await commit(mutationTypes.SetExpenditureAlertText, 'Category status updated successfully')
        await commit(mutationTypes.SetExpenditureAlertStatus, true)
        await dispatch(actionTypes.FetchCategory)
      } else if (UpdateCategoryStatus.response.status === 401) {
        router.push({ name: 'Login' });
      } else if (UpdateCategoryStatus.message.includes('400')) {
        await commit(mutationTypes.SetExpenditureAlertText, 'Bad request received')
        await commit(mutationTypes.SetExpenditureAlertStatus, true)
      } else if (UpdateCategoryStatus.message.includes('404')) {
        await commit(mutationTypes.SetExpenditureAlertText, 'Applicant not found')
        await commit(mutationTypes.SetExpenditureAlertStatus, true)
      } else {
        await commit(mutationTypes.SetExpenditureAlertText, 'Something went wrong')
        await commit(mutationTypes.SetExpenditureAlertStatus, true)
      }

      setTimeout(() => {
        commit(mutationTypes.SetExpenditureAlertStatus, false)
        commit(mutationTypes.SetExpenditureAlertText, '')
      }, 2000)
    },
  },
}