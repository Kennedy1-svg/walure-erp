import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Layout from '../views/dashboard/Layout.vue';
import Dashboard from '../views/dashboard/Index.vue';
import StudentIndex from '../views/dashboard/students/Index.vue';
import CourseIndex from '../views/dashboard/courses/Index.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Login',
    component: Login,
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
  },
  {
    path: '/dashboard/',
    name: 'Layout',
    component: Layout,
    children: [
      {
        path: '',
        name: 'Dashboard',
        component: Dashboard,
      },
      {
        path: '/student-management',
        name: 'StudentManagement',
        component: StudentIndex,
      },
      {
        path: '/course-management',
        name: 'CourseManagement',
        component: CourseIndex,
      },
    ]
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;