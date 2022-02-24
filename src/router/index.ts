import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Login',
    component: () => import('../views/Login.vue'),
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/Home.vue'),
  },
  {
    path: '/dashboard',
    name: 'Layout',
    component: () => import('../views/dashboard/Layout.vue'),
    children: [
      {
        path: '',
        name: 'Dashboard',
        component: () => import('../views/dashboard/Index.vue'),
      },
      {
        path: 'student-management',
        name: 'StudentManagement',
        component: () => import('../views/dashboard/students/Index.vue'),
      },
      {
        path: 'course-management',
        name: 'CourseManagement',
        component: () => import('../views/dashboard/courses/Index.vue'),
      },
      {
        path: 'talent-management',
        name: 'TalentManagement',
        component: () => import('../views/dashboard/talents/Index.vue'),
      },
      {
        path: 'user-management',
        name: 'UserManagement',
        component: () => import('../views/dashboard/users/Index.vue'),
      },
      {
        path: 'service-management',
        name: 'ServiceManagement',
        component: () => import('../views/dashboard/services/Index.vue'),
      },
      {
        path: 'enumeration',
        name: 'Enumeration',
        component: () => import('../views/dashboard/enumeration/Index.vue'),
      },
      {
        path: 'ipos',
        name: 'Ipos',
        component: () => import('../views/dashboard/ipos/Index.vue'),
      },
      {
        path: 'contact-us',
        name: 'ContactUs',
        component: () => import('../views/dashboard/Contact.vue'),
      },
      {
        path: '/:pathMatch(.*)*',
        name: 'Error',
        component: () => import('../components/NotFound.vue'),
      },
    ]
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;