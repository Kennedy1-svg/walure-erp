<script setup lang="ts">
import Navigation from '../../components/SideNavigation.vue';
import TopNavigation from '../../components/TopNavigation.vue';

</script>

<template>    
    <div class="flex">
        <div class="w-1/5 border-r">
            <Navigation class="fixed w-1/5" />            
        </div>
        <div class="main w-4/5">
            <TopNavigation class="fixed z-50" />
            <router-view class="mt-12" />
        </div>
    </div>
</template>
