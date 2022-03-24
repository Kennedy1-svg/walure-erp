import { createRouter, createWebHistory, RouteRecordRaw, onBeforeRouteLeave, } from 'vue-router';
import { useStore } from 'vuex'

const store = useStore()

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Login',
    component: () => import('../views/Login.vue'),
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
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'Dashboard',
        component: () => import('../views/dashboard/Index.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'student-management/batch/view-student/:id',
        name: 'StudentInBatch',
        component: () => import('../views/dashboard/students/StudentsInBatch.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'student-management/students',
        name: 'StudentManagement',
        component: () => import('../views/dashboard/students/Index.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'student-management/batch',
        name: 'Batch',
        component: () => import('../views/dashboard/students/Batch.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'talent-management/instructors',
        name: 'Instructors',
        component: () => import('../views/dashboard/instructors/Index.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'course-management/courses',
        name: 'CourseManagement',
        component: () => import('../views/dashboard/courses/Index.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'course-management/course-applicants',
        name: 'CourseApplicants',
        component: () => import('../views/dashboard/courses/Applicant.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'course-management/course-categories',
        name: 'CourseCategory',
        component: () => import('../views/dashboard/courses/Category.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'course-management/curriculum',
        name: 'Curriculum',
        component: () => import('../views/dashboard/courses/Curriculum.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'talent-management/instructors',
        name: 'Instructors',
        component: () => import('../views/dashboard/instructors/Index.vue'),
        meta: { requiresAuth: true },
      },
      // {
      //   path: 'talent-management/talent-pool',
      //   name: 'Talents',
      //   component: () => import('../views/dashboard/instructors/Talent.vue'),
      //   meta: { requiresAuth: true },
      // },
      // {
      //   path: 'talent-management/skills',
      //   name: 'Skills',
      //   component: () => import('../views/dashboard/instructors/Skill.vue'),
      //   meta: { requiresAuth: true },
      // },
      {
        path: 'user-management',
        name: 'UserManagement',
        component: () => import('../views/dashboard/users/Index.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'service-management',
        name: 'ServiceManagement',
        component: () => import('../views/dashboard/services/Index.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'enumeration',
        name: 'Enumeration',
        component: () => import('../views/dashboard/enumeration/Index.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'ipos',
        name: 'Ipos',
        component: () => import('../views/dashboard/ipos/Index.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'contact-us',
        name: 'ContactUs',
        component: () => import('../views/dashboard/Contact.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: '/:pathMatch(.*)*',
        name: 'Error',
        component: () => import('../components/NotFound.vue'),
        meta: { requiresAuth: false },
      },
    ]
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from) => {
  const token:any = await localStorage.getItem('token') || ''
  if (to.meta.requiresAuth) {
    if (!token) {
      router.push({ name: 'Login' })
    }
  }
})

export default router;