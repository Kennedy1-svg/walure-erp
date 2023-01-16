import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { useStore } from 'vuex'
import idsrvAuth from '../idSrvAuth';

const store = useStore()

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
    name: 'Home',
    component: () => import('../views/Home.vue'),
    meta: { requiresAuth: false },
  },
  {
    path: '/dashboard',
    name: 'Layout',
    component: () => import('../views/dashboard/Layout.vue'),
    meta: { authName: idsrvAuth.authName },
    children: [
      {
        path: '',
        name: 'Dashboard',
        component: () => import('../views/dashboard/Index.vue'),
        meta: { requiresAuth: false },
      },
      // {
      //   path: 'student-management/batch/view-student/:id',
      //   name: 'StudentInBatch',
      //   component: () => import('../views/dashboard/students/StudentsInBatch.vue'),
      //   meta: { authName: idsrvAuth.authName },
      // },
      // {
      //   path: 'student-management/students',
      //   name: 'StudentManagement',
      //   component: () => import('../views/dashboard/students/Index.vue'),
      //   meta: { authName: idsrvAuth.authName },
      // },
      // {
      //   path: 'student-management/cohort',
      //   name: 'Batch',
      //   component: () => import('../views/dashboard/students/Batch.vue'),
      //   meta: { authName: idsrvAuth.authName },
      // },
      // {
      //   path: 'talent-management/instructors',
      //   name: 'Instructors',
      //   component: () => import('../views/dashboard/instructors/Index.vue'),
      //   meta: { authName: idsrvAuth.authName },
      // },
      // {
      //   path: 'course-management/courses',
      //   name: 'CourseManagement',
      //   component: () => import('../views/dashboard/courses/Index.vue'),
      //   meta: { authName: idsrvAuth.authName },
      // },
      // {
      //   path: 'course-management/course-applicants',
      //   name: 'CourseApplicants',
      //   component: () => import('../views/dashboard/courses/Applicant.vue'),
      //   meta: { authName: idsrvAuth.authName },
      // },
      // {
      //   path: 'course-management/course-categories',
      //   name: 'CourseCategory',
      //   component: () => import('../views/dashboard/courses/Category.vue'),
      //   meta: { authName: idsrvAuth.authName },
      // },
      // {
      //   path: 'course-management/curriculum/:id',
      //   name: 'Curriculum',
      //   component: () => import('../views/dashboard/courses/Curriculum.vue'),
      //   meta: { authName: idsrvAuth.authName },
      // },
      // {
      //   path: 'service-management/outsourcing-details/:id',
      //   name: 'OutsourcingDetails',
      //   component: () => import('../views/dashboard/services/OutsourcingJobDetails.vue'),
      //   meta: { authName: idsrvAuth.authName },
      // },
      // {
      //   path: 'service-management/add-outsourcing',
      //   name: 'AddOutsourcing',
      //   component: () => import('../views/dashboard/services/AddOutsourcing.vue'),
      //   meta: { authName: idsrvAuth.authName },
      // },
      // {
      //   path: 'service-management/edit-outsourcing/:id',
      //   name: 'EditOutsourcing',
      //   component: () => import('../views/dashboard/services/EditOutsourcing.vue'),
      //   meta: { authName: idsrvAuth.authName },
      // },
      // {
      //   path: 'talent-management/instructors',
      //   name: 'Instructors',
      //   component: () => import('../views/dashboard/instructors/Index.vue'),
      //   meta: { authName: idsrvAuth.authName },
      // },
      // {
      //   path: 'talent-management/talent-pool',
      //   name: 'Talents',
      //   component: () => import('../views/dashboard/instructors/Talent.vue'),
      //   meta: { authName: idsrvAuth.authName },
      // },
      // {
      //   path: 'talent-management/skills',
      //   name: 'Skills',
      //   component: () => import('../views/dashboard/instructors/Skill.vue'),
      //   meta: { authName: idsrvAuth.authName },
      // },
      // {
      //   path: 'service-management/projects',
      //   name: 'Project',
      //   component: () => import('../views/dashboard/services/Index.vue'),
      //   meta: { authName: idsrvAuth.authName },
      // },
      // {
      //   path: 'service-management/outsourcing',
      //   name: 'Outsourcing',
      //   component: () => import('../views/dashboard/services/Outsourcing.vue'),
      //   meta: { authName: idsrvAuth.authName },
      // },
      // {
      //   path: 'service-management/consultancy',
      //   name: 'Consultancy',
      //   component: () => import('../views/dashboard/services/Consultancy.vue'),
      //   meta: { authName: idsrvAuth.authName },
      // },
      // {
      //   path: 'enumeration',
      //   name: 'Enumeration',
      //   component: () => import('../views/dashboard/enumeration/Index.vue'),
      //   meta: { authName: idsrvAuth.authName },
      // },
      // {
      //   path: 'ipos',
      //   name: 'Ipos',
      //   component: () => import('../views/dashboard/ipos/Index.vue'),
      //   meta: { authName: idsrvAuth.authName },
      // },
      // {
      //   path: 'contact-us',
      //   name: 'ContactUs',
      //   component: () => import('../views/dashboard/contact/Index.vue'),
      //   meta: { authName: idsrvAuth.authName },
      // },
      // {
      //   path: 'ipos/contact-us',
      //   name: 'IPOsContactUs',
      //   component: () => import('../views/dashboard/ipos/Index.vue'),
      //   meta: { authName: idsrvAuth.authName },
      // },
      // {
      //   path: 'ipos/quote-request',
      //   name: 'IPOsQuoteRequest',
      //   component: () => import('../views/dashboard/ipos/QuoteRequest.vue'),
      //   meta: { authName: idsrvAuth.authName },
      // },
      // {
      //   path: 'ipos/demo-request',
      //   name: 'IPOsDemoRequest',
      //   component: () => import('../views/dashboard/ipos/DemoRequest.vue'),
      //   meta: { authName: idsrvAuth.authName },
      // },
      // {
      //   path: 'user-management/users',
      //   name: 'User',
      //   component: () => import('../views/dashboard/users/Index.vue'),
      //   meta: { authName: idsrvAuth.authName },
      // },
      // {
      //   path: 'user-management/roles',
      //   name: 'Roles',
      //   component: () => import('../views/dashboard/users/Role.vue'),
      //   meta: { authName: idsrvAuth.authName },
      // },
      // {
      //   path: 'user-management/add-role',
      //   name: 'AddRole',
      //   component: () => import('../views/dashboard/users/AddRole.vue'),
      //   meta: { authName: idsrvAuth.authName },
      // },
      // {
      //   path: 'user-management/edit-role/:id',
      //   name: 'EditRole',
      //   component: () => import('../views/dashboard/users/EditRole.vue'),
      //   meta: { authName: idsrvAuth.authName },
      // },
      // {
      //   path: 'account-management/revenue',
      //   name: 'Revenue',
      //   component: () => import('../views/dashboard/account/Index.vue'),
      //   meta: { authName: idsrvAuth.authName },
      // },
      // {
      //   path: 'account-management/expenditure',
      //   name: 'Expenditure',
      //   component: () => import('../views/dashboard/account/Expenditure.vue'),
      //   meta: { authName: idsrvAuth.authName },
      // },
      // {
      //   path: 'account-management/income-statement',
      //   name: 'IncomeStatement',
      //   component: () => import('../views/dashboard/account/IncomeStatement.vue'),
      //   meta: { authName: idsrvAuth.authName },
      // },
      // {
      //   path: 'account-management/payroll',
      //   name: 'Payroll',
      //   component: () => import('../views/dashboard/account/Payroll.vue'),
      //   meta: { authName: idsrvAuth.authName },
      // },
      // {
      //   path: 'human-resource/employee-data',
      //   name: 'EmployeeData',
      //   component: () => import('../views/dashboard/hr/EmployeeData.vue'),
      //   meta: { authName: idsrvAuth.authName },
      // },
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
      // {
      //   path: 'human-resource/leave-management',
      //   name: 'LeaveManagement',
      //   component: () => import('../views/dashboard/hr/LeaveManagement.vue'),
      //   meta: { authName: idsrvAuth.authName },
      // },
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

// router.beforeEach(async (to, from) => {
//   const token:any = await localStorage.getItem('token')
//   if (to.meta.requiresAuth) {
//     if (!token) {
//       router.push({ name: 'Login' })
//     }
//   }
// })

idsrvAuth.useRouter(router);

export default router;