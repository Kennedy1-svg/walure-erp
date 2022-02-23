<script setup lang="ts">
import Navigation from '../../components/SideNavigation.vue';
import TopNavigation from '../../components/TopNavigation.vue';

</script>

<template>    
    <div class="flex">
        <div class="w-1/5 border-r">
            <Navigation />            
        </div>
        <div class="main w-4/5">
            <TopNavigation />
            <router-view />
        </div>
    </div>
</template>
