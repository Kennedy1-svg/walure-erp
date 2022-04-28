<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
import Card from '../components/Card.vue';
import SvgIcons from '../components/SvgIcons.vue';
import ActivityCard from '../components/ActivityCard.vue';
import Navigation from '../components/SideNavigation.vue';
import TopNav from '../components/TopNavigation.vue';
import LoginForm from '../components/LoginForm.vue';
import Search from '../components/Search.vue';
import Filter from '../components/Filter.vue';
import AddStudent from '../components/dashboard/students/AddToBatch.vue';
import AddStudents from '../components/dashboard/students/AddStudents.vue';
import StudentDetails from '../components/dashboard/students/StudentDetails.vue';
import StudentList from '../components/dashboard/students/StudentList.vue';
import StudentHeader from '../components/dashboard/students/StudentHeader.vue';
import CompanyDetail from '../components/dashboard/services/CompanyDetailCard.vue';
import JobDetail from '../components/dashboard/services/JobDetails.vue';

const icons:any = ["camera", "doc-add", "o-cancel", "cancel", "chevron-down", "chevron-left", "chevron-right", "logo-white", "logo", "contact", "course-management", "curriculum", "delete", "details", "edit", "download", "education", "eye", "ellipsis", "search", "ipos", "logout", "menu", "next", "previous", "pic-avatar", "user-avatar", "user-management", "plus", "service-management", "talent-management", "update", "upload", "tick", "enumeration"];
</script>

<template>
    <router-link to="/dashboard">
        <div class="flex px-2 lg:px-10 py-3 h-[76px]">
            <img src="../assets/Walure-logo-black.png" alt="walure-logo">
        </div>
    </router-link>
    <div class="grid gap-10">
        <div class="card">
            <h1 class="text-4xl mb-4">Cards</h1>
            <Card />
        </div>
        <div class="activity-card">
            <h1 class="text-4xl mb-4">Activity Cards</h1>
            <ActivityCard />
        </div>
        <!-- <div class="navigation">
            <h1 class="text-4xl mb-4">Navigation</h1>
            <Navigation />
        </div> -->
        <div class="top-navigation">
            <h1 class="text-4xl mb-4">Top Navigation</h1>
            <TopNav />
        </div>
        <div class="icons">
            <h1 class="text-4xl mb-4">Icons</h1>
            <div v-for="(icon, index) in icons" :key="index" class="icons">
                <SvgIcons :name=icon />
                <p>{{ icon }}</p>
            </div>
        </div>
        <div class="login-form">
            <h1 class="text-4xl mb-4">Login Form</h1>
            <LoginForm />
        </div>
        <div class="search">
            <h1 class="text-4xl mb-4">Search</h1>
            <Search />
        </div>
        <div class="filter">
            <h1 class="text-4xl mb-4">Company</h1>
            <CompanyDetail />
        </div>
        <div class="filter">
            <h1 class="text-4xl mb-4">Job</h1>
            <JobDetail />
        </div>
        <div class="filter">
            <h1 class="text-4xl mb-4">Filter</h1>
            <Filter />
        </div>
        <div class="addBatch">
            <h1 class="text-4xl mb-4">Add Batch</h1>
            <AddStudent />
        </div>
        <div class="filter">
            <h1 class="text-4xl mb-4">Add Students</h1>
            <AddStudents />
        </div>
        <div class="studentdetails">
            <h1 class="text-4xl mb-4">Student Details</h1>
            <StudentDetails />
        </div>
        <div class="studentheader">
            <h1 class="text-4xl mb-4">Student Header</h1>
            <StudentHeader />
        </div>
        <div class="studentlist">
            <h1 class="text-4xl mb-4">Student List</h1>
            <StudentList />
        </div>
    </div>
</template>

