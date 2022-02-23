<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
import Card from '../components/Card.vue';
import SvgIcons from '../components/SvgIcons.vue';
import ActivityCard from '../components/ActivityCard.vue';
import Navigation from '../components/Navigation.vue';
import TopNav from '../components/TopNavigation.vue';
import LoginForm from '../components/LoginForm.vue';
import Search from '../components/Search.vue';

const icons:any = ["camera", "o-cancel", "cancel", "chevron-down", "chevron-left", "chevron-right", "logo-white", "logo", "chevron-up", "contact", "course-management", "curriculum", "delete", "details", "edit", "download", "education", "eye", "ellipsis", "search", "ipos", "logout", "menu", "next", "previous", "pic-avatar", "user-avatar", "user-management", "plus", "service-management", "talent-management", "update", "upload", "tick", "enumeration"];
</script>

<template>
    <div class="grid gap-10">
        <div class="card">
            <h1 class="text-4xl mb-4">Cards</h1>
            <Card />
        </div>
        <div class="activity-card">
            <h1 class="text-4xl mb-4">Activity Cards</h1>
            <ActivityCard />
        </div>
        <div class="navigation">
            <h1 class="text-4xl mb-4">Navigation</h1>
            <Navigation />
        </div>
        <div class="top-navigation">
            <h1 class="text-4xl mb-4">Top Navigation</h1>
            <TopNavigation />
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
    </div>
</template>

