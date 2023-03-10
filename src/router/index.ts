// import { createRouter as createVueRouter, createWebHistory, createWebHashHistory, RouteRecordRaw, Router } from 'vue-router';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { useStore } from 'vuex';
// import { createAuthGuard } from "@auth0/auth0-vue";
import idsrvAuth from '../idSrvAuth';
// import { App } from 'vue'

// const store = useStore()

// export function createRouter(app: App): Router {
//   return createVueRouter({
//     routes: [
//       {
//         path: '/',
//         name: 'Login',
//         component: () => import('../views/auth/Login.vue'),
//         meta: { requiresAuth: false },
//       },
//       {
//         path: '/redirect',
//         name: 'AuthRedirect',
//         component: () => import('../views/auth/Redirect.vue'),
//         meta: { requiresAuth: false },
//       },
//       {
//         path: '/forgot-password',
//         name: 'ForgotPassword',
//         component: () => import('../views/auth/ForgotPassword.vue'),
//         meta: { requiresAuth: false },
//       },
//       {
//         path: '/reset-password',
//         name: 'ResetPassword',
//         component: () => import('../views/auth/ResetPassword.vue'),
//         meta: { requiresAuth: false },
//       },
//       {
//         path: '/first-login',
//         name: 'ChangePassword',
//         component: () => import('../views/auth/ForgotPassword.vue'),
//         meta: { requiresAuth: false },
//       },
//       {
//         path: '/fill-employee-biodata',
//         name: 'FillEmployeeBiodata',
//         component: () => import('../views/dashboard/hr/FillEmployeeBiodata.vue'),
//         meta: { requiresAuth: false },
//       },
//       {
//         path: '/home',
//         name: 'Home',
//         component: () => import('../views/Home.vue'),
//         meta: { requiresAuth: false },
//       },
//       {
//         path: '/dashboards',
//         name: 'Home',
//         component: () => import('../views/dashboard/Layout.vue'),
//         // meta: { authName: idsrvAuth.authName },
//         beforeEnter: createAuthGuard(app),
//         // meta: { requiresAuth: false },
//       },
//       {
//         path: '/dashboard',
//         name: 'Layout',
//         component: () => import('../views/dashboard/Layout.vue'),
//         meta: { requiresAuth: true },
//         // meta: { authName: idsrvAuth.authName },
//         children: [
//           {
//             path: '',
//             name: 'Dashboard',
//             component: () => import('../views/dashboard/Index.vue'),
//             meta: { requiresAuth: true },
//             // meta: { authName: idsrvAuth.authName },
//           },
//           {
//             path: 'user-management/users',
//             name: 'User',
//             component: () => import('../views/dashboard/users/Index.vue'),
//             meta: { requiresAuth: true },
//           },
//           {
//             path: 'user-management/roles',
//             name: 'Roles',
//             component: () => import('../views/dashboard/users/Role.vue'),
//             meta: { requiresAuth: true },
//           },
//           {
//             path: 'user-management/add-role',
//             name: 'AddRole',
//             component: () => import('../views/dashboard/users/AddRole.vue'),
//             meta: { requiresAuth: true },
//           },
//           {
//             path: 'user-management/edit-role/:id',
//             name: 'EditRole',
//             component: () => import('../views/dashboard/users/EditRole.vue'),
//             meta: { requiresAuth: true },
//           },
//           {
//             path: 'account-management/revenue',
//             name: 'Revenue',
//             component: () => import('../views/dashboard/account/Index.vue'),
//             meta: { requiresAuth: true },
//           },
//           {
//             path: 'account-management/expenditure',
//             name: 'Expenditure',
//             component: () => import('../views/dashboard/account/Expenditure.vue'),
//             meta: { requiresAuth: true },
//           },
//           {
//             path: 'account-management/income-statement',
//             name: 'IncomeStatement',
//             component: () => import('../views/dashboard/account/IncomeStatement.vue'),
//             meta: { requiresAuth: true },
//           },
//           {
//             path: 'account-management/payroll',
//             name: 'Payroll',
//             component: () => import('../views/dashboard/account/Payroll.vue'),
//             meta: { requiresAuth: true },
//           },
//           {
//             path: 'human-resource/employee-data',
//             name: 'EmployeeData',
//             component: () => import('../views/dashboard/hr/EmployeeData.vue'),
//             meta: { requiresAuth: true },
//           },
//           // {
//           //   path: 'human-resource/employee-birthday',
//           //   name: 'EmployeeBirthday',
//           //   component: () => import('../views/dashboard/hr/EmployeeBirthday.vue'),
//           //   meta: { authName: idsrvAuth.authName },
//           // },
//           // {
//           //   path: 'human-resource/employee-portal',
//           //   name: 'EmployeePortal',
//           //   component: () => import('../views/dashboard/hr/EmployeePortal.vue'),
//           //   meta: { authName: idsrvAuth.authName },
//           // },
//           {
//             path: 'human-resource/leave-management',
//             name: 'LeaveManagement',
//             component: () => import('../views/dashboard/hr/LeaveManagement.vue'),
//             meta: { requiresAuth: true },
//           },
//           // {
//           //   path: 'human-resource/recruitment',
//           //   name: 'Recruitment',
//           //   component: () => import('../views/dashboard/hr/Recruitment.vue'),
//           //   meta: { authName: idsrvAuth.authName },
//           // },
//           // {
//           //   path: 'human-resource/performance-management',
//           //   name: 'PerformanceManagement',
//           //   component: () => import('../views/dashboard/hr/PerformanceManagement.vue'),
//           //   meta: { authName: idsrvAuth.authName },
//           // },
//           // {
//           //   path: 'human-resource/payroll',
//           //   name: 'Payroll',
//           //   component: () => import('../views/dashboard/hr/Payroll.vue'),
//           //   meta: { authName: idsrvAuth.authName },
//           // },
//           // {
//           //   path: 'human-resource/payroll',
//           //   name: 'Payroll',
//           //   component: () => import('../views/dashboard/hr/Payroll.vue'),
//           //   meta: { authName: idsrvAuth.authName },
//           // },
//           // {
//           //   path: 'human-resource/payroll',
//           //   name: 'Payroll',
//           //   component: () => import('../views/dashboard/hr/Payroll.vue'),
//           //   meta: { authName: idsrvAuth.authName },
//           // },
//           // {
//           //   path: 'human-resource/payroll',
//           //   name: 'Payroll',
//           //   component: () => import('../views/dashboard/hr/Payroll.vue'),
//           //   meta: { authName: idsrvAuth.authName },
//           // },
//           // {
//           //   path: 'account-management/expenditure/ExpenditureDetails/:id',
//           //   name: 'ExpenditureDetails',
//           //   component: () => import('../components/dashboard/account/ExpenditureDetails.vue'),
//           //   meta: { requiresAuth: true },
//           // },
//         ]
//       },
//       {
//         path: '/:pathMatch(.*)*',
//         name: 'Error',
//         component: () => import('../components/NotFound.vue'),
//         meta: { requiresAuth: false },
//       },
//     ],
//     history: createWebHashHistory()
//   })
// }

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Login',
    component: () => import('../views/auth/Login.vue'),
    meta: { requiresAuth: false },
  },
  {
    path: '/redirect',
    name: 'AuthRedirect',
    component: () => import('../views/auth/Redirect.vue'),
    meta: { requiresAuth: false },
  },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    component: () => import('../views/auth/ForgotPassword.vue'),
    meta: { requiresAuth: false },
  },
  {
    path: '/reset-password',
    name: 'ResetPassword',
    component: () => import('../views/auth/ResetPassword.vue'),
    meta: { requiresAuth: false },
  },
  {
    path: '/first-login',
    name: 'ChangePassword',
    component: () => import('../views/auth/ForgotPassword.vue'),
    meta: { requiresAuth: false },
  },
  {
    path: '/fill-employee-biodata',
    name: 'FillEmployeeBiodata',
    component: () => import('../views/dashboard/hr/FillEmployeeBiodata.vue'),
    meta: { requiresAuth: false },
  },
  {
    path: '/home',
    name: 'Hme',
    component: () => import('../views/Home.vue'),
    meta: { requiresAuth: false },
  },
  {
    path: '/dashboards',
    name: 'Home',
    component: () => import('../views/dashboard/Layout.vue'),
    meta: { authName: idsrvAuth.authName },
    // beforeEnter: createAuthGuard(app),
    // meta: { requiresAuth: false },
  },
  {
    path: '/dashboard',
    name: 'Layout',
    component: () => import('../views/dashboard/Layout.vue'),
    meta: { requiresAuth: true },
    // meta: { authName: idsrvAuth.authName },
    children: [
      {
        path: '',
        name: 'Dashboard',
        component: () => import('../views/dashboard/Index.vue'),
        meta: { requiresAuth: true },
        // meta: { authName: idsrvAuth.authName },
      },
      {
        path: 'user-management/users',
        name: 'User',
        component: () => import('../views/dashboard/users/Index.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'user-management/roles',
        name: 'Roles',
        component: () => import('../views/dashboard/users/Role.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'user-management/add-role',
        name: 'AddRole',
        component: () => import('../views/dashboard/users/AddRole.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'user-management/edit-role/:id',
        name: 'EditRole',
        component: () => import('../views/dashboard/users/EditRole.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'account-management/revenue',
        name: 'Revenue',
        component: () => import('../views/dashboard/account/Index.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'account-management/expenditure',
        name: 'Expenditure',
        component: () => import('../views/dashboard/account/Expenditure.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'account-management/income-statement',
        name: 'IncomeStatement',
        component: () => import('../views/dashboard/account/IncomeStatement.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'account-management/payroll',
        name: 'Payroll',
        component: () => import('../views/dashboard/account/Payroll.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'human-resource/employee-data',
        name: 'EmployeeData',
        component: () => import('../views/dashboard/hr/EmployeeData.vue'),
        meta: { requiresAuth: true },
      },
      // {
      //   path: 'human-resource/employee-birthday',
      //   name: 'EmployeeBirthday',
      //   component: () => import('../views/dashboard/hr/EmployeeBirthday.vue'),
      //   meta: { authName: idsrvAuth.authName },
      // },
      // {
      //   path: 'human-resource/employee-portal',
      //   name: 'EmployeePortal',
      //   component: () => import('../views/dashboard/hr/EmployeePortal.vue'),
      //   meta: { authName: idsrvAuth.authName },
      // },
      {
        path: 'human-resource/leave-management',
        name: 'LeaveManagement',
        component: () => import('../views/dashboard/hr/LeaveManagement.vue'),
        meta: { requiresAuth: true },
      },
      // {
      //   path: 'human-resource/recruitment',
      //   name: 'Recruitment',
      //   component: () => import('../views/dashboard/hr/Recruitment.vue'),
      //   meta: { authName: idsrvAuth.authName },
      // },
      // {
      //   path: 'human-resource/performance-management',
      //   name: 'PerformanceManagement',
      //   component: () => import('../views/dashboard/hr/PerformanceManagement.vue'),
      //   meta: { authName: idsrvAuth.authName },
      // },
      // {
      //   path: 'human-resource/payroll',
      //   name: 'Payroll',
      //   component: () => import('../views/dashboard/hr/Payroll.vue'),
      //   meta: { authName: idsrvAuth.authName },
      // },
      // {
      //   path: 'human-resource/payroll',
      //   name: 'Payroll',
      //   component: () => import('../views/dashboard/hr/Payroll.vue'),
      //   meta: { authName: idsrvAuth.authName },
      // },
      // {
      //   path: 'human-resource/payroll',
      //   name: 'Payroll',
      //   component: () => import('../views/dashboard/hr/Payroll.vue'),
      //   meta: { authName: idsrvAuth.authName },
      // },
      // {
      //   path: 'human-resource/payroll',
      //   name: 'Payroll',
      //   component: () => import('../views/dashboard/hr/Payroll.vue'),
      //   meta: { authName: idsrvAuth.authName },
      // },
      // {
      //   path: 'account-management/expenditure/ExpenditureDetails/:id',
      //   name: 'ExpenditureDetails',
      //   component: () => import('../components/dashboard/account/ExpenditureDetails.vue'),
      //   meta: { requiresAuth: true },
      // },
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'Error',
    component: () => import('../components/NotFound.vue'),
    meta: { requiresAuth: false },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from) => {
  const token:any = localStorage.getItem('token')
  if (to.meta.requiresAuth) {
    if (!token) {
      router.push({ name: 'Login' })
      // return {
      //   path: '/',
      //   // save the location we were at to come back later
      //   query: { redirect: to.fullPath },
      // }
    } else if (token) {
      if (to.path == '/dashboards') {
        router.push({ path: '/dashboard' })
      }
    }
  }
})

idsrvAuth.useRouter(router);

export default router;