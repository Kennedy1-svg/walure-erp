import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Login',
    component: () => import('../views/Login.vue'),
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
  },
  {
    path: '/dashboard/',
    name: 'Layout',
    component: () => import('../views/dashboard/Layout.vue'),
    children: [
      {
        path: '',
        name: 'Dashboard',
        component: () => import('../views/dashboard/Index.vue'),
      },
      {
        path: '/student-management',
        name: 'StudentManagement',
        component: () => import('../views/dashboard/students/Index.vue'),
      },
      {
        path: '/course-management',
        name: 'CourseManagement',
        component: () => import('../views/dashboard/courses/Index.vue'),
      },
    ]
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;