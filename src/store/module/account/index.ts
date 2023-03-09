import { computed } from 'vue'
import { account_api_url } from '../../../config/index'
import { addData, editDataPut, fetchData, removeData } from '../../../helpers/api'
import { createRouter } from '../../../router'
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
      const expenditure:any = await fetchData(data, token)
      console.log('data', data)
      console.log('Iexpenditures', expenditure)
    //   console.log('Iexpenditures', expenditures.value)
    //   console.log('Iexpenditures', JSON.parse(JSON.stringify(expenditures)))
    //   console.log('Iexpenditures', JSON.parse(JSON.stringify(expenditures.value)))
    //   console.log('Iexpenditures', expenditures.value)
      if (expenditure?.data?.payload) {
        await commit(mutationTypes.SetExpenditure, expenditure.data)
      } else if (expenditure?.response?.status === 401) {
        // router.push({ name: 'Login' });
      }
      // commit(mutationTypes.SetExpenditure, expenditure)
      // commit(mutationTypes.SetTotalExpenditureCount, expenditure.totalCount)
    },
    async [actionTypes.FetchIncomeStatement] ({ commit }: any, data: any = `${account_api_url}api/incomestatement/getall-incomestatement`) {
      const token:any = localStorage.getItem('token')
      console.log('token here', token)
      const incomestatement:any = await fetchData(data, token)
      console.log('data', data)
      console.log('Iincomestatements', incomestatement)
    //   console.log('Iincomestatements', incomestatements.value)
    //   console.log('Iincomestatements', JSON.parse(JSON.stringify(incomestatements)))
    //   console.log('Iincomestatements', JSON.parse(JSON.stringify(incomestatements.value)))
    //   console.log('Iincomestatements', incomestatements.value)
      if (incomestatement?.data?.payload) {
        await commit(mutationTypes.SetIncomeStatement, incomestatement.data)
      } else if (incomestatement?.response?.status === 401) {
        // router.push({ name: 'Login' });
      }
      // commit(mutationTypes.SetExpenditure, expenditure)
      // commit(mutationTypes.SetTotalExpenditureCount, expenditure.totalCount)
    },
    async [actionTypes.FetchRevenue] ({ commit }: any, data: any = `${account_api_url}api/revenue/getall-revenue`) {
      const token:any = localStorage.getItem('token')
      console.log('token here', token)
      const revenues:any = await fetchData(data, token)
      console.log('data', data)
      // console.log('Irevenues', revenues.payload)
    //   console.log('Irevenues', revenues.value)
    //   console.log('Irevenues', JSON.parse(JSON.stringify(revenues)))
    //   console.log('Irevenues', JSON.parse(JSON.stringify(revenues.value)))
    //   console.log('Irevenues', revenues.value)
      if (revenues?.data?.payload) {
        await commit(mutationTypes.SetRevenue, revenues.data)
      } else if (revenues?.response?.status === 401) {
        // router.push({ name: 'Login' });
      }
      // commit(mutationTypes.SetExpenditure, expenditure)
      // commit(mutationTypes.SetTotalExpenditureCount, expenditure.totalCount)
    },
    async [actionTypes.FetchCategory] ({ commit }: any, data: any) {
      const token:any = localStorage.getItem('token')
    //   console.log('token here', token)
      const category:any = await fetchData(data, token)
      console.log('data', data)
      console.log('Icategorys in all', category.data.payload)
      console.log('Icategorys', category)
    //   console.log('Icategorys', JSON.parse(JSON.stringify(categorys)))
    //   console.log('Icategorys', JSON.parse(JSON.stringify(categorys.value)))
    //   console.log('Icategorys', categorys.value)
      if (category?.data?.payload) {
        await commit(mutationTypes.SetCategory, category.data)
      } else if (category?.response?.status === 401) {
        // router.push({ name: 'Login' });
      }
      // commit(mutationTypes.SetExpenditure, expenditure)
      // commit(mutationTypes.SetTotalExpenditureCount, expenditure.totalCount)
    },
    async [actionTypes.FetchCategoryList] ({ commit }: any, data: any) {
      const token:any = localStorage.getItem('token')
    //   console.log('token here', token)
      const category:any = await fetchData(data, token)
      console.log('data', data)
      console.log('Icategorys', category.data)
      console.log('Icategorys', category.data.payload)
    //   console.log('Icategorys', categorys.value)
    //   console.log('Icategorys', JSON.parse(JSON.stringify(categorys)))
    //   console.log('Icategorys', JSON.parse(JSON.stringify(categorys.value)))
    //   console.log('Icategorys', categorys.value)
      if (category?.data?.payload) {
        await commit(mutationTypes.SetCategoryList, category.data)
      } else if (category?.response?.status === 401) {
        // router.push({ name: 'Login' });
      }
      // commit(mutationTypes.SetExpenditure, expenditure)
      // commit(mutationTypes.SetTotalExpenditureCount, expenditure.totalCount)
    },
    async [actionTypes.AddExpenditureCategory] ({ commit, dispatch }:any, data:any) {
      // const revenueTalent:any = await JSON.parse(JSON.stringify(state.revenueTalent))
      const token:any = localStorage.getItem('token')
      // console.log('revenue talent here', revenueTalent)
      console.log('data', data)
      const url:String = 'api/expenditurecategory/getall-category'
      // console.log('new added revenue talent data', newData)
      // await commit(mutationTypes.SetRevenueTalent, newData)
      const addCategory:any = await addData(data.url, data.data, token)
      console.log(`add category ${addCategory}`)
      if (addCategory?.data?.payload) {
        // commit(mutationTypes.SetNewCourseCategory, course_applicant.payload)
        await commit(mutationTypes.SetExpenditureAlertText, 'Category added successfully')
        await commit(mutationTypes.SetExpenditureAlertStatus, true)
        const requesturl:any = `${account_api_url}${url}`
        console.log(`the request url is ${requesturl}`)
        await dispatch(actionTypes.FetchCategory, requesturl)
      } else if (addCategory?.response?.status === 401) {
        // router.push({ name: 'Login' });
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
      const url:String = 'api/revenuecategory/getall-category'
      // console.log('new added revenue talent data', newData)
      // await commit(mutationTypes.SetRevenueTalent, newData)
      const addCategory:any = await addData(data.url, data.data, token)
      console.log('addCategory is the same', addCategory)
      console.log('addCategory is the same', addCategory.payload)
      // console.log('addCategory is the same', addCategory?.message)
      // console.log('addCategory is the same', addCategory?.message.includes('400'))
      // console.log('addCategory is the same', addCategory?.title)
      if (addCategory?.data?.payload) {
        // commit(mutationTypes.SetNewCourseCategory, course_applicant.payload)
        await commit(mutationTypes.SetExpenditureAlertText, 'Category added successfully')
        await commit(mutationTypes.SetExpenditureAlertStatus, true)
        const requesturl:any = `${account_api_url}${url}`
        console.log(`the request url is ${requesturl}`)
        await dispatch(actionTypes.FetchCategory, requesturl)
      } else if (addCategory?.response?.status === 401) {
        // router.push({ name: 'Login' });
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
      const url:String = 'api/expenditurecategory/getall-category'
      // console.log('new added revenue talent data', newData)
      // await commit(mutationTypes.SetRevenueTalent, newData)
      const editCategory:any = await editDataPut(data.url, data.data, token)
      if (editCategory?.data?.payload) {
        // commit(mutationTypes.SetNewCourseCategory, course_applicant.payload)
        await commit(mutationTypes.SetExpenditureAlertText, 'Category updated successfully')
        await commit(mutationTypes.SetExpenditureAlertStatus, true)
        const requesturl:any = `${account_api_url}${url}`
        console.log(`the request url is ${requesturl}`)
        await dispatch(actionTypes.FetchCategory, requesturl)
      } else if (editCategory?.response?.status === 401) {
        // router.push({ name: 'Login' });
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
      const url:String = 'api/revenuecategory/getall-category'
      // console.log('new added revenue talent data', newData)
      // await commit(mutationTypes.SetRevenueTalent, newData)
      const editCategory:any = await editDataPut(data.url, data.data, token)
      if (editCategory?.data?.payload) {
        // commit(mutationTypes.SetNewCourseCategory, course_applicant.payload)
        await commit(mutationTypes.SetExpenditureAlertText, 'Category updated successfully')
        await commit(mutationTypes.SetExpenditureAlertStatus, true)
        const requesturl:any = `${account_api_url}${url}`
        console.log(`the request url is ${requesturl}`)
        await dispatch(actionTypes.FetchCategory, requesturl)
      } else if (editCategory?.response?.status === 401) {
        // router.push({ name: 'Login' });
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
      const addRevenue:any = await addData(data.url, data.data, token)
      if (addRevenue?.data?.payload) {
        // commit(mutationTypes.SetNewCourseCategory, course_applicant.payload)
        await commit(mutationTypes.SetExpenditureAlertText, 'Revenue added successfully')
        await commit(mutationTypes.SetExpenditureAlertStatus, true)
        await dispatch(actionTypes.FetchRevenue)
      } else if (addRevenue?.response?.status === 401) {
        // router.push({ name: 'Login' });
      } else if (addRevenue?.message?.includes('400')) {
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
    async [actionTypes.AddExpenditure] ({ commit, dispatch }: any, data: any) {
      const token:any = localStorage.getItem('token')
      console.log('token here')
      console.log('all data is', data.url, data.data)
      const newexpenditure:any = await addData(data.url, data.data, token)
      console.log('newexpenditure data is', newexpenditure)
      if (newexpenditure?.data) {
        await commit(mutationTypes.SetExpenditureAlertText, 'Expenditure added successfully')
        await commit(mutationTypes.SetExpenditureAlertStatus, true)
        await dispatch(actionTypes.FetchExpenditure)
      } else if (newexpenditure?.message?.includes('400')) {
        await commit(mutationTypes.SetExpenditureAlertText, 'Invalid Input!')
        await commit(mutationTypes.SetExpenditureAlertStatus, true)
      } else if (newexpenditure?.response?.status === 401) {
        // router.push({ name: 'Login' });
      } else {
        await commit(mutationTypes.SetExpenditureAlertText, 'Houston, we have a problem!')
        await commit(mutationTypes.SetExpenditureAlertStatus, true)
      }

      setTimeout(() => {
        commit(mutationTypes.SetExpenditureAlertStatus, false)
        commit(mutationTypes.SetExpenditureAlertText, '')
      }, 2000)
    },
    async [actionTypes.EditRevenue] ({ commit, dispatch }: any, data: any) {
      const token:any = localStorage.getItem('token')
      console.log('token here')
      const revenue:any = await editDataPut(data.url, data.data, token)
      console.log('revenue that came', revenue)
      if (revenue?.data) {
        // commit(mutationTypes.SetNewExpenditureCategory, revenue.payload)
        await commit(mutationTypes.SetExpenditureAlertText, 'Revenue updated successfully')
        await commit(mutationTypes.SetExpenditureAlertStatus, true)
        await dispatch(actionTypes.FetchRevenue)
      } else if (revenue?.response?.status === 401) {
        // router.push({ name: 'Login' });
      } else if (revenue?.message?.includes('400')) {
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
    async [actionTypes.EditExpenditure] ({ commit, dispatch }: any, data: any) {
      const token:any = localStorage.getItem('token')
      console.log('token here')
      const expenditure:any = await editDataPut(data.url, data.data, token)
      console.log('expenditure that came', expenditure)
      if (expenditure?.data) {
        // commit(mutationTypes.SetNewExpenditureCategory, expenditure.payload)
        await commit(mutationTypes.SetExpenditureAlertText, 'Expenditure updated successfully')
        await commit(mutationTypes.SetExpenditureAlertStatus, true)
        await dispatch(actionTypes.FetchExpenditure)
      } else if (expenditure?.response?.status === 401) {
        // router.push({ name: 'Login' });
      } else if (expenditure?.message?.includes('400')) {
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
      const newexpenditure:any = await removeData(data, token)
      console.log('newexpenditure here', newexpenditure)
      if (newexpenditure?.data) {
        await commit(mutationTypes.SetExpenditureAlertText, 'Expenditure removed successfully')
        await commit(mutationTypes.SetExpenditureAlertStatus, true)
        await dispatch(actionTypes.FetchExpenditure)
      } else if (newexpenditure?.response?.status === 401) {
        // router.push({ name: 'Login' });
      } else if (newexpenditure?.message?.includes('400')) {
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
      const newcategory:any = await removeData(data, token)
      console.log('newcategory', newcategory)
      if (newcategory?.data) {
        await commit(mutationTypes.SetExpenditureAlertText, 'Category removed successfully')
        await commit(mutationTypes.SetExpenditureAlertStatus, true)
        const fetchrequest:any = `${account_api_url}api/expenditurecategory/getall-category`;
        await dispatch(actionTypes.FetchExpenditure, fetchrequest)
      } else if (newcategory?.response?.status === 401) {
        // router.push({ name: 'Login' });
      } else if (newcategory?.message?.includes('401')) {
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
      const revenue:any = await removeData(data, token)
      console.log('revenue', revenue)
      if (revenue?.data) {
        await commit(mutationTypes.SetExpenditureAlertText, 'Revenue removed successfully')
        await commit(mutationTypes.SetExpenditureAlertStatus, true)
        await dispatch(actionTypes.FetchRevenue)
      } else if (revenue?.response?.status === 401) {
        // router.push({ name: 'Login' });
      } else if (revenue?.message?.includes('400')) {
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
      const expenditure:any = await fetchData(data, token)
      console.log('expenditure', expenditure)
      if (expenditure?.data?.payload) {
        commit(mutationTypes.SetEditExpenditure, expenditure.data.payload)
      } else if (expenditure?.response?.status === 401) {
        // router.push({ name: 'Login' });
      }
    },
    async [actionTypes.FetchEditRevenue] ({ commit }: any, data: any) {
      const token:any = localStorage.getItem('token')
      console.log('token here')
      console.log('all data is', data)
      const revenue:any = await fetchData(data, token)
      console.log('revenue', revenue)
      if (revenue?.data?.payload) {
        commit(mutationTypes.SetEditRevenue, revenue.data.payload)
      } else if (revenue?.response?.status === 401) {
        // router.push({ name: 'Login' });
      }
    },
    async [actionTypes.FetchEditCategory] ({ commit }: any, data: any) {
      const token:any = localStorage.getItem('token')
      console.log('token here')
      console.log('all data is', data)
      const category:any = await fetchData(data, token)
      console.log('category value is', category)
      if (category?.data?.payload) {
        commit(mutationTypes.SetNewCategory, category.data.payload)
      } else if (category?.response?.status === 401) {
        // router.push({ name: 'Login' });
      }
    },
  },
}