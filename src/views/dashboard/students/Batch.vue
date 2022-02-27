<script setup lang="ts">
import BatchHeader from '../../../components/dashboard/students/BatchHeader.vue';
import BatchList from '../../../components/dashboard/students/BatchList.vue';

</script>

<template>
    <div class="main mx-5 px-5 overflow-hidden">
        <div class="top">
            <BatchHeader />
        </div>
        <div class="list">
            <BatchList />
        </div>
    </div>
</template>